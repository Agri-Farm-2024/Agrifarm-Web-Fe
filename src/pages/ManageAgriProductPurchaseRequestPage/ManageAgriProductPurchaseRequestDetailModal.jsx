import React from 'react';
import {Modal, Descriptions, Image, Tag} from 'antd';
import styles from './ManageAgriProductPurchaseRequestPage.module.css';
import {capitalizeFirstLetter, convertImageURL, formatDate, formatNumber} from '../../utils';

export const ManageAgriProductPurchaseRequestDetailModal = ({
	selectedPurchaseRequest,
	handleModalClose,
	isModalOpen,
}) => {
	console.log(
		'ManageAgriProductPurchaseRequestDetailModal' + JSON.stringify(selectedPurchaseRequest)
	);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin thu mua</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			footer={null}
			centered
			width={'60%'}
		>
			{selectedPurchaseRequest && (
				<Descriptions
					bordered
					column={1}
					labelStyle={{fontWeight: 'bold', width: '30%'}}
					contentStyle={{width: '70%'}}
				>
					<Descriptions.Item label="ID yêu cầu">
						<a>{selectedPurchaseRequest.request_id}</a>
					</Descriptions.Item>
					<Descriptions.Item label="Khách hàng">
						{selectedPurchaseRequest?.service_specific?.land_renter?.full_name
							? selectedPurchaseRequest?.service_specific?.land_renter?.full_name
							: 'chưa có'}
					</Descriptions.Item>
					<Descriptions.Item label="Số điện thoại">
						{selectedPurchaseRequest?.service_specific?.land_renter?.phone
							? selectedPurchaseRequest?.service_specific?.land_renter?.phone
							: 'chưa có'}
					</Descriptions.Item>
					<Descriptions.Item label="Tên nông sản">
						{capitalizeFirstLetter(
							selectedPurchaseRequest?.service_specific?.plant_season?.plant?.name
						)}
					</Descriptions.Item>
					<Descriptions.Item label="Đơn giá thu mua(VND)">
						{formatNumber(
							selectedPurchaseRequest?.service_specific?.plant_season
								?.price_purchase_per_kg
						)}{' '}
						/ KG
					</Descriptions.Item>
					<Descriptions.Item label="Ngày gửi yêu cầu">
						{formatDate(selectedPurchaseRequest.created_at)}
					</Descriptions.Item>
					{selectedPurchaseRequest?.task?.report?.quality_plant_expect ? (
						<>
							<Descriptions.Item label="Số lượng dự kiến">
								{selectedPurchaseRequest?.task?.report?.mass_plant_expect} Kg
							</Descriptions.Item>

							<Descriptions.Item label="Chất lượng dự kiến">
								{selectedPurchaseRequest?.task?.report?.quality_plant_expect}% chất
								lượng
							</Descriptions.Item>
						</>
					) : null}
					{selectedPurchaseRequest?.task?.report?.quality_plant ? (
						<>
							<Descriptions.Item label="Số lượng thu hoạch">
								{selectedPurchaseRequest?.task?.report?.mass_plant} Kg
							</Descriptions.Item>

							<Descriptions.Item label="Chất lượng thu hoạch">
								{selectedPurchaseRequest?.task?.report?.quality_plant}% chất lượng
							</Descriptions.Item>
						</>
					) : null}

					{/* {selectedPurchaseRequest?.task?.report?.quality_plant && (
						<>
							<Descriptions.Item label="Số lượng thu hoạch">
								{selectedPurchaseRequest?.task?.report?.mass_plant} Kg
							</Descriptions.Item>

							<Descriptions.Item label="Chất lượng thu hoạch">
								{selectedPurchaseRequest?.task?.report?.quality_plant}% chất lượng
							</Descriptions.Item>
						</>
					)} */}
					<Descriptions.Item label="Nhân viên thu mua">
						{selectedPurchaseRequest?.task?.assign_to?.full_name
							? selectedPurchaseRequest?.task?.assign_to?.full_name
							: 'chưa có'}
					</Descriptions.Item>
					<Descriptions.Item label="Trạng thái">
						{selectedPurchaseRequest.status == 'completed' && (
							<Tag color="green" key={selectedPurchaseRequest.status}>
								Chấp nhận
							</Tag>
						)}
						{selectedPurchaseRequest.status == 'pending' && (
							<Tag color="red" key={selectedPurchaseRequest.status}>
								Đợi phân công
							</Tag>
						)}
						{selectedPurchaseRequest.status == 'pending_approval' && (
							<Tag color="gold" key={selectedPurchaseRequest.status}>
								Đợi phê duyệt
							</Tag>
						)}
						{selectedPurchaseRequest.status == 'assigned' && (
							<Tag color="blue" key={selectedPurchaseRequest.status}>
								Đã phân công
							</Tag>
						)}
						{selectedPurchaseRequest.status == 'in_progress' && (
							<Tag color="magenta" key={selectedPurchaseRequest.status}>
								Đang xử lí
							</Tag>
						)}
						{selectedPurchaseRequest.status == 'rejected' && (
							<Tag color="default" key={selectedPurchaseRequest.status}>
								Từ chối
							</Tag>
						)}
					</Descriptions.Item>
					{selectedPurchaseRequest?.task?.report?.report_url && (
						<Descriptions.Item label="Hình ảnh" span={2}>
							<Image
								style={{
									width: '100%',
									maxWidth: 500,
									height: 500,
									borderRadius: 5,
								}}
								src={convertImageURL(
									selectedPurchaseRequest?.task?.report?.report_url[0]?.url_link
								)}
							/>
						</Descriptions.Item>
					)}
				</Descriptions>
			)}
		</Modal>
	);
};
