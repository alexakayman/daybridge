import { type NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.next();
  }

  try {
    const decoded = verify(session.value, JWT_SECRET) as { userId: string };

    // Verify session exists in database and is not expired
    const dbSession = await prisma.session.findFirst({
      where: {
        token: session.value,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!dbSession) {
      // Invalid or expired session
      const response = NextResponse.next();
      response.cookies.delete("session");
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    // Invalid token
    const response = NextResponse.next();
    response.cookies.delete("session");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
