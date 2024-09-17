import axios from 'axios';

const API = 'https://fine-special-ram.ngrok-free.app/v1/api';
let accessToken =
	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token.accessToken;

let refreshToken =
	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token.refreshToken;

let userId = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user.id;

export const api = axios.create({
	baseURL: API,
	// headers: {
	// 	authentication: accessToken,
	// 	'x-client-id': userId,
	// 	refresh: refreshToken,
	// 	'ngrok-skip-browser-warning': 'true', // Add this line for ngrok skip browser warning
	// },
});

// Axios response interceptor to handle token expiration and renewal
// api.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error) => {
// 		if (error.response.status === 401) {
// 			console.log('401 error');
// 			window.location.href = '/login';
// 		}
// 		if (error.response.status === 403) {
// 			console.log('403 error');
// 			window.location.href = '/permission-denied';
// 			toast.error('403 error');
// 		}
// 		return Promise.reject(error);
// 	}
// );
