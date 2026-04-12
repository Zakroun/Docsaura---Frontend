import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { FiMenu, FiX, FiLogOut, FiGlobe, FiChevronDown, FiUser, FiGrid } from 'react-icons/fi';
import { RiHeartPulseLine } from 'react-icons/ri';

const langs = [
  { code: 'en', label: 'English', flag: '/assets/flags/uk.png' },
  { code: 'fr', label: 'Français', flag: '/assets/flags/fr.png' },
  { code: 'ar', label: 'العربية', flag: '/assets/flags/ar.png' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { lang, changeLanguage } = useLang();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const fn = () => { setLangOpen(false); setUserOpen(false); };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);

  const navLinks = [
    { to: '/',        label: t('nav.home'),    end: true },
    { to: '/doctors', label: t('nav.doctors') },
    { to: '/clinics', label: t('nav.clinics') },
    { to: '/labs',    label: t('nav.labs') },
    { to: '/about',   label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const handleLogout = () => { logout(); navigate('/'); setUserOpen(false); };

  const navbarBg = scrolled
    ? 'bg-white border-b border-slate-100 shadow-sm'
    : 'bg-white/90 backdrop-blur-lg border-b border-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
            <RiHeartPulseLine size={17} color="white" />
          </div>
          <span className="font-extrabold text-xl text-slate-900 hidden sm:block" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Docs<span className="text-teal-700">Aura</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">

          {/* Language dropdown */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setLangOpen(p => !p); setUserOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <FiGlobe size={15} />
              <span className="font-medium">{lang.toUpperCase()}</span>
              <FiChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 w-36 z-50">
                {langs.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { changeLanguage(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                      lang === l.code ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <img src={l.flag} alt={l.label} className="w-4 h-4 rounded-sm object-cover" />
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => { setUserOpen(p => !p); setLangOpen(false); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="font-medium text-slate-800 max-w-[80px] truncate">{user.name?.split(' ')[0]}</span>
                <FiChevronDown size={12} className={`text-slate-400 transition-transform ${userOpen ? 'rotate-180' : ''}`} />
              </button>
              {userOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 w-48 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <FiGrid size={14} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut size={14} /> {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
              >
                {t('nav.login')}
              </Link>
              <Link to="/register"
                className="px-5 py-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(p => !p)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
            {langs.map(l => (
              <button key={l.code}
                onClick={() => { changeLanguage(l.code); setMobileOpen(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  lang === l.code ? 'border-teal-600 text-teal-700 bg-teal-50' : 'border-slate-200 text-slate-600'
                }`}
              >
                <img src={l.flag} alt={l.label} className="w-4 h-4 rounded-sm object-cover" />
              {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-700"
                >
                  <FiGrid size={15} /> Dashboard
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-50 rounded-xl text-sm font-medium text-red-600"
                >
                  <FiLogOut size={15} /> {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700"
                >
                  {t('nav.login')}
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 bg-teal-700 text-white rounded-xl text-sm font-semibold"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
