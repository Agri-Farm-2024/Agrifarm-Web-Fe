import {DatePicker, Input, InputNumber, Table, Tag} from 'antd';
import React, {useState} from 'react';
import styles from './BookingLandPage.module.css';
import {formatNumber} from '../../utils';
import {BookingLandDetailModal} from './BookingLandDetailModal';

const columns = [
	{
		title: 'ID hợp đồng',
		dataIndex: 'bookingId',
		key: 'bookingId',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Tên người thuê',
		dataIndex: 'landRenterName',
		key: 'landRenterName',
	},
	{
		title: 'Tên mảnh đất',
		dataIndex: 'landName',
		key: 'landName',
	},
	{
		title: 'Ngày bắt đầu',
		dataIndex: 'dateStart',
		key: 'dateStart',
	},
	{
		title: 'Ngày kết thúc',
		dataIndex: 'dateEnd',
		key: 'dateEnd',
	},
	{
		title: 'Trạng thái',
		key: 'status',
		dataIndex: 'status',
		render: (_, {status}) => (
			<>
				{status == 'Đang hiệu lực' && (
					<Tag color="green" key={status}>
						{status}
					</Tag>
				)}
				{status == 'Sắp hết hạn' && (
					<Tag color="red" key={status}>
						{status}
					</Tag>
				)}
				{status == 'Chấm dứt' && (
					<Tag color="default" key={status}>
						{status}
					</Tag>
				)}
				{status == 'Chờ phê duyệt' && (
					<Tag color="warning" key={status}>
						{status}
					</Tag>
				)}
				{status == 'Chờ thanh toán' && (
					<Tag color="magenta" key={status}>
						{status}
					</Tag>
				)}
			</>
		),
	},
	{
		title: 'Tổng chi phí',
		dataIndex: 'totalPrice',
		key: 'totalPrice',
		render: (text) => <>{formatNumber(text)} VND</>,
	},
];

const data = [
	{
		bookingId: 'BK001',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		dateStart: '25/09/2020',
		dateEnd: '25/09/2020',
		status: 'Đang hiệu lực',
		timeRemain: '2 tháng',
		totalPrice: 100000,
	},
	{
		bookingId: 'BK002',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		dateStart: '25/09/2020',
		dateEnd: '25/09/2020',
		status: 'Chờ phê duyệt',
		timeRemain: '2 tháng',
		totalPrice: 100000,
	},
	{
		bookingId: 'BK003',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		dateStart: '25/09/2020',
		dateEnd: '25/09/2020',
		status: 'Chờ thanh toán',
		timeRemain: '2 tháng',
		totalPrice: 100000,
	},
	{
		bookingId: 'BK004',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		dateStart: '25/09/2020',
		dateEnd: '25/09/2020',
		status: 'Chấm dứt',
		timeRemain: '2 tháng',
		totalPrice: 100000,
	},
	{
		bookingId: 'BK005',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		dateStart: '25/09/2020',
		dateEnd: '25/09/2020',
		status: 'Sắp hết hạn',
		timeRemain: '2 tháng',
		totalPrice: 100000,
	},
];

const BookingLandPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(1);

	const handleRowClick = (record) => {
		setSelectedBooking(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedBooking(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý thuê đất</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo thời gian thuê (tháng):</span>
						<InputNumber
							className={styles.filterInput}
							placeholder="Nhập số tháng thuê"
						/>
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo ngày thuê:</span>
						<DatePicker
							className={styles.filterInput}
							placeholder="DD-MM-YYYY"
							onChange={(date, dateString) => {
								console.log(date, dateString);
							}}
							format={'DD-MM-YYYY'}
						/>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="bookingId"
					dataSource={data}
					scroll={{x: 'max-content'}}
					columns={columns}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					rowClassName={(record, index) =>
						index % 2 === 0 ? styles.evenRow : styles.oddRow
					}
					pagination={{
						pageSize,
						current: currentPage,
						total: totalPage * pageSize,
						onChange: (page, size) => {
							setCurrentPage(page);
							setPageSize(size);
						},
					}}
					className={styles.table}
				/>

				<BookingLandDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedBooking={selectedBooking}
				/>
			</div>
		</div>
	);
};

export default BookingLandPage;
