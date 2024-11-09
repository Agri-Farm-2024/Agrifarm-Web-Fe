import {Button, Space, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './ManageLandTypePage.module.css';
import {formatDate, shortenText} from '../../utils';
import {ManageLandTypeDetailModal} from './ManageLandTypeDetailModal';
import {EditOutlined} from '@ant-design/icons';
import {ManageLandTypeUpdateModal} from './ManageLandTypeUpdateModal';
import {ManageLandTypeCreateModal} from './ManageLandTypeCreateModal';
import {useDispatch, useSelector} from 'react-redux';
import {getLandTypeListSelector, isLoadingLandSelector} from '../../redux/selectors';
import {getLandType} from '../../redux/slices/landSlice';

export const ManageLandTypePage = () => {
	const columns = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => <a>{(currentPage - 1) * 10 + index + 1}</a>,
		},
		{
			title: 'Loại đất',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			render: (description) => <p>{shortenText(description, 100)}</p>,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (createAt) => <p>{formatDate(createAt, 0)}</p>,
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
							setSelectedLandType(record);
							setIsUpdateModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<EditOutlined />}
					></Button>
				</Space>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [selectedLandType, setSelectedLandType] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const landTypeList = useSelector(getLandTypeListSelector);
	const loading = useSelector(isLoadingLandSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchLandTypeList();
	}, []);

	const fetchLandTypeList = () => {
		try {
			dispatch(getLandType());
		} catch (error) {
			console.log('Error fetching land type list: ' + error);
		}
	};

	const handleRowClick = (record) => {
		setSelectedLandType(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedLandType(null);
	};

	const handleUpdateModalClose = (isUpdateSucess) => {
		if (isUpdateSucess) {
			fetchLandTypeList(currentPage);
		}
		setIsUpdateModalOpen(false);
		setSelectedLandType(null);
	};

	const handleCreateModalClose = (isCreateSucess) => {
		if (isCreateSucess) {
			fetchLandTypeList();
		}
		setIsCreateModalOpen(false);
		setSelectedLandType(null);
	};
	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý loại đất</p>
				<div className={styles.filterContainer}>
					<Button
						type="primary"
						onClick={() => {
							setIsCreateModalOpen(true);
						}}
					>
						Tạo loại đất
					</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="landTypeId"
					loading={loading}
					dataSource={landTypeList || []}
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
					}}
					className={styles.table}
				/>

				<ManageLandTypeDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedLandType={selectedLandType}
				/>

				<ManageLandTypeCreateModal
					isModalOpen={isCreateModalOpen}
					handleModalClose={handleCreateModalClose}
				/>

				<ManageLandTypeUpdateModal
					isModalOpen={isUpdateModalOpen}
					handleModalClose={handleUpdateModalClose}
					selectedLandType={selectedLandType}
				/>
			</div>
		</div>
	);
};
