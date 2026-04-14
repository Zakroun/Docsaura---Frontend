import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiPhone, FiArrowRight } from 'react-icons/fi';
import { MdOutlineLocalHospital } from 'react-icons/md';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';

export default function ClinicCard({ clinic }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="bg-white border cursor-pointer border-slate-100 rounded-2xl overflow-hidden card-hover group" onClick={() => navigate(`/clinics/${clinic.id}`)}>
      <div className="relative h-44 overflow-hidden">
        <img
          src={clinic.image}
          alt={clinic.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-semibold text-white text-base leading-tight">{clinic.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <FiMapPin size={11} className="text-teal-300 shrink-0" />
            <span className="text-xs text-white/80 truncate">{clinic.location}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="teal">
            <MdOutlineLocalHospital size={11} />
            {clinic.specialty}
          </Badge>
        </div>
      </div>

      <div className="px-4 py-4">
        <StarRating rating={clinic.rating} reviewCount={clinic.reviewCount} size={12} />

        <div className="mt-3 flex flex-wrap gap-1">
          {clinic.services.slice(0, 3).map(s => (
            <Badge key={s} variant="default">{s}</Badge>
          ))}
          {clinic.services.length > 3 && (
            <Badge variant="default">+{clinic.services.length - 3}</Badge>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <FiPhone size={12} className="text-teal-600 shrink-0" />
          <span>{clinic.phone}</span>
        </div>

        <div className="mt-4">
          <Link
            to={`/clinics/${clinic.id}`}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-teal-700 border border-teal-200 text-sm font-semibold rounded-lg hover:bg-teal-50 transition-colors group-hover:gap-3"
          >
            {t('common.details')}
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}