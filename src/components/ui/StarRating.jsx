import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function StarRating({ rating, reviewCount, size = 14, showCount = true }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const {t} = useTranslation();
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={`f${i}`} size={size} className="text-amber-400" />
        ))}
        {half && <FaStarHalfAlt size={size} className="text-amber-400" />}
        {Array.from({ length: empty }).map((_, i) => (
          <FiStar key={`e${i}`} size={size} className="text-slate-300" />
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-500">{rating.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-slate-500">({reviewCount} {t('common.reviews')})</span>
      )}
    </div>
  );
}
