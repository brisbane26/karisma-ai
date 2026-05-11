const IcoCheck = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoAlert = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;
  const isErr = type === 'error';
  return (
    <div className={`fixed top-20 right-6 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold shadow-lg animate-fade-in ${isErr ? 'bg-red-50 border border-red-200 text-red-600' : 'bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D]'}`}>
      {isErr ? IcoAlert : IcoCheck}
      {message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-none border-none p-0 text-current">✕</button>
    </div>
  );
}
