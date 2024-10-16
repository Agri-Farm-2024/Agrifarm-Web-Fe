import React, {useEffect, useState} from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space} from 'antd';
import dayjs from 'dayjs';
import {DeleteOutlined} from '@ant-design/icons';
import {ProcessPlanComponent} from './ProcessPlanComponent';

const statusOptions = [
	{
		value: 'Có thể sử dụng',
		label: 'Có thể sử dụng',
	},
	{
		value: 'Chờ phê duyệt',
		label: 'Chờ phê duyệt',
	},
	{
		value: 'Ngưng sử dụng',
		label: 'Ngưng sử dụng',
	},
];

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

export const ManageStandardProcessUpdateModal = ({
	selectedProcess,
	handleModalClose,
	isModalOpen,
}) => {
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
			form.setFieldValue('processId', selectedProcess.processId);
			form.setFieldValue('processName', selectedProcess.processName);
			form.setFieldValue('plantName', selectedProcess.plantName);
			form.setFieldValue('createAt', dayjs(selectedProcess.createAt, 'DD-MM-YYYY'));
			form.setFieldValue('updateAt', dayjs(selectedProcess.updateAt, 'DD-MM-YYYY'));
			form.setFieldValue('expertResponsible', selectedProcess.expertResponsible);
			form.setFieldValue('status', selectedProcess.status);
			form.setFieldValue('expectedTime', selectedProcess.expectedTime);
			form.setFieldValue('preparePlanting', selectedProcess.processContent.preparePlanting);
			form.setFieldValue('plantingSchedule', selectedProcess.processContent.plantingSchedule);
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật quy trình canh tác chuẩn</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={1000}
		>
			{selectedProcess && (
				<Form
					form={form}
					name="UpdateStandardProcess"
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
						label="ID quy trình"
						name="processId"
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
						label="Tên quy trình"
						name="processName"
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
						label="Ngày tạo"
						name="createAt"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<DatePicker
							placeholder="DD-MM-YYYY"
							format={'DD-MM-YYYY'}
							className={styles.inputField}
						/>
					</Form.Item>
					<Form.Item
						label="Ngày cập nhật gần nhất"
						name="updateAt"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<DatePicker
							placeholder="DD-MM-YYYY"
							format={'DD-MM-YYYY'}
							className={styles.inputField}
						/>
					</Form.Item>
					<Form.Item
						label="Người chịu trách nhiệm"
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
					<Form.Item
						label="Số ngày dự tính"
						name="expectedTime"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								type: 'integer',
								message: 'Số ngày không hợp lệ!',
							},
							{
								type: 'number',
								min: 0,
								message: 'Số ngày không hợp lệ!',
							},
						]}
					>
						<InputNumber
							disabled
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
					<p>Chuẩn bị trước khi trồng</p>
					<Form.List
						name="preparePlanting"
						rules={[
							{
								required: true,
								message: 'Phải có ít nhất 1 chuẩn bị!',
							},
						]}
					>
						{(fields, {add, remove}, {errors}) => (
							<>
								{fields.map((field, index) => (
									<div
										key={index}
										style={{
											width: '100%',
											display: 'flex',
											alignItems: 'flex-start',
											gap: 10,
											marginBottom: 10,
										}}
									>
										<Form.Item
											name={[field.name, 'prepareTitle']}
											wrapperCol={8}
											labelCol={4}
											required={false}
											key={`${index} Prepare prepareTitle ${field.key}`}
											rules={[
												{
													required: true,
													message: 'Vui lòng không bỏ trống!',
												},
											]}
											style={{flex: 0.5}}
											label={`${index + 1}`}
										>
											<Input
												className={styles.inputField}
												placeholder="Tên hành động"
											/>
										</Form.Item>
										<Form.Item
											required={false}
											name={[field.name, 'prepareContent']}
											labelCol={0}
											wrapperCol={24}
											key={`${index} Prepare prepareContent ${field.key}`}
											rules={[
												{
													required: true,
													message: 'Vui lòng không bỏ trống!',
												},
											]}
											style={{flex: 1}}
										>
											<Input.TextArea
												autoSize={{minRows: 4, maxRows: 8}}
												placeholder="Mô tả"
												className={styles.inputField}
											/>
										</Form.Item>
										{fields.length > 1 ? (
											<DeleteOutlined
												onClick={() => remove(field.name)}
												style={{
													marginLeft: '5px',
													fontSize: 20,
													color: '#D91515',
												}}
											/>
										) : null}
									</div>
								))}

								<Form.Item>
									<Button type="primary" onClick={() => add()}>
										Thêm bước chuẩn bị
									</Button>
									<Form.ErrorList errors={errors} />
								</Form.Item>
							</>
						)}
					</Form.List>
					<p>Kế hoạch canh tác</p>
					<ProcessPlanComponent form={form} />
				</Form>
			)}
		</Modal>
	);
};
