export default function Button({
  children, variant = 'primary', size = 'md', loading = false,
  disabled, className = '', ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800 active:scale-[0.98]',
    secondary: 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 active:scale-[0.98]',
    outline: 'bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50 active:scale-[0.98]',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:scale-[0.98]',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${base} cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
