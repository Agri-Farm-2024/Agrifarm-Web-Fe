import {DatePicker, Input, Table, Button, Space, Popconfirm, Tag, Select} from 'antd';
import React, {useState} from 'react';
import styles from './LandLeaseRequestPage.module.css';
import {CheckOutlined, DeleteOutlined, EditOutlined, FileAddOutlined} from '@ant-design/icons';
import {formatNumber} from '../../utils';
import {LandLeaseRequestDetailModal} from './LandLeaseRequestDetailModal';
import {LandLeaseRequestUpdateModal} from './LandLeaseRequestUpdateModal';

const {Option} = Select;

const requests = [
	{
		key: 'YC0001',
		Customer: 'Nguyễn Văn A',
		landId: 'MD001',
		address: '089 Kutch Green Căn hộ 448',
		dateSendRequest: '04/09/2019',
		timeToRent: 6, // tháng
		status: 'Chờ xử lý',
		totalPrice: 100000,
	},
	{
		key: 'YC0002',
		Customer: 'Trần Thị B',
		landId: 'MD002',
		address: '234 Green St. Căn hộ 2A',
		dateSendRequest: '05/09/2019',
		timeToRent: 12, // tháng
		status: 'Chấp nhận',
		totalPrice: 200000,
	},
	{
		key: 'YC0003',
		Customer: 'Lê Hoàng C',
		landId: 'MD003',
		address: '45 Lê Lợi, Quận 1',
		dateSendRequest: '12/10/2019',
		timeToRent: 9, // tháng
		status: 'Chờ xử lý',
		totalPrice: 150000,
	},
	{
		key: 'YC0004',
		Customer: 'Phạm Thị D',
		landId: 'MD004',
		address: '789 Nguyễn Trãi, Quận 5',
		dateSendRequest: '15/11/2019',
		timeToRent: 24, // tháng
		status: 'Chấp nhận',
		totalPrice: 500000,
	},
	{
		key: 'YC0005',
		Customer: 'Nguyễn Văn E',
		landId: 'MD005',
		address: '123 Bạch Đằng, Phường 3',
		dateSendRequest: '20/12/2019',
		timeToRent: 3, // tháng
		status: 'Bị từ chối',
		totalPrice: 50000,
	},
	{
		key: 'YC0006',
		Customer: 'Đỗ Thị F',
		landId: 'MD006',
		address: '456 Lý Thái Tổ, Phường 4',
		dateSendRequest: '25/01/2020',
		timeToRent: 18, // tháng
		status: 'Chờ xử lý',
		totalPrice: 300000,
	},
	{
		key: 'YC0007',
		Customer: 'Trần Văn G',
		landId: 'MD007',
		address: '789 Trần Hưng Đạo, Phường 5',
		dateSendRequest: '02/02/2020',
		timeToRent: 12, // tháng
		status: 'Từ chối',
		totalPrice: 250000,
	},
];

export const LandLeaseRequestPage = () => {
	const [filterCustomer, setFilterCustomer] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const [filterDate, setFilterDate] = useState(null);
	const [selectedRequest, setselectedRequest] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

	const handleRemove = (requestID) => {
		console.log(`Xóa yêu cầu: ${requestID}`);
		// Triển khai chức năng xóa tại đây
	};

	const handleRowClick = (record) => {
		setselectedRequest(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setselectedRequest(null);
	};

	const handleUpdateClick = (record) => {
		setselectedRequest(record);
		setIsModalUpdateOpen(true);
	};

	const handleModalUpdateClose = () => {
		setIsModalUpdateOpen(false);
		setselectedRequest(null);
	};

	const handleDateChange = (date, dateString) => {
		setFilterDate(dateString);
	};

	const filteredRequests = requests.filter((request) => {
		const matchesCustomer = request.Customer.toLowerCase().includes(
			filterCustomer.toLowerCase()
		);
		const matchesStatus = filterStatus ? request.status === filterStatus : true;
		const matchesDate = filterDate ? request.dateSendRequest === filterDate : true;
		return matchesCustomer && matchesStatus && matchesDate;
	});

	const columns = [
		{
			title: 'ID Yêu Cầu',
			dataIndex: 'key',
			key: 'key',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'Customer',
			key: 'Customer',
		},
		{
			title: 'ID Lô Đất',
			dataIndex: 'landId',
			key: 'landId',
		},
		{
			title: 'Địa Chỉ',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Ngày Gửi',
			dataIndex: 'dateSendRequest',
			key: 'dateSendRequest',
		},
		{
			title: 'Thời Gian Thuê (tháng)',
			dataIndex: 'timeToRent',
			key: 'timeToRent',
			render: (text) => <div style={{textAlign: 'center'}}>{text} tháng</div>,
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'Chờ xử lý' ? 'gold' : status === 'Chấp nhận' ? 'green' : 'red'
					}
				>
					{status}
				</Tag>
			),
		},
		{
			title: 'Tổng Giá',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (price) => `${formatNumber(price)} VND`,
		},
		{
			title: 'Hành Động',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Popconfirm
						title="Chấp nhận"
						description="Bạn muốn chấp nhận yêu cầu này?"
						onConfirm={(e) => {
							e.stopPropagation();
							handleRemove(record.key);
						}}
						onClick={(e) => e.stopPropagation()}
						onCancel={(e) => e.stopPropagation()}
						okText="Chấp nhận"
						cancelText="Huỷ"
					>
						<Button
							icon={<CheckOutlined />}
							color="primary"
							variant="filled"
							onClick={(e) => {
								e.stopPropagation();
								// handleUpdateClick(record);
							}}
						/>
					</Popconfirm>

					<Button
						icon={<FileAddOutlined />}
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
							handleRemove(record.key);
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
			<h1>Yêu Cầu Thuê Đất</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo thời gian thuê:</span>
				<DatePicker
					placeholder="Chọn Ngày"
					onChange={handleDateChange}
					style={{marginRight: 8}}
				/>
				<span>Lọc theo trạng thái:</span>

				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => setFilterStatus(value)}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Chờ xử lý">Chờ xử lý</Option>
					<Option value="Chấp nhận">Chấp nhận</Option>
				</Select>
			</div>

			<Table
				columns={columns}
				dataSource={filteredRequests}
				pagination={{pageSize: 5}}
				rowKey="key"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>

			<LandLeaseRequestDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedRequest={selectedRequest}
			/>

			<LandLeaseRequestUpdateModal
				isModalOpen={isModalUpdateOpen}
				handleModalClose={handleModalUpdateClose}
				selectedRequest={selectedRequest}
			/>
		</div>
	);
};
