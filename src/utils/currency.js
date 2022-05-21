const formatter = new Intl.NumberFormat('ru-Ru', {currency: 'RUB', style: 'currency'}) 

export function currency(value) { console.log(value); return formatter.format(value) }