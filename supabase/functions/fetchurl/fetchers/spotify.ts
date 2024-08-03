import * as cheerio from 'npm:cheerio@1.0.0-rc.12';
import { getMetatag, getHTML, generateDataTemplate } from '../services/data.ts';

export async function track(url: string): Promise<any> {
  return await fetchTrackData(url);
}

export async function fetchTrackData(url: string) {
  const apiResponse = generateDataTemplate(url);
  const html = await getHTML(url);
  const $ = cheerio.load(html);

  const album = getMetatag($, 'album');
  const releaseDate = getMetatag($, 'release_date');
  const durationInMinutes = getMetatag($, 'duration');
  const artists = getMetatag($, 'musician_description').split(', ');
  const title = getMetatag($, 'title');
  const cover = getMetatag($, 'image');
  const audioPreview = getMetatag($, 'audio');

  apiResponse.data = {
    album,
    artists,
    title,
    cover,
    release_date: releaseDate,
    duration: durationInMinutes,
    audio_preview: audioPreview,
  };
  apiResponse.status = 'COMPLETED';

  return apiResponse;
}
