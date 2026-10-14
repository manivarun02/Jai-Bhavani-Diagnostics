import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TESTS } from '../../data/tests';

const POPULAR_IDS = [1, 2, 14, 23, 29, 30]; // Sugar Test, Thyroid TSH, ECG, HbA1c, Vitamin D, B12
const popular = TESTS.filter(t => POPULAR_IDS.includes(t.id));

export default function PopularTests() {
  const scrollToTests = () => {
    document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">Most Booked</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a]">Popular Tests</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popular.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 shadow p-6 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div>
                <h3 className="font-bold text-[#0b1f3a] text-base mb-1">{t.name}</h3>
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">₹{t.price}</p>
              </div>
              <button
                onClick={scrollToTests}
                className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:gap-2 transition-all"
              >
                Add to Booking <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
