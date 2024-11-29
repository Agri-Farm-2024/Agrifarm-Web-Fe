import React, {useEffect, useState} from 'react';
import {Table, Select, Button, Space, Tag, Modal, message} from 'antd';
import styles from './ManageViewLand.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getListOfRequestViewLand} from '../../redux/slices/landSlice';
import {ManageViewLandDetailModal} from './ManageViewLandDetailModal';
import {getListOfStaff} from '../../redux/slices/userSlice';
import {assignForTask} from '../../redux/slices/requestSlice';
import {formatDateToVN, formatTimeViewLand} from '../../utils';

const {Option} = Select;

export const ManageViewLand = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [filterStatus, setFilterStatus] = useState('');
	const [filterStaff, setFilterStaff] = useState('');
	const [isModalAssignVisible, setIsModalAssignVisible] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [staffList, setStaffList] = useState([]);
	const [assignedStaff, setAssignedStaff] = useState(null);
	const [taskID, setTaskID] = useState(null);
	const [request, setRequest] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 10;
	const dispatch = useDispatch();

	const loadingFromRedux = useSelector((state) => state.landSlice.loading);

	useEffect(() => {
		fetchRequests(currentPage, filterStatus, filterStaff);
	}, [currentPage, filterStatus, filterStaff]);

	useEffect(() => {
		dispatch(getListOfStaff())
			.then((res) => {
				if (res.payload.statusCode === 200) {
					console.log('getListOfStaff: ' + JSON.stringify(res.payload.metadata.users));
					setStaffList(res.payload.metadata.users);
				}
			})
			.catch((error) => {
				console.error('Caught error:', error);
			});
	}, []);

	const fetchRequests = (page, status, staff) => {
		dispatch(getListOfRequestViewLand({page_size: pageSize, page_index: page, status, staff}))
			.then((response) => {
				if (response.payload.statusCode === 200) {
					console.log('Data fetched:', response.payload.metadata);
					setRequest(response.payload.metadata.requests);
					setTotalPages(response.payload.metadata.pagination.total_page);
				} else {
					console.error('Error fetching data:', response.payload);
				}
			})
			.catch((error) => {
				console.error('Caught error:', error);
			});
	};

	const columns = [
		{
			title: 'Khách Hàng',
			dataIndex: 'guest_full_name',
			key: 'guest_full_name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Email',
			dataIndex: 'guest_email',
			key: 'guest_email',
		},
		{
			title: 'Số Điện Thoại',
			dataIndex: 'guest_phone',
			key: 'guest_phone',
		},

		{
			title: 'Ngày Đến',
			key: 'dateToCome',
			render: ({time_start}) => <div>{formatTimeViewLand(time_start)}</div>,
		},
		{
			title: 'Ngày gửi',
			key: 'created_at',
			render: ({created_at}) => <div>{formatDateToVN(created_at)}</div>,
		},
		{
			title: 'Mô Tả',
			key: 'description',
			render: ({description}) => <div>{description ? description : 'Không có'}</div>,
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'assigned' ? 'blue' : status === 'completed' ? 'green' : 'orange'
					}
				>
					{status === 'assigned'
						? 'Đã phân công'
						: status === 'completed'
							? 'Hoàn thành'
							: 'Chờ phân công'}
				</Tag>
			),
		},
		// {
		// 	title: 'Hành Động',
		// 	key: 'actions',
		// 	render: (_, record) => (
		// 		<Space size="middle">
		// 			<Button
		// 				disabled={record.status !== 'pending'}
		// 				type="primary"
		// 				onClick={(e) => {
		// 					e.stopPropagation();

		// 					setSelectedRecord(record);
		// 					setIsModalAssignVisible(true);
		// 				}}
		// 			>
		// 				Chọn nhân viên
		// 			</Button>
		// 		</Space>
		// 	),
		// },
	];

	const handleAssign = () => {
		if (taskID && assignedStaff) {
			const hideLoading = message.loading('Đang xử lí...', 0);
			dispatch(assignForTask({taskID: taskID, staffID: assignedStaff}))
				.then((res) => {
					hideLoading();
					if (res.payload.statusCode === 200) {
						message.success('Đã phân công');
						fetchRequests(currentPage, filterStatus, filterStaff);
						setIsModalAssignVisible(false);
						setIsModalOpen(false);
					}
				})
				.catch((error) => {
					hideLoading();
					console.error('Caught error:', error);
					message.error('Không thành công');
				});
		}
	};

	const handleOpenAssignModal = (task) => {
		setTaskID(task);
		setIsModalAssignVisible(true);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleRowClick = (record) => {
		setSelectedRecord(record);
		setIsModalOpen(true);
	};

	return (
		<div className={styles.headerContainer}>
			<h1>Yêu cầu xem đất</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => {
						setFilterStatus(value);
						setCurrentPage(1); // Reset to first page on filter change
					}}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="assigned">Đã phân công</Option>
					<Option value="pending">Chờ phân công</Option>
					<Option value="completed">Hoàn thành</Option>
				</Select>

				{/* <span>Lọc theo nhân viên:</span>
				<Select
					placeholder="Chọn Nhân Viên"
					onChange={(value) => {
						setFilterStaff(value);
						setCurrentPage(1); // Reset to first page on filter change
					}}
					style={{width: '20%'}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Dang Ninh">Dang Ninh</Option>
					<Option value="Ba Phuoc">Ba Phuoc</Option>
				</Select> */}
			</div>

			<Table
				loading={loadingFromRedux}
				columns={columns}
				dataSource={request}
				pagination={{
					current: currentPage,
					pageSize,
					total: Number(totalPages) * Number(pageSize),
					onChange: handlePageChange,
				}}
				rowKey="id"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
				rowClassName={(record, index) => (index % 2 === 0 ? styles.evenRow : styles.oddRow)}
			/>

			<Modal
				title="Chọn Nhân Viên Phân Công"
				visible={isModalAssignVisible}
				onCancel={() => {
					setIsModalAssignVisible(false);
					setAssignedStaff(null); // Clear assigned staff on modal close
				}}
				onOk={handleAssign}
				cancelText="Hủy"
				okText="Phân công"
			>
				<Select
					placeholder="Chọn Nhân Viên"
					onChange={(value) => setAssignedStaff(value)}
					style={{width: '100%'}}
				>
					{staffList.map((staff) => (
						<Option value={`${staff.user_id}`} key={staff.user_id}>
							{staff.full_name}
						</Option>
					))}
				</Select>
			</Modal>
			<ManageViewLandDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={() => setIsModalOpen(false)}
				selectedRequest={selectedRecord}
				handleOpenAssignModal={handleOpenAssignModal}
			/>
		</div>
	);
};
