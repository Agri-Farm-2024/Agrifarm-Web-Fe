import {Form, Input, Modal, message} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styles from './ManageStandardProcessPage.module.css';
import {toast} from 'react-toastify';
import {confirmProcess} from '../../redux/slices/processSlice';

export const RejectStandardProcessModal = ({selectedProcess, handleModalClose, isModalOpen}) => {
	const [form] = useForm();

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	});

	const dispatch = useDispatch();

	const onFinish = (values) => {
		console.log('Submit reject:', values);
		console.log('Process ID:', selectedProcess.process_technical_standard_id);
		try {
			const formData = {
				rejectReason: values.rejectReason || 'Quy trình cần điều chỉnh',
				processId: selectedProcess.process_technical_standard_id,
			};
			toast.loading('Đang đăng nhập...', {autoClose: false});
			dispatch(confirmProcess(formData)).then((response) => {
				console.log('Approve process reponse: ' + response);
				if (response.payload && response.payload.statusCode) {
					toast.dismiss(); // Remove the loading message
					//Catch Error message
					if (response.payload.statusCode !== 200) {
						message.error('Từ chối quy trình thất bại');
						console.log('Approve process failed!');
					}

					if (response.payload.statusCode === 200) {
						message.success('Từ chối quy trình thành công');
						handleModalClose(true);
					}
				}
			});
		} catch (error) {
			console.log('Error confirm process', error);
			toast.dismiss(); // Remove the loading message
			message.error('Từ chối quy trình thất bại');
		}
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
				name="RejectStandardProcess"
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
					label="Lý do từ chối"
					name="rejectReason"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<Input.TextArea autoSize={{minRows: 2, maxRows: 6}} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
