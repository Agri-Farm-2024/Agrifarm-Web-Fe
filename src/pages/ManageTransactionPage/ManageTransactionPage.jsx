import React, {useEffect, useState} from 'react';
import {Table, Select, Button, Space, Tag} from 'antd';
import styles from './ManageTransactionPage.module.css';
import {ManageTransactionDetailModal} from './ManageTransactionDetailModal';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTransaction} from '../../redux/slices/transactionSlice';
import {transactionListSelector} from '../../redux/selectors';
import {formatTimeViewLand} from '../../utils';
import {ReloadOutlined} from '@ant-design/icons';

const {Option} = Select;

export const ManageTransactionPage = () => {
	const dispatch = useDispatch();

	const [filterStatus, setFilterStatus] = useState(null);
	const [filterType, setFilterType] = useState('');
	const [selectedTransaction, setselectedTransaction] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [totalPage, setTotalPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const transactions = useSelector(
		(state) => state?.transactionSlice?.transactions?.transactions
	);
	const pagination = useSelector((state) => state?.transactionSlice?.transactions?.pagination);
	const loading = useSelector((state) => state?.transactionSlice?.loading);

	console.log(`transactions: ` + JSON.stringify(transactions));

	useEffect(() => {
		dispatch(
			getAllTransaction({
				status: filterStatus,
				type: filterType,
				page_size: pageSize,
				page_index: currentPage,
			})
		).then((response) => {
			console.log('Data fetched:', response.payload);
		});
	}, [dispatch, currentPage, pageSize, filterStatus, filterType]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const data = useSelector(transactionListSelector);

	const handleRowClick = (record) => {
		setselectedTransaction(record);
		setIsModalOpen(true);
	};

	const handleModalClose = (isLoading) => {
		if (isLoading === true) {
			dispatch(
				getAllTransaction({
					status: filterStatus,
					type: filterType,
					page_size: pageSize,
					page_index: currentPage,
				})
			).then((response) => {
				console.log('Data fetched:', response.payload);
			});
		}
		setIsModalOpen(false);
		setselectedTransaction(null);
	};

	const columns = [
		{
			title: (
				<ReloadOutlined
					className={styles.reloadBtn}
					onClick={() => {
						dispatch(
							getAllTransaction({
								status: filterStatus,
								type: filterType,
								page_size: pageSize,
								page_index: currentPage,
							})
						).then((response) => {
							console.log('Data fetched:', response.payload);
						});
					}}
				/>
			),
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Mã Giao Dịch',
			dataIndex: 'transaction_code',
			key: 'transaction_code',
			render: (transaction) => <>{transaction}</>,
		},
		{
			title: 'Tên Khách Hàng',
			dataIndex: 'user',
			key: 'user',
			render: (user) => user?.full_name,
		},

		{
			title: 'Giá',
			dataIndex: 'total_price',
			key: 'total_price',
			render: (price) => `${price?.toLocaleString()} VND`,
		},
		{
			title: 'Mục đích',
			dataIndex: 'purpose',
			key: 'purpose',
			render: (purpose) => (
				<>
					<>
						{purpose === 'booking_land' && <Tag color="blue">Thuê đất</Tag>}
						{purpose === 'booking_material' && <Tag color="orange">Thuê thiết bị</Tag>}
						{purpose === 'extend' && <Tag color="cyan">Gia hạn</Tag>}
						{purpose === 'service' && <Tag color="purple">Dịch vụ</Tag>}
						{purpose === 'cancel_service' && <Tag color="red">Hủy dịch vụ</Tag>}
						{purpose === 'cancel_booking_land' && <Tag color="red">Hủy thuê đất</Tag>}
						{purpose === 'service_purchase_product' && <Tag color="gold">Thu mua</Tag>}
						{purpose === 'order' && <Tag color="green">Đơn hàng</Tag>}
						{purpose === 'cancel_purchase_product' && (
							<Tag color="#ccc">Hủy thu mua</Tag>
						)}
					</>
				</>
			),
		},
		{
			title: 'Loại giao dịch',
			dataIndex: 'type',
			key: 'type',
			render: (type) => (
				<>
					{type === 'payment' && <>Thanh toán</>}
					{type === 'refund' && <>Trả tiền</>}
				</>
			),
		},
		{
			title: 'Ngày Tạo',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (created_at) => <>{formatTimeViewLand(created_at)}</>,
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<>
					{status === 'succeed' && <Tag color="green">Hoàn thành</Tag>}
					{status === 'expired' && <Tag color="red">Hết hạn</Tag>}
					{status === 'pending' && <Tag>Chưa tới lượt thanh toán</Tag>}
					{status === 'approved' && <Tag color="warning">Chờ thanh toán</Tag>}
				</>
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
					onChange={(value) => {
						setCurrentPage(1);
						setFilterStatus(value);
					}}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="succeed">Hoàn thành</Option>
					<Option value="expired">Hết hạn</Option>
					<Option value="pending">Chưa tới lượt thanh toán</Option>
					<Option value="approved">Chờ thanh toán</Option>
				</Select>

				<span>Lọc theo loại:</span>
				<Select
					placeholder="Chọn Loại"
					onChange={(value) => {
						setCurrentPage(1);
						setFilterType(value);
					}}
					style={{width: '20%'}}
				>
					<Option value={null}>Tất cả</Option>
					<Option value="payment">Thanh toán</Option>
					<Option value="refund">Trả tiền</Option>
				</Select>
			</div>

			<Table
				columns={columns}
				dataSource={transactions}
				loading={loading}
				pagination={{
					pageSize: pageSize,
					current: currentPage,
					total: pagination?.total_page * pageSize,
					onChange: handlePageChange,
					showSizeChanger: false,
				}}
				rowKey="transaction_id"
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
