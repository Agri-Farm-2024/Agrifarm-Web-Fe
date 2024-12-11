import {DatePicker, Input, Table, Button, Space, Popconfirm, Tag, Select, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './LandLeaseRequestPage.module.css';
import {
	CheckOutlined,
	DeleteOutlined,
	EditOutlined,
	FileAddOutlined,
	ReloadOutlined,
} from '@ant-design/icons';
import {formatNumber} from '../../utils';
import {LandLeaseRequestDetailModal} from './LandLeaseRequestDetailModal';
import {LandLeaseRequestUpdateModal} from './LandLeaseRequestUpdateModal';
import {getListOfBooking, updateBooking} from '../../redux/slices/landSlice';
import {useDispatch, useSelector} from 'react-redux';

const {Option} = Select;

export const LandLeaseRequestPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1); // New state for pagination
	const [pageSize, setPageSize] = useState(8); // New state for pagination

	const dispatch = useDispatch();
	const requests = useSelector((state) => state.landSlice?.listOfBooking?.metadata?.bookings);
	const pagination = useSelector((state) => state.landSlice?.listOfBooking?.metadata?.pagination);
	const loading = useSelector((state) => state.landSlice?.loading);

	useEffect(() => {
		fetchRequests(currentPage); // Pass the current page to fetchRequests
	}, [filterStatus, currentPage]);

	const fetchRequests = async () => {
		try {
			await dispatch(
				getListOfBooking({
					page_size: pageSize,
					page_index: currentPage,
					status: filterStatus,
					type: 'request',
				})
			);
		} catch (error) {
			message.error('Error fetching data');
		}
	};

	const handleRowClick = (record) => {
		setSelectedRequest(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedRequest(null);
	};

	const handleUpdateClick = (record) => {
		setSelectedRequest(record);
		setIsModalUpdateOpen(true);
	};

	const handleModalUpdateClose = () => {
		setIsModalUpdateOpen(false);
		setSelectedRequest(null);
	};

	const handleApprove = (body) => {
		const hideLoading = message.loading('Đang xử lý...', 0);
		dispatch(updateBooking(body))
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 200) {
					fetchRequests(currentPage);
					handleModalUpdateClose();
					message.success('Đã tạo hợp đồng');
				} else {
					message.error('Có lỗi trong quá trình cập nhật');
				}
			})
			.catch(() => {
				hideLoading();
				message.error('Có lỗi trong quá trình cập nhật');
			});
	};

	const handleRemove = (bookingID) => {
		const body = {
			booking_id: bookingID,
			reason_for_reject: 'Mảnh đất không sẵn sàng cho thuê',
			status: 'rejected',
		};
		const hideLoading = message.loading('Đang xử lý...', 0);
		dispatch(updateBooking(body))
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 200) {
					fetchRequests(currentPage);
					message.info('Đã từ chối');
				} else {
					message.error('Có lỗi trong quá trình cập nhật');
				}
			})
			.catch(() => {
				hideLoading();
				message.error('Có lỗi trong quá trình cập nhật');
			});
	};

	// Handle page change
	const handlePageChange = (page) => {
		setCurrentPage(page); // Update current page state
	};

	const columns = [
		{
			title: (
				<ReloadOutlined
					className={styles.reloadBtn}
					onClick={() => {
						fetchRequests();
					}}
				/>
			),
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'land_renter',
			key: 'land_renter',
			render: (landRenter) => <div style={{textAlign: 'center'}}>{landRenter.full_name}</div>,
		},
		{
			title: 'Mảnh đất',
			dataIndex: 'land',
			key: 'land',
			render: (land) => <div>{land.name}</div>,
		},
		{
			title: 'Mục đích',
			dataIndex: 'purpose_rental',
			key: 'purpose_rental',
		},
		{
			title: 'Ngày Gửi',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => (
				<div style={{textAlign: 'center'}}>{new Date(text).toLocaleDateString()}</div>
			),
		},
		{
			title: 'Thời Gian Thuê (tháng)',
			dataIndex: 'total_month',
			key: 'total_month',
			render: (text) => <div style={{textAlign: 'center'}}>{text} tháng</div>,
		},
		{
			title: 'Thời Gian Bắt Đầu',
			dataIndex: 'time_start',
			key: 'time_start',
			render: (text) => (
				<div style={{textAlign: 'center'}}>{new Date(text).toLocaleDateString()}</div>
			),
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={status === 'pending' ? 'gold' : status === 'rejected' ? 'red' : 'green'}
				>
					{status === 'pending'
						? 'Đang xử lí'
						: status === 'rejected'
							? 'Từ chối'
							: 'Chấp nhận'}
				</Tag>
			),
		},
		{
			title: 'Hành Động',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button
						color="primary"
						variant="filled"
						disabled={record.status !== 'pending'}
						icon={<CheckOutlined />}
						onClick={(e) => {
							e.stopPropagation();
							handleUpdateClick(record);
						}}
					/>
					<Popconfirm
						title="Từ chối yêu cầu"
						onConfirm={(e) => {
							e.stopPropagation();
							handleRemove(record.booking_id);
						}}
						onClick={(e) => e.stopPropagation()}
						okText="Từ chối"
						cancelText="Huỷ"
					>
						<Button
							color="danger"
							variant="filled"
							disabled={record.status !== 'pending'}
							icon={<DeleteOutlined />}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div className={styles.headerContainer}>
			<h1>Yêu Cầu Thuê Đất</h1>
			<div className={styles.filterContainer}>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => {
						setCurrentPage(1);
						setFilterStatus(value);
					}}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="pending">Đang xử lí</Option>
					<Option value="pending_contract">Chấp nhận</Option>
					<Option value="rejected">Từ chối</Option>
				</Select>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="booking_id"
					columns={columns}
					dataSource={requests}
					scroll={{x: 'max-content'}}
					rowClassName={(record, index) =>
						index % 2 === 0 ? styles.evenRow : styles.oddRow
					}
					loading={loading}
					pagination={{
						pageSize: pageSize,
						current: currentPage,
						total: pagination?.total_page * pageSize,
						onChange: handlePageChange,
					}}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					className={styles.table}
				/>
			</div>
			<LandLeaseRequestDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedRequest={selectedRequest}
			/>
			<LandLeaseRequestUpdateModal
				isModalOpen={isModalUpdateOpen}
				handleModalClose={handleModalUpdateClose}
				selectedRequest={selectedRequest}
				handleApprove={handleApprove}
			/>
		</div>
	);
};
