import React, {useRef, useState} from 'react';
import {Button, Descriptions, Empty, Image, Modal, Tag, Upload, message} from 'antd';
import {
	calculateDaysDifference,
	capitalizeFirstLetter,
	convertImageURL,
	formatNumber,
} from '../../utils';
import {DeleteOutlined, PrinterOutlined, UploadOutlined} from '@ant-design/icons';
import {uploadFile} from '../../services/uploadService';
import {useReactToPrint} from 'react-to-print';
import PrintContract from './PrintContract/PrintContract';

export const ManageRentalEquipmentDetailModal = ({
	selectedMaterial,
	handleModalClose,
	isModalOpen,
	handleUpdateBookingMaterial,
}) => {
	const [visibleContractImage, setVisibleContractImage] = useState(false);
	const [visibleUploadImage, setVisibleUploadImage] = useState(false);
	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [imageAPI, setImageAPI] = useState(null);
	const contentRef = useRef(null);

	const contract = {
		createAt: selectedMaterial?.created_at,
		farmOwner: 'Trang trại AgriFarm - quản lí trang trại: bà Trịnh Gia Hân',
		landrenter: selectedMaterial?.landrenter,
		productList: selectedMaterial?.booking_material_detail,
		timeStart: selectedMaterial?.time_start,
		timeEnd: selectedMaterial?.time_end,
	};

	const handlePrint = useReactToPrint({
		contentRef,
		documentTitle: `Hợp_đồng_${selectedMaterial?.booking_material_id}`,
	});

	const handleImageUpload = ({file}) => {
		const hideLoading = message.loading('Đang tải hợp đồng...', 0);
		setTimeout(() => {
			hideLoading();
			uploadFile(file).then((res) => {
				console.log('Upload file result: ' + JSON.stringify(res));
				if (res.statusCode === 201) {
					setImageAPI((prevImageAPI) => [
						...(prevImageAPI || []),
						res.metadata.folder_path,
					]);
					console.log('Upload', res.metadata.folder_path);
					message.success('Tải hợp đồng thành công');
					setImageFile(res.metadata.folder_path);
				}
			});
		}, 1000);
	};

	const handleSubmit = () => {
		console.log('handleSubmit');
		const formattedString = `[\n${imageAPI.map((item) => item).join(',\n')}\n]`;

		const body = {
			contract_image: formattedString,
			booking_material_id: selectedMaterial.booking_material_id,
			status: 'completed',
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
					{selectedMaterial.contract_image ? (
						<Button type="primary" onClick={() => setVisibleContractImage(true)}>
							Xem hợp đồng
						</Button>
					) : (
						<Button type="primary" onClick={() => setVisibleUploadImage(true)}>
							{imageAPI ? 'Đã có hình ảnh' : 'Chưa có hình ảnh'}
						</Button>
					)}
				</p>
			),
		},
		{
			key: 'print',
			label: 'In Hợp đồng',
			children: (
				<p>
					<Button
						type="primary"
						onClick={handlePrint}
						icon={<PrinterOutlined />}
						color="primary"
					>
						In hợp đồng
					</Button>
					<div style={{display: 'none'}}>
						<PrintContract contract={contract} ref={contentRef} />
					</div>
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

			<Modal
				title="Hình ảnh hợp đồng"
				open={visibleContractImage}
				onOk={() => setVisibleContractImage(false)}
				onCancel={() => setVisibleContractImage(false)}
				footer={[
					<Button key="back" onClick={() => setVisibleContractImage(false)}>
						Đóng
					</Button>,
				]}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						flexWrap: 'wrap',
						gap: '16px',
					}}
				>
					{selectedMaterial?.contract_image
						?.replace(/[\[\]\n]/g, '')
						.trim()
						.split(',').length >= 0 &&
						selectedMaterial?.contract_image
							?.replace(/[\[\]\n]/g, '')
							.trim()
							.split(',')
							?.map((image, index) => (
								<Image
									key={index}
									width={200}
									height={200}
									src={convertImageURL(image)}
									alt={`Contract Image ${index + 1}`}
									style={{
										borderRadius: '8px',
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
									}}
								/>
							))}
				</div>
			</Modal>

			<Modal
				title="Tải hợp đồng"
				open={visibleUploadImage}
				onOk={() => setVisibleUploadImage(false)}
				onCancel={() => setVisibleUploadImage(false)}
				footer={[
					<Button key="back" onClick={() => setVisibleUploadImage(false)}>
						Đóng
					</Button>,
				]}
			>
				<div>
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
					{imageAPI && (
						<Button
							color="danger"
							variant="filled"
							icon={<DeleteOutlined />}
							onClick={() => setImageAPI(null)}
						/>
					)}
					<div
						style={{
							marginTop: 20,
							display: 'flex',
							justifyContent: 'space-evenly',
							flexWrap: 'wrap',
							gap: '16px',
						}}
					>
						{imageAPI?.map((image, index) => (
							<Image
								key={index}
								width={200}
								height={200}
								src={convertImageURL(image)}
								alt={`Contract Image ${index + 1}`}
								style={{
									borderRadius: '8px',
									boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
								}}
							/>
						))}
						{!imageAPI && <Empty />}
					</div>
				</div>
			</Modal>
		</Modal>
	);
};
