import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE = "salman_admin_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function sessionKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters.");
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(userId: string, sessionId: string) {
  return new SignJWT({ role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setJti(sessionId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(sessionKey());
}

export async function getSessionFromToken(token?: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, sessionKey(), { algorithms: ["HS256"] });
    if (!payload.sub || !payload.jti || payload.role !== "ADMIN") return null;

    const session = await prisma.session.findUnique({
      where: { id: payload.jti },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
    });

    if (!session || session.userId !== payload.sub || session.expiresAt <= new Date() || session.user.role !== "ADMIN") return null;
    return { user: session.user, sessionId: session.id };
  } catch {
    return null;
  }
}

export async function requireAdmin(request: Request) {
  const cookie = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  const token = cookie?.slice(SESSION_COOKIE.length + 1);
  return getSessionFromToken(token ? decodeURIComponent(token) : undefined);
}