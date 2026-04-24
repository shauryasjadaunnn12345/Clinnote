import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic, FileText, Zap, Shield, Clock, Star,
  CheckCircle, ArrowRight, ChevronDown, Users,
  Brain, Download
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ClinNote',
  url: 'https://clinnote.in',
  logo: 'https://clinnote.in/logo.png',
  description: 'AI-powered clinical note generator for mental health therapists and counselors.',
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ClinNote',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter Plan',
      price: '499',
      priceCurrency: 'INR',
      description: '40 notes per month',
    },
    {
      '@type': 'Offer',
      name: 'Pro Plan',
      price: '999',
      priceCurrency: 'INR',
      description: 'Unlimited notes per month',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is ClinNote HIPAA-compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ClinNote is built with HIPAA compliance at its core. All data is encrypted in transit (TLS) and at rest (AES-256). We offer Business Associate Agreements (BAA) for healthcare providers. Audio files are not stored after transcription.',
      },
    },
    {
      '@type': 'Question',
      name: 'What therapy note formats does ClinNote support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ClinNote supports SOAP (Subjective, Objective, Assessment, Plan), DAP (Data, Assessment, Plan), BIRP (Behavior, Intervention, Response, Plan), and GIRP (Goal, Intervention, Response, Plan) formats.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to generate a note?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ClinNote generates structured therapy notes in under 2 minutes. Type a brief session summary or use voice dictation, and the AI expands it into a professional clinical note instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit the generated notes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Every generated note is fully editable before saving. ClinNote is designed as a clinician-reviewed tool — the therapist always has final authority over the documentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ClinNote work in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ClinNote is purpose-built for solo therapists and counselors in India, with INR pricing (₹499/month Starter, ₹999/month Pro) and compliance with both HIPAA and India\'s DPDP Act 2023.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a credit card for the free trial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No credit card required. Start your 14-day free trial instantly with just your email address.',
      },
    },
    {
      '@type': 'Question',
      name: 'What session types does ClinNote support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ClinNote supports Individual, Couples, Group, Family, and EMDR therapy session types, each generating clinically appropriate notes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use my own EHR with ClinNote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Notes can be copied, downloaded as PDF, or exported to use with any EHR system including SimplePractice, TherapyNotes, Kareo, and others.',
      },
    },
  ],
};

const features = [
  { icon: Mic, title: 'Voice Dictation', description: 'Speak your session summary directly into the browser. No recordings stored.' },
  { icon: FileText, title: 'SOAP / DAP / BIRP / GIRP', description: 'All major therapy note formats, generated with clinical-grade precision.' },
  { icon: Zap, title: 'Under 2 Minutes', description: 'From session summary to full structured note in under two minutes.' },
  { icon: Shield, title: 'HIPAA-Compliant', description: 'End-to-end encryption, BAA available, no audio stored after transcription.' },
  { icon: Clock, title: 'Save 2 hrs/day', description: 'Therapists save an average of 2+ hours daily on documentation.' },
  { icon: Download, title: 'PDF Export', description: 'Download any note as a formatted PDF for your records or EHR.' },
];

const testimonials = [
  {
    name: 'Dr. Priya Mehta',
    credential: 'Psychologist, Mumbai',
    quote: 'ClinNote has completely transformed my documentation workflow. I went from 3 hours of notes per day to under 30 minutes. The SOAP notes are clinically accurate every time.',
    rating: 5,
  },
  {
    name: 'Arjun Sharma',
    credential: 'LCSW, Bangalore',
    quote: 'As a solo practitioner, I was drowning in paperwork. ClinNote\'s AI understands clinical language — the notes actually sound like me. It\'s like having a documentation assistant.',
    rating: 5,
  },
  {
    name: 'Sunita Rao',
    credential: 'Licensed Counselor, Delhi',
    quote: 'I was skeptical about AI for clinical notes, but ClinNote always includes the safety assessment section I need. The notes are HIPAA-compliant and always editable before saving.',
    rating: 5,
  },
];

