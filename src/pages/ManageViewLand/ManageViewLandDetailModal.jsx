import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Modal, Tag} from 'antd';
import {formatNumber} from '../../utils';
import {getRequestById} from '../../redux/slices/requestSlice';
import {useDispatch} from 'react-redux';

export const ManageViewLandDetailModal = ({
	selectedRequest,
	handleModalClose,
	isModalOpen,
	handleOpenAssignModal,
}) => {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		id: '',
		created_at: '',
		updated_at: '',
		guest_full_name: null,
		guest_email: '',
		guest_phone: '',
		description: '',
		time_start: '',
		time_end: null,
		sender_id: null,
		support_type: '',
		type: '',
		status: '',
		task: {
			id: '',
			assigned_at: null,
			assign_by: null,
			assign_to: null,
		},
	});
	useEffect(() => {
		dispatch(getRequestById(selectedRequest?.id))
			.then((res) => {
				if (res.payload.statusCode === 200) {
					console.log(res.payload.metadata);
					setData(res.payload.metadata);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [selectedRequest]);

	console.log('data: ' + JSON.stringify(data));

	const detailItems = data && [
		// {
		// 	key: 'ID',
		// 	label: 'ID',
		// 	children: <p>{data.id}</p>,
		// },
		{
			key: 'guest_full_name',
			label: 'Tên khách hàng',
			children: <div>{data.guest_full_name}</div>,
		},
		{
			key: 'guest_email',
			label: 'Email',
			children: <span>{data.guest_email}</span>,
		},
		{
			key: 'guest_phone',
			label: 'Điện thoại',
			children: <span>{data.guest_phone}</span>,
		},
		{
			key: 'time_start',
			label: 'Thời gian',
			children: (
				<span>
					{new Date(data.time_start).toLocaleString('vi-VN', {
						year: 'numeric',
						month: 'long',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
						timeZone: 'Asia/Ho_Chi_Minh',
					})}
				</span>
			),
		},
		{
			key: 'description',
			label: 'Tin nhắn',
			children: <span>{data.description}</span>,
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<Tag
					title="Đang hỗ trợ"
					color={
						data.status == 'completed'
							? 'green'
							: data.status == 'pending'
								? 'orange'
								: 'blue'
					}
				>
					{data.status == 'completed'
						? 'Hoàn thành'
						: data.status == 'pending'
							? 'Chờ phân công'
							: 'Đã phân công'}
				</Tag>
			),
		},
		{
			key: 'Phân công cho',
			label: 'Phân công cho',
			children: (
				<span>
					{data.task?.assign_to ? (
						data.task?.assign_to.full_name
					) : (
						<Button
							disabled={data.status !== 'pending'}
							type="primary"
							onClick={(e) => {
								e.stopPropagation();
								handleOpenAssignModal(data.task?.id);
							}}
						>
							Chọn nhân viên
						</Button>
					)}
				</span>
			),
		},
		{
			key: 'Phân công bởi',
			label: 'Phân công bởi',
			children: (
				<span>{data.task?.assign_by ? data.task?.assign_by.full_name : 'Chưa có'}</span>
			),
		},
	];

	console.log('Selcted Detail', selectedRequest);
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin yêu cầu xem đất</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={600}
			centered
		>
			{selectedRequest && (
				<Descriptions
					style={{marginTop: 20}}
					labelStyle={{width: '10rem', fontWeight: 'bold'}}
					column={1}
					bordered
					items={detailItems}
				/>
			)}
		</Modal>
	);
};