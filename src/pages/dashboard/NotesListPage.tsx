import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Plus, Download, ArrowRight, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Note, NoteFormat } from '../../types';
import SEOHead from '../../components/seo/SEOHead';

export default function NotesListPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formatFilter, setFormatFilter] = useState<NoteFormat | 'ALL'>('ALL');

  useEffect(() => {
    if (!user) return;
    supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setNotes(data || []);
        setLoading(false);
      });
  }, [user]);

  const filtered = notes.filter(n => {
    const matchSearch =
      n.client_name.toLowerCase().includes(search.toLowerCase()) ||
      n.session_date.includes(search);
    const matchFormat = formatFilter === 'ALL' || n.note_format === formatFilter;
    return matchSearch && matchFormat;
  });

  return (
    <>
      <SEOHead title="All Notes — ClinNote" description="Browse your saved therapy notes" canonical="/dashboard/notes" />
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">All Notes</h1>
            <p className="text-gray-500 text-sm mt-1">{notes.length} note{notes.length !== 1 ? 's' : ''} total</p>
          </div>
          <Link
            to="/dashboard/new"
            className="flex items-center gap-2 bg-[#0E7A5F] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#0a6550] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Note
          </Link>
        </div>

        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by client or date..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <select
              value={formatFilter}
              onChange={e => setFormatFilter(e.target.value as NoteFormat | 'ALL')}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0E7A5F] bg-white"
            >
              <option value="ALL">All Formats</option>
              <option value="SOAP">SOAP</option>
              <option value="DAP">DAP</option>
              <option value="BIRP">BIRP</option>
              <option value="GIRP">GIRP</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-6 h-6 border-2 border-[#0E7A5F] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-[#F0FAF6] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-[#0E7A5F]" />
              </div>
              <p className="font-semibold text-[#1A1A2E] mb-1">{search || formatFilter !== 'ALL' ? 'No matching notes' : 'No notes yet'}</p>
              <p className="text-sm text-gray-400 mb-4">
                {search || formatFilter !== 'ALL' ? 'Try adjusting your search or filter.' : 'Generate your first clinical note.'}
              </p>
              {!search && formatFilter === 'ALL' && (
                <Link to="/dashboard/new" className="inline-flex items-center gap-2 bg-[#0E7A5F] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0a6550] transition-colors">
                  <Plus className="w-4 h-4" /> Generate Note
                </Link>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {filtered.map(note => (
                <li key={note.id}>
                  <Link to={`/dashboard/notes/${note.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
                    <div className="w-10 h-10 bg-[#F0FAF6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#0E7A5F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1A1A2E] text-sm truncate">{note.client_name || 'Unnamed Client'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {note.session_date} &middot; {note.session_type} &middot; {new Date(note.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="bg-[#F0FAF6] text-[#0E7A5F] text-xs font-medium px-2.5 py-1 rounded-lg">{note.note_format}</span>
                      {note.is_edited && (
                        <span className="text-xs text-gray-400">Edited</span>
                      )}
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0E7A5F] transition-colors" />
                    </div>
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
