import React, {useState} from 'react';
import styles from './ManageContractByManager.module.css';
import {Button, Image, message, Modal, Tag, Upload} from 'antd';
import {formatNumber} from '../../utils';
import {UploadOutlined} from '@ant-design/icons';

export const ManageContractDetailModal = ({selectedBooking, handleModalClose, isModalOpen}) => {
	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);

	console.log(selectedBooking);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hợp đồng</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			width={'max-content'}
			cancelText="Hủy"
		>
			{selectedBooking && (
				<div className={styles.modalContainer}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID Yêu Cầu:</p>
							<p className={styles.content}>{selectedBooking.booking_id}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Người Thuê Đất:</p>
							<p className={styles.content}>
								{selectedBooking.land_renter.full_name}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Email:</p>
							<p className={styles.content}>{selectedBooking.land_renter.email}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Mảnh Đất:</p>
							<p className={styles.content}>{selectedBooking.land.name}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày Bắt Đầu:</p>
							<p className={styles.content}>
								{new Date(selectedBooking.time_start).toLocaleDateString()}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày Kết Thúc:</p>
							<p className={styles.content}>
								{new Date(selectedBooking.time_end).toLocaleDateString()}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Số Tháng Thuê:</p>
							<p className={styles.content}>{selectedBooking.total_month} tháng</p>
						</div>
					</div>

					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Giá Thuê Mỗi Tháng:</p>
							<p className={styles.content}>
								{formatNumber(selectedBooking.price_per_month)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tiền Đặt Cọc:</p>
							<p className={styles.content}>
								{formatNumber(selectedBooking.price_deposit)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tổng Giá:</p>
							<p className={styles.content}>
								{formatNumber(selectedBooking.total_price)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Mục Đích Thuê:</p>
							<p className={styles.content}>{selectedBooking.purpose_rental}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Hình Thức Thanh Toán:</p>
							<p className={styles.content}>
								{selectedBooking.payment_frequency === 'single'
									? 'Một lần'
									: 'Theo lịch trình'}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng Thái:</p>
							<p className={styles.content}>
								{selectedBooking.status == 'comleted' && (
									<Tag color="green" key={status}>
										Đang hiệu lực
									</Tag>
								)}
								{selectedBooking.status == 'expired' && (
									<Tag color="default" key={status}>
										Sắp hết hạn
									</Tag>
								)}
								{selectedBooking.status == 'canceled' && (
									<Tag color="red" key={status}>
										Chấm dứt
									</Tag>
								)}
								{selectedBooking.status == 'pending_contract' && (
									<Tag color="warning" key={status}>
										Chờ phê duyệt
									</Tag>
								)}
								{selectedBooking.status == 'pending_payment' && (
									<Tag color="magenta" key={status}>
										Chờ thanh toán
									</Tag>
								)}
								{selectedBooking.status == 'pending_sign' && (
									<Tag color="cyan" key={status}>
										Chờ ký tên
									</Tag>
								)}
								{selectedBooking.status == 'rejected' && (
									<Tag color="red" key={status}>
										Hủy yêu cầu
									</Tag>
								)}
							</p>
						</div>
						{selectedBooking.status === 'rejected' && (
							<div className={styles.bookingItem}>
								<p className={styles.title}>Lý Do Từ Chối:</p>
								<p className={styles.content}>
									{selectedBooking.reason_for_reject}
								</p>
							</div>
						)}
						{selectedBooking.status === 'rejected' && (
							<div className={styles.bookingItem}>
								<p className={styles.title}>Lý Do Hủy:</p>
								<p className={styles.content}>
									{selectedBooking.reason_for_cancel}
								</p>
							</div>
						)}
						{selectedBooking.status !== 'pending_sign' &&
							selectedBooking.status !== 'pending_contract' && (
								<div className={styles.bookingItem}>
									<p className={styles.title}>Hình ảnh hợp đồng:</p>
									<Button type="primary" onClick={() => setVisibleContract(true)}>
										Xem hợp đồng
									</Button>
									<Image
										width={200}
										style={{
											display: 'none',
										}}
										preview={{
											visible: visibleContract,
											scaleStep: 1,
											src: imageFile
												? URL.createObjectURL(imageFile)
												: selectedBooking.contract_image,
											onVisibleChange: (value) => {
												setVisibleContract(value);
											},
										}}
									/>
								</div>
							)}
					</div>
				</div>
			)}
		</Modal>
	);
};
