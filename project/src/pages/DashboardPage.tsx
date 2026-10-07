import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Users,
  CheckSquare,
  Briefcase,
  Clock,
  MapPin,
  ArrowRight,
  Camera,
  Sparkles,
  Music2,
  Flower2,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Countdown } from '@/components/Countdown';
import { EventCard } from '@/components/EventCard';
import { useLanguage } from '@/hooks/useLanguage';
import {
  weddingInfo,
  images,
  todaySchedule,
  progressStages,
  eventsData,
  bookedServices,
  notificationsData,
} from '@/data/mockData';

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Sparkles,
  Music2,
  Flower2,
  UtensilsCrossed,
};

export function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { label: 'Wedding Events', value: 12, icon: CalendarDays, color: 'bg-burgundy-600' },
    { label: 'Guests', value: 248, icon: Users, color: 'bg-rose-500' },
    { label: 'Tasks', value: 18, icon: CheckSquare, color: 'bg-champagne-500' },
    { label: 'Services Booked', value: 9, icon: Briefcase, color: 'bg-green-600' },
  ];

  return (
    <Layout title={t('dashboard')} subtitle={`${weddingInfo.brideName} & ${weddingInfo.groomName}`}>
      {/* Hero */}
      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <img src={images.heroBride} alt="Indian wedding" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-950/85 via-burgundy-900/55 to-transparent" />
        </div>
        <div className="relative flex flex-col px-6 py-10 sm:px-10 sm:py-14 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne-300">
            {t('daysToGo')}: <Countdown targetDate={weddingInfo.weddingDateISO} />
          </p>
          <h1 className="mt-3 max-w-xl text-3xl font-semibold text-white drop-shadow sm:text-4xl lg:text-5xl">
            Your Wedding, Beautifully Planned
          </h1>
          <p className="mt-2 text-lg font-serif text-champagne-200">
            {weddingInfo.brideName} & {weddingInfo.groomName}
          </p>
          <p className="text-sm text-white/80">{weddingInfo.weddingDate}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
            <MapPin className="h-4 w-4" /> {weddingInfo.location}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/journey')}
              className="btn-gold"
            >
              {t('viewWeddingJourney')}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/events')}
              className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {t('addEvent')}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color} text-white`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-burgundy-900">{stat.value}</p>
              <p className="text-sm text-charcoal/60">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's schedule */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-burgundy-900">
            {t('todaysSchedule')}
          </h3>
          <div className="space-y-3">
            {todaySchedule.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-burgundy-50 p-3 transition-colors hover:bg-burgundy-50/30"
              >
                <div className="flex w-20 flex-shrink-0 flex-col items-center">
                  <Clock className="h-4 w-4 text-burgundy-400" />
                  <p className="mt-1 text-xs font-medium text-burgundy-700">{item.time}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                  <p className="text-xs text-charcoal/50">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent notifications */}
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-burgundy-900">
              {t('recentNotifications')}
            </h3>
            <button
              onClick={() => navigate('/notifications')}
              className="text-xs font-medium text-burgundy-600 hover:text-burgundy-800"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {notificationsData.slice(0, 4).map((n) => (
              <div key={n.id} className="border-b border-burgundy-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-2">
                  {!n.read && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-burgundy-500" />}
                  <div className={n.read ? 'pl-4' : ''}>
                    <p className="text-sm font-medium text-charcoal">{n.title}</p>
                    <p className="text-xs text-charcoal/60">{n.message}</p>
                    <p className="mt-0.5 text-[11px] text-charcoal/40">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wedding journey progress */}
      <div className="mt-6 card p-5">
        <h3 className="mb-5 text-base font-semibold text-burgundy-900">
          {t('weddingJourneyProgress')}
        </h3>
        <div className="flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-0">
          {progressStages.map((stage, i) => (
            <div key={stage} className="flex items-center sm:flex-col sm:gap-2">
              <div className="flex items-center sm:flex-col sm:gap-2">
                <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all sm:h-10 sm:w-10 ${
                    i === 0
                      ? 'bg-champagne-100 text-champagne-700 ring-2 ring-champagne-300'
                      : 'bg-burgundy-50 text-burgundy/50'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-xs font-medium text-charcoal/70 sm:text-center">{stage}</span>
                </div>
                {i < progressStages.length - 1 && (
                  <div className="hidden h-0.5 w-8 bg-burgundy-100 sm:block lg:w-12" />
                )}
                {i < progressStages.length - 1 && (
                  <div className="ml-3 hidden h-0.5 w-0 bg-burgundy-100 sm:hidden" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events */}
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-burgundy-900">{t('upcomingEvents')}</h3>
          <button
            onClick={() => navigate('/events')}
            className="text-sm font-medium text-burgundy-600 hover:text-burgundy-800"
          >
            View All
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventsData.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} onView={() => navigate('/events')} />
          ))}
        </div>
      </div>

      {/* Booked services */}
      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-burgundy-900">{t('bookedServices')}</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {bookedServices.map((service) => {
            const Icon = iconMap[service.icon] ?? Briefcase;
            return (
              <div key={service.name} className="card overflow-hidden">
                <div className="relative h-24">
                  <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-burgundy-900/30" />
                  <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 shadow-sm">
                    <Icon className="h-4.5 w-4.5 text-burgundy-700" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-burgundy-900">{service.name}</p>
                  <p className="text-xs text-charcoal/50">{service.vendor}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
