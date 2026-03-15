import { SkeletonGrid } from '@/components/ui/SkeletonCard'

export default function MoviesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="h-9 w-32 rounded-lg animate-pulse mb-2" style={{ backgroundColor: 'var(--card)' }} />
        <div className="h-4 w-64 rounded animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
      </div>
      {/* Search bar skeleton */}
      <div className="h-12 w-full max-w-xl rounded-xl animate-pulse mb-4" style={{ backgroundColor: 'var(--card)' }} />
      {/* Genre filter skeleton */}
      <div className="flex gap-2 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: 'var(--card)' }} />
        ))}
      </div>
      <SkeletonGrid count={20} />
    </div>
  )
}
