import React, {useState} from 'react';
import styles from './ManageLandPage.module.css';
import {Image, Modal, Input, Select, Upload, Button, message, InputNumber} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {createLand} from '../../redux/slices/landSlice';
import TextEditor from './TextEditor';
import {uploadFile} from '../../services/uploadService';

export const ManageLandAddModal = ({handleModalClose, isModalOpen}) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [landData, setLandData] = useState({
		nameLand: '',
		area: '',
		pricePermonth: '',
		description: {
			title: '',
			desc: '<p><strong>1. Vị trí và diện tích:</strong>Mảnh đất số 1 nằm ở khu vực trung tâm của trang trại AgriFarm, với diện tích 500 mét vuông. Vị trí này rất thuận lợi, chỉ cách nhà kho và nguồn nước chính của trang trại khoảng 100 mét, giúp bạn dễ dàng tiếp cận và quản lý các hoạt động canh tác.</p><p><br></p><p><strong>2. Điều kiện đất đai:</strong>Mảnh đất số 1 có lớp đất phù sa màu mỡ, giàu dinh dưỡng, rất phù hợp để trồng các loại rau xanh và cây ăn quả như cà chua, xà lách, và dưa leo. Đất đã được cải tạo kỹ lưỡng, đảm bảo độ tơi xốp và khả năng thoát nước tốt, giúp cây trồng phát triển nhanh chóng và khỏe mạnh.</p><p><br></p><p><strong>3. Các dịch vụ hỗ trợ:</strong>Khi thuê mảnh đất số 1 đồng thời sử dụng dịch vụ chăm sóc của AgriFarm, bạn sẽ được hưởng lợi từ các dịch vụ hỗ trợ chuyên nghiệp của AgriFarm, bao gồm tư vấn kỹ thuật trồng trọt, cung cấp phân bón hữu cơ và hỗ trợ kiểm soát sâu bệnh từ đội ngũ chuyên gia nông nghiệp của chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn để đảm bảo mùa vụ đạt năng suất cao nhất.</p>',
		},
		images: [],
		videos: [],
		imagesToAPI: [],
		videosToAPI: [],
		// assignStaff: undefined,
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const {name, value} = e.target;

		setLandData({...landData, [name]: value});

		if (name === 'area') {
			if (!/^\d*\.?\d*$/.test(value) && value.trim() !== '') {
				setErrors({...errors, [name]: 'Trường này chỉ chấp nhận số'});
			} else if (value.trim() === '') {
				setErrors({...errors, [name]: 'Trường này không được để trống'});
			} else if (Number(value) < 1000) {
				setErrors({...errors, [name]: 'Diện tích không được nhỏ hơn 1000 m2'});
			} else if (Number(value) >= 100000) {
				setErrors({...errors, [name]: 'Diện tích không được lớn hơn 100,000 m2'});
			} else {
				const {[name]: removedError, ...rest} = errors;
				setErrors(rest);
			}
		} else if (name === 'pricePermonth') {
			if (!/^\d*\.?\d*$/.test(value) && value.trim() !== '') {
				setErrors({...errors, [name]: 'Trường này chỉ chấp nhận số'});
			} else if (value.trim() === '') {
				setErrors({...errors, [name]: 'Trường này không được để trống'});
			} else if (Number(value) < 500000) {
				setErrors({...errors, [name]: 'Giá thuê phải lớn hơn 500,000 VND'});
			} else {
				const {[name]: removedError, ...rest} = errors;
				setErrors(rest);
			}
		} else {
			if (value.trim() === '') {
				setErrors({...errors, [name]: 'Trường này không được để trống'});
			} else {
				const {[name]: removedError, ...rest} = errors;
				setErrors(rest);
			}
		}
	};

	const handleEditorChange = (content) => {
		setLandData((prevData) => ({
			...prevData,
			description: {
				...prevData.description,
				desc: content,
			},
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

	const handleRemoveImage = (index) => {
		const updatedImages = landData.images.filter((_, imgIndex) => imgIndex !== index);
		setLandData({...landData, images: updatedImages});
	};
	const handleUpload = async ({file}) => {
		// Create a preview URL for the image
		const previewUrl = URL.createObjectURL(file);

		// Update landData to include the new image object
		setLandData({
			...landData,
			images: [...landData.images, {file, previewUrl}],
		});
	};

	const handleRemoveVideo = (index) => {
		const updatedVideos = landData.videos.filter((_, vidIndex) => vidIndex !== index);
		setLandData({...landData, videos: updatedVideos});
	};

	const handleVideoUpload = ({file}) => {
		const maxSizeInMB = 2; // Set max size to 2MB
		const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert to bytes

		if (file.size > maxSizeInBytes) {
			message.error(`Video không được vượt quá ${maxSizeInMB}MB. Hãy tải video khác!`);
			return;
		}

		// Create a preview URL for the video
		const previewURL = URL.createObjectURL(file);

		// Update landData with the file and its preview URL
		setLandData((prevData) => ({
			...prevData,
			videos: [...(prevData.videos || []), {file, previewURL}],
		}));
	};

	const handleUploadFile = () => {
		if (landData.images.length <= 0) {
			message.error(`Hãy tải ảnh lên`);
			return;
		}

		if (landData.videos.length <= 0) {
			message.error(`Hãy tải video lên`);
			return;
		}

		// Upload images
		const imageUploadPromises = landData.images.map((file) =>
			uploadFile(file.file).then((response) => {
				console.log(response.metadata.folder_path);
				return response.metadata.folder_path;
			})
		);

		// Upload videos
		const videoUploadPromises = landData.videos.map((file) =>
			uploadFile(file.file).then((response) => response.metadata.folder_path)
		);

		// Wait for all image and video uploads to complete
		Promise.all(imageUploadPromises)
			.then((uploadedImagesmetadata) => {
				return Promise.all(videoUploadPromises).then((uploadedVideosmetadata) => {
					// Update landData with all uploaded image and video metadata at once
					setLandData((prevLandData) => ({
						...prevLandData,
						imagesToAPI: [...uploadedImagesmetadata],
						videosToAPI: [...uploadedVideosmetadata],
					}));

					// Log trực tiếp các metadata vừa upload xong
					console.log('Uploaded images metadata:', uploadedImagesmetadata);
					console.log('Uploaded videos metadata:', uploadedVideosmetadata);
					handleSubmit({images: uploadedImagesmetadata, videos: uploadedVideosmetadata});
				});
			})
			.catch((error) => {
				console.error('Error uploading files', error);
				// Handle error as needed, e.g., show an error message to the user
			});
	};

	const validateInputs = () => {
		const requiredFields = [
			'nameLand',
			'area',
			'pricePermonth',
			'description.title',
			'description.desc',
			// 'landOfStatus',
			// 'status',
			// 'assignStaff',
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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = ({images, videos}) => {
		if (validateInputs()) {
			const landInfor = {
				name: landData.nameLand,
				title: landData.description?.title,
				description: landData.description?.desc,
				acreage_land: Number(landData.area),
				price_booking_per_month: Number(landData.pricePermonth),
				land_type_id: '28efc93c-1ead-498f-acd1-62ba0e52fe2c', //default
				images: images,
				videos: videos,
			};
			console.log(landInfor);
			const hideLoading = message.loading('Đang xử lí...', 0);
			setLoading(true);
			dispatch(createLand(landInfor))
				.then((res) => {
					console.log(res);
					setLoading(false);
					hideLoading();
					if (res.payload.statusCode !== 201) {
						if (res.payload.message === 'Land name already exist') {
							message.error(`Tên mảnh đất đã tồn tại trên trang trại`);
						}
						if (res.payload.message === 'numeric field overflow') {
							message.error(`Diện tích vượt quá quy định`);
						}
					}
					if (res.payload.statusCode === 201) {
						message.success('Tạo mảnh đất thành công.');
						handleModalClose();
						// Reset landData
						setLandData({
							nameLand: '',
							area: '',
							pricePermonth: '',
							description: {
								title: '',
								desc: '',
							},
							images: [],
							videos: [],
						});
					}
				})
				.catch((err) => {
					hideLoading();
					message.error('Unexpected error:', err);
				});
		} else {
			message.error('Hãy điền đủ trường nhé');
		}
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thêm mảnh đất</span>}
			open={isModalOpen}
			onCancel={() => {
				setLandData({
					nameLand: '',
					area: '',
					pricePermonth: '',
					images: [],
					videos: [],
				});
				handleModalClose();
			}}
			onOk={handleUploadFile}
			style={{top: 20}}
			cancelText="Hủy"
			width={'max-content'}
			okText="Thêm"
			okButtonProps={{disabled: Object.keys(errors).length > 0, loading: loading}}
		>
			<div className={styles.modalContainer} style={{minHeight: 500}}>
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
							<p className={styles.title}>Diện tích(m2):</p>
							<Input
								name="area"
								value={landData.area}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['area'] && <p className={styles.error}>{errors['area']}</p>}
						</div>
						{/* <div className={styles.bookingItem}>
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
						</div> */}
						{/* <div className={styles.bookingItem}>
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
						</div> */}
						<div className={styles.bookingItem}>
							<p className={styles.title}>Giá thuê mỗi tháng:</p>
							<Input
								name="pricePermonth"
								value={landData.pricePermonth}
								onChange={handleChange}
								style={{width: '50%'}}
							/>
							{errors['pricePermonth'] && (
								<p className={styles.error}>{errors['pricePermonth']}</p>
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
											src={image.previewUrl}
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
								accept="image/*"
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
								{landData.videos &&
									landData.videos.map((video, index) => (
										<div
											key={index}
											style={{
												marginBottom: '10px',
												display: 'flex',
												alignItems: 'center',
												position: 'relative',
											}}
										>
											<video
												src={video.previewURL}
												controls
												style={{width: '200px', margin: 20, height: 200}}
											/>
											<Button
												type="primary"
												danger
												style={{position: 'absolute', top: 10, right: 10}}
												onClick={() => handleRemoveVideo(index)}
											>
												Xóa
											</Button>
										</div>
									))}
							</div>
							<Upload
								accept="video/*"
								showUploadList={false}
								customRequest={({file}) => handleVideoUpload({file})}
							>
								<Button type="primary" style={{margin: 20}} icon={<PlusOutlined />}>
									Tải video lên
								</Button>
							</Upload>
						</div>
					</div>
					<div>
						<div className={styles.bookingItem}>
							<p className={styles.title}>Tiêu đề:</p>
							<Input
								name="title"
								value={landData.description?.title}
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
						<div>
							<p style={{fontSize: '1em', fontWeight: 'bold'}}>Mô tả:</p>
							{/* <Input.TextArea
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
									const { ['description.desc']: removedError, ...rest } = errors;
									setErrors(rest);
								}
								}}
								style={{ width: '50%' }}
							/> */}
							<TextEditor
								initialValue={landData.description?.desc} // Pass initial value from Formik
								onChange={handleEditorChange}
							/>
							{errors['description.desc'] && (
								<p className={styles.error}>{errors['description.desc']}</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
