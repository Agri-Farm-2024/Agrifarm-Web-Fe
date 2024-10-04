import React from 'react';
import styles from './ManageEmployeesPage.module.css';
import {Modal} from 'antd';

export const ManageEmployeesDetailModal = ({selectedEmployee, handleModalClose, isModalOpen}) => {
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin nhân viên</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
		>
			{selectedEmployee && (
				<div className={styles.modalContainer}>
					<div className={styles.bookingItem}>
						<p className={styles.title}>ID nhân viên:</p>
						<p className={styles.content}>{selectedEmployee.employeeId}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày sinh:</p>
						<p className={styles.content}>{selectedEmployee.dob}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Ngày bắt đầu:</p>
						<p className={styles.content}>{selectedEmployee.dateStart}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Email:</p>
						<p className={styles.content}>{selectedEmployee.email}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Trạng thái: </p>
						<p className={styles.content}>{selectedEmployee.status}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Số nhiệm vụ đã giao:</p>
						<p className={styles.content}>{selectedEmployee.doingTaskNumber}</p>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Số nhiệm vụ đã hoàn thành:</p>
						<p className={styles.content}>{selectedEmployee.doneTaskNumber}</p>
					</div>
					{selectedEmployee.landManage.length > 0 && (
						<div className={styles.bookingItem} style={{alignItems: 'flex-start'}}>
							<p className={styles.title}>Quản lý mảnh đất:</p>
							<ul>
								{selectedEmployee.landManage.map((land, index) => (
									<li key={index}>{land}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</Modal>
	);
};
