import React, {useEffect, useState} from 'react';
import styles from './ManageServicePackagePage.module.css';
import {Form, Input, InputNumber, Modal, Radio, Select, message} from 'antd';
import {useDispatch} from 'react-redux';
import {updateServicePackage} from '../../redux/slices/serviceSlice';

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
	const dispatch = useDispatch();

	const onFinish = (values) => {
		try {
			console.log('Success:', values);
			const formData = {
				name: values.servicePackageName,
				description: values.servicePackageDescription,
				process_of_plant: true,
				material: values.isMaterial,
				purchase: values.isPurchase,
				price: values.price,
				status: 'active',
			};

			const params = {
				formData: formData,
				service_package_id: selectedServicePackage?.service_package_id,
			};

			dispatch(updateServicePackage(params)).then((response) => {
				console.log('update service package response', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 200) {
						if (response.payload.message === 'Service package already exists') {
							message.error(`Gói dịch vụ đã tồn tại`);
						}
					}

					if (response.payload.statusCode === 200) {
						message.success('Cập nhật gói dịch vụ thành công.');
						handleModalClose(true);
					}
				}
			});
		} catch (error) {
			message.error('Cập nhật gói dịch vụ thất bại');
			console.log('Error update service package', error);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		if (isModalOpen) {
			console.log('Selected service', selectedServicePackage);
			form.resetFields();
			form.setFieldValue('servicePackageName', selectedServicePackage.name);
			form.setFieldValue('servicePackageDescription', selectedServicePackage.description);
			form.setFieldValue('isPurchase', selectedServicePackage.purchase);
			form.setFieldValue('isMaterial', selectedServicePackage.material);
			// form.setFieldValue('status', selectedServicePackage.status);
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
			)}
		</Modal>
	);
};
