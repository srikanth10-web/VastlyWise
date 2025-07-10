"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X } from "lucide-react"

interface LogoUploadProps {
  currentLogoUrl: string
  onLogoUpdate: (logoUrl: string) => void
}

export function LogoUpload({ currentLogoUrl, onLogoUpdate }: LogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB")
      return
    }

    setIsUploading(true)

    try {
      // Convert file to base64 for demo purposes
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onLogoUpdate(result)
        setUploadSuccess(true)
        setTimeout(() => setUploadSuccess(false), 3000)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      alert("Failed to upload logo")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveLogo = () => {
    onLogoUpdate("")
    setUploadSuccess(true)
    setTimeout(() => setUploadSuccess(false), 3000)
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Logo Management
        </CardTitle>
        <CardDescription>Upload or update the application logo (Admin only)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Logo Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Logo</label>
          <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg">
            {currentLogoUrl ? (
              <div className="relative">
                <img
                  src={currentLogoUrl || "/placeholder.svg"}
                  alt="Current logo"
                  className="max-h-20 max-w-20 object-contain"
                />
                <button
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No logo uploaded</p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload New Logo</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {/* Upload Status */}
        {isUploading && (
          <Alert>
            <AlertDescription>Uploading logo...</AlertDescription>
          </Alert>
        )}

        {uploadSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">Logo updated successfully!</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => document.querySelector('input[type="file"]')?.click()}
            disabled={isUploading}
            className="flex-1"
          >
            Choose File
          </Button>
          {currentLogoUrl && (
            <Button variant="destructive" onClick={handleRemoveLogo} disabled={isUploading}>
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
