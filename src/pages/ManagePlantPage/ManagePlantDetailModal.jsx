import React from 'react';
import styles from './ManagePlantPage.module.css';
import {Modal} from 'antd';
import {formatNumber} from '../../utils';

export const ManagePlantDetailModal = ({selectedPlant, handleModalClose, isModalOpen}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin giống cây</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={600}
			centered
		>
			{selectedPlant && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID giống cây:</p>
						<p className={styles.content}>{selectedPlant.plantId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên giống cây:</p>
						<p className={styles.content}>{selectedPlant.plantName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Loại giống cây:</p>
						<p className={styles.content}>{selectedPlant.plantType}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Thời gian sinh trưởng:</p>
						<p className={styles.content}>{selectedPlant.growthYield} ngày</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Năng suất trung bình: </p>
						<p className={styles.content}>{selectedPlant.averageYield} kg/m2</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedPlant.status}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Quy trình:</p>
						<p className={styles.content}>{selectedPlant.process}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Giá mua:</p>
						<p className={styles.content}>
							{formatNumber(selectedPlant.purchasedPrice)}
						</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
