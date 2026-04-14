import { useTranslation } from 'react-i18next';
import { FiTarget, FiHeart, FiShield, FiUsers } from 'react-icons/fi';
import { RiHeartPulseLine } from 'react-icons/ri';
import SectionHeader from '../../components/common/SectionHeader';

export default function About() {
  const { t } = useTranslation();
  const values = [
    { icon: FiTarget, title: 'our_mission', desc: 'our_mission_desc' },
    { icon: FiHeart, title: 'patient_first', desc: 'patient_first_desc' },
    { icon: FiShield, title: 'trust_and_safety', desc: 'trust_and_safety_desc' },
    { icon: FiUsers, title: 'community', desc: 'community_desc' },
  ];

  const team = [
    { name: 'ceo_name', role: 'ceo_role', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'cto_name', role: 'cto_role', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
    { name: 'head_of_product_name', role: 'head_of_product_role', avatar: 'https://randomuser.me/api/portraits/men/43.jpg' },
    { name: 'head_of_partnerships_name', role: 'head_of_partnerships_role', avatar: 'https://randomuser.me/api/portraits/women/38.jpg' },
  ];

  const milestones = [
    { year: '2020', event: 'milestone_1_title' },
    { year: '2021', event: 'milestone_2_title' },
    { year: '2022', event: 'milestone_3_title' },
    { year: '2023', event: 'milestone_4_title' },
    { year: '2024', event: 'milestone_5_title' },
    { year: '2025', event: 'milestone_6_title' },
  ];
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-teal-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {t('about.title')}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('about.subtitle')}          
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t('about.values.eyebrow')} title={t('about.values.title')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-teal-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{t(`about.values.${v.title}`)}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t(`about.values.${v.desc}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '120+', label: 'verified_doctors' },
            { value: '45+', label: 'partner_clinics' },
            { value: '50k+', label: 'patients_served' },
            { value: '5★', label: 'average_rating' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
              <p className="text-teal-200 text-sm">{t(`about.stats.${s.label}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t('about.milestones.eyebrow')} title={t('about.milestones.title')} />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                  <div className="relative shrink-0">
                    <div className="w-16 h-8 rounded-lg bg-teal-700 text-white text-xs font-bold flex items-center justify-center z-10 relative">
                      {m.year}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 flex-1">
                    <p className="text-sm text-slate-600">{t(`about.milestones.${m.event}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t('about.team.eyebrow')} title={t('about.team.title')} subtitle={t('about.team.subtitle')} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 text-center card-hover">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
                <p className="font-semibold text-slate-900 text-sm">{t(`about.team.${member.name}`)}</p>
                <p className="text-xs text-teal-600 mt-1">{t(`about.team.${member.role}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
