export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div
        className="w-full aspect-[2/3]"
        style={{
          background:
            'linear-gradient(90deg, var(--card) 0%, var(--border) 50%, var(--card) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />
      <div className="p-3 space-y-2">
        <div className="h-4 rounded-full w-3/4" style={{ backgroundColor: 'var(--border)' }} />
        <div className="h-3 rounded-full w-1/2" style={{ backgroundColor: 'var(--border)' }} />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
