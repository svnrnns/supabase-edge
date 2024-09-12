// Get a Response with all allowed methods methods
export function getOptionsResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Validate incoming request and extract URL parameter
export function getParamFromRequest(
  req: Request,
  param: string
): string | null {
  const url = new URL(req.url);
  const urlParam = url.searchParams.get(param);
  return urlParam;
}

// Create a structured error response
export function createErrorResponse(
  status: number,
  message: string,
  headers: Record<string, string>,
  error: Error | null = null
): Response {
  const errorResponse = {
    error: message,
    ...(error && { name: error.name, message: error.message }),
  };

  return new Response(JSON.stringify(errorResponse), {
    status,
    headers,
  });
}
