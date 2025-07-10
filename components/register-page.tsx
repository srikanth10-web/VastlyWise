"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { registerAction } from "@/lib/actions"

interface RegisterPageProps {
  onNavigate: (page: string) => void
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setErrors({})

      const result = await registerAction(formData)

      if (result.success) {
        setSuccess(true)
        // Redirect to login after 2 seconds
        setTimeout(() => {
          onNavigate("login")
        }, 2000)
      } else {
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setErrors({ general: result.message })
        }
      }
    })
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Alert className="max-w-md bg-green-50 border-green-200">
          <AlertDescription className="text-green-800 font-medium">
            User is successfully registered. Redirecting to login...
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Fill in the information below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                className={errors.username ? "border-red-500" : ""}
                required
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className={errors.firstName ? "border-red-500" : ""}
                  required
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className={errors.lastName ? "border-red-500" : ""}
                  required
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" className={errors.email ? "border-red-500" : ""} required />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                className={errors.password ? "border-red-500" : ""}
                required
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Re-enter Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={errors.confirmPassword ? "border-red-500" : ""}
                required
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {errors.general && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">{errors.general}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Already have an account? Login here
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
