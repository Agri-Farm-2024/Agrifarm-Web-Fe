import React, {useState} from 'react';
import styles from './DiaryMonitoringPage.module.css';
import {Button, Image, Modal} from 'antd';
import {formatNumber} from '../../utils';
import {DiaryProgress} from '../../components/DiaryProgress/DiaryProgress';

export const DiaryMonitoringDetailModal = ({selectedDiary, handleModalClose, isModalOpen}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết nhật ký</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={'max-content'}
			style={{top: 20}}
		>
			{selectedDiary && (
				<div className={styles.modalContainer}>
					<p className={styles.diaryTitle}>Nhật ký trồng dưa lưới 28/4 - 28/6</p>
					<div className={styles.diaryContent}>
						<div className={styles.diaryInfo}>
							<p>ID: {selectedDiary.logId}</p>
							<p>Người trồng: {selectedDiary.customerName}</p>
							<p>Giống cây: {selectedDiary.plantType}</p>
							<p>
								Loại dịch vụ sử dụng:{' '}
								{selectedDiary.services.map((service, index) => {
									if (index == selectedDiary.services.length - 1) {
										return service;
									} else {
										return `${service} + `;
									}
								})}
							</p>
							<p>Ngày tạo: {selectedDiary.createAt}</p>
						</div>
						<div className={styles.diaryProgress}>
							<DiaryProgress diaryProgress={selectedDiary.diaryContent} />
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};
