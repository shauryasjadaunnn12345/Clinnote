import SEOHead from '../../components/seo/SEOHead';

export default function TermsPage() {
  return (
    <>
      <SEOHead title="Terms of Service — ClinNote" description="ClinNote Terms of Service for therapists and mental health professionals." canonical="/terms" />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-[#1A1A2E] mb-2">Terms of Service</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: January 1, 2025</p>

          <div className="space-y-8 text-gray-600 leading-relaxed text-sm">
            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Acceptance of Terms</h2>
              <p>By creating an account and using ClinNote, you agree to these Terms of Service. If you do not agree, do not use the service. These terms constitute a legally binding agreement between you and ClinNote Technologies Pvt. Ltd.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Service Description</h2>
              <p>ClinNote provides an AI-assisted clinical note generation service for licensed mental health professionals. The service uses artificial intelligence to assist in documentation and does not provide medical or clinical advice.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. Clinical Responsibility</h2>
              <p className="font-semibold text-[#1A1A2E]">ClinNote is a documentation assistance tool, not a replacement for clinical judgment.</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>All generated notes must be reviewed, edited as necessary, and approved by the licensed clinician before use in any official clinical record.</li>
                <li>You are solely responsible for the accuracy, completeness, and appropriateness of any notes saved or used in clinical practice.</li>
                <li>ClinNote does not provide clinical diagnosis, treatment recommendations, or clinical advice.</li>
                <li>You must hold the appropriate license to practice in your jurisdiction.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Subscription and Billing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>ClinNote offers a 14-day free trial with no credit card required.</li>
                <li>After the trial, you may subscribe to the Starter (₹499/month, 40 notes) or Pro (₹999/month, unlimited notes) plan.</li>
                <li>Subscriptions are billed monthly. You may cancel at any time.</li>
                <li>No refunds are provided for partial months.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Use ClinNote to document fabricated clinical encounters.</li>
                <li>Share your account credentials with others.</li>
                <li>Attempt to reverse engineer the AI models or circumvent usage limits.</li>
                <li>Use the service for any illegal purpose.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Data Ownership</h2>
              <p>You own your clinical notes. ClinNote does not claim ownership of any content you create on the platform. You may export and delete your data at any time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">7. Limitation of Liability</h2>
              <p>ClinNote is provided &quot;as is.&quot; To the fullest extent permitted by law, ClinNote Technologies Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount paid by you in the 3 months preceding the claim.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">8. Governing Law</h2>
              <p>These terms are governed by the laws of India. Disputes shall be resolved in the courts of Bangalore, Karnataka, India.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">9. Contact</h2>
              <p>Legal inquiries: <a href="mailto:legal@clinnote.in" className="text-[#0E7A5F] hover:underline">legal@clinnote.in</a></p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
