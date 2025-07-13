"use server"

import { redirect } from "next/navigation"
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  createJWT,
  setAuthCookie,
  removeAuthCookie,
} from "./database"

export interface ActionResult {
  success: boolean
  message: string
  errors?: Record<string, string>
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  try {
    const username = formData.get("username") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validation
    const errors: Record<string, string> = {}

    if (!username?.trim()) errors.username = "Username is required"
    if (!firstName?.trim()) errors.firstName = "First name is required"
    if (!lastName?.trim()) errors.lastName = "Last name is required"
    if (!email?.trim()) errors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(email || "")) errors.email = "Email is invalid"
    if (!password) errors.password = "Password is required"
    if (password && password.length < 6) errors.password = "Password must be at least 6 characters"
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match"

    if (Object.keys(errors).length > 0) {
      return { success: false, message: "Validation failed", errors }
    }

    // Create user
    await createUser({
      username: username.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
    })

    return { success: true, message: "User registered successfully" }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    }
  }
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Validation
    if (!email?.trim()) {
      return { success: false, message: "Email is required" }
    }
    if (!password) {
      return { success: false, message: "Password is required" }
    }

    // Find user
    const user = await findUserByEmail(email.trim().toLowerCase())
    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash)
    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password" }
    }

    // Create JWT and set cookie
    const token = await createJWT(user.id)
    await setAuthCookie(token)

    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Login failed" }
  }
}

export async function logoutAction(): Promise<void> {
  await removeAuthCookie()
  redirect("/")
}
