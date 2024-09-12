import { fetchPageData } from '../../utils/fetchersUtils.ts';
import { ProcessedResponse } from '../../utils/types.ts';
import { getMetatag } from '../../utils/httpProcessing.ts';
import { extractNumbersFromString } from '../../utils/fns.ts';

export async function processSpotifyAlbum(
  url: string
): Promise<ProcessedResponse> {
  return await fetchPageData(url, ($) => {
    const description = getMetatag($, 'description');
    let artist = '';
    let songs = 0;

    if (description) {
      const splittedDescription = description.split('·');
      const l = splittedDescription.length;

      artist = splittedDescription[2].trim();
      songs = extractNumbersFromString(splittedDescription[l - 1]);
    }

    return {
      artist,
      songs,
      title: getMetatag($, 'title'),
      type: 'album',
      release_date: getMetatag($, 'release_date'),
      cover: getMetatag($, 'image'),
    };
  });
}
