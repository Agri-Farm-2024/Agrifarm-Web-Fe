//Add functions to reuse here
export function formatNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const getRole = (input) => {
	switch (input) {
		case 1:
			return 'manager';
		case 2:
			return 'staff';
		default:
			return null;
	}
};
