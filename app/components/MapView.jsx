import { memo, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import MarkerLayer from "./MarkerLayer";
import { HORTAS_CENTER } from "../data/hortas";

const MapView = memo(function MapView({ hortas, onOpenDetails }) {
  const center = useMemo(() => HORTAS_CENTER, []);

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full"
      zoomControl
      scrollWheelZoom
      preferCanvas
      attributionControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerLayer hortas={hortas} onOpenDetails={onOpenDetails} />
    </MapContainer>
  );
});

export default MapView;
