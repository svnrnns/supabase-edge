import { fetchPageData } from '../../utils/fetchersUtils.ts';
import { getMetatag } from '../../utils/httpProcessing.ts';
import { ProcessedResponse } from '../../utils/types.ts';

export async function processYoutubeChannel(
  url: string
): Promise<ProcessedResponse> {
  return await fetchPageData(url, ($) => {
    return {
      id: getMetatag($, 'identifier'),
      type: 'profile',
      name: getMetatag($, 'title'),
      description: getMetatag($, 'description'),
      image: getMetatag($, 'image'),
      image_size: {
        height: getMetatag($, 'image:height'),
        width: getMetatag($, 'image:width'),
      },
      subscribers: 0, // No clue how to get this
    };
  });
}
