import React from 'react';
import {Modal, Descriptions, Tag, Image} from 'antd';
import styles from './LandReportsPage.module.css';
import {convertImageURL, formatDate, formatNumber} from '../../utils';

export const LandReportsDetailModal = ({selectedReport, handleModalClose, isModalOpen}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết báo cáo đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			footer={null}
			centered
			cancelText="Hủy"
			width={'80%'}
		>
			{selectedReport && (
				<Descriptions
					bordered
					column={2} // Set two columns
					className={styles.modalContainer}
					labelStyle={{width: '10rem', fontWeight: 'bold'}}
					contentStyle={{paddingLeft: '1rem'}}
				>
					<Descriptions.Item label="ID Report">
						<a>{selectedReport?.request_id}</a>
					</Descriptions.Item>
					<Descriptions.Item label="Ngày tạo">
						{formatDate(selectedReport?.created_at)}
					</Descriptions.Item>
					<Descriptions.Item label="Khách hàng">
						{selectedReport?.booking_land?.land_renter?.full_name}
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						{selectedReport?.booking_land?.land_renter?.email}
					</Descriptions.Item>
					<Descriptions.Item label="Mã hợp đồng">
						{selectedReport?.booking_land_id}
					</Descriptions.Item>
					<Descriptions.Item label="Thời gian thuê">
						{formatDate(selectedReport?.booking_land?.time_start)} -{' '}
						{formatDate(selectedReport?.booking_land?.time_end)}
					</Descriptions.Item>
					<Descriptions.Item label="Trạng thái hợp đồng">
						<>
							{selectedReport?.booking_land?.status == 'completed' && (
								<Tag color="green" key={selectedReport?.booking_land?.status}>
									Đang hiệu lực
								</Tag>
							)}
							{selectedReport?.booking_land?.status == 'expired' && (
								<Tag color="default" key={selectedReport?.booking_land?.status}>
									Sắp hết hạn
								</Tag>
							)}
							{selectedReport?.booking_land?.status == 'canceled' && (
								<Tag color="red" key={selectedReport?.booking_land?.status}>
									Chấm dứt
								</Tag>
							)}
							{selectedReport?.booking_land?.status == 'pending_contract' && (
								<Tag color="warning" key={selectedReport?.booking_land?.status}>
									Chờ phê duyệt
								</Tag>
							)}
							{selectedReport?.booking_land?.status == 'pending_payment' && (
								<Tag color="magenta" key={selectedReport?.booking_land?.status}>
									Chờ thanh toán
								</Tag>
							)}
							{selectedReport?.booking_land?.status == 'pending_sign' && (
								<Tag color="cyan" key={selectedReport?.booking_land?.status}>
									Chờ ký tên
								</Tag>
							)}
							{selectedReport?.booking_land?.status == 'rejected' && (
								<Tag color="red" key={selectedReport?.booking_land?.status}>
									Hủy yêu cầu
								</Tag>
							)}
						</>
					</Descriptions.Item>
					<Descriptions.Item label="Tên mảnh đất">
						{selectedReport?.booking_land?.land?.name}
					</Descriptions.Item>
					<Descriptions.Item label="Diện tích mảnh đất">
						{formatNumber(selectedReport?.booking_land?.land?.acreage_land)} m2
					</Descriptions.Item>
					<Descriptions.Item label="Trạng thái báo cáo">
						{selectedReport?.status === 'assigned'
							? 'Đã phân công'
							: selectedReport?.status === 'completed'
								? 'Hoàn thành'
								: 'Chờ phân công'}
					</Descriptions.Item>

					<Descriptions.Item label="Chất lượng báo cáo">
						<strong>{selectedReport?.booking_land?.quality_report * 100}%</strong>
						{!selectedReport?.booking_land?.quality_report && 'Chưa báo cáo'}
					</Descriptions.Item>
					<Descriptions.Item label="Nội dung báo cáo">
						<strong>{selectedReport?.task?.report?.content}</strong>
						{!selectedReport?.task?.report?.content && 'Chưa báo cáo'}
					</Descriptions.Item>
					{selectedReport?.task?.report?.report_url && (
						<Descriptions.Item label="Hình ảnh báo cáo" span={2}>
							<Image
								style={{
									width: '100%',
									maxWidth: 500,
									height: 500,
									borderRadius: 5,
								}}
								src={convertImageURL(
									selectedReport?.task?.report?.report_url[0]?.url_link
								)}
							/>
						</Descriptions.Item>
					)}
				</Descriptions>
			)}
		</Modal>
	);
};
