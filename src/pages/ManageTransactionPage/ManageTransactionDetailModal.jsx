import React from 'react';
import styles from './ManageTransactionPage.module.css';
import {Modal} from 'antd';

export const ManageTransactionDetailModal = ({
	selectedTransaction,
	handleModalClose,
	isModalOpen,
}) => {
	console.log(selectedTransaction);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết giao dịch</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
		>
			{selectedTransaction && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Mã giao dịch:</p>
						<p className={styles.content}>{selectedTransaction.transactionID}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Khách hàng:</p>
						<p className={styles.content}>{selectedTransaction.customer}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Giá:</p>
						<p className={styles.content}>
							{selectedTransaction.price.toLocaleString()} VND
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Loại:</p>
						<p className={styles.content}>{selectedTransaction.type}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Nội dung:</p>
						<p className={styles.content}>{selectedTransaction.content}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày tạo:</p>
						<p className={styles.content}>{selectedTransaction.createAt}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedTransaction.status}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
