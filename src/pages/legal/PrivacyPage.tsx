import SEOHead from '../../components/seo/SEOHead';

export default function PrivacyPage() {
  return (
    <>
      <SEOHead title="Privacy Policy — ClinNote" description="ClinNote Privacy Policy — HIPAA and DPDP Act 2023 compliant." canonical="/privacy" />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-[#1A1A2E] mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: January 1, 2025</p>

          <div className="prose prose-sm max-w-none space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Introduction</h2>
              <p>ClinNote Technologies Pvt. Ltd. (&quot;ClinNote&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates clinnote.in and the ClinNote application. This Privacy Policy describes how we collect, use, and protect your information when you use our service.</p>
              <p className="mt-3">ClinNote is designed for healthcare professionals and is built to comply with HIPAA (Health Insurance Portability and Accountability Act) in the United States and India&apos;s Digital Personal Data Protection Act (DPDP Act) 2023.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Data We Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account information:</strong> Your email address, name, and professional credentials provided during registration.</li>
                <li><strong>Clinical notes:</strong> Session summaries and generated notes you create and save on the platform. These are encrypted at rest.</li>
                <li><strong>Audio data:</strong> If you upload audio files for transcription, these are processed and immediately deleted after transcription. We do not store audio recordings.</li>
                <li><strong>Usage data:</strong> Anonymized usage statistics to improve the service (e.g., note format preferences, feature usage).</li>
                <li><strong>Payment information:</strong> Billing information processed securely by Stripe. We do not store payment card numbers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. How We Use Your Data</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve the ClinNote service.</li>
                <li>To generate AI-powered clinical notes using your session summaries.</li>
                <li>To send service-related communications (trial expiry, billing).</li>
                <li>To comply with legal obligations.</li>
              </ul>
              <p className="mt-3"><strong>We never sell your data to third parties.</strong> We do not use your clinical notes to train AI models.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Data Security</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Encryption in transit:</strong> All data is transmitted using TLS 1.3.</li>
                <li><strong>Encryption at rest:</strong> All stored data is encrypted using AES-256.</li>
                <li><strong>Audio files:</strong> Not retained after transcription is complete.</li>
                <li><strong>Access controls:</strong> Row-level security ensures each user can only access their own data.</li>
                <li><strong>BAA:</strong> Business Associate Agreements are available for HIPAA-covered entities on request.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. DPDP Act 2023 Compliance (India)</h2>
              <p>For users in India, ClinNote complies with the Digital Personal Data Protection Act 2023. You have the right to access, correct, and erase your personal data. You may submit data requests to support@clinnote.in. We process personal data only for specified, explicit, and legitimate purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Your Rights</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data.</li>
                <li><strong>Correction:</strong> Update inaccurate information through your profile settings.</li>
                <li><strong>Deletion:</strong> Delete your account and all associated data from Settings → Delete Account.</li>
                <li><strong>Export:</strong> Download all your notes from Settings → Download All Notes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">7. Third-Party Services</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Supabase:</strong> Database and authentication provider.</li>
                <li><strong>OpenAI:</strong> AI model provider. Session summaries are sent to OpenAI&apos;s API for note generation. OpenAI&apos;s API terms prohibit using API data for training.</li>
                <li><strong>Stripe:</strong> Payment processing.</li>
                <li><strong>Resend:</strong> Transactional email delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">8. Contact</h2>
              <p>For privacy inquiries or data requests: <a href="mailto:privacy@clinnote.in" className="text-[#0E7A5F] hover:underline">privacy@clinnote.in</a></p>
              <p className="mt-2">ClinNote Technologies Pvt. Ltd., India</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
