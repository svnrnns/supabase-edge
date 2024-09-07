// @ts-ignore
import { serve } from 'https://deno.land/std/http/server.ts';
import { processUrl } from './services/http.ts';
import {
  getOptionsResponse,
  getParamFromRequest,
  createErrorResponse,
} from './utils/httpHelpers.ts';

const headersNoCors = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

serve(async (req: any) => {
  if (req.method === 'OPTIONS') {
    return getOptionsResponse();
  }

  // Validate request and extract parameters
  const urlParam = getParamFromRequest(req, 'url');
  if (!urlParam) {
    return createErrorResponse(400, 'Missing url parameter', headersNoCors);
  }

  try {
    const response = await processUrl(urlParam);
    console.log(response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: headersNoCors,
    });
  } catch (error) {
    return createErrorResponse(
      500,
      'Failed to fetch data',
      headersNoCors,
      error
    );
  }
});
