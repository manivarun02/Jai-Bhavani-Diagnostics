import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Copy, Check, X, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '../config/contact';
import { whatsappLink } from '../utils/contactLinks';

export default function ContactToast() {
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setCopied(false);
      setToast(e.detail || { type: 'sms' });
    };
    window.addEventListener('contact-toast', handler);
    return () => window.removeEventListener('contact-toast', handler);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 7000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(PHONE_DISPLAY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
    });
  };

  const isSms = toast.type === 'sms';

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto bg-[#0b1f3a] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
      style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}
    >
      <div className="flex items-center gap-2.5 flex-1">
        <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
          {isSms ? <MessageSquare size={18} /> : <Phone size={18} />}
        </div>
        <div className="text-left text-xs sm:text-sm">
          <p className="font-bold text-white">
            {isSms ? 'SMS Messaging on Desktop' : 'Call Jai Bhavani Diagnostics'}
          </p>
          <p className="text-white/70 text-xs mt-0.5">
            {isSms
              ? 'SMS opens directly on mobile phones. On PC, copy our number or chat on WhatsApp:'
              : 'Direct calling opens on mobile. On PC, dial our number:'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-1 sm:pt-0">
        <button
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all"
        >
          {copied ? <><Check size={14} className="text-green-400" /> Copied!</> : <><Copy size={14} /> {PHONE_DISPLAY}</>}
        </button>

        {isSms && (
          <a
            href={whatsappLink(toast.msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#25D366] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        )}

        <button
          onClick={() => setToast(null)}
          className="text-white/40 hover:text-white p-1 text-base leading-none"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
