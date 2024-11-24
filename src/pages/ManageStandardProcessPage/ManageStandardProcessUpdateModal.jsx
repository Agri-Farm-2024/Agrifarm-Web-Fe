import React, {useEffect, useState} from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, message} from 'antd';
import dayjs from 'dayjs';
import {DeleteOutlined} from '@ant-design/icons';
import {ProcessPlanComponent} from './ProcessPlanComponent';
import {useDispatch} from 'react-redux';
import {getMaterial} from '../../redux/slices/materialSlice';
import {updateStandardProcess} from '../../redux/slices/processSlice';

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

	const [materialPageNumber, setMaterialPageNumber] = useState(1);
	const [materialOptions, setMaterialOptions] = useState([]);
	const [hasMoreMaterials, setHasMoreMaterials] = useState(true);
	const [materialLoading, setMaterialLoading] = useState(false);
	const [processLoading, setProcessLoading] = useState(false);

	const dispatch = useDispatch();

	const onFinish = (values) => {
		try {
			form.validateFields();
			console.log('Update standard process submit:', values);

			const scheduleData = values.plantingSchedule.map((schedule, index) => ({
				process_technical_standard_stage_id:
					schedule?.process_technical_standard_stage_id || null,
				stage_title: schedule.stage_title,
				stage_numberic_order: schedule?.stage_numberic_order || null,
				time_start: schedule.time_start,
				time_end: schedule.time_end,
				content: schedule.process_standard_stage_content.map((stageItem, index) => ({
					process_technical_standard_stage_content_id:
						stageItem?.process_technical_standard_stage_content_id || null,
					title: stageItem.title,
					content_numberic_order: stageItem?.content_numberic_order || null,
					content: stageItem.content,
					time_start: stageItem.time_start,
					time_end: stageItem.time_end,
					is_deleted: stageItem?.is_deleted || null,
				})),
				material: schedule.process_standard_stage_material.map((materialItem, index) => ({
					process_technical_standard_stage_material_id:
						materialItem?.process_technical_standard_stage_material_id || null,
					material_id: materialItem.material_id,
					quantity: materialItem.quantity,
					is_deleted: materialItem?.is_deleted || null,
				})),
			}));

			const formData = {
				process_technical_standard_id: selectedProcess.process_technical_standard_id,
				name: values.processName,
				stage: scheduleData,
			};

			console.log('Update process formData: ' + JSON.stringify(formData));
			setProcessLoading(true);
			dispatch(updateStandardProcess(formData)).then((response) => {
				console.log('Reponse update standard process: ' + JSON.stringify(response));
				setProcessLoading(false);
				if (response.payload.statusCode != 200) {
					message.error('Cập nhật quy trình thất bại!');
				}

				if (response.payload.statusCode == 200) {
					message.success('Cập nhật quy trình thành công!');
					handleModalClose(true);
				}
			});
		} catch (error) {
			setProcessLoading(false);
			console.log('Error updating standard process', error);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const fetchMaterialOptions = (pageIndex) => {
		const formData = {
			page_index: pageIndex,
			page_size: 20,
		};
		setMaterialLoading(true);
		dispatch(getMaterial(formData))
			.then((response) => {
				console.log('response:', response);
				setMaterialLoading(false);
				if (response.payload && response.payload.materials) {
					const newOptions = response.payload.materials.map((option, index) => ({
						key: index + option.name,
						label: option.name,
						value: option.material_id,
					}));
					console.log('newOptions:', newOptions);
					setMaterialOptions(newOptions);

					//Check whether has more options to fetch
					if (response.payload.pagination.total_page == pageIndex) {
						setHasMoreMaterials(false);
					}
				} else {
					setMaterialLoading(false);
					console.log('Fetch material failed', response);
				}
			})
			.catch((error) => {
				setMaterialLoading(false);
				console.log('Error', error);
			});
	};

	const handleScroll = (e) => {
		const {target} = e;
		if (
			target.scrollTop + target.offsetHeight === target.scrollHeight &&
			hasMoreMaterials &&
			!materialLoading
		) {
			// Load more options when scrolled to the bottom and more data is available
			const newPageIndex = materialPageNumber + 1;
			setMaterialPageNumber(newPageIndex);
			fetchMaterialOptions(newPageIndex);
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
			setMaterialOptions(1);
			fetchMaterialOptions(1);

			form.setFieldValue('processName', selectedProcess.name);
			let newArr = {
				...selectedProcess,
				process_standard_stage: [...selectedProcess.process_standard_stage].sort(
					(a, b) => a.stage_numberic_order - b.stage_numberic_order
				),
			};
			form.setFieldValue('plantingSchedule', newArr.process_standard_stage);
		}
	}, [isModalOpen]);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Cập nhật quy trình canh tác chuẩn</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			onOk={() => form.submit()}
			okButtonProps={{loading: processLoading}}
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
					<p>Kế hoạch canh tác</p>
					<ProcessPlanComponent
						materialOptions={materialOptions}
						handleScroll={handleScroll}
						selectedProcess={selectedProcess}
						form={form}
					/>
				</Form>
			)}
		</Modal>
	);
};
