import { Link } from 'react-router-dom';
import { Brain, Shield, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0E7A5F] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">ClinNote</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              AI-powered clinical note generator for solo mental health therapists, counselors, and psychologists.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield className="w-3.5 h-3.5 text-[#0E7A5F]" />
              <span>HIPAA-Compliant Platform</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Note Formats</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/soap-note-generator" className="hover:text-[#0E7A5F] transition-colors">SOAP Note Generator</Link></li>
              <li><Link to="/dap-notes-therapist" className="hover:text-[#0E7A5F] transition-colors">DAP Note Generator</Link></li>
              <li><Link to="/emdr-therapy-notes" className="hover:text-[#0E7A5F] transition-colors">EMDR Therapy Notes</Link></li>
              <li><Link to="/ai-notes-for-counselors" className="hover:text-[#0E7A5F] transition-colors">Notes for Counselors</Link></li>
              <li><Link to="/free-soap-note-templates" className="hover:text-[#0E7A5F] transition-colors">Free Templates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/pricing" className="hover:text-[#0E7A5F] transition-colors">Pricing</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#0E7A5F] transition-colors">Dashboard</Link></li>
              <li><Link to="/signup" className="hover:text-[#0E7A5F] transition-colors">Free Trial</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Legal & Trust</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/hipaa" className="hover:text-[#0E7A5F] transition-colors">HIPAA Commitment</Link></li>
              <li><Link to="/privacy" className="hover:text-[#0E7A5F] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#0E7A5F] transition-colors">Terms of Service</Link></li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-[#0E7A5F]" />
              <a href="mailto:support@clinnote.in" className="hover:text-[#0E7A5F] transition-colors">support@clinnote.in</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ClinNote Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built for therapists in India &amp; globally &mdash; Compliant with HIPAA &amp; DPDP Act 2023
          </p>
        </div>
      </div>
    </footer>
  );
}
