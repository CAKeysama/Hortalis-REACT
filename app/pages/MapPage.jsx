import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";

import FilterPanel from "../components/FilterPanel";
import MapView from "../components/MapView";
import SearchBar from "../components/SearchBar";
import { HORTAS_MOCK } from "../data/hortas";

const SEARCH_DEBOUNCE_MS = 400;
const MapDetailsModal = lazy(() => import("../components/MapDetailsModal"));

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedHorta, setSelectedHorta] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [search]);

  const panelId = "map-filters";
  const filteredHortas = useMemo(() => {
    if (!debouncedSearch) return HORTAS_MOCK;

    const term = debouncedSearch.toLowerCase();
    return HORTAS_MOCK.filter((horta) => {
      const nome = horta.nome.toLowerCase();
      const cidade = horta.cidade.toLowerCase();
      return nome.includes(term) || cidade.includes(term);
    });
  }, [debouncedSearch]);

  const handleOpenDetails = useCallback((horta) => {
    setSelectedHorta(horta);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedHorta(null);
  }, []);

  const mapElement = useMemo(
    () => <MapView hortas={filteredHortas} onOpenDetails={handleOpenDetails} />,
    [filteredHortas, handleOpenDetails]
  );

  return (
    <main className="min-h-screen bg-hortalis-ice text-hortalis-ink">
      <header className="fixed left-0 right-0 top-0 z-[1100] border-b border-white/70 bg-hortalis-ice/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-4">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
            Hortalis mapa
          </p>
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar hortas por nome ou cidade"
            onToggleFilters={() => setFiltersOpen((open) => !open)}
            filtersOpen={filtersOpen}
            controlsId={panelId}
          />
          <FilterPanel open={filtersOpen} id={panelId} />
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pb-10 pt-32 sm:pt-36">
        <div className="relative h-[68vh] min-h-[420px] w-full overflow-hidden rounded-[28px] border border-white/70 bg-slate-100/80 shadow-lg shadow-slate-200/70">
          {mapElement}
          <div className="absolute left-6 top-6 z-10 rounded-full border border-hortalis-forest/20 bg-white/90 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-hortalis-forest shadow-sm">
            {debouncedSearch
              ? `Buscando: ${debouncedSearch}`
              : "Sem busca ativa"}
          </div>
          <div className="absolute right-6 top-6 z-10 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm">
            {filteredHortas.length} hortas
          </div>
          <div className="absolute bottom-4 left-6 z-10 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm">
            Clique em um marcador para ver detalhes
          </div>
        </div>
      </section>

      {selectedHorta ? (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-900/40 px-6 py-10">
              <div className="rounded-full border border-white/70 bg-white/95 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-hortalis-forest">
                Carregando detalhes
              </div>
            </div>
          }
        >
          <MapDetailsModal horta={selectedHorta} onClose={handleCloseDetails} />
        </Suspense>
      ) : null}
    </main>
  );
}
