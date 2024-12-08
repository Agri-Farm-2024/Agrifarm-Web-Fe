import React, {forwardRef} from 'react';
import {formatDate, formatDateToVN, formatNumber} from '../../../utils';

const PrintContract = forwardRef((props, ref) => {
	const {contract} = props;

	return (
		<div ref={ref} style={{padding: '50px', fontFamily: 'Arial, sans-serif'}}>
			<h1 style={{textAlign: 'center'}}>HỢP ĐỒNG THUÊ ĐẤT</h1>
			<p>
				<strong>Số:</strong> …..
			</p>
			<p style={{textAlign: 'center'}}>
				<strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
				<br />
				Độc lập - Tự do - Hạnh phúc
			</p>
			<p style={{textAlign: 'right'}}>
				<strong>Đồng Nai, {formatDateToVN(contract?.createAt)}</strong>
			</p>

			<h2 style={{textAlign: 'center'}}>HỢP ĐỒNG THUÊ ĐẤT</h2>
			<p style={{textAlign: 'justify'}}>
				Căn cứ Luật Đất đai ngày 29Danh sách hợp đồng tháng 11 năm 2013;
			</p>
			<p style={{textAlign: 'justify'}}>
				Căn cứ Nghị định số 43/2014/NĐ-CP ngày 15 tháng 5 năm 2014 của Chính phủ quy định
				chi tiết thi hành một số điều của Luật Đất đai;
			</p>
			<p style={{textAlign: 'justify'}}>
				Căn cứ Thông tư số 30/2014/TT-BTNMT ngày 02 tháng 6 năm 2014 của Bộ trưởng Bộ Tài
				nguyên và Môi trường quy định về hồ sơ giao đất, cho thuê đất, chuyển mục đích sử
				dụng đất, thu hồi đất;
			</p>
			<p style={{textAlign: 'justify'}}>
				Căn cứ Quyết định số………….ngày…tháng …năm…của Ủy ban nhân dân……..về việc cho thuê
				đất……………..
			</p>

			<h3 style={{textAlign: 'left'}}>I. Bên cho thuê đất:</h3>
			<p>
				<strong>{contract.farmOwner} </strong>
			</p>
			<p>
				<strong>Địa chỉ: </strong>268 Ấp Trung Tâm, Thanh Bình, Trảng Bom, Đồng Nai
			</p>
			<p>
				<strong>Điện thoại: </strong>0909 123 456
			</p>

			<h3 style={{textAlign: 'left'}}>II. Bên thuê đất:</h3>
			<p>
				<strong>Tên: </strong>
				{contract.landrenter.full_name}
			</p>

			<h3 style={{textAlign: 'left'}}>III. Các điều khoản của hợp đồng thuê đất:</h3>

			<h4 style={{textAlign: 'left'}}>Điều 1. Diện tích đất cho thuê:</h4>
			<p>
				1. Diện tích đất: {contract.area} m² (ghi rõ bằng số và bằng chữ, đơn vị là mét
				vuông)
			</p>
			<p>2. Vị trí: {contract.position} của trang trại</p>
			<p>3. Thời hạn thuê đất: {contract.totalMonth}</p>
			<p>4. Mục đích sử dụng đất thuê: Làm ruộng</p>

			<h4 style={{textAlign: 'left'}}>Điều 2. Tiền thuê đất:</h4>
			<p>1. Giá thuê đất là {formatNumber(contract.pricePerMonth)} VND</p>
			<p>3. Phương thức thanh toán: Chuyển Khoản</p>
			<p>4. Nơi nộp tiền: MB Bank</p>

			<h4 style={{textAlign: 'left'}}>Điều 3. Quyền và nghĩa vụ của các bên:</h4>
			<p>
				1. Bên cho thuê đất cam kết bảo đảm việc sử dụng đất của bên thuê trong suốt thời
				gian thuê.
			</p>
			<p>2. Bên thuê đất có quyền và nghĩa vụ theo quy định của pháp luật.</p>
			<p>
				3. Trong thời gian hợp đồng còn hiệu lực, nếu có gia hạn hợp đồng, yêu cầu phải được
				gửi trước 2 tháng.
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 4. Vi phạm hợp đồng:</h4>
			<p>1. Bên thuê đất phải bồi thường nếu làm hư đất canh tác.</p>

			<h4 style={{textAlign: 'left'}}>Điều 5. Chấm dứt hợp đồng:</h4>
			<p>1. Hợp đồng hết thời hạn thuê và không được gia hạn.</p>
			<p>
				2. Các bên thống nhất chấm dứt hợp đồng theo yêu cầu của một bên và được cơ quan nhà
				nước có thẩm quyền chấp thuận.
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 6. Giải quyết tài sản gắn liền với đất:</h4>
			<p>
				Việc giải quyết tài sản gắn liền với đất sau khi kết thúc hợp đồng sẽ được thực hiện
				theo quy định của pháp luật.
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 7. Cam kết:</h4>
			<p>
				Hai bên cam kết thực hiện đúng các điều khoản hợp đồng. Nếu vi phạm, bên vi phạm
				phải bồi thường thiệt hại.
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 8. Hiệu lực hợp đồng:</h4>
			<p>
				Hợp đồng có hiệu lực từ ngày ký và được lập thành 04 bản, mỗi bên giữ một bản và gửi
				đến cơ quan thuế, kho bạc nhà nước nơi thu tiền thuê đất.
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 9. Điều khoản bảo mật:</h4>
			<p>
				Các bên cam kết bảo mật thông tin về hợp đồng, các điều khoản trong hợp đồng cũng
				như thông tin tài chính liên quan đến hợp đồng thuê đất này.
			</p>

			<h4 style={{textAlign: 'left'}}>Điều 10. Giải quyết tranh chấp:</h4>
			<p>
				Mọi tranh chấp phát sinh từ hợp đồng này sẽ được giải quyết qua thương lượng. Nếu
				không thể thương lượng thành công, tranh chấp sẽ được giải quyết tại Tòa án có thẩm
				quyền.
			</p>

			<div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
				<p>Bên thuê đất: (Ký, ghi rõ họ tên, đóng dấu nếu có)</p>
				<p>Bên cho thuê đất: (Ký, ghi rõ họ tên và đóng dấu)</p>
			</div>
		</div>
	);
});

export default PrintContract;
