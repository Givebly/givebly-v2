'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // PROMO CODE STATES
  const [promoCode, setPromoCode] = useState('');
  const [displayedPoints, setDisplayedPoints] = useState(500);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [promoMessage, setPromoMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- THE DYNAMIC PROMO CHECKER ---
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'MONEYMATTERS' || code === 'VIP1000') {
      setDisplayedPoints(1000);
      setPromoStatus('success');
      setPromoMessage('✨ VIP Code Applied! Your bonus is doubled.');
    } else if (code === '') {
      setDisplayedPoints(500);
      setPromoStatus('idle');
      setPromoMessage('');
    } else {
      setDisplayedPoints(500);
      setPromoStatus('error');
      setPromoMessage('Invalid code. Standard 500 point bonus applied.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Create the user in Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // 2. Deposit the points into the ledger!
        const { error: txError } = await supabase.from('point_transactions').insert([
          { 
            user_id: data.user.id, 
            action_type: 'welcome_bonus', 
            points_awarded: displayedPoints, 
            description: promoStatus === 'success' ? `VIP Welcome Bonus (Code: ${promoCode.toUpperCase()})` : 'Standard Welcome Bonus' 
          }
        ]);

        // If the database blocks the points, let's catch it so we know!
        if (txError) {
          console.error("Point Minting Error:", txError);
          alert(`Account created, but points failed to load: ${txError.message}. (Check your Supabase RLS settings!)`);
        }

        // 3. Send them to their new dashboard
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic Math for the visual progress bars
  const spotifyPercentage = Math.min(Math.round((displayedPoints / 1500) * 100), 100);

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] font-sans">
      
      {/* LEFT SIDE: DYNAMIC VALUE PROPOSITION */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#1A2B48] flex-col justify-between relative overflow-hidden text-white p-12 transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className={`absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full blur-3xl transition-all duration-700 ${promoStatus === 'success' ? 'bg-yellow-500/30 scale-125' : 'bg-[#2ECC71]/20'}`}></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="text-3xl font-black tracking-tight text-white mb-16 inline-block">Givebly</Link>
          
          <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-6 transition-all">
            Turn your everyday shopping into <span className={promoStatus === 'success' ? 'text-yellow-400' : 'text-[#2ECC71]'}>real-world impact.</span>
          </h1>
          <p className="text-lg text-gray-300 font-medium mb-12 max-w-md">
            Join thousands of Aussies earning premium digital rewards while funding local charities—at no extra cost.
          </p>

          {/* THE VALUE ANCHOR: Now dynamically updates! */}
          <div className={`backdrop-blur-md rounded-2xl p-6 shadow-xl transition-all duration-500 border ${promoStatus === 'success' ? 'bg-yellow-500/10 border-yellow-400/50 scale-105' : 'bg-white/10 border-white/20'}`}>
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-5xl drop-shadow-lg transition-transform duration-500 ${promoStatus === 'success' ? 'animate-bounce' : ''}`}>🪙</span>
              <div>
                <h3 className="text-xl font-black text-yellow-400 leading-none mb-1">{displayedPoints} Point Head Start</h3>
                <p className="text-sm font-bold text-gray-200">Yours instantly when you join today.</p>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-xl p-4 mt-4">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">What can you get?</p>
              <div className="space-y-4">
                
                {/* Spotify Dynamic Bar */}
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center text-sm shadow-sm border border-gray-700">🎧</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>3 Months Spotify</span>
                      <span className={promoStatus === 'success' ? 'text-yellow-400' : 'text-[#2ECC71]'}>{spotifyPercentage}% Unlocked</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ease-out ${promoStatus === 'success' ? 'bg-yellow-400' : 'bg-[#2ECC71]'}`} style={{ width: `${spotifyPercentage}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* RSPCA Static Bar */}
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-sm shadow-sm">🐶</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>$5 RSPCA Donation</span>
                      <span className={promoStatus === 'success' ? 'text-yellow-400' : 'text-[#2ECC71]'}>100% Unlocked</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className={`h-full transition-colors duration-1000 w-full ${promoStatus === 'success' ? 'bg-yellow-400' : 'bg-[#2ECC71]'}`}></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm font-medium text-gray-400">
          © {new Date().getFullYear()} Givebly. Making giving easy.
        </div>
      </div>

      {/* RIGHT SIDE: THE SIGN-UP FORM */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="max-w-md w-full">
          
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-black text-[#1A2B48] mb-2">Claim your points.</h2>
            <p className="text-gray-500 font-medium">Create your free Givebly account to start earning.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20 transition outline-none text-[#1A2B48] font-medium"
                placeholder="e.g. Trent Wrightson"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20 transition outline-none text-[#1A2B48] font-medium"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20 transition outline-none text-[#1A2B48] font-medium"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {/* UPGRADED INTERACTIVE PROMO FIELD */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 flex items-center justify-between">
                <span>Promo or Referral Code</span>
                <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md">Optional</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xl">🎁</div>
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition outline-none text-[#1A2B48] font-bold uppercase tracking-widest placeholder-gray-300 ${promoStatus === 'success' ? 'border-yellow-400 bg-yellow-50 focus:ring-yellow-400/20' : promoStatus === 'error' ? 'border-red-300 bg-red-50 focus:ring-red-300/20' : 'border-dashed border-gray-300 focus:border-purple-400 focus:ring-purple-400/20'}`}
                    placeholder="GOT A CODE?"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleApplyPromo}
                  className="bg-[#1A2B48] text-white font-bold px-6 rounded-xl hover:bg-gray-800 transition shadow-sm"
                >
                  Apply
                </button>
              </div>
              
              {promoMessage && (
                <p className={`text-xs font-bold mt-2 ml-1 ${promoStatus === 'success' ? 'text-yellow-600' : 'text-red-500'}`}>
                  {promoMessage}
                </p>
              )}
              {promoStatus === 'idle' && (
                <p className="text-[10px] font-bold text-gray-400 mt-2 ml-1">Leave blank to claim your standard 500 Point bonus.</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full font-black text-lg py-4 rounded-xl transition-all mt-4 flex justify-center items-center gap-2 ${promoStatus === 'success' ? 'bg-yellow-400 text-[#1A2B48] shadow-[0_5px_15px_rgba(250,204,21,0.4)] hover:bg-yellow-500 hover:-translate-y-0.5' : 'bg-[#2ECC71] text-[#1A2B48] shadow-[0_5px_15px_rgba(46,204,113,0.3)] hover:bg-[#27ae60] hover:-translate-y-0.5'}`}
            >
              {isLoading ? 'Creating Account...' : `Claim My ${displayedPoints} Points & Join`}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-gray-500 mt-8">
            Already have an account? <Link href="/login" className="text-[#2ECC71] font-bold hover:underline">Log in</Link>
          </p>

        </div>
      </div>

    </div>
  );
}