import React, {useEffect, useState} from 'react';
import styles from './ManageLandTypePage.module.css';
import {Form, Input, Modal, message} from 'antd';
import {useDispatch} from 'react-redux';
import {updateLandType} from '../../redux/slices/landSlice';

export const ManageLandTypeUpdateModal = ({selectedLandType, handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const [loadingLandType, setLoadingLandType] = useState(false);

	const dispatch = useDispatch();

	const onFinish = (values) => {
		const formData = {
			landTypeId: selectedLandType.land_type_id,
			landTypeName: values.landTypeName,
			landTypeDescription: values.landTypeDescription,
		};
		console.log('Form data:', formData);

		setLoadingLandType(true);

		dispatch(updateLandType(formData))
			.then((response) => {
				console.log('Update land type response', response);
				setLoadingLandType(false);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 200) {
						if (response.payload.message === 'Land type name already exist') {
							message.error(`Loại đất đã tồn tại`);
						} else {
							message.error(`Cập nhật loại đất thất bại!`);
						}
					}

					if (response.payload.statusCode === 200) {
						message.success('Cập nhật loại đất thành công.');
						handleModalClose(true);
					}
				}
			})
			.catch((err) => {
				setLoadingLandType(false);
				message.error('Cập nhật loại đất thất bại');
				console.log('Cập nhật loại đất thất bại', err);
			});
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			form.setFieldValue('landTypeName', selectedLandType.name);
			form.setFieldValue('landTypeDescription', selectedLandType.description);
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật giống cây</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okButtonProps={{loading: loadingLandType}}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
			maskClosable={false}
		>
			{selectedLandType && (
				<Form
					form={form}
					name="UpdateLandType"
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
						label="Tên loại đất"
						name="landTypeName"
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
						label="Mô tả"
						name="landTypeDescription"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input.TextArea
							autoSize={{minRows: 4, maxRows: 8}}
							className={styles.inputField}
						/>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
