import React from 'react';
import { Phone, MessageCircle, Zap, Clock } from 'lucide-react';
import { PHONE_DISPLAY } from '../../config/contact';
import { callLink, whatsappLink, handleCallAction } from '../../utils/contactLinks';

const items = [
  { icon: Phone,          label: `Call ${PHONE_DISPLAY}`,   href: callLink,       action: true, onClick: handleCallAction },
  { icon: MessageCircle,  label: 'WhatsApp Quick Enquiry',   href: whatsappLink(), action: true, newTab: true },
  { icon: Zap,            label: 'Fast Sample Collection',   href: '#collection',  action: false },
  { icon: Clock,          label: 'Same-Day Reports',         href: '#tests',       action: false },
];

export default function TrustStrip() {
  return (
    <div className="bg-[#0b1f3a]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map(({ icon: Icon, label, href, newTab, onClick }) => (
          <a
            key={label}
            href={href}
            onClick={onClick}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-center gap-2.5 py-4 px-4 text-white text-sm font-medium hover:bg-[#122a4f] transition-colors border-b md:border-b-0 border-white/10 md:border-r last:border-r-0 cursor-pointer"
          >
            <Icon size={17} className="opacity-80 flex-shrink-0" />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
