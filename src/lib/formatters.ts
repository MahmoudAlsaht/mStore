const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
	currency: 'JOD',
	style: 'currency',
	minimumFractionDigits: 2,
	maximumFractionDigits: 3,
});

export function formatCurrency(amount: number) {
	return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

export function formatNumber(number: number) {
	return NUMBER_FORMATTER.format(number);
}
