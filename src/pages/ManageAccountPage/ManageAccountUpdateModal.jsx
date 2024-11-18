import React, {useEffect, useState} from 'react';
import styles from './ManageAccountPage.module.css';
import {Button, DatePicker, Form, Input, Modal, Select, Tooltip} from 'antd';
import dayjs from 'dayjs';

const roleOptions = [
	{
		value: 'manager',
		label: 'Quản lý',
	},
	{
		value: 'staff',
		label: 'Nhân viên',
	},
	{
		value: 'expert',
		label: 'Chuyên gia nông nghiệp',
	},
	{
		value: 'landRenter',
		label: 'Người thuê đất',
	},
];

export const ManageAccountUpdateModal = ({selectedAccount, handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();
	console.log('showModal');

	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		if (isModalOpen) {
			console.log('Showing modal: ' + selectedAccount);
			form.resetFields();
			form.setFieldValue('accountName', selectedAccount.full_name);
			form.setFieldValue('dob', dayjs(selectedAccount.dob, 'DD-MM-YYYY'));
			form.setFieldValue('email', selectedAccount.email);
			form.setFieldValue('phone', selectedAccount.phone);
			form.setFieldValue('role', selectedAccount.role);
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật thông tin tài khoản</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
		>
			{selectedAccount && (
				<Form
					form={form}
					name="UpdateAccount"
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
						label="Họ và tên"
						name="accountName"
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
						label="Vai trò"
						name="role"
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
							placeholder="Chọn vai trò"
							options={roleOptions}
						></Select>
					</Form.Item>

					<Form.Item
						label="Ngày sinh"
						name="dob"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							({getFieldValue}) => ({
								validator(_, value) {
									if (!value || value.isBefore(new Date(), 'day')) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error('Ngày sinh phải nhỏ hơn ngày hiện tại!')
									);
								},
							}),
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
						name="phone"
						label="Số điện thoại"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								pattern: /^0[0-9]{9}$/,
								message: 'Số điện thoại không hợp lệ!',
							},
						]}
					>
						<Input className={styles.inputField} />
					</Form.Item>

					<Form.Item
						name="address"
						label="Địa chỉ"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input className={styles.inputField} />
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
