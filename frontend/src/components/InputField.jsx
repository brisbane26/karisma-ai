const IcoEyeOn  = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoEyeOff = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10 10 0 0112 20c-7 0-11-8-11-8a18 18 0 015.06-5.94M9.9 4.24A9 9 0 0112 4c7 0 11 8 11 8a18 18 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

export default function InputField({ label, type = 'text', placeholder, value, onChange, iconL, disabled, showToggle, onToggle, showPw }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold font-display text-[#0F1226] flex items-center gap-1.5">
        <span className="text-[#9EA3BC]">{iconL}</span>{label}
      </label>
      <div className="relative">
        <input
          type={showToggle ? (showPw ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`input-base pr-10 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          autoComplete="off"
          disabled={disabled}
        />
        {showToggle && (
          <button type="button" onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9EA3BC] hover:text-primary transition-colors cursor-pointer bg-none border-none p-0">
            {showPw ? IcoEyeOn : IcoEyeOff}
          </button>
        )}
      </div>
    </div>
  );
}
