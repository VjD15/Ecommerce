"use server";

import { cookies } from "next/headers";
import { getUserById } from "./users";
import type { User } from "./types";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "user_session";

export async function createSession(userId: string) {
  (await cookies()).set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export async function getSession(): Promise<{
  user: Omit<User, "password"> | null;
}> {
  const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) {
    return { user: null };
  }

  const userRecord = getUserById(sessionId);
  if (!userRecord) {
    return { user: null };
  }

  const role =
    userRecord.email.toLowerCase() === "admin@gmail.com" ? "admin" : "customer";
  const { password, ...user } = userRecord;

  return { user: { ...user, role } };
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
  redirect("/login");
}
