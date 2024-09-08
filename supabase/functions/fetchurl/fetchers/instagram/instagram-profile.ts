import { fetchPageData } from '../../utils/fetchersUtils.ts';
import { ProcessedResponse } from '../../utils/types.ts';
import { getMetatag } from '../../utils/httpProcessing.ts';
import { formattedToRegularNumber } from '../../utils/fns.ts';

export async function processInstagramProfile(
  url: string
): Promise<ProcessedResponse> {
  return await fetchPageData(url, ($) => {
    // Custom extractor for Instagram-specific metadata
    const avatar = getMetatag($, 'image');
    const titleData = getMetatag($, 'title');
    const { accountName, username } = extractDataFromTitle(titleData!);
    const descriptionData = getMetatag($, 'description');
    const follows = extractStats(descriptionData!);

    return {
      avatar,
      username,
      name: accountName,
      followers: follows[0],
      following: follows[1],
      posts: follows[2],
    };
  });
}

// Helper function to extract the account name and username from the title
function extractDataFromTitle(str: string) {
  const startIndex = str.indexOf('(') + 1;
  const endIndex = str.indexOf(')');
  const accountName = str.substring(0, startIndex - 2);
  const username = str.substring(startIndex, endIndex);

  return {
    accountName: accountName,
    username: username.replace('@', ''),
  };
}

// Helper function to extract follower, following, and post counts
function extractStats(str: string) {
  const regex =
    /(\d+(?:\.\d+)?(?:M|K)?)\s*Followers,\s*(\d{1,3}(?:,\d{3})*|\d+)\s*Following,\s*(\d{1,3}(?:,\d{3})*|\d+)\s*Posts/g;

  const matches = str.match(regex);
  const statData = matches ? matches[0].split(', ') : [];

  return processStatData(statData);
}

// Helper function to process the extracted stats into numbers
function processStatData(statData: string[]): number[] {
  return statData.map((element) => {
    // Remove words and format the number
    element = element.replace(/(Followers|Following|Posts)/g, '').trim();
    return formattedToRegularNumber(element);
  });
}
