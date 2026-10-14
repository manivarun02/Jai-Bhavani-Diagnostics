import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink, smsLink, handleSmsAction, isMobile } from '../../utils/contactLinks';

const SERVICES = ['Blood Test','Sample Collection','Same-Day Report','Health Checkup','Other'];

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Please enter a valid 10-digit phone number.';
    return e;
  };

  // Only include Message line if the user actually typed something
  const buildMsg = () => {
    let msg = `Hello Jai Bhavani Diagnostics,\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service || 'Not specified'}`;
    if (form.message.trim()) msg += `\nMessage: ${form.message.trim()}`;
    return msg;
  };

  const handleAction = (action) => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    const msg = buildMsg();
    if (action === 'whatsapp') {
      window.open(whatsappLink(msg), '_blank', 'noopener');
    } else {
      if (isMobile()) {
        window.location.href = smsLink(msg);
      } else {
        handleSmsAction(null, msg);
      }
    }
  };

  const set = (k) => (ev) => setForm(f => ({ ...f, [k]: ev.target.value }));

  const inputCls = (k) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
      errors[k] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
    }`;

  return (
    <section id="enquiry" className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a]">Quick Enquiry</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-4">
          <div>
            <input value={form.name} onChange={set('name')} placeholder="Your Name *" className={inputCls('name')} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input value={form.phone} onChange={set('phone')} placeholder="Phone Number * (10 digits)" className={inputCls('phone')} type="tel" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <select value={form.service} onChange={set('service')} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 text-gray-700">
            <option value="">Select a Service</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea
            value={form.message}
            onChange={set('message')}
            placeholder="Message (optional)"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 resize-none"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => handleAction('whatsapp')}
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
              <MessageCircle size={16}/> Send on WhatsApp
            </button>
            <button onClick={() => handleAction('sms')}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:border-gray-400 transition-all">
              Send as Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
