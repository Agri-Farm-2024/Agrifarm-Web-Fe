import React from 'react';
import styles from './SupplyOrderPage.module.css';
import {Button, Modal} from 'antd';
import {formatNumber} from '../../utils';

export const SupplyOrderDetailModal = ({selectedOrder, handleModalClose, isModalOpen}) => {
	console.log(selectedOrder);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hóa đơn cung cấp thiết bị</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
			width={'max-content'}
		>
			{selectedOrder && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID yêu cầu:</p>
						<p className={styles.content}>{selectedOrder.orderID}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Khách hàng:</p>
						<p className={styles.content}>{selectedOrder.customer}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày gửi yêu cầu:</p>
						<p className={styles.content}>{selectedOrder.dateToRequest}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày giao:</p>
						<p className={styles.content}>{selectedOrder.dateToShip}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày hết hạn:</p>
						<p className={styles.content}>{selectedOrder.dateToExpire}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Chuyên gia phụ trách:</p>
						<p className={styles.content}>{selectedOrder.assignExpert}</p>
					</div>

					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedOrder.status}</p>
					</div>
					<div className={styles.orderProducts}>
						<p className={styles.title}>Sản phẩm:</p>
						<div className={styles.orderProductsContainer}>
							{selectedOrder.device &&
								selectedOrder.device.length > 0 &&
								selectedOrder.device.map((product, index) => (
									<div className={styles.product}>
										<p style={{width: '28%'}}>+ {product.materialName}</p>
										<p style={{width: '9%'}}>SL: {product.quantity}</p>
										<p style={{width: '28%'}}>
											Đơn giá: {formatNumber(product.unitPrice)} VND
										</p>
										<p style={{width: '35%'}}>
											Thành tiền:{' '}
											{formatNumber(product.unitPrice * product.quantity)} VND
										</p>
									</div>
								))}
						</div>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tổng giá giá trị đơn hàng:</p>
						<p className={styles.content}>
							{selectedOrder.totalPrice.toLocaleString()} VND
						</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
