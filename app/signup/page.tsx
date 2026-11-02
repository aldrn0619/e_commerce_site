"use client";

import { useState, type FormEvent } from "react";

export default function signup() {
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
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        }

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            const result: { message?: string; error?: string } = await response.json();

            if (!response.ok) {
                setError(result.error || "Signup failed. Please try again later.");
                return;
            }

            setMessage(result.message || "Signup successful. Please check your email for confirmation.");
        } catch {
            setError("Signup failed. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground sm:px-8">
            <section
            area-labelledby="sign-up-title"
            className="w-full max-w-md rounded-3xl border border-border bg-surface p-7 shadow-xl shadow-foreground/5 sm:p-10"
            >
                <header className="mb-8">
                    <h1 id="sign-up-title" 
                    className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Sign Up
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-muted">Create an account to get started.</p>
                </header>

                {error && <p role="alert">{error}</p>}
                {message && <p role="alert">{message}</p>}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex gap-4 sm:flex-row">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                            <input type="text" 
                            id="firstName" 
                            name="firstName"
                            placeholder="Enter your first name"
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:ring-4 focus:ring-accent/10 motion-reduce:transition-none" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                            <input type="text" 
                            id="lastName" 
                            name="lastName"
                            placeholder="Enter your last name"
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:ring-4 focus:ring-accent/10 motion-reduce:transition-none" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:ring-4 focus:ring-accent/10 motion-reduce:transition-none" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:ring-4 focus:ring-accent/10 motion-reduce:transition-none" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:ring-4 focus:ring-accent/10 motion-reduce:transition-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                    className="mt-2 h-12 w-full rounded-xl bg-accent px-4 text-sm font-semibold text-surface transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-accent-hover motion-reduce:transition-none">
                        {isSubmitting ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none">
                        Sign in
                    </a>
                </p>
            </section>
        </main>
    );
}