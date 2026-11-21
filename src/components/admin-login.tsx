"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Sign-in failed.");
      router.push("/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
      setBusy(false);
    }
  }

  return <main className="admin-page"><section className="admin-panel"><Link className="admin-back" href="/">← Public portfolio</Link><p className="section-kicker">Private workspace</p><h1>Administrator sign in</h1><p className="admin-intro">Use the administrator account configured for this installation.</p>
    <form className="admin-form" onSubmit={submit}>
      <label>Email address<input name="email" type="email" autoComplete="username" required maxLength={191} /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={200} /></label>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <button className="button button-primary" type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
    </form>
  </section></main>;
}