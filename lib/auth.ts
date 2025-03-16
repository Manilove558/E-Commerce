// Types for user data
export interface User {
  id: string
  name: string
  email: string
  password: string // In real app, this would be hashed
  lastLoginAt: Date
  role: "user" | "admin"
  avatar?: string
}

// Mock database for users
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
    lastLoginAt: new Date(),
    role: "user",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Function to register a new user
export async function registerUser(userData: Omit<User, "id" | "lastLoginAt" | "role">): Promise<User | null> {
  // Check if user already exists
  if (users.find((u) => u.email === userData.email)) {
    throw new Error("Email already registered")
  }

  const newUser: User = {
    id: String(users.length + 1),
    lastLoginAt: new Date(),
    role: "user",
    ...userData,
  }

  users.push(newUser)
  return newUser
}

// Function to authenticate user
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    user.lastLoginAt = new Date()
    return user
  }
  return null
}

// Add an admin user to the mock database
users.push({
  id: "admin",
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123", // In a real app, this would be hashed
  lastLoginAt: new Date(),
  role: "admin",
  avatar: "/placeholder.svg?height=32&width=32",
})

// Function to update user details
export async function updateUserDetails(userId: string, updates: Partial<User>): Promise<User | null> {
  const userIndex = users.findIndex((u) => u.id === userId)
  if (userIndex === -1) return null

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
  }

  return users[userIndex]
}

// Function to get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  return users.find((u) => u.id === userId) || null
}

// Function to get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((u) => u.email === email) || null
}

// Function to get the last logged-in user
export function getLastLoggedInUser(): User | null {
  // Sort users by last login time and get the most recent
  const sortedUsers = [...users].sort((a, b) => b.lastLoginAt.getTime() - a.lastLoginAt.getTime())

  // Return the most recently logged in user or null if no users
  return sortedUsers[0] || null
}

// Function to get current session
export function getCurrentSession(): { user: User } | null {
  const user = getLastLoggedInUser()
  return user ? { user } : null
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}

