import centresData from './centres.json';

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
  manager?: string;
  capacity?: number;
}

export const centres: Centre[] = centresData as Centre[];

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
