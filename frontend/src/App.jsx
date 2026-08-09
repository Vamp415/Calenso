import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

import { Layout } from "./components/layout/Layout";
import { PageTransition } from "./components/layout/PageTransition";
import { LoadingScreen } from "./components/ui/spinner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import {
  HomeSEO,
  DashboardSEO,
  EventsSEO,
  MeetingsSEO,
  AvailabilitySEO,
} from "./components/SEO";

// Lazy load pages for better performance (code splitting)
const Landing = lazy(() => import("./pages/Landing").then(m => ({ default: m.Landing })));
const Login = lazy(() => import("./pages/Login").then(m => ({ default: m.Login })));
const Signup = lazy(() => import("./pages/Signup").then(m => ({ default: m.Signup })));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword").then(m => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import("./pages/ResetPassword").then(m => ({ default: m.ResetPassword })));
const Dashboard = lazy(() => import("./pages/Dashboard").then(m => ({ default: m.Dashboard })));
const Events = lazy(() => import("./pages/Events").then(m => ({ default: m.Events })));
const Meetings = lazy(() => import("./pages/Meetings").then(m => ({ default: m.Meetings })));
const Availability = lazy(() => import("./pages/Availability").then(m => ({ default: m.Availability })));
const UserProfile = lazy(() => import("./pages/UserProfile").then(m => ({ default: m.UserProfile })));
const BookingPage = lazy(() => import("./pages/BookingPage").then(m => ({ default: m.BookingPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Suspense wrapper for lazy loaded components
function LazyPage({ children }) {
  return (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      {children}
    </Suspense>
  );
}

// Component that uses useLocation - must be inside Router
function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <PageTransition>
              <LazyPage>
                <HomeSEO />
                <Landing />
              </LazyPage>
            </PageTransition>
          } />
          <Route path=":username" element={
            <PageTransition>
              <LazyPage>
                <UserProfile />
              </LazyPage>
            </PageTransition>
          } />
          <Route path=":username/:eventId" element={
            <PageTransition>
              <LazyPage>
                <BookingPage />
              </LazyPage>
            </PageTransition>
          } />

          {/* Auth routes */}
          <Route path="login" element={
            <PageTransition>
              <LazyPage>
                <Login />
              </LazyPage>
            </PageTransition>
          } />
          <Route path="signup" element={
            <PageTransition>
              <LazyPage>
                <Signup />
              </LazyPage>
            </PageTransition>
          } />
          <Route path="forgot-password" element={
            <PageTransition>
              <LazyPage>
                <ForgotPassword />
              </LazyPage>
            </PageTransition>
          } />
          <Route path="reset-password" element={
            <PageTransition>
              <LazyPage>
                <ResetPassword />
              </LazyPage>
            </PageTransition>
          } />

          {/* Protected routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <PageTransition>
                <LazyPage>
                  <DashboardSEO />
                  <Dashboard />
                </LazyPage>
              </PageTransition>
            </ProtectedRoute>
          } />
          <Route path="events" element={
            <ProtectedRoute>
              <PageTransition>
                <LazyPage>
                  <EventsSEO />
                  <Events />
                </LazyPage>
              </PageTransition>
            </ProtectedRoute>
          } />
          <Route path="meetings" element={
            <ProtectedRoute>
              <PageTransition>
                <LazyPage>
                  <MeetingsSEO />
                  <Meetings />
                </LazyPage>
              </PageTransition>
            </ProtectedRoute>
          } />
          <Route path="availability" element={
            <ProtectedRoute>
              <PageTransition>
                <LazyPage>
                  <AvailabilitySEO />
                  <Availability />
                </LazyPage>
              </PageTransition>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
