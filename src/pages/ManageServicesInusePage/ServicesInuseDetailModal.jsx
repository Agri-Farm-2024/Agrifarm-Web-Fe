import React, {useState} from 'react';
import {Descriptions, Modal, Tag, Upload, Button, Image, message} from 'antd';
import {FileImageOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {formatDate} from '../../utils';

export const ServicesInuseDetailModal = ({selectedService, handleModalClose, isModalOpen}) => {
	const [fileList, setFileList] = useState([]);
	const [uploading, setUploading] = useState(false);
	const totalPrice = selectedService
		? (selectedService.price_package / 1000) * selectedService.acreage_land +
			(selectedService.price_process / 1000) * selectedService.acreage_land
		: 0;

	const handleUpload = () => {
		setUploading(true);

		// Simulate an API call
		handleUpdateImagesAPI(fileList)
			.then(() => {
				message.success('Hợp đồng đã được tải lên thành công!');
				setFileList([]); // Clear the file list after successful upload
				setUploading(false);
			})
			.catch(() => {
				message.error('Có lỗi xảy ra trong quá trình tải hợp đồng!');
				setUploading(false);
			});
	};

	const uploadProps = {
		onRemove: (file) => {
			setFileList((prevFileList) => prevFileList.filter((item) => item.uid !== file.uid));
		},
		beforeUpload: (file) => {
			setFileList((prevFileList) => [...prevFileList, file]);
			return false; // Prevent auto-upload
		},
		fileList,
		listType: 'picture-card', // Thumbnail style for uploaded images
	};
	const detailItems = selectedService && [
		{
			key: 'servicesID',
			label: 'ID yêu cầu',
			children: <p>{selectedService.service_specific_id}</p>,
		},
		{
			key: 'customer',
			label: 'Khách hàng',
			children: <p>{selectedService?.land_renter?.full_name}</p>,
		},
		{
			key: 'isPurchase',
			label: 'Bao tiêu',
			children: (
				<p>
					{selectedService?.service_package &&
					selectedService?.service_package?.purchase === true ? (
						<Tag color="success">Có</Tag>
					) : (
						<Tag color="error">Không</Tag>
					)}
				</p>
			),
		},
		{
			key: 'isFullMaterials',
			label: 'Bao vật tư',
			children: (
				<p>
					{selectedService?.service_package &&
					selectedService?.service_package?.material === true ? (
						<Tag color="success">Có</Tag>
					) : (
						<Tag color="error">Không</Tag>
					)}
				</p>
			),
		},
		{
			key: 'dateToStart',
			label: 'Ngày bắt đầu',
			children: <p>{formatDate(selectedService.time_start)}</p>,
		},
		{
			key: 'dateToEnd',
			label: 'Ngày kết thúc',
			children: <p>{formatDate(selectedService.time_end)}</p>,
		},
		{
			key: 'desc',
			label: 'Gói dịch vụ',
			children: (
				<p>{selectedService?.service_package && selectedService?.service_package?.name}</p>
			),
		},
		{
			key: 'desc',
			label: 'Gói dịch vụ',
			children: (
				<p>
					{selectedService?.service_package &&
						selectedService?.service_package?.description}
				</p>
			),
		},
		{
			key: 'land',
			label: 'Mảnh đất áp dụng',
			children: <p>{selectedService?.booking_land?.land?.name}</p>,
		},
		{
			key: 'acreage_land',
			label: 'Diện tích áp dụng',
			children: <p>{selectedService?.acreage_land} m²</p>,
		},
		{
			key: 'assignExpert',
			label: 'Chuyên gia được phân công',
			children: (
				<p>
					{selectedService?.process_technical_specific &&
						selectedService?.process_technical_specific?.expert &&
						selectedService?.process_technical_specific?.expert?.full_name}
				</p>
			),
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<>
					{selectedService?.status == 'used' && <Tag color={'green'}>Đang sử dụng</Tag>}
					{selectedService?.status == 'pending_payment' && (
						<Tag color={'gold'}>Đợi thanh toán</Tag>
					)}
					{selectedService?.status == 'pending_sign' && (
						<Tag color={'geekblue'}>Đợi ký</Tag>
					)}
					{selectedService?.status == 'expired' && <Tag color={'default'}>Hết hạn</Tag>}
					{selectedService?.status == 'canceled' && <Tag color={'error'}>Đã huỷ</Tag>}
				</>
			),
		},
		{
			key: 'totalPrice',
			label: 'Tổng giá',
			children: <p>{totalPrice?.toLocaleString('vi-VN')} VND</p>,
		},
	];

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết dịch vụ đang sử dụng</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			width={1000}
			centered
		>
			{selectedService && (
				<Descriptions
					style={{marginTop: 20, height: 600, overflowY: 'auto'}}
					labelStyle={{width: '15rem', fontWeight: 'bold'}}
					column={1}
					bordered
					items={detailItems}
				/>
			)}
		</Modal>
	);
};
