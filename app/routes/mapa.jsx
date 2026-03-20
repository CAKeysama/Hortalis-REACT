import MapPage from "../pages/MapPage";

export function meta() {
  return [
    { title: "Hortalis | Mapa" },
    { name: "description", content: "Tela base do mapa Hortalis." },
  ];
}

export default function MapaRoute() {
  return <MapPage />;
}
