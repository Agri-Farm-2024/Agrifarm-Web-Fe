import React, {useEffect, useState} from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space} from 'antd';
import dayjs from 'dayjs';
import {DeleteOutlined} from '@ant-design/icons';

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
					<Form.List
						name="plantingSchedule"
						rules={[
							{
								required: true,
								message: 'Phải có ít nhất 1 giai đoạn!',
							},
						]}
					>
						{(fields, {add, remove}, {errors}) => (
							<>
								{fields.map((field, index) => (
									<>
										<div
											key={`${index} Stage ${index} contianer ${field.key}`}
											style={{
												width: '100%',
												display: 'flex',
												alignItems: 'start',
												gap: 5,
											}}
										>
											<Form.Item
												name={[field.name, 'dayFrom']}
												wrapperCol={8}
												labelCol={4}
												key={`${index} Stage dayFrom ${field.key}`}
												style={{width: '20%'}}
												// rules={[
												// 	{
												// 		required: true,
												// 		message: 'Vui lòng không bỏ trống!',
												// 	},
												// 	({getFieldValue}) => ({
												// 		validator(_, value) {
												// 			if (!value || index === 0) {
												// 				return Promise.resolve();
												// 			}
												// 			const prevStageDayTo = getFieldValue([
												// 				'plantingSchedule',
												// 				index - 1,
												// 				'dayTo',
												// 			]);
												// 			if (
												// 				prevStageDayTo &&
												// 				value <= prevStageDayTo
												// 			) {
												// 				return Promise.reject(
												// 					'Ngày bắt đầu của giai đoạn phải lớn hơn ngày kết thúc của giai đoạn trước.'
												// 				);
												// 			}
												// 			return Promise.resolve();
												// 		},
												// 	}),
												// ]}
												label={`Từ ngày`}
											>
												<InputNumber
													className={styles.inputField}
													disabled
													placeholder="Ngày"
												/>
											</Form.Item>
											<Form.Item
												required={false}
												name={[field.name, 'dayTo']}
												key={`${index} Stage dayTo ${field.key}`}
												wrapperCol={8}
												labelCol={4}
												style={{width: '20%'}}
												// rules={[
												// 	{
												// 		required: true,
												// 		message: 'Vui lòng không bỏ trống!',
												// 	},
												// 	({getFieldValue}) => ({
												// 		validator(_, value) {
												// 			const dayFromValue = getFieldValue([
												// 				'plantingSchedule',
												// 				field.name,
												// 				'dayFrom',
												// 			]);
												// 			if (!value || value >= dayFromValue) {
												// 				return Promise.resolve();
												// 			}
												// 			return Promise.reject(
												// 				'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.'
												// 			);
												// 		},
												// 	}),
												// ]}
												label="đến ngày"
											>
												<InputNumber
													disabled
													placeholder="Ngày"
													className={styles.inputField}
												/>
											</Form.Item>
											<Form.Item
												required={false}
												name={[field.name, 'stageTitle']}
												key={`${index} Stage stageTitle ${field.key}`}
												rules={[
													{
														required: true,
														message: 'Vui lòng không bỏ trống!',
													},
												]}
												wrapperCol={8}
												labelCol={4}
												label={`Giai đoạn ${index + 1}`}
												style={{width: '60%'}}
											>
												<Input
													placeholder="Tên giai đoạn"
													className={styles.inputField}
												/>
											</Form.Item>
											{fields.length > 1 ? (
												<DeleteOutlined
													onClick={() => remove(field.name)}
													style={{
														marginLeft: '5px',
														marginTop: 5,
														fontSize: 20,
														color: '#D91515',
													}}
												/>
											) : null}
										</div>
										<Form.List
											style={{margin: '10px 0'}}
											name={[field.name, 'actions']}
											rules={[
												{
													required: true,
													message: 'Phải có ít nhất 1 hành động!',
												},
											]}
										>
											{(subFields, subOpt, subError) => (
												<div
													key={`${index} Actions contianer ${subFields.key}`}
													style={{
														display: 'flex',
														flexDirection: 'column',
														rowGap: 16,
														width: '100%',
														paddingLeft: 10,
													}}
												>
													{subFields.map((subField, subIndex) => (
														<div
															style={{
																width: '100%',
																display: 'flex',
																flexDirection: 'column',
															}}
														>
															<div
																style={{
																	width: '100%',
																	display: 'flex',
																	gap: 5,
																	alignItems: 'start',
																}}
																key={`${subIndex} Actions contianer dayFrom ${field.key}+${subField.key}`}
															>
																<Form.Item
																	name={[
																		subField.name,
																		'dayFrom',
																	]}
																	wrapperCol={8}
																	labelCol={4}
																	key={`${subIndex} Actions dayFrom ${field.key}+${subField.key}`}
																	style={{width: '20%'}}
																	rules={[
																		{
																			required: true,
																			message:
																				'Vui lòng không bỏ trống!',
																		},
																		({getFieldValue}) => ({
																			validator(_, value) {
																				if (
																					!value ||
																					(index === 0 &&
																						subIndex ==
																							0)
																				) {
																					console.log(
																						'value pass',
																						value,
																						'index',
																						index
																					);
																					return Promise.resolve();
																				}
																				//if dayFrom of the action is first will check dayTo of the last action of the stage above
																				//else will check dayTo of the above action
																				const prevStageDayTo =
																					subIndex == 0
																						? getFieldValue(
																								[
																									'plantingSchedule',
																									index -
																										1,
																									'actions',
																									subFields.length,
																									'dayTo',
																								]
																							)
																						: getFieldValue(
																								[
																									'plantingSchedule',
																									field.name,
																									'actions',
																									subIndex -
																										1,
																									'dayTo',
																								]
																							);

																				if (
																					!prevStageDayTo ||
																					value >
																						prevStageDayTo
																				) {
																					console.log(
																						'prevStageDayTo pass',
																						prevStageDayTo
																					);
																					return Promise.resolve();
																				}
																				return Promise.reject(
																					'Ngày bắt đầu của giai đoạn phải lớn hơn ngày kết thúc của giai đoạn trước.'
																				);
																			},
																		}),
																	]}
																	label={`Từ ngày`}
																>
																	<InputNumber
																		className={
																			styles.inputField
																		}
																		onChange={(value) => {
																			const currentFields =
																				form.getFieldValue(
																					'plantingSchedule'
																				);
																			// Cập nhật giá trị dayFrom cho stage khi dayFrom của action đầu tiên thay đổi
																			if (subIndex === 0) {
																				currentFields[
																					index
																				].dayFrom = value;
																				form.setFieldsValue(
																					{
																						plantingSchedule:
																							currentFields,
																					}
																				);
																			}
																		}}
																		placeholder="Ngày"
																	/>
																</Form.Item>
																<Form.Item
																	required={false}
																	name={[subField.name, 'dayTo']}
																	key={`${subIndex} Actions dayTo ${field.key}+${subField.key}`}
																	wrapperCol={8}
																	labelCol={4}
																	style={{width: '20%'}}
																	rules={[
																		{
																			required: true,
																			message:
																				'Vui lòng không bỏ trống!',
																		},
																		({getFieldValue}) => ({
																			validator(_, value) {
																				const dayFromValue =
																					getFieldValue([
																						'plantingSchedule',
																						field.name,
																						'actions',
																						subField.name,
																						'dayFrom',
																					]);
																				if (
																					!value ||
																					value >=
																						dayFromValue
																				) {
																					return Promise.resolve();
																				}
																				return Promise.reject(
																					'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.'
																				);
																			},
																		}),
																	]}
																	label="đến ngày"
																>
																	<InputNumber
																		placeholder="Ngày"
																		className={
																			styles.inputField
																		}
																		onChange={(value) => {
																			const currentFields =
																				form.getFieldValue(
																					'plantingSchedule'
																				);
																			// Cập nhật giá trị dayTo cho stage khi dayTo của action cuối cùng thay đổi
																			if (
																				subIndex ===
																				subFields.length - 1
																			) {
																				currentFields[
																					index
																				].dayTo = value;
																				form.setFieldsValue(
																					{
																						plantingSchedule:
																							currentFields,
																					}
																				);
																			}
																		}}
																	/>
																</Form.Item>
																<Form.Item
																	required={false}
																	name={[
																		subField.name,
																		'actionTitle',
																	]}
																	key={`${subIndex} Actions actionTitle ${field.key}+${subField.key}`}
																	rules={[
																		{
																			required: true,
																			message:
																				'Vui lòng không bỏ trống!',
																		},
																	]}
																	wrapperCol={8}
																	labelCol={4}
																	label=":"
																	style={{width: '60%'}}
																>
																	<Input
																		placeholder="Tên hoạt động"
																		className={
																			styles.inputField
																		}
																	/>
																</Form.Item>
																<DeleteOutlined
																	onClick={() => {
																		subOpt.remove(
																			subField.name
																		);
																	}}
																	style={{
																		marginTop: '10px',
																		fontSize: 20,
																		color: '#D91515',
																	}}
																/>
															</div>
															<Form.Item
																required={false}
																name={[
																	subField.name,
																	'actionDescription',
																]}
																key={`${subIndex} Actions actionDescription ${field.key}+${subField.key}`}
																rules={[
																	{
																		required: true,
																		message:
																			'Vui lòng không bỏ trống!',
																	},
																]}
																wrapperCol={8}
																labelCol={0}
																style={{width: '100%'}}
															>
																<Input.TextArea
																	autoSize={{
																		minRows: 4,
																		maxRows: 8,
																	}}
																	className={styles.inputField}
																	placeholder="Mô tả hoạt động"
																/>
															</Form.Item>
														</div>
													))}
													<Form.Item
														wrapperCol={24}
														style={{width: '100%'}}
													>
														<Button
															color="primary"
															variant="filled"
															style={{
																margin: '20px 0',
																width: '100%',
															}}
															onClick={() => subOpt.add()}
														>
															+ Thêm hoạt động
														</Button>
														<Form.ErrorList
															style={{
																marginBottom: 20,
																marginTop: -20,
																color: 'red!important',
															}}
															errors={subError.errors}
														/>
													</Form.Item>
												</div>
											)}
										</Form.List>
									</>
								))}

								<Form.Item>
									<Button type="primary" onClick={() => add()}>
										Thêm giai đoạn
									</Button>
									<Form.ErrorList errors={errors} />
								</Form.Item>
							</>
						)}
					</Form.List>
				</Form>
			)}
		</Modal>
	);
};
