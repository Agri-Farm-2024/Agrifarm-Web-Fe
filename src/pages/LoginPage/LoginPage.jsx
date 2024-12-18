import React, {useEffect, useState} from 'react';
import styles from './LoginPage.module.css';
import {Button, Form, Input, message, Modal} from 'antd';
import {imageExporter} from '../../assets/images';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import userSlice, {handleLogin} from '../../redux/slices/userSlice';
import {toast} from 'react-toastify';

const LoginPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [counter, setCounter] = useState(60);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		let timer;

		if (isButtonDisabled && counter > 0) {
			timer = setTimeout(() => setCounter(counter - 1), 1000);
		} else if (counter === 0) {
			setIsButtonDisabled(false); // Re-enable button after countdown
		}

		return () => clearTimeout(timer); // Cleanup the timer on component unmount
	}, [counter, isButtonDisabled]);

	useEffect(() => {
		if (isModalOpen) {
			setIsButtonDisabled(false);
		}
	}, [isModalOpen]);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinish = (values) => {
		console.log('Success:', values);
		toast.loading('Đang đăng nhập...', {autoClose: false});

		dispatch(handleLogin(values))
			.then((response) => {
				toast.dismiss();
				const user = response.payload.metadata.user;
				if (user) {
					toast.success('Đăng nhập thành công!');
					navigate(
						user.role === 1
							? '/manager-dashboard'
							: user.role === 2
								? '/land-requests'
								: '/manage-account'
					);
				} else {
					if (response.payload.statusCode === 500) {
						toast.error('Hệ thống đang gặp lỗi !!');
						return;
					}

					if (response.payload.statusCode === 400) {
						if (response.payload.message == 'Invalid password') {
							toast.error('Email hoặc mật khẩu không đúng!');
						} else if (response.payload.message == 'Email is not exist') {
							toast.error('Email hoặc mật khẩu không đúng!');
						} else {
							toast.info('Tài khoản chưa được kích hoạt !!');
						}
						return;
					}
				}
			})
			.catch((error) => {
				toast.dismiss(); // Remove the loading message
				console.error(error);
				toast.error(error);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const onSubmitEmail = (values) => {
		console.log('Success send email:', values);
		setIsButtonDisabled(true);
		setCounter(60);
	};
	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<div className={styles.formContainer}>
					<img src={imageExporter.logo} alt=""></img>
					<p>Đăng nhập</p>
					<Form
						name="loginForm"
						layout="vertical"
						labelCol={{
							span: 24,
						}}
						wrapperCol={{
							span: 24,
						}}
						size="large"
						className={styles.loginForm}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						initialValues={{email: 'manager@gmail.com', password: '123'}}
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: 'Vui lòng không bỏ trống!',
								},
								{
									type: 'email',
									message: 'Email không hợp lệ!',
								},
							]}
						>
							<Input className={styles.inputField} />
						</Form.Item>

						<Form.Item
							label="Mật khẩu"
							name="password"
							rules={[
								{
									required: true,
									message: 'Vui lòng không bỏ trống!',
								},
							]}
						>
							<Input.Password className={styles.inputField} />
						</Form.Item>

						<div className={styles.forgotPwd}>
							<p onClick={showModal}>Quên mật khẩu</p>
						</div>
						<Modal
							title="Forgot Password Modal"
							open={isModalOpen}
							onOk={handleOk}
							onCancel={handleCancel}
							okButtonProps={{style: {display: 'none'}}}
							cancelButtonProps={{style: {display: 'none'}}}
							maskClosable={false}
							style={{paddingTop: '10rem'}}
							centered
						>
							<Form
								name="forgotPwdForm"
								layout="inline"
								labelCol={{
									span: 5,
								}}
								wrapperCol={{
									span: 24,
								}}
								size="large"
								className={styles.forgotPwdForm}
								onFinish={onSubmitEmail}
								onFinishFailed={onFinishFailed}
								autoComplete="off"
							>
								<Form.Item
									label="Email"
									name="email"
									rules={[
										{
											required: true,
											message: 'Vui lòng không bỏ trống!',
										},
										{
											type: 'email',
											message: 'Email không hợp lệ!',
										},
									]}
								>
									<Input className={styles.inputField} />
								</Form.Item>

								<Form.Item
									wrapperCol={{
										offset: 20,
										span: 24,
									}}
								>
									<Button
										className={styles.forgotPwdButton}
										disabled={isButtonDisabled}
										type="primary"
										htmlType="submit"
									>
										{isButtonDisabled ? `Đợi ${counter}s` : 'Gửi'}
									</Button>
								</Form.Item>
							</Form>
						</Modal>

						<Form.Item
							wrapperCol={{
								offset: 0,
								span: 24,
							}}
						>
							<Button className={styles.loginButton} type="primary" htmlType="submit">
								Đăng nhập
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div className={styles.bannerLogin}></div>
			</div>
		</div>
	);
};

export default LoginPage;
