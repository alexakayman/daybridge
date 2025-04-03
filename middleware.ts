import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(
    "[Middleware] Checking authentication for path:",
    request.nextUrl.pathname
  );
  const session = request.cookies.get("session");

  if (!session) {
    console.log("[Middleware] No session cookie found");
    return NextResponse.next();
  }

  // In Edge Runtime, we can't verify the JWT token directly
  // Instead, we'll just check if the session cookie exists
  // The actual verification will happen in the server components

  console.log("[Middleware] Session cookie found, proceeding with request");
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all paths except static files, images, etc.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
