import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Droplets, FileText, ArrowRight } from 'lucide-react';
import { whatsappLink } from '../../utils/contactLinks';

const steps = [
  { icon: CalendarCheck, title: 'Book via WhatsApp or Call', desc: 'Tell us the test you need and your preferred timing. We confirm within minutes.' },
  { icon: Droplets,      title: 'Quick Sample Collection',   desc: 'Visit our centre for a comfortable, hygienic sample collection. Home collection available on request.' },
  { icon: FileText,      title: 'Receive Your Report',       desc: 'Get your report same-day (for eligible tests) or as scheduled. No more unnecessary waiting.' },
];

export default function SampleCollection() {
  return (
    <section id="collection" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a]">Fast, comfortable sample collection</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Icon size={26} className="text-white" />
              </div>
              <div className="w-7 h-7 mx-auto mb-3 rounded-full bg-[#0b1f3a] text-white text-sm font-bold flex items-center justify-center">{i+1}</div>
              <h3 className="font-bold text-[#0b1f3a] text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={whatsappLink("I'd like to book a sample collection.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Book Sample Collection <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
