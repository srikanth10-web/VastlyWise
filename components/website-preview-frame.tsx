'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw, ExternalLink, Maximize2, Minimize2 } from 'lucide-react'

interface WebsitePreviewFrameProps {
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
  onRefresh?: () => void
}

export function WebsitePreviewFrame({ 
  url, 
  device, 
  browser, 
  onRefresh 
}: WebsitePreviewFrameProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setHasError(false)
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
    onRefresh?.()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const openInNewTab = () => {
    window.open(url, '_blank')
  }

  // Calculate frame dimensions
  const getFrameDimensions = () => {
    const maxWidth = isFullscreen ? '100vw' : '100%'
    const maxHeight = isFullscreen ? '100vh' : '70vh'
    
    if (isFullscreen) {
      return {
        width: '100%',
        height: '100%',
        maxWidth,
        maxHeight
      }
    }

    // Scale down the device dimensions for better fit
    const scale = Math.min(400 / device.width, 600 / device.height, 1)
    const scaledWidth = device.width * scale
    const scaledHeight = device.height * scale

    return {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
      maxWidth,
      maxHeight
    }
  }

  const frameStyle = getFrameDimensions()

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
      <CardContent className={`p-6 ${isFullscreen ? 'h-full' : ''}`}>
        <div className="flex justify-center">
          <div className="relative">
            {/* Device Frame */}
            <div 
              className="relative bg-white shadow-2xl rounded-3xl border-8 border-gray-800"
              style={{
                width: frameStyle.width,
                height: frameStyle.height,
                maxWidth: frameStyle.maxWidth,
                maxHeight: frameStyle.maxHeight
              }}
            >
              {/* Browser Header */}
              <div 
                className="absolute top-0 left-0 right-0 h-8 bg-gray-800 rounded-t-2xl flex items-center justify-between px-3 z-10"
                style={{ backgroundColor: browser.color }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {browser.name}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {device.name}
                  </Badge>
                </div>
              </div>

              {/* Iframe Container */}
              <div 
                className="absolute inset-0 pt-8 rounded-2xl overflow-hidden"
                style={{
                  width: frameStyle.width,
                  height: frameStyle.height
                }}
              >
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
                    <div className="text-center space-y-2">
                      <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" />
                      <p className="text-sm text-gray-500">Loading website...</p>
                    </div>
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 bg-red-50 flex items-center justify-center z-20">
                    <div className="text-center space-y-2">
                      <div className="w-8 h-8 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-500 text-sm">!</span>
                      </div>
                      <p className="text-sm text-red-600">Failed to load website</p>
                      <Button size="sm" onClick={handleRefresh}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}

                <iframe
                  id="preview-iframe"
                  src={url}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  title={`Preview of ${url} on ${device.name}`}
                />
              </div>
            </div>

            {/* Device Info */}
            {!isFullscreen && (
              <div className="mt-4 text-center space-y-2">
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>{device.width} × {device.height}</span>
                  <span>•</span>
                  <span>{device.os}</span>
                  <span>•</span>
                  <span>{browser.name}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={openInNewTab}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open
                  </Button>
                  <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="mr-2 h-4 w-4" />
                        Exit Fullscreen
                      </>
                    ) : (
                      <>
                        <Maximize2 className="mr-2 h-4 w-4" />
                        Fullscreen
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fullscreen Exit Button */}
        {isFullscreen && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-50"
          >
            <Minimize2 className="mr-2 h-4 w-4" />
            Exit Fullscreen
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 