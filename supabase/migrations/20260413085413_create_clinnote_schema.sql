/*
  # ClinNote Initial Schema

  ## Overview
  Creates the full database schema for ClinNote - an AI-powered clinical note generator.

  ## New Tables

  ### users (profile extension of auth.users)
  - id: UUID, references auth.users
  - email: user email address
  - name: therapist full name
  - license_type: credential type (LCSW, LPC, Psychologist, etc.)
  - preferred_format: default note format (SOAP, DAP, BIRP, GIRP)
  - ehr_used: EHR system name
  - custom_instructions: therapist-specific instructions for AI
  - plan: subscription plan (trial, starter, pro)
  - notes_used: count of notes generated this billing cycle
  - notes_limit: max notes for current plan
  - trial_end: trial expiry timestamp
  - stripe_customer_id: Stripe customer reference
  - created_at: record creation timestamp

  ### notes
  - id: UUID primary key
  - user_id: references users
  - client_name: de-identified client name or code
  - session_date: date of therapy session
  - note_format: SOAP/DAP/BIRP/GIRP
  - session_type: Individual/Couples/Group/Family/EMDR
  - input_text: original therapist input
  - content: generated note content (JSON or text)
  - is_edited: whether therapist has manually edited
  - created_at: note creation timestamp

  ### templates
  - id: UUID primary key
  - user_id: null for system templates, user_id for custom
  - name: template name
  - format_type: SOAP/DAP/BIRP/GIRP
  - content_template: template text
  - created_at: creation timestamp

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
*/

-- Users profile table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text DEFAULT '',
  license_type text DEFAULT '',
  preferred_format text DEFAULT 'SOAP',
  ehr_used text DEFAULT '',
  custom_instructions text DEFAULT '',
  plan text DEFAULT 'trial',
  notes_used integer DEFAULT 0,
  notes_limit integer DEFAULT 9999,
  trial_end timestamptz DEFAULT (now() + interval '14 days'),
  stripe_customer_id text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_name text DEFAULT '',
  session_date date NOT NULL DEFAULT CURRENT_DATE,
  note_format text NOT NULL DEFAULT 'SOAP',
  session_type text NOT NULL DEFAULT 'Individual',
  input_text text DEFAULT '',
  content text DEFAULT '',
  is_edited boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes"
  ON notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  format_type text NOT NULL DEFAULT 'SOAP',
  content_template text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view system and own templates"
  ON templates FOR SELECT
  TO authenticated
  USING (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users can insert own templates"
  ON templates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
  ON templates FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
  ON templates FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes(user_id);
CREATE INDEX IF NOT EXISTS notes_session_date_idx ON notes(session_date DESC);
CREATE INDEX IF NOT EXISTS notes_created_at_idx ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS templates_format_type_idx ON templates(format_type);

-- Seed system templates
INSERT INTO templates (id, user_id, name, format_type, content_template) VALUES
  (gen_random_uuid(), NULL, 'Standard SOAP Note', 'SOAP', 'S (Subjective): Client reported...\n\nO (Objective): Client presented as...\n\nA (Assessment): Clinical impressions...\n\nP (Plan): Treatment plan includes...'),
  (gen_random_uuid(), NULL, 'Standard DAP Note', 'DAP', 'D (Data): Client reported...\n\nA (Assessment): Clinician observed...\n\nP (Plan): Treatment plan includes...'),
  (gen_random_uuid(), NULL, 'Standard BIRP Note', 'BIRP', 'B (Behavior): Client demonstrated...\n\nI (Intervention): Therapist utilized...\n\nR (Response): Client responded by...\n\nP (Plan): Next session will focus on...'),
  (gen_random_uuid(), NULL, 'Standard GIRP Note', 'GIRP', 'G (Goal): Session goal was...\n\nI (Intervention): Therapist provided...\n\nR (Response): Client responded...\n\nP (Plan): Future sessions will...')
ON CONFLICT DO NOTHING;
