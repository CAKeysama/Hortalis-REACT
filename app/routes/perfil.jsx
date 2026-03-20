import ProfilePage from "../pages/ProfilePage";

export function meta() {
  return [
    { title: "Hortalis | Perfil" },
    { name: "description", content: "Perfil do usuario Hortalis." },
  ];
}

export default function PerfilRoute() {
  return <ProfilePage />;
}
