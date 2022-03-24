//Format the cart total into a currency string
export const _formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR'
})