export function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-2/3 rounded-full" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
        <div className="skeleton h-3 w-3/4 rounded-full" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-7 w-20 rounded-full" />
          <div className="skeleton h-7 w-20 rounded-full" />
        </div>
        <div className="skeleton h-9 w-full rounded-lg mt-2" />
      </div>
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="skeleton h-64 w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="skeleton h-8 w-1/2 rounded-full" />
          <div className="skeleton h-4 w-full rounded-full" />
          <div className="skeleton h-4 w-5/6 rounded-full" />
          <div className="skeleton h-4 w-4/5 rounded-full" />
        </div>
        <div className="space-y-4">
          <div className="skeleton h-48 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`skeleton h-4 rounded-full ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}
