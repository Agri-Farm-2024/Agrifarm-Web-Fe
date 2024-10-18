import React, {useEffect, useState} from 'react';
import styles from './ManagePlantPage.module.css';
import {Form, Input, InputNumber, Modal, Select, message} from 'antd';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {createPlant} from '../../redux/slices/plantSlice';
import {isLoadingPlant} from '../../redux/selectors';

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

	const loading = useSelector(isLoadingPlant);

	const dispatch = useDispatch();

	const onFinish = (values) => {
		console.log('Success:', values);

		const formData = {
			name: values.plantName,
			status: 'active',
		};

		dispatch(createPlant(formData))
			.then((response) => {
				console.log('response', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 201) {
						if (response.payload.message === 'Plant name already exist') {
							message.error(`Tên giống cây đã tồn tại trên trang trại`);
						}
					}

					if (response.payload.statusCode === 201) {
						message.success('Tạo giống cây thành công.');
						handleModalClose();
					}
				}
			})
			.catch((err) => {
				message.error('Tạo giống cây thất bại');
				console.log('Tạo giống cây thất bại', err);
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
			title={<span style={{fontSize: '1.5rem'}}>Tạo vật tư</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Tạo"
			cancelText="Đóng"
			centered
			width={800}
			okButtonProps={{loading: loading}}
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
			</Form>
		</Modal>
	);
};
