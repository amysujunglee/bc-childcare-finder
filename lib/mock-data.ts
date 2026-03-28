export type AgeGroup = "infant" | "toddler" | "preschool" | "schoolAge";
export type ScheduleType = "full-time" | "part-time" | "drop-in";

export interface Centre {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  ageGroups: AgeGroup[];
  languages: string[];
  scheduleType: ScheduleType;
  tenDollarDay: boolean;
  spotsAvailable: number;
  phone: string;
  email: string;
  description: string;
  rating: number;
  imageUrl?: string;
}

export const centres: Centre[] = [
  {
    id: "1",
    name: "Maple Grove Family Daycare",
    address: "1234 Maple St",
    city: "Vancouver",
    lat: 49.2604,
    lng: -123.1139,
    ageGroups: ["infant", "toddler", "preschool"],
    languages: ["English", "French"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 2,
    phone: "604-555-0101",
    email: "hello@maplegrovedaycare.ca",
    description:
      "A warm and nurturing home daycare in the heart of Vancouver. We follow a play-based learning approach and celebrate every child's unique curiosity. Bilingual English-French environment available.",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Sunflower Early Learning Centre",
    address: "890 Kingsway Ave",
    city: "Vancouver",
    lat: 49.2488,
    lng: -123.0768,
    ageGroups: ["toddler", "preschool"],
    languages: ["English", "Mandarin"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 0,
    phone: "604-555-0202",
    email: "info@sunflowerelc.ca",
    description:
      "Sunflower ELC blends structured early learning with imaginative play. Our Mandarin-English bilingual program supports cultural connection alongside school readiness. Currently at full capacity — check back soon.",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Little Explorers Daycare",
    address: "45 Blue Mountain Dr",
    city: "Burnaby",
    lat: 49.2488,
    lng: -122.9805,
    ageGroups: ["infant", "toddler"],
    languages: ["English"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 1,
    phone: "604-555-0303",
    email: "contact@littleexplorers.ca",
    description:
      "Specializing in infant and toddler care, Little Explorers provides a safe and stimulating environment for BC's youngest learners. Our caregivers are certified in infant CPR and early childhood education.",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Rainbow Kids Family Daycare",
    address: "221 Willingdon Ave",
    city: "Burnaby",
    lat: 49.267,
    lng: -122.9989,
    ageGroups: ["toddler", "preschool", "schoolAge"],
    languages: ["English", "Tagalog"],
    scheduleType: "part-time",
    tenDollarDay: false,
    spotsAvailable: 3,
    phone: "604-555-0404",
    email: "rainbow@kidsdaycare.ca",
    description:
      "Rainbow Kids offers a flexible part-time schedule perfect for families needing 2–3 days of care per week. A loving multicultural home environment where children from all backgrounds feel welcome.",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Cedar Valley Child Care",
    address: "7801 King George Blvd",
    city: "Surrey",
    lat: 49.1913,
    lng: -122.849,
    ageGroups: ["preschool", "schoolAge"],
    languages: ["English", "Punjabi"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 4,
    phone: "604-555-0505",
    email: "cedarvalley@childcare.ca",
    description:
      "Cedar Valley is a licensed centre proudly serving Surrey's diverse community. With Punjabi-speaking staff and a culturally inclusive curriculum, we help children thrive with a strong sense of identity.",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Sunshine Coast Kids Club",
    address: "3302 152nd St",
    city: "Surrey",
    lat: 49.0234,
    lng: -122.801,
    ageGroups: ["schoolAge"],
    languages: ["English"],
    scheduleType: "part-time",
    tenDollarDay: false,
    spotsAvailable: 6,
    phone: "604-555-0606",
    email: "info@sunshinecoastkids.ca",
    description:
      "An after-school and holiday program for school-age children ages 5–12. We offer homework support, arts and crafts, outdoor play, and field trips throughout the year.",
    rating: 4.3,
  },
  {
    id: "7",
    name: "Richmond Sprouts Learning Home",
    address: "120 Granville Ave",
    city: "Richmond",
    lat: 49.1666,
    lng: -123.1336,
    ageGroups: ["infant", "toddler", "preschool"],
    languages: ["English", "Cantonese", "Mandarin"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 2,
    phone: "604-555-0707",
    email: "sprouts@richmondhome.ca",
    description:
      "A trilingual home daycare where children grow in English, Cantonese, and Mandarin from their earliest years. Nutritious home-cooked meals and a calm, loving atmosphere are at the heart of our care.",
    rating: 4.9,
  },
  {
    id: "8",
    name: "Bluebird Early Childhood Centre",
    address: "6511 Minoru Blvd",
    city: "Richmond",
    lat: 49.1731,
    lng: -123.1364,
    ageGroups: ["toddler", "preschool"],
    languages: ["English", "Korean"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 0,
    phone: "604-555-0808",
    email: "bluebird@ecc.ca",
    description:
      "Bluebird ECC offers a structured Reggio Emilia-inspired program with a Korean-English bilingual option. Our space is thoughtfully designed to encourage creativity, inquiry, and collaboration.",
    rating: 4.6,
  },
  {
    id: "9",
    name: "Coquitlam Cozy Cubs Daycare",
    address: "1155 Pinetree Way",
    city: "Coquitlam",
    lat: 49.2767,
    lng: -122.792,
    ageGroups: ["infant", "toddler"],
    languages: ["English"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 1,
    phone: "604-555-0909",
    email: "cozycubs@coquitlamdaycare.ca",
    description:
      "Cozy Cubs is a home-based infant and toddler daycare with a maximum of 6 children for a truly intimate setting. We prioritize attachment-based care and open communication with every family.",
    rating: 5.0,
  },
  {
    id: "10",
    name: "Treehouse Learning Centre",
    address: "2929 Barnet Hwy",
    city: "Coquitlam",
    lat: 49.2848,
    lng: -122.832,
    ageGroups: ["preschool", "schoolAge"],
    languages: ["English", "French"],
    scheduleType: "drop-in",
    tenDollarDay: false,
    spotsAvailable: 5,
    phone: "604-555-1010",
    email: "treehouse@learningcentre.ca",
    description:
      "Treehouse offers flexible drop-in care for preschool and school-age children. Perfect for parents with irregular schedules. Our French-immersion option is available on Tuesday and Thursday mornings.",
    rating: 4.2,
  },
  {
    id: "11",
    name: "North Shore Nestlings",
    address: "255 West 15th St",
    city: "North Vancouver",
    lat: 49.323,
    lng: -123.07,
    ageGroups: ["infant", "toddler", "preschool"],
    languages: ["English", "Spanish"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 3,
    phone: "604-555-1111",
    email: "nestlings@northshoredaycare.ca",
    description:
      "Nestled in the hills of North Vancouver, Nestlings is a licensed daycare with nature-based programming. Daily outdoor exploration, Spanish language circle time, and a strong community of families.",
    rating: 4.8,
  },
  {
    id: "12",
    name: "Langley Little Learners",
    address: "20389 Fraser Hwy",
    city: "Langley",
    lat: 49.1044,
    lng: -122.6604,
    ageGroups: ["toddler", "preschool", "schoolAge"],
    languages: ["English"],
    scheduleType: "full-time",
    tenDollarDay: true,
    spotsAvailable: 2,
    phone: "604-555-1212",
    email: "info@langleylittlelearners.ca",
    description:
      "Little Learners is a bright and spacious licensed centre in Langley serving families in the Fraser Valley. We offer a play-based curriculum aligned with BC's Early Learning Framework and a strong before/after school program.",
    rating: 4.4,
  },
];

// Helper: get centre by id
export const getCentreById = (id: string): Centre | undefined =>
  centres.find((c) => c.id === id);

// Helper: get centre by slug (e.g. "little-explorers-daycare")
export const getCentreBySlug = (slug: string): Centre | undefined =>
  centres.find(
    (c) =>
      c.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-') === slug
  );

// Helper: get unique cities
export const getUniqueCities = (): string[] =>
  [...new Set(centres.map((c) => c.city))].sort();

// Helper: get unique languages
export const getUniqueLanguages = (): string[] =>
  [...new Set(centres.flatMap((c) => c.languages))].sort();

// Helper: search centres by query string (name, city, address)
export const searchCentres = (query: string): Centre[] => {
  const q = query.toLowerCase().trim();
  if (!q) return centres;

  // Exact city match takes priority to avoid substring collisions
  // e.g. "Vancouver" should not return "North Vancouver"
  const exactCityMatch = centres.some((c) => c.city.toLowerCase() === q);
  if (exactCityMatch) {
    return centres.filter((c) => c.city.toLowerCase() === q);
  }

  return centres.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q) ||
      c.languages.some((l) => l.toLowerCase().includes(q)),
  );
};

// Helper: filter centres
export const filterCentres = ({
  city,
  ageGroup,
  scheduleType,
  tenDollarDay,
  language,
}: {
  city?: string;
  ageGroup?: AgeGroup;
  scheduleType?: ScheduleType;
  tenDollarDay?: boolean;
  language?: string;
}): Centre[] =>
  centres.filter((c) => {
    if (city && c.city.toLowerCase() !== city.toLowerCase()) return false;
    if (ageGroup && !c.ageGroups.includes(ageGroup)) return false;
    if (scheduleType && c.scheduleType !== scheduleType) return false;
    if (tenDollarDay !== undefined && c.tenDollarDay !== tenDollarDay)
      return false;
    if (language && !c.languages.includes(language)) return false;
    return true;
  });
