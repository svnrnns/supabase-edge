import { track } from '../fetchers/spotify.ts';
import { profile } from '../fetchers/instagram.ts';

import { failedResponse } from './data.ts';

const spotifyURL = 'open.spotify.com';
const instagramURL = 'instagram.com';

export async function process(url: string) {
  let response = undefined;

  if (url.includes(spotifyURL) && url.includes('/track/')) {
    response = await track(url);
  }

  if (url.includes(instagramURL)) {
    response = await profile(url);
  }

  //   any.handle(url, res);

  return response === undefined ? failedResponse(url) : response;
}
