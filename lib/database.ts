import { hash, compare } from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  isAdmin: boolean
  passwordHash: string
  createdAt: string
}

// In a real app, this would be a database
// For demo purposes, we'll use a simple in-memory store
const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    username: "admin",
    firstName: "Admin",
    lastName: "User",
    isAdmin: true,
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // admin123
    createdAt: new Date().toISOString(),
  },
]

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

export async function createUser(userData: {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}): Promise<User> {
  // Check if user already exists
  const existingUser = users.find((u) => u.email === userData.email || u.username === userData.username)
  if (existingUser) {
    throw new Error("User with this email or username already exists")
  }

  const passwordHash = await hashPassword(userData.password)

  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    isAdmin: false,
    passwordHash,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  return newUser
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return users.find((u) => u.email === email) || null
}

export async function findUserById(id: string): Promise<User | null> {
  return users.find((u) => u.id === id) || null
}

export async function createJWT(userId: string): Promise<string> {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyJWT(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return { userId: payload.userId as string }
  } catch {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value || null
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthCookie()
  if (!token) return null

  const payload = await verifyJWT(token)
  if (!payload) return null

  return await findUserById(payload.userId)
}
