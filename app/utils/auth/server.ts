import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };

    // Verify session exists in database
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
      // Clean up expired session
      await prisma.session.deleteMany({
        where: { token },
      });
      return null;
    }

    return {
      user: session.user,
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
      },
    };
  } catch (error) {
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getServerUser() {
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
