import { useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

export function meta() {
  return [
    { title: "Hortalis | Home" },
    { name: "description", content: "Area inicial Hortalis." },
  ];
}

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <main className="min-h-screen bg-hortalis-ice px-6 py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-hortalis-forest">
              Hortalis
            </p>
            <h1 className="font-display text-3xl text-slate-900">
              Bem vindo
            </h1>
            <p className="text-sm text-slate-500">
              {user ? user.email : "Sem sessao ativa."}
            </p>
          </div>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-hortalis-forest/20 bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
            >
              Sair
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="rounded-full border border-hortalis-forest/20 bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
            >
              Ir para login
            </button>
          )}
        </header>

        <section className="rounded-[28px] border border-white/60 bg-white/80 p-8 shadow-lg shadow-hortalis-forest/10">
          <h2 className="font-display text-2xl text-slate-900">
            Seu cultivo esta pronto para crescer
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Esta e uma area inicial para continuar seu projeto. A autenticacao
            ja esta integrada com Firebase, e voce pode expandir esta tela com
            dashboards, sensores e insights da sua horta.
          </p>
        </section>
      </div>
    </main>
  );
}
