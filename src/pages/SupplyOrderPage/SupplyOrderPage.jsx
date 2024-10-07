import React, {useState} from 'react';
import {Table, Button, Space, Select, Tag, DatePicker, Popconfirm} from 'antd';
import styles from './SupplyOrderPage.module.css';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {SupplyOrderDetailModal} from './SupplyOrderDetailModal';

const {Option} = Select;

const orderData = [
	{
		orderID: 'DH001',
		customer: 'Ngô Thanh Hùng',
		dateToShip: '06/09/2023',
		assignExpert: 'Bá Phước',
		totalPrice: 100000,
		status: 'Đã giao',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH002',
		customer: 'Trần Văn Bình',
		dateToShip: '10/09/2023',
		assignExpert: 'Đăng Ninh',
		totalPrice: 200000,
		status: 'Đang giao',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH003',
		customer: 'Lê Thị Thu',
		dateToShip: '15/09/2023',
		assignExpert: 'Tiến Dũng',
		totalPrice: 150000,
		status: 'Đang chuẩn bị',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH004',
		customer: 'Phạm Văn Cường',
		dateToShip: '18/09/2023',
		assignExpert: 'Bá Phước',
		totalPrice: 300000,
		status: 'Trả hàng',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH005',
		customer: 'Nguyễn Thị Lan',
		dateToShip: '20/09/2023',
		assignExpert: 'Đăng Ninh',
		totalPrice: 250000,
		status: 'Đã giao',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH006',
		customer: 'Vũ Hoàng Long',
		dateToShip: '22/09/2023',
		assignExpert: 'Tiến Dũng',
		totalPrice: 180000,
		status: 'Đang chuẩn bị',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH007',
		customer: 'Đặng Thị Hương',
		dateToShip: '25/09/2023',
		assignExpert: 'Bá Phước',
		totalPrice: 220000,
		status: 'Đang giao',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH008',
		customer: 'Hoàng Anh Tú',
		dateToShip: '27/09/2023',
		assignExpert: 'Tiến Dũng',
		totalPrice: 275000,
		status: 'Đang chuẩn bị',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH009',
		customer: 'Trần Thị Mỹ',
		dateToShip: '30/09/2023',
		assignExpert: 'Đăng Ninh',
		totalPrice: 320000,
		status: 'Đã giao',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH010',
		customer: 'Nguyễn Văn Hòa',
		dateToShip: '02/10/2023',
		assignExpert: 'Bá Phước',
		totalPrice: 150000,
		status: 'Trả hàng',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH011',
		customer: 'Lê Văn Tài',
		dateToShip: '05/10/2023',
		assignExpert: 'Đăng Ninh',
		totalPrice: 290000,
		status: 'Đang giao',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
	{
		orderID: 'DH012',
		customer: 'Phạm Thị Xuân',
		dateToShip: '07/10/2023',
		assignExpert: 'Tiến Dũng',
		totalPrice: 350000,
		status: 'Đang chuẩn bị',
		device: [
			{
				materialName: 'Máy xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Máy cắt cỏ',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Máy bơm nước',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Thiết bị tưới cây',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
		dateToRequest: '06/08/2023',
		dateToExpire: '06/10/2023',
	},
];

export const SupplyOrderPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [filterDate, setFilterDate] = useState(null);
	const [selectedOrder, setselectedOrder] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDateChange = (date, dateString) => {
		setFilterDate(dateString);
	};

	const filteredOrders = orderData.filter((order) => {
		const matchesStatus = filterStatus ? order.status === filterStatus : true;
		const matchesDate = filterDate ? order.dateToShip === filterDate : true;
		return matchesStatus && matchesDate;
	});

	const handleRowClick = (record) => {
		setselectedOrder(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setselectedOrder(null);
	};

	const columns = [
		{
			title: 'ID Đơn Hàng',
			dataIndex: 'orderID',
			key: 'orderID',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer',
			key: 'customer',
		},
		{
			title: 'Ngày gửi yêu cầu',
			dataIndex: 'dateToRequest',
			key: 'dateToRequest',
		},
		{
			title: 'Ngày Giao',
			dataIndex: 'dateToShip',
			key: 'dateToShip',
		},
		{
			title: 'Chuyên Viên Phụ Trách',
			dataIndex: 'assignExpert',
			key: 'assignExpert',
		},
		{
			title: 'Tổng Giá',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (price) => `${price.toLocaleString()} VND`,
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (_, {status}) => (
				<>
					{status == 'Đã giao' && (
						<Tag color="green" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Trả hàng' && (
						<Tag color="red" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Đang giao' && (
						<Tag color="warning" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Đang chuẩn bị' && (
						<Tag color="default" key={status}>
							{status}
						</Tag>
					)}
				</>
			),
		},
		// {
		// 	title: 'Hành Động',
		// 	key: 'actions',
		// 	render: (_, record) => (
		// 		<Space size="middle">
		// 			<Button
		// 				icon={<EditOutlined />}
		// 				color="primary"
		// 				variant="filled"
		// 				onClick={(e) => {
		// 					e.stopPropagation();
		// 					// handleUpdateClick(record);
		// 				}}
		// 			/>
		// 			<Popconfirm
		// 				title="Từ chối yêu cầu"
		// 				description="Bạn muốn từ chối yêu cầu này?"
		// 				onConfirm={(e) => {
		// 					e.stopPropagation();
		// 					// handleRemove(record.key);
		// 				}}
		// 				onClick={(e) => e.stopPropagation()}
		// 				onCancel={(e) => e.stopPropagation()}
		// 				okText="Từ chối"
		// 				cancelText="Huỷ"
		// 			>
		// 				<Button icon={<DeleteOutlined />} color="danger" variant="filled" />
		// 			</Popconfirm>
		// 		</Space>
		// 	),
		// },
	];

	return (
		<div className={styles.headerContainer}>
			<h1>Hóa đơn cung cấp thiết bị</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo ngày giao:</span>
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
					<Option value="Đã giao">Đã giao</Option>
					<Option value="Đang giao">Đang giao</Option>
					<Option value="Đang chuẩn bị">Đang chuẩn bị</Option>
					<Option value="Trả hàng">Trả hàng</Option>
				</Select>
			</div>

			<Table
				columns={columns}
				dataSource={filteredOrders}
				pagination={{pageSize: 5}}
				rowKey="orderID"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>

			<SupplyOrderDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedOrder={selectedOrder}
			/>
		</div>
	);
};
