"use client"

import { Button } from "@/components/ui/button"
import { IndustriesMegaMenu } from "./industries-mega-menu"
import type { User } from "@/types"

interface AppHeaderProps {
  logoUrl: string
  currentUser: User | null
  onNavigate: (page: string) => void
  onLogout: () => void
}

export function AppHeader({ logoUrl, currentUser, onNavigate, onLogout }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm relative z-40">
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-full bg-gray-300 bg-cover bg-center"
            style={{ backgroundImage: logoUrl ? `url(${logoUrl})` : "none" }}
          >
            {!logoUrl && <div className="w-full h-full bg-black rounded-full"></div>}
          </div>
          <span className="text-xl font-semibold text-gray-900">Logo</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => onNavigate("home")}
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </button>

          {/* Industries Mega Menu */}
          <IndustriesMegaMenu onNavigate={onNavigate} />

          <button
            onClick={() => onNavigate("press-release")}
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Press Release
          </button>
        </nav>
      </div>

      {/* Auth Section */}
      <div className="flex items-center space-x-3">
        {currentUser ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Welcome, {currentUser.firstName}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600" onClick={() => onNavigate("register")}>
              Register
            </Button>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600" onClick={() => onNavigate("login")}>
              Login
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
