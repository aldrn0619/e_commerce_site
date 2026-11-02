"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: { message?: string; error?: string } = await response.json();

      if (!response.ok) {
        setError(result.error || "Login failed. Please try again later.");
        return;
      }

      setMessage(result.message || "You have successfully logged in.");

      router.push("/");
      router.refresh();
    } catch {
      setError("Login failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground sm:px-8">
      <section
        aria-labelledby="sign-in-title"
        className="w-full max-w-md rounded-3xl border border-border bg-surface p-7 shadow-xl shadow-foreground/5 sm:p-10"
      >
        <header className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Account access
          </p>
          <h1
            id="sign-in-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Sign in
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Sign in to continue to your account.
          </p>
        </header>

        {error && <p role="alert">{error}</p>}
        {message && <p role="alert">{message}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:ring-4 focus:ring-accent/10 motion-reduce:transition-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:ring-4 focus:ring-accent/10 motion-reduce:transition-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-12 w-full rounded-xl bg-accent px-4 text-sm font-semibold text-surface transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-accent-hover motion-reduce:transition-none"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
          >
            Sign up
          </a>
        </p>
      </section>
    </main>
  );
}
