export default function MovieDetailLoading() {
  return (
    <div>
      {/* Backdrop skeleton */}
      <div className="h-[55vh] min-h-[360px] w-full animate-pulse" style={{ backgroundColor: 'var(--card)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Poster skeleton */}
          <div className="flex-shrink-0 w-48 sm:w-56 md:w-64 mx-auto sm:mx-0">
            <div className="aspect-[2/3] rounded-2xl animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
          </div>

          {/* Info skeleton */}
          <div className="flex-1 pt-4 sm:pt-20 space-y-3">
            <div className="h-10 w-3/4 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
            <div className="h-4 w-1/2 rounded animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-20 rounded-full animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
              ))}
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
              <div className="h-4 w-5/6 rounded animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
              <div className="h-4 w-4/6 rounded animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
