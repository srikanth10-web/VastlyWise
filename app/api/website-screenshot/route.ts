import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for screenshot request
const ScreenshotSchema = z.object({
  url: z.string().url('Invalid URL format'),
  device: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  browser: z.string().optional(),
  format: z.enum(['png', 'jpg', 'webp']).optional().default('png'),
  quality: z.number().min(1).max(100).optional().default(80),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const device = searchParams.get('device')
    const width = searchParams.get('width')
    const height = searchParams.get('height')
    const browser = searchParams.get('browser')
    const format = searchParams.get('format') as 'png' | 'jpg' | 'webp' || 'png'
    const quality = searchParams.get('quality') ? parseInt(searchParams.get('quality')!) : 80

    if (!url) {
      return NextResponse.json({
        success: false,
        error: 'URL parameter is required'
      }, { status: 400 })
    }

    // Validate parameters
    const validatedData = ScreenshotSchema.parse({
      url,
      device,
      width,
      height,
      browser,
      format,
      quality
    })

    // Generate screenshot data (simulated for now)
    const screenshotData = await generateScreenshot(validatedData)

    return NextResponse.json({
      success: true,
      data: screenshotData
    })

  } catch (error) {
    console.error('Screenshot generation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid parameters',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to generate screenshot',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ScreenshotSchema.parse(body)

    // Generate screenshot data
    const screenshotData = await generateScreenshot(validatedData)

    return NextResponse.json({
      success: true,
      data: screenshotData
    })

  } catch (error) {
    console.error('Screenshot generation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to generate screenshot',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function generateScreenshot(params: z.infer<typeof ScreenshotSchema>) {
  const { url, device, width, height, browser, format, quality } = params

  // In a real implementation, you would use a service like:
  // - Puppeteer (headless Chrome)
  // - Playwright
  // - Browserless.io
  // - Screenshotapi.net
  // - Cloudinary
  // - AWS Lambda with Chrome

  // For now, we'll simulate the screenshot generation
  const screenshotUrl = await simulateScreenshot(url, {
    width: width ? parseInt(width) : 1920,
    height: height ? parseInt(height) : 1080,
    device,
    browser,
    format,
    quality
  })

  return {
    url: screenshotUrl,
    metadata: {
      originalUrl: url,
      device: device || 'Desktop',
      width: width ? parseInt(width) : 1920,
      height: height ? parseInt(height) : 1080,
      browser: browser || 'Chrome',
      format,
      quality,
      generatedAt: new Date().toISOString(),
      fileSize: Math.floor(Math.random() * 500000) + 100000, // Simulated file size
      loadTime: Math.floor(Math.random() * 3000) + 500 // Simulated load time
    }
  }
}

async function simulateScreenshot(url: string, options: {
  width: number
  height: number
  device?: string
  browser?: string
  format: string
  quality: number
}) {
  // This is a simulation - in a real implementation, you would:
  // 1. Use Puppeteer or similar to render the page
  // 2. Set the viewport to the specified dimensions
  // 3. Wait for the page to load
  // 4. Take a screenshot
  // 5. Return the image data or upload to a service

  // For now, we'll return a placeholder URL
  const params = new URLSearchParams({
    url,
    width: options.width.toString(),
    height: options.height.toString(),
    device: options.device || 'desktop',
    browser: options.browser || 'chrome',
    format: options.format,
    quality: options.quality.toString()
  })

  // Return a placeholder image URL
  return `https://via.placeholder.com/${options.width}x${options.height}/4F46E5/FFFFFF?text=Website+Preview+(${options.device || 'Desktop'})`
}

// Helper function to get device viewport dimensions
function getDeviceViewport(deviceName?: string) {
  const devices = {
    'iPhone 14': { width: 390, height: 844 },
    'iPhone SE': { width: 375, height: 667 },
    'Samsung Galaxy S23': { width: 360, height: 780 },
    'Google Pixel 7': { width: 412, height: 915 },
    'iPad Air': { width: 820, height: 1180 },
    'iPad Mini': { width: 744, height: 1133 },
    'Samsung Galaxy Tab': { width: 800, height: 1280 },
    'Surface Pro': { width: 912, height: 1368 },
    'MacBook Air': { width: 1440, height: 900 },
    'MacBook Pro': { width: 1512, height: 982 },
    'Windows Laptop': { width: 1366, height: 768 },
    'Desktop 4K': { width: 1920, height: 1080 }
  }

  return devices[deviceName as keyof typeof devices] || devices['Desktop 4K']
} 