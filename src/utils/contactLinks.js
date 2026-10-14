import { PHONE_TEL, PHONE_DISPLAY, WHATSAPP_NUMBER, SMS_NUMBER } from '../config/contact';

const DEFAULT_MSG = "Hello Jai Bhavani Diagnostics, I'm interested in your tests. Please call me.";

export const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

export const isAndroid = () => {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 0 && window.innerWidth <= 1024)
  );
};

export const whatsappLink = (msg = DEFAULT_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const smsLink = (msg = DEFAULT_MSG) => {
  const encoded = encodeURIComponent(msg);
  // iOS Messages prefers '&body=', Android prefers '?body='
  if (isIOS()) {
    return `sms:${SMS_NUMBER}&body=${encoded}`;
  }
  if (isAndroid()) {
    return `sms:${SMS_NUMBER}?body=${encoded}`;
  }
  // Standard fallback
  return `sms:${SMS_NUMBER}?&body=${encoded}`;
};

export const callLink = `tel:${PHONE_TEL}`;

export const handleSmsAction = (e, msg = DEFAULT_MSG) => {
  if (!isMobile()) {
    if (e && e.preventDefault) e.preventDefault();
    try {
      navigator.clipboard?.writeText(PHONE_DISPLAY);
    } catch (err) {}
    window.dispatchEvent(new CustomEvent('contact-toast', {
      detail: { type: 'sms', msg }
    }));
  }
};

export const handleCallAction = (e) => {
  if (!isMobile()) {
    if (e && e.preventDefault) e.preventDefault();
    try {
      navigator.clipboard?.writeText(PHONE_DISPLAY);
    } catch (err) {}
    window.dispatchEvent(new CustomEvent('contact-toast', {
      detail: { type: 'call' }
    }));
  }
};
