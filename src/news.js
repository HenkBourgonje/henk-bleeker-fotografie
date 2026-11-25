// news articles, src/news/<slug>/<lang>.md: title, date, photo and description (the search snippet) in the frontmatter, the text as the body
// a photo with "pages" pages through like the magazine (see Viewer.astro)
const base = import.meta.env.BASE_URL;
const all = Object.entries(import.meta.glob('./news/*/*.md', { eager: true })).map(([path, md]) => {
  const [, slug, lang] = path.match(/([^/]+)\/(nl|en)\.md$/);
  return { slug, lang, md };
});

// newest first (date: YYYY-MM-DD); on the same date, by folder name
export const news = (lang) => all.filter((a) => a.lang === lang).sort((a, b) => new Date(b.md.frontmatter.date) - new Date(a.md.frontmatter.date));
export const newsPath = (slug, lang) => `${base}${lang === 'en' ? 'en/' : ''}news/${slug}/`;
