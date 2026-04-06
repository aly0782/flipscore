import { NextRequest, NextResponse } from 'next/server';
import { scrapeIdealista } from '@/lib/scraper';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    console.log(`[API] Received request for URL: ${url}`);

    const data = await scrapeIdealista(url);

    return NextResponse.json(data);

  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: 'Server error. Try again.' },
      { status: 500 }
    );
  }
}