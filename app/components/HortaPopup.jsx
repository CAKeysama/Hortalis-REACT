import { Popup, useMap } from "react-leaflet";

import FavoriteButton from "./FavoriteButton";

export default function HortaPopup({
  horta,
  onOpenDetails,
  onToggleFavorite,
  isFavorite,
}) {
  const map = useMap();

  const handleRoute = () => {
    const destination = `${horta.latitude},${horta.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDetails = () => {
    onOpenDetails(horta);
    map.closePopup();
  };

  return (
    <Popup closeButton>
      <div className="min-w-[220px] space-y-3 text-hortalis-ink">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-hortalis-forest">
            {horta.cidade}
          </p>
          <h3 className="text-base font-semibold text-hortalis-ink">
            {horta.nome}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {horta.descricaoCurta}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleRoute}
            className="rounded-full border border-hortalis-leaf/20 bg-hortalis-leaf px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-white transition hover:bg-hortalis-forest"
          >
            Tracar rota
          </button>
          <button
            type="button"
            onClick={handleDetails}
            className="rounded-full border border-hortalis-forest/20 bg-white px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
          >
            Detalhes
          </button>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(horta.id)}
          />
        </div>
      </div>
    </Popup>
  );
}
