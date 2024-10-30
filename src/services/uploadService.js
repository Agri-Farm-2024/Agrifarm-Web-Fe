import axios from 'axios';

export const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append('files', file, file.name);

	try {
		const response = await axios.post('http://localhost:3333/upload', formData, {
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
