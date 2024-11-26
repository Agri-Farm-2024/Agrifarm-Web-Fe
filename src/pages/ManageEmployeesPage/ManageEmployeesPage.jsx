import {Button, DatePicker, Popconfirm, Select, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageEmployeesPage.module.css';
import {ManageEmployeesDetailModal} from './ManageEmployeesDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageEmployeeUpdateModal} from './ManageEmployeeUpdateModal';
import {useDispatch, useSelector} from 'react-redux';
import {getListUserSelector} from '../../redux/selectors';
import {getUserList} from '../../redux/slices/userSlice';
import create from '@ant-design/icons/lib/components/IconFont';

const statusOptions = [
	{
		value: 'active',
		label: 'Đang làm',
	},
	{
		value: 'in_active',
		label: 'Nghỉ việc',
	},
];

const roleOptions = [
	{
		value: 3,
		label: 'Chuyên viên nông nghiệp',
	},
	{
		value: 2,
		label: 'Nhân viên trang trại',
	},
];

export const ManageEmployeesPage = () => {
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);
	const [selectedRole, setSelectedRole] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState(null);
	const data = useSelector(getListUserSelector);
	const pagination = data?.pagination;
	const loading = useSelector((state) => state.userSlice.loading);

	useEffect(() => {
		dispatch(
			getUserList({
				role: selectedRole,
				page_size: pageSize,
				page_index: currentPage,
				status: selectedStatus,
			})
		);
	}, [dispatch, currentPage, selectedRole, selectedStatus]);

	const columns = [
		{
			title: 'ID nhân viên',
			dataIndex: 'user_id',
			key: 'user_id',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên nhân viên',
			dataIndex: 'full_name',
			key: 'full_name',
		},
		{
			title: 'Vị trí',
			dataIndex: 'role',
			key: 'role',
			render: (text) => (
				<p>
					{text == 2 && (
						<Tag bordered={false} color="volcano" key={text}>
							Nhân viên
						</Tag>
					)}
					{text == 3 && (
						<Tag bordered={false} color="cyan" key={text}>
							Chuyên viên
						</Tag>
					)}
					{text == 4 && (
						<Tag bordered={false} color="green" key={text}>
							Người dùng
						</Tag>
					)}
				</p>
			),
		},
		{
			title: 'Ngày bắt đầu làm',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (_, {created_at} = {}) => {
				return new Date(created_at).toLocaleDateString();
			},
		},
		// {
		// 	title: 'Công việc đã giao',
		// 	dataIndex: 'doingTaskNumber',
		// 	key: 'doingTaskNumber',
		// },
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'active' && (
						<Tag color="green" key={status}>
							Đang hoạt động
						</Tag>
					)}
					{status == 'pending' && (
						<Tag color="red" key={status}>
							Chưa hoạt động
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
							setSelectedEmployee(record);
							setIsUpdateModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Đình chỉ nhân viên"
						description="Bạn muốn đình chỉ nhân viên này?"
						onConfirm={handleSuspendEmployee}
						onCancel={(e) => e.stopPropagation()}
						okText="Đình chỉ"
						cancelText="Huỷ"
					>
						<Button color="danger" variant="filled" icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	const handleRowClick = (record) => {
		setSelectedEmployee(record);
		setIsModalOpen(true);
	};

	const handleSuspendEmployee = (e) => {
		e.stopPropagation();
		console.log('Suspend employee');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedEmployee(null);
	};

	const handleUpdateModalClose = () => {
		setIsUpdateModalOpen(false);
		setSelectedEmployee(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý nhân viên</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo vị trí:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn vị trí"
							options={roleOptions}
							onChange={(value) => setSelectedRole(value)}
						></Select>
					</div>
					{/* <div className={styles.fiterItem}>
						<span>Lọc theo trạng thái:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn trạng thái"
							options={statusOptions}
							onChange={(value) => setSelectedStatus(value)}
						></Select>
					</div> */}
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					loading={loading}
					rowKey="user_id"
					dataSource={data.users}
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
						total: pagination.total_page * pageSize,
						onChange: (page) => {
							setCurrentPage(page);
						},
					}}
					className={styles.table}
				/>

				<ManageEmployeesDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedEmployee={selectedEmployee}
				/>

				<ManageEmployeeUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedEmployee={selectedEmployee}
				/>
			</div>
		</div>
	);
};
