import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, ToastProvider } from '@/components/providers';
import { DashboardPage } from '@/pages/DashboardPage';
import { JourneyPage } from '@/pages/JourneyPage';
import { EventsPage } from '@/pages/EventsPage';
import { BridePage, GroomPage } from '@/pages/PreparationPages';
import { GuestsPage } from '@/pages/GuestsPage';
import {
  ServicesPage,
  MakeupPage,
  MusicDjPage,
  PhotographyPage,
  DecorationPage,
  CateringPage,
} from '@/pages/VendorPages';
import { JewelleryPage, ClothesPage } from '@/pages/RentalPages';
import { TasksPage } from '@/pages/TasksPage';
import { BudgetPage } from '@/pages/BudgetPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { LanguagePage } from '@/pages/LanguagePage';
import { SupportPage } from '@/pages/SupportPage';
import { SangeetPage } from '@/pages/SangeetPage';

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/bride" element={<BridePage />} />
            <Route path="/groom" element={<GroomPage />} />
            <Route path="/guests" element={<GuestsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/jewellery" element={<JewelleryPage />} />
            <Route path="/clothes" element={<ClothesPage />} />
            <Route path="/music-dj" element={<MusicDjPage />} />
            <Route path="/photography" element={<PhotographyPage />} />
            <Route path="/decoration" element={<DecorationPage />} />
            <Route path="/catering" element={<CateringPage />} />
            <Route path="/makeup" element={<MakeupPage />} />
            <Route path="/sangeet" element={<SangeetPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </LanguageProvider>
  );
}
