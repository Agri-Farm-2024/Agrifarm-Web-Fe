import {Button, DatePicker, Popconfirm, Select, Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import styles from './ManageAccountPage.module.css';
import {ManageAccountDetailModal} from './ManageAccountDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageAccountUpdateModal} from './ManageAccountUpdateModal';
import {ManageAccountCreateModal} from './ManageAccountCreateModal';

const data = [
	{
		accountId: 'ACC001',
		accountName: 'Nguyen Van A',
		phone: '0974747474',
		address: '123 Bien Hoa Dong Nai',
		dob: '20/10/2000',
		email: 'nguyenvana@gmail.com',
		status: 'active',
		role: 'landRenter',
		createAt: '25/10/2024',
	},
	{
		accountId: 'ACC002',
		accountName: 'Nguyen Van B',
		phone: '0974747474',
		address: '123 Bien Hoa Dong Nai',
		dob: '20/10/2000',
		email: 'nguyenvana@gmail.com',
		status: 'active',
		role: 'manager',
		createAt: '25/10/2024',
	},
	{
		accountId: 'ACC003',
		accountName: 'Nguyen Van C',
		phone: '0974747474',
		address: '123 Bien Hoa Dong Nai',
		dob: '20/10/2000',
		email: 'nguyenvana@gmail.com',
		status: 'active',
		role: 'staff',
		createAt: '25/10/2024',
	},
	{
		accountId: 'ACC004',
		accountName: 'Nguyen Van D',
		phone: '0974747474',
		address: '123 Bien Hoa Dong Nai',
		dob: '20/10/2000',
		email: 'nguyenvana@gmail.com',
		status: 'active',
		role: 'expert',
		createAt: '25/10/2024',
	},
	{
		accountId: 'ACC005',
		accountName: 'Nguyen Van E',
		phone: '0974747474',
		address: '123 Bien Hoa Dong Nai',
		dob: '20/10/2000',
		email: 'nguyenvana@gmail.com',
		status: 'active',
		role: 'landRenter',
		createAt: '25/10/2024',
	},
	{
		accountId: 'ACC005',
		accountName: 'Nguyen Van E',
		phone: '0974747474',
		address: '123 Bien Hoa Dong Nai',
		dob: '20/10/2000',
		email: 'nguyenvana@gmail.com',
		status: 'inactive',
		role: 'landRenter',
		createAt: '25/10/2024',
	},
];

const statusOptions = [
	{
		value: 'active',
		label: 'Đang hoạt động',
	},
	{
		value: 'inactive',
		label: 'Ngừng hoạt động',
	},
];

const roleOptions = [
	{
		value: 'staff',
		label: 'Nhân viên',
	},
	{
		value: 'landRenter',
		label: 'Người thuê',
	},
	{
		value: 'manager',
		label: 'Quản lý',
	},
	{
		value: 'expert',
		label: 'Chuyên gia nông nghiệp',
	},
];

export const ManageAccountPage = () => {
	const columns = [
		{
			title: 'ID tài khoản',
			dataIndex: 'accountId',
			key: 'accountId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Họ và tên',
			dataIndex: 'accountName',
			key: 'accountName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Vai trò',
			key: 'role',
			dataIndex: 'role',
			render: (_, {role}) => (
				<>
					{role == 'landRenter' && (
						<Tag color="geekblue" key={role}>
							Người thuê đất
						</Tag>
					)}
					{role == 'manager' && (
						<Tag color="magenta" key={role}>
							Quản lý
						</Tag>
					)}
					{role == 'staff' && (
						<Tag color="gold" key={role}>
							Nhân viên
						</Tag>
					)}
					{role == 'expert' && (
						<Tag color="cyan" key={role}>
							Chuyên gia nông nghiệp
						</Tag>
					)}
				</>
			),
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createAt',
			key: 'createAt',
		},
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
					{status == 'inactive' && (
						<Tag color="red" key={status}>
							Ngừng hoạt động
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
							setSelectedAccount(record);
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
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const handleRowClick = (record) => {
		setSelectedAccount(record);
		setIsModalOpen(true);
	};

	const handleSuspendEmployee = (e) => {
		e.stopPropagation();
		console.log('Suspend employee');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedAccount(null);
	};

	const handleUpdateModalClose = (isUpdateSucess) => {
		if (isUpdateSucess) {
			// fetchPlantList(currentPage);
		}
		setIsUpdateModalOpen(false);
		setSelectedAccount(null);
	};

	const handleCreateModalClose = (isCreateSucess) => {
		if (isCreateSucess) {
			console.log('Fetching new account list when create a new plant');
			// fetchPlantList(1);
		}
		setIsCreateModalOpen(false);
		setSelectedAccount(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý tài khoản</p>
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
					</div>
					<Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo tài khoản
					</Button>
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

				<ManageAccountDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedAccount={selectedAccount}
				/>

				<ManageAccountUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedAccount={selectedAccount}
				/>

				<ManageAccountCreateModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>
			</div>
		</div>
	);
};
