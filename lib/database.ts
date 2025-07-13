import { hash, compare } from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { prisma } from "./prisma"

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  isAdmin: boolean
  createdAt: string
}

export interface UserWithPassword extends User {
  passwordHash: string
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "")

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
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: userData.email.toLowerCase() },
        { username: userData.username }
      ]
    }
  })

  if (existingUser) {
    throw new Error("User with this email or username already exists")
  }

  const passwordHash = await hashPassword(userData.password)

  const newUser = await prisma.user.create({
    data: {
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase(),
      passwordHash,
      isAdmin: false,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
      createdAt: true,
    }
  })

  return {
    ...newUser,
    createdAt: newUser.createdAt.toISOString(),
  }
}

export async function findUserByEmail(email: string): Promise<UserWithPassword | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
      passwordHash: true,
      createdAt: true,
    }
  })

  if (!user) return null

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  }
}

export async function findUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
      createdAt: true,
    }
  })

  if (!user) return null

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  }
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
