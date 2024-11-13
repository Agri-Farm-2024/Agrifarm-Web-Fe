import React, {useEffect, useState} from 'react';
import styles from './ManageMaterialPage.module.css';
import {Button, Form, Image, Input, InputNumber, Modal, Select, Upload, message} from 'antd';
import dayjs from 'dayjs';
import {PlusOutlined} from '@ant-design/icons';
import {convertImageURL} from '../../utils';
import {uploadFile} from '../../services/uploadService';
import {useDispatch} from 'react-redux';
import {updateMaterial} from '../../redux/slices/materialSlice';

const materialMeasureOptions = [
	{
		value: 'package',
		label: 'Túi',
	},
	{
		value: 'bag',
		label: 'Bao',
	},
	{
		value: 'bottle',
		label: 'Chai',
	},
	{
		value: 'piece',
		label: 'Cái',
	},
	{
		value: 'square_meter',
		label: 'Mét vuông',
	},
];

export const ManageMaterialUpdateModal = ({selectedMaterial, handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const [materialImg, setMaterialImg] = useState(null);
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		console.log('Update material submit:', values);
		if (
			(!materialImg || !materialImg?.file) &&
			(!selectedMaterial.image_material || selectedMaterial.image_material == '')
		) {
			message.error('Chưa có ảnh cho vật tư!');
		} else {
			setLoading(true);
			const hideLoading = message.loading('Đang xử lí...', 0);
			try {
				if (materialImg) {
					//Update material with new material image
					uploadFile(materialImg.file).then((uploadImgResponse) => {
						console.log('Response uploaded:', uploadImgResponse);
						let formData = {
							materialId: selectedMaterial.material_id,
							name: values.materialName,
							total_quantity: values.quantity,
							description: values.materialDescription,
							unit: values.unit,
							image_material: uploadImgResponse.metadata.folder_path,
							type: selectedMaterial.type,
						};

						//Add more field follow by material type
						if (selectedMaterial.type == 'buy') {
							formData = {
								...formData,
								price_per_piece: 100,
							};
						} else {
							formData = {
								...formData,
								deposit_per_piece: 100,
								price_of_rent: 100,
							};
						}

						dispatch(updateMaterial(formData)).then((response) => {
							console.log('response create material', response);
							setLoading(false);
							hideLoading();

							if (response.payload.statusCode !== 200) {
								if (response.payload.message === 'Material name already exist') {
									message.error(`Tên vật tư đã tồn tại trên trang trại`);
								}
							}

							if (response.payload.statusCode === 200) {
								message.success('Cập nhật vật tư thành công.');
								handleModalClose(true);
							}
						});
					});
				} else {
					//Update material with old material image
					let formData = {
						materialId: selectedMaterial.material_id,
						name: values.materialName,
						total_quantity: values.quantity,
						description: values.materialDescription,
						unit: values.unit,
						image_material: selectedMaterial.image_material,
						type: selectedMaterial.type,
					};

					//Add more field follow by material type
					if (selectedMaterial.type == 'buy') {
						formData = {
							...formData,
							price_per_piece: values.buyPrice,
						};
					} else {
						formData = {
							...formData,
							deposit_per_piece: values.depositPrice,
							price_of_rent: values.rentPrice,
						};
					}

					dispatch(updateMaterial(formData)).then((response) => {
						console.log('response create material', response);
						setLoading(false);
						hideLoading();

						if (response.payload.statusCode !== 200) {
							if (response.payload.message === 'Material name already exist') {
								message.error(`Tên vật tư đã tồn tại trên trang trại`);
							}
						}

						if (response.payload.statusCode === 200) {
							message.success('Cập nhật vật tư thành công.');
							handleModalClose(true);
						}
					});
				}
			} catch (error) {
				setLoading(false);
				hideLoading();
				message.error('Cập nhật vật tư thất bại!');
				console.log('Unexpected error:', error);
			}
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const handleUpload = async ({file}) => {
		if (file && file instanceof Blob) {
			//Create a review url
			const previewUrl = URL.createObjectURL(file);
			setMaterialImg({file, previewUrl});
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			setMaterialImg(null);
			form.setFieldValue('materialName', selectedMaterial.name);
			form.setFieldValue('unit', selectedMaterial.unit);
			form.setFieldValue('quantity', selectedMaterial.total_quantity);
			form.setFieldValue('status', selectedMaterial.status);
			form.setFieldValue('materialDescription', selectedMaterial.description);

			if (selectedMaterial.type == 'buy') {
				form.setFieldValue('buyPrice', selectedMaterial.price_per_piece);
			} else {
				form.setFieldValue('rentPrice', selectedMaterial.price_of_rent);
				form.setFieldValue('depositPrice', selectedMaterial.deposit_per_piece);
			}
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật vật tư</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
		>
			{selectedMaterial && (
				<Form
					form={form}
					name="UpdateMaterial"
					labelCol={{
						span: 6,
					}}
					labelAlign="left"
					wrapperCol={{
						span: 18,
					}}
					size="large"
					className={styles.formContainer}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Ảnh vật tư"
						name="materialImg"
						rules={[
							{
								required: false,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<>
							{!materialImg &&
								selectedMaterial.image_material &&
								selectedMaterial.image_material != '' && (
									<Image
										src={convertImageURL(selectedMaterial.image_material)}
										alt="Material Image"
										style={{width: 300, height: 200, borderRadius: 5}}
									/>
								)}

							{materialImg && materialImg?.previewUrl && (
								<Image
									src={
										materialImg?.previewUrl ||
										convertImageURL(selectedMaterial.image_material)
									}
									alt="Material Image"
									style={{width: 300, height: 200, borderRadius: 5}}
								/>
							)}
							<Upload
								accept="image/*"
								name="file"
								beforeUpload={() => false} // Prevent automatic upload
								showUploadList={false}
								onChange={handleUpload}
							>
								<Button
									type="primary"
									style={{
										marginLeft:
											!materialImg &&
											!(
												selectedMaterial.image_material &&
												selectedMaterial.image_material != ''
											)
												? 0
												: 20,
									}}
									icon={<PlusOutlined />}
								>
									Tải ảnh lên
								</Button>
							</Upload>
						</>
					</Form.Item>

					<Form.Item
						label="Tên vật tư"
						name="materialName"
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
						label="Đơn vị tính"
						name="unit"
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
							placeholder="Chọn đơn vị tính"
							options={materialMeasureOptions}
						></Select>
					</Form.Item>

					<Form.Item
						label="Số lượng"
						name="quantity"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
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
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							className={styles.inputField}
						/>
					</Form.Item>

					{selectedMaterial.type === 'buy' && (
						<Form.Item
							label="Giá bán (VND)"
							name="buyPrice"
							rules={[
								{required: true, message: 'Vui lòng không bỏ trống!'},
								{type: 'number', min: 0, message: 'Giá bán không hợp lệ!'},
							]}
						>
							<InputNumber
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
								className={styles.inputField}
							/>
						</Form.Item>
					)}

					{selectedMaterial.type === 'rent' && (
						<>
							<Form.Item
								label="Giá cho thuê (VND/tháng)"
								name="rentPrice"
								rules={[
									{required: true, message: 'Vui lòng không bỏ trống!'},
									{type: 'number', min: 0, message: 'Giá thuê không hợp lệ!'},
								]}
							>
								<InputNumber
									formatter={(value) =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
									className={styles.inputField}
								/>
							</Form.Item>

							<Form.Item
								label="Giá cọc (VND)"
								name="depositPrice"
								rules={[
									{required: true, message: 'Vui lòng không bỏ trống!'},
									{type: 'number', min: 0, message: 'Giá cọc không hợp lệ!'},
								]}
							>
								<InputNumber
									formatter={(value) =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
									className={styles.inputField}
								/>
							</Form.Item>
						</>
					)}

					<Form.Item
						label="Mô tả"
						name="materialDescription"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input.TextArea
							autoSize={{minRows: 2, maxRows: 6}}
							className={styles.inputField}
						/>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
