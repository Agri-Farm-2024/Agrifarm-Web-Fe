import React, {useState} from 'react';
import {List, Badge, Avatar, Button, Typography} from 'antd';
import {toast} from 'react-toastify';
import {
	BellOutlined,
	DeleteOutlined,
	NotificationFilled,
	NotificationOutlined,
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

const {Title} = Typography;

const notifications = [
	{
		id: 1,
		title: 'Tin nhắn mới từ hỗ trợ',
		description: 'Yêu cầu hỗ trợ của bạn đã được cập nhật.',
		type: 'message',
	},
	{
		id: 2,
		title: 'Đã nhận thanh toán',
		description: 'Thanh toán cho hóa đơn #1234 của bạn đã thành công.',
		type: 'payment',
	},
	{
		id: 3,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},
	{
		id: 4,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},
	{
		id: 5,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},
	{
		id: 6,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},
	{
		id: 7,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},
	{
		id: 8,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},
	{
		id: 9,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},
	{
		id: 10,
		title: 'Bảo trì hệ thống',
		description: 'Hệ thống sẽ được bảo trì vào lúc 2 giờ sáng ngày mai.',
		type: 'alert',
	},

	// Thêm nhiều thông báo khác nếu cần
];

export const Notification = ({handleBellClick}) => {
	const [hoveredItem, setHoveredItem] = useState(null);
	const navigate = useNavigate();

	const handleNavigate = (navigateTo) => {
		handleBellClick();
		navigate(`/${navigateTo}`);
	};

	const callNotification = (title, desc, navigateTo) => {
		toast(
			<div>
				<strong>Đã nhận thanh toán</strong>
				<div>Thanh toán cho hóa đơn #1234 của bạn đã thành công.</div>
			</div>,
			{
				type: 'success',
				onClick: () => {
					handleNavigate(navigateTo);
				},
				position: 'top-right',
				autoClose: 3000,
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
				scrollbarWidth: 'thin', // For Firefox
				scrollbarColor: '#888 #e8e8e8', // For Firefox
				WebkitScrollbar: {
					width: '8px', // Width of the scrollbar
					height: '8px', // Height of the scrollbar (if needed)
				},
				WebkitScrollbarThumb: {
					backgroundColor: '#888', // Custom color for the scrollbar thumb
					borderRadius: '4px',
				},
				WebkitScrollbarTrack: {
					backgroundColor: '#e8e8e8', // Custom color for the track
					borderRadius: '4px',
				},
			}}
		>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Title level={4}>Thông báo</Title>
				<Button type="link" onClick={() => handleNavigate('')}>
					Xem tất cả
				</Button>
			</div>
			<div>
				<List
					itemLayout="horizontal"
					dataSource={notifications}
					renderItem={(item) => (
						<List.Item
							key={item.id}
							style={{
								paddingRight: 8,
								paddingLeft: 8,
								background: hoveredItem === item.id ? '#f0f0f0' : 'transparent',
								cursor: 'pointer',
							}}
							onMouseEnter={() => setHoveredItem(item.id)}
							onMouseLeave={() => setHoveredItem(null)}
							onClick={() =>
								callNotification(
									'Thông báo',
									'Thanh toán cho hóa đơn #1234 của bạn đã thành công.',
									'manage-plants'
								)
							}
						>
							<List.Item.Meta
								avatar={
									<Badge dot>
										<Avatar
											icon={
												item.type === 'message'
													? '📧'
													: item.type === 'payment'
														? '💵'
														: '⚠️'
											}
										/>
									</Badge>
								}
								title={item.title}
								description={item.description}
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
