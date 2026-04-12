import { FiSearch, FiSliders } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder, filters, activeFilter, onFilter }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
        />
      </div>
      {filters && (
        <div className="flex items-center gap-2 flex-wrap">
          <FiSliders size={16} className="text-slate-400 shrink-0" />
          {filters.map(f => (
            <button
              key={f}
              onClick={() => onFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeFilter === f ? 'bg-teal-700 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700'}`}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
