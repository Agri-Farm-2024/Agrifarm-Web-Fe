import React from 'react';
import styles from './ManageAccountPage.module.css';
import {Descriptions, Modal, Tag} from 'antd';

export const ManageAccountDetailModal = ({selectedAccount, handleModalClose, isModalOpen}) => {
	const detailItems = selectedAccount && [
		{
			key: 'accountId',
			label: 'ID tài khoản',
			children: <p>{selectedAccount.accountId}</p>,
		},
		{
			key: 'accountName',
			label: 'Họ và tên',
			children: <p>{selectedAccount.accountName}</p>,
		},
		{
			key: 'role',
			label: 'Trạng thái',
			children: (
				<>
					{selectedAccount.role == 'landRenter' && (
						<Tag color="geekblue">Nguời thuê đất</Tag>
					)}
					{selectedAccount.role == 'manager' && <Tag color="magenta">Quản lý</Tag>}
					{selectedAccount.role == 'staff' && <Tag color="gold">Nhân viên</Tag>}
					{selectedAccount.role == 'expert' && (
						<Tag color="cyan">Chuyên gia nông nghiệp</Tag>
					)}
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
			children: <p>{selectedAccount.phone}</p>,
		},
		{
			key: 'dob',
			label: 'Ngày sinh',
			children: <p>{selectedAccount.dob}</p>,
		},
		{
			key: 'address',
			label: 'Địa chỉ',
			children: <p>{selectedAccount.address}</p>,
		},

		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<Tag color={selectedAccount.status == 'active' ? 'green' : 'red'}>
					{selectedAccount.status == 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
				</Tag>
			),
		},
		{
			key: 'createAt',
			label: 'Ngày tạo',
			children: <p>{selectedAccount.createAt}</p>,
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
