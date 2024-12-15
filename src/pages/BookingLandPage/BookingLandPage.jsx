import {DatePicker, Input, InputNumber, message, Select, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './BookingLandPage.module.css';
import {capitalizeFirstLetter, formatNumber} from '../../utils';
import {BookingLandDetailModal} from './BookingLandDetailModal';
import {useDispatch, useSelector} from 'react-redux';
import {getListOfBooking, updateBooking} from '../../redux/slices/landSlice';
import {ReloadOutlined, SyncOutlined} from '@ant-design/icons';

// const data = [
// 	{
// 		bookingId: 'BK001',
// 		landRenterName: 'Nguyen Van A',
// 		landId: 'MD001',
// 		landName: 'Mảnh đất số 1',
// 		dateStart: '25/09/2020',
// 		dateEnd: '25/09/2020',
// 		status: 'Đang hiệu lực',
// 		timeRemain: '2 tháng',
// 		totalPrice: 100000,
// 		image: 'https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg',
// 	},
// 	{
// 		bookingId: 'BK002',
// 		landRenterName: 'Nguyen Van A',
// 		landId: 'MD001',
// 		landName: 'Mảnh đất số 1',
// 		dateStart: '25/09/2020',
// 		dateEnd: '25/09/2020',
// 		status: 'Chờ phê duyệt',
// 		timeRemain: '2 tháng',
// 		totalPrice: 100000,
// 		image: 'https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg',
// 	},
// 	{
// 		bookingId: 'BK003',
// 		landRenterName: 'Nguyen Van A',
// 		landId: 'MD001',
// 		landName: 'Mảnh đất số 1',
// 		dateStart: '25/09/2020',
// 		dateEnd: '25/09/2020',
// 		status: 'Chờ thanh toán',
// 		timeRemain: '2 tháng',
// 		totalPrice: 100000,
// 		image: 'https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg',
// 	},
// 	{
// 		bookingId: 'BK004',
// 		landRenterName: 'Nguyen Van A',
// 		landId: 'MD001',
// 		landName: 'Mảnh đất số 1',
// 		dateStart: '25/09/2020',
// 		dateEnd: '25/09/2020',
// 		status: 'Chấm dứt',
// 		timeRemain: '2 tháng',
// 		totalPrice: 100000,
// 		image: 'https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg',
// 	},
// 	{
// 		bookingId: 'BK005',
// 		landRenterName: 'Nguyen Van A',
// 		landId: 'MD001',
// 		landName: 'Mảnh đất số 1',
// 		dateStart: '25/09/2020',
// 		dateEnd: '25/09/2020',
// 		status: 'Sắp hết hạn',
// 		timeRemain: '2 tháng',
// 		totalPrice: 100000,
// 		image: 'https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg',
// 	},
// 	{
// 		bookingId: 'BK005',
// 		landRenterName: 'Nguyen Van A',
// 		landId: 'MD001',
// 		landName: 'Mảnh đất số 1',
// 		dateStart: '25/09/2020',
// 		dateEnd: '25/09/2020',
// 		status: 'Chờ ký tên',
// 		timeRemain: '2 tháng',
// 		totalPrice: 100000,
// 		image: null,
// 	},
// ];

const BookingLandPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(8);

	const dispatch = useDispatch();
	const requests = useSelector((state) => state.landSlice?.listOfBooking?.metadata?.bookings);
	const pagination = useSelector((state) => state.landSlice?.listOfBooking?.metadata?.pagination);
	const loading = useSelector((state) => state.landSlice?.loading);

	useEffect(() => {
		fetchRequests(); // Pass the current page to fetchRequests
	}, [filterStatus, currentPage]);

	const fetchRequests = async () => {
		try {
			await dispatch(
				getListOfBooking({
					page_size: pageSize,
					page_index: currentPage,
					status: filterStatus,
					type: 'booking',
				})
			);
		} catch (error) {
			message.error('Error fetching data');
		}
	};

	const handleRowClick = (record) => {
		setSelectedBooking(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedBooking(null);
	};

	// Handle page change
	const handlePageChange = (page) => {
		setCurrentPage(page); // Update current page state
	};

	const handleUpdateBooking = (body) => {
		console.log(body);

		const hideLoading = message.loading('Đang xử lý...', 0);
		dispatch(updateBooking(body))
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 200) {
					fetchRequests();
					handleModalClose();
					message.success('Đã cập nhật');
				} else {
					message.error('Có lỗi trong quá trình cập nhật');
				}
			})
			.catch(() => {
				hideLoading();
				message.error('Có lỗi trong quá trình cập nhật');
			});
	};

	const columns = [
		{
			title: (
				<ReloadOutlined
					className={styles.reloadBtn}
					onClick={() => {
						fetchRequests();
					}}
				/>
			),
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Mảnh đất',
			dataIndex: 'land',
			key: 'land',
			render: (land) => <>{capitalizeFirstLetter(land.name)}</>,
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'land_renter',
			key: 'land_renter',
			render: (landRenter) => <div>{landRenter.full_name}</div>,
		},

		{
			title: 'Thời Gian Bắt Đầu',
			dataIndex: 'time_start',
			key: 'time_start',
			render: (text) => <div>{new Date(text).toLocaleDateString()}</div>,
		},
		{
			title: 'Thời Gian Kết Thúc',
			dataIndex: 'time_end',
			key: 'time_end',
			render: (text) => <div>{new Date(text).toLocaleDateString()}</div>,
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'completed' && (
						<Tag color="green" key={status}>
							Đang hiệu lực
						</Tag>
					)}
					{status == 'expired' && (
						<Tag color="default" key={status}>
							Sắp hết hạn
						</Tag>
					)}
					{status == 'canceled' && (
						<Tag color="red" key={status}>
							Chấm dứt
						</Tag>
					)}
					{status == 'pending_contract' && (
						<Tag color="warning" key={status}>
							Chờ phê duyệt
						</Tag>
					)}
					{status == 'pending_payment' && (
						<Tag color="magenta" key={status}>
							Chờ thanh toán
						</Tag>
					)}
					{status == 'pending_sign' && (
						<Tag color="cyan" key={status}>
							Chờ ký tên
						</Tag>
					)}
					{status == 'rejected' && (
						<Tag color="red" key={status}>
							Hủy yêu cầu
						</Tag>
					)}
				</>
			),
		},
		{
			title: 'Chi phí mỗi tháng',
			dataIndex: 'price_per_month',
			key: 'price_per_month',
			render: (text) => <>{formatNumber(text)} VND</>,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'price_per_month',
			key: 'price_per_month',
			render: (_, record) => (
				<p>
					{record.extends?.filter((item) => item.status === 'pending_sign').length >=
					1 ? (
						<Tag icon={<SyncOutlined spin />} color="warning">
							Xử lí gia hạn
						</Tag>
					) : record.status === 'pending_sign' ? (
						<Tag icon={<SyncOutlined spin />} color="warning">
							Xử lí hợp đồng
						</Tag>
					) : (
						'Không có'
					)}
				</p>
			),
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý thuê đất</p>
				<div className={styles.filterContainer}>
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
							<Option value="completed">Đang hiệu lực</Option>
							<Option value="pending_contract">Chờ phê duyệt</Option>
							<Option value="pending_payment">Chờ thanh toán</Option>
							<Option value="pending_sign">Chờ ký tên</Option>
							<Option value="canceled">Hủy hợp đồng</Option>
							<Option value="rejected">Từ chối</Option>
							<Option value="expired">Hết hạn</Option>
						</Select>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="booking_id"
					columns={columns}
					dataSource={requests}
					scroll={{x: 'max-content'}}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					rowClassName={(record, index) =>
						record.extends.filter((item) => item.status === 'pending_sign').length >=
							1 || record.status === 'pending_sign'
							? styles.focus
							: styles.oddRow
					}
					loading={loading}
					pagination={{
						pageSize: pageSize,
						current: currentPage,
						total: pagination?.total_page * pageSize,
						onChange: handlePageChange,
					}}
					className={styles.table}
				/>

				<BookingLandDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedBooking={selectedBooking}
					handleUpdate={handleUpdateBooking}
					fetchRequests={fetchRequests}
				/>
			</div>
		</div>
	);
};

export default BookingLandPage;
