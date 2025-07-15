import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default prisma

// Create a new user with hashed password
export async function createUser({
  username,
  firstName,
  lastName,
  email,
  password,
}: {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}) {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      username,
      firstName,
      lastName,
      email,
      password: passwordHash,
    },
  })
  // Exclude password hash from returned user object
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Find user by email
export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

// Verify password
export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}
