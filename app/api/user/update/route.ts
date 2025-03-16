import { NextResponse } from "next/server"
import { updateUserDetails as updateUser } from "@/lib/user-storage"
import { getUserById } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, updates } = body

    // Validate request
    if (!userId || !updates) {
      return NextResponse.json({ message: "User ID and updates are required" }, { status: 400 })
    }

    // Check if user exists
    const user = await getUserById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update user details
    const updatedDetails = await updateUser(userId, updates)

    return NextResponse.json({
      success: true,
      user: updatedDetails,
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ message: "Failed to update user details" }, { status: 500 })
  }
}

