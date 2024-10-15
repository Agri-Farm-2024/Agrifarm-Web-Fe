import React, {useEffect, useState} from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {DatePicker, Form, Input, InputNumber, Modal, Select} from 'antd';

const seasonTypeOptions = [
	{
		value: 'Mùa thuận',
		label: 'Mùa thuận',
	},
	{
		value: 'Mùa nghịch',
		label: 'Mùa nghịch',
	},
];

const plantTypeOptions = [
	{
		value: 'Dưa lưới',
		label: 'Dưa lưới',
	},
	{
		value: 'Dưa leo',
		label: 'Dưa leo',
	},
	{
		value: 'Dưa hấu',
		label: 'Dưa hấu',
	},
];
export const ManagePlantSeasonCreateModal = ({handleModalClose, isModalOpen}) => {
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
			title={<span style={{fontSize: '1.5rem'}}>Tạo mùa vụ</span>}
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
				name="CreatePlantSeason"
				labelCol={{
					span: 7,
				}}
				labelAlign="left"
				wrapperCol={{
					span: 17,
				}}
				size="large"
				className={styles.formContainer}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Tên mùa vụ"
					name="plantSeasonName"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<Input label="Tên mùa vụ" className={styles.inputField} />
				</Form.Item>
				<Form.Item
					label="Tháng bắt đầu"
					name="monthStart"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<DatePicker
						picker="month"
						placeholder="MM-YYYY"
						format={'MM-YYYY'}
						className={styles.inputField}
					/>
				</Form.Item>

				<Form.Item
					label="Loại cây"
					name="plantName"
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
						placeholder="Chọn loại cây"
						options={plantTypeOptions}
					></Select>
				</Form.Item>

				<Form.Item
					label="Đơn giá (VND/kg)"
					name="pricePurchasePerKg"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
						{
							type: 'number',
							min: 0,
							message: 'Giá không hợp lệ!',
						},
					]}
				>
					<InputNumber
						placeholder="Đơn giá"
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
						className={styles.inputField}
					/>
				</Form.Item>

				<Form.Item
					label="Giá quy trình theo mù vụ"
					name="priceProcess"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
						{
							type: 'number',
							min: 0,
							message: 'Giá không hợp lệ!',
						},
					]}
				>
					<InputNumber
						placeholder="Giá quy trình"
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
						className={styles.inputField}
					/>
				</Form.Item>

				<Form.Item
					label="Loại mùa vụ"
					name="seasonType"
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
						placeholder="Chọn loại mùa vụ"
						options={seasonTypeOptions}
					></Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
