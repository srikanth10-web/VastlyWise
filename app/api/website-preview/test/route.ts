import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Website Preview API is working!',
      timestamp: new Date().toISOString(),
      endpoints: {
        preview: '/api/website-preview',
        screenshot: '/api/website-screenshot',
        devices: '/api/website-preview/devices',
        test: '/api/website-preview/test'
      },
      features: [
        'Website metadata extraction',
        'Device-specific previews',
        'Browser simulation',
        'Screenshot generation',
        'Multiple device categories',
        'Real-time preview updates'
      ]
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Test endpoint failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      success: true,
      message: 'Test POST request received',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Test POST failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 