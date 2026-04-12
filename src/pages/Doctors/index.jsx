import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doctors } from '../../data/doctors';
import DoctorCard from '../../components/common/DoctorCard';
import SearchBar from '../../components/common/SearchBar';
import SectionHeader from '../../components/common/SectionHeader';
import { useSearch } from '../../hooks/useSearch';
import { SkeletonCard } from '../../components/common/Skeleton';
import { MdOutlineSearchOff } from "react-icons/md";

const SPECIALTIES = ['All', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Neurology'];

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
            eyebrow="Browse & Book"
            title={t('nav.doctors')}
            subtitle="Find the right specialist for your needs. All doctors are verified and trusted."
          />
          <SearchBar
            value={query}
            onChange={handleQuery}
            placeholder="Search by name, specialty, or location..."
            filters={SPECIALTIES}
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or clearing filters</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found
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
