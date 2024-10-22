import React, {useEffect, useState} from 'react';
import styles from './ManageServicePackagePage.module.css';
import {Form, Input, InputNumber, Modal, Radio, Select, message} from 'antd';
import {createServicePackage} from '../../redux/slices/serviceSlice';
import {useDispatch} from 'react-redux';

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

export const ManageServicePackageCreateModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const onFinish = (values) => {
		console.log('Success:', values);

		const formData = {
			name: values.servicePackageName,
			description: values.servicePackageDescription,
			process_of_plant: true,
			material: !!values.isMaterial, //convert to boolean
			purchase: !!values.isPurchase,
			price: values.price,
		};

		dispatch(createServicePackage(formData))
			.then((response) => {
				console.log('response', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 201) {
						if (response.payload.message === 'Service package already exists') {
							message.error(`Gói dịch vụ đã tồn tại`);
						}
					}

					if (response.payload.statusCode === 201) {
						message.success('Tạo gói dịch vụ thành công.');
						handleModalClose();
					}
				}
			})
			.catch((err) => {
				message.error('Tạo gói dịch vụ thất bại');
				console.log('Tạo gói dịch vụ thất bại', err);
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
			title={<span style={{fontSize: '1.5rem'}}>Tạo gói dịch vụ</span>}
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
				name="CreateServicePackage"
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
					<Input placeholder="Tên gói dịch vụ" className={styles.inputField} />
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

				<Form.Item label="Bao tiêu" name="isPurchase">
					<Radio.Group defaultValue={false} buttonStyle="solid">
						<Radio.Button value={true}>Có</Radio.Button>
						<Radio.Button value={false}>Không</Radio.Button>
					</Radio.Group>
				</Form.Item>

				<Form.Item label="Bao vật tư" name="isMaterial">
					<Radio.Group defaultValue={false} buttonStyle="solid">
						<Radio.Button value={true}>Có</Radio.Button>
						<Radio.Button value={false}>Không</Radio.Button>
					</Radio.Group>
				</Form.Item>

				{/* <Form.Item
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
				</Form.Item> */}

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
		</Modal>
	);
};
