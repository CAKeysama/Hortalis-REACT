import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function MapDetailsModal({ horta, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTORS);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [onClose]);

  if (!horta) return null;

  const titleId = `horta-title-${horta.id}`;
  const descId = `horta-desc-${horta.id}`;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-900/50 px-6 py-10"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[28px] border border-white/60 bg-white/95 p-6 shadow-2xl shadow-slate-900/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
              Detalhes da horta
            </p>
            <h2
              id={titleId}
              className="mt-3 text-2xl font-semibold text-hortalis-ink"
            >
              {horta.nome}
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-hortalis-ink/60">
              {horta.cidade}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hortalis-forest/20 text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12" />
              <path d="M6 18L18 6" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {horta.imagens?.map((src, index) => (
            <img
              key={`${horta.id}-img-${index}`}
              src={src}
              alt={`${horta.nome} imagem ${index + 1}`}
              loading="lazy"
              className="h-32 w-48 flex-none rounded-2xl object-cover"
            />
          ))}
        </div>

        <p id={descId} className="mt-5 text-sm text-slate-600">
          {horta.descricaoCompleta}
        </p>

        <div className="mt-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-hortalis-ink/60">
            O que esta horta oferece
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {horta.ofertas?.map((item) => (
              <li
                key={item}
                className="rounded-full border border-hortalis-forest/20 bg-white px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-hortalis-forest"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-hortalis-leaf px-4 py-3 text-xs font-bold uppercase tracking-[0.35em] text-hortalis-ice transition hover:bg-hortalis-forest"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
