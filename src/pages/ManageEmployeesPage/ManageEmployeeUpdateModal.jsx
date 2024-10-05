import React, {useEffect, useState} from 'react';
import styles from './ManageEmployeesPage.module.css';
import {Button, DatePicker, Form, Input, Modal, Select, Tooltip} from 'antd';
import dayjs from 'dayjs';

const statusOptions = [
	{
		value: 'Đang làm',
		label: 'Đang làm',
	},
	{
		value: 'Nghỉ việc',
		label: 'Nghỉ việc',
	},
];

const landOptions = [
	{
		value: 'Mảnh đất số 1',
		label: 'Mảnh đất số 1',
	},
	{
		value: 'Mảnh đất số 2',
		label: 'Mảnh đất số 2',
	},
	{
		value: 'Mảnh đất số 3',
		label: 'Mảnh đất số 3',
	},
	{
		value: 'Mảnh đất số 4',
		label: 'Mảnh đất số 4',
	},
	{
		value: 'Mảnh đất số 5',
		label: 'Mảnh đất số 5',
	},
	{
		value: 'Mảnh đất số 6',
		label: 'Mảnh đất số 6',
	},
	{
		value: 'Mảnh đất số 7',
		label: 'Mảnh đất số 7',
	},
];

export const ManageEmployeeUpdateModal = ({selectedEmployee, handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		if (isModalOpen) {
			form.setFieldValue('employeeName', selectedEmployee.employeeName);
			form.setFieldValue('dob', dayjs(selectedEmployee.dob, 'DD-MM-YYYY'));
			form.setFieldValue('dateStart', dayjs(selectedEmployee.dateStart, 'DD-MM-YYYY'));
			form.setFieldValue('email', selectedEmployee.email);
			form.setFieldValue('status', selectedEmployee.status);
			form.setFieldValue('landManage', selectedEmployee.landManage);
		}
	}, [isModalOpen]);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật thông tin nhân viên</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
		>
			{selectedEmployee && (
				<Form
					form={form}
					name="UpdateEmployee"
					labelCol={{
						span: 5,
					}}
					labelAlign="left"
					wrapperCol={{
						span: 19,
					}}
					size="large"
					className={styles.formContainer}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Tên nhân viên"
						name="employeeName"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input className={styles.inputField} />
					</Form.Item>
					<Form.Item
						label="Ngày sinh"
						name="dob"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<DatePicker
							placeholder="DD-MM-YYYY"
							format={'DD-MM-YYYY'}
							className={styles.inputField}
							// maxDate={new Date().toISOString()}
						/>
					</Form.Item>

					<Form.Item
						label="Ngày bắt đầu làm"
						name="dateStart"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<DatePicker className={styles.inputField} />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								type: 'email',
								message: 'Email không hợp lệ!',
							},
						]}
					>
						<Input className={styles.inputField} />
					</Form.Item>

					<Form.Item
						label="Trạng thái"
						name="status"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Select
							className={styles.inputField}
							allowClear
							placeholder="Chọn trạng thái"
							options={statusOptions}
						></Select>
					</Form.Item>

					<Form.Item
						label="Quản lý mảnh đất"
						name="landManage"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Select
							allowClear
							className={styles.inputField}
							placeholder="Chọn mảnh đất"
							options={landOptions}
							mode="multiple"
							maxTagCount="responsive"
							maxTagPlaceholder={(omittedValues) => (
								<Tooltip
									overlayStyle={{
										pointerEvents: 'none',
									}}
									title={omittedValues.map(({label}) => label).join(', ')}
								>
									<span>More...</span>
								</Tooltip>
							)}
						></Select>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
