import React, {useEffect, useState} from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {DatePicker, Form, Input, InputNumber, Modal, Select, message} from 'antd';
import dayjs from 'dayjs';
import {isLoadingPlant} from '../../redux/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {getPlantList, updatePlantSeason} from '../../redux/slices/plantSlice';
import {capitalizeFirstLetter} from '../../utils';

const seasonTypeOptions = [
	{
		label: 'Mùa thuận',
		value: 'in_season',
	},
	{
		label: 'Mùa nghịch',
		value: 'out_season',
	},
];

const plantTypeOptions = [
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
];

const PAGE_SIZE = 50;

export const ManagePlantSeasonUpdateModal = ({
	selectedPlantSeason,
	handleModalClose,
	isModalOpen,
}) => {
	const [form] = Form.useForm();
	const [plantTypeOptions, setPlantTypeOptions] = useState([]);
	const [hasMorePlants, setHasMorePlants] = useState(true);
	const [plantPageNumber, setPlantPageNumber] = useState(1);
	const plantLoading = useSelector(isLoadingPlant);

	const dispatch = useDispatch();

	const onFinish = (values) => {
		console.log('Success:', values);
		const formData = {
			plant_season_id: selectedPlantSeason.plant_season_id,
			...values,
		};
		console.log('Form:', formData);
		dispatch(updatePlantSeason(formData))
			.then((response) => {
				console.log('response', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode !== 200) {
						if (response.payload.message === 'Plant season already exist') {
							message.error(`Mùa vụ đã tồn tại`);
						} else if (
							response.payload.message ===
							'Only one in-season is allowed per plant variety'
						) {
							message.error(`Mùa thuận của loại cây này đã tồn tại`);
						} else if (
							response.payload.message ===
							'Only two out-seasons are allowed per plant variety'
						) {
							message.error(`Cây này đã tồn tại 2 mùa nghịch`);
						} else if (
							response.payload.message ===
							'Plant season already exists with the same plant_id, month_start, and type'
						) {
							message.error(
								`Cây này đã tồn tại mùa vụ tại tháng ${values.month_start}`
							);
						} else if (
							response.payload.message === 'A season already exists at month_start.'
						) {
							message.error(
								`Cây này đã tồn tại mùa vụ tại tháng ${values.month_start}`
							);
						} else if (
							response.payload.message ===
							'A season with a similar month_start already exists for this cultivar.'
						) {
							message.error(
								`Cây này đã tồn tại mùa vụ tại tháng ${values.month_start}`
							);
						} else {
							message.error('Cập nhật mùa vụ thất bại');
						}
					}

					if (response.payload.statusCode === 200) {
						message.success('Cập nhật mùa vụ thành công.');
						handleModalClose(true);
					}
				}
			})
			.catch((err) => {
				message.error('Cập nhật mùa vụ thất bại');
				console.log('Cập nhật mùa vụ thất bại', err);
			});
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const fetchPlantTypeOptions = (pageIndex) => {
		const formData = {
			page_index: pageIndex,
			page_size: PAGE_SIZE,
		};

		dispatch(getPlantList(formData))
			.then((response) => {
				console.log('response:', response);
				if (response.payload && response.payload.plants) {
					const newOptions = response.payload.plants.map((option, index) => ({
						key: index + option.name,
						label: capitalizeFirstLetter(option.name),
						value: option.plant_id || index + option.name,
					}));
					console.log('newOptions:', newOptions);
					setPlantTypeOptions(newOptions);

					//Check whether has more options to fetch
					if (response.payload.pagination.total_page == pageIndex) {
						setHasMorePlants(false);
					}
				} else {
					console.log('Fetch plant type failed', response);
				}
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};

	const handleScroll = (e) => {
		const {target} = e;
		if (
			target.scrollTop + target.offsetHeight === target.scrollHeight &&
			hasMorePlants &&
			!plantLoading
		) {
			// Load more options when scrolled to the bottom and more data is available
			const newPageIndex = plantPageNumber + 1;
			setPlantPageNumber(newPageIndex);
			fetchPlantTypes(newPageIndex);
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			setPlantPageNumber(1);
			fetchPlantTypeOptions(1);
			form.setFieldValue('plant_id', selectedPlantSeason.plant_id);
			form.setFieldValue('month_start', selectedPlantSeason.month_start);
			form.setFieldValue('total_month', selectedPlantSeason.total_month);
			form.setFieldValue('price_purchase_per_kg', selectedPlantSeason.price_purchase_per_kg);
			form.setFieldValue('price_process', selectedPlantSeason.price_process);
			form.setFieldValue('type', selectedPlantSeason.type);
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật mùa vụ</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okButtonProps={{loading: plantLoading}}
			okText="Cập nhật"
			cancelText="Đóng"
			centered
			width={800}
			maskClosable={false}
		>
			{selectedPlantSeason && (
				<Form
					form={form}
					name="UpdatePlantSeason"
					labelCol={{
						span: 8,
					}}
					labelAlign="left"
					wrapperCol={{
						span: 16,
					}}
					size="large"
					className={styles.formContainer}
					style={{paddingBottom: '50px'}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Tháng bắt đầu"
						name="month_start"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								type: 'number',
								min: 1,
								message: 'Tháng không hợp lệ!',
							},
							{
								type: 'number',
								max: 12,
								message: 'Tháng không hợp lệ!',
							},
							{
								type: 'integer',
								message: 'Tháng không hợp lệ!',
							},
						]}
					>
						<InputNumber placeholder="Tháng bắt đầu" className={styles.inputField} />
					</Form.Item>

					<Form.Item
						label="Thời gian trồng của mùa vụ (Tháng)"
						name="total_month"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								type: 'number',
								min: 1,
								message: 'Tháng không hợp lệ!',
							},
							{
								type: 'integer',
								message: 'Tháng không hợp lệ!',
							},
						]}
					>
						<InputNumber placeholder="Thời gian trồng" className={styles.inputField} />
					</Form.Item>

					<Form.Item
						label="Loại cây"
						name="plant_id"
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
							placeholder="Chọn loại cây"
							options={plantTypeOptions || []}
							onPopupScroll={handleScroll}
							disabled={true}
						></Select>
					</Form.Item>

					<Form.Item
						label="Giá quy trình theo mùa vụ"
						name="price_process"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								type: 'number',
								min: 0,
								message: 'Giá không hợp lệ!',
							},
						]}
					>
						<InputNumber
							placeholder="Giá quy trình"
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							className={styles.inputField}
						/>
					</Form.Item>

					<Form.Item
						label="Loại mùa vụ"
						name="type"
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
							placeholder="Chọn loại mùa vụ"
							options={seasonTypeOptions}
							loading={plantLoading}
						></Select>
					</Form.Item>

					<Form.Item
						label="Đơn giá thu mua (VND/kg)"
						name="price_purchase_per_kg"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
							{
								type: 'number',
								min: 0,
								message: 'Giá không hợp lệ!',
							},
						]}
					>
						<InputNumber
							placeholder="Đơn giá"
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							className={styles.inputField}
						/>
					</Form.Item>
					<a
						style={{
							textDecorationLine: 'underline',
							float: 'right',
							fontSize: 12,
						}}
						href="https://gianongsan.org/"
						target="_blank"
					>
						Tham khảo giá thị trường
					</a>
				</Form>
			)}
		</Modal>
	);
};
