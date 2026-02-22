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
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A2B48] mb-4">
            Join the Movement
          </h2>
          <p className="text-lg text-[#1A2B48] opacity-90">
            Split your spare change with charities you care about with a 
            <span className="text-[#2ECC71] font-bold mx-1">50/50 split</span>.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mb-20 border border-gray-100">
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
              className="w-full bg-[#2ECC71] text-white font-bold py-4 rounded-xl hover:bg-[#27AE60] transform transition active:scale-95 shadow-lg disabled:opacity-50"
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

        <div>
          <h3 className="text-2xl font-bold text-[#1A2B48] mb-10 text-center">Supporting Charities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {charityData.map((charity) => (
              <div
                key={charity.name}
                className="group bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center h-32 border border-gray-50 transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#2ECC71]/20 cursor-default"
              >
                <img
                  src={"/logos/" + charity.filename}
                  alt={charity.name}
                  className="object-contain max-h-16 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#1A2B48] text-white py-10 mt-20 text-center">
        <p className="opacity-70 text-sm">&copy; 2026 Givebly. Every purchase powers a purpose.</p>
      </footer>
    </div>
  );
}