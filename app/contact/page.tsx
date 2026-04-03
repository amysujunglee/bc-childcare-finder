'use client';

import { useState } from 'react';

type Role = 'parent' | 'provider' | 'other';
type Status = 'idle' | 'loading' | 'success' | 'error';

const issueTypes = [
  'Missing centre information',
  'Incorrect address or contact details',
  'Wrong age groups or schedule listed',
  '$10/Day eligibility is incorrect',
  'Centre is permanently closed',
  'Suggest a new centre to add',
  'General feedback or question',
  'Other',
];

export default function ContactPage() {
  const [role, setRole] = useState<Role>('parent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issueType, setIssueType] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name, email, issueType, message }),
      });

      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary-dark mb-3">Thank you!</h2>
          <p className="text-neutral-muted mb-8">
            We've received your message and will review it shortly. Your feedback helps us keep
            Find Care BC accurate and useful for every family.
          </p>
          <a
            href="/"
            className="inline-block bg-primary-green text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="bg-primary-dark text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-green" />
            <span className="text-primary-green text-sm font-medium uppercase tracking-widest">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Help us get it right.
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Find Care BC is a work in progress. If you spot something missing,
            outdated, or wrong — we want to hear from you. Every report makes the
            platform better for every BC family.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Who are you? */}
          <div className="bg-white rounded-card border border-neutral-border p-8 mb-6 shadow-soft">
            <h2 className="font-serif font-bold text-primary-dark text-xl mb-5">Who are you?</h2>
            <div className="grid grid-cols-3 gap-3">
              {([
                { value: 'parent', label: '👨‍👩‍👧 Parent / Guardian' },
                { value: 'provider', label: '🏠 Care Provider' },
                { value: 'other', label: '👋 Other' },
              ] as { value: Role; label: string }[]).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`py-3 px-4 rounded-card border text-sm font-medium transition-all ${
                    role === value
                      ? 'border-primary-green bg-green-50 text-primary-green'
                      : 'border-neutral-border text-neutral-muted hover:border-primary-dark hover:text-primary-dark'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-card border border-neutral-border p-8 shadow-soft space-y-6">
            <h2 className="font-serif font-bold text-primary-dark text-xl">Your message</h2>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 border border-neutral-border rounded-card text-sm text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-green placeholder:text-neutral-muted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-neutral-border rounded-card text-sm text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-green placeholder:text-neutral-muted"
                />
              </div>
            </div>

            {/* Issue Type */}
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1.5">
                What's this about?
              </label>
              <div className="relative">
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  required
                  className="w-full appearance-none pl-4 pr-10 py-2.5 border border-neutral-border rounded-card text-sm text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-green bg-white"
                >
                  <option value="" disabled>Select an issue type…</option>
                  {issueTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1.5">
                Details
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Please share as much detail as you can — centre name, city, what's incorrect, and what the correct information should be."
                className="w-full px-4 py-2.5 border border-neutral-border rounded-card text-sm text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-green placeholder:text-neutral-muted resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary-green text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>

            <p className="text-xs text-neutral-muted text-center">
              We typically respond within 1–2 business days.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
