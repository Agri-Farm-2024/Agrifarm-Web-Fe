import React, {useState, useRef, useEffect} from 'react';
import styles from './TopNavBar.module.css'; // Import CSS module file for styling
import {BellOutlined} from '@ant-design/icons'; // Import icon for notification bell
import {useDispatch} from 'react-redux';
import {message} from 'antd';
import {useNavigate} from 'react-router-dom';
import {getRole} from '../../utils';
import userSlice from '../../redux/slices/userSlice';
import {Notification} from '../Notification/Notification';

const TopNavbar = () => {
	const userLocal = JSON.parse(localStorage.getItem('user'));
	const user = userLocal?.user;

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
							'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
						}
						alt="Profile"
						className={styles.profileImage}
						onClick={handleProfileClick}
					/>
					<div className={styles.userInfo}>
						<span className={styles.userName}>{user?.full_name}</span>
						<span className={styles.userRole}>{getRole(user?.role)}</span>
					</div>
					{showSignOutButton && (
						<button
							ref={signOutRef}
							className={styles.signOutButton}
							onClick={handleSignOut}
						>
							Sign Out
						</button>
					)}
					{showSignOutPopup && (
						<div className={styles.signOutPopup}>
							<span className={styles.signOutText}>
								Are you sure you want to sign out?
							</span>
							<div>
								<button
									className={styles.confirmButton}
									onClick={handleConfirmSignOut}
								>
									Yes
								</button>
								<button
									className={styles.cancelButton}
									onClick={handleCancelSignOut}
								>
									Cancel
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
