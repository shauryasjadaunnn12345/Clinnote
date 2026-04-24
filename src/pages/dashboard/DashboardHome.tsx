import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Note } from '../../types';
import SEOHead from '../../components/seo/SEOHead';

export default function DashboardHome() {
  const { user, profile } = useAuth();
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        setRecentNotes(data || []);
        setLoading(false);
      });
  }, [user]);

  const trialDaysLeft = profile?.trial_end
    ? Math.max(0, Math.ceil((new Date(profile.trial_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const usagePct = profile?.notes_limit && profile.notes_limit !== 9999
    ? Math.min((profile.notes_used / profile.notes_limit) * 100, 100)
    : 0;

  return (
    <>
      <SEOHead title="Dashboard — ClinNote" description="Your ClinNote dashboard" canonical="/dashboard" />
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">
            Welcome back{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Ready to generate today&apos;s notes?</p>
        </div>

        {profile?.plan === 'trial' && (
          <div className="bg-[#E8A838]/10 border border-[#E8A838]/30 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#E8A838]" />
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">{trialDaysLeft} days left in free trial</p>
                <p className="text-xs text-gray-500">Upgrade to keep access to all features.</p>
              </div>
            </div>
            <Link to="/pricing" className="text-sm bg-[#E8A838] text-white font-semibold px-4 py-2 rounded-xl hover:bg-[#d4962e] transition-colors flex-shrink-0">
              Upgrade Now
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Notes Generated</p>
              <FileText className="w-4 h-4 text-[#0E7A5F]" />
            </div>
            <p className="text-3xl font-bold text-[#1A1A2E]">{profile?.notes_used ?? 0}</p>
            {profile?.notes_limit !== 9999 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Used</span>
                  <span>{profile?.notes_used} / {profile?.notes_limit}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0E7A5F] rounded-full transition-all" style={{ width: `${usagePct}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Time Saved</p>
              <TrendingUp className="w-4 h-4 text-[#0E7A5F]" />
            </div>
            <p className="text-3xl font-bold text-[#1A1A2E]">{Math.round((profile?.notes_used ?? 0) * 8)} min</p>
            <p className="text-xs text-gray-400 mt-1">~8 min saved per note</p>
          </div>

          <div className="bg-[#0E7A5F] rounded-2xl p-5 text-white">
            <p className="text-xs text-[#a7dece] font-medium uppercase tracking-wide mb-3">Quick Action</p>
            <p className="font-bold text-lg mb-3">Generate a new note</p>
            <Link
              to="/dashboard/new"
              className="inline-flex items-center gap-2 bg-white text-[#0E7A5F] font-semibold text-sm px-4 py-2 rounded-xl hover:bg-[#F0FAF6] transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Note
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-[#1A1A2E] text-sm">Recent Notes</h2>
            <Link to="/dashboard/notes" className="text-xs text-[#0E7A5F] font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-[#0E7A5F] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : recentNotes.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-[#F0FAF6] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-[#0E7A5F]" />
              </div>
              <p className="font-semibold text-[#1A1A2E] mb-1">No notes yet</p>
              <p className="text-sm text-gray-400 mb-4">Generate your first therapy note in under 2 minutes.</p>
              <Link to="/dashboard/new" className="inline-flex items-center gap-2 bg-[#0E7A5F] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0a6550] transition-colors">
                <Plus className="w-4 h-4" /> Generate First Note
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentNotes.map(note => (
                <li key={note.id}>
                  <Link to={`/dashboard/notes/${note.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
                    <div className="w-9 h-9 bg-[#F0FAF6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#0E7A5F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1A1A2E] text-sm truncate">{note.client_name || 'Unnamed Client'}</p>
                      <p className="text-xs text-gray-400">{note.session_date} &middot; {note.session_type}</p>
                    </div>
                    <span className="bg-[#F0FAF6] text-[#0E7A5F] text-xs font-medium px-2 py-1 rounded-lg flex-shrink-0">{note.note_format}</span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0E7A5F] transition-colors flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
