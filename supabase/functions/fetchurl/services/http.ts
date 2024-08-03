import { track } from '../fetchers/spotify.ts';
import { failedResponse } from './data.ts';

const spotifyURL = 'open.spotify.com';
const instagramURL = 'instagram.com';

export async function process(url: string) {
  let response = undefined;

  if (url.includes(spotifyURL) && url.includes('/track/')) {
    response = await track(url);
  }

  return response === undefined ? failedResponse(url) : response;

  //   if (url.includes(instagramURL)) {
  //     instagram.profile(url, res);
  //     return;
  //   }

  //   any.handle(url, res);
}
