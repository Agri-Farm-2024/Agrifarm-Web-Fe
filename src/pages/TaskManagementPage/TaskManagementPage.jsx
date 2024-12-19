import React, {useEffect, useState} from 'react';
import {Table, Button, Space, Select, Tag, Popconfirm, message, Modal} from 'antd';
import styles from './TaskManagementPage.module.css';
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	ReloadOutlined,
} from '@ant-design/icons';
import {TaskManagementDetailModal} from './TaskManagementDetailModal';
import {TaskManagementAssignModal} from './TaskManagementAssignModal';
import {TaskManagementAddModal} from './TaskManagementAddModal';
import {useDispatch, useSelector} from 'react-redux';
import {isLoadingRequest, requestListSelector} from '../../redux/selectors';
import {approveRequest, assignForTask, getListRequest} from '../../redux/slices/requestSlice';
import {formatDate} from '../../utils';
import {toast} from 'react-toastify';
import {getListOfExpert} from '../../redux/slices/userSlice';

const {Option} = Select;

export const TaskManagementPage = () => {
	const dispatch = useDispatch();

	const requestList = useSelector(requestListSelector);
	const loading = useSelector(isLoadingRequest);

	console.log('requestList', requestList);

	const [filterStatus, setFilterStatus] = useState('');
	const [filterType, setfilterType] = useState('');
	const [selectedRequestTask, setselectedRequestTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalAssignOpen, setIsModalAssignOpen] = useState(false);
	const [isModalAddOpen, setisModalAddOpen] = useState(false);
	const [selectedPlant, setSelectedPlant] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [staffList, setStaffList] = useState([]);
	const [isModalAssignVisible, setIsModalAssignVisible] = useState(false);
	const [assignedStaff, setAssignedStaff] = useState(null);

	useEffect(() => {
		fetchTaskList(1);
	}, [filterStatus, filterType]);

	const fetchTaskList = (pageNumber) => {
		console.log('filterType: ' + filterType);
		try {
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
				status: filterStatus,
				type: filterType,
			};
			dispatch(getListRequest(params));
		} catch (error) {
			console.log('Error fetching plant list: ' + error);
		}
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
		setselectedRequestTask(record);
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setselectedRequestTask(null);
	};

	const handleUpdateClick = (record) => {
		setselectedRequestTask(record);
		setIsModalAssignOpen(true);
	};

	const handleModalUpdateClose = () => {
		setIsModalAssignOpen(false);
		setselectedRequestTask(null);
	};

	const handleAddTask = (newTask) => {
		console.log(newTask);
	};
	const handleRejectModalClose = (isRejectSuccess) => {
		if (isRejectSuccess) {
			fetchTaskList(1);
		}
		setselectedRequestTask(null);
		setIsRejectModalOpen(false);
	};

	const handleConfirmRequest = (e, isConfirm, request) => {
		e.stopPropagation();
		if (isConfirm) {
			try {
				const formData = {
					status: 'completed',
					reason_for_reject: null,
				};

				const params = {
					requestId: request.request_id,
					formData: formData,
				};
				toast.loading('Đang tiến hành...', {autoClose: false});
				dispatch(approveRequest(params)).then((response) => {
					console.log('Approve request reponse: ' + response);
					toast.dismiss(); // Remove the loading message
					if (response.payload && response.payload.statusCode) {
						//Catch Error message
						if (response.payload.statusCode !== 200) {
							message.error('Chấp nhận yêu cầu thất bại');
							console.log('Approve request failed!');
						}

						if (response.payload.statusCode === 200) {
							message.success('Chấp nhận yêu cầu thành công');
							fetchTaskList(1);
						}
					}
				});
			} catch (error) {
				console.log('Error confirm request', error);
				toast.dismiss(); // Remove the loading message
				message.error('Chấp nhận quy trình thất bại');
			}
		} else {
			setselectedRequestTask(request);
			// setIsRejectModalOpen(true);
		}
	};

	const handleAssign = () => {
		console.log('assignedStaff: ' + assignedStaff);
		console.log('task: ' + selectedRequestTask.task.task_id);

		if (assignedStaff) {
			const hideLoading = message.loading('Đang xử lí...', 0);
			dispatch(
				assignForTask({taskID: selectedRequestTask.task.task_id, staffID: assignedStaff})
			)
				.then((res) => {
					hideLoading();
					if (res.payload.statusCode === 200) {
						message.success('Đã phân công');
						fetchTaskList(1);
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

	const columns = [
		{
			title: (
				<ReloadOutlined
					className={styles.reloadBtn}
					onClick={() => {
						fetchTaskList(1);
					}}
				/>
			),
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'ID Nhiệm Vụ',
			dataIndex: 'request_id',
			key: 'request_id',
			render: (text) => <>{text}</>,
		},
		// {
		// 	title: 'ID Lô Đất',
		// 	dataIndex: 'IDLand',
		// 	key: 'IDLand',
		// },
		{
			title: 'Loại yêu cầu',
			dataIndex: 'type',
			render: (type) => (
				<>
					{type === 'view_land' && <Tag color="gold">Xem đất</Tag>}
					{type === 'product_purchase' && <Tag color="geekblue">Thu mua</Tag>}
					{type === 'product_puchase_harvest' && <Tag color="success">Thu hoạch</Tag>}
					{type === 'technical_support' && <Tag color="volcano">Hỗ trợ kỹ thuật</Tag>}
					{type === 'create_process_standard' && (
						<Tag color="cyan">Tạo quy trình chuẩn</Tag>
					)}
					{type === 'report_land' && <Tag color="purple">Báo cáo đất</Tag>}
					{type === 'report_booking_material' && (
						<Tag color="magenta">Báo cáo vật tư</Tag>
					)}
					{type === 'report_service_specific' && (
						<Tag color="orange">Báo cáo dịch vụ</Tag>
					)}
					{type === 'material_process_specfic_stage' && (
						<Tag color="pink">Cung cấp vật tư</Tag>
					)}
					{type === 'cultivate_process_content' && <Tag color="lime">Ghi nhật ký</Tag>}
				</>
			),
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (date) => <p>{formatDate(date)}</p>,
		},
		{
			title: 'Hình thức hỗ trợ',
			dataIndex: 'support_type',
			key: 'support_type',
			render: (support_type) => (
				<>
					{support_type == 'direct' && <Tag color="purple">Trực tiếp</Tag>}
					{support_type == 'chat' && <Tag color="orange">Chat</Tag>}
				</>
			),
		},
		{
			title: 'Người Thực Hiện',
			dataIndex: 'assign_to',
			key: 'assign_to',
			render: (_, record) => <p>{record?.task?.assign_to?.full_name || 'Chưa có'}</p>,
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<>
					{status == 'assigned' && <Tag color="cyan">Đã phân công</Tag>}
					{status == 'completed' && <Tag color="success">Hoàn thành</Tag>}
					{status == 'pending' && <Tag color="processing">Đang xử lý</Tag>}
					{status == 'in_progress' && <Tag color="processing">Đang xử lý</Tag>}
					{status == 'pending_approval' && <Tag color="orange">Đợi duyệt</Tag>}
					{status == 'rejected' && <Tag color="volcano">Chat</Tag>}
				</>
			),
		},
		{
			title: 'Hành Động',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					{/* {record?.status != 'pending_approval' && (
						<>
							<Button
								icon={<EditOutlined />}
								color="primary"
								variant="filled"
								onClick={(e) => {
									e.stopPropagation();
									handleUpdateClick(record);
								}}
							/>
							<Popconfirm
								title="Từ chối yêu cầu"
								description="Bạn muốn từ chối yêu cầu này?"
								onConfirm={(e) => {
									e.stopPropagation();
									// handleRemove(record.key);
								}}
								onClick={(e) => e.stopPropagation()}
								onCancel={(e) => e.stopPropagation()}
								okText="Từ chối"
								cancelText="Huỷ"
							>
								<Button icon={<DeleteOutlined />} color="danger" variant="filled" />
							</Popconfirm>
						</>
					)}
					{record.status == 'pending_approval' && (
						<Space size="middle">
							<Popconfirm
								onClick={(e) => e.stopPropagation()}
								title="Duyệt quy trình chuẩn"
								description="Chấp nhận quy trình này?"
								onConfirm={(e) => handleConfirmRequest(e, true, record)}
								onCancel={(e) => e.stopPropagation()}
								okText="Duyệt"
								cancelText="Huỷ"
							>
								<Button
									color="primary"
									variant="filled"
									icon={<CheckOutlined />}
								></Button>
							</Popconfirm>
							<Popconfirm
								onClick={(e) => e.stopPropagation()}
								title="Từ chối quy trình"
								description="Bạn muốn từ chối quy trình này?"
								onConfirm={(e) => handleConfirmRequest(e, false, record)}
								onCancel={(e) => e.stopPropagation()}
								okText="Từ chối"
								cancelText="Huỷ"
							>
								<Button
									color="danger"
									variant="filled"
									icon={<CloseOutlined />}
								></Button>
							</Popconfirm>
						</Space>
					)} */}
					<Button
						disabled={record?.task?.assign_to?.full_name}
						type="primary"
						onClick={(e) => {
							e.stopPropagation();
							setselectedRequestTask(record);
							setIsModalAssignVisible(true);
						}}
					>
						Chọn chuyên viên
					</Button>
				</Space>
			),
		},
	];

	return (
		<div className={styles.headerContainer}>
			<h1>Quản Lý Nhiệm Vụ</h1>

			<div className={styles.filterContainer}>
				{/* <Button type="primary" onClick={() => setisModalAddOpen(true)}>
					Thêm nhiệm vụ
				</Button>
				
			 */}
				<div className={styles.fiterItem}>
					<span>Lọc theo loại yêu cầu:</span>
					<Select
						className={styles.filterInput}
						placeholder="Chọn loại yêu cầu"
						onChange={(value) => {
							setCurrentPage(1);
							setfilterType(value);
						}}
					>
						<Option value="">Tất cả</Option>
						{/* <Option value="view_land">Xem đất</Option> */}
						<Option value="product_purchase">Thu mua</Option>
						<Option value="product_puchase_harvest">Thu hoạch</Option>
						<Option value="cultivate_process_content">Ghi nhật ký</Option>
						<Option value="technical_support">Hỗ trợ kỹ thuật</Option>
						<Option value="create_process_standard">Tạo quy trình chuẩn</Option>
						<Option value="report_land">Báo cáo đất</Option>
						<Option value="report_booking_material">Báo cáo vật tư</Option>
						<Option value="report_service_specific">Báo cáo dịch vụ</Option>
						<Option value="material_process_specfic_stage">Cung cấp vật tư</Option>
					</Select>
				</div>
				<div className={styles.fiterItem}>
					<span>Lọc theo trạng thái:</span>
					<Select
						className={styles.filterInput}
						placeholder="Chọn trạng thái"
						onChange={(value) => {
							setCurrentPage(1);
							setFilterStatus(value);
						}}
					>
						<Option value="">Tất cả</Option>
						<Option value="assigned">Đã phân công</Option>
						<Option value="completed">Hoàn thành</Option>
						<Option value="pending">Đang xử lý</Option>
						<Option value="pending_approval">Đợi duyệt</Option>
						<Option value="rejected">Từ chối</Option>
					</Select>
				</div>
			</div>

			<Table
				columns={columns}
				loading={loading}
				dataSource={requestList.requests || []}
				scroll={{x: 'max-content'}}
				pagination={{
					pageSize: pageSize,
					current: currentPage,
					total: requestList.pagination
						? requestList?.pagination.total_page * pageSize //total items
						: 1,
					onChange: (page) => {
						fetchTaskList(page);
					},
					showSizeChanger: false,
				}}
				rowClassName={(record, index) => (index % 2 === 0 ? styles.evenRow : styles.oddRow)}
				rowKey="IDTask"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>
			<TaskManagementDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedRequestTask={selectedRequestTask}
			/>
			{/* 
		

			<TaskManagementAssignModal
				isModalOpen={isModalAssignOpen}
				handleModalClose={handleModalUpdateClose}
				selectedRequestTask={selectedRequestTask}
			/>

			<TaskManagementAddModal
				isModalOpen={isModalAddOpen}
				handleModalClose={() => setisModalAddOpen(false)}
				handleAddTask={handleAddTask}
			/> */}

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
