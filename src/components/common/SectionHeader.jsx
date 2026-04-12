import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function SectionHeader({ eyebrow, title, subtitle, linkTo, linkLabel }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
      <div>
        {eyebrow && (
          <p className="text-teal-700 text-xs font-semibold uppercase tracking-widest mb-2">{eyebrow}</p>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {title}
        </h2>
        {subtitle && <p className="text-slate-500 mt-2 text-sm max-w-xl">{subtitle}</p>}
      </div>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0 group"
        >
          {linkLabel}
          <FiArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
