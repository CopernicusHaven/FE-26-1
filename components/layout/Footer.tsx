export function Footer() {
  return (
    <footer
      className="border-t mt-16 py-8"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row
        items-center justify-between gap-4 text-sm font-body"
        style={{ color: 'var(--muted)' }}
      >
        <p>
          Built with{' '}
          <span className="text-red-500">♥</span> using{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            Next.js
          </a>{' '}
          &amp;{' '}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            TMDB API
          </a>
        </p>
        <p className="text-xs opacity-60">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  )
}
