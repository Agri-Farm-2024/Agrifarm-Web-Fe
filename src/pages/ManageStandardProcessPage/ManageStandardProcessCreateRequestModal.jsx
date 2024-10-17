import {Form, Modal, Select} from 'antd';
import React, {useEffect} from 'react';
import styles from './ManageStandardProcessPage.module.css';

const expertOptions = [
	{
		value: 'Nguyen Van A',
		label: 'Nguyen Van A',
	},
	{
		value: 'Nguyen Van B',
		label: 'Nguyen Van B',
	},
	{
		value: 'Nguyen Van C',
		label: 'Nguyen Van C',
	},
	{
		value: 'Nguyen Van D',
		label: 'Nguyen Van D',
	},
];

const plantNameOptions = [
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
	{
		value: 'Cây ớt',
		label: 'Cây ớt',
	},
];

export const ManageStandardProcessCreateRequestModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	}, [isModalOpen]);

	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Yêu cầu tạo quy trình canh tác chuẩn</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Gửi"
			cancelText="Huỷ"
			centered
			width={800}
		>
			<Form
				form={form}
				name="CreateStandardProcessRequest"
				labelCol={{
					span: 8,
				}}
				labelAlign="left"
				wrapperCol={{
					span: 16,
				}}
				size="large"
				className={styles.formCreateContainer}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Giống cây"
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
						placeholder="Chọn giống cây"
						options={plantNameOptions}
					></Select>
				</Form.Item>
				<Form.Item
					label="Nhân viên phụ trách"
					name="expertResponsible"
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
						placeholder="Chọn nhân viên"
						options={expertOptions}
					></Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
