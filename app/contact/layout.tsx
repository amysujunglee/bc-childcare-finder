import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Find Care BC',
  description: 'Get in touch with the Find Care BC team. Report incorrect information, ask questions, or share feedback.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
