import {Button, DatePicker, Popconfirm, Select, Space, Table, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {ManagePlantSeasonDetailModal} from './ManagePlantSeasonDetailModal';
import {CaretRightOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManagePlantSeasonUpdateModal} from './ManagePlantSeasonUpdateModal';
import {formatNumber} from '../../utils';
import {ManagePlantSeasonCreateModal} from './ManagePlantSeasonCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {getPlantSeasonList} from '../../redux/slices/plantSlice';
import {isLoadingPlant, plantSeasonListSelector} from '../../redux/selectors';

const data = [
	{
		plantSeasonId: 'MV001',
		plantSeasonName: 'Mùa thuận tháng 9-12',
		plantId: 'GC001',
		plantName: 'Dưa lưới Taki',
		monthStart: '29/06/2022',
		pricePurchasePerKg: 200000,
		priceProcess: 50000000,
		seasonType: 'Mùa thuận',
	},
	{
		plantSeasonId: 'MV002',
		plantSeasonName: 'Mùa thuận tháng 1-4',
		plantId: 'GC001',
		plantName: 'Dưa lưới Taki',
		monthStart: '29/06/2022',
		pricePurchasePerKg: 200000,
		priceProcess: 50000000,
		seasonType: 'Mùa thuận',
	},
	{
		plantSeasonId: 'MV003',
		plantSeasonName: 'Mùa nghịch tháng 5-8',
		monthStart: '29/06/2022',
		plantId: 'GC001',
		plantName: 'Dưa lưới Taki',
		pricePurchasePerKg: 200000,
		priceProcess: 100000000,
		seasonType: 'Mùa nghịch',
	},
	{
		plantSeasonId: 'MV004',
		plantSeasonName: 'Mùa thuận tháng 9-12',
		monthStart: '29/06/2022',
		plantId: 'GC001',
		plantName: 'Dưa lưới Taki',
		pricePurchasePerKg: 200000,
		priceProcess: 50000000,
		seasonType: 'Mùa thuận',
	},
	{
		plantSeasonId: 'MV005',
		plantSeasonName: 'Mùa thuận tháng 9-12',
		monthStart: '29/06/2022',
		plantId: 'GC001',
		plantName: 'Dưa lưới Taki',
		pricePurchasePerKg: 200000,
		priceProcess: 50000000,
		seasonType: 'Mùa thuận',
	},
];

const seasonTypeOptions = [
	{
		value: 'Mùa thuận',
		label: 'Mùa thuận',
	},
	{
		value: 'Mùa nghịch',
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

export const ManagePlantSeasonPage = () => {
	const columns = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
		},
		{
			title: 'Loại cây',
			dataIndex: 'plant',
			key: 'plant',
			render: (plant) => <>{plant.name}</>,
		},
		{
			title: 'Tháng bắt đầu',
			dataIndex: 'month_start',
			key: 'month_start',
		},
		{
			title: 'Đơn giá (VND/kg)',
			dataIndex: 'price_purchase_per_kg',
			key: 'price_purchase_per_kg',
			render: (price) => <>{formatNumber(price)}</>,
		},
		{
			title: 'Giá quy trình theo mùa vụ (VND)',
			dataIndex: 'price_process',
			key: 'price_process',
			render: (price) => <>{formatNumber(price)}</>,
		},
		{
			title: 'Loại mùa vụ',
			key: 'type',
			dataIndex: 'type',
			render: (_, {type}) => (
				<>
					{type == 'in_season' && (
						<Tag color="green" key={type}>
							{type}
						</Tag>
					)}
					{type == 'off_season' && (
						<Tag color="red" key={type}>
							{type}
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
							setSelectedPlantSeason(record);
							setIsUpdateModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá dụng mùa vụ này"
						description="Bạn muốn xoá dụng mùa vụ này?"
						onConfirm={handleStopPlantSeason}
						onCancel={(e) => e.stopPropagation()}
						okText="Xoá dụng"
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
	const [selectedPlantSeason, setSelectedPlantSeason] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const dispatch = useDispatch();

	const plantSeasonList = useSelector(plantSeasonListSelector);
	console.log('plantSeason', plantSeasonList);
	const loading = useSelector(isLoadingPlant);

	useEffect(() => {
		fetchPlantSeasonList(1);
	}, []);

	const fetchPlantSeasonList = (pageNumber) => {
		try {
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
			};
			dispatch(getPlantSeasonList(params));
		} catch (error) {
			console.log('Error fetching plant season list: ' + error);
		}
	};

	const handleRowClick = (record) => {
		setSelectedPlantSeason(record);
		setIsModalOpen(true);
	};

	const handleStopPlantSeason = (e) => {
		e.stopPropagation();
		console.log('handleStopPlantSeason');
	};

	const handleModalClose = (isCreateSucess) => {
		if (isCreateSucess) {
			fetchPlantSeasonList(1);
		}
		setIsModalOpen(false);
		setSelectedPlantSeason(null);
	};

	const handleUpdateModalClose = (isUpdateSucess) => {
		if (isUpdateSucess) {
			fetchPlantSeasonList(currentPage);
		}
		setIsUpdateModalOpen(false);
		setSelectedPlantSeason(null);
	};

	const handleCreateModalClose = () => {
		setIsCreateModalOpen(false);
	};
	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý mùa vụ</p>
				<div className={styles.filterContainer}>
					{/* <div className={styles.fiterItem}>
						<span>Lọc theo loại cây:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn loại cây"
							options={plantTypeOptions}
						></Select>
					</div>
					<div className={styles.fiterItem}>
						<span>Loại mùa vụ:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn loại mùa vụ"
							options={seasonTypeOptions}
						></Select>
					</div> */}

					<Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo mùa vụ
					</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="id"
					loading={loading}
					dataSource={(plantSeasonList && plantSeasonList.plant_seasons) || []}
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
						total: plantSeasonList.pagination
							? plantSeasonList?.pagination.total_page * pageSize //total items
							: 1,
						onChange: (page) => {
							fetchPlantSeasonList(page);
						},
					}}
					className={styles.table}
				/>

				<ManagePlantSeasonDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedPlantSeason={selectedPlantSeason}
				/>

				<ManagePlantSeasonUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedPlantSeason={selectedPlantSeason}
				/>

				<ManagePlantSeasonCreateModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>
			</div>
		</div>
	);
};
