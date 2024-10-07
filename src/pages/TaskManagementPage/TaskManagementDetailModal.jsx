import React from 'react';
import styles from './TaskManagementPage.module.css';
import {Button, Modal} from 'antd';

export const TaskManagementDetailModal = ({selectedRequestTask, handleModalClose, isModalOpen}) => {
	console.log(selectedRequestTask);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết yêu cầu công việc</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
		>
			{selectedRequestTask && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID công việc:</p>
						<p className={styles.content}>{selectedRequestTask.IDTask}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID đất:</p>
						<p className={styles.content}>{selectedRequestTask.IDLand}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Loại công việc:</p>
						<p className={styles.content}>{selectedRequestTask.Category}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Nội dung:</p>
						<p className={styles.content}>{selectedRequestTask.Content}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Mức độ ưu tiên:</p>
						<p className={styles.content}>{selectedRequestTask.Priority}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Người được giao:</p>
						<p className={styles.content}>{selectedRequestTask.Assign}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedRequestTask.status}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
