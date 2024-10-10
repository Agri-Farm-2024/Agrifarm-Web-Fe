import React, {useState} from 'react';
import {Table, Select, Button, Space, Tag, Popconfirm} from 'antd';
import styles from './ManageLandPage.module.css';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageLandDetailModal} from './ManageLandDetailModal';
import {ManageLandUpdateModal} from './ManageLandUpdateModal';
import {ManageLandAddModal} from './ManageLandAddModal';

const {Option} = Select;

const landList = [
	{
		landID: 'MD001',
		nameLand: 'Mảnh đất số 1',
		area: '1000 m2',
		position: 'Khu vực A, lô số 1',
		landOfStatus: 'Tốt',
		status: 'Có thể sử dụng',
		typeOfLand: 'Đất phù sa',
		assignStaff: 'Chi Bao',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc:
						'Mảnh đất số 1 nằm ở khu vực trung tâm của trang trại AgriFarm, với diện tích 500 mét vuông. Vị trí này rất thuận lợi, chỉ cách nhà kho và nguồn nước chính của trang trại khoảng 100 mét, giúp bạn dễ dàng tiếp cận và quản lý các hoạt động canh tác.',
				},
				{
					sub_title: 'Điều kiện đất đai',
					sub_desc:
						'Mảnh đất số 1 có lớp đất phù sa màu mỡ, giàu dinh dưỡng, rất phù hợp để trồng các loại rau xanh và cây ăn quả như cà chua, xà lách, và dưa leo. Đất đã được cải tạo kỹ lưỡng, đảm bảo độ tơi xốp và khả năng thoát nước tốt, giúp cây trồng phát triển nhanh chóng và khỏe mạnh.',
				},
				{
					sub_title: 'Các dịch vụ hỗ trợ',
					sub_desc:
						'Khi thuê mảnh đất số 1 đồng thời sử dụng dịch vụ chăm sóc của AgriFarm, bạn sẽ được hưởng lợi từ các dịch vụ hỗ trợ chuyên nghiệp của AgriFarm, bao gồm tư vấn kỹ thuật trồng trọt, cung cấp phân bón hữu cơ và hỗ trợ kiểm soát sâu bệnh từ đội ngũ chuyên gia nông nghiệp của chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn để đảm bảo mùa vụ đạt năng suất cao nhất.',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD002',
		nameLand: 'Mảnh đất số 2',
		area: '500 m2',
		position: 'Khu vực B, lô số 3',
		landOfStatus: 'Đang cải tạo',
		status: 'Đang cải tạo',
		typeOfLand: 'Đất cát',
		assignStaff: 'Dang Ninh',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 2 nằm ở Khu vực B, lô số 3 với diện tích 500 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD003',
		nameLand: 'Mảnh đất số 3',
		area: '750 m2',
		position: 'Khu vực C, lô số 5',
		landOfStatus: 'Cần cải tạo',
		status: 'Tạm ngừng sử dụng',
		typeOfLand: 'Đất thịt',
		assignStaff: 'Ba Phuoc',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 3 nằm ở Khu vực C, lô số 5 với diện tích 750 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD004',
		nameLand: 'Mảnh đất số 4',
		area: '1200 m2',
		position: 'Khu vực D, lô số 2',
		landOfStatus: 'Không thể canh tác',
		status: 'Đang sử dụng',
		typeOfLand: 'Đất sét',
		assignStaff: 'Chi Bao',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 4 nằm ở Khu vực D, lô số 2 với diện tích 1200 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD005',
		nameLand: 'Mảnh đất số 5',
		area: '850 m2',
		position: 'Khu vực E, lô số 8',
		landOfStatus: 'Tốt',
		status: 'Có thể sử dụng',
		typeOfLand: 'Đất phù sa',
		assignStaff: 'Dang Ninh',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 5 nằm ở Khu vực E, lô số 8 với diện tích 850 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD006',
		nameLand: 'Mảnh đất số 6',
		area: '1300 m2',
		position: 'Khu vực F, lô số 7',
		landOfStatus: 'Tốt',
		status: 'Có thể sử dụng',
		typeOfLand: 'Đất phù sa',
		assignStaff: 'Chi Bao',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 6 nằm ở Khu vực F, lô số 7 với diện tích 1300 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD007',
		nameLand: 'Mảnh đất số 7',
		area: '1100 m2',
		position: 'Khu vực G, lô số 4',
		landOfStatus: 'Đang cải tạo',
		status: 'Đang cải tạo',
		typeOfLand: 'Đất đỏ bazan',
		assignStaff: 'Ba Phuoc',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 7 nằm ở Khu vực G, lô số 4 với diện tích 1100 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD008',
		nameLand: 'Mảnh đất số 8',
		area: '900 m2',
		position: 'Khu vực H, lô số 9',
		landOfStatus: 'Cần cải tạo',
		status: 'Tạm ngừng sử dụng',
		typeOfLand: 'Đất thịt',
		assignStaff: 'Dang Ninh',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 8 nằm ở Khu vực H, lô số 9 với diện tích 900 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD009',
		nameLand: 'Mảnh đất số 9',
		area: '600 m2',
		position: 'Khu vực I, lô số 12',
		landOfStatus: 'Tốt',
		status: 'Có thể sử dụng',
		typeOfLand: 'Đất sét',
		assignStaff: 'Chi Bao',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 9 nằm ở Khu vực I, lô số 12 với diện tích 600 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
	{
		landID: 'MD010',
		nameLand: 'Mảnh đất số 10',
		area: '1500 m2',
		position: 'Khu vực J, lô số 6',
		landOfStatus: 'Không thể canh tác',
		status: 'Tạm ngừng sử dụng',
		typeOfLand: 'Đất cát',
		assignStaff: 'Ba Phuoc',
		description: {
			title: 'Mảnh đất nông nghiệp tại AgriFarm',
			desc: 'Chào mừng bạn đến với AgriFarm',
			sub: [
				{
					sub_title: 'Vị trí và diện tích',
					sub_desc: 'Mảnh đất số 10 nằm ở Khu vực J, lô số 6 với diện tích 1500 m2',
				},
			],
		},
		images: [
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
			'https://thumbs.dreamstime.com/b/tapioca-garden-29310268.jpg',
		],
	},
];

export const ManageLandPage = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const [filterLandCondition, setFilterLandCondition] = useState('');
	const [selectedLand, setselectedLand] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalUpdateOpen, setisModalUpdateOpen] = useState(false);
	const [isModalAddOpen, setisModalAddOpen] = useState(false);

	const filteredLand = landList.filter((land) => {
		const matchesStatus = filterStatus ? land.status === filterStatus : true;
		const matchesLandCondition = filterLandCondition
			? land.landOfStatus === filterLandCondition
			: true;
		return matchesStatus && matchesLandCondition;
	});

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

	const columns = [
		{
			title: 'Mã Đất',
			dataIndex: 'landID',
			key: 'landID',
		},
		{
			title: 'Tên Mảnh Đất',
			dataIndex: 'nameLand',
			key: 'nameLand',
		},
		{
			title: 'Diện Tích',
			dataIndex: 'area',
			key: 'area',
		},
		{
			title: 'Vị Trí',
			dataIndex: 'position',
			key: 'position',
		},
		{
			title: 'Tình Trạng Đất',
			dataIndex: 'landOfStatus',
			key: 'landOfStatus',
			render: (landOfStatus) => (
				<Tag
					color={
						landOfStatus === 'Tốt'
							? 'green'
							: landOfStatus === 'Đang cải tạo'
								? 'orange'
								: landOfStatus === 'Cần cải tạo'
									? 'red'
									: 'gray'
					}
				>
					{landOfStatus}
				</Tag>
			),
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag
					color={
						status === 'Có thể sử dụng'
							? 'green'
							: status === 'Đang sử dụng'
								? 'blue'
								: status === 'Đang cải tạo'
									? 'orange'
									: 'red'
					}
				>
					{status}
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
					onChange={(value) => setFilterStatus(value)}
					style={{width: '20%', marginRight: 8}}
				>
					<Option value="">Tất cả</Option>
					<Option value="Có thể sử dụng">Có thể sử dụng</Option>
					<Option value="Đang sử dụng">Đang sử dụng</Option>
					<Option value="Đang cải tạo">Đang cải tạo</Option>
					<Option value="Tạm ngừng sử dụng">Tạm ngừng sử dụng</Option>
				</Select>

				<span>Lọc theo tình trạng đất:</span>
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
				</Select>
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
				dataSource={filteredLand}
				pagination={{pageSize: 5}}
				rowKey="landID"
				className={styles.tableContainer}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
			/>

			<ManageLandDetailModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				selectedLand={selectedLand}
			/>

			<ManageLandAddModal
				isModalOpen={isModalAddOpen}
				handleModalClose={() => setisModalAddOpen(false)}
			/>

			<ManageLandUpdateModal
				isModalOpen={isModalUpdateOpen}
				handleModalClose={handleModalUpdateClose}
				selectedLand={selectedLand}
			/>
		</div>
	);
};
