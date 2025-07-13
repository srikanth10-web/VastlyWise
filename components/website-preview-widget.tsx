'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Globe, Eye, Smartphone, Monitor, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function WebsitePreviewWidget() {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleQuickPreview = () => {
    if (url.trim()) {
      router.push(`/website-preview?url=${encodeURIComponent(url)}`)
    }
  }

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickPreview()
    }
  }

  const popularDevices = [
    { name: 'iPhone 14', icon: '📱', category: 'Mobile' },
    { name: 'iPad Air', icon: '📱', category: 'Tablet' },
    { name: 'MacBook Air', icon: '💻', category: 'Laptop' },
    { name: 'Desktop 4K', icon: '🖥️', category: 'Desktop' },
  ]

  const popularBrowsers = [
    { name: 'Chrome', color: '#4285f4', share: '65.8%' },
    { name: 'Safari', color: '#006cff', share: '18.8%' },
    { name: 'Edge', color: '#0078d4', share: '4.8%' },
    { name: 'Firefox', color: '#ff7139', share: '3.2%' },
  ]

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Website Preview Tool
        </CardTitle>
        <CardDescription>
          Test how your website looks across different devices and browsers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Preview Input */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleEnterKey}
              className="flex-1"
            />
            <Button onClick={handleQuickPreview} disabled={!url.trim()}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => router.push('/website-preview')}
            className="w-full"
          >
            Open Full Tool
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Popular Devices */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Popular Devices</h4>
          <div className="grid grid-cols-2 gap-2">
            {popularDevices.map((device) => (
              <div
                key={device.name}
                className="flex items-center gap-2 p-2 rounded-lg border bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                onClick={() => router.push(`/website-preview?device=${device.name.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <span className="text-lg">{device.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Browsers */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Popular Browsers</h4>
          <div className="flex flex-wrap gap-2">
            {popularBrowsers.map((browser) => (
              <Badge
                key={browser.name}
                variant="outline"
                className="cursor-pointer hover:bg-muted transition-colors"
                style={{ borderColor: browser.color }}
                onClick={() => router.push(`/website-preview?browser=${browser.name.toLowerCase()}`)}
              >
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: browser.color }}
                />
                {browser.name}
                <span className="ml-1 text-xs text-muted-foreground">
                  {browser.share}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Devices</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-xs text-muted-foreground">Browsers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-xs text-muted-foreground">URLs</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 