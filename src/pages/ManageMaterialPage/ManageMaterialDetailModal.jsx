import React from 'react';
import styles from './ManageMaterialPage.module.css';
import {Modal} from 'antd';

export const ManageMaterialDetailModal = ({selectedMaterial, handleModalClose, isModalOpen}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin vật tư</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			width={1000}
		>
			{selectedMaterial && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID vật tư:</p>
						<p className={styles.content}>{selectedMaterial.materialId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên vật tư:</p>
						<p className={styles.content}>{selectedMaterial.materialName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Loại vật tư:</p>
						<p className={styles.content}>{selectedMaterial.materialType}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Đơn vị tính:</p>
						<p className={styles.content}>{selectedMaterial.materialMeasure}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Số lượng: </p>
						<p className={styles.content}>{selectedMaterial.quantity}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedMaterial.status}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Mô tả:</p>
						<p className={styles.content}>{selectedMaterial.materialDescription}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
