import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function readHiddenPassword() {
  return new Promise<string>((resolve, reject) => {
    const input = process.stdin;
    if (!input.isTTY || typeof input.setRawMode !== "function") {
      reject(new Error("Run this command in an interactive terminal so the password can be entered privately."));
      return;
    }

    let password = "";
    process.stdout.write("Admin password (minimum 14 characters): ");
    input.setRawMode(true);
    input.resume();
    const onData = (chunk: Buffer) => {
      for (const byte of chunk) {
        if (byte === 3) {
          input.setRawMode(false);
          input.removeListener("data", onData);
          reject(new Error("Password entry cancelled."));
          return;
        }
        if (byte === 13 || byte === 10) {
          input.setRawMode(false);
          input.removeListener("data", onData);
          process.stdout.write("\n");
          resolve(password);
          return;
        }
        if (byte === 8 || byte === 127) password = password.slice(0, -1);
        else if (byte >= 32) password += String.fromCharCode(byte);
      }
    };
    input.on("data", onData);
  });
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before creating the administrator.");
  const email = process.argv[2]?.trim().toLowerCase();
  const name = process.argv.slice(3).join(" ").trim() || "Portfolio Administrator";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Usage: npm run admin:create -- admin@example.com [Administrator Name]");
  }
  if (await prisma.user.findUnique({ where: { email } })) throw new Error("An account with that email already exists.");

  const password = await readHiddenPassword();
  if (password.length < 14) throw new Error("Use a password with at least 14 characters.");
  await prisma.user.create({ data: { name, email, passwordHash: await bcrypt.hash(password, 12), role: "ADMIN" } });
  process.stdout.write(`Administrator created for ${email}.\n`);
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Unable to create administrator.");
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());