import React, {useState} from 'react';
import styles from './ManageContractByManager.module.css';
import {Button, Image, message, Modal, Upload} from 'antd';
import {formatNumber} from '../../utils';
import {UploadOutlined} from '@ant-design/icons';

export const ManageContractDetailModal = ({selectedBooking, handleModalClose, isModalOpen}) => {
	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);

	const handleApproveContract = () => {
		const hideLoading = message.loading('Đang xử lý...', 0);
		handleModalClose();
		setTimeout(() => {
			hideLoading();
			message.success('Đã phê duyệt hợp đồng');
		}, 1000);
	};

	const handleImageUpload = ({file}) => {
		const hideLoading = message.loading('Đang tải hợp đồng...', 0);
		setTimeout(() => {
			hideLoading();
			message.success('Tải hợp đồng thành công');
		}, 1000);
		setImageFile(file);
		console.log('Uploaded file:', file);
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hợp đồng</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
		>
			{selectedBooking && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID hợp đồng:</p>
						<p className={styles.content}>{selectedBooking.bookingId}</p>
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
					{selectedBooking.status === 'Chờ phê duyệt' ? (
						<Button type="primary" onClick={handleApproveContract}>
							Phê duyệt hợp đồng
						</Button>
					) : (
						<div className={styles.bookingItem}>
							<p className={styles.title}>Hình ảnh hợp đồng:</p>
							{selectedBooking.image ? (
								<Button type="primary" onClick={() => setVisibleContract(true)}>
									Xem hợp đồng
								</Button>
							) : (
								<Upload
									showUploadList={false}
									beforeUpload={() => false} // Prevent automatic upload
									onChange={handleImageUpload}
								>
									<Button type="primary" icon={<UploadOutlined />}>
										Tải hợp đồng
									</Button>
								</Upload>
							)}
						</div>
					)}

					<Image
						width={200}
						style={{
							display: 'none',
						}}
						preview={{
							visible: visibleContract,
							scaleStep: 1,
							src: imageFile ? URL.createObjectURL(imageFile) : selectedBooking.image,
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
