import {Button, DatePicker, Popconfirm, Select, Space, Table, Tag, Tooltip, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageAgriProductPurchaseRequestPage.module.css';
import {ManageAgriProductPurchaseRequestDetailModal} from './ManageAgriProductPurchaseRequestDetailModal';
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {approveRequest, getListRequest} from '../../redux/slices/requestSlice';
import {capitalizeFirstLetter, formatDate, formatNumber} from '../../utils';

let data = [
	{
		requestId: 'YC001',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Chấp nhận',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC002',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Từ chối',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: '',
	},
	{
		requestId: 'YC003',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Đợi xử lý',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC004',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Đang kiểm tra',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC005',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Đợi phê duyệt',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC006',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Từ chối',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
];

const statusOptions = [
	{
		value: 'completed',
		label: 'Hoàn thành',
	},
	{
		value: 'pending',
		label: 'Đợi phân công',
	},
	{
		value: 'pending_approval',
		label: 'Đợi phê duyệt',
	},
	{
		value: 'assigned',
		label: 'Đã phân công',
	},
	{
		value: 'in_progress',
		label: 'Đang xử lí',
	},
	{
		value: 'rejected',
		label: 'Từ chối',
	},
];

export const ManageAgriProductPurchaseRequestPage = () => {
	const [dataSource, setDataSource] = useState(data);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [status, setStatus] = useState(null);
	const [isHarvestActive, setIsHarvestActive] = useState(false);

	const dispatch = useDispatch();

	const requestList = useSelector((state) => state.requestSlice?.requestList?.requests);
	const pagination = useSelector((state) => state.requestSlice?.requestList?.pagination);
	const loading = useSelector((state) => state.requestSlice?.loading);

	console.log('requestList: ' + JSON.stringify(requestList));

	const handleChangeStatusRequest = (e, actionType, request) => {
		e.stopPropagation();
		const hideLoading = message.loading('Đang xử lý...', 0);
		if (actionType == 'approve') {
			const params = {
				requestId: request.request_id,
				formData: {
					status: 'completed',
					reason_for_reject: null,
				},
			};
			dispatch(approveRequest(params)).then((response) => {
				hideLoading();
				console.log('Approve request reponse: ' + response);
				if (response.payload && response.payload.statusCode) {
					//Catch Error message
					if (response.payload.statusCode !== 200) {
						if (response.payload.message === 'Request purchase already exist') {
							message.error('Yêu cầu thu hoạch đã được tạo');
							return;
						}
						message.error('Chấp nhận yêu cầu thất bại');
						console.log('Approve request failed!: ' + response.payload.message);
					}

					if (response.payload.statusCode === 200) {
						message.success('Chấp nhận yêu cầu thành công');
						fetchRequestList();
					}
				}
			});
		}

		if (actionType == 'reject') {
			const params = {
				requestId: request.request_id,
				formData: {
					status: 'rejected',
					reason_for_reject: 'Không thể thua mua',
				},
			};
			dispatch(approveRequest(params)).then((response) => {
				hideLoading();
				console.log('Approve request reponse: ' + response);
				if (response.payload && response.payload.statusCode) {
					//Catch Error message
					if (response.payload.statusCode !== 200) {
						message.error('Từ chối yêu cầu thất bại');
						console.log('Approve request failed!');
					}

					if (response.payload.statusCode === 200) {
						message.info('Từ chối yêu cầu thành công');
						fetchRequestList();
					}
				}
			});
		}
	};

	const handleRowClick = (record) => {
		setSelectedPurchaseRequest(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedPurchaseRequest(null);
	};

	useEffect(() => {
		fetchRequestList();
	}, [isHarvestActive, currentPage, status]);

	const fetchRequestList = () => {
		const params = {
			type: isHarvestActive ? 'product_puchase_harvest' : 'product_purchase',
			page_size: pageSize,
			page_index: currentPage,
			status,
		};
		dispatch(getListRequest(params));
	};
	const columns = [
		{
			title: 'Ngày gửi yêu cầu',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => <p>{formatDate(text)}</p>,
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
			render: (_, record) => (
				<p>
					{record?.service_specific?.land_renter?.full_name
						? record?.service_specific?.land_renter?.full_name
						: 'Chưa có'}
				</p>
			),
		},
		{
			title: 'Tên nông sản',
			dataIndex: 'plantName',
			key: 'plantName',
			render: (_, record) => (
				<p>{capitalizeFirstLetter(record?.service_specific?.plant_season?.plant?.name)}</p>
			),
		},
		{
			title: 'Giá thu mua(VND)',
			dataIndex: 'price_purchase_per_kg',
			key: 'price_purchase_per_kg',
			render: (_, record) => (
				<p>
					{formatNumber(record?.service_specific?.plant_season?.price_purchase_per_kg)} /
					KG
				</p>
			),
		},
		{
			title: 'Nhân viên phụ trách',
			dataIndex: 'purchaseExpert',
			key: 'purchaseExpert',
			render: (_, record) => (
				<p>{record?.task?.assign_to ? record?.task?.assign_to?.full_name : 'Chưa có'}</p>
			),
		},
		{
			title: 'Ngày được phân công',
			dataIndex: 'assignDate',
			key: 'assignDate',
			render: (_, record) => (
				<p>
					{record?.task?.assigned_at ? formatDate(record?.task?.assigned_at) : 'Chưa có'}
				</p>
			),
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'completed' && (
						<Tag color="green" key={status}>
							Chấp nhận
						</Tag>
					)}
					{status == 'pending' && (
						<Tag color="red" key={status}>
							Đợi phân công
						</Tag>
					)}
					{status == 'pending_approval' && (
						<Tag color="gold" key={status}>
							Đợi phê duyệt
						</Tag>
					)}
					{status == 'assigned' && (
						<Tag color="blue" key={status}>
							Đã phân công
						</Tag>
					)}
					{status == 'in_progress' && (
						<Tag color="magenta" key={status}>
							Đang xử lí
						</Tag>
					)}
					{status == 'rejected' && (
						<Tag color="default" key={status}>
							Từ chối
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
					<Tooltip title="Chấp nhận">
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Chấp nhận yêu cầu"
							description="Bạn muốn chấp nhận yêu cầu này?"
							onConfirm={(e) => handleChangeStatusRequest(e, 'approve', record)}
							onCancel={(e) => e.stopPropagation()}
							okText="Chấp nhận"
							cancelText="Huỷ"
						>
							<Button
								disabled={record.status != 'pending_approval' ? true : false}
								color="primary"
								variant="filled"
								icon={<CheckOutlined />}
							></Button>
						</Popconfirm>
					</Tooltip>
					<Tooltip title="Từ chối">
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Từ chối yêu cầu"
							description="Bạn muốn từ chối yêu cầu này?"
							onConfirm={(e) => handleChangeStatusRequest(e, 'reject', record)}
							onCancel={(e) => e.stopPropagation()}
							okText="Từ chối"
							cancelText="Huỷ"
						>
							<Button
								disabled={record.status != 'pending_approval' ? true : false}
								color="danger"
								variant="filled"
								icon={<CloseOutlined />}
							></Button>
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý yêu cầu thu mua</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo trạng thái:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn trạng thái"
							options={statusOptions}
							value={status}
							onChange={(value) => setStatus(value)}
						></Select>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Space>
					<Button
						type={isHarvestActive ? 'default' : 'primary'}
						onClick={() => {
							setIsHarvestActive(false);
							setCurrentPage(1);
						}}
					>
						Báo cáo kiểm định
					</Button>
					<Button
						type={isHarvestActive ? 'primary' : 'default'}
						onClick={() => {
							setIsHarvestActive(true);
							setCurrentPage(1);
						}}
					>
						Báo cáo thu hoạch
					</Button>
				</Space>
				<Table
					loading={loading}
					rowKey="request_id"
					dataSource={requestList}
					columns={columns}
					scroll={{x: 'max-content'}}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					rowClassName={(record, index) =>
						record.status == 'pending_approval' ? styles.focus : styles.oddRow
					}
					pagination={{
						pageSize: pageSize,
						current: currentPage,
						total: pagination?.total_page * pageSize,
						onChange: (page) => {
							setCurrentPage(page);
						},
					}}
					className={styles.table}
				/>

				<ManageAgriProductPurchaseRequestDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedPurchaseRequest={selectedPurchaseRequest}
				/>
			</div>
		</div>
	);
};
