// @ts-ignore
import * as cheerio from 'npm:cheerio@1.0.0-rc.12';
import { getMetatag, getHTML, generateDataTemplate } from '../services/data.ts';

export async function handle(url: string) {
  return await fetchGeneralData(url);
}

async function fetchGeneralData(url) {
  const apiResponse = generateDataTemplate(url);
  const html = await getHTML(url);
  const $ = cheerio.load(html);

  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content');
  const imageUrl = $('meta[property="og:image"]').attr('content');
  const faviconLink = $('link[rel="icon"], link[rel="shortcut icon"]')
    .first()
    .attr('href');
  const touchIconLink = $('link[rel="apple-touch-icon"]').attr('href');

  const faviconUrl = new URL(faviconLink, url).toString();
  const touchIconUrl = new URL(touchIconLink, url).toString();
  const s2FaviconUrl =
    'https://s2.googleusercontent.com/s2/favicons?domain_url=' + url;

  apiResponse.data = {
    title,
    description,
    image: imageUrl,
    favicon: faviconUrl,
    touchicon: touchIconUrl,
    s2_favicon: s2FaviconUrl,
  };
  apiResponse.status = 'COMPLETED';

  return apiResponse;
}
