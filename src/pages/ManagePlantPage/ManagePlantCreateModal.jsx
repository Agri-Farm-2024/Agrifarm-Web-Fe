import React, {useEffect, useState} from 'react';
import styles from './ManagePlantPage.module.css';
import {Form, Input, Modal, Select, message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {createPlant} from '../../redux/slices/plantSlice';
import {isLoadingPlant} from '../../redux/selectors';
import {getLandType} from '../../redux/slices/landSlice';

export const ManagePlantCreateModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const loading = useSelector(isLoadingPlant);

	const [landTypeOptions, setLandTypeOptions] = useState(null);
	const [loadingLandType, setLoadingLandType] = useState(false);

	const dispatch = useDispatch();

	const onFinish = (values) => {
		console.log('Success:', values);

		const formData = {
			name: values.plantName,
			land_type_id: values.landType,
		};

		dispatch(createPlant(formData))
			.then((response) => {
				console.log('response', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 201) {
						if (response.payload.message === 'Plant name already exist') {
							message.error(`Giống cây đã tồn tại trên trang trại`);
						} else {
							message.error(`Tạo giống cây thất bại!`);
						}
					}

					if (response.payload.statusCode === 201) {
						message.success('Tạo giống cây thành công.');
						handleModalClose(true);
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
			setLoadingLandType(true);
			dispatch(getLandType())
				.then((response) => {
					console.log('getLandType response:', response);
					if (response.payload.statusCode === 200) {
						const optionData = response.payload.metadata.map((landType) => ({
							label: landType.name,
							value: landType.land_type_id,
						}));
						setLandTypeOptions(optionData);
						setLoadingLandType(false);
					}
				})
				.catch((error) => {
					console.log('getLandType error', error);
					setLoadingLandType(false);
				});
		}
	}, [isModalOpen]);

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Tạo giống cây</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Tạo"
			cancelText="Đóng"
			centered
			width={800}
			okButtonProps={{loading: loading}}
			maskClosable={false}
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
					label="Loại đất"
					name="landType"
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
						placeholder="Chọn loại đất"
						options={landTypeOptions}
					></Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
