import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Hortalis | Mapa" },
    { name: "description", content: "Redirecionamento para o mapa." },
  ];
}

export default function HomeRedirect() {
  return <Navigate to="/mapa" replace />;
}
