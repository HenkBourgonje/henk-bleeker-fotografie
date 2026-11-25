import photos from '../photos.json';
import { workPath } from '../work.js';
import { news, newsPath } from '../news.js';

// every page in both languages: home, the text pages, the news and each photo's own page, with the images each shows
const pages = Object.keys(import.meta.glob('../text/*/nl.md')).map((f) => f.split('/')[2]);

export const GET = ({ site }) => {
  const url = (path) => new URL(import.meta.env.BASE_URL + path, site).href;
  const image = (p) => `<image:image><image:loc>${url(`photos/${p.file}-1280.jpg`)}</image:loc></image:image>`;
  const entries = [
    ...['', 'en/'].flatMap((home) => [
      `<url><loc>${url(home)}</loc>${photos.map(image).join('')}</url>`,
      ...[...pages, 'news'].map((page) => `<url><loc>${url(`${home}${page}/`)}</loc></url>`),
    ]),
    ...['nl', 'en'].flatMap((lang) => news(lang).map((a) => `<url><loc>${new URL(newsPath(a.slug, lang), site).href}</loc></url>`)),
    ...['nl', 'en'].flatMap((lang) => photos.map((p) => `<url><loc>${new URL(workPath(p, lang), site).href}</loc>${image(p)}</url>`)),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
