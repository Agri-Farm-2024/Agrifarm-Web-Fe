import {Button, Image, Select, Table, Tag, Upload, message} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageOrderPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {bookingMaterialListSelector, isLoadingMaterial} from '../../redux/selectors';
import {getBookingMaterial, updateBookingMaterialStatus} from '../../redux/slices/materialSlice';
import {
	calculateDaysDifference,
	capitalizeFirstLetter,
	formatDate,
	formatNumber,
} from '../../utils';
import {ReloadOutlined} from '@ant-design/icons';

export const ManageOrderPage = () => {
	const columns = [
		{
			title: (
				<ReloadOutlined
					className={styles.reloadBtn}
					onClick={() => fetchBookingMaterialList(1)}
				/>
			),
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Khách hàng',
			dataIndex: 'landrenter',
			key: 'landrenter',
			render: (_, record) => <p>{record?.landrenter?.full_name}</p>,
		},
		{
			title: 'Mảnh đất',
			dataIndex: 'booking_land',
			key: 'booking_land',
			render: (_, record) => <p>{capitalizeFirstLetter(record?.booking_land?.land?.name)}</p>,
		},
		{
			title: 'Số ngày thuê',
			dataIndex: 'day_rent',
			key: 'day_rent',
			render: (_, record) => (
				<p>{calculateDaysDifference(record?.time_start, record?.time_end)}</p>
			),
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_date',
			key: 'created_date',
			render: (_, record) => <p>{formatDate(record?.time_start)}</p>,
		},
		{
			title: 'Ngày hết hạn',
			dataIndex: 'expired_date',
			key: 'expired_date',
			render: (_, record) => <p>{formatDate(record?.time_end)}</p>,
		},
		{
			title: 'Giá trị đơn thuê',
			dataIndex: 'total_price',
			key: 'total_price',
			render: (_, record) => {
				const totalPrice = record?.booking_material_detail.reduce(
					(total, item) =>
						item?.price_per_piece_item *
							item?.quantity *
							calculateDaysDifference(record?.time_start, record?.time_end) +
						item?.price_deposit_per_item * item?.quantity,
					0
				);
				return <p>{formatNumber(totalPrice)} VND</p>;
			},
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'pending_payment' && <Tag color="gold">Chờ thanh toán</Tag>}
					{status == 'pending_sign' && <Tag color="pink">Chờ ký</Tag>}
					{status == 'completed' && <Tag color="green">Đang sử dụng</Tag>}
					{status == 'expired' && <Tag color="red">Hết hạn</Tag>}
				</>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMaterial, setSelectedMaterial] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);
	const [filterStatus, setFilterStatus] = useState('');

	const bookingMaterialList = useSelector(bookingMaterialListSelector);
	const loading = useSelector(isLoadingMaterial);
	console.log(bookingMaterialList);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchBookingMaterialList(1);
	}, [filterStatus]);

	const fetchBookingMaterialList = (pageNumber) => {
		try {
			setCurrentPage(pageNumber);
			const params = {
				page_size: pageSize,
				page_index: pageNumber,
				status: filterStatus,
			};
			dispatch(getBookingMaterial(params));
		} catch (error) {
			console.log('Error fetching plant list: ' + error);
		}
	};

	const handleUpdateBookingMaterial = (body) => {
		console.log(body);

		const hideLoading = message.loading('Đang xử lý...', 0);
		dispatch(updateBookingMaterialStatus(body))
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 200) {
					fetchBookingMaterialList(1);
					handleModalClose();
					message.success('Đã cập nhật');
				} else {
					message.error('Có lỗi trong quá trình cập nhật');
				}
			})
			.catch(() => {
				hideLoading();
				message.error('Có lỗi trong quá trình cập nhật');
			});
	};

	const handleRowClick = (record) => {
		setSelectedMaterial(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedMaterial(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý đơn hàng</p>
				<div className={styles.filterContainer}>
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
							<Option value="pending_payment">Chờ thanh toán</Option>
							<Option value="pending_sign">Chờ ký</Option>
							<Option value="completed">Đang sử dụng</Option>
							<Option value="expired">Hết hạn</Option>
						</Select>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				{bookingMaterialList && (
					<Table
						rowKey="id"
						loading={loading}
						dataSource={
							(bookingMaterialList && bookingMaterialList.booking_materials) || []
						}
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
							total: bookingMaterialList.pagination
								? bookingMaterialList?.pagination.total_page * pageSize //total items
								: 1,
							onChange: (page) => {
								fetchBookingMaterialList(page);
							},
						}}
						className={styles.table}
					/>
				)}
			</div>
		</div>
	);
};
