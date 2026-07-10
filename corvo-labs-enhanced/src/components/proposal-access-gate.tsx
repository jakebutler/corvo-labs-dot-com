'use client';

import { FormEvent, ReactNode, useEffect, useState } from 'react';

const SESSION_KEY = 'chs-proposal-unlocked';
const PASSWORD = 'CHSCORVO';

export function ProposalAccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isUnlocked = window.sessionStorage.getItem(SESSION_KEY) === 'true';
    setUnlocked(isUnlocked);
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (password === PASSWORD) {
      window.sessionStorage.setItem(SESSION_KEY, 'true');
      setUnlocked(true);
      setError('');
      return;
    }

    setError('Incorrect password. Please try again.');
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 space-y-5">
          <p className="text-xs tracking-[0.25em] text-slate-400 uppercase">Capital Health Solutions</p>
          <h1 className="text-3xl font-semibold">Private proposal access</h1>
          <p className="text-slate-300 text-sm">Enter the password to view this protected proposal experience.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3"
            placeholder="Password"
          />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button className="w-full rounded-lg bg-[#8b2635] py-3 font-semibold">Unlock</button>
        </form>
      </main>
    );
  }

  return <>{children}</>;
}
