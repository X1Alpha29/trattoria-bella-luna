"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {error && (
        <div
          className="border border-bella-terracotta/30 bg-bella-terracotta/10 p-4 font-body text-sm text-bella-terracotta"
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-bella-charcoal"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none transition-colors placeholder:text-bella-muted/60 focus:border-bella-charcoal"
          placeholder="admin@bellaluna.local"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-bella-charcoal"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none transition-colors placeholder:text-bella-muted/60 focus:border-bella-charcoal"
          placeholder="••••••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center bg-bella-charcoal px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-cream transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}