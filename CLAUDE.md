# Henk Bleeker Photography

Static Astro site: home (hero, gallery, lightbox with a mailto "Enquire" button) and about (Dutch bio from his old Squarespace site). Shared header/footer in `src/Layout.astro`, email and Instagram in `src/contact.js`. Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Adding a photo

1. Put the original in `DW website/` (gitignored, never commit originals).
2. Run `./resize-heroes.sh` — writes `public/photos/<name>-<width>.{jpg,avif}`, `<name>` being the lowercased filename. It skips damaged originals; ask for a fresh copy.
3. Add `{ "file", "title", "width", "height" }` to `src/photos.json`, with the original's pixel size (`vipsheader -f width <file>` / `-f height`).
   The title goes into the enquiry email, so ask for the real title rather than inventing one.
4. `npm run build` to check.

Order in `src/photos.json` is the gallery order. The hero photo is picked in `src/pages/index.astro`.
