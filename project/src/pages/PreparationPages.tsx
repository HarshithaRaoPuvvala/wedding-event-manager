import { Clock, User, FileText, CheckSquare, Square, Loader2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/hooks/useLanguage';
import type { BridalPrepItem, TaskStatus } from '@/types';
import { images, bridalPrepData, groomPrepData } from '@/data/mockData';

interface PreparationPageProps {
  title: string;
  subtitle: string;
  pageTitle: string;
  pageDescription: string;
  heroImage: string;
  sections: string[];
  prepData: BridalPrepItem[];
  daySchedule: { time: string; title: string; location: string }[];
  accentColor: 'burgundy' | 'champagne';
}

const statusIcon: Record<TaskStatus, typeof CheckSquare> = {
  'Completed': CheckSquare,
  'In Progress': Loader2,
  'Pending': Square,
};

const statusIconColor: Record<TaskStatus, string> = {
  'Completed': 'text-green-600',
  'In Progress': 'text-blue-600',
  'Pending': 'text-charcoal/40',
};

export function PreparationPage({
  title,
  subtitle,
  pageTitle,
  pageDescription,
  heroImage,
  sections,
  prepData,
  daySchedule,
  accentColor,
}: PreparationPageProps) {
  const { t } = useLanguage();
  const accent = accentColor === 'burgundy' ? 'bg-burgundy-600' : 'bg-champagne-500';
  const completedCount = prepData.filter((p) => p.status === 'Completed').length;

  return (
    <Layout title={title} subtitle={subtitle}>
      <PageHeader
        title={pageTitle}
        description={pageDescription}
        image={heroImage}
      />

      {/* Checklist sections overview */}
      <div className="mb-6 card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-burgundy-900">Preparation Checklist</h3>
          <span className="text-sm text-charcoal/50">
            {completedCount} / {prepData.length} completed
          </span>
        </div>
        {/* Progress bar */}
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-burgundy-50">
          <div
            className={`h-full rounded-full ${accent} transition-all`}
            style={{ width: `${(completedCount / prepData.length) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {sections.map((section) => (
            <div
              key={section}
              className="flex items-center gap-2 rounded-lg border border-burgundy-50 px-3 py-2"
            >
              <span className={`h-2 w-2 rounded-full ${accent}`} />
              <span className="text-xs font-medium text-charcoal/70">{section}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Appointments checklist */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-burgundy-900">Appointments & Checklist</h3>
          <div className="space-y-2">
            {prepData.map((item) => {
              const Icon = statusIcon[item.status];
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-xl border border-burgundy-50 p-3 transition-colors hover:bg-burgundy-50/30"
                >
                  <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${statusIconColor[item.status]}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-charcoal">{item.appointment}</p>
                      <StatusBadge status={item.status} type="task" />
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-charcoal/50">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {item.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> {item.vendor}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="mt-1 flex items-start gap-1 text-xs text-charcoal/40">
                        <FileText className="mt-0.5 h-3 w-3 flex-shrink-0" /> {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day schedule */}
        <div className="card p-5">
          <h3 className="mb-4 text-base font-semibold text-burgundy-900">Wedding Day Schedule</h3>
          <div className="space-y-3">
            {daySchedule.map((item, i) => (
              <div
                key={i}
                className="relative border-l-2 border-burgundy-100 pl-4"
              >
                <div className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${accent}`} />
                <p className="text-xs font-semibold text-burgundy-700">{item.time}</p>
                <p className="text-sm font-medium text-charcoal">{item.title}</p>
                <p className="text-xs text-charcoal/50">{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export function BridePage() {
  return (
    <PreparationPage
      title="Bride"
      subtitle="Aishwarya's wedding preparation"
      pageTitle="Bride's Wedding Preparation"
      pageDescription="Every detail of Aishwarya's bridal journey, beautifully organized"
      heroImage={images.brideRedLehenga}
      sections={[
        'Bridal Makeup',
        'Hairstyling',
        'Jewellery',
        'Bridal Outfit',
        'Reception Outfit',
        'Mehendi Outfit',
        'Haldi Outfit',
        'Shoes',
        'Accessories',
        'Mehendi Appointment',
        'Beauty Appointments',
      ]}
      prepData={bridalPrepData}
      daySchedule={[
        { time: '8:00 AM', title: 'Hairstyling', location: 'Bridal Suite' },
        { time: '10:00 AM', title: 'Bridal Makeup', location: 'Bridal Suite' },
        { time: '12:00 PM', title: 'Jewellery & Dressing', location: 'Bridal Suite' },
        { time: '2:00 PM', title: 'Photography Session', location: 'Garden Lawn' },
        { time: '4:00 PM', title: 'Baraat Welcome', location: 'Hotel Entrance' },
        { time: '5:00 PM', title: 'Wedding Ceremony', location: 'Mandap' },
      ]}
      accentColor="burgundy"
    />
  );
}

export function GroomPage() {
  return (
    <PreparationPage
      title="Groom"
      subtitle="Rohan's wedding preparation"
      pageTitle="Groom's Wedding Preparation"
      pageDescription="Every detail of Rohan's groom journey, beautifully organized"
      heroImage={images.groomFull}
      sections={[
        'Grooming',
        'Sherwani',
        'Reception Outfit',
        'Kurta',
        'Shoes',
        'Safa / Turban',
        'Brooch',
        'Cufflinks',
        'Accessories',
        'Groom Function Prep',
      ]}
      prepData={groomPrepData}
      daySchedule={[
        { time: '9:00 AM', title: 'Grooming Session', location: 'Groom Suite' },
        { time: '9:30 AM', title: 'Safa Tying', location: 'Groom Suite' },
        { time: '10:30 AM', title: 'Sherwani & Dressing', location: 'Groom Suite' },
        { time: '12:00 PM', title: 'Photography', location: 'Lobby' },
        { time: '3:00 PM', title: 'Baraat Procession', location: 'Hotel Entrance' },
        { time: '5:00 PM', title: 'Wedding Ceremony', location: 'Mandap' },
      ]}
      accentColor="champagne"
    />
  );
}
