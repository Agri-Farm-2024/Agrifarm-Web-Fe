import React, {useRef, useState} from 'react';
import {Descriptions, Modal, Tag, Upload, Button, Image, message, Empty} from 'antd';
import {
	DeleteOutlined,
	FileImageOutlined,
	PlusOutlined,
	PrinterOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import {convertImageURL, formatDate} from '../../utils';
import {uploadFile} from '../../services/uploadService';
import styles from './ManageServicesInusePage.module.css';
import PrintContract from './PrintContract/PrintContract';
import {useReactToPrint} from 'react-to-print';

export const ServicesInuseDetailModal = ({
	selectedService,
	handleModalClose,
	isModalOpen,
	handleUpdate,
}) => {
	const [fileList, setFileList] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [visibleContractImage, setVisibleContractImage] = useState(false);
	const [visibleUploadImage, setVisibleUploadImage] = useState(false);
	const totalPrice = selectedService
		? (selectedService.price_package / 1000) * selectedService.acreage_land +
			(selectedService.price_process / 1000) * selectedService.acreage_land
		: 0;

	const [visibleContract, setVisibleContract] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [imageAPI, setImageAPI] = useState(null);
	const contentRef = useRef(null);

	const handleImageUpload = ({file}) => {
		console.log(file);
		const hideLoading = message.loading('Đang tải hợp đồng...', 0);
		setTimeout(() => {
			hideLoading();
			uploadFile(file).then((res) => {
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
		console.log('Uploaded file:', file);
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

	const handleSubmit = () => {
		const formattedString = `[\n${imageAPI.map((item) => item).join(',\n')}\n]`;

		console.log('handleSubmit');
		const body = {
			contract_image: formattedString,
			service_specific_id: selectedService.service_specific_id,
		};
		if (!imageAPI) {
			message.error('Chưa tải hợp đồng');
		}

		handleUpdate(body);
		setImageAPI(null);
		setImageFile(null);
	};

	const handlePrint = useReactToPrint({
		contentRef,
		documentTitle: `Hợp_đồng_${selectedService?.service_specific_id}`,
	});

	const contract = {
		createAt: selectedService?.created_at,
		farmOwner: 'Trang trại AgriFarm - quản lí trang trại: bà Trịnh Gia Hân',
		landrenter: selectedService?.land_renter,
		productName: selectedService?.plant_season?.plant?.name,
		price: selectedService?.price_purchase_per_kg,
		area: selectedService?.acreage_land,
		timeStart: selectedService?.time_start,
		timeEnd: selectedService?.time_end,
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
					{selectedService?.process_technical_specific?.expert
						? selectedService?.process_technical_specific?.expert?.full_name
						: 'Chưa có'}
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
		{
			key: 'contractImage',
			label: 'Hình ảnh hợp đồng',
			children: (
				<p>
					{selectedService.contract_image ? (
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
	];

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Chi tiết dịch vụ đang sử dụng</span>}
			open={isModalOpen}
			onCancel={() => {
				handleModalClose();
				setImageAPI(null);
				setImageFile(null);
			}}
			width={1000}
			centered
			okText="Cập nhật"
			onOk={handleSubmit}
			okButtonProps={{disabled: selectedService?.status !== 'pending_sign'}}
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
					{selectedService?.contract_image
						?.replace(/[\[\]\n]/g, '')
						.trim()
						.split(',').length >= 0 &&
						selectedService?.contract_image
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
