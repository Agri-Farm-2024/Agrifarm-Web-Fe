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

// 2024-11-07T11:21:22.263Z  => Ngày 7 tháng 11 năm 2024
export function formatDateToVN(isoDateString) {
	const date = new Date(isoDateString);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `Ngày ${day} tháng ${month} năm ${year}`;
}

//Shorten text formater
export function shortenText(description, limit) {
	// Check if the description is already within the limit
	if (!description || description?.length <= limit) {
		return description;
	}

	// Cut the text to the limit and add "..."
	return description.slice(0, limit) + '...';
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
