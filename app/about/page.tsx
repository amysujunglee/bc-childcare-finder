import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | BC Childcare Finder',
  description: 'Learn about BC Childcare Finder — our mission to help BC families find licensed, affordable daycare and support childcare providers across the province.',
};

const stats = [
  { value: '60%', label: 'of BC families with children under 6 have both parents working — yet licensed childcare spaces meet less than 30% of demand.' },
  { value: '2–3 yrs', label: 'Average waitlist time for licensed infant care in Metro Vancouver, forcing many parents to delay returning to work.' },
  { value: '$2,200+', label: 'Average monthly cost of full-time licensed daycare in Metro Vancouver — one of the highest in Canada.' },
  { value: '40,000+', label: 'Children on BC childcare waitlists at any given time, despite the province\'s $10/Day expansion commitments.' },
];

const parentBenefits = [
  {
    icon: '🔍',
    title: 'Find Care Faster',
    description: 'Search licensed centres by city, age group, language, and schedule in seconds — no more calling around or navigating government websites.',
  },
  {
    icon: '💚',
    title: '$10/Day Made Simple',
    description: "Instantly filter for centres enrolled in BC's $10/Day program so you know exactly where affordable options are available near you.",
  },
  {
    icon: '🌍',
    title: 'Language & Culture Match',
    description: 'Find bilingual and multilingual daycares that match your family\'s cultural background — from Mandarin to Punjabi to French.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Guidance',
    description: 'Ask our AI assistant anything — which centres suit your child\'s age, what $10/Day eligibility means, or how to compare schedules.',
  },
];

const providerBenefits = [
  {
    icon: '📣',
    title: 'Reach More Families',
    description: 'Get discovered by parents actively searching for care in your area. No more relying solely on word-of-mouth or outdated directories.',
  },
  {
    icon: '🗓️',
    title: 'Manage Spot Availability',
    description: 'Update your available spots in real time so families see accurate, up-to-date information — reducing phone tag and missed inquiries.',
  },
  {
    icon: '📊',
    title: 'Provider Dashboard',
    description: 'Track profile views, manage inquiries, and update your programme details all in one place — coming soon.',
  },
  {
    icon: '✉️',
    title: 'Automated Notifications',
    description: 'Notify waitlisted families the moment a spot opens. Save time and fill vacancies faster with email alerts — coming soon.',
  },
];

const nextSteps = [
  {
    phase: 'Coming Soon',
    color: 'bg-primary-green',
    items: [
      { icon: '📋', title: 'Waitlist Join Flow', description: 'Parents can join a centre\'s waitlist directly from its profile. Get notified the moment a spot becomes available.' },
      { icon: '📧', title: 'Email Notifications', description: 'Automated alerts for parents when spots open and for providers when new families join their waitlist.' },
    ],
  },
  {
    phase: 'In Planning',
    color: 'bg-primary-dark',
    items: [
      { icon: '🖥️', title: 'Provider Dashboard', description: 'A dedicated portal for daycare operators to manage their profile, spots, waitlists, and enquiries.' },
      { icon: '🔄', title: 'Real-Time Spot Updates', description: 'Live availability synced across the platform so parents always see current openings — no stale data.' },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-primary-green" />
            <span className="text-primary-green text-sm font-medium uppercase tracking-widest">Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Every BC family deserves access to quality, affordable childcare.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            BC Childcare Finder was built because finding licensed daycare in British Columbia
            shouldn't require months of research, endless phone calls, and crossed fingers.
            We're here to change that — for families and for the providers who serve them.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-4">
              The childcare gap in BC is real.
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              Despite significant investment in BC's $10/Day program, thousands of families are
              still left without accessible, affordable care. The data tells the story.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-card border border-neutral-border p-8 flex gap-5 items-start shadow-soft">
                <span className="text-4xl font-serif font-bold text-primary-green flex-shrink-0 leading-none">
                  {stat.value}
                </span>
                <p className="text-neutral-muted text-sm leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-muted text-center mt-6">
            Sources: BC Ministry of Education & Child Care, Statistics Canada, CCPA BC Office.
          </p>
        </div>
      </section>

      {/* Benefits: Parents */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-neutral-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-green text-sm font-medium uppercase tracking-widest">For Families</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mt-2 mb-4">
              Find the right fit for your child.
            </h2>
            <p className="text-neutral-muted max-w-xl mx-auto">
              We take the stress out of the search so you can focus on what matters — your family.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {parentBenefits.map((b, i) => (
              <div key={i} className="rounded-card border border-neutral-border p-6 bg-background hover:shadow-md transition">
                <span className="text-3xl mb-4 block">{b.icon}</span>
                <h3 className="font-serif font-bold text-primary-dark text-lg mb-2">{b.title}</h3>
                <p className="text-neutral-muted text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/find"
              className="inline-block bg-primary-green text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition"
            >
              Start Searching →
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits: Providers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-green text-sm font-medium uppercase tracking-widest">For Providers</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mt-2 mb-4">
              Fill spots. Reduce admin. Grow your community.
            </h2>
            <p className="text-neutral-muted max-w-xl mx-auto">
              BC Childcare Finder gives licensed operators the visibility and tools they need
              to connect with the right families quickly and efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {providerBenefits.map((b, i) => (
              <div key={i} className="rounded-card border border-neutral-border p-6 bg-white hover:shadow-md transition">
                <span className="text-3xl mb-4 block">{b.icon}</span>
                <h3 className="font-serif font-bold text-primary-dark text-lg mb-2">{b.title}</h3>
                <p className="text-neutral-muted text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps / Roadmap */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-dark text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-green text-sm font-medium uppercase tracking-widest">What's Next</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
              We're just getting started.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              BC Childcare Finder is actively being built. Here's what's on the roadmap
              to make the platform even more powerful for families and providers.
            </p>
          </div>
          <div className="space-y-10">
            {nextSteps.map((phase, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`${phase.color} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                    {phase.phase}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {phase.items.map((item, j) => (
                    <div key={j} className="bg-white/5 border border-white/10 rounded-card p-6 hover:bg-white/10 transition">
                      <span className="text-2xl mb-3 block">{item.icon}</span>
                      <h3 className="font-serif font-bold text-white text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-4">
            Ready to find care for your child?
          </h2>
          <p className="text-neutral-muted mb-8">
            Browse licensed daycares across BC — filter by city, age group, language, and more.
          </p>
          <Link
            href="/find"
            className="inline-block bg-primary-green text-white px-10 py-3.5 rounded-full font-medium hover:bg-opacity-90 transition text-lg"
          >
            Find a Daycare →
          </Link>
        </div>
      </section>
    </div>
  );
}
