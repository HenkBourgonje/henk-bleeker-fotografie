import photos from '../photos.json';
import { EMAIL, INSTAGRAM } from '../contact.js';
import { workPath } from '../work.js';

// llmstxt.org: the whole site as one Markdown file for language models, in English, from the same texts as the pages
const texts = import.meta.glob('../text/*/en.md', { eager: true });
const collections = import.meta.glob('../collections/en/*.md', { eager: true });
const collection = (slug) => collections[`../collections/en/${slug}.md`].frontmatter.title;
// the text without its images, its headings one level down to sit under this file's
const body = (md) => md.rawContent().replace(/!\[.*?\]\(.*?\)\s*/g, '').replace(/^(#+ )/gm, '#$1').trim();

export const GET = ({ site }) => {
  const url = (path) => new URL(import.meta.env.BASE_URL + path, site).href;
  const pages = Object.entries(texts).map(([f, md]) => ({ md, url: url(`en/${f.split('/')[2]}/`) }));
  return new Response(`# Henk Bleeker Photography

> ${texts['../text/about/en.md'].frontmatter.description}

- Website: ${url('en/')} (English), ${url('')} (Dutch)
- Email: ${EMAIL} (to enquire about a print, name the photo's title)
- Instagram: ${INSTAGRAM}

## Pages

${pages.map((p) => `- [${p.md.frontmatter.title}](${p.url}): ${p.md.frontmatter.description}`).join('\n')}
- [Work](${url('en/')}): ${photos.length} photographs

${pages.map((p) => `## ${p.md.frontmatter.title}\n\n${body(p.md)}`).join('\n\n')}

## Collections

${Object.values(collections).map((c) => `### ${c.frontmatter.title}\n\n${body(c)}`).join('\n\n')}

## Photographs

${photos.map((p) => `- [${p.title}](${new URL(workPath(p, 'en'), site).href})${p.collection ? `, ${collection(p.collection)}` : ''}`).join('\n')}
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
