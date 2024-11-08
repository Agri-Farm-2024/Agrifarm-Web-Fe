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
import {ManageServicePackagePage} from '../pages/ManageServicePackagePage/ManageServicePackagePage';
import {ManageLandPage} from '../pages/ManageLandPage/ManageLandPage';
import {ManageTransactionPage} from '../pages/ManageTransactionPage/ManageTransactionPage';
import {ManageRentalEquipmentPage} from '../pages/ManageRentalEquipmentPage/ManageRentalEquipmentPage';
import {ManageAgriProductPurchaseRequestPage} from '../pages/ManageAgriProductPurchaseRequestPage/ManageAgriProductPurchaseRequestPage';
import {ManageOrderPage} from '../pages/ManageOrderPage/ManageOrderPage';
import {ManageViewLand} from '../pages/ManageViewLand/ManageViewLand';
import ManageContractByManager from '../pages/ManageContractByManager/ManageContractByManager';
import {ManagePlantSeasonPage} from '../pages/ManagePlantSeasonPage/ManagePlantSeasonPage';
import ManagerDashBoardPages from '../pages/ManagerDashBoardPage/ManagerDashBoardPage';
import {ManageAccountPage} from '../pages/ManageAccountPage/ManageAccountPage';

export const AppRouters = () => {
	const userLocal = JSON.parse(localStorage.getItem('user'));
	const user = userLocal?.user;
	return (
		<DefaultLayout>
			<Routes>
				<Route
					path="/"
					element={
						<Navigate
							to={
								user?.role === 1
									? 'manager-dashboard'
									: user?.role === 2
										? '/dashboard'
										: user?.role == 0
											? '/manage-account'
											: '/login'
							}
						/>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<PrivateRoute roles={['staff']}>
							<DashboardPage />
						</PrivateRoute>
					}
				/>

				{/* Staff */}
				<Route
					path="/booking-land"
					element={
						<PrivateRoute roles={['staff']}>
							<BookingLandPage />
						</PrivateRoute>
					}
				/>

				<Route
					path="/land-requests"
					element={
						<PrivateRoute roles={['staff']}>
							<LandLeaseRequestPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/service-requests"
					element={
						<PrivateRoute roles={['staff']}>
							<ServiceRequestPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/purchase-requests"
					element={
						<PrivateRoute roles={['staff']}>
							<PurchaseRequestPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/task-management"
					element={
						<PrivateRoute roles={['staff']}>
							<TaskManagementPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/log-monitoring"
					element={
						<PrivateRoute roles={['staff']}>
							<DiaryMonitoringPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/order-reports"
					element={
						<PrivateRoute roles={['staff']}>
							<OrderReportsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/supply-invoices"
					element={
						<PrivateRoute roles={['staff']}>
							<SupplyOrderPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/land-reports"
					element={
						<PrivateRoute roles={['staff']}>
							<LandReportsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/services-inuse"
					element={
						<PrivateRoute roles={['staff']}>
							<ManageServicesInusePage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/reminders"
					element={
						<PrivateRoute roles={['staff']}>
							<ReminderPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/product-purchase-invoices"
					element={
						<PrivateRoute roles={['staff']}>
							<ProductPurchaseInvoicePage />
						</PrivateRoute>
					}
				/>

				{/* Manager */}

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
							<ManagerDashBoardPages />
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
					path="/manage-view-land"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageViewLand />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-contract-manager"
					element={
						<PrivateRoute roles={['manager']}>
							<ManageContractByManager />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage-transaction"
					element={
						<PrivateRoute roles={['manager', 'admin']}>
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
				<Route
					path="/manage-plant-season"
					element={
						<PrivateRoute roles={['manager']}>
							<ManagePlantSeasonPage />
						</PrivateRoute>
					}
				/>

				{/* Admin */}

				<Route
					path="/manage-account"
					element={
						<PrivateRoute roles={['admin']}>
							<ManageAccountPage />
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
