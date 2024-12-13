import React, {useRef, useState} from 'react';
import {Button, Descriptions, Image, message, Modal, Tag} from 'antd';
import {PrinterOutlined} from '@ant-design/icons';
import {convertImageURL, formatDate} from '../../utils';
import {useReactToPrint} from 'react-to-print';
import PrintExtendContract from './PrintExtendContract/PrintExtendContract';
import {useDispatch} from 'react-redux';
import {getListOfBooking, updateBookingExtend} from '../../redux/slices/landSlice';

export const ExtendsModal = ({data, handleModalClose, isModalOpen, selectedBooking}) => {
	const [visibleContract, setVisibleContract] = useState(false);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const handlePrint = useReactToPrint({
		contentRef,
		documentTitle: `Hợp_đồng_${data?.extend_id}`,
	});

	// console.log('ExtendsModal: ' + JSON.stringify(data));

	const contract = {
		createAt: data?.created_at,
		farmOwner: 'Trang trại AgriFarm - quản lí trang trại: bà Trịnh Gia Hân NInh',
		landrenter: selectedBooking?.land_renter?.full_name,
		email: selectedBooking?.land_renter?.email,
		totalMonth: data?.total_month,
		area: selectedBooking?.land?.acreage_land,
		position: selectedBooking?.land?.name,
		pricePerMonth: data?.price_per_month,
	};

	const handleApproveBooking = () => {
		const dataToAPI = {
			reason_for_reject: 'Không phù hợp thời gian',
			status: 'pending_sign',
			extend_id: data?.extend_id,
		};
		const hideLoading = message.loading('Đang xử lý...', 0);
		dispatch(updateBookingExtend(dataToAPI))
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 200) {
					handleModalClose(true);
					message.success('Đã cập nhật');
				} else {
					message.error('Lỗi trong quá trình cập nhật');
				}
			})
			.catch((err) => {
				hideLoading();
				console.log(err);
				message.error(err);
			});
	};

	const detailItems = data && [
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{new Date(data.created_at).toLocaleString()}</p>,
		},

		{
			key: 'total_month',
			label: 'Tổng số tháng',
			children: <p>{data.total_month}</p>,
		},
		{
			key: 'time_start',
			label: 'Thời gian bắt đầu',
			children: <p>{formatDate(data.time_start)}</p>,
		},
		{
			key: 'price_per_month',
			label: 'Giá mỗi tháng',
			children: <p>{data.price_per_month.toLocaleString()} VND</p>,
		},
		{
			key: 'contract_image',
			label: 'Hợp đồng',
			children: (
				<div>
					<Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
						In hợp đồng
					</Button>
					<div style={{display: 'none'}}>
						<PrintExtendContract contract={contract} ref={contentRef} />
					</div>
					<Button
						type="link"
						disabled={data.contract_image ? false : true}
						onClick={() => setVisibleContract(true)}
					>
						{data.contract_image ? 'Xem hình ảnh' : 'Chưa có hình ảnh'}
					</Button>
				</div>
			),
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<div>
					{data.status == 'pending' && <Tag color="yellow">Chờ ý kiến người thuê</Tag>}
					{data.status == 'rejected' && <Tag color="default">Từ chối</Tag>}
					{data.status == 'canceled' && <Tag color="red">Chấm dứt</Tag>}
					{data.status == 'pending_contract' && <Tag color="warning">Chờ phê duyệt</Tag>}
					{data.status == 'pending_payment' && <Tag color="magenta">Chờ thanh toán</Tag>}
					{data.status == 'pending_sign' && <Tag color="cyan">Chờ ký tên</Tag>}
					{data.status == 'rejected' && <Tag color="red">Hủy yêu cầu</Tag>}
					{data.status == 'completed' && <Tag color="green">Hủy yêu cầu</Tag>}
				</div>
			),
		},
	];

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin gia hạn</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			width={800}
			centered
			okText="Phê duyệt"
			onOk={handleApproveBooking}
			okButtonProps={data?.status !== 'pending_contract' ? {style: {display: 'none'}} : null}
		>
			{data && (
				<Descriptions
					style={{marginTop: 20}}
					labelStyle={{width: '15rem', fontWeight: 'bold'}}
					column={1}
					bordered
					items={detailItems}
				/>
			)}
			<Image
				width={200}
				preview={{
					visible: visibleContract,
					scaleStep: 1,
					src: data?.contract_image ? convertImageURL(data?.contract_image) : 'image',
					onVisibleChange: (value) => {
						setVisibleContract(value);
					},
				}}
			/>
		</Modal>
	);
};
