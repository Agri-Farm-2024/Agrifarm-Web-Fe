import {Button, DatePicker, Image, Input, Modal, Table, Tag} from 'antd';
import React, {useState} from 'react';
import styles from './BookingLandPage.module.css';
import {formatNumber} from '../../utils';

const columns = [
	{
		title: 'Mã hợp đồng',
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
	// {
	// 	title: 'Action',
	// 	key: 'action',
	// 	render: (_, record) => (
	// 		<Space size="middle">
	// 			<a>Invite {record.name}</a>
	// 			<a>Delete</a>
	// 		</Space>
	// 	),
	// },
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
	const [visibleContract, setVisibleContract] = useState(false);

	const handleRowClick = (record) => {
		setSelectedBooking(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedBooking(null);
	};

	const handleUpdateBooking = () => {
		console.log('Update');
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý thuê đất</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo thời gian thuê (tháng):</span>
						<Input
							className={styles.filterInput}
							type="number"
							placeholder="Nhập số tháng thuê"
						/>
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo ngày thuê:</span>
						<DatePicker
							className={styles.filterInput}
							placeholder="Chọn ngày thuê"
							onChange={(date, dateString) => {
								console.log(date, dateString);
							}}
						/>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="bookingId"
					dataSource={data}
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
				<Modal
					title={<span style={{fontSize: '1.5rem'}}>Chi tiết hợp đồng</span>}
					open={isModalOpen}
					onOk={handleUpdateBooking}
					onCancel={handleModalClose}
					okButtonProps={{style: {display: 'none'}}}
				>
					{selectedBooking && (
						<div className={styles.modalContainer}>
							<div className={styles.bookingItem}>
								<p className={styles.title}>ID hợp đồng:</p>
								<p className={styles.content}>{selectedBooking.bookingId}</p>
								<Button type="primary" onClick={() => setVisibleContract(true)}>
									Xem hợp đồng
								</Button>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>Tên khách hàng:</p>
								<p className={styles.content}>{selectedBooking.landRenterName}</p>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>ID mảnh đất:</p>
								<p className={styles.content}>{selectedBooking.landId}</p>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>Tên mảnh đất:</p>
								<p className={styles.content}>{selectedBooking.landName}</p>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>Giá trị hợp đồng:</p>
								<p className={styles.content}>{selectedBooking.totalPrice}</p>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>Ngày bắt đầu thuê:</p>
								<p className={styles.content}>{selectedBooking.dateStart}</p>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>Thời gian thuê:</p>
								<p className={styles.content}>{selectedBooking.dateEnd}</p>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>Thời gian còn lại:</p>
								<p className={styles.content}>{selectedBooking.timeRemain}</p>
							</div>
							<div className={styles.bookingItem}>
								<p className={styles.title}>Trạng thái:</p>
								<p className={styles.content}>{selectedBooking.status}</p>
							</div>

							<Image
								width={200}
								style={{
									display: 'none',
								}}
								src="https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg"
								preview={{
									visible: visibleContract,
									scaleStep: 1,
									src: 'https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg',
									onVisibleChange: (value) => {
										setVisibleContract(value);
									},
								}}
							/>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
};

export default BookingLandPage;
