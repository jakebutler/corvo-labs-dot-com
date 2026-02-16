'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

type PresentationViewerProps = {
  html: string | null;
  title: string;
  slug: string;
  isUnlocked: boolean;
  requiresPassword: boolean;
};

export function PresentationViewer({ html, title, slug, isUnlocked, requiresPassword }: PresentationViewerProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/presentations/${slug}/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input }),
      });

      if (!response.ok) {
        setError('Incorrect password. Please try again.');
        return;
      }

      window.location.reload();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isUnlocked || (requiresPassword && !html)) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white text-zinc-900">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute bottom-[-12rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-lg rounded-2xl border border-orange-100/80 bg-white/90 p-8 shadow-[0_20px_60px_rgba(32,21,13,0.12)] backdrop-blur-sm">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B47] to-[#9c40ff] text-white shadow-[0_8px_24px_rgba(255,107,71,0.35)]">
              <Lock className="h-5 w-5" />
            </div>

            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[#20150D]">Protected presentation</h1>
            <p className="mb-7 text-[15px] text-zinc-600">
              Enter the access password to view <span className="font-semibold text-[#20150D]">{title}</span>.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <label htmlFor="presentation-password" className="text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                id="presentation-password"
                type="password"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-[#FF6B47]/70 focus:ring-4 focus:ring-[#FF6B47]/15"
                placeholder="Enter password"
                autoFocus
                disabled={isSubmitting}
              />

              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B47] to-[#9c40ff] px-4 py-3 font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[#FF6B47]/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Checking...' : 'Unlock presentation'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <iframe title={title} srcDoc={html ?? ''} className="h-screen w-full border-0" />
    </main>
  );
}
