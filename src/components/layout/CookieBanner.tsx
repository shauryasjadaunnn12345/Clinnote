import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('cookie-consent') === 'true';
  });

  if (dismissed) return null;

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-[#F0FAF6] rounded-lg flex items-center justify-center">
          <Cookie className="w-4 h-4 text-[#0E7A5F]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1A1A2E] mb-1">We use cookies</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            We use essential cookies for authentication and analytics. No clinical data is stored in cookies. See our{' '}
            <Link to="/privacy" className="text-[#0E7A5F] underline">Privacy Policy</Link>.
          </p>
          <div className="flex gap-2 mt-3">
            <button onClick={accept} className="text-xs bg-[#0E7A5F] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#0a6550] transition-colors">
              Accept
            </button>
            <button onClick={accept} className="text-xs text-gray-500 hover:text-gray-700 transition-colors px-2">
              Decline non-essential
            </button>
          </div>
        </div>
        <button onClick={accept} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
