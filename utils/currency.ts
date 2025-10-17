// Fixed exchange rate BGN to EUR (Bulgaria uses a currency board)
const BGN_TO_EUR_RATE = 1.95583;

export function convertBgnToEur(bgn: number): number {
  return bgn / BGN_TO_EUR_RATE;
}

export function formatPriceWithEur(price: number, currencySymbol: string = 'лв.'): string {
  const eurPrice = convertBgnToEur(price);
  return `${price.toFixed(2)} ${currencySymbol}`;
}

export function getEurConversion(price: number): string {
  const eurPrice = convertBgnToEur(price);
  return `(${eurPrice.toFixed(2)} EUR)`;
}

