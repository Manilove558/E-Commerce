import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getLastLoggedInUser } from "./lib/auth"

export function middleware(request: NextRequest) {
  // Check if the route is admin-related
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const user = getLastLoggedInUser()

    // If no user or user is not admin, redirect to login
    if (!user || user.role !== "admin") {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("from", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

