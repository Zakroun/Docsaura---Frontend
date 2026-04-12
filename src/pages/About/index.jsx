import { useTranslation } from 'react-i18next';
import { FiTarget, FiHeart, FiShield, FiUsers } from 'react-icons/fi';
import { RiHeartPulseLine } from 'react-icons/ri';
import SectionHeader from '../../components/common/SectionHeader';

const values = [
  { icon: FiTarget, title: 'Our Mission', desc: 'To make quality healthcare accessible to every Moroccan by connecting patients with trusted medical providers seamlessly.' },
  { icon: FiHeart, title: 'Patient First', desc: 'Every decision we make is centered around improving the patient experience — from search to booking to care.' },
  { icon: FiShield, title: 'Trust & Safety', desc: 'All doctors and clinics on DocsAura are verified. We protect your data with industry-leading security practices.' },
  { icon: FiUsers, title: 'Community', desc: 'We believe in building a healthier Morocco together — patients, doctors, and healthcare systems united.' },
];

const team = [
  { name: 'Mehdi El Khatib', role: 'CEO & Co-founder', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Sara Bennani', role: 'CTO & Co-founder', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
  { name: 'Amine Tazi', role: 'Head of Product', avatar: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { name: 'Nadia Chraibi', role: 'Head of Partnerships', avatar: 'https://randomuser.me/api/portraits/women/38.jpg' },
];

const milestones = [
  { year: '2020', event: 'DocsAura founded in Rabat with a vision to digitize healthcare in Morocco.' },
  { year: '2021', event: 'Launched beta with 20 doctors. 1,000 bookings in the first 3 months.' },
  { year: '2022', event: 'Expanded to Casablanca and Fès. Reached 5,000 registered patients.' },
  { year: '2023', event: 'Integrated lab booking and AI assistant. Raised Seed funding.' },
  { year: '2024', event: '50,000+ patients, 120+ doctors, and partnerships with major Moroccan insurers.' },
  { year: '2025', event: 'Launched multilingual platform (AR/FR/EN) with RTL support.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-teal-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>
            About DocsAura
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make healthcare simple, transparent, and accessible for every Moroccan. DocsAura connects patients with verified doctors, clinics, and laboratories — all in one platform.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="What drives us" title="Our Core Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-teal-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '120+', label: 'Verified Doctors' },
            { value: '45+', label: 'Partner Clinics' },
            { value: '50k+', label: 'Patients Served' },
            { value: '5★', label: 'Average Rating' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
              <p className="text-teal-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="Our Journey" title="How We Got Here" />
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
                    <p className="text-sm text-slate-600">{m.event}</p>
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
          <SectionHeader eyebrow="The People" title="Meet Our Team" subtitle="Built by Moroccans, for Moroccans." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 text-center card-hover">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
                <p className="font-semibold text-slate-900 text-sm">{member.name}</p>
                <p className="text-xs text-teal-600 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
