import React from 'react';
import styles from './LandLeaseRequestPage.module.css';
import {message, Modal} from 'antd';

export const LandLeaseRequestUpdateModal = ({selectedRequest, handleModalClose, isModalOpen}) => {
	const handleUpdateRequest = () => {
		handleModalClose();
		message.info('Đã tạo hợp đồng');
	};
	console.log(selectedRequest);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Xử lí yêu cầu thuê đất</span>}
			open={isModalOpen}
			onOk={handleUpdateRequest}
			onCancel={handleModalClose}
			style={{top: 20}}
			okText="Tạo Hợp Đồng"
			cancelText="Hủy"
		>
			{selectedRequest && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID yêu cầu:</p>
						<p className={styles.content}>{selectedRequest.key}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID mảnh đất:</p>
						<p className={styles.content}>{selectedRequest.landId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên khách hàng:</p>
						<p className={styles.content}>{selectedRequest.Customer}</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Địa chỉ:</p>
						<p className={styles.content}>{selectedRequest.address}</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Thời gian thuê:</p>
						<p className={styles.content}>{selectedRequest.timeToRent}</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày gửi yêu cầu:</p>
						<p className={styles.content}>{selectedRequest.dateSendRequest}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedRequest.status}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
