'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCentreBySlug } from '@/lib/mock-data';
import Badge from '@/components/Badge';
import AIChatPanel from '@/components/AIChatPanel';
import { formatAgeGroups, formatScheduleType, getStarRating } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface CentrePageProps {
  params: {
    slug: string;
  };
}

export default function CentrePage({ params }: CentrePageProps) {
  const centre = getCentreBySlug(params.slug);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!centre) {
    notFound();
  }

  const { full } = getStarRating(centre.rating);

  const centreContext = `This is information about ${centre.name} in ${centre.city}: ${centre.description} Contact: ${centre.phone}, ${centre.email}. Age groups: ${formatAgeGroups(centre.ageGroups)}. Schedule: ${formatScheduleType(centre.scheduleType)}. Languages: ${centre.languages.join(', ')}. $10/Day eligible: ${centre.tenDollarDay ? 'Yes' : 'No'}. Spots available: ${centre.spotsAvailable}.`;

  return (
    <>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/find" className="text-primary-green hover:underline text-sm font-medium mb-6 inline-block">
          ← Back to Search
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-br from-primary-green to-primary-dark rounded-card p-8 text-white mb-8">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h1 className="text-4xl font-serif font-bold">{centre.name}</h1>
            {centre.tenDollarDay && <Badge variant="accent">$10/Day</Badge>}
          </div>
          <p className="text-lg text-gray-100">{centre.address}</p>
          <p className="text-lg text-gray-100">{centre.city}</p>
        </div>

        {/* Rating and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Rating */}
          <div className="bg-white rounded-card p-6 border border-neutral-border">
            <h3 className="font-serif font-bold text-primary-dark mb-2">Rating</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-primary-green">{'★'.repeat(full)}</span>
              <span className="text-xl font-bold text-primary-dark">{centre.rating.toFixed(1)}/5</span>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-card p-6 border border-neutral-border">
            <h3 className="font-serif font-bold text-primary-dark mb-2">Phone</h3>
            <a href={`tel:${centre.phone}`} className="text-primary-green hover:underline">
              {centre.phone}
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-card p-6 border border-neutral-border">
            <h3 className="font-serif font-bold text-primary-dark mb-2">Email</h3>
            <a href={`mailto:${centre.email}`} className="text-primary-green hover:underline text-sm">
              {centre.email}
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-card p-6 border border-neutral-border mb-8">
          <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">About</h2>
          <p className="text-neutral-muted text-lg leading-relaxed">{centre.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Side */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Details</h2>

            <div className="space-y-4">
              {/* Age Groups */}
              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-3">Age Groups</h3>
                <div className="flex flex-wrap gap-2">
                  {centre.ageGroups.map((age) => (
                    <Badge key={age} variant="secondary">
                      {age === 'schoolAge' ? 'School Age' : age.charAt(0).toUpperCase() + age.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-2">Schedule Type</h3>
                <p className="text-primary-dark font-medium">{formatScheduleType(centre.scheduleType)}</p>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {centre.languages.map((lang) => (
                    <Badge key={lang} variant="secondary">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Availability & Fees</h2>

            <div className="space-y-4">
              {/* Spots Available */}
              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-2">Spots Available</h3>
                <p className="text-primary-dark font-medium text-lg">
                  {centre.spotsAvailable > 0 ? (
                    <span className="text-primary-green">{centre.spotsAvailable} spots open</span>
                  ) : (
                    <span className="text-red-500">Currently full</span>
                  )}
                </p>
              </div>

              {/* Fees */}
              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-2">Pricing</h3>
                <p className="text-neutral-muted text-sm mb-4">
                  Contact the centre directly for current fee information.
                </p>
                <button className="w-full bg-primary-green text-white px-4 py-2 rounded-card hover:bg-opacity-90 transition font-medium text-sm">
                  Inquire About Rates
                </button>
              </div>

              {/* $10/Day Info */}
              {centre.tenDollarDay && (
                <div className="bg-green-50 rounded-card p-4 border border-primary-green">
                  <h3 className="font-serif font-bold text-primary-green mb-2">$10/Day Program</h3>
                  <p className="text-sm text-primary-dark">
                    This centre participates in BC's $10/Day Childcare Program. Eligible families may qualify for reduced fees.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="bg-white rounded-card p-8 border border-neutral-border text-center">
          <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Have Questions?</h2>
          <p className="text-neutral-muted mb-6">
            Ask our AI assistant anything about this daycare, schedules, programs, or childcare in BC.
          </p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-primary-green text-white px-8 py-3 rounded-card hover:bg-opacity-90 transition font-medium"
          >
            💬 Ask AI Assistant
          </button>
        </div>
      </div>

      {/* AI Chat Panel */}
      <AIChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={centreContext}
      />
    </>
  );
}
