import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SEOHead from '../../components/seo/SEOHead';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError('');
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setError(error.message || 'Failed to create account.');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <>
      <SEOHead
        title="Start Free Trial — ClinNote AI Therapy Note Generator"
        description="Sign up for ClinNote and get 14 days free. Generate SOAP, DAP, BIRP therapy notes in under 2 minutes."
        canonical="/signup"
      />
      <div className="min-h-screen bg-[#F0FAF6] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-[#0E7A5F] rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-[#1A1A2E]">ClinNote</span>
            </Link>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Start your free 14-day trial</h1>
            <p className="text-gray-500 text-sm mt-1">No credit card required</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid grid-cols-3 gap-2 mb-6">
              {['HIPAA-compliant', 'Cancel anytime', '14 days free'].map(t => (
                <div key={t} className="flex items-center gap-1 text-xs text-gray-500">
                  <CheckCircle className="w-3 h-3 text-[#0E7A5F] flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Work email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 transition-all"
                  placeholder="you@practice.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 transition-all"
                    placeholder="Min. 8 characters"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0E7A5F] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a6550] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {loading ? 'Creating account...' : 'Create Free Account'}
              </button>
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                By creating an account you agree to our{' '}
                <Link to="/terms" className="text-[#0E7A5F] hover:underline">Terms</Link> and{' '}
                <Link to="/privacy" className="text-[#0E7A5F] hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0E7A5F] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
