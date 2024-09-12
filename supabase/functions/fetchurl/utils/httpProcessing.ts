// @ts-ignore
import axios from 'npm:axios@1.7.3';
import { ProcessedResponse } from './types.ts';

// Fetch the HTML content of a given URL with proper error handling
export async function getHTML(url: string): Promise<string> {
  try {
    const { data: html } = await axios.get(url);
    return html;
  } catch (error) {
    throw new Error('Failed to fetch HTML content');
  }
}

// Dynamically search for metadata tags in the HTML
export function getMetatag($: any, name: string): string | undefined {
  const selectors = [
    `meta[name="${name}"]`,
    `meta[itemprop="${name}"]`,
    `meta[property="og:${name}"]`,
    `meta[property="twitter:${name}"]`,
    `meta[name="music:${name}"]`,
  ];

  for (const selector of selectors) {
    const content = $(selector).attr('content');
    if (content) return content;
  }

  return undefined;
}

// Generate the initial template for the API response
export function generateDataTemplate(url: string): ProcessedResponse {
  return {
    requested_url: url,
    status: 'FAILED',
    data: {},
  };
}
