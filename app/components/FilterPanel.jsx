export default function FilterPanel({ open, id }) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      className={`overflow-hidden transition-all duration-300 ease-out ${
        open
          ? "max-h-[520px] opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`rounded-[24px] border border-white/60 bg-white/80 p-5 shadow-sm transition duration-300 ${
          open ? "translate-y-0" : "-translate-y-2"
        }`}
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-hortalis-ink/60">
              Tipo de cultivo
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Organico", "Hidroponia", "Comunitaria"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-full border border-hortalis-forest/20 bg-white px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-hortalis-ink/60">
              Disponibilidade
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Aberta agora", "Agendada", "Novas vagas"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-full border border-hortalis-forest/20 bg-white px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-hortalis-ink/60">
              Distancia
            </p>
            <div className="mt-4">
              <input
                type="range"
                min="1"
                max="20"
                defaultValue="8"
                aria-label="Distancia maxima"
                className="w-full accent-hortalis-leaf"
              />
              <div className="mt-2 flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-hortalis-ink/50">
                <span>1 km</span>
                <span>20 km</span>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Ajuste rapido para manter a busca simples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
