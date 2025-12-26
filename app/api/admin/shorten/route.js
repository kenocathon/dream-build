import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const bitlyToken = process.env.BITLY_ACCESS_TOKEN;

    if (!bitlyToken) {
      // If no Bitly token, return a simple shortened version using TinyURL as fallback
      try {
        const tinyRes = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        if (tinyRes.ok) {
          const shortUrl = await tinyRes.text();
          return NextResponse.json({ shortUrl });
        }
      } catch {
        // TinyURL failed, return original URL
        return NextResponse.json({ shortUrl: url });
      }
    }

    // Use Bitly API
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bitlyToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: url,
        domain: 'bit.ly',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Bitly API error');
    }

    const data = await response.json();
    return NextResponse.json({ shortUrl: data.link });

  } catch (error) {
    console.error('Shorten error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to shorten URL' },
      { status: 500 }
    );
  }
}
