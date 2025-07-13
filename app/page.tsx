"use client"

import { useState, useEffect } from "react"
import { AppHeader } from "@/components/app-header"
import { ContentSidebar } from "@/components/content-sidebar"
import { MainContent } from "@/components/main-content"
import { RegisterPage } from "@/components/register-page"
import { LoginPage } from "@/components/login-page"
import { logoutAction } from "@/lib/actions"
import type { User } from "@/types"

export default function AdminApp() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState("home")
  const [logoUrl, setLogoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing authentication on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.user) {
            setCurrentUser(data.user)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    setCurrentPage("dashboard")
  }

  const handleLogout = async () => {
    try {
      await logoutAction()
      setCurrentUser(null)
      setCurrentPage("home")
    } catch (error) {
      console.error("Logout failed:", error)
      // Fallback: clear user state and redirect
      setCurrentUser(null)
      setCurrentPage("home")
    }
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const handleLogoUpdate = (newLogoUrl: string) => {
    setLogoUrl(newLogoUrl)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Render auth pages without sidebar
  if (currentPage === "register") {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader logoUrl={logoUrl} currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />
        <RegisterPage onNavigate={handleNavigate} />
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center text-gray-600">© 2024 Admin Platform. All rights reserved.</div>
          </div>
        </footer>
      </div>
    )
  }

  if (currentPage === "login") {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader logoUrl={logoUrl} currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />
        <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center text-gray-600">© 2024 Admin Platform. All rights reserved.</div>
          </div>
        </footer>
      </div>
    )
  }

  // Main app layout with sidebar
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AppHeader logoUrl={logoUrl} currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Content Sidebar */}
        <ContentSidebar currentUser={currentUser} onNavigate={handleNavigate} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 bg-white">
            <MainContent
              currentPage={currentPage}
              currentUser={currentUser}
              logoUrl={logoUrl}
              onLogoUpdate={handleLogoUpdate}
            />
          </main>

          <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center text-gray-600">© 2025 Admin Platform. All rights reserved.</div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
