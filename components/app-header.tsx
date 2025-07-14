"use client"

import { Button } from "@/components/ui/button"
import { IndustriesMegaMenu } from "./industries-mega-menu"
import type { User } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface AppHeaderProps {
  logoUrl: string
  currentUser?: User | null
}

export function AppHeader({ logoUrl, currentUser = null }: AppHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm relative z-40">
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div
            className="w-10 h-10 rounded-full bg-gray-300 bg-cover bg-center group-hover:ring-2 group-hover:ring-blue-400 transition"
            style={{ backgroundImage: logoUrl ? `url(${logoUrl})` : "none" }}
          >
            {!logoUrl && <div className="w-full h-full bg-black rounded-full"></div>}
          </div>
          <span className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">VastlyWise</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Home
          </Link>

          {/* Industries Mega Menu */}
          <IndustriesMegaMenu />

          {/* Blog Menu Item */}
          <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Blog
          </Link>

          <Link href="/press-release" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Press Release
          </Link>
        </nav>
      </div>

      {/* Auth Section */}
      <div className="flex items-center space-x-3">
        {currentUser ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Welcome, {currentUser.firstName}</span>
            <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-600 hover:bg-red-50">
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Link href="/register">
              <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
