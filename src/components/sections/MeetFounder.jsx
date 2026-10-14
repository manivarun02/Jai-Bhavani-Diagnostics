import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { FOUNDER_NAME, FOUNDER_TITLE, FOUNDER_HOSPITAL, FOUNDER_EXPERIENCE, FOUNDER_INITIALS, FOUNDER_BIO } from '../../config/about';
import { callLink, whatsappLink, handleCallAction } from '../../utils/contactLinks';

const badges = [
  `${FOUNDER_EXPERIENCE} Years Experience`,
  'Osmania Hospital Trained',
  'Same-Day Reports Available',
];

export default function MeetFounder() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Avatar column */}
            <div className="flex items-center justify-center md:w-72 bg-gradient-to-br from-orange-50 to-red-50 py-12 px-8">
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-lg"
                style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)' }}
              >
                {FOUNDER_INITIALS}
              </div>
            </div>

            {/* Details column */}
            <div className="flex-1 p-8 md:p-10">
              <p className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-2">Meet the Founder</p>
              <h2 className="text-2xl md:text-3xl font-black text-[#0b1f3a] mb-1">{FOUNDER_NAME}</h2>
              <p className="text-gray-500 font-medium mb-1">{FOUNDER_TITLE}</p>
              <p className="text-sm text-gray-400 mb-5">Trained at {FOUNDER_HOSPITAL}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {badges.map(b => (
                  <span key={b} className="bg-[#0b1f3a] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">{FOUNDER_BIO}</p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappLink(`Hello ${FOUNDER_NAME}, I'd like to know more about Jai Bhavani Diagnostics.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle size={16} /> Talk on WhatsApp
                </a>
                <a
                  href={callLink}
                  onClick={handleCallAction}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
