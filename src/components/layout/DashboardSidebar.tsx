import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Brain, LayoutDashboard, FileText, Plus, Settings,
  User, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/new', icon: Plus, label: 'New Note' },
  { to: '/dashboard/notes', icon: FileText, label: 'All Notes' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
];

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const planColors: Record<string, string> = {
    trial: 'bg-amber-100 text-amber-700',
    starter: 'bg-blue-100 text-blue-700',
    pro: 'bg-[#F0FAF6] text-[#0E7A5F]',
  };

  const NavContent = () => (
    <nav className="flex flex-col h-full">
      <Link to="/" className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-[#0E7A5F] rounded-lg flex items-center justify-center flex-shrink-0">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg text-[#1A1A2E]">ClinNote</span>
      </Link>

      {profile && (
        <div className="px-4 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-[#1A1A2E] truncate">{profile.name || profile.email}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">{profile.license_type || 'Therapist'}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${planColors[profile.plan] || planColors.trial}`}>
              {profile.plan === 'trial' ? 'Free Trial' : profile.plan}
            </span>
          </div>
          {profile.plan === 'trial' || profile.plan === 'starter' ? (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Notes used</span>
                <span>{profile.notes_used} / {profile.notes_limit === 9999 ? '∞' : profile.notes_limit}</span>
              </div>
              {profile.notes_limit !== 9999 && (
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0E7A5F] rounded-full transition-all"
                    style={{ width: `${Math.min((profile.notes_used / profile.notes_limit) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      <ul className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? 'bg-[#F0FAF6] text-[#0E7A5F]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#0E7A5F]'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${active ? 'text-[#0E7A5F]' : 'text-gray-400 group-hover:text-[#0E7A5F]'}`} style={{ width: '18px', height: '18px' }} />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            </li>
          );
        })}
      </ul>

      {profile?.plan === 'trial' && (
        <div className="mx-3 mb-3 p-3 bg-[#F0FAF6] border border-[#0E7A5F]/20 rounded-xl">
          <p className="text-xs font-semibold text-[#0E7A5F] mb-1">Trial ends soon</p>
          <p className="text-xs text-gray-500 mb-2">Upgrade to keep generating notes.</p>
          <Link to="/pricing" className="block text-center text-xs bg-[#0E7A5F] text-white py-1.5 rounded-lg font-medium hover:bg-[#0a6550] transition-colors">
            Upgrade Now
          </Link>
        </div>
      )}

      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-sm"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex-shrink-0 z-40 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <NavContent />
      </aside>
    </>
  );
}
