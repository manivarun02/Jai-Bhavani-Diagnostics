import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, MessageCircle, Navigation, Truck, Copy, Check } from 'lucide-react';
import { ADDRESS, OPENING_HOURS, MAPS_LINK, PHONE_DISPLAY, PHONE_TEL } from '../../config/contact';
import { callLink, whatsappLink, smsLink, handleCallAction, handleSmsAction } from '../../utils/contactLinks';

export default function ContactSection() {
  const contactMsg = "Hello Jai Bhavani Diagnostics, I'd like to enquire about tests.";

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">Find Us</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a]">Visit Jai Bhavani Diagnostics</h2>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-5">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#0b1f3a] mb-0.5">Address</p>
              <p className="text-gray-700 text-sm font-medium">{ADDRESS}</p>
            </div>
          </div>

          {/* Sample collection note */}
          <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
            <Truck size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-700 text-sm">Home Sample Collection Available</p>
              <p className="text-orange-600 text-xs mt-0.5">Sample collection available all over Hyderabad. WhatsApp or call us to book.</p>
            </div>
          </div>

          {/* Opening hours */}
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#0b1f3a] mb-0.5">Opening Hours</p>
              <p className="text-gray-500 text-sm">{OPENING_HOURS}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {/* Call — tel: link, works on mobile natively, toast on desktop */}
            <a
              href={callLink}
              onClick={handleCallAction}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Phone size={15}/> Call Now
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappLink("Hello Jai Bhavani Diagnostics, I'd like to enquire about tests / sample collection.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <MessageCircle size={15}/> WhatsApp
            </a>

            {/* SMS — sms: link on mobile, toast fallback on desktop */}
            <a
              href={smsLink(contactMsg)}
              onClick={(e) => handleSmsAction(e, contactMsg)}
              className="flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold text-sm hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
            >
              Send Message
            </a>
          </div>

          {/* Directions */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-orange-600 font-semibold text-sm hover:underline w-fit"
          >
            <Navigation size={15}/> Get Directions on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
