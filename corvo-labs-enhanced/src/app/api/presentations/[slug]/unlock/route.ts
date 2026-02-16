import { NextResponse } from 'next/server';

import {
  getPresentation,
  getPresentationAccessCookieName,
  getPresentationPassword,
} from '@/lib/presentations';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const presentation = getPresentation(slug);

  if (!presentation) {
    return NextResponse.json({ error: 'Presentation not found.' }, { status: 404 });
  }

  const expectedPassword = getPresentationPassword(slug);

  if (!expectedPassword) {
    return NextResponse.json({ ok: true });
  }

  const body = (await request.json()) as { password?: string };

  if (body.password !== expectedPassword) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getPresentationAccessCookieName(slug), 'true', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: `/presentations/${slug}`,
    maxAge: 60 * 60 * 6,
  });

  return response;
}
