import type { Genre } from '@/types/tmdb'

interface GenreBadgeProps {
  genre: Genre
  small?: boolean
}

export function GenreBadge({ genre, small = false }: GenreBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-body font-medium tracking-wide
        bg-white/5 text-[var(--muted)] border-white/10
        dark:bg-white/5 dark:text-white/70 dark:border-white/10
        light:bg-black/5 light:text-[var(--muted)] light:border-black/10
        ${small ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'}`}
      style={{
        backgroundColor: 'color-mix(in srgb, var(--text) 6%, transparent)',
        color: 'var(--muted)',
        borderColor: 'var(--border)',
      }}
    >
      {genre.name}
    </span>
  )
}
