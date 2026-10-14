import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const chips = [
  'Affordable for everyone',
  'Timely scheduled checkups',
  'Accurate and trusted results',
];

export default function OurPromise() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">Our Promise</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a] mb-6 leading-tight">
            Your health is your family's wealth.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Jai Bhavani Diagnostics was started with one belief: quality testing should be affordable
            for every family, so that regular, timely health checkups are never postponed.
            Be safe, keep your loved ones safe.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {chips.map(c => (
              <span
                key={c}
                className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold"
              >
                <CheckCircle size={15} /> {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
