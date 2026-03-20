export default function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      className={`flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.26em] transition ${
        isFavorite
          ? "border-hortalis-leaf bg-hortalis-leaf text-white shadow-sm"
          : "border-hortalis-forest/20 bg-white text-hortalis-forest hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 20s-7-4.5-7-9a4 4 0 017-2 4 4 0 017 2c0 4.5-7 9-7 9z" />
      </svg>
      <span>{isFavorite ? "Favorito" : "Favoritar"}</span>
    </button>
  );
}
