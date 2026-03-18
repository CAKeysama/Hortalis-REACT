import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import InputField from "./InputField";
import { useAuth } from "../hooks/useAuth";
import { mapAuthError } from "../services/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({
  onFocusChange,
  onSignupSuccess,
  onAuthSuccess,
}) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("login");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusCount, setFocusCount] = useState(0);

  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(focusCount > 0);
    }
  }, [focusCount, onFocusChange]);

  const updateField = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleFocus = () => {
    setFocusCount((count) => count + 1);
  };

  const handleBlur = () => {
    setFocusCount((count) => Math.max(0, count - 1));
  };

  const validate = () => {
    const email = formValues.email.trim();
    const password = formValues.password;
    const confirmPassword = formValues.confirmPassword;

    if (!email) return "Informe seu email.";
    if (!EMAIL_REGEX.test(email)) return "Email invalido.";
    if (!password) return "Informe sua senha.";
    if (password.length < 6) return "A senha deve ter no minimo 6 caracteres.";

    if (mode === "signup") {
      if (!confirmPassword) return "Confirme sua senha.";
      if (confirmPassword !== password) return "As senhas nao conferem.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const errorMessage = validate();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    setLoading(true);
    try {
      const email = formValues.email.trim();
      if (mode === "login") {
        await signIn(email, formValues.password);
        toast.success("Login realizado com sucesso.");
        if (onAuthSuccess) onAuthSuccess();
      } else {
        await signUp(email, formValues.password);
        toast.success("Conta criada com sucesso.");
        if (onSignupSuccess) onSignupSuccess();
      }
    } catch (error) {
      toast.error(mapAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (nextMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setShowPassword(false);
    setShowConfirm(false);
    setFocusCount(0);
    setFormValues((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="space-y-6">
      <div className="auth-pill flex items-center p-1">
        <button
          type="button"
          onClick={() => handleModeChange("login")}
          className={`flex-1 rounded-full px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.32em] transition ${
            mode === "login"
              ? "bg-hortalis-leaf text-hortalis-ice shadow"
              : "text-hortalis-ink hover:text-hortalis-leaf"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("signup")}
          className={`flex-1 rounded-full px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.32em] transition ${
            mode === "signup"
              ? "bg-hortalis-leaf text-hortalis-ice shadow"
              : "text-hortalis-ink hover:text-hortalis-leaf"
          }`}
        >
          Criar conta
        </button>
      </div>

      <div key={mode} className="animate-auth-swap">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-hortalis-ink">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={updateField("email")}
            placeholder="voce@hortalis.com"
            required
            autoComplete="email"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={loading}
          />
          <InputField
            label="Senha"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formValues.password}
            onChange={updateField("password")}
            placeholder="Minimo 6 caracteres"
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={loading}
            action={{
              label: showPassword ? "Ocultar" : "Mostrar",
              onClick: () => setShowPassword((prev) => !prev),
            }}
          />
          {mode === "signup" ? (
            <InputField
              label="Confirmar senha"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={formValues.confirmPassword}
              onChange={updateField("confirmPassword")}
              placeholder="Repita sua senha"
              required
              autoComplete="new-password"
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={loading}
              action={{
                label: showConfirm ? "Ocultar" : "Mostrar",
                onClick: () => setShowConfirm((prev) => !prev),
              }}
            />
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="relative flex w-full items-center justify-center gap-3 rounded-2xl bg-hortalis-leaf px-4 py-3 text-xs font-bold uppercase tracking-[0.35em] text-hortalis-ice shadow-lg shadow-hortalis-leaf/20 transition hover:bg-hortalis-forest disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Autenticando
              </span>
            ) : mode === "login" ? (
              "Entrar"
            ) : (
              "Criar conta"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
