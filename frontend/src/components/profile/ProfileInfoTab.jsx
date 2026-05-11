import { useState } from 'react';
import InputField from '../InputField';

const IcoUser = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const IcoMail = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>;

export default function ProfileInfoTab({ user, updateProfile, showToast }) {
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [saving, setSaving]     = useState(false);

  const handleSave = async () => {
    if (!fullName.trim()) return showToast('Name cannot be empty.', 'error');
    if (fullName.trim() === user.full_name) return showToast('No changes to save.', 'error');
    setSaving(true);
    try {
      await updateProfile({ full_name: fullName.trim() });
      showToast('Profile updated successfully!');
    } catch (e) { showToast(e.message, 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="card-base p-6 md:p-8 animate-fade-in">
      <h3 className="font-display font-bold text-lg text-[#0F1226] mb-1">Personal Information</h3>
      <p className="text-sm text-[#9EA3BC] mb-6">Update your personal details below.</p>

      <div className="flex flex-col gap-5 max-w-[480px]">
        <InputField label="Full Name" placeholder="Your full name" value={fullName} onChange={setFullName} iconL={IcoUser} />
        <InputField label="Email Address" placeholder={user?.email} value={user?.email || ''} onChange={() => {}} iconL={IcoMail} disabled />
        <p className="text-xs text-[#9EA3BC] -mt-2">Email cannot be changed at this time.</p>
      </div>

      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#E8EAF2]">
        <button onClick={handleSave} disabled={saving}
          className="btn-primary px-7 py-3 text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
          {saving
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.7s linear infinite' }} />
            : 'Save Changes'}
        </button>
        <button onClick={() => setFullName(user?.full_name || '')}
          className="px-5 py-3 rounded-xl text-sm font-semibold text-[#5A5F7D] hover:bg-[#F8F9FE] transition-colors cursor-pointer bg-none border-none font-display">
          Reset
        </button>
      </div>
    </div>
  );
}
