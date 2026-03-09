# Content & context audit

Single source of truth for copy and image paths: **`src/data/content.ts`**.

---

## Available in `content.ts`

| Export | Used by | Notes |
|--------|---------|--------|
| `navigationLinks` | Reference (Nav uses its own `NAV_LINKS` with `to`) | Label + href for Suites, Gallery, Services, Testimonials |
| `heroStats` | HeroSection | Convertible suites, nightly rates, parking |
| `residences` | — | 4 residence cards (1BHK/2BHK lower/upper); for future Residences section or pages |
| `suites` | SuitesPage, GalleryPage, ServicesPage | Room types with images, amenities, rates |
| `suiteInventory` | — | baseUnits, capacities, rates (for copy or booking logic) |
| `generalGallery` | GalleryPage, ServicesPage | General property images (hero, grids) |
| `galleryImages` | GalleryPage | Extended gallery set |
| `experiences` | ExperiencesSection (home) | 4 bento cards + modal (images via `asset()`) |
| `communityHighlights` | CommunitySection (home) | 3 highlight cards |
| `communityImage` | CommunitySection (home) | Unsplash URL for right column |
| `futureForward` | — | 3 bullet blocks (always-on support, stay your way, comfort basics) |
| `sustainabilityHighlights` | — | 3 items (water heating, access, housekeeping) |
| `testimonials` | VoicesSection (home) | 5 quotes for carousel (name, role, quote) |
| `amenities` | ServicesPage, BookSection | List of amenity strings |
| `services` | ServicesPage, ExperiencesSection (pills) | 6 services (title, description, icon key) |
| `testimonialsPageList` | TestimonialsPage | 3 cards with image URL, name, role, quote, rating |
| `testimonialsHeroImage` | TestimonialsPage | Unsplash hero background |
| `bookingsHeroImage` | BookingsPage | Unsplash hero background |

---

## Pages and content usage

| Route | Page | Content from `content.ts` |
|-------|------|---------------------------|
| `/` | HomePage | heroStats, experiences, communityHighlights, communityImage, testimonials |
| `/gallery` | GalleryPage | generalGallery, galleryImages, suites |
| `/suites` | SuitesPage | suites |
| `/services` | ServicesPage | services, generalGallery, suites, amenities |
| `/testimonials` | TestimonialsPage | testimonialsPageList, testimonialsHeroImage |
| `/bookings` | BookingsPage | bookingsHeroImage |

---

## Images

- **Local:** Paths use `asset("JN Apartments/...")` → `/assets/images/JN%20Apartments/...`. Place files under `public/assets/images/JN Apartments/` (same folder structure as in the git repo).
- **External:** Community, Testimonials hero, Bookings hero, and testimonial avatars use full URLs (e.g. Unsplash); no local files needed.

See **`docs/IMAGES.md`** for details.

---

## In git repo but not in this project (yet)

- **RentalPage** – Long-term rental units (different product; content is inline Unsplash + copy).
- **GuestReviewForm** – `/submit-review/:token`; guest review submission (needs backend/token flow).
- **Customer account** – `/account/login`, `/account/register`, `/account/bookings` (auth + my-bookings).
- **PublicHomePage / ShortStayPage** – Git uses these names; this project uses HomePage and SuitesPage with the same content ideas.

All **public-facing copy and image paths** from the git repo that apply to JN Apartments nightly stays are now in **`content.ts`** or the listed pages.
