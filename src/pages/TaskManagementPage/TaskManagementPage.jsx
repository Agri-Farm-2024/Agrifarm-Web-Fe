import React, {useState} from 'react';
import {Table, Button, Space, Select, Tag, Popconfirm} from 'antd';
import styles from './TaskManagementPage.module.css';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {TaskManagementDetailModal} from './TaskManagementDetailModal';
import {TaskManagementAssignModal} from './TaskManagementAssignModal';
import {TaskManagementAddModal} from './TaskManagementAddModal';

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
	const [filterStatus, setFilterStatus] = useState('');
	const [filterPriority, setFilterPriority] = useState('');
	const [selectedRequestTask, setselectedRequestTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalAssignOpen, setIsModalAssignOpen] = useState(false);
	const [isModalAddOpen, setisModalAddOpen] = useState(false);

	const filteredTasks = dataTable.filter((task) => {
		const matchesStatus = filterStatus ? task.status === filterStatus : true;
		const matchesPriority = filterPriority ? task.Priority === filterPriority : true;
		return matchesStatus && matchesPriority;
	});

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

	const columns = [
		{
			title: 'ID Nhiệm Vụ',
			dataIndex: 'IDTask',
			key: 'IDTask',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'ID Lô Đất',
			dataIndex: 'IDLand',
			key: 'IDLand',
		},
		{
			title: 'Loại Hỗ Trợ',
			dataIndex: 'Category',
			key: 'Category',
		},
		{
			title: 'Nội Dung',
			dataIndex: 'Content',
			key: 'Content',
		},
		{
			title: 'Độ Ưu Tiên',
			dataIndex: 'Priority',
			key: 'Priority',
			render: (priority) => (
				<Tag
					color={
						priority === 'Cao' ? 'red' : priority === 'Trung bình' ? 'blue' : 'green'
					}
				>
					{priority}
				</Tag>
			),
		},
		{
			title: 'Người Thực Hiện',
			dataIndex: 'Assign',
			key: 'Assign',
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'Hoàn thành'
							? 'green'
							: status === 'Chờ xử lý'
								? 'gray'
								: status === 'Chờ phân công'
									? 'red'
									: 'orange'
					}
				>
					{status}
				</Tag>
			),
		},
		{
			title: 'Hành Động',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
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
				</Space>
			),
		},
	];

	return (
		<div className={styles.headerContainer}>
			<h1>Quản Lý Nhiệm Vụ</h1>

			<div className={styles.filterContainer}>
				<Button type="primary" onClick={() => setisModalAddOpen(true)}>
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
				</Select>
			</div>

			<Table
				columns={columns}
				dataSource={filteredTasks}
				pagination={{pageSize: 5}}
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

			<TaskManagementAssignModal
				isModalOpen={isModalAssignOpen}
				handleModalClose={handleModalUpdateClose}
				selectedRequestTask={selectedRequestTask}
			/>

			<TaskManagementAddModal
				isModalOpen={isModalAddOpen}
				handleModalClose={() => setisModalAddOpen(false)}
				handleAddTask={handleAddTask}
			/>
		</div>
	);
};
