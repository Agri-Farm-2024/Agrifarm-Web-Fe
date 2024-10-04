import {DatePicker, Table} from 'antd';
import React, {useState} from 'react';
import styles from './ProductPurchaseInvoicePage.module.css';
import {formatNumber} from '../../utils';
import {ProductPurchaseInvoiceDetailModal} from './ProductPurchaseInvoiceDetailModal';

const data = [
	{
		invoiceId: 'HDNS001',
		plantName: 'Dưa lưới Taki',
		createAt: '26/09/2020',
		customerName: 'Nguyen Van A',
		expertResponsible: 'Nguyen Van B',
		totalPrice: 100000,
		unitPrice: 100000,
		unitMeasure: 'kg',
		totalOutput: 200,
		paymentDate: '26/09/2020',
	},
	{
		invoiceId: 'HDNS002',
		plantName: 'Dưa lưới Taki',
		createAt: '26/09/2020',
		customerName: 'Nguyen Van A',
		expertResponsible: 'Nguyen Van B',
		totalPrice: 100000,
		unitPrice: 100000,
		unitMeasure: 'kg',
		totalOutput: 200,
		paymentDate: '26/09/2020',
	},
	{
		invoiceId: 'HDNS003',
		plantName: 'Dưa lưới Taki',
		createAt: '26/09/2020',
		customerName: 'Nguyen Van A',
		expertResponsible: 'Nguyen Van B',
		totalPrice: 100000,
		unitPrice: 100000,
		unitMeasure: 'kg',
		totalOutput: 200,
		paymentDate: '26/09/2020',
	},
	{
		invoiceId: 'HDNS004',
		plantName: 'Dưa lưới Taki',
		createAt: '26/09/2020',
		customerName: 'Nguyen Van A',
		expertResponsible: 'Nguyen Van B',
		totalPrice: 100000,
		unitPrice: 100000,
		unitMeasure: 'kg',
		totalOutput: 200,
		paymentDate: '26/09/2020',
	},
	{
		invoiceId: 'HDNS005',
		plantName: 'Dưa lưới Taki',
		createAt: '26/09/2020',
		customerName: 'Nguyen Van A',
		expertResponsible: 'Nguyen Van B',
		totalPrice: 100000,
		unitPrice: 100000,
		unitMeasure: 'kg',
		totalOutput: 200,
		paymentDate: '26/09/2020',
	},
	{
		invoiceId: 'HDNS006',
		plantName: 'Dưa lưới Taki',
		createAt: '26/09/2020',
		customerName: 'Nguyen Van A',
		expertResponsible: 'Nguyen Van B',
		totalPrice: 100000,
		unitPrice: 100000,
		unitMeasure: 'kg',
		totalOutput: 200,
		paymentDate: '26/09/2020',
	},
	{
		invoiceId: 'HDNS007',
		plantName: 'Dưa lưới Taki',
		createAt: '26/09/2020',
		customerName: 'Nguyen Van A',
		expertResponsible: 'Nguyen Van B',
		totalPrice: 100000,
		unitPrice: 100000,
		unitMeasure: 'kg',
		totalOutput: 200,
		paymentDate: '26/09/2020',
	},
];

export const ProductPurchaseInvoicePage = () => {
	const columns = [
		{
			title: 'ID hoá đơn',
			dataIndex: 'invoiceId',
			key: 'invoiceId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên nông sản',
			dataIndex: 'plantName',
			key: 'plantName',
		},
		{
			title: 'Ngày tạo hoá đơn',
			dataIndex: 'createAt',
			key: 'createAt',
		},
		{
			title: 'Nhân viên thu mua',
			dataIndex: 'expertResponsible',
			key: 'expertResponsible',
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Giá trị hoá đơn',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (text) => <>{formatNumber(text)} VND</>,
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedInvoice, setSelectedInvoice] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const handleRowClick = (record) => {
		setSelectedInvoice(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedInvoice(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Hoá đơn thu mua nông sản</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo ngày thanh toán:</span>
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
					rowKey="invoiceId"
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

				<ProductPurchaseInvoiceDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedInvoice={selectedInvoice}
				/>
			</div>
		</div>
	);
};
