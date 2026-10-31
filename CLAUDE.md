# Henk Bleeker Photography

Static Astro site: home (hero, gallery, lightbox with a mailto "Enquire" button) and about (bio from his old Squarespace site in `src/about/<lang>.md`). Shared header/footer in `src/Layout.astro`, email and Instagram in `src/contact.js`. Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

Bilingual: Dutch (default) at the root, English under `/en/`, both built from `src/pages/[...lang]/`. Interface strings sit in a `t` object at the top of each file. Every text exists in `nl` and `en`; translations keep the Dutch voice (first person, plain, unpolished). "Enquire" stays English in both.

## Adding a photo

1. Put the original in `DW website/` (gitignored, never commit originals).
2. Run `./resize-heroes.sh` — writes `public/photos/<name>-<width>.{jpg,avif}`, `<name>` being the lowercased filename. It skips damaged originals; ask for a fresh copy.
3. Add `{ "file", "title", "width", "height" }` to `src/photos.json`, with the original's pixel size (`vipsheader -f width <file>` / `-f height`).
   The title goes into the enquiry email, so ask for the real title rather than inventing one.
   Optional: `"collection": "<slug>"` and `"text": { "nl": "…", "en": "…" }` (the photo's own story).
4. `npm run build` to check.

Order in `src/photos.json` is the gallery order. The hero photo is picked in `src/pages/index.astro`.

Collections are `src/collections/<lang>/<slug>.md`: `title` in the frontmatter, the story as the body. The lightbox shows the photo text and the collection story when they exist, and nothing when they don't. An unknown slug fails the build.
