import AuthPage from "../pages/AuthPage";

export function meta() {
  return [
    { title: "Hortalis | Autenticacao" },
    { name: "description", content: "Tela de login e cadastro Hortalis." },
  ];
}

export default function AuthRoute() {
  return <AuthPage />;
}
