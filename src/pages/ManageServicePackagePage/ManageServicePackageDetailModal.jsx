import React from 'react';
import styles from './ManageServicePackagePage.module.css';
import {Descriptions, Modal, Space, Tag} from 'antd';
import {formatDate, formatNumber} from '../../utils';

export const ManageServicePackageDetailModal = ({
	selectedServicePackage,
	handleModalClose,
	isModalOpen,
}) => {
	const detailItems = selectedServicePackage && [
		{
			key: 'ID',
			label: 'ID',
			children: <p>{selectedServicePackage.id}</p>,
		},
		{
			key: 'name',
			label: 'Tên gói dịch vụ',
			children: <p>{selectedServicePackage?.name}</p>,
		},
		{
			key: 'description',
			label: 'Mô tả',
			children: <p>{selectedServicePackage?.description}</p>,
		},
		{
			key: 'option_service',
			label: 'Dịch vụ kèm theo',
			children: (
				<Space>
					{selectedServicePackage.purchase && <Tag color="geekblue">Bao tiêu</Tag>}
					{selectedServicePackage.material && <Tag color="purple">Bao vật tư</Tag>}
				</Space>
			),
		},
		{
			key: 'price',
			label: 'Giá gói dịch vụ',
			children: <p>{selectedServicePackage.price} VND</p>,
		},
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{formatDate(selectedServicePackage.created_at)}</p>,
		},
		{
			key: 'updated_at',
			label: 'Ngày cập nhật gần nhất',
			children: <p>{formatDate(selectedServicePackage.updated_at)}</p>,
		},
	];
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin gói dịch vụ</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={800}
		>
			{selectedServicePackage && (
				<Descriptions
					style={{marginTop: 20}}
					labelStyle={{width: '13rem', fontWeight: 'bold'}}
					column={1}
					bordered
					items={detailItems}
				/>
			)}
		</Modal>
	);
};
