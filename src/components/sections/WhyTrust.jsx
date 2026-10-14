import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Award, ShieldCheck, ClipboardCheck, Timer, MessageCircle } from 'lucide-react';

const cards = [
  { icon: BadgeCheck,    title: 'Affordable for Everyone',    desc: 'Honest, transparent prices with no hidden charges. Quality testing for every budget.' },
  { icon: Award,         title: 'Experienced MLT Specialist', desc: 'Tests supervised by a Medical Laboratory Technology professional with 10+ years of experience.' },
  { icon: ShieldCheck,   title: 'Hygienic Sample Handling',   desc: 'Strict hygiene and safety protocols at every step, from collection to reporting.' },
  { icon: ClipboardCheck,title: 'Accurate Reports',           desc: 'Reliable, precise results you can take to your doctor with confidence.' },
  { icon: Timer,         title: 'Quick Turnaround',           desc: 'Same-day reports available for eligible tests. Your time matters to us.' },
  { icon: MessageCircle, title: 'Friendly Guidance',          desc: 'Unsure which test you need? We\'ll guide you. Just WhatsApp or call us.' },
];

export default function WhyTrust() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a]">Why families trust Jai Bhavani</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1f3a] text-base mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
