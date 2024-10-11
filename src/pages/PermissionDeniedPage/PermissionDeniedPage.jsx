import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Result} from 'antd';

const PermissionDeniedPage = () => {
	return (
		<Result
			status="403"
			title="Quyền truy cập bị từ chối"
			subTitle="Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ với quản trị viên để được hỗ trợ."
			extra={
				<Link to="/">
					<Button type="primary">Trở về trang chủ</Button>
				</Link>
			}
		/>
	);
};

export default PermissionDeniedPage;
