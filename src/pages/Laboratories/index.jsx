import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { laboratories } from '../../data/laboratories';
import LabCard from '../../components/common/LabCard';
import SearchBar from '../../components/common/SearchBar';
import SectionHeader from '../../components/common/SectionHeader';
import { MdOutlineSearchOff } from "react-icons/md";

const TYPES = ['All', 'Clinical Biology', 'Genetics & Pathology', 'Microbiology & Immunology'];

export default function Laboratories() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => laboratories.filter(lab => {
    const matchQ = !query || lab.name.toLowerCase().includes(query.toLowerCase()) || lab.location.toLowerCase().includes(query.toLowerCase());
    const matchF = activeFilter === 'All' || lab.specialty === activeFilter;
    return matchQ && matchF;
  }), [query, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <SectionHeader eyebrow="Clinical Labs" title={t('nav.labs')} subtitle="Book lab tests with certified laboratories across Morocco." />
          <SearchBar
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search laboratories by name or location..."
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
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No laboratories found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((lab, i) => (
              <div key={lab.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <LabCard lab={lab} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
