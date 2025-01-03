import React, {useEffect, useState} from 'react';
import styles from './ManageLandTypePage.module.css';
import {Form, Input, Modal, message} from 'antd';
import {useDispatch} from 'react-redux';
import {createLandType} from '../../redux/slices/landSlice';

export const ManageLandTypeCreateModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const [loadingLandType, setLoadingLandType] = useState(false);

	const dispatch = useDispatch();

	const onFinish = (values) => {
		console.log('Create land type submit:', values);

		const formData = {
			landTypeName: values.landTypeName,
			landTypeDescription: values.landTypeDescription,
		};

		setLoadingLandType(true);
		dispatch(createLandType(formData))
			.then((response) => {
				console.log('response', response);
				setLoadingLandType(false);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 201) {
						if (response.payload?.message === 'Land type already exist') {
							message.error(`Loại đất đã tồn tại!`);
						} else {
							message.error(`Tạo loại đất thất bại!`);
						}
					}

					if (response.payload.statusCode === 201) {
						message.success('Tạo loại đất thành công.');
						handleModalClose(true);
					}
				}
			})
			.catch((err) => {
				setLoadingLandType(false);
				message.error('Tạo loại đất thất bại');
				console.log('Tạo loại đất thất bại', err);
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
			title={<span style={{fontSize: '1.5rem'}}>Tạo loại đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okButtonProps={{loading: loadingLandType}}
			okText="Tạo"
			cancelText="Đóng"
			centered
			width={800}
			maskClosable={false}
		>
			{
				<Form
					form={form}
					name="CreateLandType"
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
			}
		</Modal>
	);
};
