import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {DashboardOutlined, UserOutlined} from '@ant-design/icons';
import {imageExporter} from '../assets/images';
import TopNavbar from '../components/TopNavBar/TopNavBar'; // Import the TopNavbar component
const {Footer, Sider, Content} = Layout;

const getItem = (label, key, icon) => ({key, icon, label});

export const DefaultLayout = ({children}) => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const [selectMenu, setSelectMenu] = useState(location.pathname);

	const pageLocation = [
		'/dashboard',
		//add page loction here to detect selected page
	];

	const items = [
		getItem('Dashboard', '/dashboard', <DashboardOutlined />),
		//add menu items here
	];

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
				style={{display: pageLocation.includes(location.pathname) ? 'block' : 'none'}}
			>
				<Link to="/dashboard" style={{display: 'block', height: '100px'}}>
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
					{items.map((item) => (
						<Menu.Item key={item.key} icon={item.icon}>
							<Link to={item.key}>{item.label}</Link>
						</Menu.Item>
					))}
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
					<div
						style={{
							minHeight: 360,
							margin: '15px',
							boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Adjust shadow values as needed
							borderRadius: '15px', // Optional: add border radius for rounded corners
							padding: '20px', // Optional: add padding for inner content spacing
							backgroundColor: '#ffffff', // Optional: set a background color if needed
						}}
					>
						{children}
					</div>
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
