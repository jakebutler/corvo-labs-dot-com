import { notFound } from 'next/navigation';

import { PresentationViewer } from '@/components/presentations/presentation-viewer';
import { getPresentation, getPresentationHtml } from '@/lib/presentations';

type PresentationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PresentationPage({ params }: PresentationPageProps) {
  const { slug } = await params;
  const presentation = getPresentation(slug);

  if (!presentation) {
    notFound();
  }

  const html = await getPresentationHtml(presentation.fileName);

  return (
    <PresentationViewer
      slug={slug}
      html={html}
      title={presentation.title}
      password={presentation.password}
    />
  );
}
