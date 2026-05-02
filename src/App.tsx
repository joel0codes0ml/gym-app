/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MarketingNavbar, MarketingFooter } from '@/src/components/layout/MarketingLayout';
import { Sidebar } from '@/src/components/layout/Sidebar';

// Marketing Pages
import LandingPage from '@/src/pages/marketing/LandingPage';
import FeaturesPage from '@/src/pages/marketing/FeaturesPage';
import PricingPage from '@/src/pages/marketing/PricingPage';
import HowItWorksPage from '@/src/pages/marketing/HowItWorksPage';
import BlogPage from '@/src/pages/marketing/BlogPage';
import BlogDetailPage from '@/src/pages/marketing/BlogDetailPage';
import FAQPage from '@/src/pages/marketing/FAQPage';

// App Pages
import DashboardPage from '@/src/pages/app/DashboardPage';
import WorkoutPage from '@/src/pages/app/WorkoutPage';
import NutritionPage from '@/src/pages/app/NutritionPage';
import ProgressPage from '@/src/pages/app/ProgressPage';
import CoachPage from '@/src/pages/app/CoachPage';
import OnboardingPage from '@/src/pages/app/OnboardingPage';
import ProfilePage from '@/src/pages/app/ProfilePage';

import { ReactNode } from 'react';
import { FirebaseProvider } from '@/src/components/auth/FirebaseContext';

import { useFirebase } from '@/src/components/auth/FirebaseContext';
import { Loader } from 'lucide-react';

function MarketingWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingNavbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useFirebase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function AppContent() {
  return (
    <Routes>
      {/* Marketing Routes */}
      <Route path="/" element={<MarketingWrapper><PageTransition><LandingPage /></PageTransition></MarketingWrapper>} />
      <Route path="/features" element={<MarketingWrapper><PageTransition><FeaturesPage /></PageTransition></MarketingWrapper>} />
      <Route path="/pricing" element={<MarketingWrapper><PageTransition><PricingPage /></PageTransition></MarketingWrapper>} />
      <Route path="/how-it-works" element={<MarketingWrapper><PageTransition><HowItWorksPage /></PageTransition></MarketingWrapper>} />
      <Route path="/blog" element={<MarketingWrapper><PageTransition><BlogPage /></PageTransition></MarketingWrapper>} />
      <Route path="/blog/:slug" element={<MarketingWrapper><PageTransition><BlogDetailPage /></PageTransition></MarketingWrapper>} />
      <Route path="/faq" element={<MarketingWrapper><PageTransition><FAQPage /></PageTransition></MarketingWrapper>} />

      {/* App Routes */}
      <Route path="/app/dashboard" element={<AppWrapper><PageTransition><DashboardPage /></PageTransition></AppWrapper>} />
      <Route path="/app/workout" element={<AppWrapper><PageTransition><WorkoutPage /></PageTransition></AppWrapper>} />
      <Route path="/app/nutrition" element={<AppWrapper><PageTransition><NutritionPage /></PageTransition></AppWrapper>} />
      <Route path="/app/progress" element={<AppWrapper><PageTransition><ProgressPage /></PageTransition></AppWrapper>} />
      <Route path="/app/coach" element={<AppWrapper><PageTransition><CoachPage /></PageTransition></AppWrapper>} />
      <Route path="/app/onboarding" element={<ProtectedRoute><PageTransition><OnboardingPage /></PageTransition></ProtectedRoute>} />
      <Route path="/app/profile" element={<AppWrapper><PageTransition><ProfilePage /></PageTransition></AppWrapper>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <FirebaseProvider>
        <AppContent />
      </FirebaseProvider>
    </Router>
  );
}
