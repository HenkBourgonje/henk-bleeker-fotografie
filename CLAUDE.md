# Henk Bleeker Photography

Static Astro site: home (hero, gallery, lightbox with a mailto "Enquire" button), a page per photo (`/work/<file>/`, `src/pages/[...lang]/work/[photo].astro`; it and the lightbox both show `src/PhotoView.astro`, and the lightbox puts that page's address in the address bar) and text pages (about, wetlands-gallery). A text page is `src/text/<page>/<lang>.md` (`title`, `photo` and `description` — the search snippet, a sentence from the text — in the frontmatter, text as the body), rendered by `src/pages/[...lang]/[page].astro`; its header link sits in `src/Layout.astro`. News is `src/news/<slug>/<lang>.md` (`title`, `date`, `photo`, `description` in the frontmatter), listed as cards at `/news/` and shown at `/news/<slug>/`; read through `src/news.js`. A photo with `"pages": [[w, h], …]` (the magazine, the flyer) pages through in `src/Viewer.astro`: page 1 is `<file>`, page n `<file>-n`. Shared header/footer, meta tags and schema.org data in `src/Layout.astro`; `sitemap.xml` and `llms.txt` (the site as Markdown for language models) are built from the same texts and `src/photos.json` by `src/pages/*.js`. Email and Instagram in `src/contact.js`. Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

Bilingual: Dutch (default) at the root, English under `/en/`, both built from `src/pages/[...lang]/`. Interface strings sit in a `t` object at the top of each file. Every text exists in `nl` and `en`; translations keep the Dutch voice (first person, plain, unpolished). "Enquire" stays English in both.

## Adding a photo

1. Put the original in `DW website/` (gitignored, never commit originals), under a plain name (no spaces). The script reads jpg and tif only, so convert a PSD first: `sips -s format tiff x.psd --out x.tif`.
2. Run `./resize-heroes.sh` — writes `public/photos/<name>-<width>.{jpg,avif}`, `<name>` being the lowercased filename. It skips damaged originals; ask for a fresh copy.
3. Add `{ "file", "title", "width", "height" }` to `src/photos.json`, with the original's pixel size (`vipsheader -f width <file>` / `-f height`).
   The title goes into the enquiry email, so ask for the real title rather than inventing one.
   Optional: `"collection": "<slug>"` and `"text": { "nl": "…", "en": "…" }` (the photo's own story).
4. `npm run build` to check.

Order in `src/photos.json` is the gallery order. The hero photo is picked in `src/pages/index.astro`.

Collections are `src/collections/<lang>/<slug>.md`: `title` in the frontmatter, the story as the body. The lightbox shows the photo text and the collection story when they exist, and nothing when they don't. An unknown slug fails the build.
