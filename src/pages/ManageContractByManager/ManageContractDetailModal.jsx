import React, {useRef, useState} from 'react';
import styles from './ManageContractByManager.module.css';
import {Button, Image, message, Modal, Tag, Upload} from 'antd';
import {useReactToPrint} from 'react-to-print';
import {convertImageURL, formatNumber} from '../../utils';
import {UploadOutlined} from '@ant-design/icons';
import PrintContract from './PrintContract/PrintContract';

export const ManageContractDetailModal = ({selectedBooking, handleModalClose, isModalOpen}) => {
	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const contentRef = useRef(null);

	const handlePrint = useReactToPrint({
		contentRef,
		documentTitle: `Hợp_đồng_${selectedBooking?.booking_id}`,
	});

	console.log(selectedBooking);

	const contract = {
		createAt: selectedBooking?.created_at,
		farmOwner: 'Trang trại AgriFarm - quản lí trang trại: bà Trịnh Gia Hân',
		landrenter: selectedBooking?.land_renter?.full_name,
		totalMonth: selectedBooking?.total_month,
		purpose: selectedBooking?.purpose_rental,
		area: selectedBooking?.land?.acreage_land,
		position: selectedBooking?.land?.name,
		pricePerMonth: selectedBooking?.land?.price_booking_per_month,
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết hợp đồng</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={'max-content'}
			cancelText="Hủy"
		>
			{selectedBooking && (
				<div className={styles.modalContainer}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Hợp đồng:</p>
							<div className={styles.content}>
								<Button type="primary" onClick={handlePrint}>
									In hợp đồng
								</Button>
								<div style={{display: 'none'}}>
									<PrintContract contract={contract} ref={contentRef} />
								</div>
							</div>
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
											src: selectedBooking?.contract_image
												? convertImageURL(selectedBooking.contract_image)
												: 'error',
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
