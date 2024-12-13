import React, {forwardRef} from 'react';
import {formatDateToVN, formatNumber} from '../../../utils';

const PrintExtendContract = forwardRef((props, ref) => {
	const {contract} = props;

	console.log('extend: ' + JSON.stringify(contract));

	return (
		<div ref={ref} style={{padding: '50px', fontFamily: 'Arial, sans-serif'}}>
			<h1 style={{textAlign: 'center'}}>ĐƠN XIN GIA HẠN</h1>

			<p style={{fontSize: '18px', textAlign: 'center'}}>
				CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM <br />
				Độc lập - Tự do - Hạnh phúc
			</p>

			<p style={{fontSize: '18px', marginTop: '20px'}}>
				Đồng Nai,
				<span
					style={{
						fontStyle: 'italic',
					}}
				>
					{' '}
					{formatDateToVN(contract.createAt)}
				</span>
				.
			</p>

			<div>
				<strong>1. Người xin gia hạn sử dụng đất: </strong>
				<span
					style={{
						fontStyle: 'italic',
					}}
				>
					{' '}
					{contract.landrenter}
				</span>
			</div>
			<div>
				<strong>2. Email: </strong>
				<span
					style={{
						fontStyle: 'italic',
					}}
				>
					{' '}
					{contract.email}
				</span>
			</div>
			<div>
				<strong>3. Thông tin về thửa đất/khu đất đang sử dụng:</strong>
			</div>

			<h3></h3>
			<ul>
				<li>
					<strong>Tên mảnh đất: </strong>{' '}
					<span
						style={{
							fontStyle: 'italic',
						}}
					>
						{' '}
						{contract.position}
					</span>
				</li>
				<li>
					<strong>Diện tích đất (m2):</strong>
					<span
						style={{
							fontStyle: 'italic',
						}}
					>
						{' '}
						{formatNumber(contract.area)} m2
					</span>
				</li>
			</ul>
			<div>
				<strong>4. Thời gian muốn gia hạn: </strong>
				<span
					style={{
						fontStyle: 'italic',
					}}
				>
					{' '}
					<span
						style={{
							fontStyle: 'italic',
						}}
					>
						{' '}
						{contract.totalMonth} tháng
					</span>
				</span>
			</div>

			<div>
				<strong>5. Cam kết: </strong>
			</div>
			<ul>
				<li>Sử dụng đất đúng mục đích.</li>
				<li>Chấp hành đúng các quy định của pháp luật đất đai.</li>
				<li>Nộp tiền sử dụng đất (nếu có) đầy đủ, đúng hạn.</li>
			</ul>

			<div style={{marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
				<div>
					{' '}
					<p>Người làm đơn</p>
					<p style={{marginTop: '50px'}}>_________________________</p>
				</div>
				<div>
					<p>Doanh nghiệp</p>
					<p style={{marginTop: '50px'}}>_________________________</p>
				</div>
			</div>
		</div>
	);
});

export default PrintExtendContract;
