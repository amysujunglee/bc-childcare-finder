"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CentreCard from "@/components/CentreCard";
import FilterSidebar from "@/components/FilterSidebar";
import MapView from "@/components/MapView";
import {
  centres,
  searchCentres,
  AgeGroup,
  ScheduleType,
} from "@/lib/mock-data";

function FindPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [displayedCentres, setDisplayedCentres] = useState(centres);
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([]);
  const [selectedScheduleTypes, setSelectedScheduleTypes] = useState<ScheduleType[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [selectedTenDollarDay, setSelectedTenDollarDay] = useState<boolean>();
  const [selectedCentreId, setSelectedCentreId] = useState<string>();
  const [scrollToCard, setScrollToCard] = useState<string>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterKey, setFilterKey] = useState(0);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );

  // Keep search input in sync with URL param
  useEffect(() => {
    setSearchInput(searchParams.get("search") ?? "");
  }, [searchParams]);

  // Auto-select city dropdown when search query matches a known city
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (!searchQuery) return;
    const matched = centres.find(
      (c) => c.city.toLowerCase() === searchQuery.toLowerCase(),
    );
    if (matched) setSelectedCity(matched.city);
  }, [searchParams]);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    let filtered = searchQuery ? searchCentres(searchQuery) : centres;

    filtered = filtered.filter((c) => {
      if (selectedCity && c.city.toLowerCase() !== selectedCity.toLowerCase())
        return false;
      if (selectedAgeGroups.length > 0 && !selectedAgeGroups.some((ag) => c.ageGroups.includes(ag)))
        return false;
      if (selectedScheduleTypes.length > 0 && !selectedScheduleTypes.includes(c.scheduleType))
        return false;
      if (
        selectedTenDollarDay !== undefined &&
        c.tenDollarDay !== selectedTenDollarDay
      )
        return false;
      if (selectedLanguage && !c.languages.includes(selectedLanguage))
        return false;
      return true;
    });

    setDisplayedCentres(filtered);
  }, [
    selectedCity,
    selectedAgeGroups,
    selectedScheduleTypes,
    selectedLanguage,
    selectedTenDollarDay,
    searchParams,
  ]);

  const handleFilterChange = (filters: {
    city?: string;
    ageGroups?: AgeGroup[];
    scheduleTypes?: ScheduleType[];
    language?: string;
    tenDollarDay?: boolean;
  }) => {
    setSelectedCity(filters.city);
    setSelectedAgeGroups(filters.ageGroups ?? []);
    setSelectedScheduleTypes(filters.scheduleTypes ?? []);
    setSelectedLanguage(filters.language);
    setSelectedTenDollarDay(filters.tenDollarDay);

    const isReset = Object.values(filters).every((v) => v === undefined);
    if (isReset) {
      setFilterKey((k) => k + 1);
    }
    router.replace("/find");
  };

  const handleSearch = (query: string) => {
    setSearchInput(query);
    const q = query.trim();
    if (q) {
      router.replace(`/find?search=${encodeURIComponent(q)}`);
    } else {
      router.replace("/find");
    }
  };

  const handleMapPinClick = (centreId: string) => {
    setSelectedCentreId(centreId);
    setScrollToCard(centreId);
  };

  const activeFilterCount = [
    selectedCity,
    ...selectedAgeGroups,
    ...selectedScheduleTypes,
    selectedLanguage,
    selectedTenDollarDay,
  ].filter(Boolean).length;

  const sidebarProps = {
    selectedCity,
    selectedAgeGroups,
    selectedScheduleTypes,
    selectedLanguage,
    selectedTenDollarDay,
    searchQuery: searchInput,
    onSearch: handleSearch,
    onFilterChange: handleFilterChange,
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary-dark">
          Find Childcare
        </h1>

        {/* Mobile filter toggle */}
        <button
          className="md:hidden flex items-center gap-2 text-sm font-medium bg-white border border-neutral-border px-3 py-2 rounded-card shadow-soft"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h18M6 8h12M9 12h6"
            />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div className="md:hidden mb-6">
          <FilterSidebar
            key={filterKey}
            {...sidebarProps}
            onFilterChange={(f) => {
              handleFilterChange(f);
              setFiltersOpen(false);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <FilterSidebar key={filterKey} {...sidebarProps} />
        </div>

        {/* Map and List */}
        <div className="md:col-span-3">
          <div className="mb-6">
            <h2 className="text-base font-serif font-bold text-primary-dark mb-3">
              Map View ({displayedCentres.length})
            </h2>
            <MapView
              centres={displayedCentres}
              selectedCentreId={selectedCentreId}
              onCentreSelect={handleMapPinClick}
              searchQuery={searchParams.get("search") ?? undefined}
            />
          </div>

          <div>
            <div className="mb-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-base font-serif font-bold text-primary-dark">
                  Available Centres ({displayedCentres.length})
                </h2>
                <p className="hidden sm:block text-xs text-neutral-muted">
                  Data from{" "}
                  <a
                    href="https://www.fraserhealth.ca/health-topics-a-to-z/child-care/find-a-licensed-child-care-facility-near-you"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary-dark transition"
                  >
                    Fraser Health Authority
                  </a>
                  {" "}· Updated Jan 6, 2026
                </p>
              </div>
              <p className="sm:hidden text-xs text-neutral-muted mt-0.5">
                Data from{" "}
                <a
                  href="https://www.fraserhealth.ca/health-topics-a-to-z/child-care/find-a-licensed-child-care-facility-near-you"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary-dark transition"
                >
                  Fraser Health Authority
                </a>
                {" "}· Updated Jan 6, 2026
              </p>
            </div>

            {displayedCentres.length === 0 ? (
              <div className="bg-white rounded-card border border-neutral-border p-8 text-center">
                <p className="text-neutral-muted mb-4">
                  No daycares found matching your filters.
                </p>
                <button
                  onClick={() => handleFilterChange({})}
                  className="bg-primary-green text-white px-6 py-2 rounded-card hover:bg-opacity-90 transition font-medium text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {displayedCentres.map((centre) => (
                  <div
                    key={centre.id}
                    id={`centre-${centre.id}`}
                    className={`transition ${scrollToCard === centre.id ? "ring-2 ring-primary-green rounded-card" : ""}`}
                  >
                    <CentreCard
                      centre={centre}
                      onClick={() => setSelectedCentreId(centre.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FindPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-neutral-muted">Loading…</div>
      }
    >
      <FindPageInner />
    </Suspense>
  );
}
