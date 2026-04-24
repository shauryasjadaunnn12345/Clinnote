import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Brain, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#0E7A5F] rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#1A1A2E]">ClinNote</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#0E7A5F] transition-colors">
                Features <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <Link to="/soap-note-generator" className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#F0FAF6] hover:text-[#0E7A5F] rounded-lg">SOAP Note Generator</Link>
                  <Link to="/dap-notes-therapist" className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#F0FAF6] hover:text-[#0E7A5F] rounded-lg">DAP Note Generator</Link>
                  <Link to="/emdr-therapy-notes" className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#F0FAF6] hover:text-[#0E7A5F] rounded-lg">EMDR Therapy Notes</Link>
                  <Link to="/ai-notes-for-counselors" className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#F0FAF6] hover:text-[#0E7A5F] rounded-lg">Notes for Counselors</Link>
                </div>
              </div>
            </div>
            <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-[#0E7A5F] transition-colors">Pricing</Link>
            <Link to="/free-soap-note-templates" className="text-sm font-medium text-gray-600 hover:text-[#0E7A5F] transition-colors">Free Templates</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-[#0E7A5F] transition-colors">Dashboard</Link>
                <button onClick={handleSignOut} className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#0E7A5F] transition-colors">Sign In</Link>
                <Link to="/signup" className="bg-[#0E7A5F] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0a6550] transition-colors">
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link to="/soap-note-generator" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>SOAP Note Generator</Link>
          <Link to="/dap-notes-therapist" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>DAP Note Generator</Link>
          <Link to="/pricing" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link to="/free-soap-note-templates" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Free Templates</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block text-sm font-medium text-[#0E7A5F] py-2" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={handleSignOut} className="block text-sm font-medium text-gray-500 py-2">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/signup" className="block bg-[#0E7A5F] text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center" onClick={() => setMobileOpen(false)}>Start Free Trial</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
