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
import {ProductPurchaseInvoicePage} from '../pages/ProductPurchaseInvoicePage/ProductPurchaseInvoicePage';
import {ManageEmployeesPage} from '../pages/ManageEmployeesPage/ManageEmployeesPage';
import {ManageMaterialPage} from '../pages/ManageMaterialPage/ManageMaterialPage';
import {ManagePlantPage} from '../pages/ManagePlantPage/ManagePlantPage';
import {ManageServicesInusePage} from '../pages/ManageServicesInusePage/ManageServicesInusePage';
import {ManageStandardProcessPage} from '../pages/ManageStandardProcessPage/ManageStandardProcessPage';
import {ManagerDashBoardPage} from '../pages/ManagerDashBoardPage/ManagerDashBoardPage';
import {ManageServicePage} from '../pages/ManageServicePage/ManageServicePage';
import {ManageServicePackagePage} from '../pages/ManageServicePackagePage/ManageServicePackagePage';
import {ManageLandPage} from '../pages/ManageLandPage/ManageLandPage';
import {ManageTransactionPage} from '../pages/ManageTransactionPage/ManageTransactionPage';
import {ManageRentalEquipmentPage} from '../pages/ManageRentalEquipmentPage/ManageRentalEquipmentPage';
import {ManageAgriProductPurchaseRequestPage} from '../pages/ManageAgriProductPurchaseRequestPage/ManageAgriProductPurchaseRequestPage';
import {ManageOrderPage} from '../pages/ManageOrderPage/ManageOrderPage';

export const AppRouters = () => {
	return (
		<DefaultLayout>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute roles={['staff', 'manager']}>
							<DashboardPage />
						</PrivateRoute>
					}
				/>
				<Route path="/booking-land" element={<BookingLandPage />} />
				<Route path="/land-requests" element={<LandLeaseRequestPage />} />
				<Route path="/service-requests" element={<ServiceRequestPage />} />
				<Route path="/purchase-requests" element={<PurchaseRequestPage />} />
				<Route path="/task-management" element={<TaskManagementPage />} />
				<Route path="/log-monitoring" element={<DiaryMonitoringPage />} />
				<Route path="/order-reports" element={<OrderReportsPage />} />
				<Route path="/supply-invoices" element={<SupplyOrderPage />} />
				<Route path="/land-reports" element={<LandReportsPage />} />
				<Route path="/services-inuse" element={<ManageServicesInusePage />} />
				<Route path="/reminders" element={<ReminderPage />} />
				<Route path="/product-purchase-invoices" element={<ProductPurchaseInvoicePage />} />

				<Route
					path="/manage-employees"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageEmployeesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-materials"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageMaterialPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-plants"
					element={
						<PrivateRoute roles={['manager']}>
							<ManagePlantPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-standard-process"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageStandardProcessPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manager-dashboard"
					element={
						<PrivateRoute roles={['manager']}>
							<ManagerDashBoardPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-service"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageServicePage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-service-package"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageServicePackagePage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-land"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageLandPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-transaction"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageTransactionPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-rental-equipment"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageRentalEquipmentPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-agri-product-purchase-request"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageAgriProductPurchaseRequestPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-order"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageOrderPage />
						</PrivateRoute>
					}
				/>

				<Route path="/login" element={<LoginPage />} />

				<Route path="/permission-denied" element={<PermissionDeniedPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</DefaultLayout>
	);
};
