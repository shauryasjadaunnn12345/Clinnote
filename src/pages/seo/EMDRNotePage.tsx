import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Shield } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I document EMDR therapy sessions?', acceptedAnswer: { '@type': 'Answer', text: 'EMDR session documentation typically includes the target memory addressed, SUDS (Subjective Units of Disturbance Scale) scores at start and end, VoC (Validity of Cognition) scores, negative and positive cognitions, body sensations noted, phases completed, and client response to bilateral stimulation.' } },
    { '@type': 'Question', name: 'What note format is best for EMDR therapy?', acceptedAnswer: { '@type': 'Answer', text: 'SOAP and DAP formats work well for EMDR documentation. ClinNote generates EMDR-specific notes that include SUDS scores, target memories, phases completed, and treatment response, adapted to your preferred format.' } },
    { '@type': 'Question', name: 'Can ClinNote generate EMDR-specific clinical notes?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. When you select EMDR as the session type in ClinNote, the AI generates notes that include EMDR-specific components: target memory, SUDS scores, phases completed, cognitive interweaves used, and client response.' } },
    { '@type': 'Question', name: 'Is EMDR documentation different from regular therapy notes?', acceptedAnswer: { '@type': 'Answer', text: 'EMDR documentation typically includes additional elements beyond standard therapy notes: trauma target, SUDS and VoC measurements, body scan findings, specific phases of EMDR protocol completed, and bilateral stimulation method used.' } },
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

export default function EMDRNotePage() {
  return (
    <>
      <SEOHead
        title="AI Notes for EMDR Therapists — ClinNote"
        description="Generate structured EMDR therapy notes with SUDS scores, target memories, and phase documentation. HIPAA-compliant AI note generator for EMDR therapists."
        canonical="/emdr-therapy-notes"
        jsonLd={faqSchema}
      />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-[#F0FAF6] to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="text-xs text-gray-400 mb-6 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-[#0E7A5F]">Home</Link>
              <span>/</span>
              <span className="text-gray-600">EMDR Therapy Notes</span>
            </nav>
            <h1 className="text-5xl font-extrabold text-[#1A1A2E] mb-6">AI Notes for EMDR Therapists</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              Generate EMDR-specific clinical notes that include SUDS scores, target memories, phases completed, and client response — all in your preferred SOAP or DAP format.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-[#0E7A5F] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0a6550] transition-all shadow-lg shadow-[#0E7A5F]/25">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="py-20 bg-white">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-6">EMDR Therapy Documentation Made Simple</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong> therapy requires specialized clinical documentation that captures the unique elements of trauma processing sessions. Unlike general therapy notes, EMDR documentation must track target memories, SUDS (Subjective Units of Disturbance Scale) measurements, VoC (Validity of Cognition) scores, phases completed, and bilateral stimulation methods used.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Writing thorough EMDR progress notes manually after each session is particularly challenging because the documentation requirements are more complex than standard therapy notes. Many EMDR therapists report spending 30–45 minutes per session note — time that could be better spent with clients.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              ClinNote&apos;s EMDR note generator understands the EMDR protocol. When you select &quot;EMDR&quot; as the session type, the AI incorporates EMDR-specific elements into your note, including target memory identification, distress measurements, phases of the EMDR protocol addressed, cognitive processing observed, and the client&apos;s overall response to bilateral stimulation.
            </p>
            <div className="bg-[#F0FAF6] border border-[#0E7A5F]/20 rounded-2xl p-6 my-8">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#0E7A5F] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2">Trauma-Sensitive Documentation</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    ClinNote follows trauma-sensitive documentation practices. Audio files are never stored after transcription, ensuring that session content about trauma stays private. All data is encrypted with AES-256.
                  </p>
                </div>
              </div>
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
            <h2 className="text-4xl font-extrabold text-white mb-4">Streamline your EMDR documentation</h2>
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
