import React, {useState} from 'react';
import {Button, Modal, Input, Select, DatePicker, message} from 'antd';
import styles from './TaskManagementPage.module.css';

const {Option} = Select;

export const TaskManagementAssignModal = ({selectedRequestTask, handleModalClose, isModalOpen}) => {
	console.log(selectedRequestTask);

	const [category, setCategory] = useState(selectedRequestTask?.Category || 'Hỗ trợ canh tác');
	const [priority, setPriority] = useState(selectedRequestTask?.Priority || 'Trung bình');
	const [assignee, setAssignee] = useState(selectedRequestTask?.Assign || 'Bá Phước');
	const [deadline, setDeadline] = useState(null);

	const handleCategoryChange = (value) => setCategory(value);
	const handlePriorityChange = (value) => setPriority(value);
	const handleAssigneeChange = (value) => setAssignee(value);
	const handleDeadlineChange = (date, dateString) => setDeadline(dateString);

	const handleAssign = (value) => {
		handleModalClose();
		message.success('Đã phân công nhiệm vụ');
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Phân công công việc</span>}
			open={isModalOpen}
			onOk={handleAssign}
			onCancel={handleModalClose}
			style={{top: 20}}
			cancelText="Hủy"
			okText="Phân công"
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
						<Select value={category} onChange={handleCategoryChange}>
							<Option value="Hỗ trợ kĩ thuật">Hỗ trợ kĩ thuật</Option>
							<Option value="Hỗ trọ canh tác">Hỗ trọ canh tác</Option>
						</Select>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Mức độ ưu tiên:</p>
						<Select value={priority} onChange={handlePriorityChange}>
							<Option value="Cao">Cao</Option>
							<Option value="Trung bình">Trung bình</Option>
							<Option value="Thấp">Thấp</Option>
						</Select>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Người được giao:</p>
						<Select value={assignee} onChange={handleAssigneeChange}>
							<Option value="Bá Phước">Bá Phước</Option>
							<Option value="Đăng Ninh">Đăng Ninh</Option>
							<Option value="Tiến Dũng">Tiến Dũng</Option>
						</Select>
					</div>
					<div className={styles.bookingItem}>
						<p className={styles.title}>Hạn chót:</p>
						<DatePicker onChange={handleDeadlineChange} />
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
