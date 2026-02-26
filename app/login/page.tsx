'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  // Toggle between Sign Up and Log In
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Status and Loading
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (isSignUp) {
      // --- SIGN UP LOGIC ---
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // Saves their name to their secure profile
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        // Success! Send them to the dashboard.
        router.push('/dashboard');
      }
    } else {
      // --- LOG IN LOGIC ---
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        // Success! Send them to the dashboard.
        router.push('/dashboard');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* LEFT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-[#1A2B48] mb-2 tracking-tight">Givebly</h1>
            <h2 className="text-gray-500 font-medium text-sm">
              {isSignUp ? 'Create an account to start giving.' : 'Welcome back! Log in to your wallet.'}
            </h2>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-5">
            
            {/* Only show Name field if they are signing up */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  required 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  placeholder="e.g. Trent" 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] shadow-sm transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@example.com" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] shadow-sm transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] shadow-sm transition"
              />
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100 text-center">
                {errorMsg}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full bg-[#2ECC71] text-[#1A2B48] font-black text-lg py-3.5 rounded-xl hover:bg-[#27AE60] hover:text-white transition shadow-md disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Log In')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                }} 
                className="ml-2 text-[#1A2B48] hover:text-[#2ECC71] transition"
              >
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: The Impact Graphic (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1A2B48] to-indigo-900 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ECC71]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="max-w-lg z-10 text-center">
          <div className="text-6xl mb-6">🌍</div>
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">Turn your everyday shopping into everyday impact.</h2>
          <p className="text-lg text-blue-200 font-medium">Join thousands of Australians raising money for causes they care about, just by buying the things they need.</p>
        </div>
      </div>

    </div>
  );
}