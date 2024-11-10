import {Button, DatePicker, Empty, Popconfirm, Select, Space, Table, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageServicePackagePage.module.css';
import {ManageServicePackageDetailModal} from './ManageServicePackageDetailModal';
import {CaretRightOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageServicePackageUpdateModal} from './ManageServicePackageUpdateModal';
import {formatNumber} from '../../utils';
import {ManageServicePackageCreateModal} from './ManageServicePackageCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {isLoadingService, servicePackageListSelector} from '../../redux/selectors';
import {getServicePackageList} from '../../redux/slices/serviceSlice';

const data = [
	{
		servicePackageId: 'DV001',
		servicePackageName: 'Gói VIetGAP hỗ trợ canh tác số 1',
		servicePackageDescription: 'Quy trình canh tác theo chuẩn VietGap cho giống cây trồng.',
		isPurchase: true,
		isMaterial: true,
		isProcessOfPlant: true,
		price: 20000000,
		status: 'Đang áp dụng',
	},
	{
		servicePackageId: 'DV002',
		servicePackageName: 'Gói VIetGAP hỗ trợ canh tác số 1',
		servicePackageDescription: 'Quy trình canh tác theo chuẩn VietGap cho giống cây trồng.',
		isPurchase: true,
		isMaterial: true,
		isProcessOfPlant: true,
		price: 20000000,
		status: 'Ngừng áp dụng',
	},
	{
		servicePackageId: 'DV003',
		servicePackageName: 'Gói VIetGAP hỗ trợ canh tác số 1',
		servicePackageDescription: 'Quy trình canh tác theo chuẩn VietGap cho giống cây trồng.',
		isPurchase: true,
		isMaterial: true,
		isProcessOfPlant: true,
		price: 20000000,
		status: 'Chưa bắt đầu',
	},
	{
		servicePackageId: 'DV004',
		servicePackageName: 'Gói VIetGAP hỗ trợ canh tác số 1',
		servicePackageDescription: 'Quy trình canh tác theo chuẩn VietGap cho giống cây trồng.',
		isPurchase: true,
		isMaterial: true,
		isProcessOfPlant: true,
		price: 20000000,
		status: 'Ngừng áp dụng',
	},
	{
		servicePackageId: 'DV005',
		servicePackageName: 'Gói VIetGAP hỗ trợ canh tác số 1',
		servicePackageDescription: 'Quy trình canh tác theo chuẩn VietGap cho giống cây trồng.',
		isPurchase: true,
		isMaterial: false,
		isProcessOfPlant: true,
		price: 20000000,
		status: 'Đang áp dụng',
	},
];

const statusOptions = [
	{
		value: 'Đang áp dụng',
		label: 'Đang áp dụng',
	},
	{
		value: 'Ngừng áp dụng',
		label: 'Ngừng áp dụng',
	},
	{
		value: 'Chưa bắt đầu',
		label: 'Chưa bắt đầu',
	},
];

const serviceTypeOptions = [
	{
		value: 'Bao tiêu',
		label: 'Bao tiêu',
	},
	{
		value: 'Bao vật tư',
		label: 'Bao vật tư',
	},
];

export const ManageServicePackagePage = () => {
	const columns = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{index + 1}</a>,
		},
		{
			title: 'Tên gói dịch vụ',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Dịch vụ đi kèm',
			dataIndex: 'optional_service',
			key: 'optional_service',
			render: (_, record) => (
				<Space>
					{record.purchase && <Tag color="geekblue">Bao tiêu</Tag>}
					{record.material && <Tag color="purple">Bao vật tư</Tag>}
				</Space>
			),
		},
		// {
		// 	title: 'Bao vật tư',
		// 	dataIndex: 'isMaterial',
		// 	key: 'isMaterial',
		// 	render: (isMaterial) => <>{isMaterial == true ? 'Có' : 'Không'}</>,
		// },
		// {
		// 	title: 'Giá gói dịch vụ (VND)',
		// 	dataIndex: 'price',
		// 	key: 'price',
		// 	render: (price) => <>{formatNumber(price)}</>,
		// },
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					{/* <Tooltip title="Bắt đầu áp dụng">
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Bắt đầu áp dụng gói dịch vụ này"
							description="Bạn muốn bắt đầu áp dụng gói dịch vụ này?"
							onConfirm={handleStartServicePackage}
							onCancel={(e) => e.stopPropagation()}
							okText="Áp dụng"
							cancelText="Huỷ"
						>
							<Button
								disabled={record.status != 'Chưa bắt đầu' ? true : false}
								color="primary"
								variant="outlined"
								icon={<CaretRightOutlined />}
							></Button>
						</Popconfirm>
					</Tooltip> */}

					<Button
						onClick={(e) => {
							e.stopPropagation();
							console.log('CLick Update');
							// setSelectedServicePackage(record);
							// setIsUpdateModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Ngừng áp dụng gói dịch vụ này"
						description="Bạn muốn ngừng áp dụng gói dịch vụ này?"
						onConfirm={handleStopServicePackage}
						onCancel={(e) => e.stopPropagation()}
						okText="Ngừng áp dụng"
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
	const [selectedServicePackage, setSelectedServicePackage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const dispatch = useDispatch();

	const serviceList = useSelector(servicePackageListSelector);
	const serviceLoading = useSelector(isLoadingService);

	useEffect(() => {
		try {
			dispatch(getServicePackageList());
		} catch (error) {
			console.log('Error get service package', error);
		}
	}, []);

	const handleRowClick = (record) => {
		setSelectedServicePackage(record);
		setIsModalOpen(true);
	};

	const handleStartServicePackage = (e) => {
		e.stopPropagation();
		console.log('handleStartServicePackage');
	};

	const handleStopServicePackage = (e) => {
		e.stopPropagation();
		console.log('handleStopServicePackage');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedServicePackage(null);
	};

	const handleUpdateModalClose = () => {
		setIsUpdateModalOpen(false);
		setSelectedServicePackage(null);
	};

	const handleCreateModalClose = (isCreateSucess) => {
		if (isCreateSucess) {
			dispatch(getServicePackageList());
		}
		setIsCreateModalOpen(false);
	};
	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý gói dịch vụ</p>
				<div className={styles.filterContainer}>
					{/* <div className={styles.fiterItem}>
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
					<div className={styles.fiterItem}>
						<span>Loại dịch vụ:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn loại dịch vụ"
							options={serviceTypeOptions}
						></Select>
					</div> */}

					<Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo gói dịch vụ
					</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="servicePackageId"
					dataSource={serviceList || []}
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
						total: (serviceList && serviceList.length) || 1,
						onChange: (page) => {
							setCurrentPage(page);
						},
					}}
					className={styles.table}
				/>

				<ManageServicePackageDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedServicePackage={selectedServicePackage}
				/>

				<ManageServicePackageUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedServicePackage={selectedServicePackage}
				/>

				<ManageServicePackageCreateModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>
			</div>
		</div>
	);
};
