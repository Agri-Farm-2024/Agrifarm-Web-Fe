import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {getUserSelector} from '../redux/selectors';
import {toast} from 'react-toastify';

const PrivateRoute = ({children, roles}) => {
	const userSelector = useSelector(getUserSelector);

	if (!userSelector || userSelector.role === '') {
		console.log('Private route redirect');
		console.log('userSelector', userSelector);
		toast.error('Please login!');
		return <Navigate to="/login" />;
	}

	// Kiểm tra xem người dùng có vai trò phù hợp không
	if (!roles.includes(userSelector.role)) {
		console.log('Private route redirect');
		return <Navigate to="/permission-denied" />;
	}

	return children;
};

export default PrivateRoute;
