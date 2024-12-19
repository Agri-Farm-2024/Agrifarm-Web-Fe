import React from 'react';
import styles from './ManageTransactionPage.module.css';
import {Modal, Descriptions, Tag, message} from 'antd';
import {capitalizeFirstLetter, formatDate, formatNumber, formatTimeViewLand} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {approveTransaction} from '../../redux/slices/transactionSlice';

export const ManageTransactionDetailModal = ({
	selectedTransaction,
	handleModalClose,
	isModalOpen,
}) => {
	const loading = useSelector((state) => state?.transactionSlice?.loading);
	const dispatch = useDispatch();

	const handleApproveTransaction = () => {
		console.log('Approve transaction: ', selectedTransaction?.transaction_id);
		const hideLoading = message.loading('Đang xử lý...', 0);
		dispatch(
			approveTransaction({
				transactionID: selectedTransaction?.transaction_id,
			})
		)
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 200) {
					handleModalClose(true);
					message.success('Phê duyệt thành công');
				} else {
					message.error('Có lỗi trong quá trình cập nhật');
				}
			})
			.catch(() => {
				hideLoading();
				message.error('Có lỗi trong quá trình cập nhật');
			});
	};

	console.log(
		selectedTransaction?.service_specific?.requests?.find(
			(request) => request.type === 'product_puchase_harvest'
		)?.task?.report
	);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết giao dịch</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			style={{top: 20}}
			cancelText="Hủy"
			okButtonProps={
				selectedTransaction?.status === 'approved' && selectedTransaction?.type === 'refund'
					? null
					: {style: {display: 'none'}}
			}
			onOk={handleApproveTransaction}
			okText={loading ? 'Đang xử lý' : 'Đã thanh toán'}
		>
			<div style={{maxHeight: '600px', overflowY: 'auto'}}>
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

						{selectedTransaction?.service_specific?.requests?.find(
							(request) => request.type === 'product_puchase_harvest'
						)?.task?.report &&
							selectedTransaction?.type === 'refund' && (
								<Descriptions.Item label="Số lượng">
									{
										selectedTransaction?.service_specific?.requests?.find(
											(request) => request.type === 'product_puchase_harvest'
										)?.task?.report?.mass_plant
									}{' '}
									kg
								</Descriptions.Item>
							)}
						{selectedTransaction?.service_specific?.requests?.find(
							(request) => request.type === 'product_puchase_harvest'
						)?.task?.report &&
							selectedTransaction?.type === 'refund' && (
								<Descriptions.Item label="Chất lượng">
									{selectedTransaction?.service_specific?.requests?.find(
										(request) => request.type === 'product_puchase_harvest'
									)?.task?.report?.quality_plant === 100
										? 'Tốt'
										: selectedTransaction?.service_specific?.requests?.find(
													(request) =>
														request.type === 'product_puchase_harvest'
											  )?.task?.report?.quality_plant === 100
											? 'Khá'
											: 'Trung bình'}{' '}
								</Descriptions.Item>
							)}
						{selectedTransaction?.service_specific?.requests?.find(
							(request) => request.type === 'product_puchase_harvest'
						)?.task?.report &&
							selectedTransaction?.type === 'refund' && (
								<Descriptions.Item label="Đơn giá">
									{formatNumber(
										selectedTransaction?.service_specific?.requests?.find(
											(request) => request.type === 'product_puchase_harvest'
										)?.task?.report?.price_purchase_per_kg
									)}{' '}
									VND/kg
								</Descriptions.Item>
							)}
						<Descriptions.Item label="Giá">
							{selectedTransaction?.total_price?.toLocaleString()} VND
						</Descriptions.Item>
						{selectedTransaction?.booking_land?.time_start && (
							<Descriptions.Item label="Thời gian thuê">
								{formatDate(selectedTransaction?.booking_land?.time_start)} -{' '}
								{formatDate(selectedTransaction?.booking_land?.time_end)}
							</Descriptions.Item>
						)}

						{selectedTransaction?.booking_land?.price_per_month && (
							<Descriptions.Item label="Tiền thuê mỗi tháng">
								{formatNumber(selectedTransaction?.booking_land?.price_per_month)}{' '}
								VND
							</Descriptions.Item>
						)}
						{selectedTransaction?.booking_land?.price_deposit && (
							<Descriptions.Item label="Tiền cọc">
								{formatNumber(selectedTransaction?.booking_land?.price_deposit)} VND
							</Descriptions.Item>
						)}

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
							{selectedTransaction?.purpose === 'cancel_purchase_product' && (
								<Tag color="#ccc">Hủy thu mua</Tag>
							)}
							{selectedTransaction?.purpose === 'cancel_booking_material' && (
								<Tag color="#536878">Hủy thuê thiết bị</Tag>
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
								{capitalizeFirstLetter(
									selectedTransaction?.booking_land?.land?.name
								)}
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
			</div>
		</Modal>
	);
};
