import { NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Log incoming request data (excluding password)
    console.log("Login attempt for email:", email)

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Attempt authentication
    const user = await authenticateUser(email, password)

    if (!user) {
      console.log("Authentication failed for email:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Log successful login (excluding sensitive data)
    console.log("Successful login for user:", user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}

