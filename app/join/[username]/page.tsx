'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ReferralLandingPage() {
  const params = useParams();
  const router = useRouter();
  const [referrerName, setReferrerName] = useState('A friend');

  useEffect(() => {
    // Grab the name from the URL and capitalize the first letter beautifully
    if (params.username) {
      const rawName = params.username as string;
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
      setReferrerName(formattedName);
    }
  }, [params.username]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      
      {/* SIMPLE HEADER - Keep them focused on the prize */}
      <nav className="bg-[#1A2B48] text-white py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-black tracking-tight">Givebly</h1>
        </div>
      </nav>

      {/* MAIN CONVERSION AREA */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
          
          {/* TOP DECORATIVE BANNER */}
          <div className="h-32 bg-gradient-to-br from-[#1A2B48] to-indigo-900 relative flex justify-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* FLOATING AVATAR */}
            <div className="absolute -bottom-10 h-20 w-20 bg-white rounded-full p-1.5 shadow-xl">
              <div className="h-full w-full bg-[#2ECC71] rounded-full flex items-center justify-center text-3xl font-black text-[#1A2B48] shadow-inner border-2 border-[#1A2B48]/10">
                {referrerName.charAt(0)}
              </div>
            </div>
          </div>

          <div className="px-8 pt-16 pb-10 text-center flex flex-col items-center">
            
            <span className="bg-yellow-100 text-yellow-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 shadow-sm border border-yellow-200">
              Exclusive Invite
            </span>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#1A2B48] mb-4 leading-tight">
              {referrerName} just sent you <br />
              <span className="text-[#2ECC71]">1,000 Impact Points.</span>
            </h2>
            
            <p className="text-gray-500 font-medium mb-8 max-w-md text-lg">
              Join Givebly today to claim your Welcome Vault Bonus. Shop at 500+ Aussie stores, earn cashback, and fund local charities for free.
            </p>

            {/* THE PRIZE SHOWCASE */}
            <div className="w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-6 mb-8 flex flex-col items-center">
              <div className="text-6xl mb-2 drop-shadow-xl hover:scale-110 transition-transform cursor-pointer">🪙</div>
              <h3 className="font-black text-xl text-[#1A2B48]">1,000 PTS</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Pending in your vault</p>
            </div>

            {/* CALL TO ACTION */}
            <Link 
              href={`/login?ref=${params.username}`} 
              className="w-full bg-[#2ECC71] text-[#1A2B48] font-black text-xl py-4 rounded-xl shadow-[0_10px_20px_rgba(46,204,113,0.3)] hover:bg-[#27ae60] hover:shadow-[0_10px_25px_rgba(46,204,113,0.4)] transition-all hover:-translate-y-1 block"
            >
              Accept Invite & Join Free
            </Link>

            <p className="text-xs text-gray-400 font-medium mt-4">
              Takes 30 seconds. Unlocks when you make your first shop!
            </p>
          </div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div className="max-w-3xl w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
          <div>
            <div className="text-4xl mb-3">📱</div>
            <h4 className="font-black text-[#1A2B48] mb-1">1. Join via {referrerName}</h4>
            <p className="text-sm text-gray-500 font-medium">Create your free account using the secure link above.</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🛍️</div>
            <h4 className="font-black text-[#1A2B48] mb-1">2. Shop as normal</h4>
            <p className="text-sm text-gray-500 font-medium">Click through to Woolworths, The Iconic, Myer, and more.</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🎁</div>
            <h4 className="font-black text-[#1A2B48] mb-1">3. Unlock Rewards</h4>
            <p className="text-sm text-gray-500 font-medium">Your 1,000 points unlock instantly after your first purchase!</p>
          </div>
        </div>

      </main>

    </div>
  );
}