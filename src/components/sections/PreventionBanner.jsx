import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { callLink, whatsappLink, smsLink, handleSmsAction, handleCallAction } from '../../utils/contactLinks';

export default function PreventionBanner() {
  const defaultSmsMsg = "Hello Jai Bhavani Diagnostics, I'm interested in regular health checkups. Please call me.";

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Prevention is better than cure.
          </h2>
          <p className="text-white/90 text-xl font-semibold mb-4">Find it and prevent before it's too late.</p>
          <p className="text-white/80 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
            Your health is your family's wealth. Stay safe, keep everyone safe,
            and never skip a scheduled checkup.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <MessageCircle size={18}/> WhatsApp Us
            </a>
            <a href={callLink}
              onClick={handleCallAction}
              className="flex items-center gap-2 bg-white/20 border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all">
              <Phone size={18}/> Call Now
            </a>
            <a href={smsLink(defaultSmsMsg)}
              onClick={(e) => handleSmsAction(e, defaultSmsMsg)}
              className="flex items-center gap-2 bg-white/20 border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all cursor-pointer">
              Send Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
