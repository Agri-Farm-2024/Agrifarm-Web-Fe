import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {
	DashboardOutlined,
	UserOutlined,
	FileTextOutlined,
	ScheduleOutlined,
	FormOutlined,
	EnvironmentOutlined,
	BellOutlined,
	FileDoneOutlined,
	SettingOutlined,
	ShoppingCartOutlined,
	DeliveredProcedureOutlined,
	CalculatorOutlined,
	TeamOutlined,
	ToolOutlined,
	ControlOutlined,
	ApiOutlined,
	FundProjectionScreenOutlined,
	AccountBookOutlined,
	ApartmentOutlined,
	AppstoreOutlined,
	TransactionOutlined,
	TruckOutlined,
	FundViewOutlined,
	SunOutlined,
	GoldOutlined,
	LayoutOutlined,
} from '@ant-design/icons';
import {imageExporter} from '../assets/images';
import TopNavbar from '../components/TopNavBar/TopNavBar';
import {useSelector} from 'react-redux';
import {getUserSelector} from '../redux/selectors';
import {getRole} from '../utils';

const {Footer, Sider, Content} = Layout;
const {SubMenu} = Menu;

const getItem = (label, key, icon, items) => ({key, icon, label, items});

export const DefaultLayout = ({children}) => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const [selectMenu, setSelectMenu] = useState(location.pathname);

	const userSelector = useSelector(getUserSelector)?.user;
	console.log('userselector: ' + JSON.stringify(userSelector));

	//Location will display the sider menu
	const pageLocation = [
		'/dashboard',
		'/booking-land',
		'/task-management',
		'/land-requests',
		'/service-requests',
		'/purchase-requests',
		'/booking-land',
		'/services-inuse',
		'/task-management',
		'/log-monitoring',
		'/order-reports',
		'/supply-invoices',
		'/land-reports',
		'/reminders',
		'/product-purchase-invoices',
		'/manage-employees',
		'/manage-materials',
		'/manage-plants',
		'/manage-standard-process',
		'/manager-dashboard',
		'/manage-service-package',
		'/manage-land',
		'/manage-transaction',
		'/manage-rental-equipment',
		'/manage-agri-product-purchase-request',
		'/manage-order',
		'/manage-view-land',
		'/manage-contract-manager',
		'/manage-plant-season',
		'/manage-account',
		'/manage-land-type',
	];

	const staffMenuItems = [
		// getItem('Dashboard', '/dashboard', <DashboardOutlined />),
		getItem('Yêu cầu thuê đất', '/land-requests', <FileTextOutlined />),
		getItem('Quản lý thuê đất', '/booking-land', <EnvironmentOutlined />),
		getItem('Phân công nhiệm vụ', '/task-management', <ScheduleOutlined />),
		getItem('Dịch vụ đang sử dụng', '/services-inuse', <ApiOutlined />),
		// getItem('Giám sát nhật ký', '/log-monitoring', <FormOutlined />),
		// getItem('Báo cáo đơn hàng', '/order-reports', <FileDoneOutlined />),
		// getItem('Hóa đơn cung cấp thiết bị', '/supply-invoices', <SettingOutlined />),
		getItem('Quản lý thiết bị thuê', '/manage-rental-equipment', <ToolOutlined />),
		// getItem('Hóa đơn thu mua', '/product-purchase-invoices', <CalculatorOutlined />),
		// getItem('Nhắc nhở', '/reminders', <BellOutlined />),
	];

	const adminMenuItems = [
		getItem('Quản lý tài khoản', '/manage-account', <TeamOutlined />),
		getItem('Quản lý giao dịch', '/manage-transaction', <TransactionOutlined />),
	];

	const managerMenuItems = [
		getItem('Dashboard', '/manager-dashboard', <DashboardOutlined />),
		getItem('Quản lý nhân viên', '/manage-employees', <TeamOutlined />),

		getItem('Quản lý quy trình', 'sub1', <ControlOutlined />, [
			getItem('Quản lý giống cây', '/manage-plants', <ControlOutlined />),
			getItem('Quản lý mùa vụ', '/manage-plant-season', <SunOutlined />),
			getItem(
				'Quản lý quy trình chuẩn',
				'/manage-standard-process',
				<FundProjectionScreenOutlined />
			),
		]),
		getItem('Quản lý dịch vụ', 'sub2', <GoldOutlined />, [
			getItem('Quản lý gói dịch vụ', '/manage-service-package', <ApartmentOutlined />),
		]),
		getItem('Quản lý mảnh đất', 'sub3', <AppstoreOutlined />, [
			getItem('Danh sách mảnh đất', '/manage-land', <AppstoreOutlined />),
			getItem('Yêu cầu xem đất', '/manage-view-land', <FundViewOutlined />),
			getItem('Danh sách hợp đồng', '/manage-contract-manager', <FileDoneOutlined />),
			getItem('Quản lý loại đất', '/manage-land-type', <LayoutOutlined />),
		]),

		getItem('Quản lý giao dịch', '/manage-transaction', <TransactionOutlined />),
		getItem(
			'Quản lý yêu cầu thu mua',
			'/manage-agri-product-purchase-request',
			<TruckOutlined />
		),
		getItem('Quản lý vật tư', '/manage-materials', <ToolOutlined />),
		getItem('Quản lý thiết bị thuê', '/manage-rental-equipment', <FileTextOutlined />),

		// getItem('Quản lý đơn hàng', '/manage-order', <FileTextOutlined />),
		getItem('Báo cáo tình trạng đất', '/land-reports', <FileDoneOutlined />),
	];

	// Define the menu items
	const items =
		getRole(userSelector?.role) == 'manager'
			? managerMenuItems
			: getRole(userSelector?.role) == 'staff'
				? staffMenuItems
				: adminMenuItems;

	const handleClickMenuItem = (e) => {
		setSelectMenu(e.key);
		navigate(e.key);
	};

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const isLoginPage = location.pathname === '/login';
	const showHeaderFooter = !isLoginPage;

	return (
		<Layout style={{minHeight: '100vh'}}>
			<Sider
				collapsed={collapsed}
				collapsible
				theme="light"
				onCollapse={toggleCollapsed}
				width={250} // Increase width to 250px (adjust this value as needed)
				style={{
					display: pageLocation.includes(location.pathname) ? 'block' : 'none',
				}}
			>
				<Link
					to="/"
					onClick={() => setSelectMenu('/')}
					style={{display: 'block', height: '100px'}}
				>
					<img
						src={imageExporter.logo}
						alt="logo"
						style={{
							width: collapsed ? '60%' : '40%',
							display: 'block',
							margin: '10px auto',
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
				</Link>
				<Menu
					onClick={handleClickMenuItem}
					theme="light"
					selectedKeys={[selectMenu]}
					mode="inline"
				>
					{items.map((item, index) =>
						item.items ? (
							<SubMenu key={item.key} icon={item.icon} title={item.label}>
								{item.items.map((child, indexItem) => (
									<Menu.Item key={child.key} icon={child.icon}>
										<Link to={child.key}>{child.label}</Link>
									</Menu.Item>
								))}
							</SubMenu>
						) : (
							item && (
								<Menu.Item key={item.key} icon={item.icon}>
									<Link to={item.key}>{item.label}</Link>
								</Menu.Item>
							)
						)
					)}
				</Menu>
			</Sider>
			<Layout style={{backgroundColor: '#eaeaea', minHeight: '100vh'}}>
				{showHeaderFooter && <TopNavbar />}
				<Content
					style={{
						overflow: 'hidden',
						backgroundColor: '#FBFCFB',
					}}
				>
					{children}
				</Content>

				{showHeaderFooter && (
					<Footer style={{textAlign: 'center'}}>
						AgriFarm Website ©{new Date().getFullYear()} Created by AgriFarm Team
					</Footer>
				)}
			</Layout>
		</Layout>
	);
};
