import React, {useEffect, useState} from 'react';
import {Table, Select, Button, Space, Tag, Modal, message, Tooltip, Popconfirm} from 'antd';
import styles from './LandReportsPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getListOfReportLand} from '../../redux/slices/landSlice';
import {capitalizeFirstLetter, formatDate, formatNumber, formatTimeViewLand} from '../../utils';
import {approveRequest, assignForTask} from '../../redux/slices/requestSlice';
import {getListOfExpert, getListOfStaff} from '../../redux/slices/userSlice';
import {LandReportsDetailModal} from './LandReportsDetailModal';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

const {Option} = Select;

export const LandReportsPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [assignedStaff, setAssignedStaff] = useState(null);
	const [isModalAssignVisible, setIsModalAssignVisible] = useState(false);
	const [staffList, setStaffList] = useState([]);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [selectedReport, setSelectedReport] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const pageSize = 10;

	const dispatch = useDispatch();

	const loadingFromRedux = useSelector((state) => state.landSlice.loading);
	const reports = useSelector((state) => state.landSlice.reports?.requests);
	const pagination = useSelector((state) => state.landSlice.reports?.pagination);

	console.log('reports: ' + JSON.stringify(reports));

	useEffect(() => {
		fetchReports();
	}, [currentPage, filterStatus]);

	const fetchReports = () => {
		dispatch(
			getListOfReportLand({
				page_size: pageSize,
				page_index: currentPage,
				status: filterStatus,
			})
		);
	};

	useEffect(() => {
		dispatch(getListOfExpert())
			.then((res) => {
				if (res.payload.statusCode === 200) {
					console.log('getListOfExpert: ' + JSON.stringify(res.payload.metadata.users));
					setStaffList(res.payload.metadata.users);
				}
			})
			.catch((error) => {
				console.error('Caught error:', error);
			});
	}, []);

	const handleRowClick = (record) => {
		setSelectedReport(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedReport(null);
	};

	const handleChangeStatusRequest = (e, actionType, request) => {
		e.stopPropagation();
		const hideLoading = message.loading('Đang xử lý...', 0);
		if (actionType == 'approve') {
			const params = {
				requestId: request.request_id,
				formData: {
					status: 'completed',
					reason_for_reject: null,
				},
			};
			dispatch(approveRequest(params)).then((response) => {
				hideLoading();
				console.log('Approve request reponse: ' + response);
				if (response.payload && response.payload.statusCode) {
					//Catch Error message
					if (response.payload.statusCode !== 200) {
						if (response.payload.message === 'Request purchase already exist') {
							message.error('Yêu cầu thu hoạch đã được tạo');
							return;
						}
						message.error('Chấp nhận yêu cầu thất bại');
						console.log('Approve request failed!: ' + response.payload.message);
					}

					if (response.payload.statusCode === 200) {
						message.success('Chấp nhận yêu cầu thành công');
						fetchReports();
					}
				}
			});
		}

		if (actionType == 'reject') {
			const params = {
				requestId: request.request_id,
				formData: {
					status: 'rejected',
					reason_for_reject: 'Không chấp nhận',
				},
			};
			dispatch(approveRequest(params)).then((response) => {
				hideLoading();
				console.log('Approve request reponse: ' + response);
				if (response.payload && response.payload.statusCode) {
					//Catch Error message
					if (response.payload.statusCode !== 200) {
						message.error('Từ chối yêu cầu thất bại');
						console.log('Approve request failed!');
					}

					if (response.payload.statusCode === 200) {
						message.info('Từ chối yêu cầu thành công');
						fetchReports();
					}
				}
			});
		}
	};

	const columns = [
		{
			title: 'Ngày tạo',
			dataIndex: 'create_at',
			key: 'create_at',
			render: (_, record) => <div> {formatTimeViewLand(record?.created_at)}</div>,
		},
		{
			title: 'Tên Người Thuê',
			dataIndex: 'guest_full_name',
			key: 'guest_full_name',
			render: (_, record) => <p> {record?.booking_land?.land_renter?.full_name}</p>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (_, record) => <p> {record?.booking_land?.land_renter?.email}</p>,
		},
		{
			title: 'Tên Mảnh Đất',
			dataIndex: 'land_name',
			key: 'land_name',
			render: (_, record) => (
				<p> {capitalizeFirstLetter(record?.booking_land?.land?.name)}</p>
			),
		},
		{
			title: 'Diện tích',
			dataIndex: 'land_area',
			key: 'land_area',
			render: (_, record) => (
				<p> {formatNumber(record?.booking_land?.land?.acreage_land)} m2</p>
			),
		},
		{
			title: 'Thời Gian Thuê',
			key: 'rental_time',
			render: (_, record) =>
				`${formatDate(record?.booking_land?.time_start)} - ${formatDate(record?.booking_land?.time_end)}`,
		},

		// {
		// 	title: 'Chi Phí Phát Sinh (VND)',
		// 	dataIndex: 'extra_cost',
		// 	key: 'extra_cost',
		// 	// render: (cost) => cost.toLocaleString(),
		// },
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'assigned'
							? 'blue'
							: status === 'completed'
								? 'green'
								: status === 'pending_approval'
									? 'magenta'
									: status === 'rejected'
										? 'red'
										: 'orange'
					}
				>
					{status === 'assigned'
						? 'Đã phân công'
						: status === 'completed'
							? 'Hoàn thành'
							: status === 'pending_approval'
								? 'Chờ phê duyệt'
								: status === 'rejected'
									? 'Đã từ chối'
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
						onClick={(e) => {
							e.stopPropagation();
							setSelectedRecord(record);
							setIsModalAssignVisible(true);
						}}
					>
						Chọn chuyên viên
					</Button>
					<Tooltip title="Chấp nhận">
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Chấp nhận yêu cầu"
							description="Bạn muốn chấp nhận yêu cầu này?"
							onConfirm={(e) => handleChangeStatusRequest(e, 'approve', record)}
							onCancel={(e) => e.stopPropagation()}
							okText="Chấp nhận"
							cancelText="Huỷ"
						>
							<Button
								disabled={record.status != 'pending_approval' ? true : false}
								color="primary"
								variant="filled"
								icon={<CheckOutlined />}
							></Button>
						</Popconfirm>
					</Tooltip>
					<Tooltip title="Từ chối">
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Từ chối yêu cầu"
							description="Bạn muốn từ chối yêu cầu này?"
							onConfirm={(e) => handleChangeStatusRequest(e, 'reject', record)}
							onCancel={(e) => e.stopPropagation()}
							okText="Từ chối"
							cancelText="Huỷ"
						>
							<Button
								disabled={record.status != 'pending_approval' ? true : false}
								color="danger"
								variant="filled"
								icon={<CloseOutlined />}
							></Button>
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleAssign = () => {
		if (assignedStaff) {
			const hideLoading = message.loading('Đang xử lí...', 0);
			dispatch(assignForTask({taskID: selectedRecord.task.task_id, staffID: assignedStaff}))
				.then((res) => {
					hideLoading();
					if (res.payload.statusCode === 200) {
						message.success('Đã phân công');
						fetchReports();
						setIsModalAssignVisible(false);
					}
				})
				.catch((error) => {
					hideLoading();
					console.error('Caught error:', error);
					message.error('Không thành công');
				});
			console.log('assignedStaff: ' + assignedStaff);
			return;
		}
		message.error('Hãy chọn nhân viên');
	};

	return (
		<div className={styles.headerContainer}>
			<p>Báo Cáo Đất Sau Thuê</p>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					marginBottom: '2rem',
				}}
			>
				<span style={{marginRight: 10, fontWeight: 'bold'}}>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => {
						setFilterStatus(value);
						setCurrentPage(1);
					}}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="completed">Hoàn thành</Option>
					<Option value="pending_approval">Chờ phê duyệt</Option>
					<Option value="assigned">Đã phân công</Option>
					<Option value="pending">Chờ phân công</Option>
					<Option value="rejected">Từ chối</Option>
				</Select>
			</div>

			<Table
				loading={loadingFromRedux}
				columns={columns}
				dataSource={reports}
				pagination={{
					current: currentPage,
					pageSize,
					total: Number(pagination?.total_page) * Number(pageSize),
					onChange: handlePageChange,
				}}
				rowKey="request_id"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>

			<LandReportsDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedReport={selectedReport}
			/>

			<Modal
				title="Chọn chuyên viên Phân Công"
				visible={isModalAssignVisible}
				onCancel={() => {
					setIsModalAssignVisible(false);
					setAssignedStaff(null);
				}}
				onOk={handleAssign}
				cancelText="Hủy"
				okText="Phân công"
			>
				<Select
					placeholder="Chọn chuyên viên"
					onChange={(value) => setAssignedStaff(value)}
					value={assignedStaff || undefined}
					allowClear
					style={{width: '100%'}}
				>
					{staffList.map((staff) => (
						<Option value={`${staff.user_id}`} key={staff.user_id}>
							{staff.full_name}
						</Option>
					))}
				</Select>
			</Modal>
		</div>
	);
};
