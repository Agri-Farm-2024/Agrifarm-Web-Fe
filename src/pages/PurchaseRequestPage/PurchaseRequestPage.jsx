import React, {useState} from 'react';
import {Table, Button, Space, DatePicker, Select, Tag, Modal, message} from 'antd';
import {ShoppingOutlined} from '@ant-design/icons';
import styles from './PurchaseRequestPage.module.css';
import {PurchaseRequestDetailModal} from './PurchaseRequestDetailModal';

const {Option} = Select;
const requestPurchase = [
	{
		purchaseID: 'TM001',
		namePlant: 'Dưa lưới',
		customer: 'Minh Châu',
		assignExpert: 'Đăng Ninh',
		dateToRequest: '12/09/2020',
		status: 'Chấp nhận',
		pricePerKg: 100000,
		quantity: 300,
		totalPrice: 30000000,
		IDLand: 'MD001',
		dateToPurchaseExpect: '12/10/2020',
		quality: 'Cao',
		image: 'https://s3-alpha-sig.figma.com/img/1ecf/bda1/b4cd5e35157593268b3e0240f6e0e8a6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iqtuZr-sVkKJkjlesCEwpv9SCQnWXlVuG4ZBUnUr1Ni9q99ytdvLbLXJwBh1Sws28JWzi3UEzinz1kJfEitnWhhZlVFzpmtQSy1HtacyOhGFD~TWXh49JIApFBofZ8lCQ3bS~dmyUAQ2BxXpGnJYyHLE5anGWz6HuEZau-Z0mdtVFzQ9374xWqyRS31boM2opjOjQbg3ixekNQ~oTotEEUnT2wSpkdqfBGooTIvGP7dC5qGwa7OGAF~mhUL1npqDWX5UBCer9KB2otM~nWo8U-PKg06T6DXhqjxI2CiUCRAUhwe7PQ4HtiYhP4ViI7zqPYFWG7n6MEm8sU~0ZbiXTw__',
	},
	{
		purchaseID: 'TM002',
		namePlant: 'Cà chua',
		customer: 'Trần Văn B',
		assignExpert: 'Bá Phước',
		dateToRequest: '15/09/2020',
		status: 'Đang kiểm tra',
		pricePerKg: 80000,
		quantity: 400,
		totalPrice: 32000000,
		IDLand: 'MD002',
		dateToPurchaseExpect: '15/10/2020',
		quality: 'Trung bình',
		image: 'https://s3-alpha-sig.figma.com/img/1ecf/bda1/b4cd5e35157593268b3e0240f6e0e8a6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iqtuZr-sVkKJkjlesCEwpv9SCQnWXlVuG4ZBUnUr1Ni9q99ytdvLbLXJwBh1Sws28JWzi3UEzinz1kJfEitnWhhZlVFzpmtQSy1HtacyOhGFD~TWXh49JIApFBofZ8lCQ3bS~dmyUAQ2BxXpGnJYyHLE5anGWz6HuEZau-Z0mdtVFzQ9374xWqyRS31boM2opjOjQbg3ixekNQ~oTotEEUnT2wSpkdqfBGooTIvGP7dC5qGwa7OGAF~mhUL1npqDWX5UBCer9KB2otM~nWo8U-PKg06T6DXhqjxI2CiUCRAUhwe7PQ4HtiYhP4ViI7zqPYFWG7n6MEm8sU~0ZbiXTw__',
	},
	{
		purchaseID: 'TM003',
		namePlant: 'Xoài',
		customer: 'Nguyễn Thị C',
		assignExpert: 'Đăng Ninh',
		dateToRequest: '20/09/2020',
		status: 'Đợi xử lí',
		pricePerKg: 120000,
		quantity: 250,
		totalPrice: 30000000,
		IDLand: 'MD003',
		dateToPurchaseExpect: '20/10/2020',
		quality: 'Cao',
		image: 'https://s3-alpha-sig.figma.com/img/1ecf/bda1/b4cd5e35157593268b3e0240f6e0e8a6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iqtuZr-sVkKJkjlesCEwpv9SCQnWXlVuG4ZBUnUr1Ni9q99ytdvLbLXJwBh1Sws28JWzi3UEzinz1kJfEitnWhhZlVFzpmtQSy1HtacyOhGFD~TWXh49JIApFBofZ8lCQ3bS~dmyUAQ2BxXpGnJYyHLE5anGWz6HuEZau-Z0mdtVFzQ9374xWqyRS31boM2opjOjQbg3ixekNQ~oTotEEUnT2wSpkdqfBGooTIvGP7dC5qGwa7OGAF~mhUL1npqDWX5UBCer9KB2otM~nWo8U-PKg06T6DXhqjxI2CiUCRAUhwe7PQ4HtiYhP4ViI7zqPYFWG7n6MEm8sU~0ZbiXTw__',
	},
	{
		purchaseID: 'TM004',
		namePlant: 'Ổi',
		customer: 'Phạm Văn D',
		assignExpert: 'Tiến Dũng',
		dateToRequest: '25/09/2020',
		status: 'Đợi phê duyệt',
		pricePerKg: 90000,
		quantity: 350,
		totalPrice: 31500000,
		IDLand: 'MD004',
		dateToPurchaseExpect: '25/10/2020',
		quality: 'Trung bình',
		image: 'https://s3-alpha-sig.figma.com/img/1ecf/bda1/b4cd5e35157593268b3e0240f6e0e8a6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iqtuZr-sVkKJkjlesCEwpv9SCQnWXlVuG4ZBUnUr1Ni9q99ytdvLbLXJwBh1Sws28JWzi3UEzinz1kJfEitnWhhZlVFzpmtQSy1HtacyOhGFD~TWXh49JIApFBofZ8lCQ3bS~dmyUAQ2BxXpGnJYyHLE5anGWz6HuEZau-Z0mdtVFzQ9374xWqyRS31boM2opjOjQbg3ixekNQ~oTotEEUnT2wSpkdqfBGooTIvGP7dC5qGwa7OGAF~mhUL1npqDWX5UBCer9KB2otM~nWo8U-PKg06T6DXhqjxI2CiUCRAUhwe7PQ4HtiYhP4ViI7zqPYFWG7n6MEm8sU~0ZbiXTw__',
	},
	{
		purchaseID: 'TM005',
		namePlant: 'Nho',
		customer: 'Nguyễn Văn E',
		assignExpert: 'Đăng Ninh',
		dateToRequest: '30/09/2020',
		status: 'Chấp nhận',
		pricePerKg: 150000,
		quantity: 200,
		totalPrice: 30000000,
		IDLand: 'MD005',
		dateToPurchaseExpect: '30/10/2020',
		quality: 'Cao',
		image: 'https://s3-alpha-sig.figma.com/img/1ecf/bda1/b4cd5e35157593268b3e0240f6e0e8a6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iqtuZr-sVkKJkjlesCEwpv9SCQnWXlVuG4ZBUnUr1Ni9q99ytdvLbLXJwBh1Sws28JWzi3UEzinz1kJfEitnWhhZlVFzpmtQSy1HtacyOhGFD~TWXh49JIApFBofZ8lCQ3bS~dmyUAQ2BxXpGnJYyHLE5anGWz6HuEZau-Z0mdtVFzQ9374xWqyRS31boM2opjOjQbg3ixekNQ~oTotEEUnT2wSpkdqfBGooTIvGP7dC5qGwa7OGAF~mhUL1npqDWX5UBCer9KB2otM~nWo8U-PKg06T6DXhqjxI2CiUCRAUhwe7PQ4HtiYhP4ViI7zqPYFWG7n6MEm8sU~0ZbiXTw__',
	},
	{
		purchaseID: 'TM006',
		namePlant: 'Bí đỏ',
		customer: 'Phạm Thị F',
		assignExpert: 'Tiến Dũng',
		dateToRequest: '02/10/2020',
		status: 'Đang kiểm tra',
		pricePerKg: 70000,
		quantity: 500,
		totalPrice: 35000000,
		IDLand: 'MD006',
		dateToPurchaseExpect: '02/11/2020',
		quality: 'Cao',
		image: 'https://s3-alpha-sig.figma.com/img/1ecf/bda1/b4cd5e35157593268b3e0240f6e0e8a6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iqtuZr-sVkKJkjlesCEwpv9SCQnWXlVuG4ZBUnUr1Ni9q99ytdvLbLXJwBh1Sws28JWzi3UEzinz1kJfEitnWhhZlVFzpmtQSy1HtacyOhGFD~TWXh49JIApFBofZ8lCQ3bS~dmyUAQ2BxXpGnJYyHLE5anGWz6HuEZau-Z0mdtVFzQ9374xWqyRS31boM2opjOjQbg3ixekNQ~oTotEEUnT2wSpkdqfBGooTIvGP7dC5qGwa7OGAF~mhUL1npqDWX5UBCer9KB2otM~nWo8U-PKg06T6DXhqjxI2CiUCRAUhwe7PQ4HtiYhP4ViI7zqPYFWG7n6MEm8sU~0ZbiXTw__',
	},
];

