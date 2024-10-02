import {DatePicker, Input, Table, Tag, Button, Space, Select} from 'antd';
import React, {useState} from 'react';
import styles from './OrderReportsPage.module.css';
import {formatNumber} from '../../utils';
import {OrderReportsDetailModal} from './OrderReportsDetailModal';

const data = [
	{
		orderId: 'DH001',
		customerName: 'Nguyen Van A',
		customerPhone: '0987878786',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Đang giao',
		totalPrice: 100000,
		products: [
			{
				materialName: 'Xẻng xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Màng bọc 12m',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Cây sắt 3m',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Phân bón',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
	},
	{
		orderId: 'DH002',
		customerName: 'Nguyen Van A',
		customerPhone: '0987878786',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Đã giao',
		totalPrice: 100000,
		products: [
			{
				materialName: 'Xẻng xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Màng bọc 12m',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Cây sắt 3m',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Phân bón',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
	},
	{
		orderId: 'DH003',
		customerName: 'Nguyen Van A',
		customerPhone: '0987878786',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Đang chuẩn bị',
		totalPrice: 100000,
		products: [
			{
				materialName: 'Xẻng xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Màng bọc 12m',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Cây sắt 3m',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Phân bón',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
	},
	{
		orderId: 'DH004',
		customerName: 'Nguyen Van A',
		customerPhone: '0987878786',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Trả hàng',
		totalPrice: 100000,
		products: [
			{
				materialName: 'Xẻng xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Màng bọc 12m',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Cây sắt 3m',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Phân bón',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
	},
	{
		orderId: 'DH005',
		customerName: 'Nguyen Van A',
		customerPhone: '0987878786',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Đang giao',
		totalPrice: 100000,
		products: [
			{
				materialName: 'Xẻng xúc đất',
				quantity: 12,
				unitPrice: 100000,
			},
			{
				materialName: 'Màng bọc 12m',
				quantity: 2,
				unitPrice: 70000,
			},
			{
				materialName: 'Cây sắt 3m',
				quantity: 12,
				unitPrice: 600000,
			},
			{
				materialName: 'Phân bón',
				quantity: 12,
				unitPrice: 1000000,
			},
		],
	},
];

const statusOptions = [
	{
		value: 'Chấp nhận',
		label: 'Chấp nhận',
	},
	{
		value: 'Đang xử lý',
		label: 'Đang xử lý',
	},
	{
		value: 'Từ chối',
		label: 'Từ chối',
	},
];

const OrderReportsPage = () => {
	const columns = [
		{
			title: 'Mã đơn hàng',
			dataIndex: 'orderId',
			key: 'orderId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Ngày giao',
			dataIndex: 'deliveryDate',
			key: 'deliveryDate',
		},
		{
			title: 'Ngày gửi yêu cầu',
			dataIndex: 'dateRequest',
			key: 'dateRequest',
		},
		{
			title: 'Giá trị đơn hàng',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (text) => <>{formatNumber(text)} VND</>,
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
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
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const handleRejectService = (e) => {
		e.stopPropagation();
		console.log('Reject service');
	};

	const handleRowClick = (record) => {
		setSelectedOrder(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedOrder(null);
	};

	const handleAssignExpert = () => {
		console.log('Assigning');
	};
	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Báo cáo đơn hàng</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo ngày giao hàng:</span>
						<DatePicker
							className={styles.filterInput}
							placeholder="DD-MM-YYYY"
							onChange={(date, dateString) => {
								console.log(date, dateString);
							}}
							format={'DD-MM-YYYY'}
						/>
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo trạng thái:</span>
						<Select
							allowClear
							style={{
								width: '50%',
							}}
							placeholder="Chọn loại dịch vụ"
							options={statusOptions}
						/>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="OrderId"
					dataSource={data}
					columns={columns}
					scroll={{x: 'max-content'}}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					rowClassName={(record, index) =>
						index % 2 === 0 ? styles.evenRow : styles.oddRow
					}
					pagination={{
						pageSize: pageSize,
						current: currentPage,
						total: totalPage * pageSize,
						onChange: (page) => {
							setCurrentPage(page);
						},
					}}
					className={styles.table}
				/>

				<OrderReportsDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedOrder={selectedOrder}
				/>
			</div>
		</div>
	);
};

export default OrderReportsPage;
