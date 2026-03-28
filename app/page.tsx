'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CentreCard from '@/components/CentreCard';
import { centres, searchCentres } from '@/lib/mock-data';

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
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-4 text-balance">
            Find Your Perfect Daycare in BC
          </h1>
          <p className="text-lg text-neutral-muted mb-8 max-w-2xl mx-auto">
            Discover licensed daycare homes and centres near you. Compare schedules, languages, and programs to find the right fit for your family.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by city or postal code..."
                className="flex-1 px-4 py-3 border border-neutral-border rounded-card focus:outline-none focus:ring-2 focus:ring-primary-green text-foreground"
              />
              <button
                type="submit"
                className="bg-primary-green text-white px-6 py-3 rounded-card hover:bg-opacity-90 transition font-medium"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTA */}
          <Link
            href="/find"
            className="inline-block bg-primary-green text-white px-8 py-3 rounded-card hover:bg-opacity-90 transition font-medium"
          >
            Browse All Centres
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-dark text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-serif font-bold mb-2">320+</p>
            <p className="text-gray-300">Licensed Centres</p>
          </div>
          <div>
            <p className="text-4xl font-serif font-bold mb-2">12+</p>
            <p className="text-gray-300">Cities Covered</p>
          </div>
          <div>
            <p className="text-4xl font-serif font-bold mb-2">85%</p>
            <p className="text-gray-300">$10/Day Programs</p>
          </div>
        </div>
      </section>

      {/* Featured Centres */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-4 text-center">
          Featured Daycares
        </h2>
        <p className="text-center text-neutral-muted mb-12 max-w-xl mx-auto">
          Explore some of our top-rated daycare options across BC. Each centre is licensed and dedicated to your child's development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCentres.map((centre) => (
            <CentreCard key={centre.id} centre={centre} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/find"
            className="inline-block bg-primary-green text-white px-8 py-3 rounded-card hover:bg-opacity-90 transition font-medium"
          >
            See All Daycares →
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-serif font-bold text-primary-dark mb-4">🏠 Home Daycares</h3>
            <p className="text-neutral-muted">
              Small, intimate settings with licensed caregivers providing family-style care in home environments.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-primary-dark mb-4">🏢 Licensed Centres</h3>
            <p className="text-neutral-muted">
              Modern centres with professional staff, varied activities, and structured learning programs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-primary-dark mb-4">💚 $10/Day Programs</h3>
            <p className="text-neutral-muted">
              BC's affordable childcare program makes quality care accessible to all families.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
