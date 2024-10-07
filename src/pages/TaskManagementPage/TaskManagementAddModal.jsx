import React, {useState} from 'react';
import {Button, Modal, Input, Select, DatePicker, message} from 'antd';
import styles from './TaskManagementPage.module.css';

const {Option} = Select;

export const TaskManagementAddModal = ({isModalOpen, handleModalClose, handleAddTask}) => {
	const [taskID, setTaskID] = useState('');
	const [landID, setLandID] = useState('MD001');
	const [category, setCategory] = useState('Hỗ trợ kĩ thuật');
	const [content, setContent] = useState('');
	const [priority, setPriority] = useState('Trung bình');
	const [assignee, setAssignee] = useState('Bá Phước');
	const [deadline, setDeadline] = useState(null);

	const handleLandIDChange = (value) => setLandID(value);
	const handleCategoryChange = (value) => setCategory(value);
	const handleContentChange = (e) => setContent(e.target.value);
	const handlePriorityChange = (value) => setPriority(value);
	const handleAssigneeChange = (value) => setAssignee(value);
	const handleDeadlineChange = (date, dateString) => setDeadline(dateString);

	const handleSubmit = () => {
		const newTask = {
			IDTask: taskID,
			IDLand: landID,
			Category: category,
			Content: content,
			Priority: priority,
			Assign: assignee,
			Deadline: deadline,
			status: 'Chờ xử lý', // Default status for new tasks
		};
		handleAddTask(newTask); // Function to add the new task (provided via props)
		handleModalClose(); // Close the modal after adding the task
		message.success('Thêm nhiệm thành công');
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thêm công việc mới</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={handleSubmit}
			okText="Thêm"
			cancelText="Hủy"
			style={{top: 20}}
		>
			<div className={styles.modalContainer}>
				<div className={styles.bookingItem}>
					<p className={styles.title}>ID đất:</p>
					<Select value={landID} onChange={handleLandIDChange}>
						<Option value="MD001">MD001</Option>
						<Option value="MD002">MD002</Option>
					</Select>
				</div>
				<div className={styles.bookingItem}>
					<p className={styles.title}>Loại công việc:</p>
					<Select value={category} onChange={handleCategoryChange}>
						<Option value="Hỗ trợ kĩ thuật">Hỗ trợ kĩ thuật</Option>
						<Option value="Hỗ trợ canh tác">Hỗ trợ canh tác</Option>
					</Select>
				</div>
				<div className={styles.bookingItem}>
					<p className={styles.title}>Nội dung:</p>
					<Input
						style={{width: '40%'}}
						value={content}
						onChange={handleContentChange}
						placeholder="Nhập nội dung công việc"
					/>
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
			</div>
		</Modal>
	);
};
