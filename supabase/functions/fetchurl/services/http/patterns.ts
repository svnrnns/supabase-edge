export const urlPatterns = [
  {
    pattern: 'open.spotify.com',
    handlerKey: 'spotify-track',
    includes: ['track'],
  },
  {
    pattern: 'open.spotify.com',
    handlerKey: 'spotify-album',
    includes: ['album'],
  },
  {
    pattern: 'instagram.com',
    handlerKey: 'instagram-profile',
    includes: [],
  },
];
