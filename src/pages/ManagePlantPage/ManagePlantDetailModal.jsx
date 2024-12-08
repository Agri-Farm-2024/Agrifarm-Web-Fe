import React from 'react';
import {Descriptions, Modal, Tag} from 'antd';
import {capitalizeFirstLetter, formatNumber} from '../../utils';

export const ManagePlantDetailModal = ({selectedPlant, handleModalClose, isModalOpen}) => {
	const detailItems = selectedPlant && [
		{
			key: 'plant',
			label: 'Loại cây',
			children: <p>{capitalizeFirstLetter(selectedPlant.name)}</p>,
		},
		{
			key: 'land_type_id',
			label: 'Loại đất phù hợp',
			children: (
				<p>
					{capitalizeFirstLetter(selectedPlant.land_type && selectedPlant.land_type.name)}
				</p>
			),
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<Tag title="Đang hỗ trợ" color={selectedPlant.status == 'active' ? 'green' : 'red'}>
					{selectedPlant.status == 'active' ? 'Đang hỗ trợ' : 'Ngừng hỗ trợ'}
				</Tag>
			),
		},
	];
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin giống cây</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={800}
			centered
		>
			{selectedPlant && (
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
