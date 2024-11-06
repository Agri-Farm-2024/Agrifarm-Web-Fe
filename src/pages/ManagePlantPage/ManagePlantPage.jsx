import {Button, DatePicker, Input, Popconfirm, Select, Space, Table, Tag, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManagePlantPage.module.css';
import {formatNumber} from '../../utils';
import {ManagePlantDetailModal} from './ManagePlantDetailModal';
import {DeleteOutlined, EditOutlined, RetweetOutlined} from '@ant-design/icons';
import {ManagePlantUpdateModal} from './ManagePlantUpdateModal';
import {ManagePlantCreateModal} from './ManagePlantCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {deletePlant, getPlantList} from '../../redux/slices/plantSlice';
import {isLoadingPlant, plantListSelector} from '../../redux/selectors';

const statusOptions = [
	{
		value: 'Đang hỗ trợ',
		label: 'Đang hỗ trợ',
	},
	{
		value: 'Tạm ngừng',
		label: 'Tạm ngừng',
	},
	{
		value: 'Ngừng hỗ trợ',
		label: 'Ngừng hỗ trợ',
	},
];

const plantTypeOptions = [
	{
		value: 'Rau ăn quả',
		label: 'Rau ăn quả',
	},
	{
		value: 'Rau ăn củ',
		label: 'Rau ăn củ',
	},
	{
		value: 'Rau ăn lá',
		label: 'Rau ăn lá',
	},
	{
		value: 'Cây ăn quả',
		label: 'Cây ăn quả',
	},
];

export const ManagePlantPage = () => {
	const columns = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
		},
		{
			title: 'Tên giống cây',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Loại đất phù hợp',
			dataIndex: 'land_type_id',
			key: 'land_type_id',
			render: (_, record) => (
				<>
					{record.land_type_id && record.land_type && record.land_type.name && (
						<p>{record.land_type.name}</p>
					)}
				</>
			),
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'active' && (
						<Tag color="green" key={status}>
							Đang hỗ trợ
						</Tag>
					)}
					{status == 'inactive' && (
						<Tag color="red" key={status}>
							Ngừng hỗ trợ
						</Tag>
					)}
				</>
			),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button
						onClick={(e) => {
							e.stopPropagation();
							console.log('CLick');
							setSelectedPlant(record);
							setIsUpdateModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
						disabled={record.status !== 'active'}
					></Button>
					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá giống cây"
						description="Bạn muốn xoá giống cây này?"
						onConfirm={(e) => handleDeletePlant(e, record.plant_id)}
						onCancel={(e) => e.stopPropagation()}
						okText="Xoá"
						cancelText="Huỷ"
					>
						<Button
							disabled={record.status != 'active'}
							color="danger"
							variant="filled"
							icon={<DeleteOutlined />}
						></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [selectedPlant, setSelectedPlant] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const plantList = useSelector(plantListSelector);
	const loading = useSelector(isLoadingPlant);
	console.log(plantList);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchPlantList(1);
	}, []);

	const fetchPlantList = (pageNumber) => {
		try {
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
			};
			dispatch(getPlantList(params));
		} catch (error) {
			console.log('Error fetching plant list: ' + error);
		}
	};

	const handleRowClick = (record) => {
		setSelectedPlant(record);
		setIsModalOpen(true);
	};

	const handleDeletePlant = (e, plantId, isDelete) => {
		e.stopPropagation();
		console.log('Remove Plant', plantId);
		const formData = {
			plantId: plantId,
		};
		dispatch(deletePlant(formData))
			.then((response) => {
				console.log('remove response: ' + JSON.stringify(response));
				if (response.payload && response.payload.statusCode == 200) {
					message.success('Xoá giống cây thành công!');
					fetchPlantList(currentPage);
				} else {
					message.error('Xoá giống cây thất bại!');
				}
			})
			.catch((error) => {
				message.error('Xoá giống cây thất bại!');
				console.log('remove error: ' + error);
			});
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedPlant(null);
	};

	const handleUpdateModalClose = (isUpdateSucess) => {
		if (isUpdateSucess) {
			fetchPlantList(currentPage);
		}
		setIsUpdateModalOpen(false);
		setSelectedPlant(null);
	};

	const handleCreateModalClose = (isCreateSucess) => {
		if (isCreateSucess) {
			console.log('Fetching new plant list when create a new plant');
			fetchPlantList(1);
		}
		setIsCreateModalOpen(false);
		setSelectedPlant(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý giống cây</p>
				<div className={styles.filterContainer}>
					{/* <div className={styles.fiterItem}>
						<span>Lọc theo tên giống cây:</span>
						<Input className={styles.filterInput} />
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo loại giống cây:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn loại giống cây"
							options={plantTypeOptions}
						></Select>
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo trạng thái:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn trạng thái"
							options={statusOptions}
						></Select>
					</div> */}
					<Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo giống cây
					</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="id"
					loading={loading}
					dataSource={(plantList && plantList.plants) || []}
					columns={columns}
					scroll={{x: 'max-content'}}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					rowClassName={(record, index) =>
						index % 2 === 0 ? styles.evenRow : styles.oddRow
					}
					pagination={{
						pageSize: pageSize,
						current: currentPage,
						total: plantList.pagination
							? plantList?.pagination.total_page * pageSize //total items
							: 1,
						onChange: (page) => {
							fetchPlantList(page);
						},
					}}
					className={styles.table}
				/>

				<ManagePlantDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedPlant={selectedPlant}
				/>

				<ManagePlantCreateModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>

				<ManagePlantUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedPlant={selectedPlant}
				/>
			</div>
		</div>
	);
};
