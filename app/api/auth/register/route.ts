import { NextResponse } from "next/server"
import { registerUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const user = await registerUser({ name, email, password })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === "Email already registered") {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 })
    }

    return NextResponse.json({ message: "Registration failed" }, { status: 500 })
  }
}

