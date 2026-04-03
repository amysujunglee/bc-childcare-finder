"use client";

import {
  AgeGroup,
  ScheduleType,
  getUniqueCities,
  getUniqueLanguages,
} from "@/lib/mock-data";

interface FilterSidebarProps {
  selectedCity?: string;
  selectedAgeGroup?: AgeGroup;
  selectedScheduleType?: ScheduleType;
  selectedLanguage?: string;
  selectedTenDollarDay?: boolean;
  searchQuery?: string;
  onSearch?: (query: string) => void;
  onFilterChange: (filters: {
    city?: string;
    ageGroup?: AgeGroup;
    scheduleType?: ScheduleType;
    language?: string;
    tenDollarDay?: boolean;
  }) => void;
}

export default function FilterSidebar({
  selectedCity,
  selectedAgeGroup,
  selectedScheduleType,
  selectedLanguage,
  selectedTenDollarDay,
  searchQuery = '',
  onSearch,
  onFilterChange,
}: FilterSidebarProps) {
  const cities = getUniqueCities();
  const languages = getUniqueLanguages();

  const ageGroups: { value: AgeGroup; label: string }[] = [
    { value: "infant", label: "Infant (0–18 months)" },
    { value: "toddler", label: "Toddler (18 months–3 years)" },
    { value: "preschool", label: "Preschool (3–5 years)" },
  ];

  const scheduleTypes: { value: ScheduleType; label: string }[] = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "drop-in", label: "Drop-In" },
  ];

  const handleReset = () => {
    onFilterChange({
      city: undefined,
      ageGroup: undefined,
      scheduleType: undefined,
      language: undefined,
      tenDollarDay: undefined,
    });
  };

  return (
    <div className="bg-white p-6 rounded-card border border-neutral-border h-fit sticky top-20">
      <h2 className="font-serif text-lg font-bold text-primary-dark mb-6">
        Filters
      </h2>

      {/* Search */}
      {onSearch && (
        <div className="mb-6">
          <label className="block text-sm font-bold text-primary-dark mb-3">
            Search
          </label>
          <form onSubmit={(e) => { e.preventDefault(); onSearch(searchQuery); }} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Name, city, or address…"
              className="flex-1 min-w-0 border border-neutral-border rounded-card px-3 py-2 text-sm text-primary-dark placeholder:text-neutral-muted focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </form>
        </div>
      )}

      {/* City */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-primary-dark mb-3">
          City
        </label>
        <div className="relative">
          <select
            value={selectedCity || ""}
            onChange={(e) =>
              onFilterChange({
                city: e.target.value || undefined,
                ageGroup: selectedAgeGroup,
                scheduleType: selectedScheduleType,
                language: selectedLanguage,
                tenDollarDay: selectedTenDollarDay,
              })
            }
            className="w-full appearance-none pl-3 pr-10 py-2 border border-neutral-border rounded-card text-sm text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-green bg-white"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Age Groups */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-primary-dark mb-3">
          Age Groups
        </label>
        <div className="space-y-2">
          {ageGroups.map(({ value, label }) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedAgeGroup === value}
                onChange={(e) =>
                  onFilterChange({
                    city: selectedCity,
                    ageGroup: e.target.checked ? value : undefined,
                    scheduleType: selectedScheduleType,
                    language: selectedLanguage,
                    tenDollarDay: selectedTenDollarDay,
                  })
                }
                className="w-4 h-4 rounded accent-primary-green cursor-pointer"
              />
              <span className="ml-2 text-sm text-primary-dark">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Schedule Type */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-primary-dark mb-3">
          Schedule
        </label>
        <div className="space-y-2">
          {scheduleTypes.map(({ value, label }) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedScheduleType === value}
                onChange={(e) =>
                  onFilterChange({
                    city: selectedCity,
                    ageGroup: selectedAgeGroup,
                    scheduleType: e.target.checked ? value : undefined,
                    language: selectedLanguage,
                    tenDollarDay: selectedTenDollarDay,
                  })
                }
                className="w-4 h-4 rounded accent-primary-green cursor-pointer"
              />
              <span className="ml-2 text-sm text-primary-dark">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-primary-dark mb-3">
          Language
        </label>
        <div className="relative">
          <select
            value={selectedLanguage || ""}
            onChange={(e) =>
              onFilterChange({
                city: selectedCity,
                ageGroup: selectedAgeGroup,
                scheduleType: selectedScheduleType,
                language: e.target.value || undefined,
                tenDollarDay: selectedTenDollarDay,
              })
            }
            className="w-full appearance-none pl-3 pr-10 py-2 border border-neutral-border rounded-card text-sm text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-green bg-white"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* $10/Day */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedTenDollarDay || false}
            onChange={(e) =>
              onFilterChange({
                city: selectedCity,
                ageGroup: selectedAgeGroup,
                scheduleType: selectedScheduleType,
                language: selectedLanguage,
                tenDollarDay: e.target.checked || undefined,
              })
            }
            className="w-4 h-4 rounded accent-primary-green cursor-pointer"
          />
          <span className="ml-2 text-sm font-bold text-primary-dark">
            $10/Day Program Only
          </span>
        </label>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full bg-neutral-border text-primary-dark px-4 py-2 rounded-card hover:bg-opacity-75 transition font-medium text-sm"
      >
        Reset Filters
      </button>
    </div>
  );
}
