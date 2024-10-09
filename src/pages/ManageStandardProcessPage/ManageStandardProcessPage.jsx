import {Button, Input, Popconfirm, Select, Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {ManageStandardProcessDetailModal} from './ManageStandardProcessDetailModal';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ManageStandardProcessUpdateModal} from './ManageStandardProcessUpdateModal';
import {ManageStandardProcessCreateRequestModal} from './ManageStandardProcessCreateRequestModal';

const data = [
	{
		processId: 'GC001',
		processName: 'Quy trình trồng dưa lưới',
		plantName: 'Dưa lưới',
		createAt: '18/02/2022',
		updateAt: '18/02/2024',
		expertResponsible: 'Nguyen Van A',
		status: 'Có thể sử dụng',
		expectedTime: 200,
		processContent: {
			preparePlanting: [
				{
					prepareTitle: 'Chuẩn bị đất',
					prepareContent:
						'Mô tả: Làm sạch cỏ dại, cày xới đất và trộn đều phân bón hữu cơ. Kiểm tra độ pH của đất để đảm bảo đất có độ pH từ 5.5 đến 6.5. Công cụ và vật tư: Máy cày, phân bón hữu cơ, vôi bột. Thời gian thực hiện: 5 ngày (10/07/2024 - 15/07/2024)',
				},
			],
			plantingSchedule: [
				{
					stageTitle: 'Chuẩn bị trồng',
					dayFrom: 1,
					dayTo: 5,
					actions: [
						{
							dayFrom: 1,
							dayTo: 2,
							actionTitle: 'Chuẩn bị giá thể',
							actionDescription:
								'Bắt đầu xử lý mụn xơ dừa bằng cách ngâm và xả để loại bỏ tannin',
						},
						{
							stageTitle: 'Chuẩn bị trồng',
							dayFrom: 3,
							dayTo: 3,
							actionTitle: 'Gieo hạt',
							actionDescription:
								'Chuẩn bị bầu đất hoặc luống gieo hạt.\nGieo hạt cách nhau khoảng 5 cm trên bề mặt đất hoặc trong bầu đất, với độ sâu 1-2 cm.\nChe phủ một lớp mỏng đất hoặc rơm rạ để giữ ẩm cho hạt.',
						},
						{
							stageTitle: 'Chuẩn bị trồng',
							dayFrom: 4,
							dayTo: 5,
							actionTitle: 'Tưới Nước và Chăm Sóc Gieo Hạt',
							actionDescription:
								'Tưới nước nhẹ nhàng hàng ngày để giữ ẩm cho đất.\nĐảm bảo điều kiện nhiệt độ từ 18-22°C cho hạt nảy mầm.\nKiểm tra tỷ lệ nảy mầm và xử lý cây con không đều hoặc chết.',
						},
					],
				},
				{
					stageTitle: 'Chăm Sóc Cây Con',
					dayFrom: 6,
					dayTo: 9,
					actions: [
						{
							dayFrom: 6,
							dayTo: 7,
							actionTitle: 'Tiếp tục chăm sóc cây con',
							actionDescription:
								'Tiếp tục tưới nước đều đặn, giữ ẩm cho đất.\nLoại bỏ cỏ dại xung quanh cây con để giảm cạnh tranh dinh dưỡng',
						},
						{
							stageTitle: 'Chăm Sóc Cây Con',
							dayFrom: 8,
							dayTo: 9,
							actionTitle: 'Làm sạch cây con',
							actionDescription:
								'Thực hiện làm sạch cây con, loại bỏ cây yếu hoặc bị bệnh.\nBón thúc lần đầu bằng phân hữu cơ hoặc phân vi sinh (10-15 kg/ha) để kích thích sự phát triển.',
						},
					],
				},
			],
		},
	},
];

const statusOptions = [
	{
		value: 'Có thể sử dụng',
		label: 'Có thể sử dụng',
	},
	{
		value: 'Chờ phê duyệt',
		label: 'Chờ phê duyệt',
	},
	{
		value: 'Ngưng sử dụng',
		label: 'Ngưng sử dụng',
	},
];

const plantNameOptions = [
	{
		value: 'Dưa lưới',
		label: 'Dưa lưới',
	},
	{
		value: 'Dưa leo',
		label: 'Dưa leo',
	},
	{
		value: 'Dưa hấu',
		label: 'Dưa hấu',
	},
	{
		value: 'Cây ớt',
		label: 'Cây ớt',
	},
];

export const ManageStandardProcessPage = () => {
	const columns = [
		{
			title: 'ID quy trình',
			dataIndex: 'processId',
			key: 'processId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên quy trình',
			dataIndex: 'processName',
			key: 'processName',
		},
		{
			title: 'Giống cây',
			dataIndex: 'plantName',
			key: 'plantName',
		},
		{
			title: 'Người chịu trách nhiệm',
			dataIndex: 'expertResponsible',
			key: 'expertResponsible',
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createAt',
			key: 'createAt',
		},
		{
			title: 'Ngày cập nhật gần nhất',
			dataIndex: 'updateAt',
			key: 'updateAt',
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'Có thể sử dụng' && (
						<Tag color="green" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Ngưng sử dụng' && (
						<Tag color="red" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Chờ phê duyệt' && (
						<Tag color="gold" key={status}>
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
							setSelectedProcess(record);
							setIsUpdateModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>

					<Popconfirm
						onClick={(e) => e.stopPropagation()}
						title="Xoá quy trình"
						description="Bạn muốn xoá quy trình này?"
						onConfirm={handleRemovePlant}
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const handleRowClick = (record) => {
		setSelectedProcess(record);
		setIsModalOpen(true);
	};

	const handleRemovePlant = (e) => {
		e.stopPropagation();
		console.log('Remove Plant');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedProcess(null);
	};

	const handleUpdateModalClose = () => {
		setIsUpdateModalOpen(false);
		setSelectedProcess(null);
	};

	const handleCreateModalClose = () => {
		setIsCreateModalOpen(false);
		setSelectedProcess(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý quy trình canh tác chuẩn</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo tên quy trình:</span>
						<Input className={styles.filterInput} />
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo giống cây:</span>
						<Select
							style={{
								width: '50%',
							}}
							allowClear
							placeholder="Chọn giống cây"
							options={plantNameOptions}
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
						Tạo quy trình
					</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="processId"
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

				<ManageStandardProcessDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedProcess={selectedProcess}
				/>

				<ManageStandardProcessUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedProcess={selectedProcess}
				/>

				<ManageStandardProcessCreateRequestModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>
			</div>
		</div>
	);
};
