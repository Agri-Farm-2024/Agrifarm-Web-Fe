import axios from 'axios';
import {toast} from 'react-toastify';

const API = 'http://localhost:3333';
let accessToken =
	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token.accessToken;

let refreshToken =
	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token.refreshToken;

export const api = axios.create({
	baseURL: API,
	headers: {
		Authorization: `Bearer ${accessToken}`,
		Refresh: refreshToken,
	},
});

// Axios response interceptor to handle token expiration and renewal
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response?.status === 401) {
			console.log('401 error');
			window.location.href = '/login';
		}
		if (error.response?.status === 403) {
			console.log('403 error');
			// window.location.href = '/permission-denied';
			toast.error('403 error');
		}
		return Promise.reject(error);
	}
);
