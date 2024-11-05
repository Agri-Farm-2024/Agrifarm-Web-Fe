import React from 'react';
import styles from './ManageMaterialPage.module.css';
import {Descriptions, Modal, Tag} from 'antd';
import {formatDate, formatNumber} from '../../utils';

export const ManageMaterialDetailModal = ({selectedMaterial, handleModalClose, isModalOpen}) => {
	console.log('Selected Material', selectedMaterial);
	const detailItems = selectedMaterial && [
		{
			key: 'material_id',
			label: 'ID vật tư',
			children: <p>{selectedMaterial.material_id}</p>,
		},
		{
			key: 'name',
			label: 'Tên vật tư',
			children: <p>{selectedMaterial.name}</p>,
		},
		{
			key: 'type',
			label: 'Loại vật tư',
			children:
				selectedMaterial.type == 'buy' ? (
					<Tag color="geekblue">Bán</Tag>
				) : (
					<Tag color="purple">Cho thuê</Tag>
				),
		},
		{
			key: 'total_quantity',
			label: 'Số lượng',
			children: <p>{formatNumber(selectedMaterial.total_quantity)}</p>,
		},
		{
			key: 'unit',
			label: 'Đơn vị tính',
			children: (
				<>
					{selectedMaterial.unit == 'package' && <Tag color="purple">Túi</Tag>}
					{selectedMaterial.unit == 'bag' && <Tag color="geekblue">Bao</Tag>}
					{selectedMaterial.unit == 'piece' && <Tag color="orange">Cái</Tag>}
					{selectedMaterial.unit == 'bottle' && <Tag color="cyan">Chai</Tag>}
					{selectedMaterial.unit == 'square_meter' && <Tag color="magenta">m2</Tag>}
				</>
			),
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<>
					{selectedMaterial.status == 'available' && <Tag color="green">Có sẵn</Tag>}
					{selectedMaterial.status == 'out_of_stock' && <Tag color="red">Hết hàng</Tag>}
					{selectedMaterial.status == 'low' && <Tag color="gold">Sắp hết</Tag>}
				</>
			),
		},
		selectedMaterial.type == 'buy'
			? {
					key: 'price_per_piece',
					label: 'Giá bán',
					children: <p>{formatNumber(selectedMaterial.price_per_piece)} VND</p>,
				}
			: ({
					key: 'price_of_rent',
					label: 'Giá thuê',
					children: <p>{formatNumber(selectedMaterial.price_of_rent)} VND</p>,
				},
				{
					key: 'deposit_per_piece',
					label: 'Giá cọc',
					children: <p>{formatNumber(selectedMaterial.deposit_per_piece)} VND</p>,
				}),
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{formatDate(selectedMaterial.created_at)}</p>,
		},
		{
			key: 'updated_at',
			label: 'Ngày cập nhật gần nhất:',
			children: <p>{formatDate(selectedMaterial.updated_at)}</p>,
		},
	];
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin vật tư</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			width={1000}
		>
			{selectedMaterial && (
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
