import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID;

    if (!clientId) {
      return new Response('GitHub client ID not configured', { status: 500 });
    }

    const url = new URL(request.url);
    const redirectUrl = new URL('https://github.com/login/oauth/authorize');

    redirectUrl.searchParams.set('client_id', clientId);
    redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
    redirectUrl.searchParams.set('scope', 'repo user');
    redirectUrl.searchParams.set(
      'state',
      crypto.getRandomValues(new Uint8Array(12)).join(''),
    );

    return Response.redirect(redirectUrl.href, 301);
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
