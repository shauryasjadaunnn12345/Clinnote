import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard as Edit3, Save, Download, Trash2, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { exportNoteToPDF } from '../../lib/pdf';
import type { Note } from '../../types';
import SEOHead from '../../components/seo/SEOHead';

export default function NoteViewPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !id) return;
    supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        setNote(data);
        setEditContent(data?.content || '');
        setLoading(false);
      });
  }, [user, id]);

  const handleSave = async () => {
    if (!note) return;
    setSaving(true);
    const { error } = await supabase
      .from('notes')
      .update({ content: editContent, is_edited: true })
      .eq('id', note.id);

    if (error) {
      setError(error.message);
    } else {
      setNote({ ...note, content: editContent, is_edited: true });
      setEditing(false);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!note || !confirm('Delete this note permanently?')) return;
    await supabase.from('notes').delete().eq('id', note.id);
    navigate('/dashboard/notes');
  };

  const handleCopy = async () => {
    if (!note) return;
    await navigator.clipboard.writeText(note.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatNoteForDisplay = (text: string) => {
    return text.split('\n').map((line, i) => {
      const isBold = line.trim().startsWith('**') && line.includes(':**');
      if (isBold) {
        return <p key={i} className="font-bold text-[#0E7A5F] mt-4 first:mt-0 text-sm">{line.replace(/\*\*/g, '')}</p>;
      }
      if (!line.trim()) return <div key={i} className="h-2" />;
      return <p key={i} className="text-gray-700 leading-relaxed text-sm">{line}</p>;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-[#0E7A5F]" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">Note not found.</p>
        <Link to="/dashboard/notes" className="text-[#0E7A5F] hover:underline text-sm">Back to notes</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={`Note — ${note.client_name || 'Client'} — ClinNote`} description="View therapy note" canonical={`/dashboard/notes/${id}`} />
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <Link to="/dashboard/notes" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0E7A5F] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-[#1A1A2E]">{note.client_name || 'Unnamed Client'}</h1>
                <p className="text-sm text-gray-400 mt-1">
                  {note.session_date} &middot; {note.session_type} &middot; {note.note_format}
                  {note.is_edited && <span className="ml-2 text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">Edited</span>}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0E7A5F] transition-colors px-3 py-1.5 border border-gray-200 rounded-lg"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => exportNoteToPDF(note)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0E7A5F] transition-colors px-3 py-1.5 border border-gray-200 rounded-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF
                </button>
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-1.5 text-xs text-[#0E7A5F] hover:bg-[#F0FAF6] transition-colors px-3 py-1.5 border border-[#0E7A5F]/30 rounded-lg"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {editing ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:bg-red-50 transition-colors px-3 py-1.5 border border-red-200 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>
          )}

          <div className="p-6">
            {editing ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={20}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 resize-none"
                />
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="mt-4 flex items-center gap-2 bg-[#0E7A5F] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#0a6550] transition-colors disabled:opacity-60"
                >
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            ) : (
              <div className="leading-relaxed">
                {formatNoteForDisplay(note.content)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
