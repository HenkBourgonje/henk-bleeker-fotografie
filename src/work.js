// a photo's own page, src/pages/[...lang]/work/[photo].astro (the home page's lightbox shows the same)
const base = import.meta.env.BASE_URL;
export const workPath = (p, lang) => `${base}${lang === 'en' ? 'en/' : ''}work/${p.file}/`;

// the photo for search engines, with Henk's credit for image search
export const imageObject = (p, lang, site) => ({
  '@type': 'ImageObject',
  contentUrl: new URL(`${base}photos/${p.file}-1280.jpg`, site).href,
  url: new URL(workPath(p, lang), site).href,
  name: p.title,
  creator: { '@type': 'Person', name: 'Henk Bleeker' },
  creditText: 'Henk Bleeker',
  copyrightNotice: '© Henk Bleeker',
});
