import React, {useState} from 'react';
import {Button, Descriptions, Image, message, Modal, Tag, Upload} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import {convertImageURL, formatDate} from '../../utils';
import {uploadFile} from '../../services/uploadService';
import {updateBookingExtend} from '../../redux/slices/landSlice';
import {useDispatch} from 'react-redux';

export const ExtendsModalStaff = ({data, handleModalClose, isModalOpen}) => {
	const [imageAPI, setImageAPI] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const [visibleContract, setVisibleContract] = useState(false);

	const dispatch = useDispatch();
	const handleImageUpload = ({file}) => {
		console.log(file);
		const hideLoading = message.loading('Đang tải hợp đồng...', 0);
		setTimeout(() => {
			hideLoading();
			uploadFile(file).then((res) => {
				if (res.statusCode === 201) {
					setImageAPI(res.metadata.folder_path);
					message.success('Tải hợp đồng thành công');
					setImageFile(res.metadata.folder_path);
				}
			});
		}, 1000);
		console.log('Uploaded file:', file);
	};

	const handleUpdateBooking = () => {
		console.log('handleUpdateBooking: ' + imageAPI);
		const dataToAPI = {
			status: 'pending_payment',
			contract_image: imageAPI,
			extend_id: data?.extend_id,
		};
		const hideLoading = message.loading('Đang xử lý...', 0);
		dispatch(updateBookingExtend(dataToAPI))
			.then((res) => {
				hideLoading();
				if (res.payload.statusCode === 200) {
					handleModalClose(true);
					setImageAPI(null);
					setImageFile(null);
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
					{data?.contract_image || imageFile ? (
						<Button type="link" onClick={() => setVisibleContract(true)}>
							Xem hình ảnh
						</Button>
					) : data.status === 'pending_sign' ? (
						<Upload
							accept="image/*"
							showUploadList={false}
							beforeUpload={() => false} // Prevent automatic upload
							onChange={handleImageUpload}
						>
							<Button type="link" icon={<UploadOutlined />}>
								Tải hợp đồng
							</Button>
						</Upload>
					) : (
						<Button type="link" disabled>
							Chưa có hình ảnh
						</Button>
					)}
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
			okText="Cập nhật"
			onOk={handleUpdateBooking}
			okButtonProps={data?.status !== 'pending_sign' ? {style: {display: 'none'}} : null}
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
					src: data?.contract_image
						? convertImageURL(data?.contract_image)
						: imageFile
							? convertImageURL(imageFile)
							: 'image',
					onVisibleChange: (value) => {
						setVisibleContract(value);
					},
				}}
			/>
		</Modal>
	);
};
