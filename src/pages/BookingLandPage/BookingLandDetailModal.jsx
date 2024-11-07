import React, {useState} from 'react';
import styles from './BookingLandPage.module.css';
import {Button, Image, message, Modal, Tag, Upload} from 'antd';
import {convertImageURL, formatNumber} from '../../utils';
import {UploadOutlined} from '@ant-design/icons';
import {uploadFile} from '../../services/uploadService';
import {updateBooking} from '../../redux/slices/landSlice';

export const BookingLandDetailModal = ({
	selectedBooking,
	handleModalClose,
	isModalOpen,
	handleUpdate,
}) => {
	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [imageAPI, setImageAPI] = useState(null);

	console.log(selectedBooking);

	const handleUpdateBooking = () => {
		const body = {
			booking_id: selectedBooking.booking_id,
			contract_image: imageAPI,
			status: 'pending_payment',
			payment_frequency: 'single',
		};
		handleUpdate(body);
		setImageAPI(null);
		setImageFile(null);
	};

	const handleImageUpload = ({file}) => {
		console.log(file);
		const hideLoading = message.loading('Đang tải hợp đồng...', 0);
		setTimeout(() => {
			hideLoading();
			uploadFile(file).then((res) => {
				if (res.statusCode === 201) {
					setImageAPI(res.metadata.folder_path);
					message.success('Tải hợp đồng thành công');
					setImageFile(res.metadata.folder_path);
				}
			});
		}, 1000);
		console.log('Uploaded file:', file);
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hợp đồng</span>}
			open={isModalOpen}
			onOk={handleUpdateBooking}
			onCancel={handleModalClose}
			style={{top: 100}}
			width={'max-content'}
			okText="Cập nhật hợp đồng"
			okButtonProps={{disabled: selectedBooking?.status !== 'pending_sign'}}
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

						{selectedBooking.status !== 'rejected' &&
							selectedBooking.status !== 'pending_contract' && (
								<div className={styles.bookingItem}>
									<p className={styles.title}>Hình ảnh hợp đồng:</p>
									{selectedBooking.contract_image || imageFile ? (
										<Button
											type="primary"
											onClick={() => setVisibleContract(true)}
										>
											Xem hợp đồng
										</Button>
									) : (
										<Upload
											accept="image/*"
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
							preview={{
								visible: visibleContract,
								scaleStep: 1,
								src: selectedBooking.contract_image
									? convertImageURL(selectedBooking.contract_image)
									: imageFile
										? convertImageURL(imageFile)
										: 'image',
								onVisibleChange: (value) => {
									setVisibleContract(value);
								},
							}}
						/>
					</div>
				</div>
			)}
		</Modal>
	);
};
