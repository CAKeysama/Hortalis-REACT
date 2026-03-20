import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router";

import InputField from "./InputField";

const FRIENDLY_ERRORS = {
  "auth/requires-recent-login":
    "Por seguranca, faca login novamente para trocar a senha.",
  "auth/weak-password": "A senha deve ter no minimo 6 caracteres.",
};

export default function ChangePasswordForm({ user }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || loading) return;

    setError("");
    setStatus("");

    if (!password || password.length < 6) {
      setError("A senha deve ter no minimo 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(user, password);
      setStatus("Senha atualizada com sucesso.");
      setPassword("");
    } catch (err) {
      const message = FRIENDLY_ERRORS[err?.code] ||
        "Nao foi possivel atualizar a senha. Tente novamente.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-hortalis-forest/10">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
        Trocar senha
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <InputField
          label="Nova senha"
          name="nova-senha"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimo 6 caracteres"
          required
          disabled={!user || loading}
          autoComplete="new-password"
        />

        {status ? (
          <p className="text-sm text-hortalis-forest">{status}</p>
        ) : null}
        {error ? (
          <div className="space-y-2">
            <p className="text-sm text-red-600">{error}</p>
            {error.includes("login novamente") ? (
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="rounded-full border border-hortalis-forest/20 bg-white px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
              >
                Reautenticar
              </button>
            ) : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!user || loading}
          className="w-full rounded-2xl bg-hortalis-leaf px-4 py-3 text-xs font-bold uppercase tracking-[0.35em] text-hortalis-ice shadow-lg shadow-hortalis-leaf/20 transition hover:bg-hortalis-forest disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Salvando" : "Atualizar senha"}
        </button>
      </form>
    </section>
  );
}
