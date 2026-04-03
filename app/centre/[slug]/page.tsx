import type { Metadata } from 'next';
import { getCentreBySlug } from '@/lib/mock-data';
import { formatAgeGroups } from '@/lib/utils';
import { notFound } from 'next/navigation';
import CentreDetail from '@/components/CentreDetail';

interface CentrePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CentrePageProps): Promise<Metadata> {
  const centre = getCentreBySlug(params.slug);
  if (!centre) return { title: 'Centre Not Found' };

  const ageLabel = formatAgeGroups(centre.ageGroups);
  const spotsText = centre.spotsAvailable > 0 ? `${centre.spotsAvailable} spots available.` : 'Currently full.';
  const tenDollarText = centre.tenDollarDay ? ' $10/Day eligible.' : '';

  return {
    title: `${centre.name} – ${centre.city} | BC Childcare Finder`,
    description: `${centre.name} in ${centre.city}. Licensed childcare for ${ageLabel}.${tenDollarText} ${spotsText}`,
  };
}

export default function CentrePage({ params }: CentrePageProps) {
  const centre = getCentreBySlug(params.slug);
  if (!centre) notFound();
  return <CentreDetail centre={centre!} />;
}
