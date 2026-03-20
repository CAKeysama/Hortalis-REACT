export default function SearchBar({
  value,
  onChange,
  placeholder,
  onToggleFilters,
  filtersOpen = false,
  controlsId,
}) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-hortalis-forest/70">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label="Buscar hortas"
          className="w-full rounded-2xl border border-slate-200 bg-white/90 py-3 pl-11 pr-4 text-sm font-medium text-hortalis-ink shadow-sm transition focus:border-hortalis-leaf focus:outline-none focus:ring-2 focus:ring-hortalis-leaf/20"
        />
      </div>
      <button
        type="button"
        onClick={onToggleFilters}
        aria-expanded={filtersOpen}
        aria-controls={controlsId}
        aria-label="Filtros"
        className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.32em] transition ${
          filtersOpen
            ? "border-hortalis-forest bg-hortalis-forest text-white shadow-lg shadow-hortalis-forest/20"
            : "border-hortalis-forest/20 bg-white text-hortalis-forest hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
        <span className="hidden text-[0.6rem] sm:inline">Filtros</span>
      </button>
    </div>
  );
}
