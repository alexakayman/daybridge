import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }

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

  // Set cookie
  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return { user };
}

export async function signUp(email: string, password: string, name?: string) {
  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

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
  const token = cookies().get("session")?.value;
  if (token) {
    await prisma.session.deleteMany({
      where: { token },
    });
  }

  cookies().delete("session");
}
