import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Route,
  CalendarDays,
  Heart,
  UserRound,
  Users,
  Briefcase,
  Gem,
  Shirt,
  Music2,
  Camera,
  Flower2,
  UtensilsCrossed,
  Sparkles,
  CheckSquare,
  Wallet,
  Bell,
  Globe,
  LifeBuoy,
  X,
  Heart as HeartIcon,
  Music4,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { weddingInfo } from '@/data/mockData';

interface NavItem {
  to: string;
  labelKey: string;
  icon: typeof LayoutDashboard;
}

interface NavGroup {
  titleKey: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    titleKey: 'overview',
    items: [
      { to: '/', labelKey: 'dashboard', icon: LayoutDashboard },
      { to: '/journey', labelKey: 'weddingJourney', icon: Route },
      { to: '/events', labelKey: 'eventsFunctions', icon: CalendarDays },
    ],
  },
  {
    titleKey: 'couple',
    items: [
      { to: '/bride', labelKey: 'bride', icon: Heart },
      { to: '/groom', labelKey: 'groom', icon: UserRound },
      { to: '/guests', labelKey: 'guests', icon: Users },
    ],
  },
  {
    titleKey: 'weddingServices',
    items: [
      { to: '/services', labelKey: 'services', icon: Briefcase },
      { to: '/jewellery', labelKey: 'jewelleryRental', icon: Gem },
      { to: '/clothes', labelKey: 'clothesRental', icon: Shirt },
      { to: '/music-dj', labelKey: 'musicDj', icon: Music2 },
      { to: '/photography', labelKey: 'photography', icon: Camera },
      { to: '/decoration', labelKey: 'decoration', icon: Flower2 },
      { to: '/catering', labelKey: 'catering', icon: UtensilsCrossed },
      { to: '/makeup', labelKey: 'makeupArtists', icon: Sparkles },
    ],
  },
  {
    titleKey: 'planning',
    items: [
      { to: '/sangeet', labelKey: 'sangeet', icon: Music4 },
      { to: '/tasks', labelKey: 'tasks', icon: CheckSquare },
      { to: '/budget', labelKey: 'budget', icon: Wallet },
      { to: '/notifications', labelKey: 'notifications', icon: Bell },
    ],
  },
  {
    titleKey: 'other',
    items: [
      { to: '/language', labelKey: 'language', icon: Globe },
      { to: '/support', labelKey: 'support', icon: LifeBuoy },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-charcoal/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-burgundy-100/60 bg-ivory transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-burgundy-700 text-white shadow-sm">
              <HeartIcon className="h-6 w-6" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight text-burgundy-800">
                Wedding Event
              </h1>
              <p className="text-xs text-charcoal/50">Manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-charcoal/50 hover:bg-burgundy-50 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Couple section */}
        <div className="mx-4 mb-3 rounded-xl border border-champagne-200/50 bg-gradient-to-br from-champagne-50 to-rose-50 px-4 py-3">
          <p className="font-serif text-base font-semibold text-burgundy-800">
            {weddingInfo.brideName} & {weddingInfo.groomName}
          </p>
          <p className="mt-0.5 text-xs text-charcoal/60">
            Wedding Date: {weddingInfo.weddingDate}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {navGroups.map((group) => (
            <div key={group.titleKey} className="mb-4">
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/40">
                {t(group.titleKey)}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-burgundy-50 text-burgundy-700 ring-1 ring-burgundy-100'
                              : 'text-charcoal/70 hover:bg-burgundy-50/50 hover:text-burgundy-700'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              className={`h-[18px] w-[18px] ${isActive ? 'text-burgundy-700' : 'text-charcoal/50'}`}
                            />
                            <span>{t(item.labelKey)}</span>
                            {isActive && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-burgundy-600" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-burgundy-100/60 px-5 py-3">
          <p className="text-xs text-charcoal/40">
            Premium Wedding Platform
          </p>
        </div>
      </aside>
    </>
  );
}
