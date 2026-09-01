import type { APIRoute } from 'astro';

const posts = import.meta.glob('../blog/*.md', {
  eager: true,
  import: 'frontmatter'
});

export const GET: APIRoute = () => {
  const entries = Object.entries(posts)
    .filter(([, post]: any) => !post.draft)
    .sort(
      ([, a]: any, [, b]: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  if (entries.length === 0) {
    return new Response(
      JSON.stringify({ error: 'No hay entradas disponibles' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  const [filePath, latest]: any = entries[0];

  const slug = filePath
    .split('/')
    .pop()
    ?.replace('.md', '');

  return new Response(
    JSON.stringify({
      title: latest.title,
      description: latest.description ?? '',
      date: latest.date,
      tag: latest.tag ?? '',
      url: `https://bit-a-bitacora.vercel.app/blog/${slug}`
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};