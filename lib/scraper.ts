import axios from 'axios';
import * as cheerio from 'cheerio';
import { resolveParishLocation } from '@/lib/parish-pricing-db';

export interface PropertyData {
  idealista_id: string;
  title: string;
  price: number | null;
  size: number | null;
  year_built: number | null;
  address: string;
  location: string;
  municipality?: string;
  parish?: string;
  photos: string[];
  url: string;
  error?: string;
}

const ZENROWS_API_KEY = process.env.ZENROWS_API_KEY || '';

export async function scrapeIdealista(url: string): Promise<PropertyData> {
  try {
    if (!url.includes('idealista.pt/imovel/')) {
      return {
        idealista_id: '',
        title: '',
        price: null,
        size: null,
        year_built: null,
        address: '',
        location: '',
        photos: [],
        url: url,
        error: 'Invalid Idealista URL. Format: idealista.pt/imovel/12345678/',
      };
    }

    const propertyId = url.split('/imovel/')[1]?.split('/')[0];
    if (!propertyId) {
      return {
        idealista_id: '',
        title: '',
        price: null,
        size: null,
        year_built: null,
        address: '',
        location: '',
        photos: [],
        url: url,
        error: 'Could not extract property ID from URL',
      };
    }

    if (!ZENROWS_API_KEY) {
      return {
        idealista_id: '',
        title: '',
        price: null,
        size: null,
        year_built: null,
        address: '',
        location: '',
        photos: [],
        url: url,
        error: 'ZenRows API key not configured.',
      };
    }

    console.log(`[ZENROWS] Scraping property ${propertyId}...`);

    const params = new URLSearchParams({
      apikey: ZENROWS_API_KEY,
      url: url,
      js_render: 'true',
      premium_proxy: 'true',
    });

    const zenrowsUrl = `https://api.zenrows.com/v1/?${params.toString()}`;

    const response = await axios.get(zenrowsUrl, {
      timeout: 45000,
    });

    const html = response.data;

    if (!html || html.length < 100) {
      return {
        idealista_id: propertyId,
        title: '',
        price: null,
        size: null,
        year_built: null,
        address: '',
        location: '',
        photos: [],
        url: url,
        error: 'ZenRows returned empty HTML.',
      };
    }

    console.log(`[ZENROWS] HTML received (${html.length} bytes), parsing...`);

    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim() || 'Unknown Property';
    
    let price: number | null = null;
    const priceSelectors = ['span[data-testid="price"]', '.property-price', 'span.h2-title', '[class*="price"]'];
    for (const selector of priceSelectors) {
      const priceText = $(selector).first().text().replace(/[^\d.,]/g, '');
      if (priceText) {
        price = parseInt(priceText.replace(/\./g, '').replace(',', '.'));
        if (!isNaN(price)) break;
      }
    }

    let size: number | null = null;
    const sizeSelectors = ['[data-testid="size"]', '.property-size', '[class*="size"]'];
    for (const selector of sizeSelectors) {
      const sizeText = $(selector).first().text().replace(/[^\d]/g, '');
      if (sizeText) {
        size = parseInt(sizeText);
        if (!isNaN(size)) break;
      }
    }

    let year_built: number | null = null;
    const yearSelectors = ['[data-testid="year"]', '.property-year', '[class*="year"]'];
    for (const selector of yearSelectors) {
      const yearText = $(selector).first().text().replace(/[^\d]/g, '');
      if (yearText && yearText.length === 4) {
        year_built = parseInt(yearText);
        if (!isNaN(year_built)) break;
      }
    }

    const address = $('[data-testid="address"]').first().text().trim() || 'Unknown Address';
    
    let location = 'Unknown Location';
    const breadcrumbText = $('nav').text() || $('[class*="breadcrumb"]').text() || '';
    if (breadcrumbText) {
      const parts = breadcrumbText.split(',');
      location = parts[parts.length - 1]?.trim() || 'Unknown Location';
    }

    const resolved = resolveParishLocation(address || location);
    const resolvedLocation = resolved.display;
    const parish = resolved.parish;
    const municipality = resolved.municipality;

    const photos: string[] = [];
    $('img[loading="lazy"], img[data-src], img.property-photo').each((i, el) => {
      if (i >= 5) return;
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && src.includes('ideal')) {
        photos.push(src);
      }
    });

    console.log(`[ZENROWS] ✅ Success: "${title}", €${price}, ${size}m²`);

    return {
      idealista_id: propertyId,
      title,
      price,
      size,
      year_built,
      address,
      location: resolvedLocation,
      municipality,
      parish,
      photos,
      url,
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = (error as { response?: { status?: number } })?.response?.status;
    const errorCode = (error as { code?: string })?.code;
    
    console.error(`[ZENROWS] ❌ Error: ${errorMessage}`);

    if (statusCode === 403) {
      return {
        idealista_id: '',
        title: '',
        price: null,
        size: null,
        year_built: null,
        address: '',
        location: '',
        photos: [],
        url: url,
        error: '❌ ZenRows blocked. Try again later.',
      };
    }

    if (statusCode === 401) {
      return {
        idealista_id: '',
        title: '',
        price: null,
        size: null,
        year_built: null,
        address: '',
        location: '',
        photos: [],
        url: url,
        error: '❌ API key invalid.',
      };
    }

    if (errorCode === 'ECONNABORTED' || errorCode === 'ETIMEDOUT') {
      return {
        idealista_id: '',
        title: '',
        price: null,
        size: null,
        year_built: null,
        address: '',
        location: '',
        photos: [],
        url: url,
        error: '⏱️ Request timed out. Try again.',
      };
    }

    return {
      idealista_id: '',
      title: '',
      price: null,
      size: null,
      year_built: null,
      address: '',
      location: '',
      photos: [],
      url: url,
      error: `Failed: ${errorMessage}`,
    };
  }
}