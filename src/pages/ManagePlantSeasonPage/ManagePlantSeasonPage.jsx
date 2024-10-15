import {Button, DatePicker, Popconfirm, Select, Space, Table, Tag, Tooltip} from 'antd';
import React, {useState} from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {ManagePlantSeasonDetailModal} from './ManagePlantSeasonDetailModal';
import {CaretRightOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManagePlantSeasonUpdateModal} from './ManagePlantSeasonUpdateModal';
import {formatNumber} from '../../utils';
import {ManagePlantSeasonCreateModal} from './ManagePlantSeasonCreateModal';

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
			title: 'ID mùa vụ',
			dataIndex: 'plantSeasonId',
			key: 'plantSeasonId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên mùa vụ',
			dataIndex: 'plantSeasonName',
			key: 'plantSeasonName',
		},
		{
			title: 'Loại cây',
			dataIndex: 'plantName',
			key: 'plantName',
		},
		{
			title: 'Tháng bắt đầu',
			dataIndex: 'monthStart',
			key: 'monthStart',
		},
		{
			title: 'Đơn giá',
			dataIndex: 'pricePurchasePerKg',
			key: 'pricePurchasePerKg',
		},
		{
			title: 'Giá quy trình theo mùa vụ (VND)',
			dataIndex: 'priceProcess',
			key: 'priceProcess',
			render: (price) => <>{formatNumber(price)}</>,
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

	const handleRowClick = (record) => {
		setSelectedPlantSeason(record);
		setIsModalOpen(true);
	};

	const handleStopPlantSeason = (e) => {
		e.stopPropagation();
		console.log('handleStopPlantSeason');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedPlantSeason(null);
	};

	const handleUpdateModalClose = () => {
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
					<div className={styles.fiterItem}>
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
					</div>

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
					rowKey="PlantSeasonId"
					dataSource={data}
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
						total: totalPage * pageSize,
						onChange: (page) => {
							setCurrentPage(page);
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
