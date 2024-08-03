import axios from 'npm:axios@1.7.3';

export async function getHTML(url: string) {
  const { data: html } = await axios.get(url);

  return html;
}

export function generateDataTemplate(url: string) {
  return {
    requested_url: url,
    status: 'FETCHING',
    data: {},
  };
}

export function getMetatag($: any, name: string) {
  return (
    $(`meta[name="${name}"]`).attr('content') ||
    $(`meta[property="og:${name}"]`).attr('content') ||
    $(`meta[property="twitter:${name}"]`).attr('content') ||
    $(`meta[name="music:${name}"]`).attr('content')
  );
}

export function failedResponse(url: string) {
  return {
    status: 'FAILED',
    requested_url: url,
    data: {},
  };
}

export function formattedToRegularNumber(str: string): number {
  const multiplierMap = {
    K: 1000,
    M: 1000000,
    // Add more multipliers if needed, e.g., 'B' for billion
  };

  const regex = /(\d{1,3}(?:,\d{3})*\.?\d*)([KMB])?/i;
  const matches = regex.exec(str);

  if (!matches) return null;

  const [, numberPart, multiplier] = matches;
  const strippedNumberPart = numberPart.replace(/,/g, '');

  if (multiplier) {
    const multiplierValue = multiplierMap[multiplier.toUpperCase()];
    return parseFloat(strippedNumberPart) * multiplierValue;
  } else {
    return parseFloat(strippedNumberPart);
  }
}
