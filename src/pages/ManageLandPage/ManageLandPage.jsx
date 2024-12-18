import React, {useEffect, useState} from 'react';
import {Table, Select, Button, Space, Tag, Popconfirm} from 'antd';
import styles from './ManageLandPage.module.css';
import {DeleteOutlined, EditOutlined, ReloadOutlined} from '@ant-design/icons';
import {ManageLandDetailModal} from './ManageLandDetailModal';
import {ManageLandUpdateModal} from './ManageLandUpdateModal';
import {ManageLandAddModal} from './ManageLandAddModal';
import {useDispatch, useSelector} from 'react-redux';
import {getLandType, getListOfLand, getListOfRequestViewLand} from '../../redux/slices/landSlice';
import {capitalizeFirstLetter, formatNumber} from '../../utils';
import {getListOfStaff} from '../../redux/slices/userSlice';

const {Option} = Select;

export const ManageLandPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [selectedLand, setselectedLand] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalUpdateOpen, setisModalUpdateOpen] = useState(false);
	const [isModalAddOpen, setisModalAddOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(8);
	const [staffList, setStaffList] = useState([]);
	const [landTypeList, setLandTypeList] = useState([]);

	const dispatch = useDispatch();

	const lands = useSelector((state) => state.landSlice?.lands?.lands);
	const pagination = useSelector((state) => state.landSlice?.lands?.pagination);
	const loading = useSelector((state) => state.landSlice?.loading);

	useEffect(() => {
		fetchData();
	}, [filterStatus, currentPage]);

	const fetchData = () => {
		const params = {
			page_size: pageSize,
			page_index: currentPage,
			status: filterStatus, // Change this based on your need
		};
		dispatch(getListOfLand(params)).then((res) => {
			if (res.payload.statusCode === 200) {
			}
		});
	};

	useEffect(() => {
		dispatch(getListOfStaff())
			.then((res) => {
				if (res.payload.statusCode === 200) {
					console.log('getListOfStaff: ' + JSON.stringify(res.payload.metadata.users));
					setStaffList(res.payload.metadata.users);
					dispatch(getLandType()).then((res) => {
						if (res.payload.statusCode === 200) {
							console.log('getLandType: ' + JSON.stringify(res.payload.metadata));
							setLandTypeList(res.payload.metadata);
						}
					});
				}
			})
			.catch((error) => {
				console.error('Caught error:', error);
			});
	}, []);

	const handlePageChange = (page) => {
		setCurrentPage(page); // Update current page state
	};

	const handleRowClick = (record) => {
		setselectedLand(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setselectedLand(null);
	};

	const handleModalUpdateOpen = (record) => {
		setselectedLand(record);
		setisModalUpdateOpen(true);
	};

	const handleModalUpdateClose = () => {
		setisModalUpdateOpen(false);
		setselectedLand(null);
	};

	const handleModalCloseAndUpdate = () => {
		handleModalUpdateClose();
		fetchData();
	};

	const columns = [
		{
			title: (
				<ReloadOutlined
					className={styles.reloadBtn}
					onClick={() => {
						fetchData();
					}}
				/>
			),
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Tên Mảnh Đất',
			dataIndex: 'name',
			key: 'name',
			render: (name) => <>{capitalizeFirstLetter(name)}</>,
		},
		{
			title: 'Mô tả',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => <div>{new Date(text).toLocaleDateString()}</div>,
		},
		{
			title: 'Nhân viên phụ trách',
			dataIndex: 'staff_id',
			key: 'staff_id',
			render: (staff_id) => (
				<div>
					{staff_id ? (
						<strong>
							{staffList.find((staff) => staff.user_id == staff_id)?.full_name}
						</strong>
					) : (
						'Chưa có'
					)}
				</div>
			),
		},
		{
			title: 'Diện Tích',
			dataIndex: 'acreage_land',
			key: 'acreage_land',
			render: (acreage_land) => <div>{formatNumber(acreage_land)} m2</div>,
		},
		{
			title: 'Giá thuê / Tháng',
			dataIndex: 'price_booking_per_month',
			key: 'price_booking_per_month',
			render: (price_booking_per_month) => (
				<div>{formatNumber(price_booking_per_month)} VND</div>
			),
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag color={status === 'free' ? 'green' : status === 'booked' ? 'red' : 'orange'}>
					{status === 'free'
						? 'Đang trống'
						: status === 'booked'
							? 'Đang sử dụng'
							: 'Đang sửa chữa'}
				</Tag>
			),
		},
		{
			title: 'Hành Động',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button
						onClick={(e) => {
							e.stopPropagation();
							console.log('CLick');
							handleModalUpdateOpen(record);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá quy trình"
						description="Bạn muốn xoá mảnh đất này?"
						onConfirm={(e) => e.stopPropagation()}
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

	return (
		<div className={styles.headerContainer}>
			<h1>Quản lý mảnh đất</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => {
						setFilterStatus(value);
						setCurrentPage(1);
					}}
					style={{width: '20%', marginRight: 8}}
				>
					<Option key="" value="">
						Tất cả
					</Option>
					<Option key="free" value="free">
						Có thể sử dụng
					</Option>
					<Option key="booked" value="booked">
						Đang sử dụng
					</Option>
					<Option key="repairing" value="repairing">
						Đang cải tạo
					</Option>
				</Select>

				{/* <span>Lọc theo tình trạng đất:</span>
				<Select
					placeholder="Chọn Tình Trạng Đất"
					onChange={(value) => setFilterLandCondition(value)}
					style={{width: '20%', marginRight: 20}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Tốt">Tốt</Option>
					<Option value="Đang cải tạo">Đang cải tạo</Option>
					<Option value="Cần cải tạo">Cần cải tạo</Option>
					<Option value="Không thể canh tác">Không thể canh tác</Option>
				</Select> */}
				<Button
					type="primary"
					onClick={() => {
						setisModalAddOpen(true);
					}}
				>
					Tạo mảnh đất
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={lands}
				pagination={{
					pageSize: pageSize,
					current: currentPage,
					total: pagination?.total_page * pageSize,
					onChange: handlePageChange,
				}}
				rowKey="lands.land_id"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
				loading={loading}
			/>

			<ManageLandDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedLand={selectedLand}
				staffList={staffList}
				landTypeList={landTypeList}
			/>

			<ManageLandAddModal
				isModalOpen={isModalAddOpen}
				handleModalClose={() => setisModalAddOpen(false)}
			/>

			<ManageLandUpdateModal
				isModalOpen={isModalUpdateOpen}
				handleModalClose={handleModalUpdateClose}
				handleModalCloseAndUpdate={handleModalCloseAndUpdate}
				selectedLand={selectedLand}
				staffList={staffList}
				landTypeList={landTypeList}
			/>
		</div>
	);
};
