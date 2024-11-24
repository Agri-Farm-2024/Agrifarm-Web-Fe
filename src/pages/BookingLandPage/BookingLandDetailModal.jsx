import React, {useEffect, useState} from 'react';
import styles from './BookingLandPage.module.css';
import {Button, Image, message, Modal, Tag, Upload} from 'antd';
import {convertImageURL, formatNumber} from '../../utils';
import {UploadOutlined} from '@ant-design/icons';
import {uploadFile} from '../../services/uploadService';
import {updateBooking} from '../../redux/slices/landSlice';
import {ExtendsModal} from '../../components/ExtendsModal/ExtendsModal';
import {ExtendsModalStaff} from '../../components/ExtendsModalStaff/ExtendsModalStaff';

export const BookingLandDetailModal = ({
	selectedBooking,
	handleModalClose,
	isModalOpen,
	handleUpdate,
	fetchRequests,
}) => {
	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [imageAPI, setImageAPI] = useState(null);
	const [isModalExtendsOpen, setIsModalExtendsOpen] = useState(false);
	const [selectedExtends, setSelectedExtends] = useState(null);
	useEffect(() => {
		if (!isModalExtendsOpen && selectedExtends === null) {
			handleModalClose();
		}
	}, [isModalExtendsOpen, selectedExtends]);

	const handleOpenExtendsModal = (extend) => {
		setIsModalExtendsOpen(true);
		setSelectedExtends(extend);
	};
	const handleCloseExtendsModal = (isUpdate) => {
		setIsModalExtendsOpen(false);
		if (isUpdate === true) {
			fetchRequests();
			setSelectedExtends(null);
		}
	};

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

	const handleClose = () => {
		handleModalClose();
		setImageAPI(null);
		setImageFile(null);
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hợp đồng</span>}
			open={isModalOpen}
			onOk={handleUpdateBooking}
			onCancel={handleClose}
			style={{top: 10}}
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
								{formatNumber(
									selectedBooking.total_month * selectedBooking.price_per_month +
										(selectedBooking.price_deposit - 0)
								)}{' '}
								VND
							</p>
						</div>
					</div>
					<div>
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
								{selectedBooking.status == 'completed' && (
									<Tag color="green">Đang hiệu lực</Tag>
								)}
								{selectedBooking.status == 'expired' && (
									<Tag color="default">Sắp hết hạn</Tag>
								)}
								{selectedBooking.status == 'canceled' && (
									<Tag color="red">Chấm dứt</Tag>
								)}
								{selectedBooking.status == 'pending_contract' && (
									<Tag color="warning">Chờ phê duyệt</Tag>
								)}
								{selectedBooking.status == 'pending_payment' && (
									<Tag color="magenta">Chờ thanh toán</Tag>
								)}
								{selectedBooking.status == 'pending_sign' && (
									<Tag color="cyan">Chờ ký tên</Tag>
								)}
								{selectedBooking.status == 'rejected' && (
									<Tag color="red">Hủy yêu cầu</Tag>
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
							style={{
								display: 'none',
							}}
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
						<div className={styles.bookingItem}>
							<div>
								<div className={styles.bookingItem}>
									<p className={styles.title}>Gia hạn:</p>
									<p className={styles.content}>
										{selectedBooking.extends.length <= 0 &&
											'Chưa có gia hạn nào'}
									</p>
								</div>
								<div style={{display: 'flex', flexWrap: 'wrap'}}>
									{selectedBooking.extends.map((item, index) => (
										<div
											style={{
												margin: 20,
												borderRadius: 20,
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												border: '1px solid #7fb640',
												padding: 10,
											}}
										>
											<div>
												<p>
													Trạng thái:{' '}
													{item.status == 'pending' && (
														<Tag color="yellow">
															Chờ ý kiến người thuê
														</Tag>
													)}
													{item.status == 'rejected' && (
														<Tag color="default">Từ chối</Tag>
													)}
													{item.status == 'canceled' && (
														<Tag color="red">Chấm dứt</Tag>
													)}
													{item.status == 'pending_contract' && (
														<Tag color="warning">Chờ phê duyệt</Tag>
													)}
													{item.status == 'pending_payment' && (
														<Tag color="magenta">Chờ thanh toán</Tag>
													)}
													{item.status == 'pending_sign' && (
														<Tag color="cyan">Chờ ký tên</Tag>
													)}
													{item.status == 'rejected' && (
														<Tag color="red">Hủy yêu cầu</Tag>
													)}
													{item.status == 'completed' && (
														<Tag color="green">Hủy yêu cầu</Tag>
													)}
												</p>
											</div>
											<Button
												type="primary"
												onClick={() => handleOpenExtendsModal(item)}
											>
												Gia hạn lần {index + 1}
											</Button>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<ExtendsModalStaff
				data={selectedExtends}
				isModalOpen={isModalExtendsOpen}
				handleModalClose={handleCloseExtendsModal}
			/>
		</Modal>
	);
};
