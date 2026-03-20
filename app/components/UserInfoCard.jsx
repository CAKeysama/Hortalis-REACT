export default function UserInfoCard({ user }) {
  const creationTime = user?.metadata?.creationTime;
  const formattedDate = creationTime
    ? new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "long",
      }).format(new Date(creationTime))
    : "--";

  return (
    <section className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-hortalis-forest/10">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
        Informacoes do usuario
      </p>
      <div className="mt-4 space-y-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-hortalis-ink/60">
            Email
          </p>
          <p className="mt-2 text-sm font-medium text-hortalis-ink">
            {user?.email || "Nao informado"}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-hortalis-ink/60">
            Usuario desde
          </p>
          <p className="mt-2 text-sm font-medium text-hortalis-ink">
            {formattedDate}
          </p>
        </div>
      </div>
    </section>
  );
}
