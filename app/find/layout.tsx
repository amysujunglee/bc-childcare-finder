import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Childcare in BC | BC Childcare Finder',
  description: 'Search licensed daycare homes and centres across BC. Filter by city, age group, language, schedule type, and $10/Day eligibility.',
};

export default function FindLayout({ children }: { children: React.ReactNode }) {
  return children;
}
