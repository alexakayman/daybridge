import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function signIn(email: string, password: string) {
  console.log("[Auth] Attempting sign in for email:", email);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("[Auth] Sign in failed: User not found for email:", email);
    throw new Error("User not found");
  }

  console.log("[Auth] User found, verifying password");
  const isValid = await compare(password, user.password);
  if (!isValid) {
    console.log("[Auth] Sign in failed: Invalid password for email:", email);
    throw new Error("Invalid password");
  }

  console.log("[Auth] Password verified, creating session");
  // Create session
  const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  console.log("[Auth] Session created, setting cookie");
  // Set cookie
  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  console.log("[Auth] Sign in successful for user:", user.id);
  return { user };
}

export async function signUp(email: string, password: string, name?: string) {
  console.log("[Auth] Attempting sign up for email:", email);

  const hashedPassword = await hash(password, 12);
  console.log("[Auth] Password hashed, creating user");

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  console.log("[Auth] User created successfully:", user.id);
  return { user };
}

export async function getCurrentUser() {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function signOut() {
  "use server";
  console.log("[Auth] Attempting sign out");

  const token = cookies().get("session")?.value;
  if (token) {
    console.log("[Auth] Found session token, deleting from database");
    await prisma.session.deleteMany({
      where: { token },
    });
  }

  console.log("[Auth] Deleting session cookie");
  cookies().delete("session");
  console.log("[Auth] Sign out completed");
}
