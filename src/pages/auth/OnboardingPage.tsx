import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { NoteFormat, LicenseType } from '../../types';
import SEOHead from '../../components/seo/SEOHead';

const licenseTypes: LicenseType[] = ['LCSW', 'LPC', 'LMFT', 'Psychologist', 'Psychiatrist', 'Counselor', 'Social Worker', 'Other'];
const formats: NoteFormat[] = ['SOAP', 'DAP', 'BIRP', 'GIRP'];
const ehrOptions = ['SimplePractice', 'TherapyNotes', 'Kareo', 'AdvancedMD', 'Paper/None', 'Other'];

export default function OnboardingPage() {
  const [name, setName] = useState('');
  const [licenseType, setLicenseType] = useState<LicenseType>('LCSW');
  const [preferredFormat, setPreferredFormat] = useState<NoteFormat>('SOAP');
  const [ehr, setEhr] = useState('Paper/None');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');

    const { error } = await supabase.from('users').upsert({
      id: user.id,
      email: user.email,
      name,
      license_type: licenseType,
      preferred_format: preferredFormat,
      ehr_used: ehr,
      plan: 'trial',
      notes_used: 0,
      notes_limit: 9999,
      trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await refreshProfile();
    navigate('/dashboard');
  };

  return (
    <>
      <SEOHead
        title="Set Up Your Account — ClinNote"
        description="Complete your ClinNote profile setup."
        canonical="/onboarding"
      />
      <div className="min-h-screen bg-[#F0FAF6] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-[#0E7A5F] rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-[#1A1A2E]">ClinNote</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Set up your profile</h1>
            <p className="text-gray-500 text-sm mt-1">Help us customize notes for your practice</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {error && (
              <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 transition-all"
                  placeholder="Dr. Priya Mehta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">License / Credential Type</label>
                <select
                  value={licenseType}
                  onChange={e => setLicenseType(e.target.value as LicenseType)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 transition-all bg-white"
                >
                  {licenseTypes.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Note Format</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">EHR / Practice Management Software</label>
                <select
                  value={ehr}
                  onChange={e => setEhr(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 transition-all bg-white"
                >
                  {ehrOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#0E7A5F] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a6550] transition-colors disabled:opacity-60"
              >
                {loading ? 'Saving...' : 'Go to Dashboard'}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
