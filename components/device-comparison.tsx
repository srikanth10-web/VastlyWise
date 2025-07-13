'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X, Smartphone, Monitor, Tablet, Laptop } from 'lucide-react'
import { WebsitePreviewFrame } from './website-preview-frame'

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

interface ComparisonDevice {
  id: string
  deviceId: string
  browserId: string
  device: Device
  browser: Browser
}

interface DeviceComparisonProps {
  url: string
  devices: Device[]
  browsers: Browser[]
  onRefresh: () => void
}

export function DeviceComparison({ url, devices, browsers, onRefresh }: DeviceComparisonProps) {
  const [comparisonDevices, setComparisonDevices] = useState<ComparisonDevice[]>([
    {
      id: '1',
      deviceId: 'iphone-14',
      browserId: 'chrome',
      device: devices.find(d => d.id === 'iphone-14')!,
      browser: browsers.find(b => b.id === 'chrome')!
    },
    {
      id: '2',
      deviceId: 'macbook-air',
      browserId: 'safari',
      device: devices.find(d => d.id === 'macbook-air')!,
      browser: browsers.find(b => b.id === 'safari')!
    }
  ])

  const addDevice = () => {
    const newId = (comparisonDevices.length + 1).toString()
    const newDevice: ComparisonDevice = {
      id: newId,
      deviceId: 'iphone-14',
      browserId: 'chrome',
      device: devices.find(d => d.id === 'iphone-14')!,
      browser: browsers.find(b => b.id === 'chrome')!
    }
    setComparisonDevices([...comparisonDevices, newDevice])
  }

  const removeDevice = (id: string) => {
    if (comparisonDevices.length > 1) {
      setComparisonDevices(comparisonDevices.filter(d => d.id !== id))
    }
  }

  const updateDevice = (id: string, deviceId: string, browserId: string) => {
    const device = devices.find(d => d.id === deviceId)!
    const browser = browsers.find(b => b.id === browserId)!
    
    setComparisonDevices(comparisonDevices.map(d => 
      d.id === id 
        ? { ...d, deviceId, browserId, device, browser }
        : d
    ))
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Device Comparison</h2>
          <p className="text-muted-foreground">
            Compare how your website looks across different devices and browsers
          </p>
        </div>
        <Button onClick={addDevice} disabled={comparisonDevices.length >= 4}>
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisonDevices.map((comparisonDevice) => (
          <Card key={comparisonDevice.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getDeviceIcon(comparisonDevice.device.category)}
                  <div>
                    <CardTitle className="text-lg">{comparisonDevice.device.name}</CardTitle>
                    <CardDescription>
                      {comparisonDevice.browser.name} • {comparisonDevice.device.width} × {comparisonDevice.device.height}
                    </CardDescription>
                  </div>
                </div>
                {comparisonDevices.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDevice(comparisonDevice.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Device/Browser Selectors */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Select
                  value={comparisonDevice.deviceId}
                  onValueChange={(deviceId) => updateDevice(comparisonDevice.id, deviceId, comparisonDevice.browserId)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.map((device) => (
                      <SelectItem key={device.id} value={device.id}>
                        <div className="flex items-center gap-2">
                          <span>{device.icon}</span>
                          <span>{device.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={comparisonDevice.browserId}
                  onValueChange={(browserId) => updateDevice(comparisonDevice.id, comparisonDevice.deviceId, browserId)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {browsers.map((browser) => (
                      <SelectItem key={browser.id} value={browser.id}>
                        <div className="flex items-center gap-2">
                          <span>{browser.icon}</span>
                          <span>{browser.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <WebsitePreviewFrame
                url={url}
                device={comparisonDevice.device}
                browser={comparisonDevice.browser}
                onRefresh={onRefresh}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {comparisonDevices.length === 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Monitor className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No Devices Added</h3>
                <p className="text-muted-foreground">
                  Add devices to start comparing website previews
                </p>
              </div>
              <Button onClick={addDevice}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Device
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 