import React from 'react';
import {Card, Col, Row, Statistic, List} from 'antd';
import {Column, Pie} from '@ant-design/plots';
import {useSelector} from 'react-redux';

export default function DashboardPage() {
	const notifications = useSelector((state) => state.notificationSlice.notifications);

	const summaryData = [
		{title: 'Người thuê đất', value: 7265, color: '#8BC34A'},
		{title: 'Yêu cầu hỗ trợ', value: 3671, color: '#8BC34A'},
		{title: 'Yêu cầu thuê đất', value: 156, color: '#8BC34A'},
		{title: 'Yêu cầu thu mua', value: 2318, color: '#8BC34A'},
	];

	const landChartData = [
		{land: 'Mảnh đất 8', status: 'Đang trống'},
		{land: 'Mảnh đất 9', status: 'Đang sử dụng'},
		{land: 'Mảnh đất 10', status: 'sửa chữa'},
		{land: 'Mảnh đất 11', status: 'Đang sử dụng'},
		{land: 'Mảnh đất 12', status: 'Đang trống'},
		{land: 'Mảnh đất 13', status: 'Đang trống'},
		{land: 'Mảnh đất 14', status: 'Đang trống'},
		{land: 'Mảnh đất 16', status: 'Đang trống'},
		{land: 'Mảnh đất 17', status: 'Đang trống'},
		{land: 'Mảnh đất 18', status: 'Đang trống'},
	];

	const materialsChartData = [
		{title: 'Vật tư 8', value: 20},
		{title: 'Vật tư 9', value: 50},
		{title: 'Vật tư 10', value: 80},
		{title: 'Vật tư 11', value: 60},
		{title: 'Vật tư 12', value: 30},
		{title: 'Vật tư 13', value: 30},
		{title: 'Vật tư 14', value: 30},
		{title: 'Vật tư 16', value: 30},
		{title: 'Vật tư 17', value: 30},
		{title: 'Vật tư 18', value: 30},
	];

	const pieChartData = [
		{type: 'Gói 1', value: 38.6},
		{type: 'Gói 2', value: 22.5},
		{type: 'Gói 3', value: 30.8},
		{type: 'Gói khác', value: 8.1},
	];

	// const notifications = [
	// 	{message: 'Bạn đã sửa một lỗi', time: 'Vừa xong'},
	// 	{message: 'Người dùng mới đã đăng ký', time: '59 phút trước'},
	// 	{message: 'Bạn đã sửa một lỗi', time: '12 giờ trước'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// 	{message: 'Andi Lane đã theo dõi bạn', time: 'Hôm nay, 11:59 AM'},
	// ];

	// Define color mapping for each status
	const colorMapping = {
		'Đang trống': '#8BC34A', // Green
		'Đang sử dụng': 'red', // Orange
		'Sửa chữa': '#F44336', // Red
	};

	// Prepare the column chart configuration
	const columnConfig = {
		data: landChartData,
		xField: 'land',
		yField: 'status',
		colorField: 'status',
		columnWidthRatio: 0.3,
		color: ({status}) => colorMapping[status],
		tooltip: {
			showMarkers: true,
			customContent: (title, items) => {
				return `<div style="padding:10px"><strong>${title}</strong><br/>Status: ${items[0]?.data?.status}</div>`;
			},
		},
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
			},
		},
	};

	const columnMaterialsConfig = {
		data: materialsChartData,
		xField: 'title',
		yField: 'value',
		color: '#8BC34A',
		columnWidthRatio: 0.5,
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
			},
		},
	};

	const pieConfig = {
		data: pieChartData,
		angleField: 'value',
		colorField: 'type',
		radius: 0.75,
		label: {
			text: 'value',
			style: {
				fontWeight: 'bold',
			},
		},
	};

	return (
		<div style={{padding: 24}}>
			<Row gutter={16} style={{marginBottom: 24}}>
				{summaryData.map((item, index) => (
					<Col span={6} key={index}>
						<Card style={{backgroundColor: item.color, color: '#fff'}}>
							<Statistic
								title={
									<div style={{color: 'white', fontWeight: 600}}>
										{item.title}
									</div>
								}
								value={`${item.value} yêu cầu`}
								valueStyle={{color: '#fff', fontWeight: 'bold'}}
							/>
						</Card>
					</Col>
				))}
			</Row>

			<Row gutter={16}>
				<Col span={18}>
					<Card title="Tình trạng đất trồng" style={{marginBottom: 24}}>
						<Column {...columnConfig} />
					</Card>
					<Row gutter={24} style={{marginBottom: 24}}>
						<Col span={12}>
							{' '}
							{/* Adjust the span according to your layout needs */}
							<Card title="Vật tư tiêu thụ">
								<Column {...columnMaterialsConfig} />
							</Card>
						</Col>
						<Col span={12}>
							{' '}
							{/* Adjust the span according to your layout needs */}
							<Card title="Sử dụng dịch vụ">
								<Pie {...pieConfig} />
							</Card>
						</Col>
					</Row>
				</Col>

				<Col span={6}>
					<Card
						title="Thông báo"
						style={{
							marginBottom: 20,
							height: 1000,
							scrollBehavior: 'smooth',
							overflow: 'scroll-y',
						}}
					>
						<List
							dataSource={notifications}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta title={item.title} description={item.content} />
								</List.Item>
							)}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
