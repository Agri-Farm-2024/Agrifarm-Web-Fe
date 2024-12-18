import React, {useEffect, useRef, useState} from 'react';
import {Card, Col, Row, Statistic, List, message} from 'antd';
import {Column, Line, Pie} from '@ant-design/plots';
import {useDispatch, useSelector} from 'react-redux';
import {getDashboardByManager} from '../../redux/slices/dashboard';
import socket from '../../services/socket';
import {toast} from 'react-toastify';
import {formatNumber} from '../../utils';

export default function ManagerDashBoardPages() {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState();
	const itemsPerPage = 10;

	const socketRef = useRef(null);

	const notifications = useSelector((state) => state.notificationSlice.notifications);
	const dashboardFromRedux = useSelector((state) => state.dashboardSlice.dashboardManager);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDashboardByManager());
	}, []);

	useEffect(() => {
		socketRef.current = socket;

		socketRef.current.on('dashboard', async (data) => {
			console.log(data);
			// toast.info('Cập nhật dashboard !!');
			dispatch(getDashboardByManager());
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.off('dashboard');
			}
		};
	}, []);

	useEffect(() => {
		const total =
			Object.entries(dashboardFromRedux?.lands || []).map(([name, {total_buy}]) => ({
				title: name,
				value: total_buy,
			})).length / itemsPerPage;
		setTotalPage(Math.ceil(total));
	}, [dashboardFromRedux]);

	const summaryData = [
		{title: 'Người thuê đất', value: dashboardFromRedux?.landrenter?.total, color: '#8BC34A'},
		{title: 'Yêu cầu thuê đất', value: dashboardFromRedux?.bookings?.total, color: '#8BC34A'},
		{title: 'Yêu cầu dịch vụ', value: dashboardFromRedux?.services?.total, color: '#8BC34A'},
		{
			title: 'Dịch vụ đang sử dụng',
			value: dashboardFromRedux?.services?.total_used,
			color: '#8BC34A',
		},
	];

	// const revenueData = [
	// 	{month: 'Tháng 1', revenue: 50000},
	// 	{month: 'Tháng 2', revenue: 55000},
	// 	{month: 'Tháng 3', revenue: 52000},
	// 	{month: 'Tháng 4', revenue: 61000},
	// 	{month: 'Tháng 5', revenue: 58000},
	// 	{month: 'Tháng 6', revenue: 59000},
	// 	{month: 'Tháng 7', revenue: 63000},
	// 	{month: 'Tháng 8', revenue: 60000},
	// 	{month: 'Tháng 9', revenue: 62000},
	// 	{month: 'Tháng 10', revenue: 65000},
	// 	{month: 'Tháng 11', revenue: 67000},
	// 	{month: 'Tháng 12', revenue: 69000},
	// ];

	const revenueData = Object.entries(dashboardFromRedux?.revenue || []).map(
		([month, {total_price}]) => ({
			month: 'Tháng ' + parseInt(month),
			revenue: total_price,
		})
	);

	// const landChartData = [
	// 	{land: 'Mảnh đất 8', status: 'Đang trống'},
	// 	{land: 'Mảnh đất 9', status: 'Đang sử dụng'},
	// 	{land: 'Mảnh đất 10', status: 'sửa chữa'},
	// 	{land: 'Mảnh đất 11', status: 'Đang sử dụng'},
	// 	{land: 'Mảnh đất 12', status: 'Đang trống'},
	// 	{land: 'Mảnh đất 13', status: 'Đang trống'},
	// 	{land: 'Mảnh đất 14', status: 'Đang trống'},
	// 	{land: 'Mảnh đất 16', status: 'Đang trống'},
	// 	{land: 'Mảnh đất 17', status: 'Đang trống'},
	// 	{land: 'Mảnh đất 18', status: 'Đang trống'},
	// ];

	const landChartData = dashboardFromRedux?.lands?.map((land) => {
		return {
			land: land?.name,
			status: land?.status,
		};
	});

	const paginatedData = landChartData?.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// const materialsChartData = [
	// 	{title: 'Vật tư 8', value: 20},
	// 	{title: 'Vật tư 9', value: 50},
	// 	{title: 'Vật tư 10', value: 80},
	// 	{title: 'Vật tư 11', value: 60},
	// 	{title: 'Vật tư 12', value: 30},
	// 	{title: 'Vật tư 13', value: 30},
	// 	{title: 'Vật tư 14', value: 30},
	// 	{title: 'Vật tư 16', value: 30},
	// 	{title: 'Vật tư 17', value: 30},
	// 	{title: 'Vật tư 18', value: 30},
	// ];

	const materialsChartData = Object.entries(dashboardFromRedux?.orders_material || []).map(
		([name, {total_buy}]) => ({
			title: name,
			value: total_buy,
		})
	);

	// const pieChartData = [
	// 	{type: 'Gói 1', value: 38.6},
	// 	{type: 'Gói 2', value: 22.5},
	// 	{type: 'Gói 3', value: 30.8},
	// 	{type: 'Gói khác', value: 8.1},
	// ];

	const pieChartData = Object.entries(dashboardFromRedux?.service_packages || []).map(
		([name, {total_buy}]) => ({
			type: name,
			value: total_buy,
		})
	);

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

	const revenueLineConfig = {
		data: revenueData,
		xField: 'month',
		yField: 'revenue',

		color: '#3f51b5',
		point: {
			size: 5,
			shape: 'diamond',
		},
		label: {
			style: {
				fill: '#3f51b5',
			},
		},
		style: {
			lineWidth: 3,
		},
		smooth: true,
		tooltip: {
			channel: 'y', // Target the 'y' channel for the tooltip
			name: 'Doanh thu',
			valueFormatter: (value) => `${value.toLocaleString()} VND`, // Format revenue as currency
		},
	};

	// Define color mapping for each status
	const colorMapping = {
		free: '#8BC34A', // Green
		booked: 'red', // Orange
		'Sửa chữa': '#F44336', // Red
	};

	// Prepare the column chart configuration
	const columnConfig = {
		data: paginatedData,
		xField: 'land',
		yField: ({status}) => (status === 'booked' ? 'Đã khóa' : 'Có thể sử dụng'),
		colorField: ({status}) => (status === 'booked' ? 'Đã khóa' : 'Có thể sử dụng'),
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
								value={`${item.value} ${item.title === 'Người thuê đất' ? 'tài khoản' : 'yêu cầu'}`}
								valueStyle={{color: '#fff', fontWeight: 'bold'}}
							/>
						</Card>
					</Col>
				))}
			</Row>

			<Row gutter={16}>
				<Col span={18}>
					<Card title="Doanh thu theo tháng (VND)" style={{marginBottom: 24}}>
						<Line {...revenueLineConfig} />
					</Card>
					<div style={{marginTop: 30, marginBottom: 10}}>
						<button
							style={{marginRight: 10, background: '#8BC34A'}}
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						>
							Trang trước
						</button>
						<button
							style={{background: '#8BC34A'}}
							onClick={() => {
								if (currentPage >= totalPage) {
									message.info('Đã là trang cuối');
									return;
								} else {
									setCurrentPage((prev) => prev + 1);
								}
							}}
						>
							Trang sau
						</button>
					</div>
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
							overflowY: 'scroll',
							marginBottom: 20,
							height: 2000,
							scrollBehavior: 'smooth',
							borderBottom: '1px solid',
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
