import { serve } from 'https://deno.land/std/http/server.ts';
import { process } from './services/http.ts';

const headersNoCors = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const url = new URL(req.url);
  const urlParam = url.searchParams.get('url');

  if (!urlParam) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: headersNoCors,
    });
  }

  try {
    const response = await process(urlParam);

    console.log(response);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: headersNoCors,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch data',
        message: error.message,
        name: error.name,
      }),
      {
        status: 500,
        headers: headersNoCors,
      }
    );
  }
});
