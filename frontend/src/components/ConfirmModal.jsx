const IcoAlert = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;

export default function ConfirmModal({ open, title, message, confirmLabel, onConfirm, onCancel, danger }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6" onClick={onCancel}>
      <div className="absolute inset-0 bg-[#0F1226]/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl p-8 max-w-[420px] w-full shadow-lg animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${danger ? 'bg-red-50 text-red-500' : 'bg-primary-light text-primary'}`}>
          {IcoAlert}
        </div>
        <h3 className="font-display font-bold text-xl text-[#0F1226] text-center mb-2">{title}</h3>
        <p className="text-sm text-[#5A5F7D] text-center mb-7 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl text-sm font-semibold font-display text-[#5A5F7D] bg-[#F8F9FE] border border-[#E8EAF2] hover:bg-[#E8EAF2] transition-all cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm} className={`flex-1 py-3 rounded-xl text-sm font-semibold font-display text-white transition-all cursor-pointer border-none ${danger ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'}`}
            style={{ boxShadow: danger ? '0 4px 14px rgba(239,68,68,0.35)' : '0 4px 14px rgba(91,79,232,0.35)' }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
