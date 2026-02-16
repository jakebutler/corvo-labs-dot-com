import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type PresentationConfig = {
  title: string;
  fileName: string;
  passwordEnvVar?: string;
};

const presentations: Record<string, PresentationConfig> = {
  'growth-vanguard-intro': {
    title: 'Growth Vanguard Intro',
    fileName: 'growth-vanguard-intro.html',
    passwordEnvVar: 'GROWTH_VANGUARD_INTRO_PASSWORD',
  },
};

export function getPresentation(slug: string): PresentationConfig | null {
  return presentations[slug] ?? null;
}

export async function getPresentationHtml(fileName: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'src/content/presentations', fileName);
  return readFile(filePath, 'utf8');
}

export function getPresentationPassword(config: PresentationConfig): string | null {
  if (!config.passwordEnvVar) {
    return null;
  }

  const password = process.env[config.passwordEnvVar];
  return password?.trim() ? password : null;
}

export function getPresentationAccessCookieName(slug: string): string {
  return `presentation_access_${slug}`;
}
