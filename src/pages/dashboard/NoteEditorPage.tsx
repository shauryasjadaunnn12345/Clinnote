import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic, MicOff, Upload, Type, Wand2, Save, AlertCircle,
  CheckCircle, Loader2, RefreshCw
} from 'lucide-react';
import { generateNote, transcribeAudio } from '../../lib/openai';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { NoteFormat, SessionType } from '../../types';
import SEOHead from '../../components/seo/SEOHead';

type InputMode = 'text' | 'voice' | 'file';

const formats: NoteFormat[] = ['SOAP', 'DAP', 'BIRP', 'GIRP'];
const sessionTypes: SessionType[] = ['Individual', 'Couples', 'Group', 'Family', 'EMDR'];

export default function NoteEditorPage() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<InputMode>('text');
  const [inputText, setInputText] = useState('');
  const [format, setFormat] = useState<NoteFormat>(profile?.preferred_format || 'SOAP');
  const [sessionType, setSessionType] = useState<SessionType>('Individual');
  const [clientName, setClientName] = useState('');
  const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [generatedNote, setGeneratedNote] = useState('');
  const [editedNote, setEditedNote] = useState('');

  const [isRecording, setIsRecording] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = e => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(t => t.stop());
        setGenerating(true);
        setError('');
        try {
          const transcript = await transcribeAudio(blob);
          setInputText(transcript);
        } catch (e) {
          setError((e as Error).message);
        } finally {
          setGenerating(false);
        }
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setIsRecording(true);
    } catch {
      setError('Microphone access denied. Please allow microphone permissions.');
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGenerating(true);
    setError('');
    try {
      const transcript = await transcribeAudio(file);
      setInputText(transcript);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter a session summary first.');
      return;
    }
    setError('');
    setGenerating(true);
    try {
      const note = await generateNote(
        inputText,
        format,
        sessionType,
        profile?.custom_instructions
      );
      setGeneratedNote(note);
      setEditedNote(note);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGenerating(false);
    }
  }, [inputText, format, sessionType, profile?.custom_instructions]);

  const handleSave = async () => {
    if (!editedNote.trim() || !user) return;
    setSaving(true);
    setError('');
    const { error: insertError } = await supabase.from('notes').insert({
      user_id: user.id,
      client_name: clientName,
      session_date: sessionDate,
      note_format: format,
      session_type: sessionType,
      input_text: inputText,
      content: editedNote,
      is_edited: editedNote !== generatedNote,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    await supabase
      .from('users')
      .update({ notes_used: (profile?.notes_used ?? 0) + 1 })
      .eq('id', user.id);

    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => navigate('/dashboard/notes'), 1500);
  };

  const formatNoteForDisplay = (text: string) => {
    return text.split('\n').map((line, i) => {
      const isBold = line.trim().startsWith('**') && line.includes(':**');
      if (isBold) {
        const cleaned = line.replace(/\*\*/g, '');
        return <p key={i} className="font-bold text-[#0E7A5F] mt-4 first:mt-0">{cleaned}</p>;
      }
      if (!line.trim()) return <div key={i} className="h-2" />;
      return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>;
    });
  };

  return (
    <>
      <SEOHead title="Generate Note — ClinNote" description="Create a new therapy note" canonical="/dashboard/new" />
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Generate New Note</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in session details, then generate your clinical note.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-600 rounded-xl px-4 py-3 mb-5 text-sm">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Note saved! Redirecting to notes list...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-semibold text-[#1A1A2E] text-sm mb-4">Session Details</h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Client Name / ID</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Client A or #1234"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Session Date</label>
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={e => setSessionDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Note Format</label>
                  <select
                    value={format}
                    onChange={e => setFormat(e.target.value as NoteFormat)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0E7A5F] bg-white"
                  >
                    {formats.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Session Type</label>
                  <select
                    value={sessionType}
                    onChange={e => setSessionType(e.target.value as SessionType)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0E7A5F] bg-white"
                  >
                    {sessionTypes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-semibold text-[#1A1A2E] text-sm mb-4">Session Input</h2>
              <div className="flex gap-2 mb-4">
                {([['text', Type, 'Type'], ['voice', Mic, 'Voice'], ['file', Upload, 'Upload']] as const).map(([m, Icon, label]) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border-2 transition-all ${
                      mode === m
                        ? 'border-[#0E7A5F] bg-[#F0FAF6] text-[#0E7A5F]'
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {mode === 'text' && (
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  rows={8}
                  placeholder="Type a brief session summary here. Example: Client discussed work-related anxiety, explored CBT thought challenging techniques. Client reported feeling somewhat relieved by end of session. Safety: no SI/HI. Plan: continue CBT, thought records homework."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 resize-none text-gray-700 placeholder-gray-300"
                />
              )}

              {mode === 'voice' && (
                <div className="text-center py-8">
                  <button
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-[#0E7A5F] text-white hover:bg-[#0a6550]'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                  </button>
                  <p className="text-sm font-medium text-gray-600">
                    {isRecording ? 'Recording... click to stop' : 'Click to start recording'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Speak your session summary aloud</p>
                  {inputText && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl text-left">
                      <p className="text-xs text-gray-500 mb-1 font-medium">Transcript:</p>
                      <p className="text-sm text-gray-700">{inputText}</p>
                    </div>
                  )}
                </div>
              )}

              {mode === 'file' && (
                <div className="text-center py-8">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-[#0E7A5F] hover:bg-[#F0FAF6] transition-all"
                  >
                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">Click to upload audio</p>
                    <p className="text-xs text-gray-400 mt-1">MP3, MP4, WAV — max 25MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp3,.mp4,.wav,.webm,.m4a"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {inputText && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl text-left">
                      <p className="text-xs text-gray-500 mb-1 font-medium">Transcript:</p>
                      <p className="text-sm text-gray-700">{inputText}</p>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={generating || !inputText.trim()}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-[#0E7A5F] text-white font-semibold py-3 rounded-xl hover:bg-[#0a6550] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                ) : (
                  <><Wand2 className="w-4 h-4" /> Generate {format} Note</>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#1A1A2E] text-sm">Generated Note</h2>
              {generatedNote && (
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0E7A5F] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
              )}
            </div>

            {!generatedNote ? (
              <div className="flex-1 flex items-center justify-center py-16 text-center">
                <div>
                  <div className="w-12 h-12 bg-[#F0FAF6] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Wand2 className="w-6 h-6 text-[#0E7A5F]" />
                  </div>
                  <p className="text-sm font-semibold text-[#1A1A2E] mb-1">Your note will appear here</p>
                  <p className="text-xs text-gray-400">Fill in session details and click &quot;Generate Note&quot;</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 border border-gray-100 rounded-xl p-4 mb-4 min-h-64">
                  <div className="text-sm leading-relaxed">
                    {formatNoteForDisplay(editedNote)}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Edit Note (reviewed by you before saving)</label>
                  <textarea
                    value={editedNote}
                    onChange={e => setEditedNote(e.target.value)}
                    rows={10}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E7A5F] focus:ring-2 focus:ring-[#0E7A5F]/10 resize-none font-mono"
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving || saved}
                  className="flex items-center justify-center gap-2 bg-[#0E7A5F] text-white font-semibold py-3 rounded-xl hover:bg-[#0a6550] transition-colors disabled:opacity-60"
                >
                  {saving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : saved ? (
                    <><CheckCircle className="w-4 h-4" /> Saved!</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save Note</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
