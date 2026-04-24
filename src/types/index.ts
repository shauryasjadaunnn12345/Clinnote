export type NoteFormat = 'SOAP' | 'DAP' | 'BIRP' | 'GIRP';
export type SessionType = 'Individual' | 'Couples' | 'Group' | 'Family' | 'EMDR';
export type Plan = 'trial' | 'starter' | 'pro';
export type LicenseType = 'LCSW' | 'LPC' | 'LMFT' | 'Psychologist' | 'Psychiatrist' | 'Counselor' | 'Social Worker' | 'Other';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  license_type: LicenseType | string;
  preferred_format: NoteFormat;
  ehr_used: string;
  custom_instructions: string;
  plan: Plan;
  notes_used: number;
  notes_limit: number;
  trial_end: string;
  stripe_customer_id: string;
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  client_name: string;
  session_date: string;
  note_format: NoteFormat;
  session_type: SessionType;
  input_text: string;
  content: string;
  is_edited: boolean;
  created_at: string;
}

export interface Template {
  id: string;
  user_id: string | null;
  name: string;
  format_type: NoteFormat;
  content_template: string;
  created_at: string;
}

export interface NoteGenerationInput {
  mode: 'text' | 'voice' | 'file';
  text: string;
  format: NoteFormat;
  sessionType: SessionType;
  clientName: string;
  sessionDate: string;
  customInstructions?: string;
}
