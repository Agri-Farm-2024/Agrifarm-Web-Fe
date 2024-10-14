import React from 'react';
import styles from './ManageAgriProductPurchaseRequestPage.module.css';
import {Image, Modal} from 'antd';
import {formatNumber} from '../../utils';

export const ManageAgriProductPurchaseRequestDetailModal = ({
	selectedPurchaseRequest,
	handleModalClose,
	isModalOpen,
}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin yêu cầu</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={'max-content'}
		>
			{selectedPurchaseRequest && (
				<div className={styles.modalContainer}>
					<div className={styles.subModalContainer}>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID yêu cầu:</p>
							<p className={styles.content}>{selectedPurchaseRequest.requestId}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Khách hàng:</p>
							<p className={styles.content}>{selectedPurchaseRequest.customerName}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Số điện thoại:</p>
							<p className={styles.content}>{selectedPurchaseRequest.phone}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tên nông sản:</p>
							<p className={styles.content}>{selectedPurchaseRequest.plantName}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Đơn giá thu mua: </p>
							<p
								className={styles.content}
							>{`${formatNumber(selectedPurchaseRequest.unitPrice)} VND/${selectedPurchaseRequest.unitMeasure}`}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Số lượng dự kiến:</p>
							<p
								className={styles.content}
							>{`${formatNumber(selectedPurchaseRequest.expectOutput)} ${selectedPurchaseRequest.unitMeasure}`}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tổng giá trị nông sản:</p>
							<p
								className={styles.content}
							>{`${formatNumber(selectedPurchaseRequest.totalPrice)} VND`}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày gửi yêu cầu:</p>
							<p className={styles.content}>{selectedPurchaseRequest.createAt}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Mảnh đất:</p>
							<p className={styles.content}>{selectedPurchaseRequest.landName}</p>
						</div>
					</div>
					<div className={styles.subModalContainer}>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Nhân viên thu mua:</p>
							<p className={styles.content}>
								{selectedPurchaseRequest.purchaseExpert}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng thái:</p>
							<p className={styles.content}>{selectedPurchaseRequest.status}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày mua dự kiến:</p>
							<p className={styles.content}>
								{selectedPurchaseRequest.expectPurchaseDate}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Chất lượng:</p>
							<p className={styles.content}>{selectedPurchaseRequest.quality}</p>
						</div>
						{selectedPurchaseRequest.imageReport &&
							selectedPurchaseRequest.imageReport != '' && (
								<div
									style={{flexDirection: 'column', alignItems: 'flex-start'}}
									className={styles.bookingItem}
								>
									<p className={styles.title}>Hình ảnh:</p>
									<Image
										style={{width: 500, borderRadius: 5}}
										src={selectedPurchaseRequest.imageReport}
									></Image>
								</div>
							)}
					</div>
				</div>
			)}
		</Modal>
	);
};
