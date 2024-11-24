import React, {forwardRef} from 'react';

const ServiceContract = forwardRef((props, ref) => {
	const {contract} = props;

	return (
		<div ref={ref} style={{padding: '50px', fontFamily: 'Arial, sans-serif'}}>
			<h1 style={{textAlign: 'center'}}>HỢP ĐỒNG DỊCH VỤ</h1>
			<p>
				<strong>Số:</strong> {contract?.number || '…..'}
			</p>
			<p style={{textAlign: 'center'}}>
				<strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
				<br />
				Độc lập - Tự do - Hạnh phúc
			</p>
			<p style={{textAlign: 'right'}}>
				<strong>{contract?.date || 'Ngày ….. tháng ….. năm …..'}</strong>
			</p>

			<h3 style={{textAlign: 'left'}}>I. Bên cung cấp dịch vụ:</h3>
			<p>
				<strong>Tên công ty:</strong> {contract?.companyName || '[Tên công ty]'}
			</p>
			<p>
				<strong>Mã số doanh nghiệp:</strong>{' '}
				{contract?.businessId || '[Mã số doanh nghiệp]'}
			</p>
			<p>
				<strong>Địa chỉ:</strong> {contract?.companyAddress || '[Địa chỉ công ty]'}
			</p>
			<p>
				<strong>Đại diện:</strong> {contract?.representative || '[Tên người đại diện]'}
			</p>
			<p>
				<strong>Chức vụ:</strong> {contract?.position || '[Chức vụ người đại diện]'}
			</p>
			<p>
				<strong>Số điện thoại:</strong> {contract?.phone || '[Số điện thoại]'}
			</p>
			<p>
				<strong>Email:</strong> {contract?.email || '[Email]'}
			</p>

			<h3 style={{textAlign: 'left'}}>II. Bên sử dụng dịch vụ:</h3>
			<p>
				<strong>Họ và tên:</strong> {contract?.clientName || '[Họ và tên]'}
			</p>
			<p>
				<strong>Địa chỉ thường trú:</strong> {contract?.clientAddress || '[Địa chỉ]'}
			</p>
			<p>
				<strong>Số CMND/CCCD:</strong> {contract?.idNumber || '[Số CMND/CCCD]'}
			</p>
			<p>
				<strong>Ngày cấp:</strong> {contract?.issueDate || '[Ngày cấp CMND/CCCD]'}
			</p>
			<p>
				<strong>Nơi cấp:</strong> {contract?.issuePlace || '[Nơi cấp CMND/CCCD]'}
			</p>
			<p>
				<strong>Số điện thoại:</strong> {contract?.clientPhone || '[Số điện thoại]'}
			</p>
			<p>
				<strong>Email:</strong> {contract?.clientEmail || '[Email]'}
			</p>

			<h3 style={{textAlign: 'left'}}>III. Các điều khoản của hợp đồng:</h3>
			<h4 style={{textAlign: 'left'}}>Điều 1: Nội dung dịch vụ</h4>
			<p>
				Bên A cung cấp cho Bên B các dịch vụ{' '}
				{contract?.serviceDescription || '[Mô tả chi tiết nội dung dịch vụ]'} trong khoảng
				thời gian từ {contract?.startDate || '[Ngày bắt đầu]'} đến{' '}
				{contract?.endDate || '[Ngày kết thúc]'}.
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 2: Giá trị hợp đồng và phương thức thanh toán</h4>
			<p>- Tổng giá trị hợp đồng: {contract?.totalAmount || '[Số tiền]'} VNĐ.</p>
			<p>- Phương thức thanh toán: {contract?.paymentMethod || '[Thông tin thanh toán]'}</p>
			<p>- Thời hạn thanh toán: {contract?.paymentDeadline || '[Thời hạn thanh toán]'}</p>

			<h4 style={{textAlign: 'left'}}>Điều 3: Quyền và nghĩa vụ của các bên</h4>
			<p>
				- Quyền và nghĩa vụ của Bên A:{' '}
				{contract?.partyARights || '[Chi tiết các quyền và nghĩa vụ]'}
			</p>
			<p>
				- Quyền và nghĩa vụ của Bên B:{' '}
				{contract?.partyBRights || '[Chi tiết các quyền và nghĩa vụ]'}
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 4: Điều khoản khác</h4>
			<p>Hai bên cam kết thực hiện nghiêm túc các điều khoản của hợp đồng.</p>

			<div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
				<p>Bên sử dụng dịch vụ: (Ký, ghi rõ họ tên)</p>
				<p>Bên cung cấp dịch vụ: (Ký, ghi rõ họ tên)</p>
			</div>
		</div>
	);
});

export default ServiceContract;
