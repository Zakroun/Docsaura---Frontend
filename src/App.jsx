import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LangProvider } from './context/LangContext';
import Layout from './components/layout/Layout';
import ChatWidget from './components/common/ChatWidget';
import './i18n';

// Lazy-loaded pages
const Home               = lazy(() => import('./pages/Home'));
const About              = lazy(() => import('./pages/About'));
const Doctors            = lazy(() => import('./pages/Doctors'));
const DoctorDetails      = lazy(() => import('./pages/DoctorDetails'));
const Clinics            = lazy(() => import('./pages/Clinics'));
const ClinicDetails      = lazy(() => import('./pages/ClinicDetails'));
const Laboratories       = lazy(() => import('./pages/Laboratories'));
const LaboratoryDetails  = lazy(() => import('./pages/LaboratoryDetails'));
const Contact            = lazy(() => import('./pages/Contact'));
const Dashboard          = lazy(() => import('./pages/Dashboard'));
const Login              = lazy(() => import('./pages/Auth/Login'));
const Register           = lazy(() => import('./pages/Auth/Register'));
const LazyForgotPassword = lazy(() => import('./pages/Auth/ResetFlow').then(m => ({ default: m.ForgotPassword })));
const LazyVerifyCode     = lazy(() => import('./pages/Auth/ResetFlow').then(m => ({ default: m.VerifyCode })));
const LazyUpdatePassword = lazy(() => import('./pages/Auth/ResetFlow').then(m => ({ default: m.UpdatePassword })));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-[120px] font-extrabold leading-none text-slate-100 select-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
        404
      </p>
      <h2 className="text-3xl font-extrabold text-slate-900 -mt-4 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
        Page not found
      </h2>
      <p className="text-slate-500 mb-8 max-w-xs">The page you're looking for doesn't exist or has been moved.</p>
      <div className="flex gap-3">
        <a href="/" className="px-6 py-3 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-colors text-sm">
          Go Home
        </a>
        <a href="/doctors" className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm">
          Find a Doctor
        </a>
      </div>
    </div>
  );
}

function S({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Auth — own layout */}
        <Route path="/login"           element={<S><Login /></S>} />
        <Route path="/register"        element={<S><Register /></S>} />
        <Route path="/forgot-password" element={<S><LazyForgotPassword /></S>} />
        <Route path="/verify-code"     element={<S><LazyVerifyCode /></S>} />
        <Route path="/update-password" element={<S><LazyUpdatePassword /></S>} />

        {/* Main layout */}
        <Route path="*" element={
          <Layout>
            <S>
              <Routes>
                <Route path="/"            element={<Home />} />
                <Route path="/about"       element={<About />} />
                <Route path="/doctors"     element={<Doctors />} />
                <Route path="/doctors/:id" element={<DoctorDetails />} />
                <Route path="/clinics"     element={<Clinics />} />
                <Route path="/clinics/:id" element={<ClinicDetails />} />
                <Route path="/labs"        element={<Laboratories />} />
                <Route path="/labs/:id"    element={<LaboratoryDetails />} />
                <Route path="/contact"     element={<Contact />} />
                <Route path="/dashboard"   element={<Dashboard />} />
                <Route path="*"            element={<NotFound />} />
              </Routes>
            </S>
          </Layout>
        } />
      </Routes>
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <LangProvider>
            <AppRoutes />
          </LangProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
