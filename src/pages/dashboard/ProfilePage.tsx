import { useState, FormEvent } from 'react';
import { CheckCircle, User, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { LicenseType } from '../../types';
import SEOHead from '../../components/seo/SEOHead';
import { Link } from 'react-router-dom';

const licenseTypes: LicenseType[] = ['LCSW', 'LPC', 'LMFT', 'Psychologist', 'Psychiatrist', 'Counselor', 'Social Worker', 'Other'];
const ehrOptions = ['SimplePractice', 'TherapyNotes', 'Kareo', 'AdvancedMD', 'Paper/None', 'Other'];

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const [name, setName] = useState(profile?.name || '');
  const [licenseType, setLicenseType] = useState<LicenseType | string>(profile?.license_type || 'LCSW');
  const [ehr, setEhr] = useState(profile?.ehr_used || 'Paper/None');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError('');
    const { error } = await supabase
      .from('users')
      .update({ name, license_type: licenseType, ehr_used: ehr })
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

  const planLabels: Record<string, string> = {
    trial: 'Free Trial',
    starter: 'Starter Plan',
    pro: 'Pro Plan',
  };

  return (
    <>
      <SEOHead title="Profile — ClinNote" description="Manage your ClinNote profile" canonical="/dashboard/profile" />
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account details.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
            <div className="w-14 h-14 bg-[#F0FAF6] rounded-2xl flex items-center justify-center">
              <User className="w-7 h-7 text-[#0E7A5F]" />
            </div>
            <div>
              <p className="font-bold text-[#1A1A2E]">{profile?.name || 'Your Name'}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                profile?.plan === 'pro' ? 'bg-[#F0FAF6] text-[#0E7A5F]' :
                profile?.plan === 'starter' ? 'bg-blue-50 text-blue-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {planLabels[profile?.plan || 'trial']}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">License / Credential</label>
              <select
                value={licenseType}
                onChange={e => setLicenseType(e.target.value as LicenseType)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] bg-white"
              >
                {licenseTypes.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">EHR / Practice Software</label>
              <select
                value={ehr}
                onChange={e => setEhr(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] bg-white"
              >
                {ehrOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#0E7A5F] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#0a6550] transition-colors disabled:opacity-60 text-sm"
            >
              {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-[#1A1A2E] mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">{planLabels[profile?.plan || 'trial']}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {profile?.plan === 'trial'
                  ? `Trial ends ${profile.trial_end ? new Date(profile.trial_end).toLocaleDateString() : 'soon'}`
                  : profile?.notes_limit === 9999 ? 'Unlimited notes' : `${profile?.notes_limit} notes/month`}
              </p>
            </div>
            <Link
              to="/pricing"
              className="flex items-center gap-1.5 text-sm text-[#0E7A5F] font-semibold border border-[#0E7A5F]/30 px-4 py-2 rounded-xl hover:bg-[#F0FAF6] transition-colors"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              {profile?.plan === 'trial' ? 'Upgrade' : 'Change Plan'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
