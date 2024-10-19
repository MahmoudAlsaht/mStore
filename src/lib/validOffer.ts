export function isDateInBetween(startDate: Date, endDate: Date) {
	const currentDate = new Date();
	const isBetween =
		currentDate >= startDate && currentDate <= endDate;

	return isBetween;
}
