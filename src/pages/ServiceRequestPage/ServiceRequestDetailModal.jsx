import React, {useState} from 'react';
import styles from './ServiceRequestPage.module.css';
import {Button, Image, Modal} from 'antd';
import {formatNumber} from '../../utils';

export const ServiceRequestDetailModal = ({selectedService, handleModalClose, isModalOpen}) => {
	const handleUpdateBooking = () => {
		console.log('Update');
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết yêu cầu dịch vụ</span>}
			open={isModalOpen}
			onOk={handleUpdateBooking}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
		>
			{selectedService && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID dịch vụ:</p>
						<p className={styles.content}>{selectedService.serviceId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên khách hàng:</p>
						<p className={styles.content}>{selectedService.landRenterName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Quy trình trồng cây:</p>
						<p className={styles.content}>{selectedService.processName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Hỗ trợ thu mua:</p>
						<p className={styles.content}>
							{selectedService.isPurchased ? 'Có' : 'Không'}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Hỗ trợ vật tư:</p>
						<p className={styles.content}>
							{selectedService.isSupportMaterial ? 'Có' : 'Không'}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Id mảnh đất:</p>
						<p className={styles.content}>{selectedService.landId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên mảnh đất:</p>
						<p className={styles.content}>{selectedService.landName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày gửi yêu cầu:</p>
						<p className={styles.content}>{selectedService.dateRequest}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Giá trị gói dịch vụ:</p>
						<p className={styles.content}>
							{formatNumber(selectedService.totalPrice)} VND
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedService.status}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Phân công nhân viên:</p>
						<p className={styles.content}>{selectedService.expertName}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
