import React, {useEffect, useState} from 'react';
import {Table, Select, Button, Space, Tag} from 'antd';
import styles from './ManageTransactionPage.module.css';
import {ManageTransactionDetailModal} from './ManageTransactionDetailModal';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTransaction} from '../../redux/slices/transactionSlice';
import {transactionListSelector} from '../../redux/selectors';

const {Option} = Select;

export const ManageTransactionPage = () => {
	const dispatch = useDispatch();

	const [filterStatus, setFilterStatus] = useState('');
	const [filterType, setFilterType] = useState('');
	const [selectedTransaction, setselectedTransaction] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [totalPage, setTotalPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	// const filteredTransactions = transactionList.filter((transaction) => {
	// 	const matchesStatus = filterStatus ? transaction.status === filterStatus : true;
	// 	const matchesType = filterType ? transaction.type === filterType : true;
	// 	return matchesStatus && matchesType;
	// });

	useEffect(() => {
		dispatch(getAllTransaction()).then((response) => {
			if (response.payload.statusCode === 200) {
				console.log('Data fetched:', response.payload.metadata);
				setRequest(response.payload.metadata.requests);
				setTotalPage(response.payload.metadata.pagination.total_page);
			} else {
				console.error('Error fetching data:', response.payload);
			}
		});
	}, [dispatch, totalPage, currentPage, pageSize]);

	const data = useSelector(transactionListSelector);

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
			dataIndex: 'transaction_code',
			key: 'transaction_code',
		},
		{
			title: 'Tên Khách Hàng',
			dataIndex: 'user',
			key: 'user',
			render: (user) => user.full_name,
		},
		{
			title: 'Email Khách Hàng',
			dataIndex: 'user',
			key: 'user',
			render: (user) => user.email,
		},
		{
			title: 'Giá',
			dataIndex: 'total_price',
			key: 'total_price',
			render: (price) => `${price.toLocaleString()} VND`,
		},
		{
			title: 'Loại',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Ngày Tạo',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (created_at) => new Date(created_at).toLocaleString(),
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'approved' ? 'green' : status === 'Đang xử lý' ? 'orange' : 'red'
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
				dataSource={data.transactions}
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
