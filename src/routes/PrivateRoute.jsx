import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {getUserSelector} from '../redux/selectors';
import {toast} from 'react-toastify';
import {getRole} from '../utils';

const PrivateRoute = ({children, roles}) => {
	const userSelector = useSelector(getUserSelector)?.user;

	// const userLocal = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

	// if (!userLocal || !userLocal.user || !userLocal.user.role || userLocal.user.role !== 'admin') {
	// 	return <Navigate to="/login" />;
	// }
	console.log('User private router: ' + JSON.stringify(userSelector));
	if (!userSelector || !userSelector.role || userSelector.role === '') {
		if (userSelector && userSelector.role == 0) {
			console.log('Admin user');
		} else {
			console.log('Private route redirect');
			console.log('userSelector', userSelector);
			toast.info('Hãy đăng nhập!');
			return <Navigate to="/login" />;
		}
	}

	// Kiểm tra xem người dùng có vai trò phù hợp không
	if (!roles.includes(getRole(userSelector.role))) {
		console.log('/permission-denied');
		return <Navigate to="/permission-denied" />;
	}

	return children;
};

export default PrivateRoute;
