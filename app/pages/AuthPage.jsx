import { useEffect } from "react";
import { useNavigate } from "react-router";

import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!initializing && user) {
      navigate("/home", { replace: true });
    }
  }, [user, initializing, navigate]);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-hortalis-ice">
        <div className="text-sm uppercase tracking-[0.4em] text-slate-500">
          Carregando
        </div>
      </div>
    );
  }

  return (
    <div className="auth-scene w-screen h-screen">
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="auth-card w-full max-w-md p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-center">
            <img src="/Logo.svg" alt="Logo Hortalis" className="h-10" />
          </div>

          <AuthForm onAuthSuccess={() => navigate("/home")} />
        </div>
      </div>
    </div>
  );
}
