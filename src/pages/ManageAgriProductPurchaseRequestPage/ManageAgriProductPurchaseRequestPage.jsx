import {Button, DatePicker, Popconfirm, Select, Space, Table, Tag, Tooltip, message} from 'antd';
import React, {useState} from 'react';
import styles from './ManageAgriProductPurchaseRequestPage.module.css';
import {ManageAgriProductPurchaseRequestDetailModal} from './ManageAgriProductPurchaseRequestDetailModal';
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';

let data = [
	{
		requestId: 'YC001',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Chấp nhận',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC002',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Từ chối',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: '',
	},
	{
		requestId: 'YC003',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Đợi xử lý',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC004',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Đang kiểm tra',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC005',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Đợi phê duyệt',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
	{
		requestId: 'YC006',
		customerName: 'Nguyen Van A',
		phone: '0987834783',
		plantName: 'Dưa lưới',
		unitPrice: 100000,
		unitMeasure: 'kg',
		expectOutput: 2000,
		totalPrice: 100000000,
		createAt: '20/03/2023',
		landName: 'Mảnh đất số 1',
		purchaseExpert: 'Nguyen Van B',
		status: 'Từ chối',
		expectPurchaseDate: '20/03/2023',
		quality: 'Cao',
		imageReport: 'https://hatinh.gov.vn/uploads/topics/16558050012585.jpg',
	},
];

const statusOptions = [
	{
		value: 'Đang làm',
		label: 'Đang làm',
	},
	{
		value: 'Nghỉ việc',
		label: 'Nghỉ việc',
	},
];

const roleOptions = [
	{
		value: 'Chuyên viên nông nghiệp',
		label: 'Chuyên viên nông nghiệp',
	},
	{
		value: 'Nhân viên trang trại',
		label: 'Nhân viên trang trại',
	},
];

export const ManageAgriProductPurchaseRequestPage = () => {
	const columns = [
		{
			title: 'ID yêu cầu',
			dataIndex: 'requestId',
			key: 'requestId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Tên nông sản',
			dataIndex: 'plantName',
			key: 'plantName',
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Nhân viên phụ trách',
			dataIndex: 'purchaseExpert',
			key: 'purchaseExpert',
		},
		{
			title: 'Ngày gửi yêu cầu',
			dataIndex: 'createAt',
			key: 'createAt',
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
					{status == 'Đợi xử lý' && (
						<Tag color="red" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Đợi phê duyệt' && (
						<Tag color="gold" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Đang kiểm tra' && (
						<Tag color="magenta" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Từ chối' && (
						<Tag color="default" key={status}>
							{status}
						</Tag>
					)}
				</>
			),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record, index) => (
				<Space size="middle">
					<Tooltip title="Chấp nhận">
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Chấp nhận yêu cầu"
							description="Bạn muốn chấp nhận yêu cầu này?"
							onConfirm={(e) => handleChangeStatusRequest(e, 'approve', index)}
							onCancel={(e) => e.stopPropagation()}
							okText="Chấp nhận"
							cancelText="Huỷ"
						>
							<Button
								disabled={record.status != 'Đợi phê duyệt' ? true : false}
								color="primary"
								variant="filled"
								icon={<CheckOutlined />}
							></Button>
						</Popconfirm>
					</Tooltip>
					<Tooltip title="Từ chối">
						<Popconfirm
							onClick={(e) => e.stopPropagation()}
							title="Từ chối yêu cầu"
							description="Bạn muốn từ chối yêu cầu này?"
							onConfirm={(e) => handleChangeStatusRequest(e, 'reject', index)}
							onCancel={(e) => e.stopPropagation()}
							okText="Từ chối"
							cancelText="Huỷ"
						>
							<Button
								disabled={record.status != 'Đợi phê duyệt' ? true : false}
								color="danger"
								variant="filled"
								icon={<CloseOutlined />}
							></Button>
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];
	const [dataSource, setDataSource] = useState(data);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);

	const handleChangeStatusRequest = (e, actionType, requestIndex) => {
		e.stopPropagation();
		let newData = [...dataSource];
		if (actionType == 'approve') {
			newData[requestIndex].status = 'Chấp nhận';
			message.success('Đã chấp nhận yêu cầu');
		}

		if (actionType == 'reject') {
			newData[requestIndex].status = 'Từ chối';
			message.success('Đã từ chối yêu cầu');
		}
		setDataSource(newData);
	};

	const handleRowClick = (record) => {
		setSelectedPurchaseRequest(record);
		setIsModalOpen(true);
	};

	const handleSuspendEmployee = (e) => {
		e.stopPropagation();
		console.log('Suspend employee');
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedPurchaseRequest(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý yêu cầu thu mua</p>
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
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="requestId"
					dataSource={dataSource}
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

				<ManageAgriProductPurchaseRequestDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedPurchaseRequest={selectedPurchaseRequest}
				/>
			</div>
		</div>
	);
};
