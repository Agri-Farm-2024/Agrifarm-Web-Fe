import React, {useEffect, useState} from 'react';
import styles from './ManageAccountPage.module.css';
import {Button, DatePicker, Form, Input, message, Modal, Select, Tooltip} from 'antd';
import dayjs from 'dayjs';
import {useDispatch} from 'react-redux';
import {createUser} from '../../redux/slices/userSlice';
import {toast} from 'react-toastify';

const roleOptions = [
	// {
	// 	value: 'manager',
	// 	label: 'Quản lý',
	// },
	{
		value: 2,
		label: 'Nhân viên',
	},
	{
		value: 3,
		label: 'Chuyên gia nông nghiệp',
	},
	{
		value: 4,
		label: 'Người thuê đất',
	},
];

export const ManageAccountCreateModal = ({handleModalClose, isModalOpen}) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	console.log('showModal');

	const onFinish = (values) => {
		console.log('Success:', values);
		const formUser = {
			email: values.email,
			password: 'password123',
			full_name: values.accountName,
			avatar_url: 'http://example.com/avatar.jpg',
			dob: values.dob,
			phone: values.phone,
			role: values.role,
		};
		const hideLoading = message.loading('Đang xử lý...', 0);

		dispatch(createUser(formUser))
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 201) {
					message.success('Tạo tài khoản thành công');
					setTimeout(() => {
						handleModalClose(true);
					}, 1000);
					form.resetFields();
					return;
				}
				if (res.payload.statusCode === 400) {
					if (res.payload.message === 'Email already exists') {
						message.error('Email này đã tồn tại');
					}
				}
			})
			.catch(() => {
				hideLoading();
				message.error('Có lỗi trong quá trình cập nhật');
			});
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Tạo tài khoản</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Tạo tài khoản"
			cancelText="Đóng"
			centered
			width={800}
		>
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
		</Modal>
	);
};
