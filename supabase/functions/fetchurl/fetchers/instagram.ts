import * as cheerio from 'npm:cheerio@1.0.0-rc.12';
import {
  getMetatag,
  getHTML,
  generateDataTemplate,
  formattedToRegularNumber,
} from '../services/data.ts';

export async function profile(url: string): Promise<any> {
  return await fetchProfileData(url);
}

async function fetchProfileData(url: string) {
  const apiResponse = generateDataTemplate(url);
  const html = await getHTML(url);
  const $ = cheerio.load(html);

  const avatar = getMetatag($, 'image');
  const titleData = getMetatag($, 'title');
  const { accountName, username } = extractDataFromTitle(titleData);
  const descriptionData = getMetatag($, 'description');
  const follows = extractStats(descriptionData);

  apiResponse.data = {
    avatar,
    username,
    name: accountName,
    followers: follows[0],
    following: follows[1],
    posts: follows[2],
  };
  apiResponse.status = 'COMPLETED';

  return apiResponse;
}

function extractDataFromTitle(str: string) {
  let startIndex = str.indexOf('(') + 1;
  let endIndex = str.indexOf(')');
  let accountName = str.substring(0, startIndex - 2);
  let username = str.substring(startIndex, endIndex);

  return {
    accountName: accountName,
    username: username.replace('@', ''),
  };
}

function extractStats(str: any) {
  const regex =
    /(\d+(?:\.\d+)?(?:M|K)?)\s*Followers,\s*(\d{1,3}(?:,\d{3})*|\d+)\s*Following,\s*(\d{1,3}(?:,\d{3})*|\d+)\s*Posts/g;

  const matches = str.match(regex);
  const statData = matches[0].split(', ');

  return processStatData(statData);
}

function processStatData(statData: string[]): number[] {
  console.log(statData);
  const processedData: number[] = [];
  for (let i = 0; i < statData.length; i++) {
    let element = statData[i];

    // Replacements
    element = element.replace('Followers', '');
    element = element.replace('Following', '');
    element = element.replace('Posts', '');
    element = element.trim();

    processedData.push(formattedToRegularNumber(element));
  }
  return processedData;
}
