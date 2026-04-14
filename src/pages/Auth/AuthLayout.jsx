import { Link } from 'react-router-dom';
import { RiHeartPulseLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

export default function AuthLayout({ children, title, subtitle }) {
  const {t} = useTranslation();
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/assets/hero2.jpg)',
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
            <RiHeartPulseLine size={20} className="text-teal-400" />
          </div>
          <span className="font-extrabold text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Docs<span className="text-teal-400">Aura</span>
          </span>
        </Link>
        <div className="relative z-10">
          <blockquote className="text-xl font-medium text-white leading-relaxed mb-4">
            {t('auth.auth_subtitle')}
          </blockquote>
          <div className="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="Aicha" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-white font-semibold text-sm">Aicha Bennani</p>
              <p className="text-slate-100 text-xs">{t('auth.auth_user')}</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[['120+', 'Doctors'], ['50k+', 'Patients'], ['4.9★', 'Rating']].map(([v, l]) => (
            <div key={l}>
              <p className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{v}</p>
              <p className="text-slate-400 text-xs">{t('auth.auth_' + l.toLowerCase())}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
                <RiHeartPulseLine size={16} color="white" />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Docs<span className="text-teal-700">Aura</span>
              </span>
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h1>
            {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}