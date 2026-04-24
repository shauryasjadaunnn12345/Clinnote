import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, CheckCircle } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do school counselors need to write clinical notes?', acceptedAnswer: { '@type': 'Answer', text: 'School counselors document sessions for accountability, student welfare tracking, and compliance with district policies. While school notes may differ from clinical therapy notes, they benefit from structured documentation that records presenting concerns, interventions, and follow-up plans.' } },
    { '@type': 'Question', name: 'Can ClinNote help career counselors write session notes?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Career counselors can use ClinNote to document sessions covering vocational exploration, career barriers, emotional aspects of career transitions, and action plans using the DAP or SOAP format adapted to their setting.' } },
    { '@type': 'Question', name: 'What note format works best for counselors?', acceptedAnswer: { '@type': 'Answer', text: 'DAP notes are often preferred by counselors for their efficiency. SOAP notes are better for counselors working in clinical or medical settings where detailed objective observations are required.' } },
    { '@type': 'Question', name: 'Is ClinNote suitable for counselors in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ClinNote is built for Indian mental health practitioners with INR pricing and compliance with India\'s DPDP Act 2023. It works for RCI-registered counselors, psychological counselors, and licensed therapists across India.' } },
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

export default function CounselorNotesPage() {
  return (
    <>
      <SEOHead
        title="AI Notes for Counselors — School, Career & Mental Health Counselors — ClinNote"
        description="Generate professional session notes for school counselors, career counselors, and mental health counselors. AI-powered documentation in SOAP, DAP, and BIRP formats."
        canonical="/ai-notes-for-counselors"
        jsonLd={faqSchema}
      />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-[#F0FAF6] to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="text-xs text-gray-400 mb-6 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-[#0E7A5F]">Home</Link>
              <span>/</span>
              <span className="text-gray-600">AI Notes for Counselors</span>
            </nav>
            <h1 className="text-5xl font-extrabold text-[#1A1A2E] mb-6">AI Notes for Counselors</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              Professional session documentation for school counselors, career counselors, and mental health counselors. Generate structured notes in under 2 minutes.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-[#0E7A5F] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0a6550] transition-all shadow-lg shadow-[#0E7A5F]/25">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="py-20 bg-white">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-6">Why Counselors Need Better Session Documentation</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Whether you are a <strong>school counselor</strong> supporting students through academic, personal, and social challenges, a <strong>career counselor</strong> helping clients navigate vocational decisions, or a <strong>mental health counselor</strong> providing therapeutic support, session documentation is a critical professional responsibility.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Good session notes protect you legally, help you track client progress over time, facilitate communication with other professionals, and demonstrate the value of your work. Yet documentation is consistently cited as one of the most time-consuming and stressful aspects of counseling practice.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              ClinNote is designed for solo and small-practice counselors who need professional documentation without the overhead of complex EHR systems. Simply summarize what happened in the session, and ClinNote generates a complete, structured clinical note in your preferred format.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {[
                { title: 'School Counselors', items: ['Academic support sessions', 'Behavioral intervention notes', 'Crisis documentation', 'Parent consultation notes'] },
                { title: 'Career Counselors', items: ['Vocational assessment sessions', 'Career exploration notes', 'Job search coaching', 'Career transition documentation'] },
                { title: 'Mental Health Counselors', items: ['Individual therapy notes', 'Group counseling sessions', 'Crisis intervention', 'Psychoeducation sessions'] },
              ].map(({ title, items }) => (
                <div key={title} className="bg-[#F0FAF6] rounded-2xl p-4 border border-[#0E7A5F]/10">
                  <h3 className="font-bold text-[#1A1A2E] text-sm mb-3">{title}</h3>
                  <ul className="space-y-2">
                    {items.map(i => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0E7A5F] flex-shrink-0 mt-0.5" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#1A1A2E] mt-8 mb-4">ClinNote for Counselors in India</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              India&apos;s mental health landscape is growing rapidly, with increasing numbers of psychological counselors, RCI-registered practitioners, and private practice therapists seeking efficient documentation tools. ClinNote is priced for the Indian market at ₹499–₹999/month, with compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023.
            </p>
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
            <h2 className="text-4xl font-extrabold text-white mb-4">Better documentation, less time</h2>
            <p className="text-[#a7dece] mb-8">Start your free 14-day trial. No credit card required.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-[#0E7A5F] font-bold px-8 py-4 rounded-xl hover:bg-[#F0FAF6] transition-colors">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
