import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type PresentationConfig = {
  title: string;
  fileName: string;
};

const presentations: Record<string, PresentationConfig> = {
  'growth-vanguard-intro': {
    title: 'Growth Vanguard Intro',
    fileName: 'growth-vanguard-intro.html',
  },
};

export function getPresentation(slug: string): PresentationConfig | null {
  return presentations[slug] ?? null;
}

export async function getPresentationHtml(fileName: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'src/content/presentations', fileName);
  return readFile(filePath, 'utf8');
}

export function getPresentationPassword(slug: string): string | null {
  switch (slug) {
    case 'growth-vanguard-intro': {
      const password = process.env.GROWTH_VANGUARD_INTRO_PASSWORD;
      return password?.trim() ? password : null;
    }
    default:
      return null;
  }
}

export function getPresentationAccessCookieName(slug: string): string {
  return `presentation_access_${slug}`;
}
