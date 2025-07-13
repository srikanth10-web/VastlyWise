import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for the request
const WebsitePreviewSchema = z.object({
  url: z.string().url('Invalid URL format'),
  device: z.string().optional(),
  browser: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

// Device configurations
const DEVICES = {
  'iphone-14': { name: 'iPhone 14', width: 390, height: 844, os: 'iOS 16', type: 'Mobile' },
  'iphone-se': { name: 'iPhone SE', width: 375, height: 667, os: 'iOS 16', type: 'Mobile' },
  'samsung-s23': { name: 'Samsung Galaxy S23', width: 360, height: 780, os: 'Android 13', type: 'Mobile' },
  'pixel-7': { name: 'Google Pixel 7', width: 412, height: 915, os: 'Android 13', type: 'Mobile' },
  'ipad-air': { name: 'iPad Air', width: 820, height: 1180, os: 'iPadOS 16', type: 'Tablet' },
  'ipad-mini': { name: 'iPad Mini', width: 744, height: 1133, os: 'iPadOS 16', type: 'Tablet' },
  'samsung-tab': { name: 'Samsung Galaxy Tab', width: 800, height: 1280, os: 'Android 13', type: 'Tablet' },
  'surface-pro': { name: 'Surface Pro', width: 912, height: 1368, os: 'Windows 11', type: 'Tablet' },
  'macbook-air': { name: 'MacBook Air', width: 1440, height: 900, os: 'macOS Ventura', type: 'Laptop' },
  'macbook-pro': { name: 'MacBook Pro', width: 1512, height: 982, os: 'macOS Ventura', type: 'Laptop' },
  'windows-laptop': { name: 'Windows Laptop', width: 1366, height: 768, os: 'Windows 11', type: 'Laptop' },
  'desktop-4k': { name: 'Desktop 4K', width: 1920, height: 1080, os: 'Windows 11', type: 'Desktop' }
}

// Browser configurations
const BROWSERS = {
  'chrome': { name: 'Google Chrome', color: '#4285f4', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  'firefox': { name: 'Mozilla Firefox', color: '#ff7139', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0' },
  'safari': { name: 'Safari', color: '#006cff', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15' },
  'edge': { name: 'Microsoft Edge', color: '#0078d4', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0' }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = WebsitePreviewSchema.parse(body)

    const { url, device = 'desktop-4k', browser = 'chrome' } = validatedData

    // Get device and browser configurations
    const deviceConfig = DEVICES[device as keyof typeof DEVICES] || DEVICES['desktop-4k']
    const browserConfig = BROWSERS[browser as keyof typeof BROWSERS] || BROWSERS['chrome']

    // Fetch website metadata
    const websiteData = await fetchWebsiteMetadata(url, browserConfig.userAgent)

    // Generate preview data
    const previewData = {
      success: true,
      data: {
        url,
        device: deviceConfig,
        browser: browserConfig,
        website: websiteData,
        previewUrl: generatePreviewUrl(url, deviceConfig, browserConfig),
        timestamp: new Date().toISOString()
      }
    }

    return NextResponse.json(previewData)

  } catch (error) {
    console.error('Website preview error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to generate website preview',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const device = searchParams.get('device') || 'desktop-4k'
    const browser = searchParams.get('browser') || 'chrome'

    if (!url) {
      return NextResponse.json({
        success: false,
        error: 'URL parameter is required'
      }, { status: 400 })
    }

    // Validate URL
    const validatedData = WebsitePreviewSchema.parse({ url, device, browser })

    // Get device and browser configurations
    const deviceConfig = DEVICES[device as keyof typeof DEVICES] || DEVICES['desktop-4k']
    const browserConfig = BROWSERS[browser as keyof typeof BROWSERS] || BROWSERS['chrome']

    // Fetch website metadata
    const websiteData = await fetchWebsiteMetadata(url, browserConfig.userAgent)

    // Generate preview data
    const previewData = {
      success: true,
      data: {
        url,
        device: deviceConfig,
        browser: browserConfig,
        website: websiteData,
        previewUrl: generatePreviewUrl(url, deviceConfig, browserConfig),
        timestamp: new Date().toISOString()
      }
    }

    return NextResponse.json(previewData)

  } catch (error) {
    console.error('Website preview error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid URL format',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to generate website preview',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function fetchWebsiteMetadata(url: string, userAgent: string) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const metadata = extractMetadata(html, url)

    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      ogImage: metadata.ogImage,
      favicon: metadata.favicon,
      status: response.status,
      contentType: response.headers.get('content-type'),
      contentLength: response.headers.get('content-length'),
      lastModified: response.headers.get('last-modified'),
      server: response.headers.get('server'),
      loadTime: Date.now() // This would be more accurate with actual timing
    }

  } catch (error) {
    console.error('Error fetching website:', error)
    
    return {
      title: 'Error loading website',
      description: 'Failed to load website metadata',
      keywords: '',
      ogImage: '',
      favicon: '',
      status: 0,
      contentType: '',
      contentLength: '',
      lastModified: '',
      server: '',
      loadTime: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

function extractMetadata(html: string, baseUrl: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i)
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
  const faviconMatch = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i)

  return {
    title: titleMatch ? titleMatch[1].trim() : 'No title found',
    description: descriptionMatch ? descriptionMatch[1].trim() : 'No description found',
    keywords: keywordsMatch ? keywordsMatch[1].trim() : '',
    ogImage: ogImageMatch ? new URL(ogImageMatch[1], baseUrl).href : '',
    favicon: faviconMatch ? new URL(faviconMatch[1], baseUrl).href : ''
  }
}

function generatePreviewUrl(url: string, device: any, browser: any) {
  // Return the original URL since we're using iframe preview, not screenshot service
  // In a real implementation with screenshot service, this would generate a screenshot URL
  return url
} 