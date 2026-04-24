import type { NoteFormat, SessionType } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;

const FORMAT_INSTRUCTIONS: Record<NoteFormat, string> = {
  SOAP: `Generate a professional SOAP therapy note with these exact sections:
**S - SUBJECTIVE:** What the client reported, their chief complaints, feelings, and subjective experience.
**O - OBJECTIVE:** Observable, measurable data — client's affect, behavior, appearance, mood, cognition.
**A - ASSESSMENT:** Clinician's clinical impressions, progress toward goals, diagnostic considerations, risk assessment.
**P - PLAN:** Treatment interventions, homework assignments, goals for next session, referrals if any.`,

  DAP: `Generate a professional DAP therapy note with these exact sections:
**D - DATA:** Both subjective (what client said) and objective (what clinician observed) information from the session.
**A - ASSESSMENT:** Clinician's interpretation, clinical impressions, progress toward treatment goals, risk level.
**P - PLAN:** Interventions planned, next session agenda, homework, referrals, and ongoing treatment strategy.`,

  BIRP: `Generate a professional BIRP therapy note with these exact sections:
**B - BEHAVIOR:** Client's presenting behaviors, statements, emotional presentation, and session content.
**I - INTERVENTION:** Specific therapeutic techniques and interventions used by the clinician this session.
**R - RESPONSE:** How the client responded to interventions, engagement level, insight demonstrated.
**P - PLAN:** Goals for next session, homework assigned, follow-up actions, treatment modifications.`,

  GIRP: `Generate a professional GIRP therapy note with these exact sections:
**G - GOAL:** The treatment goal(s) addressed in this session, linked to the treatment plan.
**I - INTERVENTION:** Therapeutic modalities and specific interventions employed during session.
**R - RESPONSE:** Client's response to interventions, progress made, barriers encountered.
**P - PLAN:** Next session plan, homework, referrals, updated goals or treatment plan adjustments.`,
};

export async function generateNote(
  inputText: string,
  format: NoteFormat,
  sessionType: SessionType,
  customInstructions?: string
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
  }

  const systemPrompt = `You are an expert clinical documentation specialist for mental health therapists. You write professional, compliant, and compassionate therapy progress notes that meet HIPAA standards.

Rules:
- Write in third person (e.g., "Client reported..." not "You reported...")
- Use professional clinical language appropriate for a licensed therapist's chart
- Never include identifying information beyond what is provided
- Include a brief safety assessment (suicidal ideation, homicidal ideation, self-harm risk) in the Assessment/Plan section
- Keep notes concise but comprehensive — typically 200-400 words total
- Format using the exact section headers provided
- ${customInstructions ? `Additional clinician instructions: ${customInstructions}` : ''}

${FORMAT_INSTRUCTIONS[format]}`;

  const userMessage = `Generate a ${format} therapy note for a ${sessionType} therapy session.

Session summary provided by therapist:
${inputText}

Write the complete ${format} note based on this summary. Expand appropriately with clinical language.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.4,
      max_tokens: 1200,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate note');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured.');
  }

  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to transcribe audio');
  }

  const data = await response.json();
  return data.text || '';
}
