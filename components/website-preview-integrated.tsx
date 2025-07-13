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

interface WebsitePreviewData {
  url: string
  title: string
  description: string
  previewUrl: string
  metadata: {
    title: string
    description: string
    image: string
    favicon: string
  }
}

export function WebsitePreviewIntegrated() {
  const [url, setUrl] = useState('')
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [selectedBrowser, setSelectedBrowser] = useState<Browser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewData, setPreviewData] = useState<WebsitePreviewData | null>(null)
  const [devices, setDevices] = useState<Device[]>([])
  const [browsers, setBrowsers] = useState<Browser[]>([])
  const [activeTab, setActiveTab] = useState('single')

  // Load devices and browsers on component mount
  useEffect(() => {
    const loadDevicesAndBrowsers = async () => {
      try {
        const response = await fetch('/api/website-preview/devices')
        const data = await response.json()
        
        if (data.success) {
          setDevices(data.data.devices.all)
          setBrowsers(data.data.browsers.all)
          
          // Set default selections
          setSelectedDevice(data.data.devices.all[0]) // iPhone 14
          setSelectedBrowser(data.data.browsers.all[0]) // Chrome
        }
      } catch (error) {
        console.error('Failed to load devices and browsers:', error)
        toast.error('Failed to load devices and browsers')
      }
    }

    loadDevicesAndBrowsers()
  }, [])

  const handleGeneratePreview = async () => {
    if (!url.trim()) {
      toast.error('Please enter a website URL')
      return
    }

    if (!selectedDevice || !selectedBrowser) {
      toast.error('Please select a device and browser')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/website-preview?url=${encodeURIComponent(url)}&device=${selectedDevice.id}&browser=${selectedBrowser.id}`)
      const data = await response.json()

      if (data.success) {
        setPreviewData(data.data)
        toast.success('Preview generated successfully!')
      } else {
        toast.error(data.message || 'Failed to generate preview')
      }
    } catch (error) {
      console.error('Preview generation error:', error)
      toast.error('Failed to generate preview')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeviceSelect = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId)
    if (device) {
      setSelectedDevice(device)
    }
  }

  const handleBrowserSelect = (browserId: string) => {
    const browser = browsers.find(b => b.id === browserId)
    if (browser) {
      setSelectedBrowser(browser)
    }
  }

  const getDeviceFrameStyle = (device: Device) => {
    const maxWidth = 400
    const maxHeight = 600
    const scale = Math.min(maxWidth / device.width, maxHeight / device.height, 1)
    
    return {
      width: `${device.width * scale}px`,
      height: `${device.height * scale}px`,
      maxWidth: `${maxWidth}px`,
      maxHeight: `${maxHeight}px`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
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
              See how your website looks and performs across different devices, browsers, and screen sizes. Perfect for responsive design testing and quality assurance.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="xl:col-span-1 space-y-6">
            {/* URL Input */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
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
                  <Label htmlFor="url" className="text-slate-700">Website URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button 
                  onClick={handleGeneratePreview}
                  disabled={isLoading || !url.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  Generate Preview
                </Button>
              </CardContent>
            </Card>

            {/* Device Selection */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
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
              <CardContent>
                <Tabs defaultValue="mobile" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-100">
                    <TabsTrigger value="mobile" className="text-xs">Mobile</TabsTrigger>
                    <TabsTrigger value="tablet" className="text-xs">Tablet</TabsTrigger>
                    <TabsTrigger value="desktop" className="text-xs">Desktop</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                    {devices
                      .filter(device => {
                        if (activeTab === 'mobile') return device.category === 'mobile'
                        if (activeTab === 'tablet') return device.category === 'tablet'
                        if (activeTab === 'desktop') return device.category === 'laptop' || device.category === 'desktop'
                        return true
                      })
                      .map((device) => (
                        <button
                          key={device.id}
                          onClick={() => handleDeviceSelect(device.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                            selectedDevice?.id === device.id
                              ? 'bg-blue-50 border-blue-200 shadow-sm'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{device.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900">{device.name}</div>
                              <div className="text-sm text-slate-500">
                                {device.width} × {device.height} • {device.os}
                              </div>
                            </div>
                            {selectedDevice?.id === device.id && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Browser Selection */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
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
              <CardContent>
                <Select value={selectedBrowser?.id} onValueChange={handleBrowserSelect}>
                  <SelectTrigger className="border-slate-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select a browser" />
                  </SelectTrigger>
                  <SelectContent>
                    {browsers.map((browser) => (
                      <SelectItem key={browser.id} value={browser.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: browser.color }}
                          ></div>
                          {browser.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Preview Area */}
          <div className="xl:col-span-3 space-y-6">
            {!previewData ? (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <div className="p-16">
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
                        <span>{devices.length} Devices</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        <span>{browsers.length} Browsers</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>Real-time Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Website Preview
                      </CardTitle>
                      <CardDescription>
                        {previewData.title} • {selectedDevice?.name} • {selectedBrowser?.name}
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
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedDevice && (
                    <div className="flex justify-center">
                      <div className="relative">
                        {/* Device Frame */}
                        <div 
                          className="relative bg-white shadow-2xl rounded-3xl border-8 border-gray-800"
                          style={getDeviceFrameStyle(selectedDevice)}
                        >
                          {/* Browser Header */}
                          <div 
                            className="absolute top-0 left-0 right-0 h-8 rounded-t-2xl flex items-center justify-between px-3 z-10"
                            style={{ backgroundColor: selectedBrowser?.color || '#4285f4' }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {selectedBrowser?.name}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {selectedDevice.name}
                              </Badge>
                            </div>
                          </div>

                          {/* Website Content */}
                          <div className="relative overflow-hidden" style={{ paddingTop: '32px' }}>
                            <iframe
                              src={previewData.previewUrl}
                              className="w-full h-full border-0"
                              style={{ 
                                minHeight: `${selectedDevice.height - 32}px`,
                                width: '100%'
                              }}
                              sandbox="allow-same-origin allow-scripts"
                            />
                          </div>
                        </div>

                        {/* Device Info */}
                        <div className="mt-4 text-center space-y-2">
                          <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                            <span>{selectedDevice.width} × {selectedDevice.height}</span>
                            <span>•</span>
                            <span>{selectedDevice.os}</span>
                            <span>•</span>
                            <span>{selectedBrowser?.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 