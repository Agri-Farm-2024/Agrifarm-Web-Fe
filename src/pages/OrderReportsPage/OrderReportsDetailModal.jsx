import React, {useState} from 'react';
import styles from './OrderReportsPage.module.css';
import {Button, Image, Modal} from 'antd';
import {formatNumber} from '../../utils';

export const OrderReportsDetailModal = ({selectedOrder, handleModalClose, isModalOpen}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết báo cáo đơn hàng</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={'max-content'}
			style={{top: 20}}
		>
			{selectedOrder && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID đơn hàng:</p>
						<p className={styles.content}>{selectedOrder.orderId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên khách hàng:</p>
						<p className={styles.content}>{selectedOrder.customerName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Số điện thoại:</p>
						<p className={styles.content}>{selectedOrder.customerPhone}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày giao:</p>
						<p className={styles.content}>{selectedOrder.deliveryDate}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày gửi yêu cầu:</p>
						<p className={styles.content}>{selectedOrder.dateRequest}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Nhân viên giao hàng:</p>
						<p className={styles.content}>{selectedOrder.expertResponsible}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedOrder.status}</p>
					</div>
					<div className={styles.orderProducts}>
						<p className={styles.title}>Sản phẩm:</p>
						<div className={styles.orderProductsContainer}>
							{selectedOrder.products &&
								selectedOrder.products.length > 0 &&
								selectedOrder.products.map((product, index) => (
									<div className={styles.product}>
										<p style={{width: '28%'}}>{product.materialName}</p>
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
						<p className={styles.title}>Tổng giá trị đơn hàng:</p>
						<p className={styles.content}>
							{formatNumber(selectedOrder.totalPrice)} VND
						</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
