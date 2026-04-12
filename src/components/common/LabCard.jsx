import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { GiMicroscope } from 'react-icons/gi';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';

export default function LabCard({ lab }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="bg-white border cursor-pointer border-slate-100 rounded-2xl overflow-hidden card-hover group" onClick={() => navigate(`/labs/${lab.id}`)}>
      <div className="relative h-44 overflow-hidden">
        <img
          src={lab.image}
          alt={lab.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-semibold text-white text-base leading-tight">{lab.name}</h3>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="blue">
            <GiMicroscope size={11} />
            {lab.specialty}
          </Badge>
        </div>
      </div>

      <div className="px-4 py-4">
        <StarRating rating={lab.rating} reviewCount={lab.reviewCount} size={12} />

        <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
          <FiMapPin size={12} className="text-teal-600 shrink-0" />
          <span className="truncate">{lab.location}</span>
        </div>

        <div className="mt-3 flex flex-col gap-1">
          {lab.certifications.slice(0, 2).map(c => (
            <div key={c} className="flex items-center gap-1.5 text-xs text-emerald-700">
              <FiCheckCircle size={11} />
              <span>{c}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {lab.services.slice(0, 2).map(s => (
            <Badge key={s} variant="default">{s}</Badge>
          ))}
        </div>

        <div className="mt-4">
          <Link
            to={`/labs/${lab.id}`}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-teal-700 text-white text-sm font-semibold rounded-lg hover:bg-teal-800 transition-colors group-hover:gap-3"
          >
            {t('common.book')}
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
