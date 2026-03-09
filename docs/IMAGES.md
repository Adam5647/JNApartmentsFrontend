# How images are used in this project

This project uses **two** ways to include images, depending on where they live.

---

## 1. Public folder (recommended for images from git)

**Location:** `public/assets/images/`

- Files here are **copied as-is** into the build and served from the site root.
- **URL:** Use a path starting with `/assets/images/...` (no `public` in the URL).

**Examples in the repo:**

| File on disk | Use in code |
|--------------|-------------|
| `public/assets/images/logo.png` | `<img src="/assets/images/logo.png" />` or `href="/assets/images/logo.png"` |
| `public/assets/images/1.JPG` | `url('/assets/images/1.JPG')` or `src="/assets/images/1.JPG"` |
| `public/assets/images/JN Apartments/1.JPG` | `url('/assets/images/JN Apartments/1.JPG')` |
| `public/.../General Pictures (Reception, Lobby, Common Room)/Reception_.jpg` | Experiences “Warm lobby welcome” card |

**Where it’s used:**

- **Favicon:** `index.html` → `href="/assets/images/logo.png"`
- **Nav logo:** `src/components/Home/Nav.tsx` → `src="/assets/images/logo.png"`
- **Hero background:** `src/components/Home/HeroSection.tsx` → `/assets/images/1.JPG`
- **Experiences – Featured “Warm lobby welcome”:** `ExperiencesSection.tsx` → Reception image under `public/assets/images/` (see table).

**README in repo:** `public/assets/images/README.txt` says to place the hero image `1.JPG` here. So images “from git” are expected in **`public/assets/images/`**.

---

## 2. Imported assets (Vite-bundled)

**Location:** `src/assets/images/` (or any folder under `src/`)

- You **import** the file in JS/TS; Vite will process it and output it (e.g. with a hash).
- You get a **string URL** back from the import.

**Example:**

```ts
// File: src/assets/images/JN Apartments/1.JPG
import heroBg from "../../../assets/images/JN Apartments/1.JPG";
// use: url(${heroBg}) or src={heroBg}
```

**Where it was used:** The hero used to import from `../../../assets/images/JN Apartments/1.JPG`, which points at **`src/assets/images/JN Apartments/1.JPG`**. There is no `src/assets` folder in the repo, so that import only works if you add that folder and file.

**TypeScript:** `src/env.d.ts` declares `declare module "*.JPG"` so importing `.JPG` files type-checks.

**Vite:** `vite.config.ts` has `assetsInclude: ["**/*.JPG", ...]` so uppercase `.JPG` is treated as an asset.

---

## Summary

| Source of image | Put file in | Use in code |
|-----------------|------------|-------------|
| From git / static assets | `public/assets/images/` | Path `/assets/images/...` (string, no import) |
| Bundled with app (optional) | `src/assets/images/` | `import img from "@/assets/images/..."` or relative path |

For **images that come from git** and are shared (logo, hero, reception, etc.), use **`public/assets/images/`** and reference them with **`/assets/images/...`**. If your files are under `assets/images/` at the project root (e.g. from another repo or git submodule), copy or symlink that tree into **`public/assets/images/`** so the same paths work (e.g. `public/assets/images/JN Apartments/General Pictures (Reception, Lobby, Common Room)/Reception_.jpg`).

**External images (e.g. Unsplash):** The Community section (“Culture-forward programming”) uses an external URL in `CommunitySection.tsx`; no file is stored in the repo.

---

## Other pages (Gallery, Suites, Services, Testimonials, Bookings)

- **Content and image paths** live in **`src/data/content.ts`**. The `asset(path)` helper builds URLs like `/assets/images/JN%20Apartments/...` for files under `public/assets/images/JN Apartments/`.
- **Gallery page** (`/gallery`): uses `generalGallery`, `galleryImages`, and `suites` from content; hero background = `generalGallery[0]`; category grids use image arrays from content.
- **Suites page** (`/suites`): uses `suites` from content; hero background = `suites[0].images[1]`; room cards use `room.images[]`; lightbox uses same arrays.
- **Services page** (`/services`): uses `services`, `amenities`, `generalGallery`, `suites`; example block image = `suites[0].images[1]` or `generalGallery[0]`.
- **Testimonials page** (`/testimonials`): hero background = `testimonialsHeroImage` (Unsplash URL from content); cards use `testimonialsPageList[].image` (Unsplash avatars).
- **Bookings page** (`/bookings`): hero background = `bookingsHeroImage` (Unsplash URL from content).

Place the same folder structure as in the git repo under **`public/assets/images/JN Apartments/`** so all `asset(...)` paths resolve.
