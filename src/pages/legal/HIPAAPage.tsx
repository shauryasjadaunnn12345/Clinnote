import { Shield, Lock, Database, Eye, FileCheck, AlertTriangle } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const commitments = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Your clinical notes are never stored in plain text.',
  },
  {
    icon: Database,
    title: 'Audio Not Retained',
    description: 'Audio files uploaded for transcription are processed by our secure pipeline and permanently deleted immediately after transcription. No audio recordings are stored on our servers.',
  },
  {
    icon: Eye,
    title: 'No Data Sold',
    description: 'Your patient-related data is never sold, shared with advertisers, or used to train AI models. Your clinical data is yours.',
  },
  {
    icon: FileCheck,
    title: 'BAA Available',
    description: 'ClinNote offers Business Associate Agreements (BAA) to covered entities and business associates under HIPAA. Contact us at hipaa@clinnote.in to request a BAA.',
  },
  {
    icon: Shield,
    title: 'Access Controls',
    description: 'Row-level security ensures each clinician can only access their own data. We use Supabase\'s enterprise-grade security infrastructure with multi-factor authentication support.',
  },
  {
    icon: AlertTriangle,
    title: 'Minimum Necessary Standard',
    description: 'We apply HIPAA\'s minimum necessary standard — only the session summary you provide is sent to the AI model. Full patient records are never required or requested.',
  },
];

export default function HIPAAPage() {
  return (
    <>
      <SEOHead
        title="Our HIPAA Commitment — ClinNote HIPAA-Compliant AI Note Generator"
        description="ClinNote is built with HIPAA compliance at its core. Learn about our encryption standards, data practices, BAA availability, and security commitments."
        canonical="/hipaa"
      />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-[#F0FAF6] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Shield className="w-8 h-8 text-[#0E7A5F]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#1A1A2E] mb-4">Our HIPAA Commitment</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              ClinNote is designed from the ground up for healthcare professionals. Security and compliance are not afterthoughts — they are core to our architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {commitments.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#0E7A5F]/30 transition-all">
                <div className="w-10 h-10 bg-[#F0FAF6] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0E7A5F]" />
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#F0FAF6] border border-[#0E7A5F]/20 rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">HIPAA Disclaimer</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              ClinNote is designed to help covered entities and business associates comply with HIPAA requirements for clinical documentation. However, compliance with HIPAA is a shared responsibility.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              As a clinician using ClinNote, you are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li>Using de-identified or minimally necessary patient information in session summaries.</li>
              <li>Reviewing all generated notes before saving to your clinical record.</li>
              <li>Maintaining a signed BAA with ClinNote if you are a covered entity.</li>
              <li>Ensuring your use of ClinNote complies with your organization&apos;s HIPAA policies.</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">DPDP Act 2023 (India)</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              For practitioners in India, ClinNote complies with the Digital Personal Data Protection Act (DPDP) 2023. We process personal data only for specified and lawful purposes, with your consent. You have the right to access, correct, and erase your personal data at any time.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              For compliance inquiries or to request a BAA, contact us at{' '}
              <a href="mailto:hipaa@clinnote.in" className="text-[#0E7A5F] hover:underline">hipaa@clinnote.in</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
