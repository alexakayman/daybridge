import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getServerSession() {
  console.log("[ServerAuth] Checking server session");
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    console.log("[ServerAuth] No session token found");
    return null;
  }

  try {
    console.log("[ServerAuth] Verifying JWT token");
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    console.log("[ServerAuth] Token verified for user:", decoded.userId);

    // Verify session exists in database
    console.log("[ServerAuth] Checking session in database");
    const session = await prisma.session.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      console.log("[ServerAuth] Session not found or expired, cleaning up");
      // Clean up expired session
      await prisma.session.deleteMany({
        where: { token },
      });
      return null;
    }

    console.log("[ServerAuth] Valid session found for user:", session.user.id);
    return {
      user: session.user,
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
      },
    };
  } catch (error) {
    console.error("[ServerAuth] Error verifying session:", error);
    return null;
  }
}

// Helper function to require authentication for protected routes
export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    console.log(
      "[ServerAuth] Authentication required but no valid session found"
    );
    redirect("/login?message=Please sign in to access this page");
  }

  console.log("[ServerAuth] User authenticated:", session.user.id);
  return session;
}

// Helper function to get the current user
export async function getCurrentUser() {
  const session = await getServerSession();
  return session?.user || null;
}

// Helper function to handle cookie management
export function setCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    path?: string;
    expires?: Date;
  } = {}
) {
  const cookieStore = cookies();
  try {
    cookieStore.set({
      name,
      value,
      httpOnly: options.httpOnly ?? true,
      secure: options.secure ?? process.env.NODE_ENV === "production",
      sameSite: options.sameSite ?? "lax",
      path: options.path ?? "/",
      expires: options.expires,
    });
  } catch (error) {
    // The `set` method was called from a Server Component.
    // This can be ignored if you have middleware refreshing user sessions.
  }
}

export function deleteCookie(name: string) {
  const cookieStore = cookies();
  try {
    cookieStore.delete(name);
  } catch (error) {
    // The `delete` method was called from a Server Component.
    // This can be ignored if you have middleware refreshing user sessions.
  }
}
