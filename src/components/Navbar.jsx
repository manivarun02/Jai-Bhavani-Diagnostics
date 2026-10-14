import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY } from '../config/contact';
import { callLink, whatsappLink, smsLink, handleSmsAction, handleCallAction } from '../utils/contactLinks';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home',         href: '#top' },
    { label: 'About',        href: '#about' },
    { label: 'Tests & Prices', href: '#tests' },
    { label: 'Services',     href: '#services' },
    { label: 'Contact',      href: '#contact' },
  ];

  return (
    <nav
      id="top"
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#top" className="font-extrabold text-lg text-[#0b1f3a] tracking-wide hover:text-orange-600 transition-colors">
            JAI BHAVANI DIAGNOSTICS
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#0b1f3a] border-b-2 border-transparent hover:border-orange-500 transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={callLink}
              onClick={handleCallAction}
              className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Phone size={14} /> Call Now
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-1">
          {navLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-gray-700 font-medium border-b border-gray-50 hover:text-orange-600 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3">
            <a href={callLink}
              onClick={handleCallAction}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold text-sm">
              <Phone size={15}/> Call {PHONE_DISPLAY}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm">
              <MessageCircle size={15}/> WhatsApp Us
            </a>
            <a href={smsLink()}
              onClick={(e) => handleSmsAction(e)}
              className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm cursor-pointer">
              Send a Message
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
