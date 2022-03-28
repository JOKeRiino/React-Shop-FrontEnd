// This formatter function can be used to format numbers
// into currency strings.
export const _formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR'
})