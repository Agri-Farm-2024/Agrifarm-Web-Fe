import React from 'react';
import {Descriptions, Modal, Tag} from 'antd';
import {formatDate, formatNumber} from '../../utils';

export const ManageLandTypeDetailModal = ({selectedLandType, handleModalClose, isModalOpen}) => {
	const detailItems = selectedLandType && [
		{
			key: 'land_type_id',
			label: 'ID loại đất',
			children: <p>{selectedLandType.land_type_id}</p>,
		},
		{
			key: 'name',
			label: 'Loại đất',
			children: <p>{selectedLandType.name}</p>,
		},
		{
			key: 'description',
			label: 'Mô tả',
			children: <p>{selectedLandType.description}</p>,
		},
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{formatDate(selectedLandType.created_at, 0)}</p>,
		},
		{
			key: 'updated_at',
			label: 'Ngày cập nhật gần nhất',
			children: <p>{formatDate(selectedLandType.updated_at, 0)}</p>,
		},
	];
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin loại đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={800}
			centered
		>
			{selectedLandType && (
				<Descriptions
					style={{marginTop: 20}}
					labelStyle={{width: '15rem', fontWeight: 'bold'}}
					column={1}
					bordered
					items={detailItems}
				/>
			)}
		</Modal>
	);
};
