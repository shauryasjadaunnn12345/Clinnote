import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const plans = [
  {
    name: 'Free Trial',
    price: '₹0',
    period: '14 days',
    description: 'Explore everything ClinNote offers, no commitment.',
    features: ['All note formats (SOAP, DAP, BIRP, GIRP)', 'All session types', 'Voice dictation', 'PDF export', 'Full note editing'],
    cta: 'Start Free Trial',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '₹499',
    period: '/month',
    description: 'For therapists building their practice.',
    features: ['40 notes per month', 'SOAP, DAP, BIRP, GIRP formats', 'Voice dictation', 'PDF export', 'Email support', 'Secure note storage'],
    cta: 'Get Starter',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹999',
    period: '/month',
    description: 'For established therapists with high note volume.',
    features: ['Unlimited notes', 'All Starter features', 'Audio file upload & transcription', 'Custom note instructions', 'ZIP export of all notes', 'Priority email support', 'BAA available on request'],
    cta: 'Get Pro',
    href: '/signup',
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <>
      <SEOHead
        title="Pricing — ClinNote AI Therapy Note Generator | ₹499/month"
        description="ClinNote pricing: Free 14-day trial, then Starter at ₹499/month (40 notes) or Pro at ₹999/month (unlimited notes). HIPAA-compliant AI therapy note generator."
        canonical="/pricing"
      />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-[#F0FAF6] to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold text-[#1A1A2E] mb-4">Simple, Honest Pricing</h1>
            <p className="text-xl text-gray-500 mb-3">Start with a 14-day free trial. No credit card needed.</p>
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4 text-[#0E7A5F]" />
              All plans include HIPAA-compliant storage and encryption
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map(plan => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-7 flex flex-col relative ${
                    plan.highlight
                      ? 'bg-[#0E7A5F] text-white shadow-xl shadow-[#0E7A5F]/20 border-2 border-[#0E7A5F]'
                      : 'bg-white border-2 border-gray-100 hover:border-[#0E7A5F]/30 transition-all'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E8A838] text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="mb-5">
                    <p className={`text-sm font-semibold uppercase tracking-wide mb-2 ${plan.highlight ? 'text-[#a7dece]' : 'text-gray-400'}`}>{plan.name}</p>
                    <div className="flex items-end gap-1 mb-1">
                      <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-[#1A1A2E]'}`}>{plan.price}</span>
                      <span className={`mb-1 text-sm ${plan.highlight ? 'text-[#a7dece]' : 'text-gray-400'}`}>{plan.period}</span>
                    </div>
                    <p className={`text-sm ${plan.highlight ? 'text-[#a7dece]' : 'text-gray-500'}`}>{plan.description}</p>
                  </div>

                  <ul className="flex-1 space-y-3 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? 'text-white' : 'text-gray-600'}`}>
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-[#a7dece]' : 'text-[#0E7A5F]'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.href}
                    className={`block text-center font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-white text-[#0E7A5F] hover:bg-[#F0FAF6]'
                        : 'bg-[#0E7A5F] text-white hover:bg-[#0a6550]'
                    }`}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-[#F0FAF6] rounded-2xl p-6 text-center">
              <h3 className="font-bold text-[#1A1A2E] mb-2">All plans include</h3>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-3">
                {['HIPAA-compliant storage', 'AES-256 encryption', 'No credit card for trial', 'Cancel anytime', 'DPDP Act 2023 compliant'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-sm text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0E7A5F]" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
