import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { VendorCard } from '@/components/VendorCard';
import { BookingModal } from '@/components/BookingModal';
import { SearchBar } from '@/components/SearchFilter';
import { useLanguage } from '@/hooks/useLanguage';
import { vendorsData, images } from '@/data/mockData';
import type { Vendor } from '@/types';

interface VendorPageProps {
  title: string;
  subtitle: string;
  pageTitle: string;
  pageDescription: string;
  heroImage: string;
  category?: string;
  showPortfolio?: boolean;
  serviceCategories?: string[];
}

export function VendorPage({
  title,
  subtitle,
  pageTitle,
  pageDescription,
  heroImage,
  category,
  showPortfolio,
  serviceCategories,
}: VendorPageProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [bookingVendor, setBookingVendor] = useState<Vendor | null>(null);

  const allVendors = category
    ? vendorsData.filter((v) => v.category === category)
    : vendorsData;

  const filtered = allVendors.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <Layout title={title} subtitle={subtitle}>
      <PageHeader title={pageTitle} description={pageDescription} image={heroImage} />

      {serviceCategories && (
        <div className="mb-6 flex flex-wrap gap-2">
          {serviceCategories.map((cat) => (
            <span key={cat} className="rounded-lg bg-burgundy-50 px-3 py-1.5 text-xs font-medium text-burgundy-600">
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <SearchBar value={search} onChange={setSearch} placeholder="Search vendors by name or location..." />
      </div>

      {/* Vendor grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onBook={() => setBookingVendor(vendor)}
            showPortfolio={showPortfolio}
            onPortfolio={() => setBookingVendor(vendor)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-charcoal/50">No vendors found matching your search.</p>
        </div>
      )}

      <BookingModal
        isOpen={!!bookingVendor}
        onClose={() => setBookingVendor(null)}
        vendor={bookingVendor}
      />
    </Layout>
  );
}

// ─── Specific vendor pages ───

export function ServicesPage() {
  return (
    <VendorPage
      title="Services"
      subtitle="All wedding service vendors"
      pageTitle="Wedding Services Directory"
      pageDescription="Discover trusted vendors for every aspect of your wedding"
      heroImage={images.stageFloral}
      serviceCategories={['Makeup Artists', 'DJ / Music', 'Photography', 'Decoration', 'Catering']}
    />
  );
}

export function MakeupPage() {
  return (
    <VendorPage
      title="Makeup Artists"
      subtitle="Bridal makeup and grooming"
      pageTitle="Makeup Artists"
      pageDescription="Professional bridal makeup and grooming artists"
      heroImage={images.makeup}
      category="Makeup Artists"
      serviceCategories={['Bridal Makeup', 'Groom Grooming', 'Hairstyling', 'Reception Makeup', 'Mehendi/Haldi Makeup']}
    />
  );
}

export function MusicDjPage() {
  return (
    <VendorPage
      title="Music & DJ"
      subtitle="DJ and music services"
      pageTitle="Music & DJ"
      pageDescription="Set the perfect mood with professional DJ and music services"
      heroImage={images.dj}
      category="DJ / Music"
      serviceCategories={['Sangeet DJ', 'DJ Night', 'Sound Equipment', 'Lighting', 'MC Services']}
    />
  );
}

export function PhotographyPage() {
  return (
    <VendorPage
      title="Photography"
      subtitle="Capture every moment"
      pageTitle="Photography & Videography"
      pageDescription="Beautiful wedding photography and cinematic films"
      heroImage={images.photography}
      category="Photography"
      showPortfolio
      serviceCategories={['Wedding Photography', 'Candid Photography', 'Pre-Wedding', 'Videography', 'Drone Photography', 'Traditional']}
    />
  );
}

export function DecorationPage() {
  return (
    <VendorPage
      title="Decoration"
      subtitle="Wedding decor and styling"
      pageTitle="Wedding Decoration"
      pageDescription="Stunning floral and thematic decor for every celebration"
      heroImage={images.mandap}
      category="Decoration"
      serviceCategories={['Wedding Stage', 'Mandap', 'Reception', 'Mehendi', 'Haldi', 'Entrance', 'Floral', 'Lighting']}
    />
  );
}

export function CateringPage() {
  return (
    <VendorPage
      title="Catering"
      subtitle="Food and beverage services"
      pageTitle="Wedding Catering"
      pageDescription="Delicious cuisine for your wedding celebrations"
      heroImage={images.food}
      category="Catering"
      serviceCategories={['Vegetarian', 'Non-Vegetarian', 'South Indian', 'North Indian', 'Snacks', 'Desserts', 'Beverages']}
    />
  );
}
