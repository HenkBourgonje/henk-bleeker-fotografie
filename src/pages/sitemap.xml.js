import photos from '../photos.json';

// every page in both languages; the photos are listed on the home pages, where they're shown
const pages = Object.keys(import.meta.glob('../text/*/nl.md')).map((f) => f.split('/')[2]);

export const GET = ({ site }) => {
  const url = (path) => new URL(import.meta.env.BASE_URL + path, site).href;
  const images = photos.map((p) => `<image:image><image:loc>${url(`photos/${p.file}-1280.jpg`)}</image:loc></image:image>`).join('');
  const entries = ['', 'en/'].flatMap((home) => [
    `<url><loc>${url(home)}</loc>${images}</url>`,
    ...pages.map((page) => `<url><loc>${url(`${home}${page}/`)}</loc></url>`),
  ]);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
