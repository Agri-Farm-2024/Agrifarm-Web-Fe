import React, {useEffect, useState} from 'react';
import styles from './ManagePlantPage.module.css';
import {Form, Input, Modal, Select, message} from 'antd';
import {useDispatch} from 'react-redux';
import {getLandType} from '../../redux/slices/landSlice';
import {updatePlant} from '../../redux/slices/plantSlice';

export const ManagePlantUpdateModal = ({selectedPlant, handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const [landTypeOtions, setLandTypeOptions] = useState([]);
	const [loadingLandType, setLoadingLandType] = useState(false);

	const onFinish = (values) => {
		const formData = {
			plantId: selectedPlant.plant_id,
			land_type_id: values.landType,
			name: values.plantName,
		};
		console.log('Success:', formData);

		dispatch(updatePlant(formData))
			.then((response) => {
				console.log('response', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 200) {
						if (response.payload.message === 'Plant name already exist') {
							message.error(`Giống cây đã tồn tại trên trang trại`);
						} else {
							message.error(`Cập nhật giống cây thất bại!`);
						}
					}

					if (response.payload.statusCode === 200) {
						message.success('Cập nhật giống cây thành công.');
						handleModalClose(true);
					}
				}
			})
			.catch((err) => {
				message.error('Cập nhật giống cây thất bại');
				console.log('Cập nhật giống cây thất bại', err);
			});
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			form.setFieldValue('plantName', selectedPlant.name);
			form.setFieldValue('landType', selectedPlant.land_type_id);
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
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật giống cây</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
			maskClosable={false}
		>
			{selectedPlant && (
				<Form
					form={form}
					name="UpdatePlant"
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
						label="Loại đất phù hợp"
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
							options={landTypeOtions || []}
						></Select>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
