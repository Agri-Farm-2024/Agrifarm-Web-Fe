import React, {useState, useRef, useEffect} from 'react';
import styles from './TopNavBar.module.css';
import {BellOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {message} from 'antd';
import {useNavigate} from 'react-router-dom';
import {convertImageURL, getRole} from '../../utils';
import userSlice from '../../redux/slices/userSlice';
import {Notification} from '../Notification/Notification';
import {toast} from 'react-toastify';
import socket from '../../services/socket';
import {api} from '../../services/api';
import axios from 'axios';
import {fetchNotifications} from '../../redux/slices/notificationSlice';

const TopNavbar = () => {
	const userLocal = JSON.parse(localStorage.getItem('user'));
	const user = userLocal?.user;
	const user_id = useSelector((state) => state.userSlice?.user?.user?.user_id);
	const [notifiNoSeenn, setNotiNoSeen] = useState(1);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const notifications = useSelector((state) => state.notificationSlice?.notifications);

	const [showNotification, setShowNotification] = useState(false);
	const [showSignOutPopup, setShowSignOutPopup] = useState(false);
	const [showSignOutButton, setShowSignOutButton] = useState(false);
	const signOutRef = useRef(null);
	const notiRef = useRef(null);

	useEffect(() => {
		// Function to handle clicks outside the sign-out button
		const handleClickOutside = (event) => {
			if (signOutRef.current && !signOutRef.current.contains(event.target)) {
				setShowSignOutButton(false);
				setShowSignOutPopup(false);
				setShowNotification(false);
			}
		};

		// Add event listener to detect clicks outside the sign-out button
		document.addEventListener('mousedown', handleClickOutside);

		// Clean up event listener on unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const callNotification = (title, desc, navigateTo) => {
		toast(
			<div>
				<strong
					style={{
						fontSize: 14,
					}}
				>
					{title}
				</strong>
				<div
					style={{
						fontSize: 12,
					}}
				>
					{desc}
				</div>
			</div>,
			{
				type: 'success',
				onClick: () => {
					navigate(navigateTo);
				},
				position: 'bottom-right',
				autoClose: 5000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				icon: <BellOutlined />,
				progress: undefined,
			}
		);
	};

	const socketRef = useRef(null);

	useEffect(() => {
		socketRef.current = socket;

		socketRef.current.emit('online-user', user_id);
		socketRef.current.on('notification', async (data) => {
			let navigate = '';
			if (data.message.type === 'booking_land') {
				navigate = 'manage-contract-manager';
			}
			dispatch(fetchNotifications({pageSize: 1000, pageIndex: 1}));
			callNotification(data.message.title, data.message.content, navigate);
			console.log(data);
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.off('notification');
			}
		};
	}, [user_id]);

	useEffect(() => {
		dispatch(fetchNotifications({pageSize: 1000, pageIndex: 1}));
	}, [dispatch]);

	useEffect(() => {
		const numberNoSeen = notifications.filter((item) => item.is_seen === false)?.length;
		setNotiNoSeen(numberNoSeen);
	}, [notifications]);

	const handleBellClick = () => {
		setShowNotification(!showNotification);
	};

	const handleProfileClick = () => {
		setShowSignOutButton(true);
	};

	const handleSignOut = () => {
		setShowSignOutPopup(true);
		setShowSignOutButton(false);
	};

	const handleCancelSignOut = () => {
		setShowSignOutPopup(false);
		setShowSignOutButton(false);
	};

	const handleConfirmSignOut = () => {
		localStorage.removeItem('user');

		// 	userLoginSlice.actions.logout({
		// 		userId: '',
		// 		userPhone: '',
		// 		name: '',
		// 		email: '',
		// 		password: '',
		// 		bio: '',
		// 		avatar_url: '',
		// 		gender: '',
		// 		date_of_birth: '',
		// 		role: '',
		// 		accessToken: '',
		// 		refreshToken: '',
		// 		last_active_time: null,
		// 		status: '',
		// 	})
		// );
		dispatch(
			userSlice.actions.setUser({
				user: {
					role: null,
				},
			})
		);
		message.success('Đăng xuất thành công!');
		navigate('/login');
	};

	return (
		<div className={styles.topNavbar}>
			<div className={styles.rightSection}>
				<div className={styles.notificationIconContainer}>
					<BellOutlined onClick={handleBellClick} className={styles.notificationIcon} />
					<div
						style={{
							color: 'white',
							position: 'absolute',
							top: -5,
							right: -7,
							fontWeight: 'bold',
							background: 'red',
							borderRadius: '50%',
							padding: '1px 5px 1px 5px',
						}}
					>
						{notifiNoSeenn}
					</div>

					{showNotification && (
						<div ref={notiRef} className={styles.notificationDropdown}>
							<Notification handleBellClick={handleBellClick} />
						</div>
					)}
				</div>
				<div className={styles.profileContainer}>
					<img
						src={
							// user?.avatar_url ||
							// user?.avatar_url == '' ||
							convertImageURL(user?.avatar_url)
						}
						alt="Profile"
						className={styles.profileImage}
						onClick={handleProfileClick}
					/>
					<div className={styles.userInfo}>
						<span className={styles.userName}>{user?.full_name}</span>
						<span className={styles.userRole}>
							{user?.role === 1
								? 'Quản lý'
								: user?.role === 2
									? 'Nhân viên'
									: 'Admin'}
						</span>
					</div>
					{showSignOutButton && (
						<button
							ref={signOutRef}
							className={styles.signOutButton}
							onClick={handleSignOut}
						>
							Đăng xuất
						</button>
					)}
					{showSignOutPopup && (
						<div className={styles.signOutPopup}>
							<span className={styles.signOutText}>Bạn có muốn đăng xuất?</span>
							<div>
								<button
									className={styles.confirmButton}
									onClick={handleConfirmSignOut}
								>
									Đồng ý
								</button>
								<button
									className={styles.cancelButton}
									onClick={handleCancelSignOut}
								>
									Hủy
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TopNavbar;
