import React, {forwardRef} from 'react';
import {formatDate, formatDateToVN, formatNumber} from '../../../utils';

const PrintContract = forwardRef((props, ref) => {
	const {contract} = props;

	return (
		<div ref={ref} style={{padding: '50px', fontFamily: 'Arial, sans-serif'}}>
			<h1 style={{textAlign: 'center'}}>HỢP ĐỒNG THUÊ THIẾT BỊ</h1>
			<p>
				<strong>Số:</strong> …..
			</p>
			<p style={{textAlign: 'center'}}>
				<strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
				<br />
				Độc lập - Tự do - Hạnh phúc
			</p>
			<p style={{textAlign: 'right'}}>
				<strong>
					Đồng Nai,{' '}
					<span
						style={{
							fontStyle: 'italic',
						}}
					>
						{' '}
						{formatDateToVN(contract?.createAt)}
					</span>
				</strong>
			</p>
			<div style={{marginBottom: '20px', textAlign: 'center'}}>
				<p>
					Căn cứ Thông tư số 45/2013/TT-BTC của Bộ Tài Chính về “Hướng dẫn chế độ quản lý,
					sử dụng và trích khấu hao máy móc, thiết bị cố định”.
				</p>
			</div>

			<div>
				<p>
					<strong>Bên A - BÊN THUÊ:</strong> {contract?.landrenter?.full_name}
				</p>
			</div>

			<div style={{marginTop: '30px'}}>
				<p>
					<strong>Bên B - BÊN CHO THUÊ:</strong> {contract?.farmOwner}
				</p>
			</div>

			<h3 style={{marginTop: '40px'}}>Điều 1. QUY ĐỊNH KHI THUÊ THIẾT BỊ</h3>
			<ul>
				<li>Thiết bị thuê theo ngày.</li>
				<li>Giá cọc thiết bị do Manager quản lý.</li>
				<li>Nếu hư hại trong quá trình sử dụng, đền bù bằng cọc.</li>
				<li>Bên thuê đảm bảo lúc trả hàng không bị hư hao.</li>
				<li>Nếu thiết bị mất, phải đền bù giá trị của sản phẩm đó.</li>
				<li>Hai bên giao nhận thiết bị sau khi thanh toán hóa đơn.</li>
				<li>
					Thiết bị thuê phải đúng loại, số lượng, đúng thời gian và địa điểm đã thoả
					thuận, đảm bảo máy móc, thiết bị còn nguyên vẹn, đạt tiêu chuẩn chất lượng như
					đã quy định tại hợp đồng này.
				</li>
			</ul>

			<h3>Điều 2. NỘI DUNG, ĐỐI TƯỢNG VÀ GIÁ CẢ CỦA HỢP ĐỒNG</h3>
			<table style={{width: '100%', borderCollapse: 'collapse'}}>
				<thead>
					<tr>
						<th style={{border: '1px solid #000', padding: '8px'}}>STT</th>
						<th style={{border: '1px solid #000', padding: '8px'}}>
							Tên máy móc, thiết bị
						</th>
						<th style={{border: '1px solid #000', padding: '8px'}}>Số lượng</th>
						<th style={{border: '1px solid #000', padding: '8px'}}>Thời gian thuê</th>
						<th style={{border: '1px solid #000', padding: '8px'}}>Giá thuê/ngày</th>
					</tr>
				</thead>
				<tbody>
					{contract.productList.map((item, index) => (
						<tr key={index}>
							<td
								style={{
									border: '1px solid #000',
									padding: '8px',
									textAlign: 'center',
								}}
							>
								{index + 1}
							</td>
							<td
								style={{
									border: '1px solid #000',
									padding: '8px',
									textAlign: 'center',
								}}
							>
								{item?.material?.name}
							</td>
							<td
								style={{
									border: '1px solid #000',
									padding: '8px',
									textAlign: 'center',
								}}
							>
								{item.quantity}
							</td>
							<td
								style={{
									border: '1px solid #000',
									padding: '8px',
									textAlign: 'center',
								}}
							>
								{formatDate(contract.timeStart)} - {formatDate(contract.timeEnd)}
							</td>
							<td
								style={{
									border: '1px solid #000',
									padding: '8px',
									textAlign: 'center',
								}}
							>
								{formatNumber(item?.material?.price_of_rent)} VNĐ
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<p style={{marginTop: '20px'}}>
				<strong>Giá thuê đã bao gồm VAT.</strong>
			</p>
			<p>
				<strong>Tiêu chuẩn chất lượng của máy móc, thiết bị:</strong> Tất cả máy móc phải
				đang hoạt động tốt, đạt công suất quy định của máy.
			</p>

			<h3 style={{marginTop: '40px'}}>Điều 3. MỤC ĐÍCH, THỜI HẠN THUÊ</h3>
			<p>
				<strong>Mục đích thuê: Phục vụ để canh tác</strong> {contract.purpose}
			</p>
			<p>
				<strong>Thời hạn thuê:</strong> Từ {formatDateToVN(contract.timeStart)} đến hết{' '}
				{formatDateToVN(contract.timeEnd)}.
			</p>

			<h3 style={{marginTop: '40px'}}>Điều 4. THỜI HẠN VÀ PHƯƠNG THỨC THANH TOÁN</h3>
			<p>
				<strong>Thời hạn thanh toán:</strong> Bên A thanh toán cho Bên B khi nhận được hoá
				đơn tài chính của Bên B.
			</p>
			<p>
				<strong>Phương thức thanh toán:</strong> Chuyển khoản Ngân hàng.
			</p>

			<h3 style={{marginTop: '40px'}}>Điều 6. QUYỀN VÀ NGHĨA VỤ</h3>
			<p>
				<strong>Bên A có các nghĩa vụ sau đây:</strong>
			</p>
			<ul>
				<li>Trả tiền thuê đúng và đủ theo quy định của hợp đồng.</li>
				<li>
					Không cho bên thứ ba thuê lại máy móc, thiết bị mà Bên B cho Bên A thuê trong
					thời hạn cho thuê, trừ khi có sự đồng ý của Bên B.
				</li>
				<li>
					Yêu cầu Bên B sửa chữa và bảo dưỡng định kỳ máy móc, thiết bị cho thuê trừ hư
					hỏng nhỏ.
				</li>
			</ul>

			<p>
				<strong>Bên B có các nghĩa vụ sau đây:</strong>
			</p>
			<ul>
				<li>Chịu trách nhiệm về tính sở hữu của máy móc, thiết bị cho thuê.</li>
				<li>
					Sửa chữa những hư hỏng, khuyết tật của máy móc, thiết bị cho thuê và bảo dưỡng
					định kỳ.
				</li>
				<li>Bồi thường thiệt hại nếu giao máy móc không đúng như đã thỏa thuận.</li>
			</ul>

			<h3 style={{marginTop: '40px'}}>Điều 7. HIỆU LỰC CỦA HỢP ĐỒNG</h3>
			<p>
				Hợp đồng có hiệu lực kể từ ngày ký. Trường hợp có bất kỳ điều khoản nào không thể
				thực hiện, các điều khoản còn lại vẫn có hiệu lực.
			</p>

			<div style={{marginTop: '40px', display: 'flex', justifyContent: 'space-between'}}>
				<p>
					<strong>BÊN A</strong>
					<p>Đại diện:....</p>
				</p>
				<p>
					<strong>BÊN B</strong>
					<p>Đại diện:....</p>
				</p>
			</div>
		</div>
	);
});

export default PrintContract;
