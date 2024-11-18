import {Button, DatePicker, message, Popconfirm, Select, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageAccountPage.module.css';
import {ManageAccountDetailModal} from './ManageAccountDetailModal';
import {CheckOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageAccountUpdateModal} from './ManageAccountUpdateModal';
import {ManageAccountCreateModal} from './ManageAccountCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {getUserList, updateStatusUser} from '../../redux/slices/userSlice';
import {formatDate} from '../../utils';

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
		value: 'pending',
		label: 'Chưa hoạt động',
	},
];

const roleOptions = [
	{
		value: 2,
		label: 'Nhân viên',
	},
	{
		value: 4,
		label: 'Người thuê',
	},
	{
		value: 1,
		label: 'Quản lý',
	},
	{
		value: 3,
		label: 'Chuyên gia nông nghiệp',
	},
];

export const ManageAccountPage = () => {
	const columns = [
		{
			title: 'ID tài khoản',
			dataIndex: 'user_id',
			key: 'user_id',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Họ và tên',
			dataIndex: 'full_name',
			key: 'full_name',
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
					{role == 4 && (
						<Tag color="geekblue" key={role}>
							Người thuê đất
						</Tag>
					)}
					{role == 1 && (
						<Tag color="magenta" key={role}>
							Quản lý
						</Tag>
					)}
					{role == 2 && (
						<Tag color="gold" key={role}>
							Nhân viên
						</Tag>
					)}
					{role == 3 && (
						<Tag color="cyan" key={role}>
							Chuyên gia nông nghiệp
						</Tag>
					)}
				</>
			),
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => <p>{formatDate(text)}</p>,
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
							setSelectedAccount(record);
							setIsUpdateModalOpen(true);
						}}
						color="default"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					{record.status === 'active' ? (
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Ngưng hoạt động tài khoản"
							description="Bạn muốn ngưng hoạt động tài khoản này?"
							onConfirm={(e) => {
								e.stopPropagation();
								handleSuspendUser(record);
							}}
							onCancel={(e) => e.stopPropagation()}
							okText="Đình chỉ"
							cancelText="Huỷ"
						>
							<Button
								color="danger"
								variant="filled"
								icon={<DeleteOutlined />}
							></Button>
						</Popconfirm>
					) : (
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Phê duyệt tài khoản"
							description="Bạn muốn tài khoản này hoạt động?"
							onConfirm={(e) => {
								e.stopPropagation();
								handleActiveUser(record);
							}}
							onCancel={(e) => e.stopPropagation()}
							okText="Phê duyệt"
							cancelText="Huỷ"
						>
							<Button
								color="primary"
								variant="filled"
								icon={<CheckOutlined />}
							></Button>
						</Popconfirm>
					)}
				</Space>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [status, setStatus] = useState('');
	const [role, setRole] = useState('');

	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userSlice?.userList?.users);
	const pagination = useSelector((state) => state.userSlice?.userList?.pagination);

	console.log(userList, pagination);

	const featchUser = () => {
		const formData = {
			page_index: currentPage,
			page_size: pageSize,
			status,
			role,
		};
		dispatch(getUserList(formData));
	};

	useEffect(() => {
		featchUser();
	}, [currentPage, role, status]);

	const handleRowClick = (record) => {
		setSelectedAccount(record);
		setIsModalOpen(true);
	};

	const handleSuspendUser = (record) => {
		console.log('Suspend employee', record.user_id);
		dispatch(
			updateStatusUser({
				status: 'pending',
				userID: record.user_id,
			})
		)
			.then((res) => {
				hideLoading();
				message.info('Cập nhật trạng thái thành công');
				featchUser();
				console.log(res);
			})
			.catch((err) => {
				hideLoading();
				message.error(err);
				console.log(err);
			});
	};

	const handleActiveUser = (record) => {
		console.log('handleActiveUser', record.user_id);
		const hideLoading = message.loading('Đang xử lí...', 0);
		dispatch(
			updateStatusUser({
				status: 'active',
				userID: record.user_id,
			})
		)
			.then((res) => {
				hideLoading();
				message.info('Cập nhật trạng thái thành công');
				featchUser();
				console.log(res);
			})
			.catch((err) => {
				hideLoading();
				message.error(err);
				console.log(err);
			});
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
		if (isCreateSucess === true) {
			console.log('Fetching list');
			const formData = {
				page_index: currentPage,
				page_size: pageSize,
				status,
				role,
			};
			dispatch(getUserList(formData));
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
							onChange={(value) => {
								setCurrentPage(1);
								setRole(value);
							}}
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
							onChange={(value) => {
								setCurrentPage(1);
								setStatus(value);
							}}
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
					rowKey="user_id"
					dataSource={userList}
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
						total: Number(pagination?.total_page) * pageSize,
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
