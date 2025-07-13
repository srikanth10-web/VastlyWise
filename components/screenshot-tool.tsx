'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Camera, Download, Share2, Copy, Mail, Twitter, Facebook, Linkedin, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ScreenshotToolProps {
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
}

export function ScreenshotTool({ url, device, browser }: ScreenshotToolProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [shareUrl, setShareUrl] = useState('')
  const [sharePlatform, setSharePlatform] = useState('twitter')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const captureScreenshot = async () => {
    setIsCapturing(true)
    try {
      // Simulate screenshot capture (in a real app, this would use a headless browser)
      const response = await fetch('/api/website-screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          device: device.name,
          width: device.width,
          height: device.height,
          browser: browser.name
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setScreenshotUrl(url)
        toast.success('Screenshot captured successfully!')
      } else {
        throw new Error('Failed to capture screenshot')
      }
    } catch (error) {
      console.error('Error capturing screenshot:', error)
      toast.error('Failed to capture screenshot')
    } finally {
      setIsCapturing(false)
    }
  }

  const downloadScreenshot = () => {
    if (screenshotUrl) {
      const link = document.createElement('a')
      link.href = screenshotUrl
      link.download = `screenshot-${device.name}-${browser.name}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Screenshot downloaded!')
    }
  }

  const copyToClipboard = async () => {
    if (screenshotUrl) {
      try {
        const response = await fetch(screenshotUrl)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ])
        toast.success('Screenshot copied to clipboard!')
      } catch (error) {
        console.error('Error copying to clipboard:', error)
        toast.error('Failed to copy to clipboard')
      }
    }
  }

  const shareScreenshot = () => {
    const shareData = {
      title: `Website Preview - ${device.name}`,
      text: `Check out how ${url} looks on ${device.name} with ${browser.name}`,
      url: shareUrl || url
    }

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('Shared successfully!'))
        .catch((error) => {
          console.error('Error sharing:', error)
          toast.error('Failed to share')
        })
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
        email: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}`
      }

      const link = shareLinks[sharePlatform as keyof typeof shareLinks]
      if (link) {
        window.open(link, '_blank')
        toast.success('Opened share dialog!')
      }
    }
  }

  const getShareIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="h-4 w-4" />
      case 'facebook': return <Facebook className="h-4 w-4" />
      case 'linkedin': return <Linkedin className="h-4 w-4" />
      case 'email': return <Mail className="h-4 w-4" />
      default: return <Share2 className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Screenshot & Share
        </CardTitle>
        <CardDescription>
          Capture and share screenshots of your website preview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Screenshot Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={captureScreenshot} 
              disabled={isCapturing}
              className="flex-1"
            >
              {isCapturing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Capturing...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Capture Screenshot
                </>
              )}
            </Button>
            
            {screenshotUrl && (
              <>
                <Button variant="outline" onClick={downloadScreenshot}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </>
            )}
          </div>

          {/* Device Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">{device.name}</Badge>
            <Badge variant="outline">{browser.name}</Badge>
            <Badge variant="outline">{device.width} × {device.height}</Badge>
          </div>
        </div>

        {/* Screenshot Preview */}
        {screenshotUrl && (
          <>
            <Separator />
            <div className="space-y-4">
              <Label>Screenshot Preview</Label>
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={screenshotUrl} 
                  alt={`Screenshot of ${url} on ${device.name}`}
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
            </div>
          </>
        )}

        {/* Share Section */}
        <Separator />
        <div className="space-y-4">
          <Label>Share Screenshot</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="share-url">Share URL</Label>
              <Input
                id="share-url"
                placeholder="Enter URL to share"
                value={shareUrl}
                onChange={(e) => setShareUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="share-platform">Platform</Label>
              <Select value={sharePlatform} onValueChange={setSharePlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </div>
                  </SelectItem>
                  <SelectItem value="facebook">
                    <div className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </div>
                  </SelectItem>
                  <SelectItem value="linkedin">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={shareScreenshot} className="w-full">
            {getShareIcon(sharePlatform)}
            <span className="ml-2">
              Share on {sharePlatform.charAt(0).toUpperCase() + sharePlatform.slice(1)}
            </span>
          </Button>
        </div>

        {/* Hidden canvas for screenshot processing */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
} 