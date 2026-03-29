import { SkeletonGrid } from '@/components/ui/SkeletonCard'

export default function HomeLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        className="w-full h-[420px] rounded-3xl mb-12 animate-pulse"
        style={{ backgroundColor: 'var(--card)' }}
      />
      <SkeletonGrid count={12} />
    </div>
  )
}
