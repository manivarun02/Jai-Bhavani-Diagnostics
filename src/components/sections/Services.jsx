import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Home, Zap, HeartHandshake } from 'lucide-react';

const cards = [
  { icon: FlaskConical,  title: 'Diagnostic Testing',      desc: 'Complete blood, urine, thyroid, liver, kidney and health-related tests with accurate, reliable results.' },
  { icon: Home,          title: 'Fast Sample Collection',   desc: 'Convenient sample collection at centre, or home collection on request. Contact us to arrange.' },
  { icon: Zap,           title: 'Same-Day Reports',         desc: 'Get your test results the same day for eligible tests. No more unnecessary waiting.' },
  { icon: HeartHandshake,title: 'Patient Support',          desc: 'Friendly guidance on what tests you need, how to prepare, and understanding your results.' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">Services</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a]">Everything you need under one roof</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 bg-white rounded-2xl border border-gray-100 shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-[#0b1f3a] text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
