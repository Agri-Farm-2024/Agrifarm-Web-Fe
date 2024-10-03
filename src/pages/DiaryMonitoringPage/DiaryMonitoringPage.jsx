import {DatePicker, Input, Table, Tag, Button, Space, Select, Modal} from 'antd';
import React, {useState} from 'react';
import styles from './DiaryMonitoringPage.module.css';
import {formatNumber} from '../../utils';
import {DiaryMonitoringDetailModal} from './DiaryMonitoringDetailModal';
import {BellOutlined} from '@ant-design/icons';

const data = [
	{
		logId: 'NK001',
		customerName: 'Nguyen Van A',
		landName: 'Mảnh đất số 1',
		loggingDate: '26/09/2020',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Hoàn thành',
		totalPrice: 100000,
		lastestContent: 'Mảnh đất cần cải tạo lại do đất bị sụt lún.',
		plantType: 'Dưa lưới Taki',
		services: ['Canh tác VietGAP', 'Vật tư'],
		createAt: '28/08/2024',
		diaryTitle: 'Nhật ký trồng dưa lưới 28/4 - 28/6',
		diaryContent: [
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '24/03/2024',
				dayTo: '27/03/2024',
				actionTitle: 'Chuẩn bị giá thể',
				actionDescription:
					'Bắt đầu xử lý mụn xơ dừa bằng cách ngâm và xả để loại bỏ tannin',
				imageReport: [
					'https://tiimg.tistatic.com/fp/1/007/500/soil-food-agriculture-vermicompost-1-kg-pack-used-in-all-types-of-crops-733.jpg',
					'https://lzd-img-global.slatic.net/g/p/0e5b66a7e2a76f41f3ee8afc149f42bf.jpg_720x720q80.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '28/03/2024',
				dayTo: '28/03/2024',
				actionTitle: 'Gieo hạt',
				actionDescription:
					'Chuẩn bị bầu đất hoặc luống gieo hạt.\nGieo hạt cách nhau khoảng 5 cm trên bề mặt đất hoặc trong bầu đất, với độ sâu 1-2 cm.\nChe phủ một lớp mỏng đất hoặc rơm rạ để giữ ẩm cho hạt.',
				imageReport: [
					'https://greeneagle.com.my/wp-content/uploads/2019/09/seeds-2.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '29/03/2024',
				dayTo: '01/04/2024',
				actionTitle: 'Tưới Nước và Chăm Sóc Gieo Hạt',
				actionDescription:
					'Tưới nước nhẹ nhàng hàng ngày để giữ ẩm cho đất.\nĐảm bảo điều kiện nhiệt độ từ 18-22°C cho hạt nảy mầm.\nKiểm tra tỷ lệ nảy mầm và xử lý cây con không đều hoặc chết.',
				imageReport: [
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '02/04/2024',
				dayTo: '04/04/2024',
				actionTitle: 'Tiếp tục chăm sóc cây con',
				actionDescription:
					'Tiếp tục tưới nước đều đặn, giữ ẩm cho đất.\nLoại bỏ cỏ dại xung quanh cây con để giảm cạnh tranh dinh dưỡng',
				imageReport: [''],
				isDone: false,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '05/04/2024',
				dayTo: '08/04/2024',
				actionTitle: 'Làm sạch cây con',
				actionDescription:
					'Thực hiện làm sạch cây con, loại bỏ cây yếu hoặc bị bệnh.\nBón thúc lần đầu bằng phân hữu cơ hoặc phân vi sinh (10-15 kg/ha) để kích thích sự phát triển.',
				imageReport: [''],
				isDone: false,
			},
		],
	},
	{
		logId: 'NK002',
		customerName: 'Nguyen Van A',
		landName: 'Mảnh đất số 1',
		loggingDate: '26/09/2020',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Đang thực hiện',
		totalPrice: 100000,
		lastestContent: 'Mảnh đất cần cải tạo lại do đất bị sụt lún.',
		plantType: 'Dưa lưới Taki',
		services: ['Canh tác VietGAP', 'Vật tư'],
		createAt: '28/08/2024',
		diaryTitle: 'Nhật ký trồng dưa lưới 28/4 - 28/6',
		diaryContent: [
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '24/03/2024',
				dayTo: '27/03/2024',
				actionTitle: 'Chuẩn bị giá thể',
				actionDescription:
					'Bắt đầu xử lý mụn xơ dừa bằng cách ngâm và xả để loại bỏ tannin',
				imageReport: [
					'https://tiimg.tistatic.com/fp/1/007/500/soil-food-agriculture-vermicompost-1-kg-pack-used-in-all-types-of-crops-733.jpg',
					'https://lzd-img-global.slatic.net/g/p/0e5b66a7e2a76f41f3ee8afc149f42bf.jpg_720x720q80.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '28/03/2024',
				dayTo: '28/03/2024',
				actionTitle: 'Gieo hạt',
				actionDescription:
					'Chuẩn bị bầu đất hoặc luống gieo hạt.\nGieo hạt cách nhau khoảng 5 cm trên bề mặt đất hoặc trong bầu đất, với độ sâu 1-2 cm.\nChe phủ một lớp mỏng đất hoặc rơm rạ để giữ ẩm cho hạt.',
				imageReport: [
					'https://greeneagle.com.my/wp-content/uploads/2019/09/seeds-2.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '29/03/2024',
				dayTo: '01/04/2024',
				actionTitle: 'Tưới Nước và Chăm Sóc Gieo Hạt',
				actionDescription:
					'Tưới nước nhẹ nhàng hàng ngày để giữ ẩm cho đất.\nĐảm bảo điều kiện nhiệt độ từ 18-22°C cho hạt nảy mầm.\nKiểm tra tỷ lệ nảy mầm và xử lý cây con không đều hoặc chết.',
				imageReport: [
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '02/04/2024',
				dayTo: '04/04/2024',
				actionTitle: 'Tiếp tục chăm sóc cây con',
				actionDescription:
					'Tiếp tục tưới nước đều đặn, giữ ẩm cho đất.\nLoại bỏ cỏ dại xung quanh cây con để giảm cạnh tranh dinh dưỡng',
				imageReport: [''],
				isDone: false,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '05/04/2024',
				dayTo: '08/04/2024',
				actionTitle: 'Làm sạch cây con',
				actionDescription:
					'Thực hiện làm sạch cây con, loại bỏ cây yếu hoặc bị bệnh.\nBón thúc lần đầu bằng phân hữu cơ hoặc phân vi sinh (10-15 kg/ha) để kích thích sự phát triển.',
				imageReport: [''],
				isDone: false,
			},
		],
	},
	{
		logId: 'NK003',
		customerName: 'Nguyen Van A',
		landName: 'Mảnh đất số 1',
		loggingDate: '26/09/2020',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Huỷ bỏ',
		totalPrice: 100000,
		lastestContent: 'Mảnh đất cần cải tạo lại do đất bị sụt lún.',
		plantType: 'Dưa lưới Taki',
		services: ['Canh tác VietGAP', 'Vật tư', 'Bao tiêu'],
		createAt: '28/08/2024',
		diaryTitle: 'Nhật ký trồng dưa lưới 28/4 - 28/6',
		diaryContent: [
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '24/03/2024',
				dayTo: '27/03/2024',
				actionTitle: 'Chuẩn bị giá thể',
				actionDescription:
					'Bắt đầu xử lý mụn xơ dừa bằng cách ngâm và xả để loại bỏ tannin',
				imageReport: [
					'https://tiimg.tistatic.com/fp/1/007/500/soil-food-agriculture-vermicompost-1-kg-pack-used-in-all-types-of-crops-733.jpg',
					'https://lzd-img-global.slatic.net/g/p/0e5b66a7e2a76f41f3ee8afc149f42bf.jpg_720x720q80.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '28/03/2024',
				dayTo: '28/03/2024',
				actionTitle: 'Gieo hạt',
				actionDescription:
					'Chuẩn bị bầu đất hoặc luống gieo hạt.\nGieo hạt cách nhau khoảng 5 cm trên bề mặt đất hoặc trong bầu đất, với độ sâu 1-2 cm.\nChe phủ một lớp mỏng đất hoặc rơm rạ để giữ ẩm cho hạt.',
				imageReport: [
					'https://greeneagle.com.my/wp-content/uploads/2019/09/seeds-2.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '29/03/2024',
				dayTo: '01/04/2024',
				actionTitle: 'Tưới Nước và Chăm Sóc Gieo Hạt',
				actionDescription:
					'Tưới nước nhẹ nhàng hàng ngày để giữ ẩm cho đất.\nĐảm bảo điều kiện nhiệt độ từ 18-22°C cho hạt nảy mầm.\nKiểm tra tỷ lệ nảy mầm và xử lý cây con không đều hoặc chết.',
				imageReport: [
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '02/04/2024',
				dayTo: '04/04/2024',
				actionTitle: 'Tiếp tục chăm sóc cây con',
				actionDescription:
					'Tiếp tục tưới nước đều đặn, giữ ẩm cho đất.\nLoại bỏ cỏ dại xung quanh cây con để giảm cạnh tranh dinh dưỡng',
				imageReport: [''],
				isDone: false,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '05/04/2024',
				dayTo: '08/04/2024',
				actionTitle: 'Làm sạch cây con',
				actionDescription:
					'Thực hiện làm sạch cây con, loại bỏ cây yếu hoặc bị bệnh.\nBón thúc lần đầu bằng phân hữu cơ hoặc phân vi sinh (10-15 kg/ha) để kích thích sự phát triển.',
				imageReport: [''],
				isDone: false,
			},
		],
	},
	{
		logId: 'NK004',
		customerName: 'Nguyen Van A',
		landName: 'Mảnh đất số 1',
		loggingDate: '26/09/2020',
		expertResponsible: 'Nguyen Van B',
		deliveryDate: '26/09/2020',
		dateRequest: '25/09/2020',
		status: 'Chưa bắt đầu',
		totalPrice: 100000,
		lastestContent: 'Mảnh đất cần cải tạo lại do đất bị sụt lún.',
		plantType: 'Dưa lưới Taki',
		services: ['Canh tác VietGAP', 'Vật tư'],
		createAt: '28/08/2024',
		diaryTitle: 'Nhật ký trồng dưa lưới 28/4 - 28/6',
		diaryContent: [
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '24/03/2024',
				dayTo: '27/03/2024',
				actionTitle: 'Chuẩn bị giá thể',
				actionDescription:
					'Bắt đầu xử lý mụn xơ dừa bằng cách ngâm và xả để loại bỏ tannin',
				imageReport: [
					'https://tiimg.tistatic.com/fp/1/007/500/soil-food-agriculture-vermicompost-1-kg-pack-used-in-all-types-of-crops-733.jpg',
					'https://lzd-img-global.slatic.net/g/p/0e5b66a7e2a76f41f3ee8afc149f42bf.jpg_720x720q80.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '28/03/2024',
				dayTo: '28/03/2024',
				actionTitle: 'Gieo hạt',
				actionDescription:
					'Chuẩn bị bầu đất hoặc luống gieo hạt.\nGieo hạt cách nhau khoảng 5 cm trên bề mặt đất hoặc trong bầu đất, với độ sâu 1-2 cm.\nChe phủ một lớp mỏng đất hoặc rơm rạ để giữ ẩm cho hạt.',
				imageReport: [
					'https://greeneagle.com.my/wp-content/uploads/2019/09/seeds-2.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
					'https://gardeningtips.in/wp-content/uploads/How-to-Plant-Grass-Seed-3.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai đoạn 1: Chuẩn bị trồng',
				dayFrom: '29/03/2024',
				dayTo: '01/04/2024',
				actionTitle: 'Tưới Nước và Chăm Sóc Gieo Hạt',
				actionDescription:
					'Tưới nước nhẹ nhàng hàng ngày để giữ ẩm cho đất.\nĐảm bảo điều kiện nhiệt độ từ 18-22°C cho hạt nảy mầm.\nKiểm tra tỷ lệ nảy mầm và xử lý cây con không đều hoặc chết.',
				imageReport: [
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
					'https://www.aicr.org/wp-content/uploads/2017/06/62708942_m.jpg',
				],
				isDone: true,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '02/04/2024',
				dayTo: '04/04/2024',
				actionTitle: 'Tiếp tục chăm sóc cây con',
				actionDescription:
					'Tiếp tục tưới nước đều đặn, giữ ẩm cho đất.\nLoại bỏ cỏ dại xung quanh cây con để giảm cạnh tranh dinh dưỡng',
				imageReport: [''],
				isDone: false,
			},
			{
				stageTitle: 'Giai Đoạn 2: Chăm Sóc Cây Con',
				dayFrom: '05/04/2024',
				dayTo: '08/04/2024',
				actionTitle: 'Làm sạch cây con',
				actionDescription:
					'Thực hiện làm sạch cây con, loại bỏ cây yếu hoặc bị bệnh.\nBón thúc lần đầu bằng phân hữu cơ hoặc phân vi sinh (10-15 kg/ha) để kích thích sự phát triển.',
				imageReport: [''],
				isDone: false,
			},
		],
	},
];

const statusOptions = [
	{
		value: 'Chấp nhận',
		label: 'Chấp nhận',
	},
	{
		value: 'Đang xử lý',
		label: 'Đang xử lý',
	},
	{
		value: 'Từ chối',
		label: 'Từ chối',
	},
];

export const DiaryMonitoringPage = () => {
	const columns = [
		{
			title: 'ID nhật ký',
			dataIndex: 'logId',
			key: 'logId',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Mảnh đất',
			dataIndex: 'landName',
			key: 'landName',
		},
		{
			title: 'Ngày ghi',
			dataIndex: 'loggingDate',
			key: 'loggingDate',
		},
		{
			title: 'Nhân viên phụ trách',
			dataIndex: 'expertResponsible',
			key: 'expertResponsible',
		},
		{
			title: 'Nội dung',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (text) => <>{formatNumber(text)} VND</>,
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (_, {status}) => (
				<>
					{status == 'Hoàn thành' && (
						<Tag color="green" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Huỷ bỏ' && (
						<Tag color="red" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Đang thực hiện' && (
						<Tag color="warning" key={status}>
							{status}
						</Tag>
					)}
					{status == 'Chưa bắt đầu' && (
						<Tag color="default" key={status}>
							{status}
						</Tag>
					)}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button
						onClick={(e) => {
							e.stopPropagation();
							console.log('CLick');
							setSelectedDiary(record);
							setIsNotiModalOpen(true);
						}}
						color="primary"
						variant="filled"
						icon={<BellOutlined />}
					></Button>
				</Space>
			),
		},
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isNotiModalOpen, setIsNotiModalOpen] = useState(false);
	const [selectedDiary, setSelectedDiary] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPage, setTotalPage] = useState(10);
	const [notiContent, setNotiContent] = useState('');

	const handleRejectService = (e) => {
		e.stopPropagation();
		console.log('Reject service');
	};

	const handleRowClick = (record) => {
		setSelectedDiary(record);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedDiary(null);
	};

	const handleSendNoti = () => {
		console.log('Send notification');
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<p>Báo cáo đơn hàng</p>
				<div className={styles.filterContainer}>
					<div className={styles.fiterItem}>
						<span>Lọc theo ngày ghi:</span>
						<DatePicker
							className={styles.filterInput}
							placeholder="DD-MM-YYYY"
							onChange={(date, dateString) => {
								console.log(date, dateString);
							}}
							format={'DD-MM-YYYY'}
						/>
					</div>
					<div className={styles.fiterItem}>
						<span>Lọc theo trạng thái:</span>
						<Select
							allowClear
							style={{
								width: '50%',
							}}
							placeholder="Chọn loại dịch vụ"
							options={statusOptions}
						/>
					</div>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<Table
					rowKey="OrderId"
					dataSource={data}
					columns={columns}
					scroll={{x: 'max-content'}}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					rowClassName={(record, index) =>
						index % 2 === 0 ? styles.evenRow : styles.oddRow
					}
					pagination={{
						pageSize: pageSize,
						current: currentPage,
						total: totalPage * pageSize,
						onChange: (page) => {
							setCurrentPage(page);
						},
					}}
					className={styles.table}
				/>

				<DiaryMonitoringDetailModal
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					selectedDiary={selectedDiary}
				/>
			</div>
			<Modal
				width={500}
				centered
				open={isNotiModalOpen}
				onCancel={() => {
					setIsNotiModalOpen(false);
					setNotiContent('');
				}}
				onOk={handleSendNoti}
				title="Gửi thông báo"
				okButtonProps={{style: {outline: 'none', border: 'none'}}}
				cancelText="Đóng"
				okText="Gửi"
			>
				<div className={styles.notiModalContainer}>
					<div className={styles.notiItem}>
						<p>ID nhật ký: </p>
						<p>{selectedDiary && selectedDiary.logId}</p>
					</div>
					<div className={styles.notiItem}>
						<p>Nội dung: </p>
						<Input
							className={styles.notiItemInput}
							value={notiContent}
							placeholder="Nội dung"
							onChange={(e) => setNotiContent(e.target.value)}
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};
