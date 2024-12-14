import {Button, Input, Popconfirm, Select, Space, Table, Tag, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {ManageStandardProcessDetailModal} from './ManageStandardProcessDetailModal';
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageStandardProcessUpdateModal} from './ManageStandardProcessUpdateModal';
import {ManageStandardProcessCreateRequestModal} from './ManageStandardProcessCreateRequestModal';
import {useDispatch, useSelector} from 'react-redux';
import {isLoadingProcess, standardProcessListSelector} from '../../redux/selectors';
import {confirmProcess, getStandardProcessList} from '../../redux/slices/processSlice';
import {capitalizeFirstLetter, formatDate} from '../../utils';
import {RejectStandardProcessModal} from './RejectStandardProcessModal';
import {toast} from 'react-toastify';

const data = [
	{
		processId: 'GC001',
		processName: 'Quy trình trồng dưa lưới',
		plantName: 'Dưa lưới',
		createAt: '18/02/2022',
		updateAt: '18/02/2024',
		expertResponsible: 'Nguyen Van A',
		status: 'Có thể sử dụng',
		expectedTime: 200,
		processContent: {
			preparePlanting: [
				{
					prepareTitle: 'Chuẩn bị đất',
					prepareContent:
						'Mô tả: Làm sạch cỏ dại, cày xới đất và trộn đều phân bón hữu cơ. Kiểm tra độ pH của đất để đảm bảo đất có độ pH từ 5.5 đến 6.5. Công cụ và vật tư: Máy cày, phân bón hữu cơ, vôi bột. Thời gian thực hiện: 5 ngày (10/07/2024 - 15/07/2024)',
				},
			],
			plantingSchedule: [
				{
					stageTitle: 'Chuẩn bị trồng',
					dayFrom: 1,
					dayTo: 5,
					actions: [
						{
							dayFrom: 1,
							dayTo: 2,
							actionTitle: 'Chuẩn bị giá thể',
							actionDescription:
								'Bắt đầu xử lý mụn xơ dừa bằng cách ngâm và xả để loại bỏ tannin',
						},
						{
							stageTitle: 'Chuẩn bị trồng',
							dayFrom: 3,
							dayTo: 3,
							actionTitle: 'Gieo hạt',
							actionDescription:
								'Chuẩn bị bầu đất hoặc luống gieo hạt.\nGieo hạt cách nhau khoảng 5 cm trên bề mặt đất hoặc trong bầu đất, với độ sâu 1-2 cm.\nChe phủ một lớp mỏng đất hoặc rơm rạ để giữ ẩm cho hạt.',
						},
						{
							stageTitle: 'Chuẩn bị trồng',
							dayFrom: 4,
							dayTo: 5,
							actionTitle: 'Tưới Nước và Chăm Sóc Gieo Hạt',
							actionDescription:
								'Tưới nước nhẹ nhàng hàng ngày để giữ ẩm cho đất.\nĐảm bảo điều kiện nhiệt độ từ 18-22°C cho hạt nảy mầm.\nKiểm tra tỷ lệ nảy mầm và xử lý cây con không đều hoặc chết.',
						},
					],
					materials: [
						{
							materialName: 'Xẻng',
							materialQuantity: 15,
						},
					],
				},
				{
					stageTitle: 'Chăm Sóc Cây Con',
					dayFrom: 6,
					dayTo: 9,
					actions: [
						{
							dayFrom: 6,
							dayTo: 7,
							actionTitle: 'Tiếp tục chăm sóc cây con',
							actionDescription:
								'Tiếp tục tưới nước đều đặn, giữ ẩm cho đất.\nLoại bỏ cỏ dại xung quanh cây con để giảm cạnh tranh dinh dưỡng',
						},
						{
							stageTitle: 'Chăm Sóc Cây Con',
							dayFrom: 8,
							dayTo: 9,
							actionTitle: 'Làm sạch cây con',
							actionDescription:
								'Thực hiện làm sạch cây con, loại bỏ cây yếu hoặc bị bệnh.\nBón thúc lần đầu bằng phân hữu cơ hoặc phân vi sinh (10-15 kg/ha) để kích thích sự phát triển.',
						},
					],
					materials: [
						{
							materialName: 'Xẻng',
							materialQuantity: 15,
						},
						{
							materialName: 'Cuốc',
							materialQuantity: 25,
						},
					],
				},
			],
		},
	},
];

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

