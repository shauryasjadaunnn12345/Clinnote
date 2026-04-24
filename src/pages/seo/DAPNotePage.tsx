import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, CheckCircle } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a DAP note?', acceptedAnswer: { '@type': 'Answer', text: 'A DAP note (Data, Assessment, Plan) is a streamlined therapy documentation format that combines subjective and objective data into one section, followed by the clinician\'s assessment and treatment plan. It is widely used in community mental health and outpatient settings.' } },
    { '@type': 'Question', name: 'How is DAP different from SOAP?', acceptedAnswer: { '@type': 'Answer', text: 'DAP combines subjective and objective information into one "Data" section, making it quicker to write. SOAP separates these into two distinct sections. Many therapists prefer DAP for its efficiency, especially in high-volume settings.' } },
    { '@type': 'Question', name: 'Can ClinNote generate DAP notes from voice?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ClinNote supports voice dictation via browser microphone and audio file upload. Simply speak your session summary, and ClinNote transcribes and formats it as a complete DAP note.' } },
    { '@type': 'Question', name: 'Are DAP notes accepted by insurance?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. DAP notes are accepted by most insurance providers and meet documentation requirements for Medicare, Medicaid, and private insurers when they contain appropriate clinical content.' } },
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

export default function DAPNotePage() {
  return (
    <>
      <SEOHead
        title="DAP Note Generator for Mental Health Professionals — ClinNote"
        description="Generate professional DAP therapy notes from voice or text in under 2 minutes. AI-powered clinical documentation for therapists and mental health counselors."
        canonical="/dap-notes-therapist"
        jsonLd={faqSchema}
      />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-[#F0FAF6] to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="text-xs text-gray-400 mb-6 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-[#0E7A5F]">Home</Link>
              <span>/</span>
              <span className="text-gray-600">DAP Note Generator</span>
            </nav>
            <h1 className="text-5xl font-extrabold text-[#1A1A2E] mb-6">DAP Note Generator for Mental Health Professionals</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              Generate complete, professional DAP notes from a brief session summary. Trusted by therapists in India and globally.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-[#0E7A5F] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0a6550] transition-all shadow-lg shadow-[#0E7A5F]/25">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="py-20 bg-white">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-6">The DAP Note Format Explained</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The <strong>DAP note format</strong> — Data, Assessment, Plan — is a popular and efficient alternative to SOAP notes. Rather than separating subjective and objective information, DAP combines both into a single <strong>Data</strong> section that includes everything the therapist observed and the client reported. This makes DAP notes faster to write while still meeting clinical and insurance documentation standards.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The <strong>Assessment</strong> section in a DAP note covers the clinician&apos;s clinical impressions, diagnostic considerations, progress toward treatment goals, and risk assessment. The <strong>Plan</strong> section describes the therapeutic interventions planned, homework assigned, and goals for the next session.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              DAP notes are widely used in community mental health centers, outpatient clinics, and private practices. They are accepted by most insurance providers including Medicare and Medicaid when they contain sufficient clinical detail.
            </p>
            <h3 className="text-2xl font-bold text-[#1A1A2E] mt-8 mb-4">Why Use an AI DAP Note Generator?</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Even the relatively concise DAP format takes 15–20 minutes to write manually per session. ClinNote&apos;s AI DAP note generator transforms a brief session summary into a complete, professionally written DAP note in under 2 minutes — saving solo practitioners 2+ hours per day.
            </p>
            <div className="grid grid-cols-2 gap-4 my-8">
              {['Professional clinical language', 'Risk assessment included', 'Insurance-ready format', 'Fully editable output', 'HIPAA-compliant storage', 'PDF export ready'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-[#0E7A5F] flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="py-16 bg-[#F0FAF6]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((f, i) => <FAQItem key={i} q={f.name} a={f.acceptedAnswer.text} />)}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0E7A5F] text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-white mb-4">Generate your first DAP note free</h2>
            <p className="text-[#a7dece] mb-8">14-day free trial. No credit card required.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-[#0E7A5F] font-bold px-8 py-4 rounded-xl hover:bg-[#F0FAF6] transition-colors">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
