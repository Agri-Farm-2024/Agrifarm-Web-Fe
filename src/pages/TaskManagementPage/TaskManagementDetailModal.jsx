import React from 'react';
import styles from './TaskManagementPage.module.css';
import {Button, Modal} from 'antd';
import {formatDate} from '../../utils';

export const TaskManagementDetailModal = ({selectedRequestTask, handleModalClose, isModalOpen}) => {
	const detailItems = selectedRequestTask && [
		{
			key: 'request_id',
			label: 'ID yêu cầu',
			children: <p>{selectedRequestTask.request_id}</p>,
		},
		{
			key: 'type',
			label: 'Loại yêu cầu',
			children: (
				<>
					{selectedRequestTask.type == 'product_purchase' && (
						<Tag color="geekblue">Thu mua</Tag>
					)}
					{selectedRequestTask.type == 'product_puchase_harvest' && (
						<Tag color="success">Thu hoạch</Tag>
					)}
					{selectedRequestTask.type == 'cultivate_process_content' && (
						<Tag color="lime">Ghi nhật ký</Tag>
					)}
					{selectedRequestTask.type == 'technical_support' && (
						<Tag color="volcano">Hỗ trợ kỹ thuật</Tag>
					)}
					{selectedRequestTask.type == 'create_process_standard' && (
						<Tag color="cyan">Tạo quy trình chuẩn</Tag>
					)}
					{selectedRequestTask.type == 'material_process_specfic_stage' && (
						<Tag color="pink">Cung cấp vật tư</Tag>
					)}
				</>
			),
		},
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{formatDate(selectedRequestTask.created_at)}</p>,
		},
		{
			key: 'support_type',
			label: 'Loại yêu cầu',
			children: (
				<>
					{selectedRequestTask.support_type == 'direct' && (
						<Tag color="purple">Trực tiếp</Tag>
					)}
					{selectedRequestTask.support_type == 'chat' && <Tag color="orange">Chat</Tag>}
				</>
			),
		},
	];

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết yêu cầu công việc</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			cancelText="Hủy"
		>
			{selectedRequestTask && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID công việc:</p>
						<p className={styles.content}>{selectedRequestTask.IDTask}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID đất:</p>
						<p className={styles.content}>{selectedRequestTask.IDLand}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Loại công việc:</p>
						<p className={styles.content}>{selectedRequestTask.Category}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Nội dung:</p>
						<p className={styles.content}>{selectedRequestTask.Content}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Mức độ ưu tiên:</p>
						<p className={styles.content}>{selectedRequestTask.Priority}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Người được giao:</p>
						<p className={styles.content}>{selectedRequestTask.Assign}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedRequestTask.status}</p>
					</div>
				</div>
			)}
		</Modal>
	);
};
