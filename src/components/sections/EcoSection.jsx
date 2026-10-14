import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Smartphone, TreePine, Recycle, Globe, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../utils/contactLinks';

const tips = [
  {
    icon: Smartphone,
    title: 'Get Your Report on WhatsApp',
    desc: 'We send your lab report directly to your WhatsApp. No paper, no printing, no waste.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Leaf,
    title: 'Go Paperless, Save Trees',
    desc: 'Every digital report saves paper. One tree produces around 8,000 sheets — choose digital every time.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Recycle,
    title: 'Reduce Medical Waste',
    desc: 'Digital reports mean less printing chemicals, less ink, and less paper waste in landfills.',
    color: 'from-teal-500 to-green-600',
  },
  {
    icon: Globe,
    title: 'Small Action, Big Impact',
    desc: 'If 1,000 patients go digital each year, we save thousands of printed pages. Together, we protect our planet.',
    color: 'from-green-600 to-emerald-700',
  },
];

export default function EcoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-y border-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <TreePine size={16} /> Eco-Friendly Initiative
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-green-900 mb-4">
            Get Your Report on WhatsApp.<br />
            <span className="text-emerald-600">Save Nature. Save Paper.</span>
          </h2>
          <p className="text-green-700 text-lg max-w-2xl mx-auto leading-relaxed">
            At Jai Bhavani Diagnostics, we believe caring for your health and caring for the planet go hand in hand.
            Request your lab report digitally — it's faster, easier, and eco-friendly.
          </p>
        </motion.div>

        {/* 4 tip cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {tips.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-green-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 mb-4 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-green-900 text-base mb-2">{title}</h3>
              <p className="text-green-700 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-block bg-white rounded-2xl border border-green-200 shadow-lg px-8 py-6 max-w-lg">
            <p className="text-green-800 font-bold text-lg mb-1">🌿 Choose Digital. Choose Green.</p>
            <p className="text-green-600 text-sm mb-5">
              After your test, simply ask us to send your report on WhatsApp.
              No extra charge. Instant delivery. Zero paper waste.
            </p>
            <a
              href={whatsappLink("Hello Jai Bhavani Diagnostics, I'd like to receive my report on WhatsApp (eco-friendly / paperless). Please note my number.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageCircle size={17} /> Request WhatsApp Report — Go Paperless
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
