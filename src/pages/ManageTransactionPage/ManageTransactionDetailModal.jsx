import React from 'react';
import styles from './ManageTransactionPage.module.css';
import {Modal, Descriptions, Tag} from 'antd';
import {capitalizeFirstLetter, formatDate, formatTimeViewLand} from '../../utils';

export const ManageTransactionDetailModal = ({
	selectedTransaction,
	handleModalClose,
	isModalOpen,
}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết giao dịch</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
		>
			{selectedTransaction && (
				<Descriptions
					bordered
					column={1}
					labelStyle={{fontWeight: 'bold', fontSize: '1rem'}}
					contentStyle={{fontSize: '1rem'}}
				>
					<Descriptions.Item label="Mã giao dịch">
						<a>{selectedTransaction?.transaction_code}</a>
					</Descriptions.Item>
					<Descriptions.Item label="Tên khách hàng">
						{selectedTransaction?.user?.full_name}
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						{selectedTransaction?.user?.email}
					</Descriptions.Item>
					<Descriptions.Item label="Giá">
						{selectedTransaction?.total_price?.toLocaleString()} VND
					</Descriptions.Item>
					<Descriptions.Item label="Loại">
						{selectedTransaction?.type === 'payment' && <>Thanh toán</>}
						{selectedTransaction?.type === 'refund' && <>Trả tiền</>}
					</Descriptions.Item>

					<Descriptions.Item label="Mục đích">
						{selectedTransaction?.purpose === 'booking_land' && (
							<Tag color="blue">Thuê đất</Tag>
						)}
						{selectedTransaction?.purpose === 'booking_material' && (
							<Tag color="orange">Thuê thiết bị</Tag>
						)}
						{selectedTransaction?.purpose === 'extend' && (
							<Tag color="cyan">Gia hạn</Tag>
						)}
						{selectedTransaction?.purpose === 'service' && (
							<Tag color="purple">Dịch vụ</Tag>
						)}
						{selectedTransaction?.purpose === 'cancel_service' && (
							<Tag color="red">Hủy dịch vụ</Tag>
						)}
						{selectedTransaction?.purpose === 'cancel_booking_land' && (
							<Tag color="red">Hủy thuê đất</Tag>
						)}
						{selectedTransaction?.purpose === 'service_purchase_product' && (
							<Tag color="gold">Thu mua</Tag>
						)}
						{selectedTransaction?.purpose === 'order' && (
							<Tag color="green">Đơn hàng</Tag>
						)}
					</Descriptions.Item>
					{selectedTransaction?.service_specific?.time_start && (
						<Descriptions.Item label="Thời gian dịch vụ">
							{formatDate(selectedTransaction?.service_specific?.time_start)} -{' '}
							{formatDate(selectedTransaction?.service_specific?.time_end)}
						</Descriptions.Item>
					)}
					{selectedTransaction?.service_specific?.booking_land?.land?.name && (
						<Descriptions.Item label="Mảnh đất">
							{capitalizeFirstLetter(
								selectedTransaction?.service_specific?.booking_land?.land?.name
							)}
						</Descriptions.Item>
					)}
					{selectedTransaction?.booking_land?.land?.name && (
						<Descriptions.Item label="Mảnh đất">
							{capitalizeFirstLetter(selectedTransaction?.booking_land?.land?.name)}
						</Descriptions.Item>
					)}
					<Descriptions.Item label="Ngày tạo">
						{formatTimeViewLand(selectedTransaction?.created_at)}
					</Descriptions.Item>
					{selectedTransaction?.pay_at && (
						<Descriptions.Item label="Ngày thanh toán">
							{formatTimeViewLand(selectedTransaction?.pay_at)}
						</Descriptions.Item>
					)}
					<Descriptions.Item label="Trạng thái">
						{selectedTransaction?.status === 'succeed' && (
							<Tag color="green">Hoàn thành</Tag>
						)}
						{selectedTransaction?.status === 'expired' && (
							<Tag color="red">Hết hạn</Tag>
						)}
						{selectedTransaction?.status === 'pending' && (
							<Tag>Chưa tới lượt thanh toán</Tag>
						)}
						{selectedTransaction?.status === 'approved' && (
							<Tag color="warning">Chờ thanh toán</Tag>
						)}
					</Descriptions.Item>
				</Descriptions>
			)}
		</Modal>
	);
};
