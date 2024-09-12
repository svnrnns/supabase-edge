import { ProcessedResponse } from '../utils/types.ts';
import { urlPatterns } from './http/patterns.ts';
import { urlHandlers } from './http/handlers.ts';

export function failedResponse(url: string): ProcessedResponse {
  return {
    status: 'FAILED',
    requested_url: url,
    data: {},
  };
}

// Get the appropriate handler based on the URL
function getHandler(url: string): (url: string) => Promise<ProcessedResponse> {
  for (const { pattern, handlerKey, includes } of urlPatterns) {
    if (url.includes(pattern)) {
      if (includes.every((include) => url.includes(include))) {
        return urlHandlers[handlerKey];
      }
    }
  }
  return urlHandlers['default'];
}

// Build a uniform response
function buildResponse(response: ProcessedResponse, url: string): Object {
  return response === undefined ? failedResponse(url) : response;
}

// Main process function to handle requests
export async function processUrl(url: string): Promise<any> {
  const handler = getHandler(url);
  try {
    const response = await handler(url);
    return buildResponse(response, url);
  } catch (error) {
    return failedResponse(url);
  }
}
