import {DatePicker, Input} from 'antd';
import React from 'react';
import styles from './BookingLandPage.module.css';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (_, {tags}) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<a>Invite {record.name}</a>
				<a>Delete</a>
			</Space>
		),
	},
];

const BookingLandPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Quản lý thuê đất</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo thời gian thuê (tháng):</span>
						<Input
							className={styles.filterInput}
							type="number"
							placeholder="Nhập số tháng thuê"
						/>
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo ngày thuê:</span>
						<DatePicker
							className={styles.filterInput}
							placeholder="Chọn ngày thuê"
							onChange={(date, dateString) => {
								console.log(date, dateString);
							}}
						/>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}></div>
		</div>
	);
};

export default BookingLandPage;
