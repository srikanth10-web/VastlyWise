import type { User } from "@/types"

// Mock authentication functions
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    username: "admin",
    firstName: "Admin",
    lastName: "User",
    isAdmin: true,
  },
  {
    id: "2",
    email: "user@example.com",
    username: "user",
    firstName: "Regular",
    lastName: "User",
    isAdmin: false,
  },
]

export const authenticateUser = (email: string, password: string): User | null => {
  // Mock authentication - in real app, this would call an API
  if (email === "admin@example.com" && password === "admin123") {
    return mockUsers[0]
  }
  if (email === "user@example.com" && password === "user123") {
    return mockUsers[1]
  }
  return null
}

export const registerUser = (userData: {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}): User => {
  // Mock registration - in real app, this would call an API
  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    isAdmin: false,
  }
  mockUsers.push(newUser)
  return newUser
}
