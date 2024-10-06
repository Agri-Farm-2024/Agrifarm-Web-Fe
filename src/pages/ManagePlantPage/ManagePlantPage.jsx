import {Button, DatePicker, Input, Popconfirm, Select, Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import styles from './ManagePlantPage.module.css';
import {formatNumber} from '../../utils';
import {ManagePlantDetailModal} from './ManagePlantDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManagePlantUpdateModal} from './ManagePlantUpdateModal';
import {ManagePlantCreateModal} from './ManagePlantCreateModal';

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
			title: 'ID giống cây',
			dataIndex: 'plantId',
			key: 'plantId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên giống cây',
			dataIndex: 'plantName',
			key: 'plantName',
		},
		{
			title: 'Loại giống cây',
			dataIndex: 'plantType',
			key: 'plantType',
		},
		{
			title: 'Thời gian sinh trưởng (ngày)',
			dataIndex: 'growthTime',
			key: 'growthTime',
		},
		{
			title: 'Năng suất trung bình (kg/m2)',
			dataIndex: 'averageYield',
			key: 'averageYield',
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'Đang hỗ trợ' && (
						<Tag color="green" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Ngừng hỗ trợ' && (
						<Tag color="red" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Tạm ngừng' && (
						<Tag color="gold" key={status}>
							{status}
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
						onConfirm={handleRemovePlant}
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

	const handleRowClick = (record) => {
		setSelectedPlant(record);
		setIsModalOpen(true);
	};

	const handleRemovePlant = (e) => {
		e.stopPropagation();
		console.log('Remove Plant');
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
					<div className={styles.fiterItem}>
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
					</div>
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
					rowKey="plantId"
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
