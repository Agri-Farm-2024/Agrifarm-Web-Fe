import {Button, DatePicker, Popconfirm, Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import styles from './ManageEmployeesPage.module.css';
import {formatNumber} from '../../utils';
import {ManageEmployeesDetailModal} from './ManageEmployeesDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageEmployeeUpdateModal} from './ManageEmployeeUpdateModal';

const data = [
	{
		employeeId: 'NV001',
		employeeName: 'Nguyen Van A',
		dob: '26/09/2020',
		dateStart: '26/09/2020',
		email: 'nguyenvana@gmail.com',
		status: 'Đang làm',
		role: 'Nhân viên trang trại',
		doingTaskNumber: 10,
		doneTaskNumber: 5,
		landManage: ['Mảnh đất số 1', 'Mảnh đất số 2', 'Mảnh đất số 3'],
	},
	{
		employeeId: 'NV002',
		employeeName: 'Nguyen Van A',
		dob: '26/09/2020',
		dateStart: '26/09/2020',
		email: 'nguyenvana@gmail.com',
		status: 'Đang làm',
		role: 'Nhân viên trang trại',
		doingTaskNumber: 10,
		doneTaskNumber: 5,
		landManage: ['Mảnh đất số 1', 'Mảnh đất số 2', 'Mảnh đất số 3'],
	},
	{
		employeeId: 'NV003',
		employeeName: 'Nguyen Van A',
		dob: '26/09/2020',
		dateStart: '26/09/2020',
		email: 'nguyenvana@gmail.com',
		status: 'Đang làm',
		role: 'Nhân viên trang trại',
		doingTaskNumber: 10,
		doneTaskNumber: 5,
		landManage: [],
	},
	{
		employeeId: 'NV004',
		employeeName: 'Nguyen Van A',
		dob: '26/09/2020',
		dateStart: '26/09/2020',
		email: 'nguyenvana@gmail.com',
		status: 'Nghỉ việc',
		role: 'Nhân viên trang trại',
		doingTaskNumber: 10,
		doneTaskNumber: 5,
		landManage: ['Mảnh đất số 1', 'Mảnh đất số 2', 'Mảnh đất số 3'],
	},
	{
		employeeId: 'NV005',
		employeeName: 'Nguyen Van A',
		dob: '26/09/2020',
		dateStart: '26/09/2020',
		email: 'nguyenvana@gmail.com',
		status: 'Đang làm',
		role: 'Nhân viên trang trại',
		doingTaskNumber: 10,
		doneTaskNumber: 5,
		landManage: ['Mảnh đất số 1', 'Mảnh đất số 2', 'Mảnh đất số 3'],
	},
];

const statusOptions = [
	{
		value: 'Chấp nhận',
		label: 'Chấp nhận',
	},
	{
		value: 'Đang xử lý',
		label: 'Đang xử lý',
	},
	{
		value: 'Từ chối',
		label: 'Từ chối',
	},
];

export const ManageEmployeesPage = () => {
	const columns = [
		{
			title: 'ID nhân viên',
			dataIndex: 'employeeId',
			key: 'employeeId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên nhân viên',
			dataIndex: 'employeeName',
			key: 'employeeName',
		},
		{
			title: 'Vị trí',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: 'Ngày bắt đầu làm',
			dataIndex: 'dateStart',
			key: 'dateStart',
		},
		{
			title: 'Công việc đã giao',
			dataIndex: 'doingTaskNumber',
			key: 'doingTaskNumber',
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'Đang làm' && (
						<Tag color="green" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Nghỉ việc' && (
						<Tag color="red" key={status}>
							{status}
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

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
						<span>Lọc theo ngày thanh toán:</span>
						<DatePicker
							className={styles.filterInput}
							placeholder="DD-MM-YYYY"
							onChange={(date, dateString) => {
								console.log(date, dateString);
							}}
							format={'DD-MM-YYYY'}
						/>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="employeeId"
					dataSource={data}
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
						total: totalPage * pageSize,
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
