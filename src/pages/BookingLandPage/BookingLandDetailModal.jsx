import React, {useState} from 'react';
import styles from './BookingLandPage.module.css';
import {Button, Image, Modal} from 'antd';
import {formatNumber} from '../../utils';

export const BookingLandDetailModal = ({selectedBooking, handleModalClose, isModalOpen}) => {
	const [visibleContract, setVisibleContract] = useState(false);

	const handleUpdateBooking = () => {
		console.log('Update');
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hợp đồng</span>}
			open={isModalOpen}
			onOk={handleUpdateBooking}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
		>
			{selectedBooking && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID hợp đồng:</p>
						<p className={styles.content}>{selectedBooking.bookingId}</p>
						<Button type="primary" onClick={() => setVisibleContract(true)}>
							Xem hợp đồng
						</Button>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên khách hàng:</p>
						<p className={styles.content}>{selectedBooking.landRenterName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID mảnh đất:</p>
						<p className={styles.content}>{selectedBooking.landId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên mảnh đất:</p>
						<p className={styles.content}>{selectedBooking.landName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Giá trị hợp đồng:</p>
						<p className={styles.content}>
							{formatNumber(selectedBooking.totalPrice)} VND
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày bắt đầu thuê:</p>
						<p className={styles.content}>{selectedBooking.dateStart}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Thời gian thuê:</p>
						<p className={styles.content}>{selectedBooking.dateEnd}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Thời gian còn lại:</p>
						<p className={styles.content}>{selectedBooking.timeRemain}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedBooking.status}</p>
					</div>

					<Image
						width={200}
						style={{
							display: 'none',
						}}
						src="https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg"
						preview={{
							visible: visibleContract,
							scaleStep: 1,
							src: 'https://i.pinimg.com/736x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg',
							onVisibleChange: (value) => {
								setVisibleContract(value);
							},
						}}
					/>
				</div>
			)}
		</Modal>
	);
};
