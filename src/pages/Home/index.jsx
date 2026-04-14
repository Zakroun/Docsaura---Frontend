import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiSearch, FiArrowRight, FiStar, FiCalendar, FiVideo, FiHome, FiShield
} from 'react-icons/fi';
import {
  RiShieldCheckLine, RiCalendarCheckLine, RiUserHeartLine,
  RiHeartPulseLine, RiStethoscopeLine
} from 'react-icons/ri';
import { MdOutlineLocalHospital } from 'react-icons/md';
import { GiMicroscope } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { doctors } from '../../data/doctors';
import { clinics } from '../../data/clinics';
import { laboratories } from '../../data/laboratories';
import DoctorCard from '../../components/common/DoctorCard';
import ClinicCard from '../../components/common/ClinicCard';
import LabCard from '../../components/common/LabCard';
import SectionHeader from '../../components/common/SectionHeader';

const testimonials = [
  {
    text: "testimonial_1_text",
    author: "testimonial_1_author", role: "testimonial_1_role",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5
  },
  {
    text: "testimonial_2_text",
    author: "testimonial_2_author", role: "testimonial_2_role",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg", rating: 5
  },
  {
    text: "testimonial_3_text",
    author: "testimonial_3_author", role: "testimonial_3_role",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg", rating: 5
  },
];

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('doctors');
  const specialties = [
    { label: t('home.specialties_Cardiology') , icon: RiHeartPulseLine, color: 'text-rose-600 bg-rose-50 border-rose-100', hoverborder: 'hover:border-rose-300' },
    { label: t('home.specialties_Pediatrics') , icon: RiUserHeartLine, color: 'text-violet-600 bg-violet-50 border-violet-100', hoverborder: 'hover:border-violet-300' },
    { label: t('home.specialties_Orthopedics') , icon: RiStethoscopeLine, color: 'text-blue-600 bg-blue-50 border-blue-100', hoverborder: 'hover:border-blue-300' },
    { label: t('home.specialties_Dermatology') , icon: HiOutlineSparkles, color: 'text-amber-600 bg-amber-50 border-amber-100', hoverborder: 'hover:border-amber-300' },
    { label: t('home.specialties_Neurology') , icon: RiShieldCheckLine, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', hoverborder: 'hover:border-emerald-300' },
    { label: t('home.specialties_Gynecology') , icon: FiStar, color: 'text-pink-600 bg-pink-50 border-pink-100', hoverborder: 'hover:border-pink-300' },
  ];
  const consultTypes = [
  { icon: FiCalendar, label: t('consultTypes.in_person'), desc: t('consultTypes.in_person_desc'), color: 'bg-teal-50 border-teal-200 text-teal-700' },
  { icon: FiVideo, label: t('consultTypes.video_call'), desc: t('consultTypes.video_call_desc'), color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { icon: FiHome, label: t('consultTypes.home_visit'), desc: t('consultTypes.home_visit_desc'), color: 'bg-violet-50 border-violet-200 text-violet-700' },
];
  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/${activeTab}?q=${encodeURIComponent(q)}`);
    else navigate(`/${activeTab}`);
  };

  const tabData = { doctors, clinics, labs: laboratories };
  const TabCard = activeTab === 'doctors' ? DoctorCard : activeTab === 'clinics' ? ClinicCard : LabCard;
  const tabItems = tabData[activeTab] || [];

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/hero2.jpg)' }}
        />
        {/* Overlay color on top of image */}
        <div className="absolute inset-0 bg-slate-950/75" />
        {/* Animated background effects */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-teal-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px]" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(20,184,166,0.25) 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }} />
          {/* Horizontal lines */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '100% 80px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/10 border border-teal-500/25 rounded-full text-teal-400 text-xs font-semibold mb-8 tracking-wide">
                {t('home.top_title')}
              </div>

              <h1
                className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {t('home.hero_title')}
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                {t('home.hero_subtitle')}
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-0 bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-sm max-w-xl">
                  {/* Tab switcher */}
                  <div className="flex gap-1 mb-2 sm:mb-0 sm:border-r sm:border-white/10 sm:pr-2 sm:mr-1">
                    {[
                      { key: 'doctors', icon: RiStethoscopeLine },
                      { key: 'clinics', icon: MdOutlineLocalHospital },
                      { key: 'labs', icon: GiMicroscope },
                    ].map(({ key, icon: Icon }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === key ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        <Icon size={13} /> {t(`home.${key}`)}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <FiSearch size={15} className="text-slate-400 ml-2 shrink-0" />
                    <input
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder={t('home.search_placeholder')}
                      className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none py-2"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-xl transition-colors shrink-0"
                    >
                      {t('home.search_btn')}
                    </button>
                  </div>
                </div>
              </form>

              {/* Specialty pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {specialties.map(s => (
                  <button
                    key={s.label}
                    onClick={() => navigate(`/doctors?q=${s.label}`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-full text-xs text-slate-300 hover:text-white transition-all"
                  >
                    <s.icon size={12} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — floating cards */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Main doctor card */}
              <div className="absolute top-8 left-0 right-16 bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <img src={doctors[0].avatar} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="text-white font-semibold text-sm">{doctors[0].name}</p>
                        <p className="text-slate-400 text-xs">{doctors[0].specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-teal-500/20 rounded-lg">
                        <FiStar size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs text-white font-bold">{doctors[0].rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {doctors[0].consultationTypes.map(c => (
                        <span key={c} className="px-2 py-0.5 bg-white/8 border border-white/10 rounded-md text-[10px] text-slate-300">{t('consultTypes.' + c)}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
                  <p className="text-xs text-slate-400">{t('home.next')}: <span className="text-teal-400 font-semibold">{t('home.today')} 14:00</span></p>
                  <Link to={`/doctors/${doctors[0].id}`} className="px-4 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-500 transition-colors">
                    {t('home.book')}
                  </Link>
                </div>
              </div>

              {/* Stat cards */}
              <div className="absolute bottom-24 left-0 bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-44">
                <p className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit' }}>50k+</p>
                <p className="text-xs text-slate-400 mt-1">{t('home.happy_patients')}</p>
                <div className="flex -space-x-2 mt-3">
                  {['women/12', 'men/22', 'women/31', 'men/47'].map(s => (
                    <img key={s} src={`https://randomuser.me/api/portraits/${s}.jpg`} className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" alt="" />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-24 right-8 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-4 w-44">
                <div className="flex items-center gap-2 mb-2">
                  <FiShield size={16} className="text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-semibold">{t('home.verified')}</span>
                </div>
                <p className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Outfit' }}>120+</p>
                <p className="text-xs text-slate-400 mt-1">{t('home.certified_doctors')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/3 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '120+', label: t('home.stats_doctors'), icon: RiUserHeartLine },
              { value: '45+', label: t('home.stats_clinics'), icon: MdOutlineLocalHospital },
              { value: '30+', label: t('home.stats_labs'), icon: GiMicroscope },
              { value: '50k+', label: t('home.stats_patients'), icon: RiShieldCheckLine },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/15 flex items-center justify-center shrink-0">
                  <s.icon size={16} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white leading-none" style={{ fontFamily: 'Outfit' }}>{s.value}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ─── SPECIALTIES ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t('home.specialties_eyebrow')} title={t('home.specialties_title')} description={t('home.specialties_desc')} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((s, i) => (
              <button
                key={s.label}
                onClick={() => navigate(`/doctors?q=${s.label}`)}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${s.color} ${s.hoverborder} animate-fade-in-up`}
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/80 shadow-sm">
                  <s.icon size={22} />
                </div>
                <span className="text-xs font-semibold text-center leading-tight">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t('home.how_eyebrow')} title={t('home.how_title')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200" />
            {[
              { icon: FiSearch, num: '01', title: t('home.how_1_title'), desc: t('home.how_1_desc') },
              { icon: RiCalendarCheckLine, num: '02', title: t('home.how_2_title'), desc: t('home.how_2_desc') },
              { icon: RiUserHeartLine, num: '03', title: t('home.how_3_title'), desc: t('home.how_3_desc') },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'both' }}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    <step.icon size={26} className="text-teal-700" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-700 text-white text-[10px] font-bold flex items-center justify-center">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONSULTATION TYPES ─── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultTypes.map((c, i) => (
              <div key={i} className={`flex items-center gap-5 p-6 rounded-2xl border ${c.color}`}>
                <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shrink-0 shadow-sm">
                  <c.icon size={22} />
                </div>
                <div>
                  <p className="font-bold text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>{c.label}</p>
                  <p className="text-sm opacity-80 mt-0.5">{c.desc}</p>
                </div>
                <FiArrowRight size={16} className="ml-auto opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BROWSE TABS ─── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Tab header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-teal-700 text-xs font-semibold uppercase tracking-widest mb-2">{t('home.browse_eyebrow')}</p>
              <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{t('home.browse_title')}</h2>
            </div>
            <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
              {[
                { key: 'doctors', label: t('nav.doctors'), icon: RiStethoscopeLine },
                { key: 'clinics', label: t('nav.clinics'), icon: MdOutlineLocalHospital },
                { key: 'labs', label: t('nav.labs'), icon: GiMicroscope },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-teal-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <tab.icon size={14} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabItems.map((item, i) => (
              <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <TabCard {...(activeTab === 'doctors' ? { doctor: item } : activeTab === 'clinics' ? { clinic: item } : { lab: item })} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to={`/${activeTab}`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all text-sm"
            >
              {t('home.view_all')} <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t('home.testimonials_eyebrow')} title={t('home.testimonials_title')} subtitle={t('home.testimonials_subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((a, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: a.rating }).map((_, j) => (
                    <FiStar key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">"{t('testimonials.' + a.text)}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                  <img src={a.avatar} alt={t('testimonials.' + a.author)} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{t('testimonials.' + a.author)}</p>
                    <p className="text-slate-400 text-xs">{t('testimonials.' + a.role)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full text-teal-100 text-xs font-semibold mb-8">
            <RiHeartPulseLine size={13} />
            {t('home.cta_top_title')}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {t('home.cta_title')}
          </h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t('home.cta_desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/doctors" className="flex items-center gap-2 px-8 py-4 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-colors text-sm shadow-lg shadow-black/10">
              {t('home.cta_find')} <FiArrowRight size={16} />
            </Link>
            <Link to="/register" className="flex items-center gap-2 px-8 py-4 bg-teal-600/80 border border-teal-500/50 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              {t('home.cta_register')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
