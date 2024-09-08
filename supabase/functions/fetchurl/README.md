# Supabase Edge Function: `fetchurl`

## Overview

The `fetchurl` Supabase Edge Function is a web scraping service that processes URLs to fetch and return structured data in JSON format. It handles various types of URLs by scraping relevant metadata and custom information. This service is designed to mimic an API, providing a consistent response format for different types of content.

## Features

- Allows for custom data extraction from URLs through configurable extractors.
- Includes default metadata such as page title, description, image, favicon, and touch icon in the response.
- Is scalable

## Setup

1. **Clone the Repository**: Clone the repository to your local environment.

```bash
git clone https://github.com/svnrnns/supabase-edge.git
```

2. **Install Dependencies (optional)**: Ensure you have the necessary dependencies installed.

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh

# or

brew install deno
```

3. **Run**: This project can be run through Supabase CLI or executing a local deno server.
```bash
# with supabase
supabase functions serve

# with deno server
deno run --allow-net server.ts
```

## Code Structure

### Entry point `index.ts`

The entry point for the Edge Function is index.ts, which handles incoming HTTP requests and routes them to the appropriate processing functions.

- **CORS Handling:** Manages preflight requests for CORS.
- **URL Validation:** Validates incoming requests to ensure the url parameter is present.
- **Processing:** Delegates URL processing to the `processUrl` function from `services/http.ts`.

### Services: `services/http.ts`

The `http.ts` file defines the logic for processing different types of URLs.

- **URL Patterns:** Defines patterns for different services (e.g., Spotify, Instagram).
- **Handler Selection:** Uses the `getHandler` function to select the appropriate handler based on the URL pattern.

### Fetchers

`fetchers/spotify.ts`
Handles Spotify URL scraping. Extract metadata such as album, release date, duration, and artists.

`fetchers/instagram.ts`
Handles Instagram URL scraping. Extracts data such as avatar, username, account name, and follower counts.

`fetchers/any.ts`
A generic fetcher for handling URLs that do not match specific patterns. Extracts default metadata like title, description, image, favicon, and touch icon.

### Utilities: `utils/httpProcessing.ts`

Provides utility functions for:

- **HTML Retrieval:** Fetching and returning the HTML content of a URL.
- **Metadata Extraction:** Extracting metadata from HTML using cheerio.
- **Data Template Generation:** Creating a template for API responses.

### Utilities: `utils/fetchersUtils.ts`

Contains the `fetchPageData` function, which performs the following tasks:

- **General Metadata Extraction:** Extracts default metadata for the URL.
- **Custom Data Extraction:** Applies a custom extractor if provided.

### Utilities: `utils/fns.ts`

Stores general utility functions.

## Usage

### Encoding the URL

The way we pass URL to the function is by search params like `?url=[someurl.]` <br/>

The `url` search param must be enconded in the request URL. Here's an example of what encoding is.

```js
const nativeURL =
  'https://open.spotify.com/track/7GJVqqE79WOl8ncT7Y4z0L?si=6e9bd59704a4473a';
const encodedURL =
  'https%3A%2F%2Fopen.spotify.com%2Ftrack%2F7GJVqqE79WOl8ncT7Y4z0L';
```

This can be done through the JavaScript function `encodeURIComponent()`:

```js
const encodedUrl = encodeURIComponent(url);
```

### Make the Request

Send HTTP requests to the function with the url parameter in local server.

```bash
curl "https://your-local-server/functions/v1/fetchurl?url=https%3A%2F%2Fwww.instagram.com%2Flolaindigo"
```

Example Response:

```json
{
  "requested_url": "https://www.instagram.com/lolaindigo",
  "status": "COMPLETED",
  "data": {
    "url": {
      "title": "Lola Indigo (@lolaindigo) • Instagram profile",
      "description": "2M Followers, 1,143 Following, 118 Posts - Lola Indigo (@lolaindigo) on Instagram: \"NAVE DRAGÓN 2024 ▴ BERNABEU 2025\"",
      "image": "https://scontent-mad1-1.cdninstagram.com/v/t51.2885-19/436446227_457212393315651_1185179459308503484_n.jpg",
      "favicon": "https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png",
      "touch_icon": "https://static.cdninstagram.com/rsrc.php/v3/yR/r/lam-fZmwmvn.png",
      "s2_favicon": "https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.instagram.com/lolaindigo"
    },
    "avatar": "https://scontent-mad1-1.cdninstagram.com/v/t51.2885-19/436446227_457212393315651_1185179459308503484_n.jpg",
    "username": "lolaindigo",
    "name": "Lola Indigo",
    "followers": 2000000,
    "following": 1143,
    "posts": 118
  }
}
```
