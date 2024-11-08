import dayjs from 'dayjs';
const api = 'https://api.agrifarm.site';

//Add functions to reuse here
export function formatNumber(number) {
	if (number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	return number;
}
//Format timestamp to "DD/MM/YYYY"
export function formatDate(date) {
	if (date) {
		return dayjs(date).format('DD/MM/YYYY');
	}
	return date;
}

export const getRole = (input) => {
	switch (input) {
		case 0:
			return 'admin';
		case 1:
			return 'manager';
		case 2:
			return 'staff';
		default:
			return null;
	}
};

export function convertImageURL(relativePath) {
	console.log(relativePath);
	const formattedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
	return `${api}${formattedPath}`;
}
