import { fetchPageData } from '../../utils/fetchersUtils.ts';
import { ProcessedResponse } from '../../utils/types.ts';
import { getMetatag } from '../../utils/httpProcessing.ts';

export async function processSpotifyTrack(
  url: string
): Promise<ProcessedResponse> {
  return await fetchPageData(url, ($) => {
    return {
      title: getMetatag($, 'title'),
      album: getMetatag($, 'album'),
      type: 'song',
      release_date: getMetatag($, 'release_date'),
      duration_in_minutes: parseInt(getMetatag($, 'duration')!),
      artists: getMetatag($, 'musician_description')?.split(', '),
      audio_preview: getMetatag($, 'audio'),
      cover: getMetatag($, 'image'),
    };
  });
}
