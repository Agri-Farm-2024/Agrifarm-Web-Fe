import React from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {Modal} from 'antd';
import {formatNumber} from '../../utils';

export const ManageStandardProcessDetailModal = ({
	selectedProcess,
	handleModalClose,
	isModalOpen,
}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin quy trình</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={1000}
		>
			{selectedProcess && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID quy trình:</p>
						<p className={styles.content}>{selectedProcess.processId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Tên quy trình:</p>
						<p className={styles.content}>{selectedProcess.processName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Giống cây:</p>
						<p className={styles.content}>{selectedProcess.plantName}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày tạo:</p>
						<p className={styles.content}>{selectedProcess.createAt}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày cập nhật gần nhất: </p>
						<p className={styles.content}>{selectedProcess.updateAt}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Người chịu trách nhiệm:</p>
						<p className={styles.content}>{selectedProcess.expertResponsible}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Số ngày dự tính:</p>
						<p className={styles.content}>
							{formatNumber(selectedProcess.expectedTime)} ngày
						</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái:</p>
						<p className={styles.content}>{selectedProcess.status}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Các giai đoạn chính:</p>
					</div>
					<div className={styles.bookingItem} style={{paddingLeft: 10}}>
						<p className={styles.title}>Chuẩn bị trước khi trồng:</p>
					</div>
					{selectedProcess.processContent &&
						selectedProcess.processContent.preparePlanting.length > 0 &&
						selectedProcess.processContent.preparePlanting.map((prepareItem, index) => (
							<div style={{paddingLeft: 20}} className={styles.bookingItem}>
								<p className={styles.title}>
									{`${index + 1}. ${prepareItem.prepareTitle}`}
								</p>
								<p className={styles.content}>{prepareItem.prepareContent}</p>
							</div>
						))}

					<div className={styles.bookingItem} style={{paddingLeft: 10}}>
						<p className={styles.title}>Kế hoạch trồng trọt cụ thể:</p>
					</div>
					{selectedProcess.processContent &&
						selectedProcess.processContent.plantingSchedule &&
						selectedProcess.processContent.plantingSchedule.length > 0 &&
						selectedProcess.processContent.plantingSchedule.map((plan, index) => (
							<>
								<div className={styles.bookingItem} style={{paddingLeft: 20}}>
									<p className={styles.title} style={{width: '70%'}}>
										{`Ngày ${plan.dayFrom == plan.dayTo ? plan.dayFrom : `${plan.dayFrom} đến ngày ${plan.dayTo}`} - Giai đoạn ${index + 1}: ${plan.stageTitle}`}
									</p>
								</div>
								{plan.actions &&
									plan.actions.length > 0 &&
									plan.actions.map((action, index) => (
										<div
											style={{paddingLeft: 40}}
											className={styles.bookingItem}
										>
											<p className={styles.title}>
												{`Ngày ${action.dayFrom == action.dayTo ? action.dayFrom : `${action.dayFrom} - ngày ${action.dayTo}`}: ${action.actionTitle}`}
											</p>
											<p className={styles.content}>
												{action.actionDescription}
											</p>
										</div>
									))}
							</>
						))}
				</div>
			)}
		</Modal>
	);
};
