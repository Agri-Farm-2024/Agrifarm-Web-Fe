import React, {useEffect, useState} from 'react';
import styles from './ManageLandPage.module.css';
import {Image, Modal, Tag} from 'antd';
import {convertImageURL, formatNumber} from '../../utils';
import {useDispatch} from 'react-redux';
import {getListOfStaff} from '../../redux/slices/userSlice';

export const ManageLandDetailModal = ({
	selectedLand,
	handleModalClose,
	isModalOpen,
	staffList,
	landTypeList,
}) => {
	console.log(selectedLand);
	const dispatch = useDispatch();

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết mảnh đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
			width={'max-content'}
		>
			{selectedLand && (
				<div className={styles.modalContainer}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID mảnh đất:</p>
							<p className={styles.content}>{selectedLand.land_id}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tên mảnh đất:</p>
							<p className={styles.content}>{selectedLand.name}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Diện tích:</p>
							<p className={styles.content}>
								{formatNumber(selectedLand.acreage_land)} m2
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Giá thuê mỗi tháng:</p>
							<p className={styles.content}>
								{formatNumber(selectedLand.price_booking_per_month)} VND
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng thái:</p>
							<p className={styles.content}>
								<Tag
									title="Đang hỗ trợ"
									color={
										selectedLand.status == 'free'
											? 'green'
											: selectedLand.status == 'booked'
												? 'red'
												: 'blue'
									}
								>
									{selectedLand.status == 'free'
										? 'Đang trống'
										: selectedLand.status == 'booked'
											? 'Đang sử dụng'
											: 'Đang sửa chữa'}
								</Tag>
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Nhân viên phụ trách:</p>
							<p className={styles.content}>
								{selectedLand.staff_id
									? staffList.find(
											(staff) => staff.user_id == selectedLand?.staff_id
										).full_name
									: 'Chưa có'}
							</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Loại đất:</p>
							<p className={styles.content}>
								{selectedLand.land_type_id
									? landTypeList.find(
											(type) =>
												type.land_type_id == selectedLand?.land_type_id
										).name
									: 'Chưa có'}
							</p>
						</div>

						<div
							className={styles.bookingItem}
							style={{flexDirection: 'column', alignItems: 'flex-start'}}
						>
							<p className={styles.title}>Hình ảnh:</p>
							<div style={{display: 'flex', flexWrap: 'wrap'}}>
								{selectedLand.url
									.filter((url) => url.type === 'image')
									.map((image, index) => (
										<div key={index} style={{width: 300, margin: 20}}>
											<Image
												src={convertImageURL(image.string_url)}
												alt="Land Image"
												style={{
													width: '100%',
													height: 200,
													objectFit: 'cover',
												}}
											/>
										</div>
									))}
							</div>
						</div>

						<div
							className={styles.bookingItem}
							style={{flexDirection: 'column', alignItems: 'flex-start'}}
						>
							<p className={styles.title}>Video:</p>
							<div style={{display: 'flex', flexWrap: 'wrap'}}>
								{selectedLand.url
									.filter((url) => url.type === 'video')
									.map((video, index) => (
										<div key={index}>
											<video
												src={convertImageURL(video.string_url)}
												controls
												style={{width: '300px', margin: 20, height: 200}}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tiêu đề:</p>
							<p className={styles.content}>{selectedLand.title}</p>
						</div>
						<div>
							<p style={{fontSize: '1em', fontWeight: 'bold'}}>Mô tả:</p>
							<div dangerouslySetInnerHTML={{__html: selectedLand.description}} />
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};
