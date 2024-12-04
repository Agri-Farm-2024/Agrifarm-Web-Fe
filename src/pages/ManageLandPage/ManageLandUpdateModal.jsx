import React, {useState, useEffect} from 'react';
import styles from './ManageLandPage.module.css';
import {Image, Modal, Input, Select, Upload, Button, message, Tag} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import TextEditor from './TextEditor';
import {convertImageURL} from '../../utils';
import {uploadFile} from '../../services/uploadService';
import {updateLand} from '../../redux/slices/landSlice';
import {useDispatch} from 'react-redux';

export const ManageLandUpdateModal = ({
	selectedLand,
	handleModalClose,
	isModalOpen,
	staffList,
	handleModalCloseAndUpdate,
	landTypeList,
}) => {
	const [landData, setLandData] = useState(selectedLand);
	const [errors, setErrors] = useState({});
	const [imageDeleted, setImageDeleted] = useState([]);

	const dispatch = useDispatch();

	console.log(landData?.staff_id);

	useEffect(() => {
		setLandData(selectedLand);
		setErrors({});
		setImageDeleted([]);
	}, [selectedLand]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setLandData({...landData, [name]: value});
		if (value.trim() === '') {
			setErrors({...errors, [name]: 'Trường này không được để trống'});
		} else {
			const {[name]: removedError, ...rest} = errors;
			setErrors(rest);
		}
	};

	const handleEditorChange = (content) => {
		setLandData((prevData) => ({
			...prevData,
			description: content,
		}));

		console.log(content);
		const isEmpty = content.trim() === '' || content === '<p><br></p>' || content === '<p></p>';

		if (isEmpty) {
			setErrors((prevErrors) => ({
				...prevErrors,
				'description.desc': 'Trường này không được để trống',
			}));
		} else {
			setErrors((prevErrors) => {
				const {['description.desc']: removedError, ...rest} = prevErrors;
				return rest;
			});
		}
	};

	const handleSelectChange = (name, value) => {
		setLandData({...landData, [name]: value});
		const {[name]: removedError, ...rest} = errors;
		setErrors(rest);
	};

	const handleRemoveImage = (image) => {
		setImageDeleted([...(Array.isArray(imageDeleted) ? imageDeleted : []), image]);

		const updatedImages = landData.url.filter((img) => img !== image);
		setLandData({...landData, url: updatedImages});
	};

	const handleUpload = ({file}) => {
		uploadFile(file)
			.then((response) => {
				console.log('File uploaded successfully:', response);
				setLandData({
					...landData,
					url: [
						...landData.url,
						{
							land_url_id: null,
							string_url: response.metadata.folder_path,
							type: 'image',
						},
					],
				});
			})
			.catch((error) => {
				console.error('Error uploading file:', error);
			});

		// const reader = new FileReader();
		// reader.onload = () => {
		// 	const newImage = reader.result;
		// 	setLandData({...landData, url: [...landData.images, newImage]});
		// };
		// reader.readAsDataURL(file);
	};

	const handleVideoUpload = ({file}) => {
		const maxSizeInMB = 2; // Set max size to 2MB
		const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert to bytes

		if (file.size > maxSizeInBytes) {
			message.error(`Video không được vượt quá ${maxSizeInMB}MB. Hãy tải video khác!`);
			return;
		}

		uploadFile(file)
			.then((response) => {
				console.log('File uploaded successfully:', response);
				setLandData({
					...landData,
					url: [
						...landData.url,
						{
							land_url_id: null,
							string_url: response.metadata.folder_path,
							type: 'video',
						},
					],
				});
			})
			.catch((error) => {
				console.error('Error uploading file:', error);
			});
	};

	const validateInputs = () => {
		const requiredFields = ['name', 'acreage_land', 'status', 'title', 'description'];
		const newErrors = {};
		requiredFields.forEach((field) => {
			const [key, subKey] = field.split('.');
			if (subKey ? !landData[key][subKey]?.trim() : !landData[key]?.trim()) {
				newErrors[field] = 'Trường này không được để trống';
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (validateInputs()) {
			const existImage = landData.url.find((image) => image.type === 'image');
			const existVideo = landData.url.find((video) => video.type === 'video');

			if (!existImage) {
				message.error('Hãy tải hình ảnh lên');
				return;
			}

			if (!existVideo) {
				message.error('Hãy tải video lên');
				return;
			}

			const landInfor = {
				name: landData.name,
				title: landData.title,
				description: landData.description,
				acreage_land: Number(landData.acreage_land),
				price_booking_per_month: Number(landData.price_booking_per_month),
				staff_id: landData.staff_id,
				land_type_id: landData.land_type_id,
				land_id: landData.land_id,
				url: landData.url,
				url_deleted: imageDeleted,
			};

			console.log(landInfor);

			const hideLoading = message.loading('Đang xử lí...', 0);

			dispatch(updateLand(landInfor))
				.then((res) => {
					console.log(res);
					hideLoading();
					if (res.payload.statusCode !== 200) {
						if (res.payload.message === 'Land name already exist') {
							message.error(`Tên mảnh đất đã tồn tại trên trang trại`);
						}
						if (res.payload.message === 'numeric field overflow') {
							message.error(`Diện tích vượt quá quy định`);
						}
					}

					if (res.payload.statusCode === 200) {
						message.success('Cập nhật mảnh đất thành công.');
						handleModalCloseAndUpdate();
					}
				})
				.catch((err) => {
					hideLoading();
					message.error('Unexpected error:', err);
				});

			// const hideLoading = message.loading('Đang xử lý...', 0); // 0 means it will persist until manually closed
			// console.log(landData);
			// setTimeout(() => {
			// 	hideLoading();
			// 	message.success('Cập nhật thành công.');
			// }, 1000);
		} else {
			message.error('Hãy điền đầy đủ các trường');
		}
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chỉnh sửa mảnh đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={handleSubmit}
			style={{top: 20}}
			cancelText="Hủy"
			width={'max-content'}
			okText="Cập nhật"
			okButtonProps={{disabled: Object.keys(errors).length > 0}}
		>
			{landData && (
				<div className={styles.modalContainer}>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>ID mảnh đất:</p>
							<p className={styles.content}>{landData.land_id}</p>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tên mảnh đất:</p>
							<Input
								name="name"
								value={landData.name}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['name'] && <p className={styles.error}>{errors['name']}</p>}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Diện tích:</p>
							<Input
								name="acreage_land"
								value={landData.acreage_land}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['acreage_land'] && (
								<p className={styles.error}>{errors['acreage_land']}</p>
							)}
						</div>

						<div className={styles.bookingItem}>
							<p className={styles.title}>Giá thuê mỗi tháng:</p>
							<Input
								name="price_booking_per_month"
								value={landData.price_booking_per_month}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['price_booking_per_month'] && (
								<p className={styles.error}>{errors['price_booking_per_month']}</p>
							)}
						</div>

						<div className={styles.bookingItem}>
							<p className={styles.title}>Trạng thái:</p>
							{/* <Select
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
							{errors['status'] && <p className={styles.error}>{errors['status']}</p>} */}
							<Tag
								title="Đang hỗ trợ"
								color={
									landData.status == 'free'
										? 'green'
										: landData.status == 'booked'
											? 'red'
											: 'blue'
								}
							>
								{landData.status == 'free'
									? 'Đang trống'
									: landData.status == 'booked'
										? 'Đang sử dụng'
										: 'Đang sửa chữa'}
							</Tag>
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Nhân viên phụ trách:</p>
							<Select
								value={landData.staff_id}
								onChange={(value) => handleSelectChange('staff_id', value)}
								style={{width: '50%'}}
							>
								{staffList.map((staff, index) => (
									<Select.Option key={index} value={staff.user_id}>
										{staff.full_name}
									</Select.Option>
								))}
							</Select>

							{errors['staff_id'] && (
								<p className={styles.error}>{errors['staff_id']}</p>
							)}
						</div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Loại đất:</p>
							<Select
								value={landData.land_type_id}
								onChange={(value) => handleSelectChange('land_type_id', value)}
								style={{width: '50%'}}
							>
								{landTypeList.map((type, index) => (
									<Select.Option key={index} value={type.land_type_id}>
										{type.name}
									</Select.Option>
								))}
							</Select>

							{errors['land_type_id'] && (
								<p className={styles.error}>{errors['land_type_id']}</p>
							)}
						</div>
						<div
							className={styles.bookingItem}
							style={{flexDirection: 'column', alignItems: 'flex-start'}}
						>
							<p className={styles.title}>Hình ảnh:</p>
							<div style={{display: 'flex', flexWrap: 'wrap'}}>
								{landData.url
									.filter((url) => url.type === 'image')
									.map((image, index) => (
										<div
											key={index}
											style={{width: 300, margin: 20, position: 'relative'}}
										>
											<Image
												src={convertImageURL(image.string_url)}
												alt="Land Image"
												style={{
													width: '100%',
													height: 200,

													objectFit: 'cover',
												}}
											/>
											<Button
												type="primary"
												danger
												style={{position: 'absolute', top: 10, right: 10}}
												onClick={() => handleRemoveImage(image)}
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

						<div
							className={styles.bookingItem}
							style={{flexDirection: 'column', alignItems: 'flex-start'}}
						>
							<p className={styles.title}>Video:</p>
							<div style={{display: 'flex', flexWrap: 'wrap'}}>
								{landData.url
									.filter((url) => url.type === 'video')
									.map((video, index) => (
										<div
											style={{
												marginBottom: '10px',
												display: 'flex',
												alignItems: 'center',
												position: 'relative',
											}}
											key={index}
										>
											<video
												src={convertImageURL(video.string_url)}
												controls
												style={{width: '300px', margin: 20, height: 200}}
											/>
											<Button
												type="primary"
												danger
												style={{position: 'absolute', top: 10, right: 10}}
												onClick={() => handleRemoveImage(video)}
											>
												Xóa
											</Button>
										</div>
									))}
							</div>
							<Upload
								beforeUpload={() => false} // Prevent automatic upload
								showUploadList={false}
								onChange={handleVideoUpload}
							>
								<Button type="primary" style={{margin: 20}} icon={<PlusOutlined />}>
									Tải video lên
								</Button>
							</Upload>
						</div>
						{/* upload video */}
						<div></div>
					</div>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tiêu đề:</p>
							<Input
								name="title"
								value={landData.title}
								onChange={(e) => {
									const updatedTitle = e.target.value;
									setLandData({
										...landData,
										title: updatedTitle,
									});
									if (updatedTitle.trim() === '') {
										setErrors({
											...errors,
											title: 'Trường này không được để trống',
										});
									} else {
										const {['title']: removedError, ...rest} = errors;
										setErrors(rest);
									}
								}}
								style={{width: '50%'}}
							/>
							{errors['title'] && <p className={styles.error}>{errors['title']}</p>}
						</div>
						<div>
							<p style={{fontSize: '1em', fontWeight: 'bold'}}>Mô tả:</p>
							<TextEditor
								initialValue={landData.description} // Pass initial value from Formik
								onChange={handleEditorChange}
							/>
							{errors['description'] && (
								<p className={styles.error}>{errors['description']}</p>
							)}
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};
