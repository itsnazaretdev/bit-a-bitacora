import type { APIRoute } from 'astro';

const BLOG_URL = 'https://bit-a-bitacora.vercel.app';

export const GET: APIRoute = async () => {
  const todasLasEntradas = await Astro.glob('../blog/*.md');

  const posts = todasLasEntradas
    .filter((post) => !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  const latest = posts[0];

  if (!latest) {
    return new Response(
      JSON.stringify({ error: 'No hay entradas disponibles' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      title: latest.frontmatter.title,
      description: latest.frontmatter.description ?? '',
      date: latest.frontmatter.date,
      tag: latest.frontmatter.tag ?? '',
      url: `${BLOG_URL}${latest.url}`,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

