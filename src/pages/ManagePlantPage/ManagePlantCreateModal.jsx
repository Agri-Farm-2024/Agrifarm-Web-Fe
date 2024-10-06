import React, {useEffect, useState} from 'react';
import styles from './ManagePlantPage.module.css';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import dayjs from 'dayjs';

const statusOptions = [
	{
		value: 'Đang hỗ trợ',
		label: 'Đang hỗ trợ',
	},
	{
		value: 'Tạm ngưng',
		label: 'Tạm ngưng',
	},
	{
		value: 'Ngừng hỗ trợ',
		label: 'Ngừng hỗ trợ',
	},
];

const processOptions = [
	{
		value: 'Quy trình trồng dưa lưới tháng 3',
		label: 'Quy trình trồng dưa lưới tháng 3',
	},
	{
		value: 'Quy trình trồng dưa lưới tháng 6',
		label: 'Quy trình trồng dưa lưới tháng 6',
	},
	{
		value: 'Quy trình trồng dưa lưới tháng 9',
		label: 'Quy trình trồng dưa lưới tháng 9',
	},
];

const plantTypeOptions = [
	{
		value: 'Rau ăn quả',
		label: 'Rau ăn quả',
	},
	{
		value: 'Rau ăn củ',
		label: 'Rau ăn củ',
	},
	{
		value: 'Rau ăn lá',
		label: 'Rau ăn lá',
	},
	{
		value: 'Cây ăn quả',
		label: 'Cây ăn quả',
	},
];

export const ManagePlantCreateModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Success:', values);
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
			title={<span style={{fontSize: '1.5rem'}}>Tạo vật tư</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Tạo"
			cancelText="Đóng"
			centered
			width={800}
		>
			<Form
				form={form}
				name="CreatePlant"
				labelCol={{
					span: 8,
				}}
				labelAlign="left"
				wrapperCol={{
					span: 16,
				}}
				size="large"
				className={styles.formContainer}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Tên giống cây"
					name="plantName"
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
					label="Loại giống cây"
					name="plantType"
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
						placeholder="Chọn loại giống cây"
						options={plantTypeOptions}
					></Select>
				</Form.Item>

				<Form.Item
					label="Thời gian sinh trưởng (ngày)"
					name="growthTime"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
						{
							min: 0,
							message: 'Thời gian sinh trưởng không hợp lệ!',
						},
					]}
				>
					<InputNumber
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
						className={styles.inputField}
					/>
				</Form.Item>

				<Form.Item
					label="Năng suất trung bình (kg/m2)"
					name="averageYield"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
						{
							min: 0,
							message: 'Năng suất trung bình không hợp lệ!',
						},
					]}
				>
					<InputNumber
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
						className={styles.inputField}
					/>
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
					label="Quy trình"
					name="process"
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
						placeholder="Chọn quy trình"
						options={processOptions}
					></Select>
				</Form.Item>

				<Form.Item
					label="Giá thu mua (VND/kg)"
					name="purchasedPrice"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
						{
							min: 0,
							message: 'Giá thu mua không hợp lệ!',
						},
					]}
				>
					<InputNumber
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
						className={styles.inputField}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};
