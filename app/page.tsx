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
    <div className="min-h-screen bg-[#F8F9FA]">
      <nav className="bg-[#1A2B48] text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold tracking-tight">Givebly</h1>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#1A2B48] mb-6 tracking-tight">
            Every Purchase Powers a Purpose.
          </h2>
          <p className="text-xl text-[#1A2B48] opacity-90 leading-relaxed max-w-3xl mx-auto">
            Reclaiming retail profits for the people. Givebly splits shopping commissions <span className="text-[#2ECC71] font-bold">50/50</span>—funding the Australian charities you care about, while putting cash back in your pocket for cost-of-living relief.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            
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
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2ECC71] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[#1A2B48] font-bold mb-1.5 text-sm">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2ECC71] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[#1A2B48] font-bold mb-1.5 text-sm">Postcode</label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.slice(0, 4))}
                  maxLength={4}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2ECC71] outline-none transition"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#2ECC71] text-white font-bold py-4 rounded-xl hover:bg-[#27AE60] transform transition active:scale-95 shadow-lg disabled:opacity-50 mt-2"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>

            {message && (
              <p className={status === "success" ? "mt-6 text-center font-bold text-[#2ECC71]" : "mt-6 text-center font-bold text-red-500"}>
                {message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 text-[#1A2B48] opacity-80">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Australian Charities</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Privacy Protected</span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              );
            }