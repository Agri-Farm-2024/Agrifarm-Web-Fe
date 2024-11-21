import axios from 'axios';
import {toast} from 'react-toastify';

// const API = 'http://localhost:3333';
const API = 'https://api.agrifarm.site';

// Create Axios instance
export const api = axios.create({
	baseURL: API,
});

// Request Interceptor: Dynamically set tokens in headers
api.interceptors.request.use(
	(config) => {
		// Retrieve user data from localStorage
		const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

		if (user) {
			const {accessToken, refreshToken} = user.token;
			config.headers.Authorization = `Bearer ${accessToken}`;
			config.headers.Refresh = refreshToken;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Axios response interceptor to handle token expiration and renewal
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401) {
			console.log('401 error');

			if (error.response.data.message === 'jwt expired') {
				try {
					const newAccessToken = await refreshAccessToken();

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return api(originalRequest);
				} catch (refreshError) {
					return Promise.reject(refreshError);
				}
			}
			if (error.response.data.message === 'jwt malformed') {
				let accessToken =
					localStorage.getItem('user') &&
					JSON.parse(localStorage.getItem('user')).token.accessToken;

				let refreshToken =
					localStorage.getItem('user') &&
					JSON.parse(localStorage.getItem('user')).token.refreshToken;
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				originalRequest.headers.Refresh = refreshToken;

				return api(originalRequest);
			}
		}
		if (error.response?.status === 403) {
			console.log('403 error');
			let accessToken =
				localStorage.getItem('user') &&
				JSON.parse(localStorage.getItem('user')).token.accessToken;

			let refreshToken =
				localStorage.getItem('user') &&
				JSON.parse(localStorage.getItem('user')).token.refreshToken;
			originalRequest.headers.Authorization = `Bearer ${accessToken}`;
			originalRequest.headers.Refresh = refreshToken;
			return api(originalRequest);
			// window.location.href = '/permission-denied';
		}

		if (error.response?.status === 502) {
			console.log('502 error');
			toast.error('Server đang bảo trì!');
		}
		return Promise.reject(error);
	}
);

const refreshAccessToken = async () => {
	try {
		const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

		if (!user || !user.token.refreshToken) {
			throw new Error('No refresh token available');
		}

		const response = await api.get(`${API}/auths/getAccessToken`);
		console.log('Access token: ' + JSON.stringify(response.data.metadata));
		const newAccessToken = response.data.metadata;

		// Update tokens in localStorage
		user.token.accessToken = newAccessToken;
		localStorage.setItem('user', JSON.stringify(user));

		return newAccessToken;
	} catch (error) {
		console.error('Token refresh failed', error);
		toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
		localStorage.removeItem('user');
		window.location.href = '/login';
		throw error;
	}
};
