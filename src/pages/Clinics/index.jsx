import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { clinics } from '../../data/clinics';
import ClinicCard from '../../components/common/ClinicCard';
import SearchBar from '../../components/common/SearchBar';
import SectionHeader from '../../components/common/SectionHeader';
import { MdOutlineSearchOff } from "react-icons/md";

const TYPES = ['All', 'Multi-Specialty', 'Surgery & Orthopedics', 'Pediatrics & Maternity'];

export default function Clinics() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => clinics.filter(c => {
    const matchQ = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.location.toLowerCase().includes(query.toLowerCase());
    const matchF = activeFilter === 'All' || c.specialty === activeFilter;
    return matchQ && matchF;
  }), [query, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <SectionHeader eyebrow="Medical Centers" title={t('nav.clinics')} subtitle="Find top clinics and medical centers across Morocco." />
          <SearchBar
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search clinics by name or location..."
            filters={TYPES} activeFilter={activeFilter} onFilter={setActiveFilter}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
              <MdOutlineSearchOff size={28} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No clinics found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((clinic, i) => (
              <div key={clinic.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <ClinicCard clinic={clinic} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
