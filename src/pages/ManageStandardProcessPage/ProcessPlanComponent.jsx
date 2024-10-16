import {DeleteOutlined} from '@ant-design/icons';
import {Button, Form, Input, InputNumber, Select} from 'antd';
import React from 'react';
import styles from './ManageStandardProcessPage.module.css';

const materialOptions = [
	{
		value: 'Cuốc',
		label: 'Cuốc',
	},
	{
		value: 'Xẻng',
		label: 'Xẻng',
	},
];

export const ProcessPlanComponent = ({form}) => {
	return (
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
								key={`${index} Stage ${index} container ${field.key}`}
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
														name={[subField.name, 'dayFrom']}
														wrapperCol={8}
														labelCol={4}
														key={`${subIndex} Actions dayFrom ${field.key}+${subField.key}`}
														style={{width: '20%'}}
														rules={[
															{
																required: true,
																message: 'Vui lòng không bỏ trống!',
															},
															({getFieldValue}) => ({
																validator(_, value) {
																	if (
																		!value ||
																		(index === 0 &&
																			subIndex == 0)
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
																			? getFieldValue([
																					'plantingSchedule',
																					index - 1,
																					'actions',
																					subFields.length,
																					'dayTo',
																				])
																			: getFieldValue([
																					'plantingSchedule',
																					field.name,
																					'actions',
																					subIndex - 1,
																					'dayTo',
																				]);

																	if (
																		!prevStageDayTo ||
																		value > prevStageDayTo
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
															className={styles.inputField}
															onChange={(value) => {
																const currentFields =
																	form.getFieldValue(
																		'plantingSchedule'
																	);
																// Update value of dayFrom of stage when dayFrom of first action in stage is changed
																if (subIndex === 0) {
																	currentFields[index].dayFrom =
																		value;
																	form.setFieldsValue({
																		plantingSchedule:
																			currentFields,
																	});
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
																message: 'Vui lòng không bỏ trống!',
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
																		value >= dayFromValue
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
															className={styles.inputField}
															onChange={(value) => {
																const currentFields =
																	form.getFieldValue(
																		'plantingSchedule'
																	);
																//Update value of dayTo of stage when dayTo of the last action in stage is changed
																if (
																	subIndex ===
																	subFields.length - 1
																) {
																	currentFields[index].dayTo =
																		value;
																	form.setFieldsValue({
																		plantingSchedule:
																			currentFields,
																	});
																}
															}}
														/>
													</Form.Item>
													<Form.Item
														required={false}
														name={[subField.name, 'actionTitle']}
														key={`${subIndex} Actions actionTitle ${field.key}+${subField.key}`}
														rules={[
															{
																required: true,
																message: 'Vui lòng không bỏ trống!',
															},
														]}
														wrapperCol={8}
														labelCol={4}
														label=":"
														style={{width: '60%'}}
													>
														<Input
															placeholder="Tên hoạt động"
															className={styles.inputField}
														/>
													</Form.Item>
													<DeleteOutlined
														onClick={() => {
															subOpt.remove(subField.name);
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
													name={[subField.name, 'actionDescription']}
													key={`${subIndex} Actions actionDescription ${field.key}+${subField.key}`}
													rules={[
														{
															required: true,
															message: 'Vui lòng không bỏ trống!',
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
										<Form.Item wrapperCol={24} style={{width: '100%'}}>
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

							<p>Vật tư cần cho giai đoạn:</p>
							<Form.List name={[field.name, 'materials']}>
								{(materialFields, {add: addMaterial, remove: removeMaterial}) => (
									<>
										{materialFields.map((materialField, materialIndex) => (
											<div
												key={`${materialField.key} ${materialIndex}`}
												style={{
													width: '100%',
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'flex-start',
													gap: 10,
												}}
											>
												<Form.Item
													name={[materialField.name, 'materialName']}
													style={{width: '50%'}}
													wrapperCol={10}
													rules={[
														{
															required: true,
															message: 'Vui lòng chọn vật tư!',
														},
														({getFieldValue}) => ({
															validator(_, value) {
																const materials = getFieldValue([
																	'plantingSchedule',
																])[index].materials;

																const selectedMaterials = materials
																	? materials.map((mat) => mat)
																	: [];

																if (
																	selectedMaterials.filter(
																		(mat) =>
																			mat.materialName ===
																			value
																	).length > 1
																) {
																	return Promise.reject(
																		'Vật tư đã được chọn, vui lòng chọn vật tư khác.'
																	);
																}
																return Promise.resolve();
															},
														}),
													]}
												>
													<Select
														allowClear
														placeholder="Chọn vật tư"
														className={styles.inputField}
														options={materialOptions}
													/>
												</Form.Item>
												<Form.Item
													name={[materialField.name, 'materialQuantity']}
													style={{width: '50%'}}
													wrapperCol={10}
													rules={[
														{
															required: true,
															message: 'Vui lòng nhập số lượng!',
														},
														{
															type: 'integer',
															message: 'Số lượng không hợp lệ!',
														},
														{
															type: 'number',
															min: 0,
															message: 'Số lượng không hợp lệ!',
														},
													]}
												>
													<InputNumber
														className={styles.inputField}
														placeholder="Nhập số lượng vật tư"
													/>
												</Form.Item>
												<DeleteOutlined
													onClick={() =>
														removeMaterial(materialField.name)
													}
													style={{
														marginTop: 10,
														fontSize: 20,
														color: '#D91515',
													}}
												/>
											</div>
										))}

										{/* Nút thêm vật tư */}
										<Button
											color="default"
											variant="filled"
											onClick={() => addMaterial()}
											style={{
												width: '100%',
												marginTop: 10,
												marginBottom: 40,
											}}
											disabled={
												materialFields.length >= materialOptions.length
											}
										>
											Thêm vật tư
										</Button>
									</>
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
	);
};
