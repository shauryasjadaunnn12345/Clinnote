import { useState, FormEvent } from 'react';
import { CheckCircle, AlertCircle, Download, Trash2, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { NoteFormat } from '../../types';
import SEOHead from '../../components/seo/SEOHead';

const formats: NoteFormat[] = ['SOAP', 'DAP', 'BIRP', 'GIRP'];

export default function SettingsPage() {
  const { user, profile, signOut, refreshProfile } = useAuth();

  const [preferredFormat, setPreferredFormat] = useState<NoteFormat>(profile?.preferred_format || 'SOAP');
  const [customInstructions, setCustomInstructions] = useState(profile?.custom_instructions || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError('');
    const { error } = await supabase
      .from('users')
      .update({ preferred_format: preferredFormat, custom_instructions: customInstructions })
      .eq('id', user.id);

    if (error) {
      setError(error.message);
    } else {
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') return;
    if (!user) return;
    await supabase.from('notes').delete().eq('user_id', user.id);
    await supabase.from('users').delete().eq('id', user.id);
    await signOut();
  };

  const handleDownloadAll = async () => {
    if (!user) return;
    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id);

    if (!notes?.length) {
      alert('No notes to download.');
      return;
    }

    const text = notes.map(n =>
      `=== ${n.note_format} Note — ${n.client_name || 'Client'} — ${n.session_date} ===\n\n${n.content}\n\n`
    ).join('\n---\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clinnote-all-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHead title="Settings — ClinNote" description="Manage your ClinNote settings" canonical="/dashboard/settings" />
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Customize your note generation preferences.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-[#1A1A2E] mb-4">Note Preferences</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Note Format</label>
              <div className="grid grid-cols-4 gap-2">
                {formats.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setPreferredFormat(f)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      preferredFormat === f
                        ? 'border-[#0E7A5F] bg-[#F0FAF6] text-[#0E7A5F]'
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Custom Note Instructions
                <span className="text-gray-400 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                value={customInstructions}
                onChange={e => setCustomInstructions(e.target.value)}
                rows={4}
                placeholder='Example: "Always include a safety assessment section. Use gender-neutral language. Include CBT framework references."'
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 resize-none text-gray-700 placeholder-gray-300"
              />
              <p className="text-xs text-gray-400 mt-1">These instructions are added to every AI note generation prompt.</p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#0E7A5F] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#0a6550] transition-colors disabled:opacity-60 text-sm"
          >
            {saving ? 'Saving...' : saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : 'Save Settings'}
          </button>
        </form>

        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-[#1A1A2E] mb-4">Data & Export</h2>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">Download All Notes</p>
              <p className="text-xs text-gray-400">Export all your notes as a text file.</p>
            </div>
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0E7A5F] border border-gray-200 px-3 py-2 rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
          <div className="flex items-start gap-3 bg-[#F0FAF6] border border-[#0E7A5F]/20 rounded-xl p-4 mt-4">
            <Shield className="w-5 h-5 text-[#0E7A5F] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">HIPAA & DPDP Compliance</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                All your data is encrypted at rest (AES-256) and in transit (TLS). Audio files are not stored after transcription.
                We are compliant with HIPAA and India&apos;s DPDP Act 2023. <a href="/hipaa" className="text-[#0E7A5F] hover:underline">Learn more.</a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-red-100 p-6">
          <h2 className="font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-4">Deleting your account is permanent and cannot be undone. All your notes and data will be erased.</p>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder='Type "DELETE" to confirm'
              className="border border-red-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400 flex-1"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== 'DELETE'}
              className="flex items-center gap-2 bg-red-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
