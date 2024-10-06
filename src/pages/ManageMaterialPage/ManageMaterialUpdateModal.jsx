import React, {useEffect, useState} from 'react';
import styles from './ManageMaterialPage.module.css';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import dayjs from 'dayjs';

const statusOptions = [
	{
		value: 'Có sẵn',
		label: 'Có sẵn',
	},
	{
		value: 'Sắp hết',
		label: 'Sắp hết',
	},
	{
		value: 'Hết hàng',
		label: 'Hết hàng',
	},
];

const materialTypeOptions = [
	{
		value: 'Hạt giống',
		label: 'Hạt giống',
	},
	{
		value: 'Thuốc BVTV',
		label: 'Thuốc BVTV',
	},
	{
		value: 'Phân bón',
		label: 'Phân bón',
	},
	{
		value: 'Vật tư',
		label: 'Vật tư',
	},
	{
		value: 'Thiết bị',
		label: 'Thiết bị',
	},
];

const materialMeasureOptions = [
	{
		value: 'Túi',
		label: 'Túi',
	},
	{
		value: 'Bao',
		label: 'Bao',
	},
	{
		value: 'Chai',
		label: 'Chai',
	},
	{
		value: 'Cái',
		label: 'Cái',
	},
	{
		value: 'Cuộn',
		label: 'Cuộn',
	},
];

export const ManageMaterialUpdateModal = ({selectedMaterial, handleModalClose, isModalOpen}) => {
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
			form.setFieldValue('materialId', selectedMaterial.materialId);
			form.setFieldValue('materialName', selectedMaterial.materialName);
			form.setFieldValue('materialType', selectedMaterial.materialType);
			form.setFieldValue('materialMeasure', selectedMaterial.materialMeasure);
			form.setFieldValue('quantity', selectedMaterial.quantity);
			form.setFieldValue('status', selectedMaterial.status);
			form.setFieldValue('materialDescription', selectedMaterial.materialDescription);
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật vật tư</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
		>
			{selectedMaterial && (
				<Form
					form={form}
					name="UpdateMaterial"
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
						label="ID vật tư"
						name="materialId"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input disabled className={styles.inputField} />
					</Form.Item>
					<Form.Item
						label="Tên vật tư"
						name="materialName"
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
						label="Loại vật tư"
						name="materialType"
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
							placeholder="Chọn loại vật tư"
							options={materialTypeOptions}
						></Select>
					</Form.Item>

					<Form.Item
						label="Đơn vị tính"
						name="materialMeasure"
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
							placeholder="Chọn đơn vị tính"
							options={materialMeasureOptions}
						></Select>
					</Form.Item>

					<Form.Item
						label="Số lượng"
						name="quantity"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								type: 'integer',
								message: 'Số lượng không hợp lệ!',
							},
							{
								type: 'number',
								min: 0,
								message: 'Số lượng không hợp lệ!',
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
						label="Mô tả"
						name="materialDescription"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input.TextArea
							autoSize={{minRows: 2, maxRows: 6}}
							className={styles.inputField}
						/>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
