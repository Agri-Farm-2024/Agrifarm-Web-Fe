import React, {useEffect, useState} from 'react';
import styles from './ManageMaterialPage.module.css';
import {Button, Form, Image, Input, InputNumber, Modal, Select, Upload, message} from 'antd';
import dayjs from 'dayjs';
import {PlusOutlined} from '@ant-design/icons';
import {uploadFile} from '../../services/uploadService';
import {useDispatch} from 'react-redux';
import {createMaterial} from '../../redux/slices/materialSlice';

const statusOptions = [
	{
		value: 'Có sẵn',
		label: 'Có sẵn',
	},
	{
		value: 'Sắp hết',
		label: 'Sắp hết',
	},
	{
		value: 'Hết hàng',
		label: 'Hết hàng',
	},
];

const materialTypeOptions = [
	{
		value: 'buy',
		label: 'Bán',
	},
	{
		value: 'rent',
		label: 'Cho thuê',
	},
];

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

export const ManageMaterialCreateModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const [materialImg, setMaterialImg] = useState(null);
	const [materialType, setMaterialType] = useState(null);
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		console.log('Create material submit:', values);
		if (!materialImg || !materialImg?.file) {
			message.error('Chưa có ảnh cho vật tư!');
		} else {
			setLoading(true);
			const hideLoading = message.loading('Đang xử lí...', 0);
			try {
				uploadFile(materialImg.file).then((uploadImgResponse) => {
					console.log('Response uploaded:', uploadImgResponse);
					let formData = {
						name: values.materialName,
						total_quantity: values.quantity,
						description: values.materialDescription,
						unit: values.unit,
						image_material: uploadImgResponse.metadata.folder_path,
						type: values.materialType,
					};

					//Add more field follow by material type
					if (values.materialType == 'buy') {
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

					dispatch(createMaterial(formData)).then((response) => {
						console.log('response create material', response);
						setLoading(false);
						hideLoading();

						if (response.payload.statusCode !== 201) {
							if (response.payload.message === 'Material name already exist') {
								message.error(`Tên vật tư đã tồn tại trên trang trại`);
							}
						}

						if (response.payload.statusCode === 201) {
							message.success('Tạo vật tư thành công.');
							handleModalClose(true);
						}
					});
				});
			} catch (error) {
				setLoading(false);
				hideLoading();
				message.error('Tạo vật tư thất bại!');
				console.log('Unexpected error:', error);
			}
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const handleUpload = async ({file}) => {
		// Create a preview URL for the image
		const previewUrl = URL.createObjectURL(file);

		setMaterialImg({file, previewUrl});
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			setMaterialImg(null);
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
			okButtonProps={{loading: loading}}
			width={800}
			style={{top: 20}}
		>
			<Form
				form={form}
				name="CreateMaterial"
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
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<>
						{materialImg && (
							<Image
								src={materialImg.previewUrl}
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
								style={{marginLeft: !materialImg ? 0 : 20}}
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
					label="Loại vật tư"
					name="materialType"
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
						placeholder="Chọn loại vật tư"
						options={materialTypeOptions}
						onChange={(value) => setMaterialType(value)}
					></Select>
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

				{materialType === 'buy' && (
					<Form.Item
						label="Giá bán (VND)"
						name="buyPrice"
						rules={[
							{required: true, message: 'Vui lòng không bỏ trống!'},
							{type: 'number', min: 0, message: 'Giá bán không hợp lệ!'},
						]}
					>
						<InputNumber
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							className={styles.inputField}
						/>
					</Form.Item>
				)}

				{materialType === 'rent' && (
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
		</Modal>
	);
};
