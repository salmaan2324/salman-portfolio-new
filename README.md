# Salman Abdikarim Hussein Portfolio

A responsive personal portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, Prisma and MySQL. The public site contains verified professional information only. Project and design galleries start empty; database projects remain hidden until an administrator publishes them.

## Requirements

- Node.js 20.9 or newer (Node.js 22 LTS recommended)
- npm
- MySQL 8.0 or a compatible managed MySQL service
- Cloudinary account for admin-managed images and CV files

## Local setup

```powershell
cd salman-portfolio
npm install
Copy-Item .env.example .env
```

Edit `.env` and set `DATABASE_URL`, `SESSION_SECRET`, `RATE_LIMIT_HMAC_KEY` and `NEXT_PUBLIC_SITE_URL`. Generate separate random secrets of at least 32 characters for both key values. Keep `.env` private; only `.env.example` belongs in source control.

Create an empty MySQL database and user, then run:

```powershell
npm run db:generate
npm run db:migrate
npm run db:seed
```

The seed adds the supplied six skill categories, verified employment records, the ICT degree, public contact details and GitHub link. It does not create projects, certificates or administrator credentials.

Create the first administrator interactively. Password entry is hidden and passwords must be at least 14 characters:

```powershell
npm run admin:create -- admin@example.com "Portfolio Administrator"
```

Configure Cloudinary in `.env` using the three `CLOUDINARY_*` variables, then start the application:

```powershell
npm run dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the private dashboard. Without a configured database, the public portfolio and generated CV remain available, while form submissions and admin functions return clear configuration errors.

## Database and migrations

The normalized Prisma schema is in `prisma/schema.prisma`; the initial MySQL migration is in `prisma/migrations/20261107000000_initial/`. For a new environment, use `npm run db:migrate`. For local schema changes, edit the Prisma schema, run `npx prisma migrate dev --name describe_change`, and commit the resulting migration. Run `npm run db:seed` to idempotently restore the supplied profile records.

The database contains users and revocable sessions; projects and project images; categorized skills; services; experience; education; certificates; contact messages; site settings; social links; media metadata; and login-attempt records. Uploaded binaries are stored in Cloudinary, not MySQL.

## Media and CV

The supplied portrait is kept unchanged at `public/images/salman-profile.jpg`; Next.js serves it through its image component. The CV download is generated as a public-safe PDF from verified facts, so the uploaded source PDF (which contains private details) is never served directly. Admin-uploaded replacement PDFs must already be prepared for public sharing. JPEG, PNG, WebP and PDF files up to 4 MB are accepted to stay below Vercel's request-body limit; SVG and other active formats are rejected. Uploaded files become public Cloudinary assets when uploaded. Do not upload private material.

Cloudinary is required only for uploads and replacements. Create an account, set the cloud name, API key and API secret in server environment variables, and keep the API secret out of browser code. Use separate development and production Cloudinary environments.

## Security notes

- Admin passwords are bcrypt-hashed. Create the first account with the interactive CLI; no default credential exists.
- Admin sessions use signed, HTTP-only, same-site cookies and a revocable database session record. Production cookies are secure-only.
- Login attempts and contact submissions are rate-limited with hashed client identifiers. Ensure the deployment proxy sets trustworthy `x-real-ip` or `x-forwarded-for` headers.
- Write routes validate same-origin requests and Zod schemas. Media uploads enforce size, MIME and file-signature checks.
- Security headers include content-type sniffing protection, frame denial, referrer policy, permissions policy and HSTS.
- Never upload a private CV or profile document. The public profile excludes date of birth, gender and residential address.
- `SESSION_SECRET`, `RATE_LIMIT_HMAC_KEY`, database credentials and Cloudinary secrets must be set as deployment secrets, never committed.

## Verification

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

On machines where the installed Windows SWC native module cannot load, use the matching WASM compiler included in the development dependencies and Webpack for the local build:

```powershell
$env:NEXT_TEST_WASM_DIR = (Resolve-Path node_modules/@next/swc-wasm-nodejs).Path
npm run build -- --webpack
```

Vercel's Linux build uses the platform's native Next.js compiler and the normal `npm run build` command.

## Vercel deployment

1. Push this project to a Git provider and import the `salman-portfolio` directory into Vercel.
2. Provision managed MySQL with TLS enabled and allow connections from the application deployment.
3. Add `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `SESSION_SECRET`, `RATE_LIMIT_HMAC_KEY`, and the Cloudinary variables to Vercel Production and Preview environments as appropriate.
4. Set the build command to `npm run build`. Run `npm run db:migrate` against the production database as a release step before routing traffic; do not run the seed on every build.
5. After the first migration, run the seed once and provision the administrator using `npm run admin:create` from a secure terminal connected to the production database.
6. Attach the custom domain in Vercel, configure its DNS records as shown in the Vercel dashboard, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

Keep production database access restricted, enable provider backups, rotate secrets if an administrator leaves, and periodically review Cloudinary assets and contact-message retention. The GitHub API integration reads only public repositories and falls back to the profile link if the API is unavailable or rate-limited.
