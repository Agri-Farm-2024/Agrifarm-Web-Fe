import React, {useState} from 'react';
import {Button, Descriptions, Image, Modal, Tag, Upload, message} from 'antd';
import {
	calculateDaysDifference,
	capitalizeFirstLetter,
	convertImageURL,
	formatNumber,
} from '../../utils';
import {UploadOutlined} from '@ant-design/icons';

export const ManageRentalEquipmentDetailModal = ({
	selectedMaterial,
	handleModalClose,
	isModalOpen,
	handleUpdateBookingMaterial,
}) => {
	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [imageAPI, setImageAPI] = useState(null);

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

	const handleSubmit = () => {
		console.log('handleSubmit');
		const body = {
			contract_image: imageAPI,
			service_specific_id: selectedMaterial.service_specific_id,
		};
		if (!imageAPI) {
			message.error('Chưa tải hợp đồng');
		}

		handleUpdateBookingMaterial(body);
		setImageAPI(null);
		setImageFile(null);
	};
	const totalPrice = selectedMaterial?.booking_material_detail.reduce(
		(total, item) =>
			item?.price_per_piece_item *
				item?.quantity *
				calculateDaysDifference(selectedMaterial?.time_start, selectedMaterial?.time_end) +
			item?.price_deposit_per_item * item?.quantity,
		0
	);
	const detailItems = selectedMaterial && [
		{
			key: 'rentalId',
			label: 'Mã đơn thuê',
			children: <a>{selectedMaterial?.booking_material_id}</a>,
		},
		{
			key: 'landrenter_id',
			label: 'Khách hàng',
			children: <p>{selectedMaterial?.landrenter?.full_name}</p>,
		},
		{
			key: 'booking_land_id',
			label: 'Mảnh đất',
			children: <p>{capitalizeFirstLetter(selectedMaterial?.booking_land?.land?.name)}</p>,
		},
		{
			key: 'day_rent',
			label: 'Số ngày thuê',
			children: (
				<p>
					{calculateDaysDifference(
						selectedMaterial?.time_start,
						selectedMaterial?.time_end
					)}{' '}
					ngày
				</p>
			),
		},
		{
			key: 'total_price',
			label: 'Giá trị đơn thuê',
			children: <p>{formatNumber(totalPrice)} VND</p>,
		},
		{
			key: 'contractImage',
			label: 'Hình ảnh hợp đồng',
			children: (
				<p>
					{selectedMaterial.contract_image || imageFile ? (
						<Button type="primary" onClick={() => setVisibleContract(true)}>
							Xem hợp đồng
						</Button>
					) : (
						<Upload
							accept="image/*"
							showUploadList={false}
							beforeUpload={() => false} // Prevent automatic upload
							onChange={handleImageUpload}
						>
							<Button type="primary" icon={<UploadOutlined />}>
								Tải hợp đồng
							</Button>
						</Upload>
					)}
					<Image
						width={200}
						style={{
							display: 'none',
						}}
						preview={{
							visible: visibleContract,
							scaleStep: 1,
							src: selectedMaterial.contract_image
								? convertImageURL(selectedMaterial.contract_image)
								: imageFile
									? convertImageURL(imageFile)
									: 'image',
							onVisibleChange: (value) => {
								setVisibleContract(value);
							},
						}}
					/>
				</p>
			),
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<>
					{selectedMaterial?.status == 'pending_payment' && (
						<Tag color="gold">Chờ thanh toán</Tag>
					)}
					{selectedMaterial?.status == 'pending_sign' && <Tag color="pink">Chờ ký</Tag>}
					{selectedMaterial?.status == 'completed' && (
						<Tag color="green">Đang sử dụng</Tag>
					)}
					{selectedMaterial?.status == 'expired' && <Tag color="red">Hết hạn</Tag>}
				</>
			),
		},
		{
			key: 'materials',
			label: 'Thiết bị thuê',
			children: (
				<div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
					{selectedMaterial?.booking_material_detail &&
						selectedMaterial?.booking_material_detail.length > 0 &&
						selectedMaterial?.booking_material_detail.map((item) => (
							<li
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: 10,
									gap: 20,
									borderRadius: 7,
									border: '1px solid #ccc',
									boxShadow: 'unset',
								}}
							>
								<Image
									style={{
										width: '100px',
										height: '100px',
										objectFit: 'contain',
										objectPosition: 'center',
										borderRadius: 7,
									}}
									src={convertImageURL(item?.material?.image_material)}
								></Image>
								<div style={{width: '80%'}}>
									<p style={{margin: 0}}>
										<span>{capitalizeFirstLetter(item?.material?.name)}</span> -
										Số lượng <span>{item?.quantity}</span>
									</p>
									<p style={{margin: 0}}>
										Giá thuê: {formatNumber(item?.price_per_piece_item)}{' '}
										VND/ngày
									</p>
									<p style={{margin: 0}}>
										Giá cọc: {formatNumber(item?.price_deposit_per_item)}{' '}
										VND/cái
									</p>
								</div>
							</li>
						))}
				</div>
			),
		},
	];
	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin đơn thuê</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			width={800}
			okText={'Cập nhật đơn thuê'}
			onOk={handleSubmit}
			okButtonProps={{disabled: selectedMaterial?.status !== 'pending_sign'}}
			centered
			maskClosable={selectedMaterial?.status !== 'pending_sign'}
		>
			<div style={{height: '600px', overflowY: 'auto'}}>
				{selectedMaterial && (
					<Descriptions
						style={{marginTop: 20}}
						labelStyle={{width: '15rem', fontWeight: 'bold'}}
						column={1}
						bordered
						items={detailItems}
					/>
				)}
			</div>
		</Modal>
	);
};
