import { track } from '../fetchers/spotify.ts';
import { profile } from '../fetchers/instagram.ts';
import { handle } from '../fetchers/any.ts';
import { ProcessedResponse } from '../utils/types.ts';

export function failedResponse(url: string): ProcessedResponse {
  return {
    status: 'FAILED',
    requested_url: url,
    data: {},
  };
}

// Define URL patterns
const urlHandlers: Record<string, (url: string) => Promise<any>> = {
  spotify: (url) => track(url),
  instagram: (url) => profile(url),
  default: (url) => handle(url),
};

// Define URL conditions for matching
const urlPatterns = [
  {
    pattern: 'open.spotify.com',
    handlerKey: 'spotify',
    includes: ['track'],
  },
  { pattern: 'instagram.com', handlerKey: 'instagram', includes: [] },
];

// Get the appropriate handler based on the URL
function getHandler(url: string): (url: string) => Promise<any> {
  for (const { pattern, handlerKey, includes } of urlPatterns) {
    if (url.includes(pattern)) {
      // Check if additional includes are required
      if (includes.every((include) => url.includes(include))) {
        return urlHandlers[handlerKey];
      }
    }
  }
  return urlHandlers['default'];
}

// Build a uniform response
function buildResponse(response: any, url: string): Object {
  return response === undefined ? failedResponse(url) : response;
}

// Main process function to handle requests
export async function processUrl(url: string): Promise<Object> {
  const handler = getHandler(url);
  try {
    const response = await handler(url);
    return buildResponse(response, url);
  } catch (error) {
    return failedResponse(url);
  }
}
