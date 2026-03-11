/**
 * Shared content and image paths for all pages.
 * Images: place files under public/assets/images/JN Apartments/ (same folder structure as paths below).
 * URL helper: asset("path/to/file.jpg") → /assets/images/JN%20Apartments/path/to/file.jpg
 */
const asset = (path: string) =>
  `/assets/images/JN%20Apartments/${encodeURI(path)}`;

const LOWER_1BHK = "Room 101-104 (Deluxe Non-AC)1BHK ₹3000-2BHK₹4500-night/1BHK@ Rs.3000-night";
const LOWER_2BHK = "Room 101-104 (Deluxe Non-AC)1BHK ₹3000-2BHK₹4500-night/2BHK@ Rs. 4500-night";
const UPPER_1BHK = "Room 201-204 (Deluxe Non-AC) 1BHK-₹3000-2BHK-₹4500-night/1BHK@ Rs.3000-night";
const UPPER_2BHK = "Room 201-204 (Deluxe Non-AC) 1BHK-₹3000-2BHK-₹4500-night/2BHK@ Rs.4500-night";

export const navigationLinks = [
  { label: "Suites", href: "/suites" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
];

export const heroStats = [
  { label: "Convertible suites", value: "8 (1BHK / 2BHK)" },
  { label: "Nightly rates", value: "₹3,000 · ₹4,500" },
  { label: "Parking", value: "On-site gated" },
];

export const residences = [
  {
    name: "1BHK Deluxe · Lower Floor",
    description:
      "Cozy one-bedroom with living area, kitchenette, and balcony access in the Deluxe Non-AC wing on the lower floor.",
    size: "Approx. 650 sq ft",
    sleeps: "Up to 3 guests",
    image: asset(`${LOWER_1BHK}/Living room.jpg`),
    perks: ["₹3,000 per night", "Private living area", "Kitchenette", "Housekeeping"],
    rentalTypes: ["nightly"],
  },
  {
    name: "2BHK Deluxe · Lower Floor",
    description:
      "Full two-bedroom flat with living room and kitchen. Perfect for families or small groups on the lower floor wing.",
    size: "Approx. 950 sq ft",
    sleeps: "Up to 6 guests",
    image: asset(`${LOWER_2BHK}/Livingroom.jpg`),
    perks: ["₹4,500 per night", "Two bedrooms", "Full kitchen", "Geyser & Wi‑Fi"],
    rentalTypes: ["nightly"],
  },
  {
    name: "1BHK Deluxe · Upper Floor",
    description:
      "Upper-floor one-bedroom with bright living space and kitchenette. Scenic second-floor corridor suites.",
    size: "Approx. 650 sq ft",
    sleeps: "Up to 3 guests",
    image: asset(`${UPPER_1BHK}/Living room.jpg`),
    perks: ["₹3,000 per night", "Upper-floor views", "Kitchenette", "Daily service"],
    rentalTypes: ["nightly"],
  },
  {
    name: "2BHK Deluxe · Upper Floor",
    description:
      "Second-floor two-bedroom with larger living room and privacy doors—great for groups seeking a full flat with views.",
    size: "Approx. 950 sq ft",
    sleeps: "Up to 6 guests",
    image: asset(`${UPPER_2BHK}/Livingroom.jpg`),
    perks: ["₹4,500 per night", "Two bedrooms", "Family lounge", "Kitchen"],
    rentalTypes: ["nightly"],
  },
];

export const suites = [
  {
    id: "1bhk-101",
    name: "1BHK Deluxe — Lower Floor",
    type: "1BHK",
    floor: "First floor",
    nightlyRate: 3000,
    totalUnits: 4,
    images: [
      asset(`${LOWER_1BHK}/Bedroom.jpg`),
      asset(`${LOWER_1BHK}/Living room.jpg`),
      asset(`${LOWER_1BHK}/Kitchen.jpg`),
      asset(`${LOWER_1BHK}/Bathroom_.jpg`),
    ],
    amenities: ["Living area", "Kitchenette", "Geyser", "Wi‑Fi"],
    maxGuests: 3,
  },
  {
    id: "2bhk-101",
    name: "2BHK Deluxe — Lower Floor",
    type: "2BHK",
    floor: "First floor",
    nightlyRate: 4500,
    totalUnits: 4,
    images: [
      asset(`${LOWER_2BHK}/Bedroom.jpg`),
      asset(`${LOWER_2BHK}/Bedroom_.jpg`),
      asset(`${LOWER_2BHK}/Livingroom.jpg`),
      asset(`${LOWER_2BHK}/Kitchen.jpg`),
      asset(`${LOWER_2BHK}/Bathroom_.jpg`),
      asset(`${LOWER_2BHK}/14.JPG`),
    ],
    amenities: ["Two bedrooms", "Full kitchen", "Dining nook", "Wi‑Fi"],
    maxGuests: 6,
  },
  {
    id: "1bhk-201",
    name: "1BHK Deluxe — Upper Floor",
    type: "1BHK",
    floor: "Second floor",
    nightlyRate: 3000,
    totalUnits: 4,
    images: [
      asset(`${UPPER_1BHK}/Bedroom.jpg`),
      asset(`${UPPER_1BHK}/Living room.jpg`),
      asset(`${UPPER_1BHK}/Kitchen.jpg`),
      asset(`${UPPER_1BHK}/Bathroom_.jpg`),
    ],
    amenities: ["Living area", "Kitchenette", "Hot water", "Wi‑Fi"],
    maxGuests: 3,
  },
  {
    id: "2bhk-201",
    name: "2BHK Deluxe — Upper Floor",
    type: "2BHK",
    floor: "Second floor",
    nightlyRate: 4500,
    totalUnits: 4,
    images: [
      asset(`${UPPER_2BHK}/Bedroom.jpg`),
      asset(`${UPPER_2BHK}/Bedroom_.jpg`),
      asset(`${UPPER_2BHK}/Livingroom.jpg`),
      asset(`${UPPER_2BHK}/Kitchen.jpg`),
      asset(`${UPPER_2BHK}/Bathroom.jpg`),
    ],
    amenities: ["Two bedrooms", "Family lounge", "Kitchen", "Wi‑Fi"],
    maxGuests: 6,
  },
];

export const suiteInventory = {
  baseUnits: 8,
  oneBhkCapacity: 16,
  twoBhkCapacity: 8,
  oneBhkRate: 3000,
  twoBhkRate: 4500,
};

export const generalGallery = [
  asset("1.JPG"),
  asset("2.JPG"),
  asset("3.JPG"),
  asset("5.JPG"),
  asset("General Pictures (Reception, Lobby, Common Room)/Lobby.jpg"),
  asset("General Pictures (Reception, Lobby, Common Room)/Reception_.jpg"),
  asset("General Pictures (Reception, Lobby, Common Room)/Parking_.jpg"),
  asset("General Pictures (Reception, Lobby, Common Room)/Parking_(1).jpg"),
];

export const galleryImages = [
  ...generalGallery,
  asset(`${LOWER_1BHK}/Living room.jpg`),
  asset(`${LOWER_1BHK}/Bedroom.jpg`),
  asset(`${LOWER_1BHK}/Kitchen.jpg`),
  asset(`${LOWER_1BHK}/Bathroom_.jpg`),
  asset(`${UPPER_1BHK}/Living room.jpg`),
  asset(`${UPPER_1BHK}/Bedroom.jpg`),
  asset(`${LOWER_2BHK}/Livingroom.jpg`),
  asset(`${LOWER_2BHK}/Bedroom.jpg`),
  asset(`${LOWER_2BHK}/Bedroom_.jpg`),
  asset(`${LOWER_2BHK}/Kitchen.jpg`),
  asset(`${LOWER_2BHK}/Bathroom_.jpg`),
  asset(`${UPPER_2BHK}/Livingroom.jpg`),
  asset(`${UPPER_2BHK}/Bedroom.jpg`),
  asset(`${LOWER_2BHK}/14.JPG`),
];

/** Building & exterior gallery – WEBSITE PHOTO only (no overlap with other sections). */
export const exteriorGallery = [
  asset("General Pictures (Reception, Lobby, Common Room)/Parking_(1).jpg"),
  asset("General Pictures (Reception, Lobby, Common Room)/Parking_.jpg"),
  asset("General Pictures (Reception, Lobby, Common Room)/Lobby.jpg"),
  asset(`${UPPER_2BHK}/Livingroom.jpg`),
  asset(`${LOWER_2BHK}/14.JPG`),
  asset(`${UPPER_1BHK}/Living room.jpg`),
];

/** Featured gallery – 6 unique WEBSITE PHOTO images (no overlap with other sections). */
export const featuredGallery = [
  asset("1.JPG"),
  asset("2.JPG"),
  asset(`${LOWER_1BHK}/Living room.jpg`),
  asset(`${LOWER_2BHK}/Livingroom.jpg`),
  asset("General Pictures (Reception, Lobby, Common Room)/Reception_.jpg"),
  asset(`${UPPER_2BHK}/Bedroom.jpg`),
];

/** Experiences (home section): bento cards + modal. Images via asset(). */
export const experiences = [
  {
    title: "Warm lobby welcome",
    description:
      "Arrive to a bright reception, lounge seating, and friendly front-desk help for smooth check-ins.",
    image: asset("General Pictures (Reception, Lobby, Common Room)/Reception_.jpg"),
    fullDescription:
      "Experience a seamless arrival with our 24/7 reception service. Our welcoming lobby features comfortable lounge seating, complimentary refreshments, and a dedicated team ready to assist with check-ins, local recommendations, and any special requests. We ensure your stay begins on the right note.",
    features: ["24/7 Front Desk", "Luggage Storage", "Concierge Service", "Local Travel Assistance"],
  },
  {
    title: "Cozy living rooms",
    description:
      "Each suite offers a dedicated living area to unwind, stream, or host friends.",
    image: asset(`${LOWER_1BHK}/Living room.jpg`),
    fullDescription:
      "Every suite features a thoughtfully designed living space perfect for relaxation and entertainment. Sink into comfortable seating, enjoy your favorite shows on Smart TV, or gather with friends in a home-like atmosphere. The spacious layout provides the perfect balance between privacy and social interaction.",
    features: ["Smart TV Ready", "Comfortable Seating", "Reading Corner", "Work Desk Available"],
  },
  {
    title: "Home-style kitchens",
    description:
      "Cook simple meals with stocked kitchens, cookware, and storage for longer stays.",
    image: asset(`${LOWER_2BHK}/Kitchen.jpg`),
    fullDescription:
      "Prepare your favorite meals in fully-equipped kitchens designed for both quick snacks and elaborate cooking. Each kitchen comes with modern appliances, quality cookware, ample storage, and a dining area. Perfect for families and extended stays who want the comfort of home-cooked meals.",
    features: ["Full Cookware Set", "Gas Stove & Burner", "Refrigerator", "Dining Table", "Storage Cabinets"],
  },
  {
    title: "Safe on-site parking",
    description:
      "Gated parking bays on the property for cars and bikes with quick lobby access.",
    image: asset("General Pictures (Reception, Lobby, Common Room)/Parking_(1).jpg"),
    fullDescription:
      "Enjoy peace of mind with our secure, gated parking facility located right on the property. Whether you're traveling by car or bike, our well-lit parking area offers convenient and safe storage with 24/7 security monitoring. Direct access to the lobby ensures quick and easy entry to your suite.",
    features: ["Gated & Secure", "24/7 Security", "Car & Bike Spaces", "Well-lit Area", "Direct Lobby Access"],
  },
];

/** Services page: "Experiences that define your stay" — with images (alternating layout). */
export const servicesPageExperiences = [
  {
    title: "Premium Accommodations",
    description:
      "Our eight convertible 1BHK and 2BHK Deluxe Non-AC suites are spread across two floors, each thoughtfully designed for comfort and functionality. Whether you are travelling solo, as a couple, or with family and friends, you will find a layout that suits your needs. Every suite features modern furnishings, generous living areas, and private spaces that feel like home. Kitchen facilities in each unit allow you to prepare meals at your pace, while the spacious layouts and clean lines make longer stays comfortable and stress-free.",
    features: ["Modern furnishings", "Spacious layouts", "Private living areas", "Kitchen facilities"],
    image: asset(`${LOWER_1BHK}/Living room.jpg`),
  },
  {
    title: "In-House Dining",
    description:
      "Our on-site restaurant offers the convenience of breakfast, lunch, and dinner without leaving the property. The menu brings together local Meghalayan flavors and familiar comfort food, so you can start the day with a hearty meal, grab a quick bite between outings, or wind down with a full dinner. We cater to a range of preferences and dietary needs, and room service is available for those who prefer to dine in the comfort of their suite. Whether you are here for work or leisure, in-house dining makes every day easier.",
    features: ["Daily breakfast", "Local cuisine", "Room service", "Special diets"],
    image: asset(`${LOWER_2BHK}/Kitchen.jpg`),
  },
  {
    title: "Secure Parking",
    description:
      "Every booking includes access to our gated on-site parking facility, so you can leave your vehicle with peace of mind. The area is monitored around the clock with 24/7 security and CCTV coverage, and we offer ample covered and open spots for cars and two-wheelers. The parking zone is well-lit and within easy reach of the lobby, making arrivals and departures straightforward. There are no extra charges for parking—it is part of your stay.",
    features: ["24/7 security", "Covered spots", "CCTV monitoring", "Easy access"],
    image: asset("General Pictures (Reception, Lobby, Common Room)/Parking_(1).jpg"),
  },
  {
    title: "Exceptional Hospitality",
    description:
      "Our team is committed to warm, personalized service from the moment you arrive until you check out. The front desk is staffed 24/7 for check-ins, queries, and any assistance you might need. We share local tips, help with transport and bookings, and offer concierge-style support so you can make the most of Shillong and Meghalaya. Whether it is arranging a cab, suggesting places to visit, or handling a special request, we are here to make your stay smooth and memorable.",
    features: ["24/7 front desk", "Local guidance", "Concierge service", "Personal care"],
    image: asset("General Pictures (Reception, Lobby, Common Room)/Reception_.jpg"),
  },
  {
    title: "Daily Housekeeping",
    description:
      "Professional housekeeping keeps your suite in top condition throughout your stay. We use fresh linens, thorough cleaning routines, and eco-friendly products where possible, so your space stays clean and comfortable without a heavy environmental footprint. Service is available on a daily basis and can be tailored to your schedule; if you prefer a light touch or a specific time, our team will work around your plans. Just let the front desk know your preferences.",
    features: ["Daily cleaning", "Fresh linens", "Eco products", "On-request service"],
    image: asset(`${LOWER_1BHK}/Bedroom.jpg`),
  },
  {
    title: "High-Speed Connectivity",
    description:
      "Complimentary high-speed Wi-Fi is available throughout the property so you can stream, join video calls, and browse without interruption. The network is designed for reliability and coverage in every suite and common area, with a secure connection and no data caps. Whether you are working remotely, staying in touch with family, or planning the next day’s trip, you can count on a stable and fast connection for the duration of your stay.",
    features: ["Fiber internet", "All-suite coverage", "Secure network", "Unlimited data"],
    image: asset("General Pictures (Reception, Lobby, Common Room)/Lobby.jpg"),
  },
];

/** Services page: More Reasons to Stay */
export const moreReasonsToStay = [
  { title: "24/7 Security", description: "Round-the-clock CCTV & staff" },
  { title: "Flexible Check-in", description: "Arrive anytime after 2 PM" },
  { title: "Prime Location", description: "Central Shillong access" },
  { title: "Family Friendly", description: "Groups up to 6 welcomed" },
  { title: "Premium Bedding", description: "Hotel-quality linens" },
  { title: "Hot Water 24/7", description: "Instant geysers in all units" },
];

/** Services page: Every moment, well-crafted — 3 experience pillars */
export const everyMomentPillars = [
  {
    title: "Arrival Experience",
    tagline: "Seamless check-in and welcome",
    features: ["Gated parking on arrival", "Warm front-desk greeting", "Guided suite walkthrough"],
  },
  {
    title: "In-Stay Comfort",
    tagline: "Care that anticipates needs",
    features: ["Twice-daily housekeeping", "Room service meals", "Fiber Wi-Fi everywhere"],
  },
  {
    title: "Local Guidance",
    tagline: "Insider recommendations",
    features: ["Curated Shillong spots", "Car hire & routes", "On-call assistance"],
  },
];

/** Services page: Your Service Journey — 4 steps */
export const serviceJourneySteps = [
  {
    step: 1,
    title: "Book & Prep",
    description: "We pre-assign the right suite and prep amenities to your preferences.",
  },
  {
    step: 2,
    title: "Arrive & Settle",
    description: "Front desk greets, parking is guided, and we walk you through your suite.",
  },
  {
    step: 3,
    title: "Stay & Enjoy",
    description: "Housekeeping refresh, dining on-call, concierge for local plans.",
  },
  {
    step: 4,
    title: "Depart & Return",
    description: "Express checkout, luggage help, and return guest perks await you.",
  },
];

/** Services page: Why Guests Love Us — short highlights */
export const whyGuestsLoveUs = [
  "Instant responses",
  "Thoughtful housekeeping",
  "Warm greetings",
  "Local know-how",
  "Quiet corridors",
  "Comfortable bedding",
  "Reliable Wi-Fi",
  "Secure premises",
];

/** Community section (home): highlight cards. */
export const communityHighlights = [
  {
    title: "Made for families & teams",
    copy: "Mix and match 1BHK or full 2BHK layouts so families, friends, or work trips stay on the same floor.",
  },
  {
    title: "Shillong ready basecamp",
    copy: "Easy access to cafes, transport, and the city—use JN Apartments as a clean, reliable base for Meghalaya trips.",
  },
  {
    title: "Simple pricing",
    copy: "Transparent nightly rates: ₹3,000 for 1BHK, ₹4,500 for 2BHK. No hidden extras.",
  },
];

/** Community section hero image (local asset). */
export const communityImage = exteriorGallery[0];

/** Future-forward / promise bullets (for reuse). */
export const futureForward = [
  {
    title: "Always-on support",
    bullets: [
      "Reception contact for housekeeping and maintenance",
      "WhatsApp and phone coordination",
      "Arrival and parking assistance",
    ],
  },
  {
    title: "Stay your way",
    bullets: [
      "Choose 1BHK or unlock full 2BHK",
      "Flexible rooming for small or large groups",
      "Early check-in when available",
    ],
  },
  {
    title: "Comfort basics",
    bullets: [
      "Hot water, clean linens, and daily tidy-ups",
      "Reliable Wi‑Fi for work and streaming",
      "On-site parking with lighting",
    ],
  },
];

/** Sustainability / amenities highlights (for reuse). */
export const sustainabilityHighlights = [
  { label: "Water heating", value: "Geyser", description: "Instant hot water across suites" },
  { label: "Access", value: "Parking", description: "On-premise vehicle parking" },
  { label: "Housekeeping", value: "On request", description: "Flexible cleaning schedules" },
];

export const amenities = [
  "Dedicated reception & concierge",
  "Gated parking on-site",
  "High-speed Wi‑Fi across floors",
  "Housekeeping on request",
  "Hot water & geyser bathrooms",
  "Smart TV-ready living rooms",
  "Kitchenettes with essentials",
  "Power backup for common areas",
];

export const services = [
  {
    title: "Front desk assistance",
    description: "Check-in help, local tips, and coordination for cabs or errands.",
    icon: "front-desk",
  },
  {
    title: "Housekeeping",
    description: "Room refresh, linens, and bathroom cleaning on request.",
    icon: "housekeeping",
  },
  {
    title: "Transport help",
    description: "Cab coordination and guidance for parking on-site.",
    icon: "transport",
  },
  {
    title: "Simple dining setup",
    description: "Kitchenettes with cookware plus nearby food options guidance.",
    icon: "dining",
  },
  {
    title: "Reliable basics",
    description: "Wi‑Fi, geyser hot water, and backup lighting in common areas.",
    icon: "wifi",
  },
  {
    title: "Maintenance",
    description: "On-call help for fixtures, geyser, or appliance issues.",
    icon: "maintenance",
  },
];

/** Guest Stories for Testimonials page */
export const testimonialsGuestStories = [
  {
    id: 1,
    title: "A Photographer's Paradise",
    author: "Banaibor Kharmynthon",
    excerpt:
      "The panoramic views and natural light in the Skyline Penthouse provided the perfect backdrop for my photography workshop. The residents were welcoming and shared local insights that made my project truly authentic.",
    image: asset("1.JPG"),
  },
  {
    id: 2,
    title: "Digital Nomad's Dream",
    author: "Mao Oga",
    excerpt:
      "Three months in the Botanical Loft transformed how I work. The blend of nature, technology, and community created an environment where creativity flourished and work became more than just a task.",
    image: asset(`${LOWER_1BHK}/Living room.jpg`),
  },
  {
    id: 3,
    title: "Family Roots Rediscovered",
    author: "Wilson Kharkongor",
    excerpt:
      "Bringing my children to experience their ancestral home state was magical. JN Apartments provided the perfect modern comfort while connecting us deeply with Meghalaya's rich cultural heritage.",
    image: asset("General Pictures (Reception, Lobby, Common Room)/Lobby.jpg"),
  },
];

/** Hero background image for Testimonials page (distinct from Suites hero) */
export const testimonialsHeroImage = exteriorGallery[1] ?? exteriorGallery[0];

/** Hero background image for Bookings page (local asset) */
export const bookingsHeroImage = asset(
  "General Pictures (Reception, Lobby, Common Room)/Lobby.jpg"
);

/** Hero background image for Suites page (local asset) */
export const suitesHeroImage = exteriorGallery[0];