export const PurchaseRequestPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [filterDate, setFilterDate] = useState(null);
	const [selectedRequest, setselectedRequest] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const handleDateChange = (date, dateString) => {
		setFilterDate(dateString);
	};

	const handleStatusChange = (value) => {
		setFilterStatus(value);
	};

	const handleRowClick = (record) => {
		setselectedRequest(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setselectedRequest(null);
	};

	const handleConfirmPurchase = (record) => {
		setselectedRequest(record);
		setIsConfirmModalOpen(true);
	};

	const handleConfirm = () => {
		// Display the loading message
		const hideLoading = message.loading('Đang xử lý...', 0); // 0 means it will persist until manually closed
		setIsConfirmModalOpen(false);
		setselectedRequest(null);
		setTimeout(() => {
			console.log('Purchase request confirmed:', selectedRequest);

			hideLoading();

			message.success('Xác nhận thu mua thành công!');
		}, 1000); // Simulated delay for demonstration (2 seconds)
	};

	const handleCancel = () => {
		setIsConfirmModalOpen(false);
		setselectedRequest(null);
	};

	const filteredPurchases = requestPurchase.filter((request) => {
		const matchesStatus = filterStatus ? request.status === filterStatus : true;
		const matchesDate = filterDate ? request.dateToRequest === filterDate : true;
		return matchesStatus && matchesDate;
	});

	const columns = [
		{
			title: 'ID Yêu Cầu',
			dataIndex: 'purchaseID',
			key: 'purchaseID',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên Cây Trồng',
			dataIndex: 'namePlant',
			key: 'namePlant',
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer',
			key: 'customer',
		},
		{
			title: 'Chuyên Gia',
			dataIndex: 'assignExpert',
			key: 'assignExpert',
		},
		{
			title: 'Ngày Yêu Cầu',
			dataIndex: 'dateToRequest',
			key: 'dateToRequest',
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'Chấp nhận'
							? 'green'
							: status === 'Đang kiểm tra'
								? 'blue'
								: status === 'Đợi xử lí'
									? 'gold'
									: 'red'
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
				<Space size="small">
					<Button
						type="primary"
						icon={<ShoppingOutlined />}
						onClick={(e) => {
							e.stopPropagation();
							handleConfirmPurchase(record);
						}}
					/>
				</Space>
			),
		},
	];

	return (
		<div className={styles.headerContainer}>
			<h1>Yêu Cầu Thu Mua</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={handleStatusChange}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Chấp nhận">Chấp nhận</Option>
					<Option value="Đang kiểm tra">Đang kiểm tra</Option>
					<Option value="Đợi xử lí">Đợi xử lí</Option>
					<Option value="Đợi phê duyệt">Đợi phê duyệt</Option>
				</Select>
				<span>Lọc theo ngày yêu cầu:</span>
				<DatePicker
					placeholder="Chọn Ngày"
					onChange={handleDateChange}
					style={{marginRight: 8}}
				/>
			</div>

			<Table
				columns={columns}
				dataSource={filteredPurchases}
				pagination={{pageSize: 5}}
				rowKey="purchaseID"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>

			<PurchaseRequestDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedRequest={selectedRequest}
			/>

			<Modal
				title="Xác Nhận"
				visible={isConfirmModalOpen}
				onOk={handleConfirm}
				onCancel={handleCancel}
				okText="Chấp nhận"
				cancelText="Hủy"
				style={{bottom: 90}}
			>
				<p>Chấp nhận yêu cầu thu mua này?</p>
			</Modal>
		</div>
	);
};
