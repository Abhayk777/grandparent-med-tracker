"use client";

import { useState, FormEvent, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { setSignedIn } from "./LandingHeader";

type AuthTab = "login" | "signup";

export default function LoginCard(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<AuthTab>(
    tabFromUrl === "signup" ? "signup" : "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setSignedIn(true);
    startTransition(() => {
      router.push("/dashboard");
    });
  }

  return (
    <div className="rounded-2xl border border-glass bg-glass p-8 shadow-diffuse backdrop-blur-md">
      {/* Tabs */}
      <div className="mb-6 flex gap-2 rounded-xl bg-white/10 p-1 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "login"
              ? "bg-goldenrod/50 text-cream shadow-soft"
              : "text-graphite-slate hover:bg-white/10"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("signup")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "signup"
              ? "bg-goldenrod/50 text-cream shadow-soft"
              : "text-graphite-slate hover:bg-white/10"
          }`}
        >
          Sign Up
        </button>
      </div>

      <h1 className="mb-2 text-2xl font-bold text-graphite-olive">
        {activeTab === "login" ? "Sign in" : "Create account"}
      </h1>
      <p className="mb-6 text-sm text-graphite-slate">
        {activeTab === "login"
          ? "Sign in to manage medication schedules for your family."
          : "Create an account to get started with MedCare."}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="auth-email"
            className="mb-1.5 block text-sm font-medium text-graphite-slate"
          >
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete={activeTab === "login" ? "email" : "email"}
            className="w-full rounded-xl border border-glass bg-white/10 px-3 py-2.5 text-graphite-olive placeholder-graphite-muted backdrop-blur-md focus:border-graphite-slate focus:outline-none focus:ring-1 focus:ring-graphite-slate"
            required
          />
        </div>
        <div>
          <label
            htmlFor="auth-password"
            className="mb-1.5 block text-sm font-medium text-graphite-slate"
          >
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={activeTab === "login" ? "current-password" : "new-password"}
            className="w-full rounded-xl border border-glass bg-white/10 px-3 py-2.5 text-graphite-olive placeholder-graphite-muted backdrop-blur-md focus:border-graphite-slate focus:outline-none focus:ring-1 focus:ring-graphite-slate"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full rounded-xl bg-goldenrod/60 px-4 py-2.5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-goldenrod/80 focus:outline-none focus:ring-2 focus:ring-goldenrod focus:ring-offset-2 focus:ring-offset-[#2a2535] disabled:opacity-70"
        >
          {isPending ? "Taking you to dashboard…" : activeTab === "login" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-graphite-slate">
        <Link href="/" className="font-medium text-graphite-olive hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
