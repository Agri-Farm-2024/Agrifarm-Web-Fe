import React from 'react';
import styles from './ManageTransactionPage.module.css';
import {Modal, Descriptions, Tag} from 'antd';
import {formatTimeViewLand} from '../../utils';

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
						{selectedTransaction?.transaction_code}
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
					<Descriptions.Item label="Mục đich">
						{selectedTransaction?.purpose === 'order' && <>Đơn hàng</>}
						{selectedTransaction?.purpose === 'booking_land' && <>Thuê đất</>}
						{selectedTransaction?.purpose === 'booking_material' && <>Thuê thiết bị</>}
						{selectedTransaction?.purpose === 'extend' && <>Gia hạn</>}
						{selectedTransaction?.purpose === 'service' && <>Dịch vụ</>}
						{selectedTransaction?.purpose === 'cancel_service' && <>Hủy dịch vụ</>}
						{selectedTransaction?.purpose === 'cancel_booking_land' && (
							<>Hủy thuê đất</>
						)}
						{selectedTransaction?.purpose === 'service_purchase_product' && (
							<>Thu mua</>
						)}
					</Descriptions.Item>
					<Descriptions.Item label="Ngày tạo">
						{formatTimeViewLand(selectedTransaction?.created_at)}
					</Descriptions.Item>
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
