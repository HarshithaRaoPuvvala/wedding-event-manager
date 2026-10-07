import { Calendar, Clock, MapPin, User, FileText, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/hooks/useLanguage';
import { journeyStages, images } from '@/data/mockData';
import type { EventStatus } from '@/types';

const statusColor: Record<EventStatus, string> = {
  'Completed': 'bg-green-500',
  'In Progress': 'bg-champagne-500',
  'Upcoming': 'bg-burgundy-500',
};

export function JourneyPage() {
  const { t } = useLanguage();

  return (
    <Layout title={t('weddingJourney')} subtitle="12 stages from preparation to Vidai">
      <PageHeader
        title="Wedding Journey Timeline"
        description="Follow every stage of Aishwarya & Rohan's wedding celebration"
        image={images.ceremony}
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-burgundy-100 sm:left-8" />

        <div className="space-y-6">
          {journeyStages.map((stage, index) => (
            <div key={stage.id} className="relative flex gap-4 sm:gap-6">
              {/* Number bubble */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-md sm:h-16 sm:w-16 sm:text-lg ${statusColor[stage.status]}`}
                >
                  {index + 1}
                </div>
              </div>

              {/* Content card */}
              <div className="card flex-1 overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-32 sm:h-auto sm:w-48">
                    <img src={stage.image} alt={stage.name} className="h-full w-full object-cover" />
                    <div className="absolute right-2 top-2">
                      <StatusBadge status={stage.status} type="event" />
                    </div>
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="text-lg font-semibold text-burgundy-900">{stage.name}</h3>
                    <p className="mt-1 text-sm text-charcoal/60">{stage.description}</p>
                    <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-charcoal/70 sm:grid-cols-2">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-burgundy-400" /> {stage.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-burgundy-400" /> {stage.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-burgundy-400" /> {stage.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <User className="h-4 w-4 text-burgundy-400" /> {stage.responsiblePerson}
                      </p>
                    </div>
                    <div className="mt-4 border-t border-burgundy-50 pt-3">
                      <p className="flex items-start gap-2 text-xs text-charcoal/50">
                        <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                        <span><strong className="text-charcoal/70">Dress Code:</strong> {stage.dressCode} · <strong className="text-charcoal/70">Notes:</strong> {stage.notes}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center gap-6 rounded-xl border border-burgundy-50 bg-white p-4">
        <p className="text-sm font-medium text-charcoal/70">Status Legend:</p>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-burgundy-500" />
          <span className="text-sm text-charcoal/60">Upcoming</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-champagne-500" />
          <span className="text-sm text-charcoal/60">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm text-charcoal/60">Completed</span>
        </div>
      </div>
    </Layout>
  );
}
