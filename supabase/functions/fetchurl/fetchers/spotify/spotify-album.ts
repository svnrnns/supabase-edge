import { fetchPageData } from '../../utils/fetchersUtils.ts';
import { ProcessedResponse } from '../../utils/types.ts';
import { getMetatag } from '../../utils/httpProcessing.ts';

export async function processSpotifyAlbum(
  url: string
): Promise<ProcessedResponse> {
  return await fetchPageData(url, ($) => {
    return {
      title: getMetatag($, 'title'),
      type: 'album',
      artists: getMetatag($, 'description')?.split('·')[1].trim(),
      release_date: getMetatag($, 'release_date'),
      cover: getMetatag($, 'image'),
      songs: 0, //todo
    };
  });
}
