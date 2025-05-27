export const formatGBP = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

export const formatMoney = (amount, options = {}) => {
  const defaultOptions = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  return new Intl.NumberFormat('en-GB', {
    ...defaultOptions,
    ...options,
  }).format(amount)
}
