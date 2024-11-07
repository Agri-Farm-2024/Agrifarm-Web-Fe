import React from 'react';
import styles from './ManagePlantSeasonPage.module.css';
import {Descriptions, Modal, Tag} from 'antd';
import {formatDate, formatNumber} from '../../utils';

export const ManagePlantSeasonDetailModal = ({
	selectedPlantSeason,
	handleModalClose,
	isModalOpen,
}) => {
	const detailItems = selectedPlantSeason && [
		{
			key: 'ID',
			label: 'ID',
			children: <p>{selectedPlantSeason.plant_season_id}</p>,
		},
		{
			key: 'plant',
			label: 'Loại cây',
			children: <p>{selectedPlantSeason?.plant?.name}</p>,
		},
		{
			key: 'type',
			label: 'Loại mùa vụ',
			children: (
				<>
					{selectedPlantSeason.type == 'in_season' && <Tag color="blue">Mùa thuận</Tag>}
					{selectedPlantSeason.type == 'out_season' && (
						<Tag color="orange">Mùa nghịch</Tag>
					)}
				</>
			),
		},
		{
			key: 'month_start',
			label: 'Tháng bắt đầu',
			children: <p>{selectedPlantSeason?.month_start}</p>,
		},
		{
			key: 'total_month',
			label: 'Thời gian trồng của mùa vụ',
			children: <p>{selectedPlantSeason?.month_start} tháng</p>,
		},
		{
			key: 'price_purchase_per_kg',
			label: 'Đơn giá',
			children: <p>{formatNumber(selectedPlantSeason?.price_purchase_per_kg)} VND/kg</p>,
		},
		{
			key: 'price_process',
			label: 'Giá quy trình theo mùa vụ',
			children: <p>{formatNumber(selectedPlantSeason?.price_process)} VND</p>,
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<>
					{selectedPlantSeason.status == 'active' && (
						<Tag color="green">Đang áp dụng</Tag>
					)}
					{selectedPlantSeason.status == 'deleted' && (
						<Tag color="red">Ngừng áp dụng</Tag>
					)}
				</>
			),
		},
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{formatDate(selectedPlantSeason.created_at)}</p>,
		},
		{
			key: 'updated_at',
			label: 'Ngày cập nhật gần nhất',
			children: <p>{formatDate(selectedPlantSeason.updated_at)}</p>,
		},
	];
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin mùa vụ</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={800}
		>
			{selectedPlantSeason && (
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
