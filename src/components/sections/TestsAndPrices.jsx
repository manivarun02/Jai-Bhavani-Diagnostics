import React, { useState, useMemo } from 'react';
import { Search, Zap, X, MessageCircle, Phone, Check } from 'lucide-react';
import { TESTS, CATEGORIES } from '../../data/tests';
import { callLink, whatsappLink, smsLink, handleCallAction } from '../../utils/contactLinks';

// Use actual ₹ character throughout — Unicode escapes don't render in JSX text nodes
const Rs = '₹';

function buildStdMsg(selected, name) {
  const tests = [...selected.values()];
  const total = tests.reduce((s, t) => s + t.price, 0);
  let msg = "Hello Jai Bhavani Diagnostics,\nI'd like to book the following tests:\n";
  tests.forEach((t, i) => { msg += `${i + 1}. ${t.name} - ${Rs}${t.price}\n`; });
  msg += `\nReport type: Standard\nTotal: ${Rs}${total}\n`;
  if (name.trim()) msg += `Name: ${name.trim()}\n`;
  msg += 'Please call me to confirm.';
  return msg;
}

function buildSameDayMsg(selected, name) {
  const tests = [...selected.values()];
  const stdTotal = tests.reduce((s, t) => s + t.price, 0);
  const surcharge = Math.round(stdTotal * 0.30);
  const total = stdTotal + surcharge;
  let msg = "⚡ SAME DAY REPORT REQUEST\nHello Jai Bhavani Diagnostics,\nI'd like the SAME-DAY INSTANT REPORT for:\n";
  tests.forEach((t, i) => {
    msg += `${i + 1}. ${t.name} - ${Rs}${Math.round(t.price * 1.3)} (Same-Day)\n`;
  });
  msg += `\nReport type: Same-Day Instant (+30%)\nSubtotal: ${Rs}${stdTotal}\nSame-day charge (+30%): ${Rs}${surcharge}\nTotal: ${Rs}${total}\n`;
  if (name.trim()) msg += `Name: ${name.trim()}\n`;
  msg += 'Please confirm availability and call me to confirm.';
  return msg;
}

