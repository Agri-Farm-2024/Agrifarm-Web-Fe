import React from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {Modal} from 'antd';
import {formatNumber} from '../../utils';

export const ManagePlantSeasonDetailModal = ({
	selectedPlantSeason,
	handleModalClose,
	isModalOpen,
}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin mùa vụ</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={600}
		>
			{selectedPlantSeason && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID mùa vụ:</p>
						<p className={styles.content}>{selectedPlantSeason.plantSeasonId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên mùa vụ:</p>
						<p className={styles.content}>{selectedPlantSeason.plantSeasonName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tháng bắt đầu:</p>
						<p className={styles.content}>{selectedPlantSeason.monthStart}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Loại cây:</p>
						<p className={styles.content}>{selectedPlantSeason.plantName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Đơn giá:</p>
						<p className={styles.content}>
							{formatNumber(selectedPlantSeason.pricePurchasePerKg)} VND/kg
						</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Giá quy trình theo mùa vụ:</p>
						<p className={styles.content}>
							{formatNumber(selectedPlantSeason.priceProcess)} VND
						</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Loại mùa vụ:</p>
						<p className={styles.content}>{selectedPlantSeason.seasonType}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
