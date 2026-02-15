import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type PresentationConfig = {
  title: string;
  fileName: string;
  password?: string;
};

const presentations: Record<string, PresentationConfig> = {
  'growth-vanguard-intro': {
    title: 'Growth Vanguard Intro',
    fileName: 'growth-vanguard-intro.html',
    password: 'gvcl',
  },
};

export function getPresentation(slug: string): PresentationConfig | null {
  return presentations[slug] ?? null;
}

export async function getPresentationHtml(fileName: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'src/content/presentations', fileName);
  return readFile(filePath, 'utf8');
}
