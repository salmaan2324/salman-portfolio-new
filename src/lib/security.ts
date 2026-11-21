import { createHmac } from "node:crypto";

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export function hashRequestKey(request: Request, additionalKey = "") {
  const secret = process.env.RATE_LIMIT_HMAC_KEY;
  if (!secret || secret.length < 32) throw new Error("RATE_LIMIT_HMAC_KEY must contain at least 32 characters.");

  const forwardedIp = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = forwardedIp || "unknown";
  return createHmac("sha256", secret).update(`${clientIp}:${additionalKey}`).digest("hex");
}

export function hasDatabaseConfiguration() {
  return Boolean(process.env.DATABASE_URL);
}