import React from 'react';
import {DefaultLayout} from '../layouts/DefaultLayout';
import {Navigate, Route, Routes} from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import {NotFoundPage} from '../pages/NotFoundPage/NotFoundPage';
import PermissionDeniedPage from '../pages/PermissionDeniedPage/PermissionDeniedPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';

export const AppRouters = () => {
	return (
		<DefaultLayout>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" />} />
				<Route path="/dashboard" element={<DashboardPage />} />

				<Route path="/login" element={<LoginPage />} />

				<Route path="/permission-denied" element={<PermissionDeniedPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</DefaultLayout>
	);
};
