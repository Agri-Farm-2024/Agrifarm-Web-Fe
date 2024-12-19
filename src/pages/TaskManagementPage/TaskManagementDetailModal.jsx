import React from 'react';
import styles from './TaskManagementPage.module.css';
import {Button, Descriptions, Modal, Tag} from 'antd';
import {formatDate} from '../../utils';

export const TaskManagementDetailModal = ({selectedRequestTask, handleModalClose, isModalOpen}) => {
	console.log('selectedRequestTask: ' + JSON.stringify(selectedRequestTask));

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết yêu cầu công việc</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 150}}
			cancelText="Hủy"
		>
			{selectedRequestTask && (
				<Descriptions
					bordered
					column={1}
					className={styles.modalContainer}
					labelStyle={{width: '10rem', fontWeight: 'bold'}}
					contentStyle={{paddingLeft: '1rem'}}
				>
					<Descriptions.Item label="ID Yêu Cầu">
						<a>{selectedRequestTask?.request_id}</a>
					</Descriptions.Item>
					<Descriptions.Item label="Loại yêu cầu">
						{selectedRequestTask?.type === 'view_land' && (
							<Tag color="gold">Xem đất</Tag>
						)}
						{selectedRequestTask?.type === 'product_purchase' && (
							<Tag color="geekblue">Thu mua</Tag>
						)}
						{selectedRequestTask?.type === 'product_puchase_harvest' && (
							<Tag color="success">Thu hoạch</Tag>
						)}
						{selectedRequestTask?.type === 'technical_support' && (
							<Tag color="volcano">Hỗ trợ kỹ thuật</Tag>
						)}
						{selectedRequestTask?.type === 'create_process_standard' && (
							<Tag color="cyan">Tạo quy trình chuẩn</Tag>
						)}
						{selectedRequestTask?.type === 'report_land' && (
							<Tag color="purple">Báo cáo đất</Tag>
						)}
						{selectedRequestTask?.type === 'report_booking_material' && (
							<Tag color="magenta">Báo cáo vật tư</Tag>
						)}
						{selectedRequestTask?.type === 'report_service_specific' && (
							<Tag color="orange">Báo cáo dịch vụ</Tag>
						)}
						{selectedRequestTask?.type === 'material_process_specfic_stage' && (
							<Tag color="pink">Cung cấp vật tư</Tag>
						)}
						{selectedRequestTask?.type === 'cultivate_process_content' && (
							<Tag color="lime">Ghi nhật ký</Tag>
						)}
					</Descriptions.Item>
					{/* <Descriptions.Item label="Mảnh đất">
						{selectedRequestTask?.request?.service_specific
							? selectedRequestTask?.request?.service_specific?.booking_land?.land
									?.name
							: selectedRequestTask?.request?.process_technical_specific_stage_content
								? selectedRequestTask?.request
										?.process_technical_specific_stage_content
										?.process_technical_specific_stage
										?.process_technical_specific?.service_specific?.booking_land
										?.land?.name
								: selectedRequestTask?.request?.booking_land
									? selectedRequestTask?.request?.booking_land?.land?.name
									: selectedRequestTask?.request?.process_technical_specific_stage
												?.process_technical_specific?.service_specific
												?.booking_land?.land?.name
										? selectedRequestTask?.request
												?.process_technical_specific_stage
												?.process_technical_specific?.service_specific
												?.booking_land?.land?.name
										: 'Không có'}
					</Descriptions.Item> */}
					<Descriptions.Item label="Ngày tạo">
						{formatDate(selectedRequestTask?.created_at)}
					</Descriptions.Item>
					<Descriptions.Item label="Hình thức hỗ trợ">
						{selectedRequestTask?.support_type == 'direct' && (
							<Tag color="purple">Trực tiếp</Tag>
						)}
						{selectedRequestTask?.support_type == 'chat' && (
							<Tag color="orange">Chat</Tag>
						)}
					</Descriptions.Item>
					<Descriptions.Item label="Người Thực Hiện">
						{selectedRequestTask?.task?.assign_to?.full_name || 'Chưa có'}
					</Descriptions.Item>
					<Descriptions.Item label="Trạng thái">
						{selectedRequestTask?.status == 'assigned' && (
							<Tag color="cyan">Đã phân công</Tag>
						)}
						{selectedRequestTask?.status == 'completed' && (
							<Tag color="success">Hoàn thành</Tag>
						)}
						{selectedRequestTask?.status == 'pending' && (
							<Tag color="processing">Đang xử lý</Tag>
						)}
						{selectedRequestTask?.status == 'in_progress' && (
							<Tag color="processing">Đang xử lý</Tag>
						)}
						{selectedRequestTask?.status == 'pending_approval' && (
							<Tag color="orange">Đợi duyệt</Tag>
						)}
						{selectedRequestTask?.status == 'rejected' && (
							<Tag color="volcano">Chat</Tag>
						)}
					</Descriptions.Item>
				</Descriptions>
			)}
		</Modal>
	);
};
