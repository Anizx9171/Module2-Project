export const FomatMoney = (number) => Number(number).toLocaleString('vi', { style: 'currency', currency: 'VND' })
