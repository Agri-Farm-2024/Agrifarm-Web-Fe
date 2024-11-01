import axios from 'axios';
const API = 'https://api.agrifarm.site';

export const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append('file', file, file.name);

	try {
		const response = await axios.post(`${API}/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: '*/*',
			},
		});
		return response.data; // Return the response data if successful
	} catch (error) {
		console.error('Error uploading file:', error);
		throw error; // Throw error to be handled by calling function
	}
};
