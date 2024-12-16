import {Form, Modal, Select, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {useDispatch} from 'react-redux';
import {getPlantSeasonList} from '../../redux/slices/plantSlice';
import {getUserList} from '../../redux/slices/userSlice';
import {
	assignForTask,
	createStandardProcessRequest,
	getRequestById,
} from '../../redux/slices/requestSlice';

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

const PAGE_SIZE = 50;

export const ManageStandardProcessCreateRequestModal = ({handleModalClose, isModalOpen}) => {
	const [form] = Form.useForm();

	const [plantSeasonOptions, setPlantSeasonOptions] = useState([]);
	const [plantSeasonPageNumber, setPlantSeasonPageNumber] = useState(1);
	const [hasMorePlantSeason, setHasMorePlantSeason] = useState(true);

	const [expertOptions, setExpertOptions] = useState([]);
	const [expertPageNumber, setExpertPageNumber] = useState(1);
	const [hasMoreExpert, setHasMoreExpert] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const fetchPlantSeasonOptions = (pageIndex) => {
		const formData = {
			page_index: pageIndex,
			page_size: PAGE_SIZE,
		};

		dispatch(getPlantSeasonList(formData))
			.then((response) => {
				console.log('response:', response);
				if (response.payload && response.payload.plant_seasons) {
					const filterSeason = response.payload.plant_seasons.filter(
						(season) => season?.process_technical_standard == null
					);
					const newOptions = filterSeason.map((option, index) => ({
						key: index + option.plant_season_id,
						label: `Mùa vụ ${option.plant.name} Tháng ${option.month_start}`,
						value: option.plant_season_id,
					}));
					console.log('plantSeason newOptions:', newOptions);
					setPlantSeasonOptions(newOptions);

					//Check whether has more options to fetch
					if (response.payload.pagination.total_page == pageIndex) {
						setHasMorePlantSeason(false);
					}
				} else {
					console.log('Fetch plant season failed', response);
				}
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};

	const handleScrollPlantSeasonOption = (e) => {
		const {target} = e;
		if (
			target.scrollTop + target.offsetHeight === target.scrollHeight &&
			hasMorePlantSeason &&
			!isLoading
		) {
			// Load more options when scrolled to the bottom and more data is available
			const newPageIndex = plantSeasonPageNumber + 1;
			setPlantSeasonPageNumber(newPageIndex);
			fetchPlantSeasonOptions(newPageIndex);
		}
	};

	const fetchExpertOptions = (pageIndex) => {
		const formData = {
			page_index: pageIndex,
			page_size: PAGE_SIZE,
			role: 3,
		};

		dispatch(getUserList(formData))
			.then((response) => {
				if (response.payload && response.payload.users) {
					const newOptions = response.payload.users.map((option, index) => ({
						key: index + option.user_id,
						label: option.full_name,
						value: option.user_id,
					}));
					console.log('expert newOptions:', newOptions);
					setExpertOptions(newOptions);

					//Check whether has more options to fetch
					if (response.payload.pagination.total_page == pageIndex) {
						setHasMoreExpert(false);
					}
				} else {
					console.log('Fetch expert list failed', response);
				}
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};

	const handleScrollExpertOption = (e) => {
		const {target} = e;
		if (
			target.scrollTop + target.offsetHeight === target.scrollHeight &&
			hasMoreExpert &&
			!isLoading
		) {
			// Load more options when scrolled to the bottom and more data is available
			const newPageIndex = expertPageNumber + 1;
			setExpertPageNumber(newPageIndex);
			fetchExpertOptions(newPageIndex);
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			fetchPlantSeasonOptions(1);
			fetchExpertOptions(1);
		}
	}, [isModalOpen]);

	const assignExpertToTask = (taskId, expertId) => {
		try {
			dispatch(
				assignForTask({
					taskID: taskId,
					staffID: expertId,
				})
			).then((assignTaskResponse) => {
				console.log('Assign task response:', assignTaskResponse);
				if (assignTaskResponse.payload.statusCode !== 200) {
					message.error('Gửi yêu cầu tạo quy trình chuẩn thất bại');
					console.log('Assign task failed!');
				}

				if (assignTaskResponse.payload.statusCode === 200) {
					message.success('Gửi yêu cầu tạo quy trình chuẩn thành công.');
					handleModalClose();
				}
			});
		} catch (error) {
			console.log('Failed to assign to task ' + error);
			message.error('Gửi yêu cầu tạo quy trình chuẩn thất bại');
		}
	};

	const fetchRequestById = (requestId, expertId) => {
		try {
			dispatch(getRequestById(requestId)).then((requestDetailResponse) => {
				console.log('Get request id response:', requestDetailResponse);
				if (requestDetailResponse.payload && requestDetailResponse.payload.statusCode) {
					//Catch Error message
					if (requestDetailResponse.payload.statusCode !== 200) {
						message.error('Gửi yêu cầu tạo quy trình chuẩn thất bại');
						console.log('Get detail failed!');
					}

					if (requestDetailResponse.payload.statusCode === 200) {
						assignExpertToTask(
							requestDetailResponse.payload.metadata.task.task_id,
							expertId
						);
					}
				}
			});
		} catch (error) {
			console.log('Failed to fetch request by id', error);
			message.error('Gửi yêu cầu tạo quy trình chuẩn thất bại');
		}
	};

	const onFinish = (values) => {
		console.log('Success:', values);
		try {
			dispatch(createStandardProcessRequest({plant_season_id: values.plantSeason})).then(
				(response) => {
					console.log('create standard process response:', response);
					if (response.payload && response.payload.statusCode) {
						//Catch Error message
						if (response.payload.statusCode !== 201) {
							// if (response.payload.message === 'Plant season already exist') {
							// 	message.error(`Mùa vụ đã tồn tại`);
							// }
							message.error('Gửi yêu cầu tạo quy trình chuẩn thất bại');
							console.log('Create request failed!');
						}

						if (response.payload.statusCode === 201) {
							fetchRequestById(
								response.payload.metadata.request_id,
								values.expertResponsible
							);
						}
					}
				}
			);
		} catch (error) {
			console.log('Error assign expert', error);
			message.error('Gửi yêu cầu tạo quy trình chuẩn thất bại');
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Yêu cầu tạo quy trình canh tác chuẩn</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okText="Gửi"
			cancelText="Huỷ"
			centered
			width={800}
		>
			<Form
				form={form}
				name="CreateStandardProcessRequest"
				labelCol={{
					span: 8,
				}}
				labelAlign="left"
				wrapperCol={{
					span: 16,
				}}
				size="large"
				className={styles.formCreateContainer}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Mùa vụ"
					name="plantSeason"
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
						placeholder="Chọn mùa vụ"
						onPopupScroll={handleScrollPlantSeasonOption}
						options={plantSeasonOptions || []}
					></Select>
				</Form.Item>
				<Form.Item
					label="Nhân viên phụ trách"
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
						options={expertOptions || []}
						onPopupScroll={handleScrollExpertOption}
					></Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
