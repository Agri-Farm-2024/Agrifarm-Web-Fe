import {Button, DatePicker, Image, Input, Popconfirm, Select, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageMaterialPage.module.css';
import {convertImageURL, formatNumber} from '../../utils';
import {ManageMaterialDetailModal} from './ManageMaterialDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageMaterialUpdateModal} from './ManageMaterialUpdateModal';
import {ManageMaterialCreateModal} from './ManageMaterialCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {getMaterial} from '../../redux/slices/materialSlice';
import {isLoadingMaterial, materialListSelector} from '../../redux/selectors';
import {imageExporter} from '../../assets/images';

const statusOptions = [
	{
		value: 'Có sẵn',
		label: 'Có sẵn',
	},
	{
		value: 'Sắp hết',
		label: 'Sắp hết',
	},
	{
		value: 'Hết hàng',
		label: 'Hết hàng',
	},
];

const materialTypeOptions = [
	{
		value: 'Hạt giống',
		label: 'Hạt giống',
	},
	{
		value: 'Thuốc BVTV',
		label: 'Thuốc BVTV',
	},
	{
		value: 'Phân bón',
		label: 'Phân bón',
	},
	{
		value: 'Dụng cụ nông nghiệp',
		label: 'Dụng cụ nông nghiệp',
	},
	{
		value: 'Thiết bị',
		label: 'Thiết bị',
	},
	{
		value: 'Vật tư',
		label: 'Vật tư',
	},
];

export const ManageMaterialPage = () => {
	const columns = [
		// {
		// 	title: 'ID vật tư',
		// 	dataIndex: 'material_id',
		// 	key: 'material_id',
		// 	render: (text) => <a>{text}</a>,
		// },
		{
			title: 'Ảnh vật tư',
			dataIndex: 'image_material',
			key: 'image_material',
			render: (img) => (
				<Image
					src={img ? `${convertImageURL(img)}` : imageExporter.placeHolderImg}
					alt="Material Image"
					style={{
						width: 100,
						borderRadius: 5,
						objectFit: 'contain',
						objectPosition: 'center',
					}}
					preview={false}
					fallback={imageExporter.placeHolderImg}
				/>
			),
		},
		{
			title: 'Tên vật tư',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Loại vật tư',
			dataIndex: 'type',
			key: 'type',
			render: (text) => (
				<>
					{text == 'buy' ? (
						<Tag color="magenta">Bán</Tag>
					) : (
						<Tag color="volcano">Cho thuê</Tag>
					)}
				</>
			),
		},
		{
			title: 'Đơn vị tính',
			dataIndex: 'unit',
			key: 'unit',
			render: (_, {unit}) => (
				<>
					{unit == 'package' && <Tag color="purple">Túi</Tag>}
					{unit == 'bag' && <Tag color="geekblue">Bao</Tag>}
					{unit == 'piece' && <Tag color="orange">Cái</Tag>}
					{unit == 'bottle' && <Tag color="cyan">Chai</Tag>}
					{unit == 'square_meter' && <Tag color="magenta">m2</Tag>}
				</>
			),
		},
		{
			title: 'Số lượng',
			dataIndex: 'total_quantity',
			key: 'total_quantity',
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'available' && <Tag color="green">Có sẵn</Tag>}
					{status == 'out_of_stock' && <Tag color="red">Hết hàng</Tag>}
					{status == 'low' && <Tag color="gold">Sắp hết</Tag>}
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
							setSelectedMaterial(record);
							setIsUpdateModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					{/* <Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá vật tư"
						description="Bạn muốn xoá vật tư này?"
						onConfirm={handleRemoveMaterial}
						onCancel={(e) => e.stopPropagation()}
						okText="Xoá"
						cancelText="Huỷ"
					>
						<Button color="danger" variant="filled" icon={<DeleteOutlined />}></Button>
					</Popconfirm> */}
				</Space>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [selectedMaterial, setSelectedMaterial] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);
	const [filterType, setFilterType] = useState('');

	const dispatch = useDispatch();

	const materialList = useSelector(materialListSelector);
	const loading = useSelector(isLoadingMaterial);

	useEffect(() => {
		fetchMaterialList(1);
	}, [filterType]);

	const fetchMaterialList = (pageNumber) => {
		console.log('filterType: ' + filterType);
		try {
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
				material_type: filterType,
			};
			dispatch(getMaterial(params));
		} catch (error) {
			console.log('Error fetching material list: ' + error);
		}
	};

	const handleRowClick = (record) => {
		setSelectedMaterial(record);
		setIsModalOpen(true);
	};

	const handleRemoveMaterial = (e) => {
		e.stopPropagation();
		console.log('Remove Material');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedMaterial(null);
	};

	const handleUpdateModalClose = (isUpdateSuccess) => {
		if (isUpdateSuccess) {
			fetchMaterialList(1);
		}
		setIsUpdateModalOpen(false);
		setSelectedMaterial(null);
	};

	const handleCreateModalClose = (isCreateSuccess) => {
		if (isCreateSuccess) {
			fetchMaterialList(1);
		}
		setIsCreateModalOpen(false);
		setSelectedMaterial(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý vật tư</p>
				<div className={styles.filterContainer}>
					{/* <div className={styles.fiterItem}>
						<span>Lọc theo tên vật tư:</span>
						<Input className={styles.filterInput} />
					</div>
					
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
					<div className={styles.fiterItem}>
						<span>Lọc loại vật tư:</span>
						<Select
							className={styles.filterInput}
							placeholder="Chọn loại"
							onChange={(value) => {
								setCurrentPage(1);
								setFilterType(value);
							}}
						>
							<Option value="">Tất cả</Option>
							<Option value="buy">Bán</Option>
							<Option value="rent">Cho thuê</Option>
						</Select>
					</div>

					<Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo vật tư
					</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					loading={loading}
					rowKey="material_id"
					dataSource={(materialList && materialList.materials) || []}
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
						total: materialList.pagination
							? materialList?.pagination.total_page * pageSize //total items
							: 1,
						onChange: (page) => {
							fetchMaterialList(page);
						},
					}}
					className={styles.table}
				/>

				<ManageMaterialDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedMaterial={selectedMaterial}
				/>

				<ManageMaterialUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedMaterial={selectedMaterial}
				/>

				<ManageMaterialCreateModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
					selectedMaterial={selectedMaterial}
				/>
			</div>
		</div>
	);
};
