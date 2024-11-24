import React, {useEffect, useState} from 'react';
import {Table, Button, Space, Select, Tag, Popconfirm, message} from 'antd';
import styles from './TaskManagementPage.module.css';
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {TaskManagementDetailModal} from './TaskManagementDetailModal';
import {TaskManagementAssignModal} from './TaskManagementAssignModal';
import {TaskManagementAddModal} from './TaskManagementAddModal';
import {useDispatch, useSelector} from 'react-redux';
import {isLoadingRequest, requestListSelector} from '../../redux/selectors';
import {approveRequest, getListRequest} from '../../redux/slices/requestSlice';
import {formatDate} from '../../utils';
import {toast} from 'react-toastify';

const {Option} = Select;

const dataTable = [
	{
		IDTask: 'NV0001',
		IDLand: 'MD001',
		Category: 'Hỗ trợ kĩ thuật',
		Content: 'Xử lí sâu bệnh cho cây ổi',
		Priority: 'Cao',
		Assign: 'Bá Phước',
		status: 'Hoàn thành',
	},
	{
		IDTask: 'NV0002',
		IDLand: 'MD002',
		Category: 'Hỗ trợ canh tác',
		Content: 'Tưới nước cho lúa',
		Priority: 'Trung bình',
		Assign: 'Đăng Ninh',
		status: 'Chờ xử lý',
	},
	{
		IDTask: 'NV0003',
		IDLand: 'MD003',
		Category: 'Hỗ trợ kĩ thuật',
		Content: 'Kiểm tra độ pH của đất',
		Priority: 'Thấp',
		Assign: 'Tiến Dũng',
		status: 'Chờ phân công',
	},
	{
		IDTask: 'NV0004',
		IDLand: 'MD004',
		Category: 'Hỗ trợ canh tác',
		Content: 'Gieo hạt giống cải xanh',
		Priority: 'Cao',
		Assign: 'Bá Phước',
		status: 'Chờ xử lý',
	},
	{
		IDTask: 'NV0005',
		IDLand: 'MD005',
		Category: 'Hỗ trợ kĩ thuật',
		Content: 'Phun thuốc trừ cỏ',
		Priority: 'Trung bình',
		Assign: 'Đăng Ninh',
		status: 'Hoàn thành',
	},
	{
		IDTask: 'NV0006',
		IDLand: 'MD006',
		Category: 'Hỗ trợ canh tác',
		Content: 'Làm cỏ cho vườn cam',
		Priority: 'Thấp',
		Assign: 'Tiến Dũng',
		status: 'Chờ xử lý',
	},
	{
		IDTask: 'NV0007',
		IDLand: 'MD007',
		Category: 'Hỗ trợ kĩ thuật',
		Content: 'Kiểm tra sâu bệnh trên cây chuối',
		Priority: 'Cao',
		Assign: 'Bá Phước',
		status: 'Chờ phân công',
	},
	{
		IDTask: 'NV0008',
		IDLand: 'MD008',
		Category: 'Hỗ trợ canh tác',
		Content: 'Bón phân hữu cơ cho vườn dưa hấu',
		Priority: 'Trung bình',
		Assign: 'Đăng Ninh',
		status: 'Chờ xử lý',
	},
	{
		IDTask: 'NV0009',
		IDLand: 'MD009',
		Category: 'Hỗ trợ kĩ thuật',
		Content: 'Tư vấn cách trồng cây táo',
		Priority: 'Cao',
		Assign: 'Tiến Dũng',
		status: 'Hoàn thành',
	},
	{
		IDTask: 'NV0010',
		IDLand: 'MD010',
		Category: 'Hỗ trợ canh tác',
		Content: 'Tưới nhỏ giọt cho vườn cà phê',
		Priority: 'Thấp',
		Assign: 'Bá Phước',
		status: 'Đang xử lý',
	},
];

export const TaskManagementPage = () => {
	const dispatch = useDispatch();

	const requestList = useSelector(requestListSelector);
	const loading = useSelector(isLoadingRequest);

	console.log('requestList', requestList);

	const [filterStatus, setFilterStatus] = useState('');
	const [filterPriority, setFilterPriority] = useState('');
	const [selectedRequestTask, setselectedRequestTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalAssignOpen, setIsModalAssignOpen] = useState(false);
	const [isModalAddOpen, setisModalAddOpen] = useState(false);
	const [selectedPlant, setSelectedPlant] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

	useEffect(() => {
		fetchTaskList(1);
	}, []);

	const fetchTaskList = (pageNumber) => {
		try {
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
			};
			dispatch(getListRequest(params));
		} catch (error) {
			console.log('Error fetching plant list: ' + error);
		}
	};

	// const filteredTasks = dataTable.filter((task) => {
	// 	const matchesStatus = filterStatus ? task.status === filterStatus : true;
	// 	const matchesPriority = filterPriority ? task.Priority === filterPriority : true;
	// 	return matchesStatus && matchesPriority;
	// });

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

	const columns = [
		{
			title: 'ID Nhiệm Vụ',
			dataIndex: 'request_id',
			key: 'request_id',
			render: (text) => <a>{text}</a>,
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
					{type == 'product_purchase' && <Tag color="geekblue">Thu mua</Tag>}
					{type == 'product_puchase_harvest' && <Tag color="success">Thu hoạch</Tag>}
					{type == 'cultivate_process_content' && <Tag color="lime">Ghi nhật ký</Tag>}
					{type == 'technical_support' && <Tag color="volcano">Hỗ trợ kỹ thuật</Tag>}
					{type == 'create_process_standard' && (
						<Tag color="cyan">Tạo quy trình chuẩn</Tag>
					)}
					{type == 'material_process_specfic_stage' && (
						<Tag color="pink">Cung cấp vật tư</Tag>
					)}
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
			render: (_, record) => <p>{record?.task?.assign_to?.full_name || ''}</p>,
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
					{record?.status != 'pending_approval' && (
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
					)}
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
				<span>Lọc theo độ ưu tiên:</span>
				<Select
					placeholder="Chọn Độ Ưu Tiên"
					onChange={(value) => setFilterPriority(value)}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Cao">Cao</Option>
					<Option value="Trung bình">Trung bình</Option>
					<Option value="Thấp">Thấp</Option>
				</Select>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => setFilterStatus(value)}
					style={{width: '20%'}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Hoàn thành">Hoàn thành</Option>
					<Option value="Chờ xử lý">Chờ xử lý</Option>
					<Option value="Chờ phân công">Chờ phân công</Option>
					<Option value="Đang xử lý">Đang xử lý</Option>
				</Select> */}
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
				}}
				rowClassName={(record, index) => (index % 2 === 0 ? styles.evenRow : styles.oddRow)}
				rowKey="IDTask"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>
			{/* 
			<TaskManagementDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedRequestTask={selectedRequestTask}
			/>

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
		</div>
	);
};
