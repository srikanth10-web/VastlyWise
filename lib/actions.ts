"use server"

import { redirect } from "next/navigation"
import { createUser, findUserByEmail, verifyPassword } from "./database"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export interface ActionResult {
  success: boolean
  message: string
  errors?: Record<string, string>
}

const JWT_SECRET = process.env.JWT_SECRET || "changeme"
const JWT_COOKIE_NAME = "auth_token"

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(JWT_COOKIE_NAME, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_COOKIE_NAME);
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
  } catch (error: any) {
    console.error("Registration error:", error)
    // Prisma unique constraint error
    if (error.code === 'P2002' && error.meta && error.meta.target) {
      const errors: Record<string, string> = {}
      if (error.meta.target.includes('username')) {
        errors.username = 'Username is already taken'
      }
      if (error.meta.target.includes('email')) {
        errors.email = 'Email is already registered'
      }
      return {
        success: false,
        message: 'Registration failed due to duplicate fields',
        errors,
      }
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    }
  }
}

export async function loginAction(formData: FormData): Promise<ActionResult & { user?: any }> {
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
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password" }
    }

    // Create JWT and set cookie
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })
    await setAuthCookie(token)

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user
    return {
      success: true,
      message: "Login successful",
      user: {
        ...userWithoutPassword,
        isAdmin: false, // You can update this if you add an isAdmin field
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Login failed" }
  }
}

export async function logoutAction(): Promise<void> {
  await removeAuthCookie()
  // Do not call redirect here, let the client handle navigation after logout
}

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(JWT_COOKIE_NAME)?.value
    if (!token) return null
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number }
    const user = await findUserByEmailOrId(payload.userId)
    if (!user) return null
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch {
    return null
  }
}

// Helper to find user by id (add to database.ts if not present)
async function findUserByEmailOrId(idOrEmail: string | number) {
  if (typeof idOrEmail === "number") {
    // @ts-ignore
    return await (await import("./database")).default.user.findUnique({ where: { id: idOrEmail } })
  } else {
    return await findUserByEmail(idOrEmail)
  }
}
