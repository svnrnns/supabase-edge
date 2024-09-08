import { processAnyUrl } from '../../fetchers/any.ts';
import { processSpotifyTrack } from '../../fetchers/spotify/spotify-track.ts';
import { processInstagramProfile } from '../../fetchers/instagram/instagram-profile.ts';
import { ProcessedResponse } from '../../utils/types.ts';
import { processSpotifyAlbum } from '../../fetchers/spotify/spotify-album.ts';

export const urlHandlers: Record<
  string,
  (url: string) => Promise<ProcessedResponse>
> = {
  'spotify-track': (url) => processSpotifyTrack(url),
  'spotify-album': (url) => processSpotifyAlbum(url),
  'instagram-profile': (url) => processInstagramProfile(url),
  default: (url) => processAnyUrl(url),
};
