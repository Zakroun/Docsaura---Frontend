import { Link } from 'react-router-dom';
import { RiHeartPulseLine } from 'react-icons/ri';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(20,184,166,0.08) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
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
            "DocsAura helped me find a specialist in minutes. The booking process was seamless."
          </blockquote>
          <div className="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="Aicha" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-white font-semibold text-sm">Aicha Bennani</p>
              <p className="text-slate-400 text-xs">Patient, Rabat</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[['120+', 'Doctors'], ['50k+', 'Patients'], ['4.9★', 'Rating']].map(([v, l]) => (
            <div key={l}>
              <p className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{v}</p>
              <p className="text-slate-400 text-xs">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
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
