import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import { RiStethoscopeLine } from 'react-icons/ri';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';

export default function DoctorCard({ doctor }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="bg-white border cursor-pointer border-slate-100 rounded-2xl overflow-hidden card-hover group" onClick={() => navigate(`/doctors/${doctor.id}`)}>
      {/* Image */}
      <div className="relative">
        <img
          src={doctor.cover}
          alt={doctor.name}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="absolute bottom-0 left-4 translate-y-1/2 w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="teal">
            <RiStethoscopeLine size={11} />
            {doctor.specialty}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-10 pb-4">
        <h3 className="font-semibold text-slate-900 text-base truncate">{doctor.name}</h3>
        <StarRating rating={doctor.rating} reviewCount={doctor.reviewCount} size={12} />

        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FiMapPin size={12} className="shrink-0 text-teal-600" />
            <span className="truncate">{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FiClock size={12} className="shrink-0 text-teal-600" />
            <span>{doctor.experience} {t('common.experience')}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {doctor.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">From</p>
            <p className="text-sm font-bold text-slate-900">{doctor.consultationFee} <span className="text-xs font-normal text-slate-500">MAD</span></p>
          </div>
          <Link
            to={`/doctors/${doctor.id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-lg hover:bg-teal-800 transition-colors group-hover:gap-2.5"
          >
            {t('common.book')}
            <FiArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
