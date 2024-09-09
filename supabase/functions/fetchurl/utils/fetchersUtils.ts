// @ts-ignore
import * as cheerio from 'npm:cheerio@1.0.0-rc.12';
import { getMetatag, getHTML, generateDataTemplate } from './httpProcessing.ts';
import { ProcessedResponse } from './types.ts';

// General scraper function that can be used for all fetchers
export async function fetchPageData(
  url: string,
  customExtractor?: ($: cheerio.Root) => Object
): Promise<ProcessedResponse> {
  const apiResponse = generateDataTemplate(url);

  try {
    const html = await getHTML(url);
    const $ = cheerio.load(html);

    // General metadata extraction
    const metadata = {
      page_title: $('title').text() ?? '',
      page_description: getMetatag($, 'description') ?? '',
      page_image: getMetatag($, 'image') ?? '',
      page_favicon: getFaviconUrl($, url) ?? '',
      page_touch_icon: getTouchIconUrl($, url) ?? '',
      page_s2_favicon: `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`,
    };

    apiResponse.data.url = metadata;

    if (customExtractor) {
      const customData = customExtractor($);
      apiResponse.data = {
        ...apiResponse.data,
        ...customData,
      };
    }
    apiResponse.status = 'COMPLETED';
  } catch (error) {
    apiResponse.status = 'FAILED';
  }

  return apiResponse;
}

// Helper function to get the favicon URL
function getFaviconUrl($: cheerio.Root, baseUrl: string): string {
  const faviconLink = $('link[rel="icon"], link[rel="shortcut icon"]')
    .first()
    .attr('href');
  if (faviconLink) {
    return new URL(faviconLink, baseUrl).toString();
  }
  return '';
}

// Helper function to get the touch icon URL
function getTouchIconUrl($: cheerio.Root, baseUrl: string): string {
  const touchIconLink = $('link[rel="apple-touch-icon"]').attr('href');
  if (touchIconLink) {
    return new URL(touchIconLink, baseUrl).toString();
  }
  return '';
}
