'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Loader2, Globe, Smartphone, Monitor, Tablet, Laptop, Eye, Download, Share2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { WebsitePreviewFrame } from '@/components/website-preview-frame'
import { DeviceComparison } from '@/components/device-comparison'
import { ScreenshotTool } from '@/components/screenshot-tool'

interface Device {
  id: string
  name: string
  width: number
  height: number
  os: string
  type: string
  category: string
  icon: string
}

interface Browser {
  id: string
  name: string
  color: string
  icon: string
  userAgent: string
  marketShare: number
}

interface WebsiteData {
  title: string
  description: string
  keywords: string
  ogImage: string
  favicon: string
  status: number
  contentType: string
  contentLength: string
  lastModified: string
  server: string | null
  loadTime: number
}

interface PreviewData {
  url: string
  device: {
    name: string
    width: number
    height: number
    os: string
    type: string
  }
  browser: {
    name: string
    color: string
    userAgent: string
  }
  website: WebsiteData
  previewUrl: string
  timestamp: string
}

export default function WebsitePreviewPage() {
  const [url, setUrl] = useState('')
  const [selectedDevice, setSelectedDevice] = useState('iphone-14')
  const [selectedBrowser, setSelectedBrowser] = useState('chrome')
  const [devices, setDevices] = useState<Device[]>([])
  const [browsers, setBrowsers] = useState<Browser[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string; icon: string; count: number }[]>([])
  const [previewData, setPreviewData] = useState<PreviewData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('mobile')
  const [activeTab, setActiveTab] = useState('single')

  // Fetch devices and browsers on component mount
  useEffect(() => {
    fetchDevicesAndBrowsers()
    
    // Handle URL parameters
    const params = new URLSearchParams(window.location.search)
    const urlParam = params.get('url')
    const deviceParam = params.get('device')
    const browserParam = params.get('browser')
    
    if (urlParam) setUrl(urlParam)
    if (deviceParam) setSelectedDevice(deviceParam)
    if (browserParam) setSelectedBrowser(browserParam)
  }, [])

  const fetchDevicesAndBrowsers = async () => {
    try {
      const response = await fetch('/api/website-preview/devices')
      const data = await response.json()
      
      if (data.success) {
        setDevices(data.data.devices.all)
        setBrowsers(data.data.browsers.all)
        setCategories(data.data.devices.categories)
      }
    } catch (error) {
      console.error('Error fetching devices:', error)
      toast.error('Failed to load devices and browsers')
    }
  }

  const generatePreview = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/website-preview?url=${encodeURIComponent(url)}&device=${selectedDevice}&browser=${selectedBrowser}`
      )
      const data = await response.json()
      
      if (data.success) {
        setPreviewData(data.data)
        toast.success('Preview generated successfully!')
      } else {
        toast.error('Failed to generate preview')
      }
    } catch (error) {
      console.error('Error generating preview:', error)
      toast.error('Failed to generate preview')
    } finally {
      setIsLoading(false)
    }
  }

  const getDeviceIcon = (category: string) => {
    switch (category) {
      case 'mobile': return <Smartphone className="h-4 w-4" />
      case 'tablet': return <Tablet className="h-4 w-4" />
      case 'laptop': return <Laptop className="h-4 w-4" />
      case 'desktop': return <Monitor className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const filteredDevices = devices.filter(device => device.category === activeCategory)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Website Preview Tool</h1>
        <p className="text-muted-foreground">
          Test how your website looks across different devices and browsers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Website URL
              </CardTitle>
              <CardDescription>
                Enter the URL of the website you want to preview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generatePreview()}
                />
              </div>
              
              <Button 
                onClick={generatePreview} 
                disabled={isLoading || !url.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Preview...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Generate Preview
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Device Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Device Selection</CardTitle>
              <CardDescription>
                Choose the device to preview your website on
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category Tabs */}
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-4">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                      {getDeviceIcon(category.id)}
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Device List */}
              <div className="space-y-2">
                {filteredDevices.map((device) => (
                  <div
                    key={device.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDevice === device.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedDevice(device.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{device.icon}</span>
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {device.width} × {device.height} • {device.os}
                          </p>
                        </div>
                      </div>
                      {selectedDevice === device.id && (
                        <Badge variant="secondary">Selected</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Browser Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Browser Selection</CardTitle>
              <CardDescription>
                Choose the browser to simulate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedBrowser} onValueChange={setSelectedBrowser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {browsers.map((browser) => (
                    <SelectItem key={browser.id} value={browser.id}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{browser.icon}</span>
                        <span>{browser.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {browser.marketShare}%
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

                {/* Preview Panel */}
        <div className="lg:col-span-2 space-y-6">
          {previewData ? (
            <>
              {/* Preview Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single">Single Preview</TabsTrigger>
                  <TabsTrigger value="comparison">Device Comparison</TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-6">
                  {/* Preview Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Website Preview
                          </CardTitle>
                          <CardDescription>
                            {previewData.url} • {previewData.device.name} • {previewData.browser.name}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Screenshot
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Device Frame */}
                  <WebsitePreviewFrame
                    url={previewData.url}
                    device={previewData.device}
                    browser={previewData.browser}
                    onRefresh={generatePreview}
                  />

                  {/* Website Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Website Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Title</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {previewData.website.title || 'No title found'}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Status</Label>
                          <Badge variant={previewData.website.status === 200 ? "default" : "destructive"} className="mt-1">
                            {previewData.website.status}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Description</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {previewData.website.description || 'No description found'}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Content Type</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {previewData.website.contentType}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Content Length</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {previewData.website.contentLength}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Load Time</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {previewData.website.loadTime}ms
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-sm font-medium">Keywords</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {previewData.website.keywords || 'No keywords found'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Screenshot Tool */}
                  <ScreenshotTool
                    url={previewData.url}
                    device={previewData.device}
                    browser={previewData.browser}
                  />
                </TabsContent>

                <TabsContent value="comparison">
                  <DeviceComparison
                    url={previewData.url}
                    devices={devices}
                    browsers={browsers}
                    onRefresh={generatePreview}
                  />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card>
              <CardContent className="p-12">
                <div className="text-center space-y-4">
                  <Globe className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">No Preview Generated</h3>
                    <p className="text-muted-foreground">
                      Enter a URL and click "Generate Preview" to see how your website looks
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 