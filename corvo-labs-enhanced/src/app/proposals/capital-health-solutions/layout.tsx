import { ProposalAccessGate } from '@/components/proposal-access-gate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ProposalLayout({ children }: { children: React.ReactNode }) {
  return <ProposalAccessGate>{children}</ProposalAccessGate>;
}
