const IcoAlert = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function AccountTab({ onLogout, onDeleteAccount }) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      {/* Logout */}
      <div className="card-base p-6 md:p-8">
        <h3 className="font-display font-bold text-lg text-[#0F1226] mb-1">
          Logout
        </h3>
        <p className="text-sm text-[#9EA3BC] mb-5">
          Sign out from your current session.
        </p>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-display text-[#5A5F7D] bg-[#F8F9FE] border-2 border-[#E8EAF2] hover:bg-[#E8EAF2] hover:border-[#D0D3E8] transition-all cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Logout
        </button>
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-red-200 rounded-2xl p-6 md:p-8 bg-red-50/50">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-red-500">{IcoAlert}</span>
          <h3 className="font-display font-bold text-lg text-red-600">
            DELETE ACCOUNT
          </h3>
        </div>
        <p className="text-sm text-red-400 mb-5">
          This action is irreversible. Please proceed with caution.
        </p>
        <button
          onClick={onDeleteAccount}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-display text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer border-none"
          style={{ boxShadow: "0 4px 14px rgba(239,68,68,0.3)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
          Delete Account
        </button>
      </div>
    </div>
  );
}
