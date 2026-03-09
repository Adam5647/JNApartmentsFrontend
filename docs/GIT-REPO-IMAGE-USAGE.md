# How the GitHub repo (JNApartmentsFrontend-git) uses images on the home page

Reference: `d:\MegSol\JNApartment\JNApartmentsFrontend-git`. Image paths come from `src/data/content.ts` via a helper:

```ts
const asset = (path: string) => `/assets/images/JN%20Apartments/${encodeURI(path)}`;
```

So all repo images are **public URLs** under `/assets/images/JN Apartments/...` (files live in `public/assets/images/JN Apartments/` in that repo).

---

## 1. Hero section (`src/sections/Hero.tsx`)

| Use            | Type        | How |
|----------------|-------------|-----|
| **Background** | Full-bleed  | `<motion.img>` inside `absolute inset-0` div; full width/height, `object-cover`. Gradient overlay on top. |
| **Source**     | `generalGallery[0]` | In content: `asset("1.JPG")` → `/assets/images/JN%20Apartments/1.JPG` |

**Pattern:** Single `<img>` as full-section background with overlay; no `background-image` CSS.

---

## 2. Experiences section (`src/sections/Experiences.tsx`)

Bento grid of **four cards**. Each card uses an **image inside the card** (not CSS background).

| Card              | Layout        | Image use |
|-------------------|---------------|-----------|
| **1 – Warm lobby (Featured)** | Large (md:col-span-7, row-span-2) | `<motion.img>` in `absolute inset-0`; `object-cover`; gradient overlays (bottom-right + hover). Text in `relative` layer at bottom. |
| **2 – Cozy living**          | Medium (md:col-span-5)            | Same: `absolute inset-0` + `<motion.img>`, `opacity-40` (hover 60%), gradient `from-slate-900/60 to-slate-900/90`. |
| **3 – Home-style kitchens**  | Medium (md:col-span-5)            | Same as card 2. |
| **4 – Safe on-site parking** | Wide (md:col-span-12 lg:col-span-7) | Same pattern; horizontal gradient `from-slate-900/90 via... to-slate-900/40`. |

**Image source (content.ts):**

- Card 1: `experiences[0].image` → `asset("General Pictures (Reception, Lobby, Common Room)/Reception_.jpg")`
- Card 2: `experiences[1].image` → Living room image (1BHK)
- Card 3: `experiences[2].image` → Kitchen image (2BHK)
- Card 4: `experiences[3].image` → `asset("General Pictures (Reception, Lobby, Common Room)/Parking_(1).jpg")`

**Modal:** Clicking a card opens a modal; header uses `<img src={selectedExperience.image}>` in a fixed-height block (`h-48 sm:h-64 md:h-72 lg:h-96`), `object-cover`.

**Pattern:** Every experience card = **container** with an **`<img>`** (or `<motion.img>`) filling the card area and overlays for text. No `background-image` in this section.

---

## 3. Community section (`src/sections/Community.tsx`)

| Use   | Type   | How |
|-------|--------|-----|
| **Right column** | Container | Single `<img>` inside `aspect-[3/4]` div, `rounded-2xl`, `object-cover`. A “Signature programming” card overlaps at the bottom. |
| **Source** | External | Hardcoded Unsplash URL (hotel/communal spaces). |

**Pattern:** One **img in a container** (not background). No assets from `content.ts` here.

---

## 4. Residences section (`src/sections/Residences.tsx`) — when on home

| Use   | Type   | How |
|-------|--------|-----|
| **Per residence card** | Card image | `<img src={residence.image}>` in a fixed-height block (`h-48 sm:h-56 md:h-64 lg:h-72`), `object-cover`, gradient overlay at bottom. |
| **Source** | content.ts | `residences[].image` → `asset("Room 101-104.../Living room.jpg")` etc. |

**Pattern:** **Card**: top part of each card is an **img**; text and buttons below.

---

## 5. Gallery section (`src/sections/Gallery.tsx`) — when on home

| Use   | Type   | How |
|-------|--------|-----|
| **Grid items** | Card/container | `<motion.img src={image}>` per grid cell; `aspect-[4/3]`, `object-cover`; gradient overlay; hover scale. |
| **Source** | content.ts | `galleryImages` (includes `generalGallery` plus room images). |

**Pattern:** **Grid of containers**; each cell is an **img** with overlay and hover effect.

---

## Summary table (home page)

| Section     | Image role   | Implementation        | Source |
|------------|--------------|------------------------|--------|
| **Hero**   | Background   | `<img>` full-bleed + overlay | `generalGallery[0]` → `1.JPG` |
| **Experiences** | Card backgrounds (4 cards) | `<motion.img>` inside each card + overlays | `experiences[].image` (Reception, Living room, Kitchen, Parking) |
| **Experiences modal** | Header image | `<img>` in fixed-height block | `selectedExperience.image` |
| **Community** | Right column visual | `<img>` in aspect box | Unsplash URL |
| **Residences** | Card image per residence | `<img>` in fixed-height block | `residences[].image` |
| **Gallery** | Grid cell image | `<motion.img>` per cell | `galleryImages[]` |

---

## Takeaways for your project (JNApartmentsFrontend-main)

1. **Hero:** Git uses an **`<img>`** for the hero background; your main project uses **CSS `background-image`** with `/assets/images/1.JPG`. Both are valid; your approach avoids an extra DOM node.
2. **Experiences:** Git uses **one `<img>` per card** inside the card container with overlays. You use a **CSS background** for the featured (Warm lobby) card and icon+text for the rest. To mirror git: use an `<img>` (or motion.img) per experience card with the same overlay style.
3. **Community:** Git uses a single **`<img>`** in an aspect-ratio container (Unsplash). You already use the same Unsplash URL in an `<img>` in the right column.
4. **Paths:** In git, all paths go through `asset()` → `/assets/images/JN%20Apartments/...`. In your app you use `/assets/images/...` under `public/`; ensure the same folder structure under `public/assets/images/` if you want to reuse the same filenames (e.g. `Reception_.jpg`, `1.JPG`).
