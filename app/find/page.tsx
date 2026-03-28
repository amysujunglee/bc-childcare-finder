'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CentreCard from '@/components/CentreCard';
import FilterSidebar from '@/components/FilterSidebar';
import MapView from '@/components/MapView';
import { centres, searchCentres, AgeGroup, ScheduleType } from '@/lib/mock-data';

function FindPageInner() {
  const searchParams = useSearchParams();
  const [displayedCentres, setDisplayedCentres] = useState(centres);
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>();
  const [selectedScheduleType, setSelectedScheduleType] = useState<ScheduleType>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [selectedTenDollarDay, setSelectedTenDollarDay] = useState<boolean>();
  const [selectedCentreId, setSelectedCentreId] = useState<string>();
  const [scrollToCard, setScrollToCard] = useState<string>();

  // Apply filters
  useEffect(() => {
    const searchQuery = searchParams.get('search');

    // Start from search results if query exists, otherwise all centres
    let filtered = searchQuery ? searchCentres(searchQuery) : centres;

    // Apply sidebar filters on top of search results
    filtered = filtered.filter((c) => {
      if (selectedCity && c.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      if (selectedAgeGroup && !c.ageGroups.includes(selectedAgeGroup)) return false;
      if (selectedScheduleType && c.scheduleType !== selectedScheduleType) return false;
      if (selectedTenDollarDay !== undefined && c.tenDollarDay !== selectedTenDollarDay) return false;
      if (selectedLanguage && !c.languages.includes(selectedLanguage)) return false;
      return true;
    });

    setDisplayedCentres(filtered);
  }, [selectedCity, selectedAgeGroup, selectedScheduleType, selectedLanguage, selectedTenDollarDay, searchParams]);

  const handleFilterChange = (filters: {
    city?: string;
    ageGroup?: AgeGroup;
    scheduleType?: ScheduleType;
    language?: string;
    tenDollarDay?: boolean;
  }) => {
    setSelectedCity(filters.city);
    setSelectedAgeGroup(filters.ageGroup);
    setSelectedScheduleType(filters.scheduleType);
    setSelectedLanguage(filters.language);
    setSelectedTenDollarDay(filters.tenDollarDay);
  };

  const handleMapPinClick = (centreId: string) => {
    setSelectedCentreId(centreId);
    setScrollToCard(centreId);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif font-bold text-primary-dark mb-8">
        Find Childcare
        {searchParams.get('search') && (
          <span className="text-lg font-normal text-neutral-muted ml-2">
            for "{searchParams.get('search')}"
          </span>
        )}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left: Filters */}
        <div className="md:col-span-1">
          <FilterSidebar
            selectedCity={selectedCity}
            selectedAgeGroup={selectedAgeGroup}
            selectedScheduleType={selectedScheduleType}
            selectedLanguage={selectedLanguage}
            selectedTenDollarDay={selectedTenDollarDay}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Right: Map and List */}
        <div className="md:col-span-3">
          {/* Map */}
          <div className="mb-8">
            <h2 className="text-lg font-serif font-bold text-primary-dark mb-4">Map View ({displayedCentres.length})</h2>
            <MapView
              centres={displayedCentres}
              selectedCentreId={selectedCentreId}
              onCentreSelect={handleMapPinClick}
              searchQuery={searchParams.get('search') ?? undefined}
            />
          </div>

          {/* List */}
          <div>
            <h2 className="text-lg font-serif font-bold text-primary-dark mb-4">
              Available Centres ({displayedCentres.length})
            </h2>

            {displayedCentres.length === 0 ? (
              <div className="bg-white rounded-card border border-neutral-border p-12 text-center">
                <p className="text-neutral-muted text-lg mb-4">No daycares found matching your filters.</p>
                <button
                  onClick={() => handleFilterChange({})}
                  className="bg-primary-green text-white px-6 py-2 rounded-card hover:bg-opacity-90 transition font-medium"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedCentres.map((centre) => (
                  <div
                    key={centre.id}
                    id={`centre-${centre.id}`}
                    className={`transition ${
                      scrollToCard === centre.id ? 'ring-2 ring-primary-green' : ''
                    }`}
                  >
                    <CentreCard
                      centre={centre}
                      onClick={() => {
                        setSelectedCentreId(centre.id);
                      }}
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
    <Suspense fallback={<div className="py-16 text-center text-neutral-muted">Loading…</div>}>
      <FindPageInner />
    </Suspense>
  );
}
