import React, {forwardRef} from 'react';
import {formatDateToVN, formatNumber} from '../../../utils';

const PrintContract = forwardRef((props, ref) => {
	const {contract} = props;

	return (
		<div ref={ref} style={{padding: '50px', fontFamily: 'Arial, sans-serif'}}>
			<h1 style={{textAlign: 'center'}}>HỢP ĐỒNG DỊCH VỤ</h1>
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
			<p>
				<strong>Căn cứ:</strong>
			</p>
			<ul>
				<li>Bộ luật dân sự số 91/2015/QH13;</li>
				<li>Luật Thương mại số 36/2005/QH11;</li>
				<li>Thỏa thuận của các bên.</li>
			</ul>
			<p>
				Hôm nay, ngày {formatDateToVN(contract?.date || new Date())}, tại địa chỉ{' '}
				{contract?.location}, chúng tôi bao gồm:
			</p>
			<p>
				<strong>BÊN A (CANH TÁC):</strong> {contract?.landrenter?.full_name}
			</p>
			<p>Email: {contract?.landrenter?.email}</p>
			<p>
				<strong>BÊN B (DOANH NGHIỆP):</strong> {contract?.farmOwner}
			</p>
			Dưới đây là nội dung điều khoản đã được bổ sung và hoàn chỉnh:
			<div>
				<h3>Điều khoản 1: Bao tiêu</h3>
				<h4>Điều 1: Giá thành sản phẩm bao tiêu</h4>
				<p>
					Bên A và bên B ký kết Hợp đồng bao tiêu sản phẩm theo đó, bên B ứng vốn, công
					nghệ và kỹ thuật để bên A sản xuất các mặt hàng sau đó giao bán lại cho bên B
					tiêu thụ đối với những sản phẩm như sau:
				</p>
				<table border="1" cellspacing="0" cellpadding="5">
					<tr>
						<th>STT</th>
						<th>Sản phẩm</th>
						<th>Diện tích sản phẩm</th>
						<th>Đơn giá</th>
					</tr>
					<tr>
						<td style={{fontStyle: 'italic'}}>1</td>
						<td style={{fontStyle: 'italic'}}>{contract?.productName}</td>
						<td style={{fontStyle: 'italic'}}>{contract?.area} m2</td>
						<td style={{fontStyle: 'italic'}}>{formatNumber(contract?.price)} VND</td>
					</tr>
				</table>
				<p>
					<strong>Quy định giá thu mua và giá dịch vụ bao tiêu:</strong>
				</p>
				<ul>
					<li>
						<strong>Giá thu mua:</strong>
					</li>
					<ul>
						<li>
							Khấu trừ nhỏ hơn hoặc bằng 20% giá thu mua tại thời điểm mua dịch vụ.
						</li>
						<li>Khấu trừ chất lượng tại thời điểm thu hoạch (≤ 10%).</li>
						<li>Sản phẩm đạt chất lượng tốt (100%) sẽ không bị khấu trừ chất lượng.</li>
						<li>
							Sản phẩm đạt chất lượng 95% (khấu trừ 5%), sản phẩm đạt 90% (khấu trừ
							10%).
						</li>
					</ul>
					<li>
						<strong>Giá dịch vụ bao tiêu:</strong> Bao gồm chi phí nhân công thu hoạch,
						đóng gói, vận chuyển.
					</li>
				</ul>
				<h4>Điều 2: Yêu cầu về sản xuất sản phẩm</h4>
				<ul>
					<li>
						<strong>Nguồn gốc sản phẩm:</strong> Bên A phải đảm bảo được chất lượng
						nguồn gốc sản phẩm.
					</li>
					<li>
						<strong>Sử dụng quy trình chuẩn:</strong> Bên A cam kết tuân thủ quy trình
						chuẩn và quy định pháp luật về sản xuất các sản phẩm trong hợp đồng.
					</li>
					<li>
						<strong>Thu hoạch:</strong> Bên A đảm bảo thu hoạch theo đúng quy trình,
						cách thức theo các quy chuẩn về thu hoạch.
					</li>
				</ul>
				<h4>Điều 3: Kiểm soát chất lượng sản phẩm sau thu hoạch</h4>
				<ul>
					<li>
						Chuyên viên kiểm tra chất lượng sản phẩm về màu sắc, mùi vị, kích thước và
						trạng thái sản phẩm sau thu hoạch.
					</li>
					<li>Kiểm tra khối lượng trên từng đơn vị sản phẩm.</li>
				</ul>
				<h4>Điều 4: Quyền lợi và nghĩa vụ của các bên</h4>
				<ul>
					<li>Được cung cấp công nghệ, kỹ thuật để thực hiện sản xuất.</li>
					<li>Được thanh toán theo quy định của Hợp đồng bao tiêu sản phẩm.</li>
					<li>Bao tiêu theo giá thành tại thời điểm ký hợp đồng dịch vụ.</li>
					<li>
						Doanh nghiệp đảm bảo bao tiêu sản phẩm có sử dụng dịch vụ canh tác theo quy
						trình chuẩn của chuyên viên thuộc doanh nghiệp.
					</li>
					<li>
						Doanh nghiệp phân công chuyên viên phụ trách canh tác cùng bên A để đảm bảo
						quá trình canh tác đạt chất lượng và hiệu suất cao. Giảm hao hụt chất lượng
						và lợi nhuận cho cả hai bên.
					</li>
				</ul>
				<h4>Điều 5: Chấm dứt điều khoản bao tiêu</h4>
				<ul>
					<li>Hợp đồng có thể chấm dứt trong các trường hợp sau đây:</li>
					<ul>
						<li>
							Bên A hủy hợp đồng, lúc báo cáo kiểm định hủy hợp đồng bên hủy phải bồi
							thường gấp 3 lần tổng sản lượng dự kiến nhân với giá tiền lúc ký dịch vụ
							bao tiêu.
						</li>
						<li>
							Bất kể hợp đồng chấm dứt trong trường hợp nào, Bên B có trách nhiệm
							thanh toán đầy đủ các chi phí Bên A đến thời điểm hợp đồng chấm dứt.
						</li>
						<li>
							Các khoản phạt và bồi thường thiệt hại và nghĩa vụ thanh toán của bất kỳ
							bên nào đối với bên còn lại phải được thực hiện trong vòng 30 ngày kể từ
							ngày chấm dứt hợp đồng.
						</li>
						<li>
							Trường hợp bất khả kháng (thiên tai) doanh nghiệp sẽ miễn trách nhiệm
							thu mua. Đàm phán với khách hàng hỗ trợ một phần tài chính.Doanh nghiệp
							phối hợp với chính quyền có chính sách hỗ trợ
						</li>
					</ul>
				</ul>
			</div>
			<div>
				<h3>Điều khoản 2: Bao thiết bị vật tư</h3>

				<h4>Điều 1: Phạm vi cung cấp vật phẩm thiết bị</h4>
				<ul>
					<li>
						Doanh nghiệp đảm bảo cung cấp đầy đủ số lượng, phân loại và chất lượng vật
						tư cần thiết.
					</li>
					<li>
						Các vật tư thiết bị được chuyên viên vận chuyển trực tiếp đến mảnh vườn theo
						từng giai đoạn canh tác trong quy trình sản xuất.
					</li>
					<li>
						Doanh nghiệp kiểm định nguồn gốc vật tư rõ ràng trước khi đưa vào quy trình
						canh tác.
					</li>
					<li>
						Thời gian giao vật tư đảm bảo đúng tiến độ để không làm gián đoạn quá trình
						canh tác của khách hàng.
					</li>
				</ul>

				<h4>Điều 2: Quyền lợi và nghĩa vụ của khách hàng</h4>
				<ul>
					<li>
						Hàng hóa được thanh toán đầy đủ ngay từ thời điểm khách hàng mua dịch vụ.
					</li>
					<li>
						Các vật tư, thiết bị được bảo hành định kỳ, đặc biệt đối với máy móc và các
						thiết bị kỹ thuật.
					</li>
					<li>
						Khách hàng (Bên A) phải đảm bảo sử dụng thiết bị đúng quy cách để tránh hư
						hại:
					</li>
					<ul>
						<li>
							Trong trường hợp xảy ra hư hại nhỏ, khách hàng sẽ mất phí cọc thiết bị.
						</li>
						<li>
							Trong trường hợp hư hại lớn, khách hàng phải bồi thường chi phí thiệt
							hại tương ứng với mức độ hư hại của thiết bị.
						</li>
					</ul>
				</ul>

				<h4>Điều 3: Vi phạm hợp đồng</h4>
				<ul>
					<li>
						Trong trường hợp doanh nghiệp (Bên B) không cung cấp đủ vật tư cho khách
						hàng (Bên A), Bên B phải đền bù thiệt hại cho quá trình canh tác của khách
						hàng.
					</li>
					<li>Trường hợp bất khả kháng:</li>
					<ul>
						<li>
							Hai bên sẽ thỏa thuận riêng dựa trên tình hình thực tế để đưa ra giải
							pháp phù hợp.
						</li>
					</ul>
				</ul>
			</div>
			<div>
				<h3>Điều khoản 3: Đặc quyền quy trình</h3>

				<h4>Điều 1: Gói dịch vụ canh tác sạch VietGAP</h4>
				<ul>
					<li>
						Gói dịch vụ canh tác sạch VietGAP sẽ được phân công cho nhân viên kỹ thuật
						để thực hiện canh tác theo yêu cầu của khách hàng.
					</li>
					<li>
						Doanh nghiệp sẽ áp dụng quy trình chuẩn, đã được dự báo về chất lượng và
						năng suất, để canh tác theo từng mùa vụ.
					</li>
					<li>
						Doanh nghiệp định giá thị trường thu mua tại mùa vụ của quy trình ngay từ
						lúc mua dịch vụ, giúp khách hàng nắm rõ chi phí và lợi nhuận tiềm năng.
					</li>
				</ul>

				<h4>Điều 2: Quản lý và đánh giá quy trình</h4>
				<ul>
					<li>
						Chuyên gia (Expert) sẽ đảm nhận việc tạo và đánh giá các quy trình chuẩn. Họ
						sẽ review và đảm bảo chất lượng của quy trình khi được triển khai cụ thể.
					</li>
					<li>
						Quy trình cụ thể sẽ được thông báo cho khách hàng trước ít nhất 1 ngày vào
						lúc 5:00 PM trước khi bắt đầu mỗi giai đoạn quan trọng trong quy trình.
					</li>
					<li>
						Các giai đoạn trong quy trình sẽ được hệ thống thông báo nhắc nhở kỹ càng,
						đảm bảo khách hàng luôn theo dõi sát sao tiến độ.
					</li>
				</ul>

				<h4>Điều 3: Giá vật tư và điều chỉnh quy trình</h4>
				<ul>
					<li>
						Khi tạo quy trình kỹ thuật chuẩn, giá vật tư sẽ không thay đổi. Giá vật tư
						này được giữ cố định trong suốt quá trình thực hiện quy trình canh tác cụ
						thể.
					</li>
					<li>
						Mặc dù có thể phát sinh các vấn đề trong quá trình canh tác, nhưng giá vật
						tư ban đầu vẫn sẽ được giữ nguyên, không có sự thay đổi, giúp khách hàng
						không bị bất ngờ về chi phí phát sinh.
					</li>
				</ul>
			</div>
			<h3>Điều khoản 4: Hiệu lực của hợp đồng</h3>
			<p>
				Hợp đồng có hiệu lực từ {formatDateToVN(contract?.timeStart)} đến{' '}
				{formatDateToVN(contract?.timeEnd)} hoặc cho đến khi các bên hoàn thành mọi nghĩa
				vụ.
			</p>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<p>
					<strong>BÊN A:</strong>
					<br />
					(Ký và ghi rõ họ tên)
				</p>
				<p>
					<strong>BÊN B:</strong>
					<br />
					(Ký và ghi rõ họ tên)
				</p>
			</div>
		</div>
	);
});

export default PrintContract;
