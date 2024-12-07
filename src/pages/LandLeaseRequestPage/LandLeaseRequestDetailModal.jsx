import React from 'react';
import {Modal, Descriptions} from 'antd';
import styles from './LandLeaseRequestPage.module.css';
import {formatNumber} from '../../utils';

const statusMapping = {
	pending: 'Đang xử lí',
	rejected: 'Từ chối',
	accepted: 'Chấp nhận',
};

const paymentFrequencyMapping = {
	single: 'Một lần',
	multiple: 'Nhiều lần',
};

export const LandLeaseRequestDetailModal = ({selectedRequest, handleModalClose, isModalOpen}) => {
	console.log('LandLeaseRequestDetailModal: ' + JSON.stringify(selectedRequest));
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết yêu cầu thuê đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			footer={null}
			centered
			cancelText="Hủy"
			width={'80%'}
		>
			{selectedRequest && (
				<Descriptions
					bordered
					column={2} // Set two columns
					className={styles.modalContainer}
					labelStyle={{width: '10rem', fontWeight: 'bold'}}
					contentStyle={{paddingLeft: '1rem'}}
				>
					<Descriptions.Item label="ID Yêu Cầu">
						{selectedRequest.booking_id}
					</Descriptions.Item>
					<Descriptions.Item label="Người Thuê Đất">
						{selectedRequest.land_renter.full_name}
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						{selectedRequest.land_renter.email}
					</Descriptions.Item>
					<Descriptions.Item label="Mảnh Đất">
						{selectedRequest.land.name}
					</Descriptions.Item>
					<Descriptions.Item label="Ngày Bắt Đầu">
						{new Date(selectedRequest.time_start).toLocaleDateString()}
					</Descriptions.Item>
					<Descriptions.Item label="Ngày Kết Thúc">
						{new Date(selectedRequest.time_end).toLocaleDateString()}
					</Descriptions.Item>
					<Descriptions.Item label="Số Tháng Thuê">
						{selectedRequest.total_month} tháng
					</Descriptions.Item>
					<Descriptions.Item label="Giá Thuê Mỗi Tháng">
						{formatNumber(selectedRequest.price_per_month)} VND
					</Descriptions.Item>
					<Descriptions.Item label="Tiền Đặt Cọc">
						{formatNumber(selectedRequest.price_deposit)} VND
					</Descriptions.Item>
					{/* <Descriptions.Item label="Tổng Giá">
						{formatNumber(selectedRequest.total_price)} VND
					</Descriptions.Item> */}
					<Descriptions.Item label="Mục Đích Thuê">
						{selectedRequest.purpose_rental}
					</Descriptions.Item>
					<Descriptions.Item label="Hình Thức Thanh Toán">
						{paymentFrequencyMapping[selectedRequest.payment_frequency]}
					</Descriptions.Item>
					<Descriptions.Item label="Trạng Thái">
						{selectedRequest.status === 'pending'
							? 'Đang xử lí'
							: selectedRequest.status === 'rejected'
								? 'Từ chối'
								: 'Chấp nhận'}
					</Descriptions.Item>
					{selectedRequest.reason_for_reject && (
						<Descriptions.Item label="Lý Do Từ Chối" span={2}>
							{selectedRequest.reason_for_reject}
						</Descriptions.Item>
					)}
					{selectedRequest.reason_for_cancel && (
						<Descriptions.Item label="Lý Do Hủy" span={2}>
							{selectedRequest.reason_for_cancel}
						</Descriptions.Item>
					)}
				</Descriptions>
			)}
		</Modal>
	);
};
