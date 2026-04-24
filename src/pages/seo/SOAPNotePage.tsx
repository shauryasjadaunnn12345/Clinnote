import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a SOAP note in therapy?',
      acceptedAnswer: { '@type': 'Answer', text: 'A SOAP note is a structured clinical documentation format with four sections: Subjective (what the client reports), Objective (clinician observations), Assessment (clinical impressions and diagnosis considerations), and Plan (treatment plan and next steps).' }
    },
    {
      '@type': 'Question',
      name: 'How does an AI SOAP note generator work?',
      acceptedAnswer: { '@type': 'Answer', text: 'ClinNote uses GPT-4o to convert a brief session summary into a full SOAP note. The therapist types or speaks a short summary, and the AI expands it into professional clinical language with all four SOAP sections.' }
    },
    {
      '@type': 'Question',
      name: 'Is ClinNote\'s SOAP note generator HIPAA-compliant?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. ClinNote uses end-to-end encryption, does not store audio after transcription, and offers BAA agreements for healthcare providers.' }
    },
    {
      '@type': 'Question',
      name: 'Can I edit the generated SOAP note?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. All notes are fully editable before saving. ClinNote is a documentation assistant — the clinician always reviews and has final authority.' }
    },
  ]
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://clinnote.in' },
    { '@type': 'ListItem', position: 2, name: 'SOAP Note Generator', item: 'https://clinnote.in/soap-note-generator' },
  ]
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-[#1A1A2E] text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-6 py-4 bg-gray-50 border-t border-gray-100"><p className="text-sm text-gray-600 leading-relaxed">{a}</p></div>}
    </div>
  );
}

export default function SOAPNotePage() {
  return (
    <>
      <SEOHead
        title="AI SOAP Note Generator for Therapists — ClinNote"
        description="Generate professional SOAP therapy notes from voice or text in under 2 minutes. HIPAA-compliant AI documentation tool for mental health therapists and counselors."
        canonical="/soap-note-generator"
        jsonLd={[faqSchema, breadcrumb]}
      />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-[#F0FAF6] to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="text-xs text-gray-400 mb-6 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-[#0E7A5F]">Home</Link>
              <span>/</span>
              <span className="text-gray-600">SOAP Note Generator</span>
            </nav>
            <h1 className="text-5xl font-extrabold text-[#1A1A2E] mb-6">AI SOAP Note Generator for Therapists</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              Generate professional, clinical SOAP notes from a quick session summary in under 2 minutes. Built for licensed therapists, LCSWs, and psychologists.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-[#0E7A5F] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0a6550] transition-all shadow-lg shadow-[#0E7A5F]/25">
              Start Free 14-Day Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-3">No credit card required</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-sm">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-6">What is a SOAP Note?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A <strong>SOAP note</strong> is the most widely used clinical documentation format in mental health therapy and medical settings. SOAP stands for <strong>Subjective, Objective, Assessment, and Plan</strong>. It provides a structured framework that helps therapists document sessions consistently, communicate with other providers, and maintain records that meet insurance and licensing board requirements.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The <strong>Subjective</strong> section captures what the client says — their presenting concerns, mood, symptoms, and subjective experience of the session. The <strong>Objective</strong> section records clinician observations such as the client's affect, behavior, grooming, and cognitive functioning. The <strong>Assessment</strong> section includes the therapist's clinical impressions, diagnostic considerations, risk assessment for suicidal or homicidal ideation, and progress toward treatment goals. Finally, the <strong>Plan</strong> section outlines interventions used, homework assigned, referrals made, and goals for the next session.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Writing SOAP notes manually after every session is time-consuming — studies show that therapists spend an average of 20–30 minutes per note. For a solo practitioner seeing 6–8 clients per day, that's 2–4 hours of daily documentation. ClinNote's AI SOAP note generator reduces that to under 2 minutes per note, saving therapists significant time and reducing documentation-related burnout.
            </p>
            <h3 className="text-2xl font-bold text-[#1A1A2E] mt-8 mb-4">How ClinNote Generates SOAP Notes</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              ClinNote uses OpenAI's GPT-4o model, trained specifically for clinical documentation, to expand a brief session summary into a full, professionally written SOAP note. The therapist simply types or dictates a short session recap — typically 2–5 sentences — and ClinNote generates a complete, structured note with all four sections.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Every generated SOAP note includes a safety assessment (suicidal ideation, homicidal ideation, self-harm risk), uses appropriate clinical language, writes in third person, and is formatted for immediate use in any EHR. Notes are fully editable before saving, ensuring the therapist maintains clinical oversight at all times.
            </p>
            <div className="bg-[#F0FAF6] border border-[#0E7A5F]/20 rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">Who Should Use ClinNote's SOAP Note Generator?</h3>
              <ul className="space-y-2">
                {['Licensed Clinical Social Workers (LCSWs)', 'Licensed Professional Counselors (LPCs)', 'Psychologists (PhD, PsyD)', 'Licensed Marriage and Family Therapists (LMFTs)', 'Psychiatrists', 'Mental health counselors in private practice'].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#0E7A5F] flex-shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <section className="py-16 bg-[#F0FAF6]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((f, i) => (
                <FAQItem key={i} q={f.name} a={f.acceptedAnswer.text} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0E7A5F] text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-white mb-4">Start generating SOAP notes in 2 minutes</h2>
            <p className="text-[#a7dece] mb-8">Free 14-day trial. No credit card. Cancel anytime.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-[#0E7A5F] font-bold px-8 py-4 rounded-xl hover:bg-[#F0FAF6] transition-colors">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
