import {DatePicker, Input, Table, Tag, Button, Space, Modal, Select, Popconfirm} from 'antd';
import React, {useState} from 'react';
import styles from './ServiceRequestPage.module.css';
import {formatNumber} from '../../utils';
import {ServiceRequestDetailModal} from './ServiceRequestDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

const data = [
	{
		serviceId: 'DV001',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây cà chua',
		isPurchased: true,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV002',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Chấp nhận',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây cà chua',
		isPurchased: true,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV003',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Từ chối',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây cải',
		isPurchased: true,
		isSupportMaterial: false,
	},
	{
		serviceId: 'DV004',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV005',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV006',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV007',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV008',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV009',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV010',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
	{
		serviceId: 'DV011',
		landRenterName: 'Nguyen Van A',
		landId: 'MD001',
		landName: 'Mảnh đất số 1',
		serviceName: 'Gói dịch vụ số 1',
		expertName: 'Nguyen Van B',
		dateRequest: '25/09/2020',
		status: 'Đang xử lý',
		totalPrice: 100000,
		processName: 'Quy trình trồng cây ớt',
		isPurchased: false,
		isSupportMaterial: true,
	},
];

const expertOptions = [
	{
		value: 'Nguyen Van A',
		label: 'Nguyen Van A',
	},
	{
		value: 'Nguyen Van B',
		label: 'Nguyen Van B',
	},
	{
		value: 'Nguyen Van C',
		label: 'Nguyen Van C',
	},
	{
		value: 'Nguyen Van D',
		label: 'Nguyen Van D',
	},
];

const serviceOptions = [
	{
		value: 'Bao tiêu',
		label: 'Bao tiêu',
	},
	{
		value: 'VietGAP',
		label: 'VietGAP',
	},
	{
		value: 'Bao vật tư',
		label: 'Bao vật tư',
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

const ServiceRequestPage = () => {
	const columns = [
		{
			title: 'ID dịch vụ',
			dataIndex: 'serviceId',
			key: 'serviceId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'landRenterName',
			key: 'landRenterName',
		},
		{
			title: 'Gói dịch vụ',
			dataIndex: 'serviceName',
			key: 'serviceName',
		},
		{
			title: 'Nhân viên phụ trách',
			dataIndex: 'expertName',
			key: 'expertName',
		},
		{
			title: 'Ngày gửi yêu cầu',
			dataIndex: 'dateRequest',
			key: 'dateRequest',
		},
		{
			title: 'Mảnh đất sử dụng',
			dataIndex: 'landName',
			key: 'landName',
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'Chấp nhận' && (
						<Tag color="green" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Từ chối' && (
						<Tag color="red" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Đang xử lý' && (
						<Tag color="warning" key={status}>
							{status}
						</Tag>
					)}
				</>
			),
		},
		{
			title: 'Giá trị dịch vụ',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (text) => <>{formatNumber(text)} VND</>,
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button
						onClick={(e) => {
							e.stopPropagation();
							console.log('CLick');
							setIsAssignModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Delete the task"
						description="Bạn muốn từ chối yêu cầu này?"
						onConfirm={handleRejectService}
						onCancel={(e) => e.stopPropagation()}
						okText="OK"
						cancelText="Cancel"
					>
						<Button color="danger" variant="filled" icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
	const [selectedService, setSelectedService] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);
	const [assignExpertSelect, setAssignExpertSelect] = useState(null);

	const handleRejectService = (e) => {
		e.stopPropagation();
		console.log('Reject service');
	};

	const handleRowClick = (record) => {
		setSelectedService(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedService(null);
	};

	const handleAssignExpert = () => {
		console.log('Assigning');
	};
	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Yêu cầu thuê dịch vụ</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo dịch vụ:</span>
						<Select
							allowClear
							style={{
								width: '50%',
							}}
							placeholder="Chọn loại dịch vụ"
							options={serviceOptions}
						/>
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo trạng thái:</span>
						<Select
							allowClear
							style={{
								width: '50%',
							}}
							placeholder="Chọn trạng thái"
							options={statusOptions}
						/>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="serviceId"
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

				<ServiceRequestDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedService={selectedService}
				/>

				<Modal
					title="Phân công nhân viên phụ trách"
					open={isAssignModalOpen}
					onOk={handleAssignExpert}
					okButtonProps={{style: {outline: 'none', border: 'none'}}}
					onCancel={() => setIsAssignModalOpen(false)}
					centered
				>
					<div style={{padding: '1rem 0'}}>
						<span style={{marginRight: '1rem'}}>Nhân viên phụ trách: </span>
						<Select
							style={{
								width: '50%',
							}}
							onChange={() => {
								() => {};
							}}
							placeholder="Chọn nhân viên"
							options={expertOptions}
						/>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default ServiceRequestPage;
