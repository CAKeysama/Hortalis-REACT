import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import AuthForm from "../components/AuthForm";
import PlantAnimation from "../components/PlantAnimation";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();
  const [focusActive, setFocusActive] = useState(false);
  const [growthPulse, setGrowthPulse] = useState(false);
  const [holdRedirect, setHoldRedirect] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!initializing && user && !holdRedirect) {
      navigate("/home", { replace: true });
    }
  }, [user, initializing, holdRedirect, navigate]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSignupSuccess = () => {
    setGrowthPulse(true);
    setHoldRedirect(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setGrowthPulse(false);
      setHoldRedirect(false);
    }, 1200);
  };

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
      <PlantAnimation focusActive={focusActive} growthPulse={growthPulse} />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="auth-card w-full max-w-md p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-center">
            <img src="/Logo.svg" alt="Logo Hortalis" className="h-10" />
          </div>

          <AuthForm
            onFocusChange={setFocusActive}
            onSignupSuccess={handleSignupSuccess}
            onAuthSuccess={() => navigate("/home")}
          />
        </div>
      </div>
    </div>
  );
}
