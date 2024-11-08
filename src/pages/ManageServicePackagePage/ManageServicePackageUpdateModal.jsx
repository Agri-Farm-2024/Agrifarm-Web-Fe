import React, {useEffect, useState} from 'react';
import styles from './ManageServicePackagePage.module.css';
import {Form, Input, InputNumber, Modal, Radio, Select} from 'antd';

const statusOptions = [
	{
		value: 'Đang áp dụng',
		label: 'Đang áp dụng',
	},
	{
		value: 'Ngừng áp dụng',
		label: 'Ngừng áp dụng',
	},
	{
		value: 'Chưa bắt đầu',
		label: 'Chưa bắt đầu',
	},
];

export const ManageServicePackageUpdateModal = ({
	selectedServicePackage,
	handleModalClose,
	isModalOpen,
}) => {
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
			form.setFieldValue('servicePackageName', selectedServicePackage.servicePackageName);
			form.setFieldValue(
				'servicePackageDescription',
				selectedServicePackage.servicePackageDescription
			);
			form.setFieldValue('isPurchase', selectedServicePackage.isPurchase);
			form.setFieldValue('isMaterial', selectedServicePackage.isMaterial);
			form.setFieldValue('status', selectedServicePackage.status);
			form.setFieldValue('price', selectedServicePackage.price);
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật gói dịch vụ</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
		>
			{selectedServicePackage && (
				<Form
					form={form}
					name="UpdateServicePackage"
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
						label="Tên gói dịch vụ"
						name="servicePackageName"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input label="Tên gói dịch vụ" className={styles.inputField} />
					</Form.Item>
					<Form.Item
						label="Mô tả"
						name="servicePackageDescription"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input.TextArea
							autoSize={{minRows: 4, maxRows: 8}}
							placeholder="Mô tả"
							className={styles.inputField}
						/>
					</Form.Item>

					<Form.Item
						label="Bao tiêu"
						name="isPurchase"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Radio.Group defaultValue={false} buttonStyle="solid">
							<Radio.Button value={true}>Có</Radio.Button>
							<Radio.Button value={false}>Không</Radio.Button>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						label="Bao vật tư"
						name="isMaterial"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Radio.Group defaultValue={false} buttonStyle="solid">
							<Radio.Button value={true}>Có</Radio.Button>
							<Radio.Button value={false}>Không</Radio.Button>
						</Radio.Group>
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
						label="Giá gói dịch vụ (VND)"
						name="price"
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
							placeholder="Giá gói dịch vụ"
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							className={styles.inputField}
						/>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
