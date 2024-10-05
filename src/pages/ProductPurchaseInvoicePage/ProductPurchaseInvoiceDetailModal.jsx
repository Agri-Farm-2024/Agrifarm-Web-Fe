import React from 'react';
import styles from './ProductPurchaseInvoicePage.module.css';
import {Modal} from 'antd';
import {formatNumber} from '../../utils';
export const ProductPurchaseInvoiceDetailModal = ({
	selectedInvoice,
	handleModalClose,
	isModalOpen,
}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hoá đơn thu mua</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
		>
			{selectedInvoice && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID hoá đơn:</p>
						<p className={styles.content}>{selectedInvoice.invoiceId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên nông sản:</p>
						<p className={styles.content}>{selectedInvoice.plantName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày tạo hoá đơn:</p>
						<p className={styles.content}>{selectedInvoice.createAt}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên khách hàng:</p>
						<p className={styles.content}>{selectedInvoice.customerName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Đơn giá: </p>
						<p className={styles.content}>{selectedInvoice.unitPrice}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Đơn vị tính:</p>
						<p className={styles.content}>{selectedInvoice.unitMeasure}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tổng sản lượng:</p>
						<p className={styles.content}>
							{formatNumber(selectedInvoice.totalOutput)}{' '}
							{selectedInvoice.unitMeasure}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tổng giá trị hoá đơn:</p>
						<p className={styles.content}>
							{formatNumber(selectedInvoice.totalPrice)} VND
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Nhân viên thu mua:</p>
						<p className={styles.content}>{selectedInvoice.expertResponsible}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày thanh toán:</p>
						<p className={styles.content}>{selectedInvoice.paymentDate}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
