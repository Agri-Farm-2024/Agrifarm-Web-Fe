import React from 'react';
import styles from './PurchaseRequestPage.module.css';
import {Button, Image, Modal} from 'antd';
import {formatNumber} from '../../utils';

export const PurchaseRequestDetailModal = ({selectedRequest, handleModalClose, isModalOpen}) => {
	console.log(selectedRequest);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết yêu cầu thu mua</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
			width={'max-content'}
		>
			{selectedRequest && (
				<div className={styles.modalContainer}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID yêu cầu:</p>
							<p className={styles.content}>{selectedRequest.purchaseID}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID Lô đất:</p>
							<p className={styles.content}>{selectedRequest.IDLand}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Khách hàng:</p>
							<p className={styles.content}>{selectedRequest.customer}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tên nông sản:</p>
							<p className={styles.content}>{selectedRequest.namePlant}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày yêu cầu:</p>
							<p className={styles.content}>{selectedRequest.dateToRequest}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Giá mỗi kg:</p>
							<p className={styles.content}>
								{formatNumber(selectedRequest.pricePerKg)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Số lượng:</p>
							<p className={styles.content}>{selectedRequest.quantity} Kg</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tổng giá:</p>
							<p className={styles.content}>
								{formatNumber(selectedRequest.totalPrice)} VND
							</p>
						</div>

						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày dự kiến thu mua:</p>
							<p className={styles.content}>{selectedRequest.dateToPurchaseExpect}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Chuyên gia phụ trách:</p>
							<p className={styles.content}>{selectedRequest.assignExpert}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng thái:</p>
							<p className={styles.content}>{selectedRequest.status}</p>
						</div>
					</div>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Chất lượng:</p>
							<p className={styles.content}>{selectedRequest.quality}</p>
						</div>
						<div
							className={styles.bookingItem}
							style={{flexDirection: 'column', alignItems: 'flex-start'}}
						>
							<p className={styles.title}>Hình ảnh:</p>
							<Image
								src={selectedRequest.image}
								alt="Plant Image"
								style={{width: '100%', height: 'auto'}}
							/>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};
