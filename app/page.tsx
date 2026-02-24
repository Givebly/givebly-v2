'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import confetti from 'canvas-confetti';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const charityData = [
  { name: 'Red Cross', filename: 'red-cross.png' },
  { name: 'Salvation Army', filename: 'salvos.png' },
  { name: 'Vinnies', filename: 'vinnies.png' },
  { name: 'World Vision', filename: 'world-vision.png' },
  { name: 'Cancer Council', filename: 'cancer-council.png' },
  { name: 'RSPCA', filename: 'rspca.png' },
  { name: 'Beyond Blue', filename: 'beyond-blue.png' },
  { name: 'Smith Family', filename: 'smith-family.png' },
];

export default function GivebyLandingPage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase.from('waitlist').insert([
        {
          first_name: firstName,
          email,
          postcode,
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setMessage('✓ Thank you for joining the movement!');
      setFirstName('');
      setEmail('');
      setPostcode('');
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2ECC71', '#1A2B48', '#FFFFFF']
      });

    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative overflow-hidden">
      
      {/* LAYER 1: The Image (Turned up the brightness!) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90" 
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      ></div>
      
      {/* LAYER 2: The Fade (Thinned out the white paint) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/20 via-white/50 to-[#F8F9FA]"></div>

      <div className="relative z-10">
        <nav className="bg-[#1A2B48] text-white py-4 shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-2xl font-bold tracking-tight">Givebly</h1>
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          
          <div className="mb-10 text-center">
            <p className="text-xs font-extrabold text-[#1A2B48] opacity-50 mb-4 tracking-[0.2em] uppercase">
              Supporting Causes You Trust
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {charityData.map((charity) => (
                <img
                  key={`top-${charity.name}`}
                  src={"/logos/" + charity.filename}
                  alt={charity.name}
                  className="h-8 md:h-10 object-contain hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#1A2B48] mb-6 tracking-tight leading-tight">
              Every Purchase <br />
              Powers a Purpose.
            </h2>
            <p className="text-xl text-[#1A2B48] opacity-90 leading-relaxed max-w-3xl mx-auto">
              <span className="font-bold">Australia, we are the most generous nation on earth.</span> Let's band together and spark a global revolution in how we give. Givebly reclaims online profits from overseas giants and gives the power back to you with a <span className="text-[#2ECC71] font-bold">50/50 split</span>. <span className="font-bold">You get 50% back</span> for cost-of-living relief, and <span className="font-bold">you hand-pick the Aussie charity</span> that receives the rest. Take back the profits. Support your community. Change the world.
            </p>
          </div>

          <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 md:gap-6 mb-12">
            <div className="flex flex-col items-center">
              <div className="bg-[#2ECC71]/10 p-4 rounded-full border-2 border-[#2ECC71]/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-sm md:text-base font-bold mt-3 text-[#1A2B48]">Your Wallet (50%)</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2 opacity-60">
              <div className="h-0.5 w-8 md:w-16 border-t-2 border-dashed border-gray-400"></div>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-[#1A2B48] flex items-center justify-center shadow-lg bg-gradient-to-br from-white to-gray-100 relative group cursor-default">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#2ECC71]"></div>
                <span className="font-extrabold text-xl md:text-2xl text-[#1A2B48] tracking-tighter">G</span>
              </div>
              <div className="h-0.5 w-8 md:w-16 border-t-2 border-dashed border-gray-400"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#1A2B48]/10 p-4 rounded-full border-2 border-[#1A2B48]/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#1A2B48]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm md:text-base font-bold mt-3 text-[#1A2B48]">Charities (50%)</span>
            </div>
          </div>

          <div className="max-w-md mx-auto mb-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-8 bg-green-50/50 py-2.5 rounded-lg border border-green-100">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2ECC71]"></span>
                </span>
                <p className="text-sm font-semibold text-[#1A2B48]">Join <span className="text-[#2ECC71]">100+</span> Australians claiming their impact</p>
              </div>
              <h3 className="text-2xl font-bold text-[#1A2B48] text-center mb-6">Join the Movement</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[#1A2B48] font-bold mb-1.5 text-sm">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2ECC71] outline-none transition" />
                </div>
                <div>
                  <label className="block text-[#1A2B48] font-bold mb-1.5 text-sm">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2ECC71] outline-none transition" />
                </div>
                <div>
                  <label className="block text-[#1A2B48] font-bold mb-1.5 text-sm">Postcode</label>
                  <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value.slice(0, 4))} maxLength={4} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2ECC71] outline-none transition" />
                </div>
                <button type="submit" disabled={status === 'loading'} className="w-full bg-[#2ECC71] text-white font-bold py-4 rounded-xl hover:bg-[#27AE60] transform transition active:scale-95 shadow-lg disabled:opacity-50 mt-2">
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              {message && (<p className={status === "success" ? "mt-6 text-center font-bold text-[#2ECC71]" : "mt-6 text-center font-bold text-red-500"}>{message}</p>)}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 text-[#1A2B48]">
              <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg><span className="text-sm font-bold">100% Free Forever</span></div>
              <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-sm font-bold">Proudly Aussie Run</span></div>
              <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg><span className="text-sm font-bold">Bank-Level Security</span></div>
            </div>
          </div>

          {/* REALISTIC SOLID ICONS SECTION */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h3 className="text-lg font-bold text-[#1A2B48] mb-6 opacity-80">Works with thousands of your favourite everyday stores</h3>
            <div className="flex justify-center items-center gap-6 md:gap-14 opacity-50 text-[#1A2B48]">
              {/* Detailed Grocery Cart */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
              {/* Commercial Passenger Jet */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
              {/* Detailed Laptop */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>
              {/* Takeaway Coffee Cup */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M16 5v1.5a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 018 6.5V5H6l1.37 13.73a2 2 0 002 1.83h5.26a2 2 0 002-1.83L18 5h-2zm-6-2h4v1h-4V3z"/></svg>
              {/* Retail Shopping Bag */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .89 2 2H10c0-1.11.89-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v14z"/></svg>
            </div>
          </div>

          <div className="mt-20 relative">
            <h3 className="text-3xl font-extrabold text-[#1A2B48] mb-3 text-center">Supporting Charities</h3>
            <p className="text-lg text-center text-[#1A2B48] opacity-80 mb-10 max-w-2xl mx-auto">
              Your values. Your choice. You decide exactly where your impact goes.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {charityData.map((charity) => (
                <div key={charity.name} className="group bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center h-32 border border-gray-50 transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#2ECC71]/20 cursor-default">
                  <img src={"/logos/" + charity.filename} alt={charity.name} className="object-contain max-h-16 transition-transform duration-300 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-[#1A2B48] text-white py-10 mt-20 text-center relative z-10">
          <p className="opacity-70 text-sm">&copy; 2026 Givebly. Every purchase powers a purpose.</p>
        </footer>
      </div>
    </div>
  );
}