export const ManageStandardProcessPage = () => {
	const columns = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Tên quy trình',
			dataIndex: 'name',
			key: 'name',
			render: (name) => <p>{capitalizeFirstLetter(name)}</p>,
		},
		{
			title: 'Giống cây',
			dataIndex: 'plantName',
			key: 'plantName',
			render: (_, record) => (
				<p>{capitalizeFirstLetter(record?.plant_season?.plant?.name)}</p>
			),
		},

		{
			title: 'Mùa vụ',
			dataIndex: 'season',
			key: 'season',
			render: (_, record) => (
				<p>{`Mùa vụ ${record?.plant_season?.plant?.name} Tháng ${record?.plant_season?.month_start}`}</p>
			),
		},
		{
			title: 'Người chịu trách nhiệm',
			dataIndex: 'expertResponsible',
			key: 'expertResponsible',
			render: (_, record) => <p>{record?.expert?.full_name}</p>,
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'accepted' && <Tag color="green">Có thể sử dụng</Tag>}
					{status == 'in_active' && <Tag color="default">Ngưng sử dụng</Tag>}
					{status == 'rejected' && <Tag color="red">Không đạt yêu cầu</Tag>}
					{status == 'pending' && <Tag color="gold">Chờ phê duyệt</Tag>}
				</>
			),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<>
					{record.status != 'pending' && (
						<Space size="middle">
							<Button
								onClick={(e) => {
									e.stopPropagation();
									console.log('CLick');
									setSelectedProcess(record);
									setIsUpdateModalOpen(true);
								}}
								color="primary"
								variant="filled"
								icon={<EditOutlined />}
								disabled={record.status != 'accepted'}
							></Button>

							<Popconfirm
								onClick={(e) => e.stopPropagation()}
								title="Xoá quy trình"
								description="Bạn muốn xoá quy trình này?"
								onConfirm={handleRemovePlant}
								onCancel={(e) => e.stopPropagation()}
								okText="Xoá"
								cancelText="Huỷ"
							>
								<Button
									color="danger"
									variant="filled"
									icon={<DeleteOutlined />}
									disabled={record.status != 'accepted'}
								></Button>
							</Popconfirm>
						</Space>
					)}
					{record.status == 'pending' && (
						<Space size="middle">
							<Popconfirm
								onClick={(e) => e.stopPropagation()}
								title="Duyệt quy trình chuẩn"
								description="Chấp nhận quy trình này?"
								onConfirm={(e) => handleConfirmProcess(e, true, record)}
								onCancel={(e) => e.stopPropagation()}
								okText="Duyệt"
								cancelText="Huỷ"
							>
								<Button
									color="primary"
									variant="filled"
									icon={<CheckOutlined />}
								></Button>
							</Popconfirm>
							<Popconfirm
								onClick={(e) => e.stopPropagation()}
								title="Từ chối quy trình"
								description="Bạn muốn từ chối quy trình này?"
								onConfirm={(e) => handleConfirmProcess(e, false, record)}
								onCancel={(e) => e.stopPropagation()}
								okText="Từ chối"
								cancelText="Huỷ"
							>
								<Button
									color="danger"
									variant="filled"
									icon={<CloseOutlined />}
								></Button>
							</Popconfirm>
						</Space>
					)}
				</>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [filterStatus, setFilterStatus] = useState('');

	const dispatch = useDispatch();

	const standardProcess = useSelector(standardProcessListSelector);
	const loading = useSelector(isLoadingProcess);

	const handleConfirmProcess = (e, isConfirm, process) => {
		e.stopPropagation();
		if (isConfirm) {
			try {
				const formData = {
					rejectReason: null,
					processId: process.process_technical_standard_id,
				};
				toast.loading('Đang tiến hành...', {autoClose: false});
				dispatch(confirmProcess(formData)).then((response) => {
					console.log('Approve process reponse: ' + response);
					toast.dismiss(); // Remove the loading message
					if (response.payload && response.payload.statusCode) {
						//Catch Error message
						if (response.payload.statusCode !== 200) {
							message.error('Chấp nhận quy trình thất bại');
							console.log('Approve process failed!');
						}

						if (response.payload.statusCode === 200) {
							message.success('Chấp nhận quy trình thành công');
							fetchStandardProcess(1);
						}
					}
				});
			} catch (error) {
				console.log('Error confirm process', error);
				toast.dismiss(); // Remove the loading message
				message.error('Chấp nhận quy trình thất bại');
			}
		} else {
			setSelectedProcess(process);
			setIsRejectModalOpen(true);
		}
	};

	const fetchStandardProcess = (pageIndex) => {
		console.log('filterStatus: ' + filterStatus);
		try {
			const params = {
				page_index: pageIndex,
				page_size: pageSize,
				status: filterStatus,
			};
			dispatch(getStandardProcessList(params));
			setCurrentPage(pageIndex);
		} catch (error) {
			console.log('Error fetch standard process', error);
		}
	};

	useEffect(() => {
		fetchStandardProcess(1);
	}, [filterStatus]);

	const handleRowClick = (record) => {
		console.log('setSelectedProcess', record);
		setSelectedProcess(record);
		setIsModalOpen(true);
	};

	const handleRemovePlant = (e) => {
		e.stopPropagation();
		console.log('Remove Plant');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedProcess(null);
	};

	const handleUpdateModalClose = (isUpdateSuccess) => {
		if (isUpdateSuccess) {
			fetchStandardProcess(1);
		}
		setIsUpdateModalOpen(false);
		setSelectedProcess(null);
	};

	const handleCreateModalClose = () => {
		setIsCreateModalOpen(false);
		setSelectedProcess(null);
	};

	const handleRejectModalClose = (isRejectSuccess) => {
		if (isRejectSuccess) {
			fetchStandardProcess(1);
		}
		setSelectedProcess(null);
		setIsRejectModalOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý quy trình canh tác chuẩn</p>
				<div className={styles.filterContainer}>
					{/* <div className={styles.fiterItem}>
						<span>Lọc theo tên quy trình:</span>
						<Input className={styles.filterInput} />
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo giống cây:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClearQuản lý quy trình canh tác chuẩn
							placeholder="Chọn giống cây"
							options={plantNameOptions}
						></Select>
					</div>
					*/}
					<div className={styles.fiterItem}>
						<span>Lọc theo trạng thái:</span>
						<Select
							className={styles.filterInput}
							placeholder="Chọn trạng thái"
							onChange={(value) => {
								setCurrentPage(1);
								setFilterStatus(value);
							}}
						>
							<Option value="">Tất cả</Option>
							<Option value="pending">Chờ phê duyệt</Option>
							<Option value="accepted">Có thể sử dụng</Option>
							<Option value="in_active">Ngưng sử dụng</Option>
							<Option value="rejected">Không đạt yêu cầu</Option>
						</Select>
					</div>
					<Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo quy trình
					</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="processId"
					dataSource={standardProcess.process_technical_standard || []}
					columns={columns}
					scroll={{x: 'max-content'}}
					loading={loading}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					rowClassName={(record, index) =>
						index % 2 === 0 ? styles.evenRow : styles.oddRow
					}
					pagination={{
						pageSize: pageSize,
						current: currentPage,
						total: standardProcess.pagination
							? standardProcess?.pagination.total_page * pageSize //total items
							: 1,
						onChange: (page) => {
							fetchStandardProcess(page);
						},
					}}
					className={styles.table}
				/>

				<ManageStandardProcessDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedProcess={selectedProcess}
				/>

				<ManageStandardProcessUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedProcess={selectedProcess}
				/>

				<ManageStandardProcessCreateRequestModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>

				<RejectStandardProcessModal
					isModalOpen={isRejectModalOpen}
					handleModalClose={handleRejectModalClose}
					selectedProcess={selectedProcess}
				/>
			</div>
		</div>
	);
};
