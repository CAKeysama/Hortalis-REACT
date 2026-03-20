import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.jsx"),
  route("auth", "routes/auth.jsx"),
  route("perfil", "routes/perfil.jsx"),
  route("mapa", "routes/mapa.jsx"),
  route("home", "routes/home.jsx"),
];
