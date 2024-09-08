export function formattedToRegularNumber(str: string): number {
  const multiplierMap = {
    K: 1000,
    M: 1000000,
    // Add more multipliers if needed, e.g., 'B' for billion
  };

  const regex = /(\d{1,3}(?:,\d{3})*\.?\d*)([KMB])?/i;
  const matches = regex.exec(str);

  if (!matches) return 0;

  const [, numberPart, multiplier] = matches;
  const strippedNumberPart = numberPart.replace(/,/g, '');

  if (multiplier) {
    const multiplierValue = multiplierMap[multiplier.toUpperCase()];
    return parseFloat(strippedNumberPart) * multiplierValue;
  } else {
    return parseFloat(strippedNumberPart);
  }
}
