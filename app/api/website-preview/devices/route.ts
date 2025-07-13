import { NextResponse } from 'next/server'

// Device configurations
const DEVICES = {
  'iphone-14': { 
    id: 'iphone-14',
    name: 'iPhone 14', 
    width: 390, 
    height: 844, 
    os: 'iOS 16', 
    type: 'Mobile',
    category: 'mobile',
    icon: '📱'
  },
  'iphone-se': { 
    id: 'iphone-se',
    name: 'iPhone SE', 
    width: 375, 
    height: 667, 
    os: 'iOS 16', 
    type: 'Mobile',
    category: 'mobile',
    icon: '📱'
  },
  'samsung-s23': { 
    id: 'samsung-s23',
    name: 'Samsung Galaxy S23', 
    width: 360, 
    height: 780, 
    os: 'Android 13', 
    type: 'Mobile',
    category: 'mobile',
    icon: '📱'
  },
  'pixel-7': { 
    id: 'pixel-7',
    name: 'Google Pixel 7', 
    width: 412, 
    height: 915, 
    os: 'Android 13', 
    type: 'Mobile',
    category: 'mobile',
    icon: '📱'
  },
  'ipad-air': { 
    id: 'ipad-air',
    name: 'iPad Air', 
    width: 820, 
    height: 1180, 
    os: 'iPadOS 16', 
    type: 'Tablet',
    category: 'tablet',
    icon: '📱'
  },
  'ipad-mini': { 
    id: 'ipad-mini',
    name: 'iPad Mini', 
    width: 744, 
    height: 1133, 
    os: 'iPadOS 16', 
    type: 'Tablet',
    category: 'tablet',
    icon: '📱'
  },
  'samsung-tab': { 
    id: 'samsung-tab',
    name: 'Samsung Galaxy Tab', 
    width: 800, 
    height: 1280, 
    os: 'Android 13', 
    type: 'Tablet',
    category: 'tablet',
    icon: '📱'
  },
  'surface-pro': { 
    id: 'surface-pro',
    name: 'Surface Pro', 
    width: 912, 
    height: 1368, 
    os: 'Windows 11', 
    type: 'Tablet',
    category: 'tablet',
    icon: '💻'
  },
  'macbook-air': { 
    id: 'macbook-air',
    name: 'MacBook Air', 
    width: 1440, 
    height: 900, 
    os: 'macOS Ventura', 
    type: 'Laptop',
    category: 'laptop',
    icon: '💻'
  },
  'macbook-pro': { 
    id: 'macbook-pro',
    name: 'MacBook Pro', 
    width: 1512, 
    height: 982, 
    os: 'macOS Ventura', 
    type: 'Laptop',
    category: 'laptop',
    icon: '💻'
  },
  'windows-laptop': { 
    id: 'windows-laptop',
    name: 'Windows Laptop', 
    width: 1366, 
    height: 768, 
    os: 'Windows 11', 
    type: 'Laptop',
    category: 'laptop',
    icon: '💻'
  },
  'desktop-4k': { 
    id: 'desktop-4k',
    name: 'Desktop 4K', 
    width: 1920, 
    height: 1080, 
    os: 'Windows 11', 
    type: 'Desktop',
    category: 'desktop',
    icon: '🖥️'
  }
}

// Browser configurations
const BROWSERS = {
  'chrome': { 
    id: 'chrome',
    name: 'Google Chrome', 
    color: '#4285f4',
    icon: '🌐',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    marketShare: 65.8
  },
  'firefox': { 
    id: 'firefox',
    name: 'Mozilla Firefox', 
    color: '#ff7139',
    icon: '🦊',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    marketShare: 3.2
  },
  'safari': { 
    id: 'safari',
    name: 'Safari', 
    color: '#006cff',
    icon: '🌐',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    marketShare: 18.8
  },
  'edge': { 
    id: 'edge',
    name: 'Microsoft Edge', 
    color: '#0078d4',
    icon: '🌐',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    marketShare: 4.8
  }
}

export async function GET() {
  try {
    // Group devices by category
    const devicesByCategory = {
      mobile: Object.values(DEVICES).filter(device => device.category === 'mobile'),
      tablet: Object.values(DEVICES).filter(device => device.category === 'tablet'),
      laptop: Object.values(DEVICES).filter(device => device.category === 'laptop'),
      desktop: Object.values(DEVICES).filter(device => device.category === 'desktop')
    }

    // Get all browsers
    const browsers = Object.values(BROWSERS)

    return NextResponse.json({
      success: true,
      data: {
        devices: {
          all: Object.values(DEVICES),
          byCategory: devicesByCategory,
          categories: [
            { id: 'mobile', name: 'Mobile', icon: '📱', count: devicesByCategory.mobile.length },
            { id: 'tablet', name: 'Tablet', icon: '📱', count: devicesByCategory.tablet.length },
            { id: 'laptop', name: 'Laptop', icon: '💻', count: devicesByCategory.laptop.length },
            { id: 'desktop', name: 'Desktop', icon: '🖥️', count: devicesByCategory.desktop.length }
          ]
        },
        browsers: {
          all: browsers,
          popular: browsers.sort((a, b) => b.marketShare - a.marketShare).slice(0, 3)
        },
        stats: {
          totalDevices: Object.keys(DEVICES).length,
          totalBrowsers: Object.keys(BROWSERS).length,
          categories: Object.keys(devicesByCategory).length
        }
      }
    })

  } catch (error) {
    console.error('Error fetching devices and browsers:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch devices and browsers',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 