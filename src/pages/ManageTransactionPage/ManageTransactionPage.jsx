import React, {useState} from 'react';
import {Table, Select, Button, Space, Tag} from 'antd';
import styles from './ManageTransactionPage.module.css';
import {ManageTransactionDetailModal} from './ManageTransactionDetailModal';

const {Option} = Select;

const transactionList = [
	{
		transactionID: 'GD001',
		customer: 'Minh Châu',
		price: 1000000,
		type: 'Thuê đất',
		content: 'TJDASJK-Service',
		createAt: '25/04/2020',
		status: 'Thành công',
	},
	{
		transactionID: 'GD002',
		customer: 'Ngọc Anh',
		price: 500000,
		type: 'Mua vật tư',
		content: 'Fertilizer Purchase',
		createAt: '10/05/2020',
		status: 'Đang xử lý',
	},
	{
		transactionID: 'GD003',
		customer: 'Hùng Dũng',
		price: 2000000,
		type: 'Thuê thiết bị',
		content: 'Tractor Rental',
		createAt: '15/05/2020',
		status: 'Thất bại',
	},
	{
		transactionID: 'GD004',
		customer: 'Bá Phước',
		price: 1500000,
		type: 'Mua dịch vụ',
		content: 'Soil Analysis',
		createAt: '20/05/2020',
		status: 'Thành công',
	},
];

export const ManageTransactionPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [filterType, setFilterType] = useState('');
	const [selectedTransaction, setselectedTransaction] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredTransactions = transactionList.filter((transaction) => {
		const matchesStatus = filterStatus ? transaction.status === filterStatus : true;
		const matchesType = filterType ? transaction.type === filterType : true;
		return matchesStatus && matchesType;
	});

	const handleRowClick = (record) => {
		setselectedTransaction(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setselectedTransaction(null);
	};

	const columns = [
		{
			title: 'Mã Giao Dịch',
			dataIndex: 'transactionID',
			key: 'transactionID',
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer',
			key: 'customer',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			render: (price) => `${price.toLocaleString()} VND`,
		},
		{
			title: 'Loại',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Nội Dung',
			dataIndex: 'content',
			key: 'content',
		},
		{
			title: 'Ngày Tạo',
			dataIndex: 'createAt',
			key: 'createAt',
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'Thành công'
							? 'green'
							: status === 'Đang xử lý'
								? 'orange'
								: 'red'
					}
				>
					{status}
				</Tag>
			),
		},
		// {
		// 	title: 'Hành Động',
		// 	key: 'actions',
		// 	render: (_, record) => (
		// 		<Space size="middle">
		// 			<Button
		// 				onClick={() => console.log(`Viewing details for ${record.transactionID}`)}
		// 			>
		// 				Chi Tiết
		// 			</Button>
		// 		</Space>
		// 	),
		// },
	];

	return (
		<div className={styles.headerContainer}>
			<h1>Quản Lý Giao Dịch</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => setFilterStatus(value)}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Thành công">Thành công</Option>
					<Option value="Đang xử lý">Đang xử lý</Option>
					<Option value="Thất bại">Thất bại</Option>
				</Select>

				<span>Lọc theo loại:</span>
				<Select
					placeholder="Chọn Loại"
					onChange={(value) => setFilterType(value)}
					style={{width: '20%'}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Thuê đất">Thuê đất</Option>
					<Option value="Thuê thiết bị">Thuê thiết bị</Option>
					<Option value="Mua vật tư">Mua vật tư</Option>
					<Option value="Mua dịch vụ">Mua dịch vụ</Option>
				</Select>
			</div>

			<Table
				columns={columns}
				dataSource={filteredTransactions}
				pagination={{pageSize: 5}}
				rowKey="transactionID"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>

			<ManageTransactionDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedTransaction={selectedTransaction}
			/>
		</div>
	);
};
