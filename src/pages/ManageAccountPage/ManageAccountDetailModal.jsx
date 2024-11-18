import React from 'react';
import styles from './ManageAccountPage.module.css';
import {Descriptions, Modal, Tag} from 'antd';

export const ManageAccountDetailModal = ({selectedAccount, handleModalClose, isModalOpen}) => {
	console.log(selectedAccount);
	const detailItems = selectedAccount && [
		{
			key: 'accountId',
			label: 'ID tài khoản',
			children: <p>{selectedAccount.user_id}</p>,
		},
		{
			key: 'accountName',
			label: 'Họ và tên',
			children: <p>{selectedAccount.full_name}</p>,
		},
		{
			key: 'role',
			label: 'Trạng thái',
			children: (
				<>
					{selectedAccount.role == 4 && <Tag color="geekblue">Nguời thuê đất</Tag>}
					{selectedAccount.role == 1 && <Tag color="magenta">Quản lý</Tag>}
					{selectedAccount.role == 2 && <Tag color="gold">Nhân viên</Tag>}
					{selectedAccount.role == 3 && <Tag color="cyan">Chuyên gia nông nghiệp</Tag>}
				</>
			),
		},
		{
			key: 'email',
			label: 'Email',
			children: <p>{selectedAccount.email}</p>,
		},
		{
			key: 'phone',
			label: 'Số điện thoại',
			children: <p>{selectedAccount.phone ? selectedAccount.phone : 'Chưa có'}</p>,
		},
		{
			key: 'dob',
			label: 'Ngày sinh',
			children: <p>{selectedAccount.dob}</p>,
		},
		{
			key: 'address',
			label: 'Ngày tạo',
			children: <p>{selectedAccount.created_at}</p>,
		},

		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<Tag color={selectedAccount.status == 'active' ? 'green' : 'red'}>
					{selectedAccount.status == 'active' ? 'Đang hoạt động' : 'Chưa hoạt động'}
				</Tag>
			),
		},
	];
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin tài khoản</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			style={{top: 20}}
			width={800}
		>
			{selectedAccount && (
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
