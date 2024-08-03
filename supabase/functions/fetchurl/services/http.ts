import { track } from '../fetchers/spotify.ts';
import { profile } from '../fetchers/instagram.ts';
import { handle } from '../fetchers/any.ts';

import { failedResponse } from './data.ts';

const spotifyURL = 'open.spotify.com';
const instagramURL = 'instagram.com';

function buildResponse(response: any, url: string): Object {
  return response === undefined ? failedResponse(url) : response;
}

export async function process(url: string) {
  let response = undefined;

  if (url.includes(spotifyURL) && url.includes('/track/')) {
    response = await track(url);
    return buildResponse(response, url);
  }

  if (url.includes(instagramURL)) {
    response = await profile(url);
    return buildResponse(response, url);
  }

  return buildResponse(handle(url), url);
}
