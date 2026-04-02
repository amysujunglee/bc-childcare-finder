'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CentreCard from '@/components/CentreCard';
import { centres } from '@/lib/mock-data';

export default function HomePage() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/find?search=${encodeURIComponent(searchInput)}`);
    }
  };

  const featuredCentres = centres.slice(0, 6);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-4 text-balance leading-tight">
            Find Your Perfect Daycare in BC
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted mb-8 max-w-2xl mx-auto">
            Discover licensed daycare homes and centres near you. Compare schedules, languages, and programs to find the right fit for your family.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by city or postal code..."
                className="flex-1 min-w-0 px-4 py-3 border border-neutral-border rounded-card focus:outline-none focus:ring-2 focus:ring-primary-green text-foreground text-sm"
              />
              <button
                type="submit"
                className="bg-primary-green text-white px-5 py-3 rounded-card hover:bg-opacity-90 transition font-medium text-sm flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          <Link
            href="/find"
            className="inline-block bg-primary-green text-white px-6 py-3 rounded-card hover:bg-opacity-90 transition font-medium text-sm"
          >
            Browse All Centres
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-dark text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl sm:text-4xl font-serif font-bold mb-1">320+</p>
            <p className="text-xs sm:text-sm text-gray-300">Licensed Centres</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-serif font-bold mb-1">12+</p>
            <p className="text-xs sm:text-sm text-gray-300">Cities Covered</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-serif font-bold mb-1">85%</p>
            <p className="text-xs sm:text-sm text-gray-300">$10/Day Programs</p>
          </div>
        </div>
      </section>

      {/* Featured Centres */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-3 text-center">
          Featured Daycares
        </h2>
        <p className="text-center text-neutral-muted mb-10 max-w-xl mx-auto text-sm sm:text-base">
          Explore some of our top-rated daycare options across BC. Each centre is licensed and dedicated to your child's development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {featuredCentres.map((centre) => (
            <CentreCard key={centre.id} centre={centre} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/find"
            className="inline-block bg-primary-green text-white px-6 py-3 rounded-card hover:bg-opacity-90 transition font-medium text-sm"
          >
            See All Daycares →
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold text-primary-dark mb-3">🏠 Home Daycares</h3>
            <p className="text-neutral-muted text-sm">
              Small, intimate settings with licensed caregivers providing family-style care in home environments.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-primary-dark mb-3">🏢 Licensed Centres</h3>
            <p className="text-neutral-muted text-sm">
              Modern centres with professional staff, varied activities, and structured learning programs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-primary-dark mb-3">💚 $10/Day Programs</h3>
            <p className="text-neutral-muted text-sm">
              BC's affordable childcare program makes quality care accessible to all families.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
