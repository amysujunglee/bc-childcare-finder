import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | BC Childcare Finder',
  description: 'Get in touch with the BC Childcare Finder team. Report incorrect information, ask questions, or share feedback.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
