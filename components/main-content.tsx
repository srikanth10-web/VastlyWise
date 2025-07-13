"use client"

import type { User } from "@/types"
import { LogoUpload } from "./logo-upload"
import { WebsitePreviewIntegrated } from "./website-preview-integrated"

interface MainContentProps {
  currentPage: string
  currentUser: User | null
  logoUrl: string
  onLogoUpdate: (logoUrl: string) => void
}

export function MainContent({ currentPage, currentUser, logoUrl, onLogoUpdate }: MainContentProps) {
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Our Platform</h1>
            <p className="text-lg text-gray-600">
              This is the home page of our modern web application. Navigate through the sidebar to explore different
              sections.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Dashboard</h3>
                <p className="text-blue-700">Access your personalized dashboard with analytics and reports.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Content Management</h3>
                <p className="text-green-700">Manage your content, pages, and media files efficiently.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">User Management</h3>
                <p className="text-purple-700">Control user access, roles, and permissions.</p>
              </div>
            </div>
          </div>
        )

      case "dashboard":
      case "dashboard-overview":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Active Sessions</h3>
                <p className="text-2xl font-bold text-gray-900">567</p>
                <p className="text-xs text-blue-600">+8% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">$45,678</p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
                <p className="text-xs text-red-600">-2% from last month</p>
              </div>
            </div>
          </div>
        )

      case "project1":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Project 1</h1>
            <p className="text-lg text-gray-600">
              This is Project 1 content. Add your project-specific content here.
            </p>
          </div>
        )

      case "project2":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Project 2</h1>
            <p className="text-lg text-gray-600">
              This is Project 2 content. Add your project-specific content here.
            </p>
          </div>
        )

      case "project3":
        return <WebsitePreviewIntegrated />

      case "project4":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Project 4</h1>
            <p className="text-lg text-gray-600">
              This is Project 4 content. Add your project-specific content here.
            </p>
          </div>
        )

      case "project5":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Project 5</h1>
            <p className="text-lg text-gray-600">
              This is Project 5 content. Add your project-specific content here.
            </p>
          </div>
        )

      case "logo-upload":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Logo Upload</h1>
            <LogoUpload currentLogoUrl={logoUrl} onLogoUpdate={onLogoUpdate} />
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
            <p className="text-lg text-gray-600">
              The page you're looking for doesn't exist. Please check the URL or navigate using the sidebar.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  )
}
