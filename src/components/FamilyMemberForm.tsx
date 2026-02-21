"use client";

import { useState, FormEvent } from "react";

export default function FamilyMemberForm(): React.ReactElement {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);
    try {
      const res = await fetch("/api/family-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as { message?: string }).message || res.statusText || "Failed to add.");
      }
      setSuccess(true);
      setName("");
      setPhone("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-glass bg-glass p-6 shadow-soft backdrop-blur-md">
      <h2 className="mb-4 text-lg font-semibold text-graphite-olive">
        Add family member&apos;s phone
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="family-name"
            className="mb-1.5 block text-sm font-medium text-graphite-slate"
          >
            Name
          </label>
          <input
            id="family-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Uncle Ramesh"
            className="w-full rounded-xl border border-glass bg-white/10 px-3 py-2 text-graphite-olive placeholder-graphite-muted backdrop-blur-md focus:border-graphite-slate focus:outline-none focus:ring-1 focus:ring-graphite-slate"
            required
          />
        </div>
        <div>
          <label
            htmlFor="family-phone"
            className="mb-1.5 block text-sm font-medium text-graphite-slate"
          >
            Phone (+91...)
          </label>
          <input
            id="family-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-glass bg-white/10 px-3 py-2 text-graphite-olive placeholder-graphite-muted backdrop-blur-md focus:border-graphite-slate focus:outline-none focus:ring-1 focus:ring-graphite-slate"
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-graphite-olive">
            Family member added.
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center rounded-xl bg-goldenrod/50 px-4 py-2.5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-goldenrod/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="mr-2 size-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
              Adding…
            </>
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
}
