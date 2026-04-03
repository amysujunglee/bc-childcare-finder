'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Centre } from '@/lib/mock-data';
import Badge from '@/components/Badge';
import AIChatPanel from '@/components/AIChatPanel';
import { formatAgeGroups, formatScheduleType, getStarRating } from '@/lib/utils';

interface CentreDetailProps {
  centre: Centre;
}

export default function CentreDetail({ centre }: CentreDetailProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { full } = getStarRating(centre.rating);

  const centreContext = `This is information about ${centre.name} in ${centre.city}: ${centre.description} Contact: ${centre.phone}, ${centre.email}. Age groups: ${formatAgeGroups(centre.ageGroups)}. Schedule: ${formatScheduleType(centre.scheduleType)}. Languages: ${centre.languages.join(', ')}. $10/Day eligible: ${centre.tenDollarDay ? 'Yes' : 'No'}. Spots available: ${centre.spotsAvailable}.`;

  return (
    <>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/find" className="text-primary-green hover:underline text-sm font-medium mb-5 inline-block">
          ← Back to Search
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-br from-primary-green to-primary-dark rounded-card p-6 sm:p-8 text-white mb-6">
          <div className="flex justify-between items-start gap-3 mb-3">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">{centre.name}</h1>
            {centre.tenDollarDay && <Badge variant="accent">$10/Day</Badge>}
          </div>
          <p className="text-sm sm:text-lg text-gray-100">{centre.address}</p>
          <p className="text-sm sm:text-lg text-gray-100">{centre.city}</p>
        </div>

        {/* Rating and Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-card p-4 sm:p-6 border border-neutral-border">
            <h3 className="font-serif font-bold text-primary-dark mb-2 text-sm sm:text-base">Rating</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl text-primary-green">{'★'.repeat(full)}</span>
              <span className="text-lg font-bold text-primary-dark">{centre.rating.toFixed(1)}/5</span>
            </div>
          </div>

          <div className="bg-white rounded-card p-4 sm:p-6 border border-neutral-border">
            <h3 className="font-serif font-bold text-primary-dark mb-2 text-sm sm:text-base">Phone</h3>
            <a href={`tel:${centre.phone}`} className="text-primary-green hover:underline text-sm sm:text-base">
              {centre.phone}
            </a>
          </div>

          <div className="bg-white rounded-card p-4 sm:p-6 border border-neutral-border">
            <h3 className="font-serif font-bold text-primary-dark mb-2 text-sm sm:text-base">Email</h3>
            <a href={`mailto:${centre.email}`} className="text-primary-green hover:underline text-xs sm:text-sm break-all">
              {centre.email}
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-card p-5 sm:p-6 border border-neutral-border mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary-dark mb-3">About</h2>
          <p className="text-neutral-muted text-sm sm:text-base leading-relaxed">{centre.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary-dark mb-4">Details</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-2 text-sm">Age Groups</h3>
                <div className="flex flex-wrap gap-2">
                  {centre.ageGroups.map((age) => (
                    <Badge key={age} variant="secondary">
                      {age === 'infant' ? 'Infant (0–18 months)' : age === 'toddler' ? 'Toddler (18 months–3 years)' : age === 'preschool' ? 'Preschool (3–5 years)' : 'School Age (5–12 years)'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-1 text-sm">Schedule Type</h3>
                <p className="text-primary-dark font-medium text-sm">{formatScheduleType(centre.scheduleType)}</p>
              </div>

              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-2 text-sm">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {centre.languages.map((lang) => (
                    <Badge key={lang} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary-dark mb-4">Availability & Fees</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-1 text-sm">Spots Available</h3>
                <p className="font-medium text-base">
                  {centre.spotsAvailable > 0 ? (
                    <span className="text-primary-green">{centre.spotsAvailable} spots open</span>
                  ) : (
                    <span className="text-red-500">Currently full</span>
                  )}
                </p>
              </div>

              <div className="bg-white rounded-card p-4 border border-neutral-border">
                <h3 className="font-serif font-bold text-primary-dark mb-1 text-sm">Pricing</h3>
                <p className="text-neutral-muted text-sm mb-3">
                  Contact the centre directly for current fee information.
                </p>
                <button className="w-full bg-primary-green text-white px-4 py-2.5 rounded-card hover:bg-opacity-90 transition font-medium text-sm">
                  Inquire About Rates
                </button>
              </div>

              {centre.tenDollarDay && (
                <div className="bg-green-50 rounded-card p-4 border border-primary-green">
                  <h3 className="font-serif font-bold text-primary-green mb-1 text-sm">$10/Day Program</h3>
                  <p className="text-sm text-primary-dark">
                    This centre participates in BC's $10/Day Childcare Program. Eligible families may qualify for reduced fees.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="bg-white rounded-card p-6 sm:p-8 border border-neutral-border text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary-dark mb-3">Have Questions?</h2>
          <p className="text-neutral-muted text-sm mb-5">
            Ask our AI assistant anything about this daycare, schedules, programs, or childcare in BC.
          </p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-full sm:w-auto bg-primary-green text-white px-6 py-3 rounded-card hover:bg-opacity-90 transition font-medium text-sm"
          >
            💬 Ask AI Assistant
          </button>
        </div>
      </div>

      <AIChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={centreContext}
      />
    </>
  );
}
