import React, {useEffect, useState} from 'react';
import {Table, Select, Button, Space, Tag, Modal} from 'antd';
import styles from './ManageViewLand.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getListOfRequestViewLand} from '../../redux/slices/landSlice';

const {Option} = Select;

export const ManageViewLand = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [filterStaff, setFilterStaff] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [assignedStaff, setAssignedStaff] = useState(null);
	const [request, setRequest] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 10;
	const dispatch = useDispatch();

	const loadingFromRedux = useSelector((state) => state.landSlice.loading);

	useEffect(() => {
		fetchRequests(currentPage, filterStatus, filterStaff);
	}, [currentPage, filterStatus, filterStaff]);

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
			render: ({time_start}) => (
				<div>
					{new Date(time_start).toLocaleString('vi-VN', {
						year: 'numeric',
						month: 'long',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
						timeZone: 'Asia/Ho_Chi_Minh',
					})}
				</div>
			),
		},
		{
			title: 'Mô Tả',
			key: 'description',
			render: ({description}) => <div>{description ? description : 'Không có'}</div>,
		},
		{
			title: 'Nhân Viên',
			dataIndex: 'assignStaff',
			key: 'assignStaff',
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
		{
			title: 'Hành Động',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button
						disabled={record.status !== 'pending'}
						type="primary"
						onClick={() => {
							setSelectedRecord(record);
							setIsModalVisible(true);
						}}
					>
						Chọn nhân viên
					</Button>
				</Space>
			),
		},
	];

	const handleAssign = () => {
		if (selectedRecord && assignedStaff) {
			console.log(`Assigned ${assignedStaff} to ${selectedRecord.guest_full_name}`);
			setIsModalVisible(false);
			// You might want to dispatch an action to update the assigned staff in your backend here
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
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

				<span>Lọc theo nhân viên:</span>
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
				</Select>
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
			/>

			<Modal
				title="Chọn Nhân Viên Phân Công"
				visible={isModalVisible}
				onCancel={() => {
					setIsModalVisible(false);
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
					<Option value="Dang Ninh">Dang Ninh</Option>
					<Option value="Ba Phuoc">Ba Phuoc</Option>
				</Select>
			</Modal>
		</div>
	);
};
