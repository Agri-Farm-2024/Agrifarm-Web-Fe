import React from 'react';
import styles from './ManageServicesInusePage.module.css';
import {Modal} from 'antd';

export const ServicesInuseDetailModal = ({selectedService, handleModalClose, isModalOpen}) => {
	console.log(selectedService);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết dịch vụ đang sử dụng</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
		>
			{selectedService && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID yêu cầu:</p>
						<p className={styles.content}>{selectedService.servicesID}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Khách hàng:</p>
						<p className={styles.content}>{selectedService.customer}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Quy trình:</p>
						<p className={styles.content}>{selectedService.plantProcess}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Thu mua nông sản:</p>
						<p className={styles.content}>
							{selectedService.isPurchase === 'yes' ? 'Có' : 'Không'}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Đủ vật tư:</p>
						<p className={styles.content}>
							{selectedService.isFullMaterials === 'yes' ? 'Có' : 'Không'}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày bắt đầu:</p>
						<p className={styles.content}>{selectedService.dateToStart}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày kết thúc:</p>
						<p className={styles.content}>{selectedService.dateToEnd}</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Mô tả:</p>
						<p className={styles.content}>{selectedService.desc}</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Chuyên gia được phân công:</p>
						<p className={styles.content}>{selectedService.assignExpert}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedService.status}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tổng giá:</p>
						<p className={styles.content}>
							{selectedService.totalPrice.toLocaleString('vi-VN')} VND
						</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