export default function TestsAndPrices() {
  const [selected, setSelected] = useState(new Map());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [name, setName] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const toggle = (test) => {
    setSelected(prev => {
      const next = new Map(prev);
      if (next.has(test.id)) next.delete(test.id);
      else next.set(test.id, test);
      return next;
    });
  };

  const filtered = useMemo(() =>
    TESTS.filter(t =>
      (category === 'All' || t.category === category) &&
      t.name.toLowerCase().includes(search.toLowerCase())
    ), [category, search]);

  const stdTotal = useMemo(() =>
    [...selected.values()].reduce((s, t) => s + t.price, 0), [selected]);
  const surcharge = Math.round(stdTotal * 0.30);
  const sameDayTotal = stdTotal + surcharge;
  const hasSelected = selected.size > 0;

  const stdMsg = buildStdMsg(selected, name);
  const sdMsg  = buildSameDayMsg(selected, name);

  const Panel = () => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#0b1f3a] text-lg">Your Selection</h3>
        {hasSelected && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{selected.size}</span>
        )}
      </div>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full focus:outline-none focus:border-orange-400"
      />

      {!hasSelected ? (
        <p className="text-gray-400 text-sm text-center py-4">Add tests below to begin booking.</p>
      ) : (
        <>
          <div className="flex items-center text-xs text-gray-400 font-semibold px-1">
            <span className="flex-1">Test</span>
            <span className="w-16 text-right">Normal</span>
            <span className="w-20 text-right text-amber-600 flex items-center justify-end gap-0.5">
              <Zap size={11}/> Same-Day
            </span>
            <span className="w-6"></span>
          </div>
          <ul className="flex flex-col gap-1 max-h-52 overflow-y-auto">
            {[...selected.values()].map(t => (
              <li key={t.id} className="flex items-center text-sm py-1.5 border-b border-gray-50">
                <span className="text-gray-700 flex-1 mr-2 truncate">{t.name}</span>
                <span className="w-16 text-right text-gray-500 whitespace-nowrap">{Rs}{t.price}</span>
                <span className="w-20 text-right text-amber-600 font-semibold whitespace-nowrap">{Rs}{Math.round(t.price * 1.3)}</span>
                <button onClick={() => toggle(t)} className="w-6 flex justify-end text-gray-400 hover:text-red-500 transition-colors ml-1">
                  <X size={13} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasSelected && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-1 font-medium">Standard</p>
            <p className="font-black text-[#0b1f3a] text-xl">{Rs}{stdTotal}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <p className="text-xs text-amber-600 mb-1 font-medium flex items-center justify-center gap-1">
              <Zap size={11}/> Same-Day (+30%)
            </p>
            <p className="font-black text-amber-700 text-xl">{Rs}{sameDayTotal}</p>
            <p className="text-xs text-amber-500 mt-0.5">+{Rs}{surcharge}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <a
          href={hasSelected ? whatsappLink(stdMsg) : undefined}
          target={hasSelected ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
            hasSelected
              ? 'bg-[#25D366] text-white hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <MessageCircle size={15} /> Book Standard Report
        </a>

        <a
          href={hasSelected ? whatsappLink(sdMsg) : undefined}
          target={hasSelected ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border-2 transition-all ${
            hasSelected
              ? 'border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
              : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Zap size={15} /> Book Same-Day Report (+30%)
        </a>

        <a
          href={hasSelected ? callLink : undefined}
          onClick={hasSelected ? handleCallAction : undefined}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${
            hasSelected ? 'border-orange-500 text-orange-600 hover:bg-orange-50 cursor-pointer' : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Phone size={14} /> Call to Book
        </a>
      </div>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Same-day availability depends on test type and collection time. We'll confirm on WhatsApp.
        Prices subject to change — please confirm before booking.
      </p>
    </div>
  );

  return (
    <section id="tests" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-orange-500 tracking-widest uppercase mb-3">Transparent Pricing</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3a] mb-2">Tests &amp; Prices</h2>
          <p className="text-gray-500">Select tests, compare Normal vs Same-Day prices, and book on WhatsApp.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-4 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tests…"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 bg-white"
              />
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Test</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Normal</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-amber-600 uppercase tracking-wider">
                      <span className="flex items-center justify-end gap-1"><Zap size={11}/>Same-Day</span>
                    </th>
                    <th className="px-4 py-3 w-24"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t, i) => {
                    const isSelected = selected.has(t.id);
                    const sdPrice = Math.round(t.price * 1.3);
                    return (
                      <tr key={t.id} className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                        <td className="px-4 py-3">
                          <span className="font-medium text-gray-800 text-sm">{t.name}</span>
                          <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{t.category}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-bold text-[#0b1f3a]">{Rs}{t.price}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-bold text-amber-600">{Rs}{sdPrice}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={whatsappLink(`Hi, I'd like to enquire about ${t.name} (${Rs}${t.price}) at Jai Bhavani Diagnostics.`)}
                              target="_blank" rel="noopener noreferrer"
                              className="p-1.5 text-[#25D366] hover:bg-green-50 rounded-lg transition-colors"
                              title="Quick WhatsApp enquiry"
                            >
                              <MessageCircle size={14} />
                            </a>
                            <button
                              onClick={() => toggle(t)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-green-100 text-green-700 border border-green-300'
                                  : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-md'
                              }`}
                            >
                              {isSelected ? <><Check size={12}/> Added</> : 'Add'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-10 text-gray-400 text-sm">No tests found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hidden lg:block lg:w-80 xl:w-96">
            <div className="sticky top-20"><Panel /></div>
          </div>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setPanelOpen(true)}
            className={`fixed bottom-20 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm shadow-xl transition-all ${
              hasSelected
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                : 'bg-white border border-gray-200 text-gray-500'
            }`}
          >
            {hasSelected ? `${selected.size} selected · ${Rs}${stdTotal}` : 'View selection'}
          </button>
          {panelOpen && (
            <div className="fixed inset-0 z-50 flex items-end">
              <div className="absolute inset-0 bg-black/40" onClick={() => setPanelOpen(false)} />
              <div className="relative w-full bg-white rounded-t-2xl p-4 max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-[#0b1f3a] text-lg">Your Selection</span>
                  <button onClick={() => setPanelOpen(false)}><X size={20} /></button>
                </div>
                <Panel />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
