import {Button, DatePicker, Input, Popconfirm, Select, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageMaterialPage.module.css';
import {formatNumber} from '../../utils';
import {ManageMaterialDetailModal} from './ManageMaterialDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageMaterialUpdateModal} from './ManageMaterialUpdateModal';
import {ManageMaterialCreateModal} from './ManageMaterialCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {getMaterial} from '../../redux/slices/materialSlice';
import {isLoadingMaterial, materialListSelector} from '../../redux/selectors';

const data = [
	{
		materialId: 'VT001',
		materialName: 'Hạt giống dưa lưới Taki',
		materialType: 'Hạt giống',
		materialMeasure: 'Túi',
		quantity: 100,
		status: 'Có sẵn',
		materialDescription:
			'Mô tả: Hạt giống dưa lưới cao sản, giống lai F1, tỷ lệ nảy mầm cao (trên 90%). Thời gian thu hoạch khoảng 80-90 ngày. Thích hợp cho canh tác theo tiêu chuẩn VietGAP. Đóng gói 100 hạt/túi. Công dụng: Dùng để gieo trồng dưa lưới trong điều kiện khí hậu nhiệt đới.',
	},
	{
		materialId: 'VT002',
		materialName: 'Hạt giống dưa lưới Taki',
		materialType: 'Hạt giống',
		materialMeasure: 'Túi',
		quantity: 100,
		status: 'Có sẵn',
		materialDescription:
			'Mô tả: Hạt giống dưa lưới cao sản, giống lai F1, tỷ lệ nảy mầm cao (trên 90%). Thời gian thu hoạch khoảng 80-90 ngày. Thích hợp cho canh tác theo tiêu chuẩn VietGAP. Đóng gói 100 hạt/túi. Công dụng: Dùng để gieo trồng dưa lưới trong điều kiện khí hậu nhiệt đới.',
	},
	{
		materialId: 'VT003',
		materialName: 'Hạt giống dưa lưới Taki',
		materialType: 'Hạt giống',
		materialMeasure: 'Túi',
		quantity: 100,
		status: 'Có sẵn',
		materialDescription:
			'Mô tả: Hạt giống dưa lưới cao sản, giống lai F1, tỷ lệ nảy mầm cao (trên 90%). Thời gian thu hoạch khoảng 80-90 ngày. Thích hợp cho canh tác theo tiêu chuẩn VietGAP. Đóng gói 100 hạt/túi. Công dụng: Dùng để gieo trồng dưa lưới trong điều kiện khí hậu nhiệt đới.',
	},
	{
		materialId: 'VT004',
		materialName: 'Hạt giống dưa lưới Taki',
		materialType: 'Hạt giống',
		materialMeasure: 'Túi',
		quantity: 100,
		status: 'Hết hàng',
		materialDescription:
			'Mô tả: Hạt giống dưa lưới cao sản, giống lai F1, tỷ lệ nảy mầm cao (trên 90%). Thời gian thu hoạch khoảng 80-90 ngày. Thích hợp cho canh tác theo tiêu chuẩn VietGAP. Đóng gói 100 hạt/túi. Công dụng: Dùng để gieo trồng dưa lưới trong điều kiện khí hậu nhiệt đới.',
	},
	{
		materialId: 'VT005',
		materialName: 'Hạt giống dưa lưới Taki',
		materialType: 'Hạt giống',
		materialMeasure: 'Túi',
		quantity: 100,
		status: 'Sắp hết',
		materialDescription:
			'Mô tả: Hạt giống dưa lưới cao sản, giống lai F1, tỷ lệ nảy mầm cao (trên 90%). Thời gian thu hoạch khoảng 80-90 ngày. Thích hợp cho canh tác theo tiêu chuẩn VietGAP. Đóng gói 100 hạt/túi. Công dụng: Dùng để gieo trồng dưa lưới trong điều kiện khí hậu nhiệt đới.',
	},
	{
		materialId: 'VT006',
		materialName: 'Hạt giống dưa lưới Taki',
		materialType: 'Hạt giống',
		materialMeasure: 'Túi',
		quantity: 100,
		status: 'Có sẵn',
		materialDescription:
			'Mô tả: Hạt giống dưa lưới cao sản, giống lai F1, tỷ lệ nảy mầm cao (trên 90%). Thời gian thu hoạch khoảng 80-90 ngày. Thích hợp cho canh tác theo tiêu chuẩn VietGAP. Đóng gói 100 hạt/túi. Công dụng: Dùng để gieo trồng dưa lưới trong điều kiện khí hậu nhiệt đới.',
	},
];

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
		{
			title: 'ID vật tư',
			dataIndex: 'material_id',
			key: 'material_id',
			render: (text) => <a>{text}</a>,
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
						<Tag color="geekblue">Bán</Tag>
					) : (
						<Tag color="purple">Cho thuê</Tag>
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

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá vật tư"
						description="Bạn muốn xoá vật tư này?"
						onConfirm={handleRemoveMaterial}
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
	const [selectedMaterial, setSelectedMaterial] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const dispatch = useDispatch();

	const materialList = useSelector(materialListSelector);
	const loading = useSelector(isLoadingMaterial);

	useEffect(() => {
		fetchMaterialList(1);
	}, []);

	const fetchMaterialList = (pageNumber) => {
		try {
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
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

	const handleUpdateModalClose = () => {
		setIsUpdateModalOpen(false);
		setSelectedMaterial(null);
	};

	const handleCreateModalClose = () => {
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
					<div className={styles.fiterItem}>
						<span>Lọc theo loại vật tư:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn loại vật tư"
							options={materialTypeOptions}
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
