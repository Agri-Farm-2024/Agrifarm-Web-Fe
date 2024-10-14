import React from 'react';
import styles from './ManageServicePackagePage.module.css';
import {Modal} from 'antd';
import {formatNumber} from '../../utils';

export const ManageServicePackageDetailModal = ({
	selectedServicePackage,
	handleModalClose,
	isModalOpen,
}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin nhân viên</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={'max-content'}
		>
			{selectedServicePackage && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID gói dịch vụ:</p>
						<p className={styles.content}>{selectedServicePackage.servicePackageId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên gói dịch vụ:</p>
						<p className={styles.content}>
							{selectedServicePackage.servicePackageName}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Mô tả:</p>
						<p className={styles.content}>
							{selectedServicePackage.servicePackageDescription}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Bao tiêu:</p>
						<p className={styles.content}>
							{selectedServicePackage.isPurchase == true ? 'Có' : 'Không'}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Bao vật tư:</p>
						<p className={styles.content}>
							{selectedServicePackage.isMaterial == true ? 'Có' : 'Không'}
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái: </p>
						<p className={styles.content}>{selectedServicePackage.status}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Giá gói dịch vụ:</p>
						<p className={styles.content}>
							{formatNumber(selectedServicePackage.price)} VND
						</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
