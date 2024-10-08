import React, {useState} from 'react';
import {Table, Select, Button, Space, Tag, Popconfirm} from 'antd';
import styles from './ManageServicesInusePage.module.css';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ServicesInuseDetailModal} from './ServicesInuseDetailModal';

const {Option} = Select;

const servicesInUse = [
	{
		servicesID: 'SD001',
		customer: 'Minh Châu',
		plantProcess: 'Quy trình trồng cây cà chua đúng mùa',
		dateToStart: '04/08/2019',
		dateToEnd: '04/09/2019',
		assignExpert: 'Dang Ninh',
		status: 'Đang sử dụng',
		desc: 'Quy trình trồng cây cà chua pla pla',
		isPurchase: 'yes',
		isFullMaterials: 'yes',
		totalPrice: 2000000,
	},
	{
		servicesID: 'SD002',
		customer: 'Hoàng Anh',
		plantProcess: 'Quy trình chăm sóc cây ổi',
		dateToStart: '05/08/2019',
		dateToEnd: '05/09/2019',
		assignExpert: 'Ba Phuoc',
		status: 'Hết hạn',
		desc: 'Quy trình chăm sóc cây ổi chuyên nghiệp',
		isPurchase: 'no',
		isFullMaterials: 'yes',
		totalPrice: 1500000,
	},
	{
		servicesID: 'SD003',
		customer: 'Thu Hằng',
		plantProcess: 'Quy trình trồng cây bưởi da xanh',
		dateToStart: '10/07/2019',
		dateToEnd: '10/10/2019',
		assignExpert: 'Chi Bao',
		status: 'Đang sử dụng',
		desc: 'Quy trình trồng và chăm sóc cây bưởi da xanh với kỹ thuật tiên tiến',
		isPurchase: 'yes',
		isFullMaterials: 'no',
		totalPrice: 3500000,
	},
	{
		servicesID: 'SD004',
		customer: 'Quang Huy',
		plantProcess: 'Quy trình tưới tiêu cây dưa hấu',
		dateToStart: '20/08/2019',
		dateToEnd: '20/09/2019',
		assignExpert: 'Dang Ninh',
		status: 'Hết hạn',
		desc: 'Quy trình tưới tiêu cây dưa hấu tiết kiệm nước',
		isPurchase: 'no',
		isFullMaterials: 'no',
		totalPrice: 1000000,
	},
	{
		servicesID: 'SD005',
		customer: 'Ngọc Ánh',
		plantProcess: 'Quy trình trồng cây cam sành',
		dateToStart: '15/09/2019',
		dateToEnd: '15/10/2019',
		assignExpert: 'Gia Han',
		status: 'Đang sử dụng',
		desc: 'Quy trình trồng cây cam sành với giống chất lượng cao',
		isPurchase: 'yes',
		isFullMaterials: 'yes',
		totalPrice: 2500000,
	},
	{
		servicesID: 'SD006',
		customer: 'Hà Vy',
		plantProcess: 'Quy trình chăm sóc cây măng cụt',
		dateToStart: '01/09/2019',
		dateToEnd: '01/10/2019',
		assignExpert: 'Ba Phuoc',
		status: 'Đang sử dụng',
		desc: 'Quy trình chăm sóc cây măng cụt đạt chuẩn',
		isPurchase: 'no',
		isFullMaterials: 'yes',
		totalPrice: 1800000,
	},
	{
		servicesID: 'SD007',
		customer: 'Bảo Khang',
		plantProcess: 'Quy trình trồng cây lựu',
		dateToStart: '07/08/2019',
		dateToEnd: '07/09/2019',
		assignExpert: 'Chi Bao',
		status: 'Hết hạn',
		desc: 'Quy trình trồng cây lựu với năng suất cao',
		isPurchase: 'yes',
		isFullMaterials: 'no',
		totalPrice: 2200000,
	},
	{
		servicesID: 'SD008',
		customer: 'Minh Tú',
		plantProcess: 'Quy trình trồng cây xoài',
		dateToStart: '10/09/2019',
		dateToEnd: '10/10/2019',
		assignExpert: 'Gia Han',
		status: 'Đang sử dụng',
		desc: 'Quy trình trồng cây xoài theo tiêu chuẩn VietGAP',
		isPurchase: 'yes',
		isFullMaterials: 'yes',
		totalPrice: 2700000,
	},
	{
		servicesID: 'SD009',
		customer: 'Quốc Bảo',
		plantProcess: 'Quy trình chăm sóc cây nhãn',
		dateToStart: '15/08/2019',
		dateToEnd: '15/09/2019',
		assignExpert: 'Dang Ninh',
		status: 'Hết hạn',
		desc: 'Quy trình chăm sóc cây nhãn giúp cây phát triển đều',
		isPurchase: 'no',
		isFullMaterials: 'no',
		totalPrice: 1300000,
	},
	{
		servicesID: 'SD010',
		customer: 'Lan Hương',
		plantProcess: 'Quy trình trồng cây mít',
		dateToStart: '05/09/2019',
		dateToEnd: '05/10/2019',
		assignExpert: 'Chi Bao',
		status: 'Đang sử dụng',
		desc: 'Quy trình trồng cây mít với phương pháp tiên tiến',
		isPurchase: 'yes',
		isFullMaterials: 'yes',
		totalPrice: 3000000,
	},
];

