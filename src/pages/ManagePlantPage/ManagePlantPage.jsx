import {Button, DatePicker, Input, Popconfirm, Select, Space, Table, Tag, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManagePlantPage.module.css';
import {formatNumber} from '../../utils';
import {ManagePlantDetailModal} from './ManagePlantDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManagePlantUpdateModal} from './ManagePlantUpdateModal';
import {ManagePlantCreateModal} from './ManagePlantCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {getPlantList, removePlant} from '../../redux/slices/plantSlice';
import {isLoadingPlant, plantListSelector} from '../../redux/selectors';

const data = [
	{
		plantId: 'GC001',
		plantName: 'Dưa lưới',
		plantType: 'Rau ăn quả',
		growthTime: 120,
		averageYield: 100,
		status: 'Đang hỗ trợ',
		process: 'Quy trình trồng dưa lưới',
		purchasedPrice: 200000,
	},
	{
		plantId: 'GC002',
		plantName: 'Dưa hấu',
		plantType: 'Rau ăn quả',
		growthTime: 120,
		averageYield: 100,
		status: 'Ngừng hỗ trợ',
		process: 'Quy trình trồng dưa hấu',
		purchasedPrice: 200000,
	},
	{
		plantId: 'GC003',
		plantName: 'Dưa leo',
		plantType: 'Rau ăn quả',
		growthTime: 120,
		averageYield: 100,
		status: 'Đang hỗ trợ',
		process: 'Quy trình trồng dưa leo',
		purchasedPrice: 200000,
	},
	{
		plantId: 'GC004',
		plantName: 'Dưa lưới',
		plantType: 'Rau ăn quả',
		growthTime: 120,
		averageYield: 100,
		status: 'Đang hỗ trợ',
		process: 'Quy trình trồng dưa lưới',
		purchasedPrice: 200000,
	},
	{
		plantId: 'GC005',
		plantName: 'Dưa lưới',
		plantType: 'Rau ăn quả',
		growthTime: 120,
		averageYield: 100,
		status: 'Tạm ngừng',
		process: 'Quy trình trồng dưa lưới',
		purchasedPrice: 200000,
	},
	{
		plantId: 'GC006',
		plantName: 'Dưa lưới',
		plantType: 'Rau ăn quả',
		growthTime: 120,
		averageYield: 100,
		status: 'Ngừng hỗ trợ',
		process: 'Quy trình trồng dưa lưới',
		purchasedPrice: 200000,
	},
];

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
			render: (text, record, index) => index + 1,
		},
		// {
		// 	title: 'ID giống cây',
		// 	dataIndex: 'id',
		// 	key: 'id',
		// 	render: (text) => <a>{text}</a>,
		// },
		{
			title: 'Tên giống cây',
			dataIndex: 'name',
			key: 'name',
		},
		// {
		// 	title: 'Thời gian sinh trưởng (ngày)',
		// 	dataIndex: 'growthTime',
		// 	key: 'growthTime',
		// },
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
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá giống cây"
						description="Bạn muốn xoá giống cây này?"
						onConfirm={(e) => handleRemovePlant(e, record.id)}
						onCancel={(e) => e.stopPropagation()}
						okText="Xoá"
						cancelText="Huỷ"
					>
						<Button color="danger" variant="filled" icon={<DeleteOutlined />}></Button>
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

	const handleRemovePlant = (e, plantId) => {
		e.stopPropagation();
		console.log('Remove Plant', plantId);
		dispatch(removePlant(plantId))
			.then((response) => {
				console.log('remove response: ' + JSON.stringify(response));
				if (response.payload && response.payload.statusCode == 200) {
					message.success('Xoá giống cây thành công!');
					fetchPlantList(1);
				} else {
					message.error('Xoá giống cây thất bại!');
				}
			})
			.catch((error) => {
				console.log('remove error: ' + error);
			});
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedPlant(null);
	};

	const handleUpdateModalClose = () => {
		setIsUpdateModalOpen(false);
		setSelectedPlant(null);
	};

	const handleCreateModalClose = () => {
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
					loading={isLoadingPlant}
					dataSource={plantList.plants || []}
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

				<ManagePlantUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedPlant={selectedPlant}
				/>

				<ManagePlantCreateModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
					selectedPlant={selectedPlant}
				/>
			</div>
		</div>
	);
};
