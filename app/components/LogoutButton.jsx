export default function LogoutButton({ onLogout, loading }) {
  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={loading}
      className="w-full rounded-2xl border border-hortalis-forest/20 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.35em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Saindo" : "Sair"}
    </button>
  );
}
