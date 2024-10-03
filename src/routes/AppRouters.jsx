import React from 'react';
import {DefaultLayout} from '../layouts/DefaultLayout';
import {Navigate, Route, Routes} from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import {NotFoundPage} from '../pages/NotFoundPage/NotFoundPage';
import PermissionDeniedPage from '../pages/PermissionDeniedPage/PermissionDeniedPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import BookingLandPage from '../pages/BookingLandPage/BookingLandPage';
import {LandLeaseRequestPage} from '../pages/LandLeaseRequestPage/LandLeaseRequestPage';
import {PurchaseRequestPage} from '../pages/PurchaseRequestPage/PurchaseRequestPage';
import {TaskManagementPage} from '../pages/TaskManagementPage/TaskManagementPage';
import {DiaryMonitoringPage} from '../pages/DiaryMonitoringPage/DiaryMonitoringPage';
import {SupplyOrderPage} from '../pages/SupplyOrderPage/SupplyOrderPage';
import {LandReportsPage} from '../pages/LandReportsPage/LandReportsPage';
import {ReminderPage} from '../pages/ReminderPage/ReminderPage';
import ServiceRequestPage from '../pages/ServiceRequestPage/ServiceRequestPage';
import OrderReportsPage from '../pages/OrderReportsPage/OrderReportsPage';

export const AppRouters = () => {
	return (
		<DefaultLayout>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/booking-land" element={<BookingLandPage />} />
				<Route path="/land-requests" element={<LandLeaseRequestPage />} />
				<Route path="/service-requests" element={<ServiceRequestPage />} />
				<Route path="/purchase-requests" element={<PurchaseRequestPage />} />
				<Route path="/task-management" element={<TaskManagementPage />} />
				<Route path="/log-monitoring" element={<DiaryMonitoringPage />} />
				<Route path="/order-reports" element={<OrderReportsPage />} />
				<Route path="/supply-invoices" element={<SupplyOrderPage />} />
				<Route path="/land-reports" element={<LandReportsPage />} />
				<Route path="/reminders" element={<ReminderPage />} />

				<Route path="/login" element={<LoginPage />} />

				<Route path="/permission-denied" element={<PermissionDeniedPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</DefaultLayout>
	);
};
