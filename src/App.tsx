import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DashboardSidebar from './components/layout/DashboardSidebar';
import CookieBanner from './components/layout/CookieBanner';

const HomePage = lazy(() => import('./pages/landing/HomePage'));
const PricingPage = lazy(() => import('./pages/landing/PricingPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const OnboardingPage = lazy(() => import('./pages/auth/OnboardingPage'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const NoteEditorPage = lazy(() => import('./pages/dashboard/NoteEditorPage'));
const NotesListPage = lazy(() => import('./pages/dashboard/NotesListPage'));
const NoteViewPage = lazy(() => import('./pages/dashboard/NoteViewPage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'));
const SOAPNotePage = lazy(() => import('./pages/seo/SOAPNotePage'));
const DAPNotePage = lazy(() => import('./pages/seo/DAPNotePage'));
const EMDRNotePage = lazy(() => import('./pages/seo/EMDRNotePage'));
const FreeTemplatesPage = lazy(() => import('./pages/seo/FreeTemplatesPage'));
const CounselorNotesPage = lazy(() => import('./pages/seo/CounselorNotesPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const HIPAAPage = lazy(() => import('./pages/legal/HIPAAPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#0E7A5F] border-t-transparent rounded-full animate-spin" />
  </div>
);

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <CookieBanner />
    </div>
  );
}

function DashboardLayout() {
  const { user, loading, profile } = useAuth();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (user && !profile) return <Navigate to="/onboarding" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/soap-note-generator" element={<SOAPNotePage />} />
              <Route path="/dap-notes-therapist" element={<DAPNotePage />} />
              <Route path="/emdr-therapy-notes" element={<EMDRNotePage />} />
              <Route path="/free-soap-note-templates" element={<FreeTemplatesPage />} />
              <Route path="/ai-notes-for-counselors" element={<CounselorNotesPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/hipaa" element={<HIPAAPage />} />
              <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
              <Route path="/signup" element={<AuthRedirect><SignupPage /></AuthRedirect>} />
            </Route>

            <Route path="/onboarding" element={
              <Suspense fallback={<PageLoader />}>
                <OnboardingPage />
              </Suspense>
            } />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="new" element={<NoteEditorPage />} />
              <Route path="notes" element={<NotesListPage />} />
              <Route path="notes/:id" element={<NoteViewPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