const faqs = faqSchema.mainEntity;

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="ClinNote – AI Therapy Note Generator for Therapists | SOAP, DAP, BIRP Notes"
        description="ClinNote generates SOAP, DAP, BIRP therapy notes from voice or text in under 2 minutes. HIPAA-compliant AI documentation for therapists and counselors. Free 14-day trial."
        canonical="/"
        jsonLd={[organizationSchema, softwareSchema, faqSchema]}
      />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#F0FAF6] via-white to-white pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,122,95,0.08),transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#F0FAF6] border border-[#0E7A5F]/20 rounded-full px-4 py-1.5 text-sm text-[#0E7A5F] font-medium mb-6">
                <Shield className="w-3.5 h-3.5" />
                HIPAA-Compliant &middot; 14-Day Free Trial
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-[#1A1A2E] leading-tight mb-6">
                AI Therapy Notes in{' '}
                <span className="text-[#0E7A5F]">Under 2 Minutes</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-2xl mx-auto">
                ClinNote converts your session summaries or voice notes into professional SOAP, DAP, BIRP, and GIRP therapy notes. Always editable. Always clinician-reviewed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-[#0E7A5F] text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-[#0a6550] transition-all shadow-lg shadow-[#0E7A5F]/25 hover:shadow-xl hover:shadow-[#0E7A5F]/30 hover:-translate-y-0.5"
                >
                  Start Free 14-Day Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/soap-note-generator"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1A1A2E] font-semibold px-8 py-4 rounded-xl text-base border border-gray-200 hover:border-[#0E7A5F] hover:text-[#0E7A5F] transition-all"
                >
                  See Note Formats
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-4">No credit card required &middot; Cancel anytime</p>
            </div>

            <div className="mt-16 relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">ClinNote Dashboard — Note Generator</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="p-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Session Summary (Input)</p>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 leading-relaxed">
                      Client presented anxious, discussed work stress and conflict with manager. Explored CBT reframing techniques. Client practiced thought records. Safety: no SI/HI. Next: continue CBT for GAD.
                    </div>
                    <div className="flex gap-2 mt-4">
                      <span className="bg-[#F0FAF6] text-[#0E7A5F] text-xs font-medium px-2.5 py-1 rounded-full">SOAP Format</span>
                      <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full">Individual</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Generated SOAP Note (Output)</p>
                    <div className="text-sm text-[#1A1A2E] leading-relaxed space-y-2">
                      <div><span className="font-bold text-[#0E7A5F]">S:</span> <span className="text-gray-600">Client presented with elevated anxiety, reporting significant occupational stressors including interpersonal conflict with supervisor...</span></div>
                      <div><span className="font-bold text-[#0E7A5F]">O:</span> <span className="text-gray-600">Client appeared anxious with tense affect. Speech was rapid. Mood rated 4/10...</span></div>
                      <div><span className="font-bold text-[#0E7A5F]">A:</span> <span className="text-gray-600">Consistent with GAD presentation. Progress toward cognitive restructuring goal noted...</span></div>
                      <div><span className="font-bold text-[#0E7A5F]">P:</span> <span className="text-gray-600">Continue CBT. Thought record homework assigned. Follow-up in one week...</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-[#0E7A5F] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-white text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-[#F0FAF6]" />)}
                </div>
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="text-sm text-[#a7dece]">Average rating</p>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block" />
              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-[#a7dece]" />
                </div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-[#a7dece]">Therapists trust ClinNote</p>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block" />
              <div>
                <p className="text-2xl font-bold">2 hrs</p>
                <p className="text-sm text-[#a7dece]">Saved per day on average</p>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block" />
              <div>
                <p className="text-2xl font-bold">10,000+</p>
                <p className="text-sm text-[#a7dece]">Notes generated</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#1A1A2E] mb-4">How ClinNote Works</h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">Three simple steps from session to structured note.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-[#0E7A5F]/20" />
              {[
                { step: '01', icon: Mic, title: 'Record or Type', desc: 'Speak a quick session summary using voice dictation, type a brief recap, or upload a session audio file.' },
                { step: '02', icon: Brain, title: 'AI Generates Note', desc: 'GPT-4o expands your summary into a structured, professional therapy note in your chosen format.' },
                { step: '03', icon: CheckCircle, title: 'Edit & Save', desc: 'Review the generated note, make any edits, then save it securely to your encrypted notes library.' },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="text-center relative">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 bg-[#F0FAF6] rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-[#0E7A5F]/20">
                      <Icon className="w-8 h-8 text-[#0E7A5F]" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-[#0E7A5F] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {step.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-[#F0FAF6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#1A1A2E] mb-4">Everything You Need for Clinical Documentation</h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">Built specifically for solo therapists and mental health practitioners.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ icon: Icon, title, description }) => (
                <article key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0E7A5F]/30 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-[#F0FAF6] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0E7A5F] transition-colors">
                    <Icon className="w-6 h-6 text-[#0E7A5F] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 bg-white" id="pricing">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#1A1A2E] mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-500">Start with a 14-day free trial. No credit card needed.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#0E7A5F]/30 transition-all">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Starter</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-[#1A1A2E]">₹499</span>
                  <span className="text-gray-400 mb-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Perfect for therapists building their practice.</p>
                <ul className="space-y-3 mb-8">
                  {['40 notes per month', 'SOAP, DAP, BIRP, GIRP formats', 'Voice dictation', 'PDF export', 'Email support'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#0E7A5F] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="block text-center bg-gray-100 text-[#1A1A2E] font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                  Start Free Trial
                </Link>
              </div>

              <div className="bg-[#0E7A5F] border-2 border-[#0E7A5F] rounded-2xl p-8 relative shadow-xl shadow-[#0E7A5F]/20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E8A838] text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <p className="text-sm font-semibold text-[#a7dece] uppercase tracking-wide mb-2">Pro</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">₹999</span>
                  <span className="text-[#a7dece] mb-2">/month</span>
                </div>
                <p className="text-sm text-[#a7dece] mb-6">For established therapists with high note volume.</p>
                <ul className="space-y-3 mb-8">
                  {['Unlimited notes', 'All Starter features', 'Audio file upload & transcription', 'Custom note instructions', 'ZIP export of all notes', 'Priority support', 'BAA available'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-[#a7dece] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="block text-center bg-white text-[#0E7A5F] font-bold py-3 rounded-xl hover:bg-[#F0FAF6] transition-colors">
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-[#F0FAF6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#1A1A2E] mb-4">Loved by Therapists Across India</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(({ name, credential, quote, rating }) => (
                <blockquote key={name} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-[#E8A838]" />)}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-5 text-sm">"{quote}"</p>
                  <footer>
                    <p className="font-bold text-[#1A1A2E] text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">{credential}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#1A1A2E] mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.name} answer={faq.acceptedAnswer.text} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-[#0E7A5F]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">Start your free 14-day trial</h2>
            <p className="text-[#a7dece] text-lg mb-8">No credit card needed. Cancel anytime. Join 500+ therapists saving hours every week.</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-[#0E7A5F] font-bold px-10 py-4 rounded-xl text-lg hover:bg-[#F0FAF6] transition-all shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1A1A2E] text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
