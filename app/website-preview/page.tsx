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
import { Loader2, Globe, Smartphone, Monitor, Tablet, Laptop, Eye, Download, Share2, RefreshCw, Sparkles, Zap, Layers } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
        <div className="relative container mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Website Preview Tool
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Test Your Website Across Devices
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how your website looks and performs across different devices, browsers, and screen sizes. 
              Perfect for responsive design testing and quality assurance.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-1 space-y-6">
            {/* URL Input Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  Website URL
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Enter the URL of the website you want to preview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm font-medium text-slate-700">Website URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && generatePreview()}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <Button 
                  onClick={generatePreview} 
                  disabled={isLoading || !url.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
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

            {/* Device Selection Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Layers className="h-5 w-5 text-green-600" />
                  </div>
                  Device Selection
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Choose the device to preview your website on
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Tabs */}
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-lg">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id} 
                        className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        {getDeviceIcon(category.id)}
                        <span className="hidden sm:inline text-xs">{category.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                {/* Device List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredDevices.map((device) => (
                    <div
                      key={device.id}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedDevice === device.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                      onClick={() => setSelectedDevice(device.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{device.icon}</span>
                          <div>
                            <p className="font-semibold text-slate-900">{device.name}</p>
                            <p className="text-xs text-slate-500">
                              {device.width} × {device.height} • {device.os}
                            </p>
                          </div>
                        </div>
                        {selectedDevice === device.id && (
                          <Badge className="bg-blue-600 text-white">Selected</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Browser Selection Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  Browser Selection
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Choose the browser to simulate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedBrowser} onValueChange={setSelectedBrowser}>
                  <SelectTrigger className="border-slate-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {browsers.map((browser) => (
                      <SelectItem key={browser.id} value={browser.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{browser.icon}</span>
                          <span>{browser.name}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
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
          <div className="xl:col-span-3 space-y-6">
            {previewData ? (
              <>
                {/* Preview Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <TabsTrigger value="single" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                      Single Preview
                    </TabsTrigger>
                    <TabsTrigger value="comparison" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                      Device Comparison
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="single" className="space-y-6">
                    {/* Preview Header */}
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                              <div className="p-2 bg-green-100 rounded-lg">
                                <Eye className="h-5 w-5 text-green-600" />
                              </div>
                              Website Preview
                            </CardTitle>
                            <CardDescription className="text-slate-600 mt-2">
                              {previewData.url} • {previewData.device.name} • {previewData.browser.name}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Refresh
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                              <Download className="mr-2 h-4 w-4" />
                              Screenshot
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
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
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Globe className="h-5 w-5 text-blue-600" />
                          </div>
                          Website Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-semibold text-slate-700">Title</Label>
                              <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg">
                                {previewData.website.title || 'No title found'}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-slate-700">Status</Label>
                              <Badge 
                                variant={previewData.website.status === 200 ? "default" : "destructive"} 
                                className="mt-1"
                              >
                                {previewData.website.status}
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-slate-700">Description</Label>
                              <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg">
                                {previewData.website.description || 'No description found'}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-semibold text-slate-700">Content Type</Label>
                              <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg">
                                {previewData.website.contentType}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-slate-700">Content Length</Label>
                              <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg">
                                {previewData.website.contentLength}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-slate-700">Load Time</Label>
                              <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg">
                                {previewData.website.loadTime}ms
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="bg-slate-200" />
                        
                        <div>
                          <Label className="text-sm font-semibold text-slate-700">Keywords</Label>
                          <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg">
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
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-16">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <Globe className="h-12 w-12 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">No Preview Generated</h3>
                      <p className="text-slate-600 max-w-md mx-auto">
                        Enter a URL and click "Generate Preview" to see how your website looks across different devices and browsers
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-4 w-4" />
                        <span>12 Devices</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        <span>4 Browsers</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>Real-time Preview</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 