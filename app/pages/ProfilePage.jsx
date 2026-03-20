import { useState } from "react";
import { Link, useNavigate } from "react-router";

import ChangePasswordForm from "../components/ChangePasswordForm";
import FavoritesList from "../components/FavoritesList";
import LogoutButton from "../components/LogoutButton";
import UserInfoCard from "../components/UserInfoCard";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user, initializing, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
      navigate("/mapa");
    } finally {
      setLoggingOut(false);
    }
  };

  if (initializing) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-hortalis-ice">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
          Carregando perfil
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-hortalis-ice px-6 py-16">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-[28px] border border-white/60 bg-white/90 p-8 text-center shadow-lg shadow-hortalis-forest/10">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
            Area do usuario
          </p>
          <h1 className="text-2xl font-semibold text-hortalis-ink">
            Entre para acessar seu perfil
          </h1>
          <p className="text-sm text-slate-500">
            Suas informacoes, favoritos e configuracoes ficam disponiveis apos o login.
          </p>
          <div className="flex w-full flex-col gap-3">
            <Link
              to="/auth"
              className="rounded-2xl bg-hortalis-leaf px-4 py-3 text-xs font-bold uppercase tracking-[0.35em] text-white shadow-lg shadow-hortalis-leaf/20 transition hover:bg-hortalis-forest"
            >
              Entrar
            </Link>
            <Link
              to="/auth?mode=signup"
              className="rounded-2xl border border-hortalis-forest/20 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.35em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hortalis-ice px-6 pb-16 pt-24 text-hortalis-ink">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
              Perfil
            </p>
            <h1 className="mt-2 font-display text-3xl text-hortalis-ink">
              Ola, {user.email || "usuario"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Gerencie suas informacoes e favoritos rapidamente.
            </p>
          </div>
          <Link
            to="/mapa"
            className="rounded-full border border-hortalis-forest/20 bg-white px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
          >
            Voltar ao mapa
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <UserInfoCard user={user} />
            <FavoritesList user={user} />
          </div>

          <div className="flex flex-col gap-6">
            <ChangePasswordForm user={user} />
            <section className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-hortalis-forest/10">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
                Sessao
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Saia para proteger sua conta em dispositivos compartilhados.
              </p>
              <div className="mt-5">
                <LogoutButton onLogout={handleLogout} loading={loggingOut} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
