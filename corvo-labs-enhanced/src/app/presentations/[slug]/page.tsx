import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { PresentationViewer } from '@/components/presentations/presentation-viewer';
import {
  getPresentation,
  getPresentationAccessCookieName,
  getPresentationHtml,
  getPresentationPassword,
} from '@/lib/presentations';

type PresentationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PresentationPage({ params }: PresentationPageProps) {
  const { slug } = await params;
  const presentation = getPresentation(slug);

  if (!presentation) {
    notFound();
  }

  const password = getPresentationPassword(presentation);
  const requiresPassword = Boolean(password);

  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(getPresentationAccessCookieName(slug));
  const isUnlocked = !requiresPassword || accessCookie?.value === 'true';

  const html = isUnlocked ? await getPresentationHtml(presentation.fileName) : null;

  return (
    <PresentationViewer
      slug={slug}
      html={html}
      title={presentation.title}
      isUnlocked={isUnlocked}
      requiresPassword={requiresPassword}
    />
  );
}
