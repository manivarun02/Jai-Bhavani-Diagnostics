import React, { useState } from 'react';
import { Plus, X, Phone, MessageCircle } from 'lucide-react';
import { callLink, whatsappLink, smsLink, handleCallAction, handleSmsAction } from '../utils/contactLinks';

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const actions = [
    {
      label: 'WhatsApp',
      href: whatsappLink(),
      newTab: true,
      bg: 'bg-[#25D366]',
      icon: MessageCircle,
      onClick: () => setOpen(false)
    },
    {
      label: 'Call',
      href: callLink,
      newTab: false,
      bg: 'bg-gradient-to-r from-orange-500 to-red-600',
      icon: Phone,
      onClick: (e) => {
        setOpen(false);
        handleCallAction(e);
      }
    },
    {
      label: 'Message',
      href: smsLink(),
      newTab: false,
      bg: 'bg-gray-600',
      icon: MessageCircle,
      onClick: (e) => {
        setOpen(false);
        handleSmsAction(e);
      }
    },
  ];
  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {open && (
        <div className="flex flex-col items-end gap-2">
          {actions.map(({ label, href, newTab, bg, icon: Icon, onClick }) => (
            <a
              key={label}
              href={href}
              target={newTab ? '_blank' : undefined}
              rel={newTab ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-2 ${bg} text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer`}
              onClick={onClick}
            >
              <Icon size={16}/> {label}
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white flex items-center justify-center shadow-2xl hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-200"
      >
        {open ? <X size={22}/> : <Plus size={22}/>}
      </button>
    </div>
  );
}
