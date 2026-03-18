import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.jsx"),
  route("auth", "routes/auth.jsx"),
  route("home", "routes/home.jsx"),
];
