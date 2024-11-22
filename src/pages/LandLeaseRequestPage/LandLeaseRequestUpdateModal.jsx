import React, {useState} from 'react';
import styles from './LandLeaseRequestPage.module.css';
import {message, Modal, Checkbox, Tag} from 'antd';
import {formatNumber} from '../../utils';

export const LandLeaseRequestUpdateModal = ({
	selectedRequest,
	handleModalClose,
	isModalOpen,
	handleApprove,
}) => {
	const [notOnSite, setNotOnSite] = useState(false);

	const handleUpdateRequest = () => {
		const body = {
			booking_id: selectedRequest.booking_id,
			// is_schedule: notOnSite,
			status: 'pending_contract',
		};
		handleApprove(body);
	};

	const handleCheckboxChange = (e) => {
		setNotOnSite(e.target.checked);
		console.log('Không có mặt tại trang trại:', e.target.checked);
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Xử lí yêu cầu thuê đất</span>}
			open={isModalOpen}
			onOk={handleUpdateRequest}
			onCancel={handleModalClose}
			// style={{top: 20}}
			okText="Tạo Hợp Đồng"
			cancelText="Hủy"
			width={'max-content'}
		>
			{selectedRequest && (
				<div className={styles.modalContainer}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID Yêu Cầu:</p>
							<p className={styles.content}>{selectedRequest.booking_id}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Người Thuê Đất:</p>
							<p className={styles.content}>
								{selectedRequest.land_renter.full_name}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Email:</p>
							<p className={styles.content}>{selectedRequest.land_renter.email}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Mảnh Đất:</p>
							<p className={styles.content}>{selectedRequest.land.name}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày Bắt Đầu:</p>
							<p className={styles.content}>
								{new Date(selectedRequest.time_start).toLocaleDateString()}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Ngày Kết Thúc:</p>
							<p className={styles.content}>
								{new Date(selectedRequest.time_end).toLocaleDateString()}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Số Tháng Thuê:</p>
							<p className={styles.content}>{selectedRequest.total_month} tháng</p>
						</div>
					</div>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Giá Thuê Mỗi Tháng:</p>
							<p className={styles.content}>
								{formatNumber(selectedRequest.price_per_month)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tiền Đặt Cọc:</p>
							<p className={styles.content}>
								{formatNumber(selectedRequest.price_deposit)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tổng Giá:</p>
							<p className={styles.content}>
								{formatNumber(selectedRequest.total_price)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Mục Đích Thuê:</p>
							<p className={styles.content}>{selectedRequest.purpose_rental}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Hình Thức Thanh Toán:</p>
							<p className={styles.content}>
								{selectedRequest.payment_frequency === 'single'
									? 'Một lần'
									: 'Theo lịch trình'}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng Thái:</p>
							<p className={styles.content}>
								<Tag
									color={
										selectedRequest.status === 'pending'
											? 'gold'
											: selectedRequest.status === 'rejected'
												? 'red'
												: 'green'
									}
								>
									{selectedRequest.status === 'pending'
										? 'Đang xử lí'
										: selectedRequest.status === 'rejected'
											? 'Từ chối'
											: 'Chấp nhận'}
								</Tag>
							</p>
						</div>
						{selectedRequest.reason_for_reject && (
							<div className={styles.bookingItem}>
								<p className={styles.title}>Lý Do Từ Chối:</p>
								<p className={styles.content}>
									{selectedRequest.reason_for_reject}
								</p>
							</div>
						)}
						{selectedRequest.reason_for_cancel && (
							<div className={styles.bookingItem}>
								<p className={styles.title}>Lý Do Hủy:</p>
								<p className={styles.content}>
									{selectedRequest.reason_for_cancel}
								</p>
							</div>
						)}
						{/* <div className={styles.checkboxContainer}>
							<Checkbox onChange={handleCheckboxChange} checked={notOnSite}>
								<div className={styles.bookingItem}>
									<p className={styles.title}>Không có mặt tại trang trại</p>
								</div>
							</Checkbox>
						</div> */}
					</div>
					{/* Checkbox for "Không có mặt tại trang trại" */}
				</div>
			)}
		</Modal>
	);
};
