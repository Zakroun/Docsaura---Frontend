import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiCalendar, FiClock, FiUser, FiActivity,
  FiArrowRight, FiCheckCircle, FiAlertCircle, FiHeart
} from 'react-icons/fi';
import { RiStethoscopeLine, RiCalendarCheckLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { doctors } from '../../data/doctors';
import { clinics } from '../../data/clinics';
import { laboratories } from '../../data/laboratories';
import SectionHeader from '../../components/common/SectionHeader';

const tips = [
  "tipe1",
  "tipe2",
  "tipe3",
  "tipe4",
  "tipe5",
];

const quickLinks = [
  { to: '/doctors', label: 'link1', icon: RiStethoscopeLine, color: 'bg-teal-50 border-teal-200 text-teal-700' },
  { to: '/clinics', label: 'link2', icon: FiActivity, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { to: '/labs', label: 'link3', icon: FiCheckCircle, color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { to: '/contact', label: 'link4', icon: FiUser, color: 'bg-amber-50 border-amber-200 text-amber-700' },
];

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [bookings] = useLocalStorage('docsaura_bookings', []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const tip = tips[Math.floor(Date.now() / 86400000) % tips.length];
  const now = new Date();
  const upcoming = bookings.filter(b => b.date && new Date(b.date) >= now);
  const past = bookings.filter(b => b.date && new Date(b.date) < now);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-700 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              <FiUser size={24} className="text-white" />
            </div>
            <div>
              <p className="text-teal-200 text-sm">{t('Dashboard.hello')},</p>
              <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {user?.name || 'Patient'}
              </h1>
              <p className="text-teal-200 text-xs mt-0.5">{user?.email}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'total_bookings', value: bookings.length || 0, icon: FiCalendar },
              { label: 'upcoming_bookings', value: upcoming.length || 0, icon: RiCalendarCheckLine },
              { label: 'completed_bookings', value: past.length || 0, icon: FiCheckCircle },
              { label: 'saved_bookings', value: 0, icon: FiHeart },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-teal-200 text-xs">{t('Dashboard.stats.' + s.label)}</p>
                  <s.icon size={15} className="text-teal-300" />
                </div>
                <p className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming appointments */}
            <div>
              <SectionHeader title={t('Dashboard.upcoming_title')} eyebrow={t('Dashboard.upcoming_eyebrow')} />
              {upcoming.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <FiCalendar size={24} className="text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('Dashboard.no_upcoming_title')}</h3>
                  <p className="text-sm text-slate-500 mb-5">{t('Dashboard.no_upcoming_desc')}</p>
                  <Link to="/doctors" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-white font-semibold rounded-xl text-sm hover:bg-teal-800 transition-colors">
                    {t('Dashboard.find_doctor')} <FiArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((b, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                        <FiCalendar size={20} className="text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 text-sm">{b.doctorName || 'Medical Appointment'}</p>
                        <div className="flex gap-3 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><FiCalendar size={11} />{b.date}</span>
                          <span className="flex items-center gap-1"><FiClock size={11} />{b.time}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        {t('Dashboard.confirmed')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past appointments */}
            {past.length > 0 && (
              <div>
                <SectionHeader title="Past Appointments" eyebrow="History" />
                <div className="space-y-3">
                  {past.slice(0, 3).map((b, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 opacity-70">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        <FiCheckCircle size={20} className="text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">{b.doctorName || 'Medical Appointment'}</p>
                        <div className="flex gap-3 mt-1 text-xs text-slate-500">
                          <span>{b.date}</span><span>{b.time}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full">{t('Dashboard.completed')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested doctors */}
            <div>
              <SectionHeader title={t('Dashboard.suggested_title')} eyebrow={t('Dashboard.suggested_eyebrow')} linkTo="/doctors" linkLabel={t('Dashboard.suggested_linkLabel')} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctors.slice(0, 2).map(doc => (
                  <Link key={doc.id} to={`/doctors/${doc.id}`}
                    className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 card-hover"
                  >
                    <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.specialty}</p>
                      <p className="text-xs text-teal-600 font-semibold mt-1">⭐ {doc.rating} · {doc.consultationFee} {t('price')}</p>
                    </div>
                    <FiArrowRight size={15} className="text-slate-400 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health tip */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <FiHeart size={15} className="text-teal-600" />
                <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">{t('Dashboard.health_tip')}</p>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{t('Dashboard.tips.' + tip)}</p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{t('Dashboard.quick_actions.title')}</p>
              <div className="space-y-2">
                {quickLinks.map((link, i) => (
                  <Link key={i} to={link.to}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border card-hover ${link.color}`}
                  >
                    <link.icon size={16} className="shrink-0" />
                    <span className="text-sm font-medium flex-1">{t('Dashboard.quick_actions.links.' + link.label)}</span>
                    <FiArrowRight size={14} className="opacity-50" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Account info */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">{t('Dashboard.account_info.account')}</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('Dashboard.account_info.name')}</span>
                  <span className="font-medium text-slate-900">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('Dashboard.account_info.email')}</span>
                  <span className="font-medium text-slate-900 truncate max-w-[140px]">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('Dashboard.account_info.member_since')}</span>
                  <span className="font-medium text-slate-900">2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
