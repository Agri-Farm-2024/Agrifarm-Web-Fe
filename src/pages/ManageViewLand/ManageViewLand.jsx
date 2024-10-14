import React, {useState} from 'react';
import {Table, Select, Button, Space, Tag, Modal} from 'antd';
import styles from './ManageViewLand.module.css';

const {Option} = Select;

const requestViewLand = [
	{
		id: 'YC0001',
		customer: 'Minh Châu',
		email: 'minhchau@gmail.com',
		phone: '0386041438',
		dateToCome: '17/11/2022',
		timeToCome: '08:00',
		desc: 'Tôi muốn coi mảnh đất này để canh tác',
		assignStaff: 'Dang Ninh',
		status: 'Đã phân công',
	},
	{
		id: 'YC0001',
		customer: 'Ngọc Anh',
		email: 'ngocanh@gmail.com',
		phone: '0381234567',
		dateToCome: '20/11/2022',
		timeToCome: '09:30',
		desc: 'Tôi muốn kiểm tra chất lượng đất',
		assignStaff: null,
		status: 'Chờ phân công',
	},
	{
		id: 'YC0001',
		customer: 'Hùng Dũng',
		email: 'hungdung@gmail.com',
		phone: '0398765432',
		dateToCome: '22/11/2022',
		timeToCome: '14:00',
		desc: 'Xem đất canh tác',
		assignStaff: 'Dang Ninh',
		status: 'Đang xem',
	},
];

export const ManageViewLand = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [filterStaff, setFilterStaff] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [assignedStaff, setAssignedStaff] = useState(null);

	const filteredRequests = requestViewLand.filter((request) => {
		const matchesStatus = filterStatus ? request.status === filterStatus : true;
		const matchesStaff = filterStaff ? request.assignStaff === filterStaff : true;
		return matchesStatus && matchesStaff;
	});

	const columns = [
		{
			title: 'ID Yêu Cầu',
			dataIndex: 'id',
			key: 'id',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer',
			key: 'customer',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		// {
		// 	title: 'Số Điện Thoại',
		// 	dataIndex: 'phone',
		// 	key: 'phone',
		// },
		{
			title: 'Ngày Đến',
			key: 'dateToCome',
			render: ({dateToCome, timeToCome}) => (
				<div>
					{dateToCome} - {timeToCome}
				</div>
			),
		},
		{
			title: 'Mô Tả',
			dataIndex: 'desc',
			key: 'desc',
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
						status === 'Đã phân công'
							? 'green'
							: status === 'Chờ phân công'
								? 'blue'
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
						disabled={record.status !== 'Chờ phân công'}
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
		if (selectedRecord) {
			// Here you can update the staff assignment in your actual data management logic
			// For this example, we just log the information
			console.log(`Assigned ${assignedStaff} to ${selectedRecord.customer}`);
			setIsModalVisible(false);
		}
	};

	return (
		<div className={styles.headerContainer}>
			<h1>Yêu cầu xem đất</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => setFilterStatus(value)}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Đã phân công">Đã phân công</Option>
					<Option value="Chờ phân công">Chờ phân công</Option>
					<Option value="Đang xem">Đang xem</Option>
				</Select>

				<span>Lọc theo nhân viên:</span>
				<Select
					placeholder="Chọn Nhân Viên"
					onChange={(value) => setFilterStaff(value)}
					style={{width: '20%'}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Dang Ninh">Dang Ninh</Option>
					<Option value="Ba Phuoc">Ba Phuoc</Option>
				</Select>
			</div>

			<Table
				columns={columns}
				dataSource={filteredRequests}
				pagination={{pageSize: 5}}
				rowKey="email"
				className={styles.tableContainer}
			/>

			<Modal
				title="Chọn Nhân Viên Phân Công"
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
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
