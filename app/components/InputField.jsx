export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  action,
  onFocus,
  onBlur,
  autoComplete,
  disabled = false,
}) {
  const inputId = `input-${name}`;

  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-hortalis-ink">
      <span className="text-[0.7rem] tracking-[0.32em] text-hortalis-ink/60">
        {label}
      </span>
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base font-medium text-hortalis-ink shadow-sm transition focus:border-hortalis-leaf focus:outline-none focus:ring-2 focus:ring-hortalis-leaf/20 disabled:cursor-not-allowed disabled:opacity-70"
        />
        {action ? (
          <button
            type="button"
            onClick={action.onClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-hortalis-ink transition hover:border-hortalis-leaf hover:text-hortalis-leaf"
          >
            {action.label}
          </button>
        ) : null}
      </div>
    </label>
  );
}