export const ManageServicesInusePage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [filterExpert, setFilterExpert] = useState('');
	const [selectedService, setselectedService] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredServices = servicesInUse.filter((service) => {
		const matchesStatus = filterStatus ? service.status === filterStatus : true;
		const matchesExpert = filterExpert ? service.assignExpert === filterExpert : true;
		return matchesStatus && matchesExpert;
	});

	const handleRowClick = (record) => {
		setselectedService(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setselectedService(null);
	};

	const columns = [
		{
			title: 'Mã Dịch Vụ',
			dataIndex: 'servicesID',
			key: 'servicesID',
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer',
			key: 'customer',
		},
		{
			title: 'Quy Trình Canh Tác',
			dataIndex: 'plantProcess',
			key: 'plantProcess',
		},
		{
			title: 'Ngày Bắt Đầu',
			dataIndex: 'dateToStart',
			key: 'dateToStart',
		},
		{
			title: 'Ngày Kết Thúc',
			dataIndex: 'dateToEnd',
			key: 'dateToEnd',
		},
		{
			title: 'Chuyên Gia',
			dataIndex: 'assignExpert',
			key: 'assignExpert',
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag color={status === 'Đang sử dụng' ? 'green' : 'red'}>{status}</Tag>
			),
		},
		{
			title: 'Hành Động',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button
						icon={<EditOutlined />}
						color="primary"
						variant="filled"
						onClick={(e) => {
							e.stopPropagation();
							// handleUpdateClick(record);
						}}
					/>
					<Popconfirm
						title="Từ chối yêu cầu"
						description="Bạn muốn từ chối yêu cầu này?"
						onConfirm={(e) => {
							e.stopPropagation();
							// handleRemove(record.key);
						}}
						onClick={(e) => e.stopPropagation()}
						onCancel={(e) => e.stopPropagation()}
						okText="Từ chối"
						cancelText="Huỷ"
					>
						<Button icon={<DeleteOutlined />} color="danger" variant="filled" />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div className={styles.headerContainer}>
			<h1>Quản Lý Dịch Vụ Đang Sử Dụng</h1>

			<div className={styles.filterContainer}>
				<span>Lọc theo trạng thái:</span>
				<Select
					placeholder="Chọn Trạng Thái"
					onChange={(value) => setFilterStatus(value)}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Đang sử dụng">Đang sử dụng</Option>
					<Option value="Hết hạn">Hết hạn</Option>
				</Select>

				<span>Lọc theo chuyên gia:</span>
				<Select
					placeholder="Chọn Chuyên Gia"
					onChange={(value) => setFilterExpert(value)}
					style={{width: '20%'}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Dang Ninh">Dang Ninh</Option>
					<Option value="Ba Phuoc">Ba Phuoc</Option>
				</Select>
			</div>

			<Table
				columns={columns}
				dataSource={filteredServices}
				pagination={{pageSize: 5}}
				rowKey="servicesID"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>

			<ServicesInuseDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedService={selectedService}
			/>
		</div>
	);
};
