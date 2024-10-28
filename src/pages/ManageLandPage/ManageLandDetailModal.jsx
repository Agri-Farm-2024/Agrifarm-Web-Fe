import React from 'react';
import styles from './ManageLandPage.module.css';
import {Image, Modal} from 'antd';

export const ManageLandDetailModal = ({selectedLand, handleModalClose, isModalOpen}) => {
	console.log(selectedLand);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết mảnh đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
			width={'max-content'}
		>
			{selectedLand && (
				<div className={styles.modalContainer}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID mảnh đất:</p>
							<p className={styles.content}>{selectedLand.landID}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tên mảnh đất:</p>
							<p className={styles.content}>{selectedLand.nameLand}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Diện tích:</p>
							<p className={styles.content}>{selectedLand.area}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Vị trí:</p>
							<p className={styles.content}>{selectedLand.position}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tình trạng đất:</p>
							<p className={styles.content}>{selectedLand.landOfStatus}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng thái:</p>
							<p className={styles.content}>{selectedLand.status}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Loại đất:</p>
							<p className={styles.content}>{selectedLand.typeOfLand}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Nhân viên phụ trách:</p>
							<p className={styles.content}>{selectedLand.assignStaff}</p>
						</div>
						<div
							className={styles.bookingItem}
							style={{flexDirection: 'column', alignItems: 'flex-start'}}
						>
							<p className={styles.title}>Hình ảnh:</p>
							<div style={{display: 'flex', flexWrap: 'wrap'}}>
								{selectedLand.images.map((image, index) => (
									<div style={{width: 300, margin: 20}}>
										<Image
											src={selectedLand.images[0]}
											alt="Land Image"
											style={{width: '100%', height: 'auto'}}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tiêu đề:</p>
							<p className={styles.content}>{selectedLand.description.title}</p>
						</div>
						<div>
							<p style={{fontSize: '1em', fontWeight: 'bold'}}>Mô tả:</p>
							<div
								dangerouslySetInnerHTML={{__html: selectedLand.description.desc}}
							/>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};
