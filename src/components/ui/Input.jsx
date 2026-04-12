export default function Input({
  label, name, type = 'text', value, onChange, error,
  placeholder, required, icon: Icon, className = '', ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon size={16} />
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-400 ring-2 ring-red-400/10' : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10'}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, name, value, onChange, error, placeholder, required, rows = 4, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none resize-none
          ${error ? 'border-red-400 ring-2 ring-red-400/10' : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10'}
        `}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Select({ label, name, value, onChange, error, required, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-slate-800 transition-all duration-200 outline-none appearance-none
          ${error ? 'border-red-400 ring-2 ring-red-400/10' : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10'}
        `}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
