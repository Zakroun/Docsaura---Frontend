import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doctors } from '../../data/doctors';
import DoctorCard from '../../components/common/DoctorCard';
import SearchBar from '../../components/common/SearchBar';
import SectionHeader from '../../components/common/SectionHeader';
import { useSearch } from '../../hooks/useSearch';
import { SkeletonCard } from '../../components/common/Skeleton';
import { MdOutlineSearchOff } from "react-icons/md";

export default function Doctors() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const { query, activeFilter, filtered, handleQuery, handleFilter, setQuery } = useSearch(
    doctors,
    ['name', 'specialty', 'location', 'clinic'],
    'specialty'
  );

  // Set initial query from URL
  if (initialQ && !query) setQuery(initialQ);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <SectionHeader
            eyebrow={t('doctors.eyebrow')}
            title={t('doctors.title')}
            subtitle={t('doctors.subtitle')}
          />
          <SearchBar
            value={query}
            onChange={handleQuery}
            placeholder={t('doctors.input_placeholder')}
            filters={t('doctors.types', { returnObjects: true })}
            activeFilter={activeFilter}
            onFilter={handleFilter}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
              <MdOutlineSearchOff size={28} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('doctors.notfound_title')}</h3>
            <p className="text-slate-500 text-sm">{t('doctors.notfound_desc')}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              {filtered.length} {filtered.length !== 1 ? t('doctors.doctors') : t('doctors.doctor') } {t('found_search')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((doc, i) => (
                <div key={doc.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
                  <DoctorCard doctor={doc} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
