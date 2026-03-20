import { memo, useCallback, useMemo, useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import HortaPopup from "./HortaPopup";

const createMarkerIcon = () =>
  L.divIcon({
    className: "horta-div-icon",
    html: "<span class=\"horta-marker\"></span>",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const MarkerLayer = memo(function MarkerLayer({ hortas, onOpenDetails }) {
  const [favorites, setFavorites] = useState(() => new Set());
  const markerIcon = useMemo(() => createMarkerIcon(), []);
  const shouldCluster = hortas.length > 8;

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const renderMarkers = () =>
    hortas.map((horta) => (
      <Marker
        key={horta.id}
        position={[horta.latitude, horta.longitude]}
        icon={markerIcon}
      >
        <HortaPopup
          horta={horta}
          onOpenDetails={onOpenDetails}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.has(horta.id)}
        />
      </Marker>
    ));

  if (shouldCluster) {
    return <MarkerClusterGroup>{renderMarkers()}</MarkerClusterGroup>;
  }

  return <>{renderMarkers()}</>;
});

export default MarkerLayer;
