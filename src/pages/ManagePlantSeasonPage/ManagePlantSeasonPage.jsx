import {
	Button,
	DatePicker,
	Empty,
	Popconfirm,
	Select,
	Skeleton,
	Space,
	Spin,
	Table,
	Tag,
	Tooltip,
	message,
} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {ManagePlantSeasonDetailModal} from './ManagePlantSeasonDetailModal';
import {CaretRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {ManagePlantSeasonUpdateModal} from './ManagePlantSeasonUpdateModal';
import {capitalizeFirstLetter, formatNumber} from '../../utils';
import {ManagePlantSeasonCreateModal} from './ManagePlantSeasonCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {deletePlantSeason, getPlantSeasonList} from '../../redux/slices/plantSlice';
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

const months = [
	{
		label: 'Tháng 1',
		value: 1,
		color: '#f0f3fa',
	},
	{
		label: 'Tháng 2',
		value: 2,
		color: '#fff1f0',
	},
	{
		label: 'Tháng 3',
		value: 3,
		color: '#fff2e8',
	},
	{
		label: 'Tháng 4',
		value: 4,
		color: '#fff7e6',
	},
	{
		label: 'Tháng 5',
		value: 5,
		color: '#fffbe6',
	},
	{
		label: 'Tháng 6',
		value: 6,
		color: '#fcffe6',
	},
	{
		label: 'Tháng 7',
		value: 7,
		color: '#f6ffed',
	},
	{
		label: 'Tháng 8',
		value: 8,
		color: '#e6fffb',
	},
	{
		label: 'Tháng 9',
		value: 9,
		color: '#e6f4ff',
	},
	{
		label: 'Tháng 10',
		value: 10,
		color: '#f0f5ff',
	},
	{
		label: 'Tháng 11',
		value: 11,
		color: '#f9f0ff',
	},
	{
		label: 'Tháng 12',
		value: 12,
		color: '#fff0f6',
	},
];

export const ManagePlantSeasonPage = () => {
	const columns = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Loại cây',
			dataIndex: 'plant',
			key: 'plant',
			render: (plant) => <>{capitalizeFirstLetter(plant.name)}</>,
		},
		{
			title: 'Tháng bắt đầu',
			dataIndex: 'month_start',
			key: 'month_start',
		},
		{
			title: 'Thời gian trồng của mùa vụ',
			dataIndex: 'total_month',
			key: 'total_month',
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
						<Tag color="blue" key={type}>
							Mùa thuận
						</Tag>
					)}
					{type == 'out_season' && (
						<Tag color="orange" key={type}>
							Mùa nghịch
						</Tag>
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
							Đang áp dụng
						</Tag>
					)}
					{status == 'deleted' && (
						<Tag color="red" key={status}>
							Ngừng áp dụng
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
						disabled={record.status === 'deleted'}
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá dụng mùa vụ này"
						description="Bạn muốn xoá dụng mùa vụ này?"
						onConfirm={(e) => handleStopPlantSeason(e, record.plant_season_id)}
						onCancel={(e) => e.stopPropagation()}
						okText="Xoá dụng"
						cancelText="Huỷ"
						disabled={record.status === 'deleted'}
					>
						<Button
							disabled={record.status === 'deleted'}
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
	const [selectedPlantSeason, setSelectedPlantSeason] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(100);
	const [totalPage, setTotalPage] = useState(10);
	const [selectMonth, setSelectMonth] = useState(1);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const plantSeasonList = useSelector(plantSeasonListSelector);
	console.log('plantSeason', plantSeasonList);

	useEffect(() => {
		fetchPlantSeasonList(1);
	}, []);

	const fetchPlantSeasonList = (pageNumber) => {
		try {
			setLoading(true);
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
			};
			dispatch(getPlantSeasonList(params)).then((response) => {
				setLoading(false);
			});
		} catch (error) {
			setLoading(false);
			console.log('Error fetching plant season list: ' + error);
		}
	};

	const handleRowClick = (record) => {
		setSelectedPlantSeason(record);
		setIsModalOpen(true);
	};

	const handleStopPlantSeason = (e, plantSeasonId) => {
		e.stopPropagation();
		console.log('handleStopPlantSeason', plantSeasonId);
		const formData = {
			plantSeasonId: plantSeasonId,
		};
		dispatch(deletePlantSeason(formData))
			.then((response) => {
				console.log('remove response: ' + JSON.stringify(response));
				if (response.payload && response.payload.statusCode == 200) {
					message.success('Xoá mùa vụ thành công!');
					fetchPlantSeasonList(currentPage);
				} else {
					message.error('Xoá mùa vụ thất bại!');
				}
			})
			.catch((error) => {
				message.error('Xoá mùa vụ thất bại!');
				console.log('remove error: ' + error);
			});
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedPlantSeason(null);
	};

	const handleUpdateModalClose = (isUpdateSucess) => {
		if (isUpdateSucess == true) {
			fetchPlantSeasonList(currentPage);
		}
		setIsUpdateModalOpen(false);
		setSelectedPlantSeason(null);
	};

	const handleCreateModalClose = (isCreateSucess) => {
		if (isCreateSucess == true) {
			fetchPlantSeasonList(1);
		}
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

					{/* <Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo mùa vụ
					</Button> */}
				</div>
			</div>

			<div className={styles.tableContainer}>
				{loading && (
					<Spin
						size="large"
						style={{
							width: '100%',
							height: '100%',
							textAlign: 'center',
							position: 'absolute',
							top: '50%',
							left: 0,
							bottom: 0,
							zIndex: 100,
						}}
					></Spin>
				)}
				{!loading &&
					(!plantSeasonList ||
						!plantSeasonList.plant_seasons ||
						plantSeasonList.plant_seasons.length == 0) && (
						<Empty style={{width: '100%', marginTop: '50px'}} />
					)}
				{plantSeasonList &&
					plantSeasonList.plant_seasons &&
					plantSeasonList.plant_seasons.length > 0 &&
					months.map((month, index) => (
						<div key={`Month ${index}`} className={styles.monthColumn}>
							<div
								className={styles.columnHeader}
								style={{backgroundColor: month.color}}
							>
								{month.label}
							</div>
							<div className={styles.itemContainer}>
								{plantSeasonList.plant_seasons
									.filter((item) => item?.month_start == month.value)
									.map((season, seasonIndex) => (
										<div
											key={`season_${seasonIndex} in monnth ${index}`}
											className={styles.seasonItem}
											style={{backgroundColor: month.color}}
											onClick={() => handleRowClick(season)}
										>
											<p className={styles.seasonName}>
												{capitalizeFirstLetter(season?.plant?.name)}
											</p>
											<p className={styles.seasonType}>
												{season?.type == 'in_season'
													? 'Mùa thuận'
													: 'Mùa nghịch'}
											</p>
											<p className={styles.seasonType}>
												Giá thu mua:{' '}
												<span style={{fontWeight: 'bold'}}>
													{formatNumber(season?.price_purchase_per_kg)}{' '}
													VND/kg
												</span>
											</p>
											<p>
												{season?.status == 'active' && (
													<Tag className={styles.tagSize} color="green">
														Đang áp dụng
													</Tag>
												)}
												{season?.status == 'deleted' && (
													<Tag className={styles.tagSize} color="red">
														Ngừng áp dụng
													</Tag>
												)}
											</p>
											<Space className={styles.actionBar}>
												<Button
													className={styles.actionButton}
													size="small"
													onClick={(e) => {
														e.stopPropagation();
														console.log('CLick');
														setSelectedPlantSeason(season);
														setIsUpdateModalOpen(true);
													}}
													color="primary"
													variant="filled"
													icon={<EditOutlined />}
													disabled={season.status === 'deleted'}
												></Button>

												<Popconfirm
													onClick={(e) => e.stopPropagation()}
													title="Xoá dụng mùa vụ này"
													description="Bạn muốn xoá dụng mùa vụ này?"
													onConfirm={(e) =>
														handleStopPlantSeason(
															e,
															season.plant_season_id
														)
													}
													onCancel={(e) => e.stopPropagation()}
													okText="Xoá dụng"
													cancelText="Huỷ"
													disabled={season.status === 'deleted'}
												>
													<Button
														className={styles.actionButton}
														disabled={season.status === 'deleted'}
														size="small"
														color="danger"
														variant="filled"
														icon={<DeleteOutlined />}
													></Button>
												</Popconfirm>
											</Space>
										</div>
									))}
								<div
									className={styles.addItemBar}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setSelectMonth(month.value);
										setIsCreateModalOpen(true);
									}}
								>
									<span>
										<PlusOutlined /> Tạo mùa vụ
									</span>
								</div>
							</div>
						</div>
					))}

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
					selectMonth={selectMonth}
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>
			</div>
		</div>
	);
};
