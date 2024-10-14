import React, {useState} from 'react';
import styles from './ManageLandPage.module.css';
import {Image, Modal, Input, Select, Upload, Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

export const ManageLandAddModal = ({handleModalClose, isModalOpen}) => {
	const [landData, setLandData] = useState({
		nameLand: '',
		area: '',
		position: '',
		landOfStatus: undefined,
		status: undefined,
		assignStaff: undefined,
		description: {
			title: '',
			desc: '',
			sub: [
				{sub_title: '', sub_desc: ''},
				{sub_title: '', sub_desc: ''},
				{sub_title: '', sub_desc: ''},
			],
		},
		images: [],
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const {name, value} = e.target;

		// Update landData state
		setLandData({...landData, [name]: value});

		// Validation for required fields and numeric input for 'area'
		if (name === 'area') {
			if (!/^\d*\.?\d*$/.test(value) && value.trim() !== '') {
				// Check for non-numeric input
				setErrors({...errors, [name]: 'Trường này chỉ chấp nhận số'});
			} else if (value.trim() === '') {
				// Check for empty input
				setErrors({...errors, [name]: 'Trường này không được để trống'});
			} else {
				const {[name]: removedError, ...rest} = errors; // Remove error if valid
				setErrors(rest);
			}
		} else {
			// Handle other fields (required validation)
			if (value.trim() === '') {
				setErrors({...errors, [name]: 'Trường này không được để trống'});
			} else {
				const {[name]: removedError, ...rest} = errors; // Remove error if valid
				setErrors(rest);
			}
		}
	};

	const handleSelectChange = (name, value) => {
		setLandData({...landData, [name]: value});
		const {[name]: removedError, ...rest} = errors;
		setErrors(rest);
	};

	const handleRemoveImage = (index) => {
		const updatedImages = landData.images.filter((_, imgIndex) => imgIndex !== index);
		setLandData({...landData, images: updatedImages});
	};

	const handleUpload = ({file}) => {
		const reader = new FileReader();
		reader.onload = () => {
			const newImage = reader.result;
			setLandData({...landData, images: [...landData.images, newImage]});
		};
		reader.readAsDataURL(file);
	};

	const validateInputs = () => {
		const requiredFields = [
			'nameLand',
			'area',
			'position',
			'landOfStatus',
			'status',
			'assignStaff',
			'description.title',
			'description.desc',
		];

		const newErrors = {};

		// Validate main fields
		requiredFields.forEach((field) => {
			const [key, subKey] = field.split('.');
			if (subKey) {
				if (!landData[key][subKey]?.trim()) {
					newErrors[field] = 'Trường này không được để trống';
				}
			} else {
				if (!landData[key]?.trim()) {
					newErrors[field] = 'Trường này không được để trống';
				}
			}
		});

		// Validate sub-title and sub-description fields
		landData.description.sub.forEach((subItem, index) => {
			if (!subItem.sub_title.trim()) {
				newErrors[`description.sub.${index}.sub_title`] = 'Trường này không được để trống';
			}
			if (!subItem.sub_desc.trim()) {
				newErrors[`description.sub.${index}.sub_desc`] = 'Trường này không được để trống';
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (validateInputs()) {
			const hideLoading = message.loading('Đang xử lý...', 0);
			console.log(landData);
			setTimeout(() => {
				hideLoading();
				message.success('Cập nhật thành công.');
				handleModalClose();
				// Reset landData after submission
				setLandData({
					nameLand: '',
					area: '',
					position: '',
					landOfStatus: undefined,
					status: undefined,
					assignStaff: undefined,
					description: {
						title: '',
						desc: '',
						sub: [
							{sub_title: '', sub_desc: ''},
							{sub_title: '', sub_desc: ''},
							{sub_title: '', sub_desc: ''},
						],
					},
					images: [],
				});
			}, 1000);
		} else {
			message.error('Hãy điền đủ trường nhé');
		}
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thêm mảnh đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={handleSubmit}
			style={{top: 20}}
			cancelText="Hủy"
			width={'max-content'}
			okText="Thêm"
			okButtonProps={{disabled: Object.keys(errors).length > 0}}
		>
			<div className={styles.modalContainer}>
				<div style={{display: 'flex'}}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tên mảnh đất:</p>
							<Input
								name="nameLand"
								value={landData.nameLand}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['nameLand'] && (
								<p className={styles.error}>{errors['nameLand']}</p>
							)}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Diện tích:</p>
							<Input
								name="area"
								value={landData.area}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['area'] && <p className={styles.error}>{errors['area']}</p>}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Vị trí:</p>
							<Input
								name="position"
								value={landData.position}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['position'] && (
								<p className={styles.error}>{errors['position']}</p>
							)}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tình trạng đất:</p>
							<Select
								value={landData.landOfStatus}
								onChange={(value) => handleSelectChange('landOfStatus', value)}
								style={{width: '50%'}}
							>
								<Select.Option value="Tốt">Tốt</Select.Option>
								<Select.Option value="Đang cải tạo">Đang cải tạo</Select.Option>
								<Select.Option value="Cần cải tạo">Cần cải tạo</Select.Option>
								<Select.Option value="Không thể canh tác">
									Không thể canh tác
								</Select.Option>
							</Select>
							{errors['landOfStatus'] && (
								<p className={styles.error}>{errors['landOfStatus']}</p>
							)}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng thái:</p>
							<Select
								value={landData.status}
								onChange={(value) => handleSelectChange('status', value)}
								style={{width: '50%'}}
							>
								<Select.Option value="Có thể sử dụng">Có thể sử dụng</Select.Option>
								<Select.Option value="Đang sử dụng">Đang sử dụng</Select.Option>
								<Select.Option value="Đang cải tạo">Đang cải tạo</Select.Option>
								<Select.Option value="Tạm ngừng sử dụng">
									Tạm ngừng sử dụng
								</Select.Option>
							</Select>
							{errors['status'] && <p className={styles.error}>{errors['status']}</p>}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Nhân viên phụ trách:</p>
							<Select
								value={landData.assignStaff}
								onChange={(value) => handleSelectChange('assignStaff', value)}
								style={{width: '50%'}}
							>
								<Select.Option value="Huynh Chi Bao">Huynh Chi Bao</Select.Option>
								<Select.Option value="Pham Dang Ninh">Pham Dang Ninh</Select.Option>
								<Select.Option value="Pham Ba Phuoc">Pham Ba Phuoc</Select.Option>
							</Select>
							{errors['assignStaff'] && (
								<p className={styles.error}>{errors['assignStaff']}</p>
							)}
						</div>
						<div
							className={styles.bookingItem}
							style={{flexDirection: 'column', alignItems: 'flex-start'}}
						>
							<p className={styles.title}>Hình ảnh:</p>
							<div style={{display: 'flex', flexWrap: 'wrap'}}>
								{landData.images.map((image, index) => (
									<div
										key={index}
										style={{width: 200, margin: 20, position: 'relative'}}
									>
										<Image
											src={image}
											alt="Land Image"
											style={{width: '100%', height: 200}}
										/>
										<Button
											type="primary"
											danger
											style={{position: 'absolute', top: 10, right: 10}}
											onClick={() => handleRemoveImage(index)}
										>
											Xóa
										</Button>
									</div>
								))}
							</div>
							<Upload
								beforeUpload={() => false} // Prevent automatic upload
								showUploadList={false}
								onChange={handleUpload}
							>
								<Button type="primary" style={{margin: 20}} icon={<PlusOutlined />}>
									Tải ảnh lên
								</Button>
							</Upload>
						</div>
					</div>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tiêu đề:</p>
							<Input
								name="title"
								value={landData.description.title}
								onChange={(e) => {
									const updatedTitle = e.target.value;
									setLandData({
										...landData,
										description: {
											...landData.description,
											title: updatedTitle,
										},
									});
									if (updatedTitle.trim() === '') {
										setErrors({
											...errors,
											'description.title': 'Trường này không được để trống',
										});
									} else {
										const {['description.title']: removedError, ...rest} =
											errors;
										setErrors(rest);
									}
								}}
								style={{width: '50%'}}
							/>
							{errors['description.title'] && (
								<p className={styles.error}>{errors['description.title']}</p>
							)}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Mô tả:</p>
							<Input.TextArea
								name="desc"
								value={landData.description.desc}
								onChange={(e) => {
									const updatedDesc = e.target.value;
									setLandData({
										...landData,
										description: {
											...landData.description,
											desc: updatedDesc,
										},
									});
									if (updatedDesc.trim() === '') {
										setErrors({
											...errors,
											'description.desc': 'Trường này không được để trống',
										});
									} else {
										const {['description.desc']: removedError, ...rest} =
											errors;
										setErrors(rest);
									}
								}}
								style={{width: '50%'}}
							/>
							{errors['description.desc'] && (
								<p className={styles.error}>{errors['description.desc']}</p>
							)}
						</div>
						<div>
							{landData.description.sub.map((subItem, index) => (
								<div
									key={index}
									className={styles.bookingItem}
									style={{
										flexDirection: 'column',
										alignItems: 'flex-start',
										marginTop: 20,
									}}
								>
									<p className={styles.title} style={{marginBottom: 0}}>
										{index + 1}) Tiêu đề phụ:
									</p>
									<Input
										value={subItem.sub_title}
										onChange={(e) => {
											const updatedSubItems = landData.description.sub.map(
												(item, idx) =>
													idx === index
														? {...item, sub_title: e.target.value}
														: item
											);
											setLandData({
												...landData,
												description: {
													...landData.description,
													sub: updatedSubItems,
												},
											});
											if (e.target.value.trim() === '') {
												setErrors({
													...errors,
													[`description.sub.${index}.sub_title`]:
														'Trường này không được để trống',
												});
											} else {
												const {
													[`description.sub.${index}.sub_title`]:
														removedError,
													...rest
												} = errors;
												setErrors(rest);
											}
										}}
										style={{width: '50%', marginBottom: 0, marginTop: -15}}
									/>
									{errors[`description.sub.${index}.sub_title`] && (
										<p className={styles.error} style={{marginTop: -15}}>
											{errors[`description.sub.${index}.sub_title`]}
										</p>
									)}
									<div style={{width: '100%'}}>
										<p
											className={styles.title}
											style={{marginBottom: 0, marginTop: 0}}
										>
											Mô tả phụ:
										</p>
										<Input.TextArea
											value={subItem.sub_desc}
											onChange={(e) => {
												const updatedSubItems =
													landData.description.sub.map((item, idx) =>
														idx === index
															? {...item, sub_desc: e.target.value}
															: item
													);
												setLandData({
													...landData,
													description: {
														...landData.description,
														sub: updatedSubItems,
													},
												});
												if (e.target.value.trim() === '') {
													setErrors({
														...errors,
														[`description.sub.${index}.sub_desc`]:
															'Trường này không được để trống',
													});
												} else {
													const {
														[`description.sub.${index}.sub_desc`]:
															removedError,
														...rest
													} = errors;
													setErrors(rest);
												}
											}}
											style={{width: '80%'}}
										/>
										{errors[`description.sub.${index}.sub_desc`] && (
											<p className={styles.error}>
												{errors[`description.sub.${index}.sub_desc`]}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
