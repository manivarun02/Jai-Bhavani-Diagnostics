import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY } from '../../config/contact';
import { callLink, whatsappLink, handleCallAction } from '../../utils/contactLinks';

export default function Footer() {
  const links = [
    { label: 'Home',         href: '#top' },
    { label: 'About',        href: '#about' },
    { label: 'Tests & Prices', href: '#tests' },
    { label: 'Services',     href: '#services' },
    { label: 'Contact',      href: '#contact' },
  ];
  return (
    <footer className="bg-[#0b1f3a] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="font-black text-xl mb-3 tracking-wide">JAI BHAVANI DIAGNOSTICS</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Your health is your family's wealth.<br/>Be safe, keep everyone safe.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white/90 mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {links.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white/90 mb-4">Contact</h4>
            <a href={callLink} onClick={handleCallAction} className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-3 transition-colors cursor-pointer">
              <Phone size={14}/> {PHONE_DISPLAY}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#25D366] hover:text-green-300 text-sm mb-4 transition-colors">
              <MessageCircle size={14}/> WhatsApp Us
            </a>
            <a href={whatsappLink("I'd like to share my experience with Jai Bhavani Diagnostics.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-block text-xs border border-white/30 text-white/60 hover:text-white hover:border-white/60 px-3 py-1.5 rounded-full transition-colors">
              Share your experience
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-white/40 text-xs">
          © 2026 Jai Bhavani Diagnostics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
