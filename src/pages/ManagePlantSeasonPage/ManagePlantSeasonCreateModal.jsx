import React, {useEffect, useState} from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {DatePicker, Form, Input, InputNumber, Modal, Select, Spin, message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {createCrop, getPlantList} from '../../redux/slices/plantSlice';
import {isLoadingPlant} from '../../redux/selectors';

const seasonTypeOptions = [
	{
		value: 'in_season',
		label: 'Mùa thuận',
	},
	{
		value: 'out_season',
		label: 'Mùa nghịch',
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
export const ManagePlantSeasonCreateModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const plantTypeOptionsLoading = useSelector(isLoadingPlant);

	const [plantPageNumber, setPlantPageNumber] = useState(1);
	const [plantTypeOptions, setPlantTypeOptions] = useState([]);
	const [hasMorePlants, setHasMorePlants] = useState(true);

	const onFinish = (values) => {
		console.log('Success:', values);
		const formData = {
			month_start: values.monthStart,
			price_process: values.priceProcess,
			price_purchase_per_kg: values.pricePurchasePerKg,
			type: values.seasonType,
			plant_id: values.plantType,
		};

		dispatch(createCrop(formData))
			.then((response) => {
				console.log('response', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode === 201) {
						message.success('Tạo mùa vụ thành công.');
						handleModalClose();
					}
				}
			})
			.catch((err) => {
				message.error('Tạo mùa vụ thất bại');
				console.log('Tạo mùa vụ thất bại', err);
			});
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const fetchPlantTypeOptions = (pageIndex) => {
		const formData = {
			page_index: pageIndex,
			page_size: 10,
		};

		dispatch(getPlantList(formData))
			.then((response) => {
				console.log('response:', response);
				if (response.payload && response.payload.statusCode) {
					if (response.payload.statusCode === 200) {
						const newOptions = response.payload.metadata.plants.map(
							(option, index) => ({
								key: index + option.name,
								label: option.name,
								value: option.id || index + option.name,
							})
						);
						console.log('newOptions:', newOptions);
						setPlantTypeOptions(newOptions);

						//Check whether has more options to fetch
						if (response.payload.metadata.pagination.total_page == pageIndex) {
							setHasMorePlants(true);
						}
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
		if (target.scrollTop + target.offsetHeight === target.scrollHeight && hasMore && !loading) {
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
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Tạo mùa vụ</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Tạo"
			cancelText="Đóng"
			centered
			width={800}
		>
			<Form
				form={form}
				name="CreatePlantSeason"
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
					label="Tháng bắt đầu"
					name="monthStart"
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
					label="Loại cây"
					name="plantType"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<Select
						loading={plantTypeOptionsLoading}
						className={styles.inputField}
						allowClear
						placeholder="Chọn loại cây"
						notFoundContent={plantTypeOptionsLoading ? <Spin size="small" /> : null}
						options={plantTypeOptions}
						onPopupScroll={handleScroll}
					></Select>
				</Form.Item>

				<Form.Item
					label="Đơn giá (VND/kg)"
					name="pricePurchasePerKg"
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

				<Form.Item
					label="Giá quy trình theo mùa vụ (VND)"
					name="priceProcess"
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
					name="seasonType"
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
					></Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
