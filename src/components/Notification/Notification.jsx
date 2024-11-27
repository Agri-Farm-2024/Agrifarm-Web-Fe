import React, {useEffect, useRef, useState} from 'react';
import {List, Badge, Avatar, Button, Typography} from 'antd';
import {toast} from 'react-toastify';
import {
	BellOutlined,
	DeleteOutlined,
	NotificationFilled,
	NotificationOutlined,
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import socket from '../../services/socket';
import useSelection from 'antd/es/table/hooks/useSelection';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '../../services/api';
import {fetchNotifications, markToSeenNoti} from '../../redux/slices/notificationSlice';

const {Title} = Typography;

// const notifications = [
// 	{
// 		id: 1,
// 		title: 'Tin nhắn mới từ hỗ trợ',
// 		description: 'Yêu cầu hỗ trợ của bạn đã được cập nhật.',
// 		type: 'message',
// 	},
// 	{
// 		id: 2,
// 		title: 'Đã nhận thanh toán',
// 		description: 'Thanh toán cho hóa đơn #1234 của bạn đã thành công.',
// 		type: 'payment',
// 	},
// 	{
// 		id: 3,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},
// 	{
// 		id: 4,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},
// 	{
// 		id: 5,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},
// 	{
// 		id: 6,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},
// 	{
// 		id: 7,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},
// 	{
// 		id: 8,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},
// 	{
// 		id: 9,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},
// 	{
// 		id: 10,
// 		title: 'Bảo trì hệ thống',
// 		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
// 		type: 'alert',
// 	},

// 	// Thêm nhiều thông báo khác nếu cần
// ];

export const Notification = ({handleBellClick}) => {
	const notifications = useSelector((state) => state.notificationSlice?.notifications);
	const [hoveredItem, setHoveredItem] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleNavigate = (navigateTo) => {
		handleBellClick();
		navigate(`/${navigateTo}`);
	};

	const callNotification = (title, desc, navigateTo) => {
		toast(
			<div>
				<strong
					style={{
						fontSize: 14,
					}}
				>
					{title}
				</strong>
				<div
					style={{
						fontSize: 12,
					}}
				>
					{desc}
				</div>
			</div>,
			{
				type: 'success',
				onClick: () => {
					navigate(navigateTo);
				},
				position: 'bottom-right',
				autoClose: 100000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				icon: <BellOutlined />,
				progress: undefined,
			}
		);
	};

	return (
		<div
			style={{
				maxWidth: 400,
				margin: '0 auto',
				paddingTop: 16,
				paddingBottom: 16,
				border: '1px solid #e8e8e8',
				borderRadius: 8,
				maxHeight: 700,
				overflowY: 'auto',
				scrollbarWidth: 'thin',
				scrollbarColor: '#888 #e8e8e8',
				WebkitScrollbar: {
					width: '8px',
					height: '8px',
				},
				WebkitScrollbarThumb: {
					backgroundColor: '#888',
					borderRadius: '4px',
				},
				WebkitScrollbarTrack: {
					backgroundColor: '#e8e8e8',
					borderRadius: '4px',
				},
			}}
		>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Title level={4}>Thông báo</Title>
				<Button
					type="link"
					onClick={() => {
						dispatch(markToSeenNoti()).then((res) => {
							dispatch(fetchNotifications({pageSize: 1000, pageIndex: 1}));
						});
					}}
				>
					Đánh dấu đã xem
				</Button>
			</div>
			<div>
				<List
					itemLayout="horizontal"
					dataSource={notifications}
					renderItem={(item) => (
						<List.Item
							key={item.notification_id}
							style={{
								paddingRight: 8,
								paddingLeft: 8,
								background:
									hoveredItem === item.notification_id
										? '#f0f0f0'
										: 'transparent',
								cursor: 'pointer',
							}}
							onMouseEnter={() => setHoveredItem(item.notification_id)}
							onMouseLeave={() => setHoveredItem(null)}
							onClick={() =>
								callNotification(
									'Thanh toán cho hóa đơn #1234 của bạn đã thành công.',
									'Thanh toán cho hóa đơn #1234 của bạn đã thành công.',
									'manage-plants'
								)
							}
						>
							<List.Item.Meta
								avatar={
									<Badge dot={item.is_seen === false}>
										<Avatar
											icon={
												item.type === 'booking_land'
													? '🏞️'
													: item.type === 'payment'
														? '💵'
														: item.type === 'task'
															? '📋'
															: item.type === 'request'
																? '📥'
																: item.type === 'material'
																	? '🔧'
																	: item.type === 'dinary'
																		? '📖'
																		: item.type === 'process'
																			? '⚙️'
																			: item.type ===
																				  'channel'
																				? '📡'
																				: item.type ===
																					  'report'
																					? '📊'
																					: '⚠️' // Default icon
											}
										/>
									</Badge>
								}
								title={item.title}
								description={item.content}
							/>
						</List.Item>
					)}
				/>
			</div>
			<Button
				type="link"
				style={{
					width: '100%',
					textAlign: 'center',
					marginTop: 8,
					color: '#8bc34a',
					fontWeight: 'bold',
				}}
			>
				Xem thông báo cũ
			</Button>
		</div>
	);
};
