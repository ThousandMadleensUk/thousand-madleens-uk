import { NextRequest } from 'next/server';

export const runtime = 'edge';

function renderBody(status: string, content: any) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' }
  });
}

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return new Response('GitHub OAuth not configured', { status: 500 });
    }

    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response('Missing authorization code', { status: 400 });
    }

    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'cloudflare-github-oauth',
          'accept': 'application/json',
        },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
      },
    );

    const result = await response.json();

    if (result.error) {
      return renderBody('error', result);
    }

    const token = result.access_token;
    return renderBody('success', { token, provider: 'github' });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
