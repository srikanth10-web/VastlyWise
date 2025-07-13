"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginAction } from "@/lib/actions"
import type { User } from "@/types"

interface LoginPageProps {
  onLogin: (user: User) => void
  onNavigate: (page: string) => void
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setError("")

      const result = await loginAction(formData)

      if (result.success) {
        // Get the current user after successful login
        try {
          const response = await fetch('/api/auth/me')
          if (response.ok) {
            const userData = await response.json()
            if (userData.success && userData.user) {
              onLogin(userData.user)
            } else {
              // Fallback: reload the page to trigger auth check
              window.location.reload()
            }
          } else {
            // Fallback: reload the page to trigger auth check
            window.location.reload()
          }
        } catch (error) {
          console.error("Failed to get user data:", error)
          // Fallback: reload the page to trigger auth check
          window.location.reload()
        }
      } else {
        setError(result.message)
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>

            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => onNavigate("register")}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                {"Don't have an account? Register here"}
              </button>
              <div className="text-xs text-gray-500">
                <p>Demo credentials:</p>
                <p>Admin: admin@example.com / admin123</p>
                <p>User: user@example.com / user123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
