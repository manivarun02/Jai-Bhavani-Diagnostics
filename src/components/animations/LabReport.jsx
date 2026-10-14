import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Report: absolute top=80px left=24px
// Width 162px, occupies y=80 to ~270px from content top
// Microscope starts at y=378px → no overlap ✓

const ROWS = [
  { test: 'Hemoglobin', result: '13.4 g/dL',   high: false },
  { test: 'RBC Count',  result: '4.5 mill/µL',  high: false },
  { test: 'WBC Count',  result: '11,800 /µL',   high: true  },
  { test: 'Platelets',  result: '2.3 lakhs/µL', high: false },
  { test: 'Dengue NS1', result: 'NEGATIVE',      high: false },
];

export default function LabReport({ phase }) {
  return (
    <AnimatePresence>
      {phase === 'report' && (
        <motion.div
          key="report"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45 }}
          className="absolute hidden sm:flex flex-col z-30"
          style={{
            top: 80, left: 24, width: 162,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            padding: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '1px solid #fecaca', paddingBottom: 6, marginBottom: 6 }}>
            <div style={{ fontSize: 9, fontWeight: 900, color: '#b91c1c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Lab Report
            </div>
            <div style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>JAI BHAVANI Diagnostics</div>
          </div>

          {/* Patient */}
          <div style={{ marginBottom: 6 }}>
            {[['Patient','Ravi Kumar'],['Age/Sex','34 / Male'],['Date','27-04-2026'],['Ref','JBD-2604']].map(([k, v], i) => (
              <motion.div key={k}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.3 }}
                style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, marginBottom: 2 }}
              >
                <span style={{ color: '#9ca3af' }}>{k}:</span>
                <span style={{ color: '#111827', fontWeight: 600 }}>{v}</span>
              </motion.div>
            ))}
          </div>

          {/* Results */}
          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, fontWeight: 700, color: '#6b7280', borderBottom: '1px solid #f3f4f6', paddingBottom: 4, marginBottom: 4 }}>
              <span>TEST</span><span>RESULT</span>
            </div>
            {ROWS.map((row, i) => (
              <motion.div key={row.test}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.38, duration: 0.35 }}
                style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, marginBottom: 3 }}
              >
                <span style={{ color: '#6b7280' }}>{row.test}</span>
                <span style={{ fontWeight: 700, color: row.high ? '#dc2626' : '#111827' }}>
                  {row.result}{row.high && <span style={{ fontSize: 6 }}> ↑</span>}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Verified stamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.4 }}
            style={{ borderTop: '1px solid #f3f4f6', marginTop: 6, paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span style={{ fontSize: 6, color: '#d1d5db', fontStyle: 'italic' }}>auto-generated</span>
            <div style={{
              width: 28, height: 28,
              border: '2px solid #dc2626', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(-12deg)',
            }}>
              <span style={{ fontSize: 5.5, fontWeight: 900, color: '#dc2626', textAlign: 'center', lineHeight: 1.1 }}>VERIFIED</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
