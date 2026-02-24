'use client';

import React, { useState } from 'react';

// --- DATA ARRAYS ---
const turboBoosts = [
  { name: 'Norton', old: '2%', new: '80%', color: 'text-yellow-500' },
  { name: 'Dodo', old: '$20', new: '$160', color: 'text-red-500' },
  { name: 'Temu', old: '5%', new: '25%', color: 'text-orange-500' },
  { name: 'Expedia', old: '4%', new: '15%', color: 'text-blue-600' },
  { name: 'The Iconic', old: '3%', new: '10%', color: 'text-black' },
];

const categories = [
  { name: 'Travel & Adv.', bg: 'bg-blue-100', icon1: '✈️', icon2: '⛱️' },
  { name: 'Tech & Audio', bg: 'bg-gray-200', icon1: '💻', icon2: '🎧' },
  { name: 'Beauty & Care', bg: 'bg-pink-100', icon1: '💄', icon2: '✨' },
  { name: 'Food & Drink', bg: 'bg-orange-100', icon1: '🍔', icon2: '🍷' },
  { name: 'Finance', bg: 'bg-green-100', icon1: '🐷', icon2: '💵' },
  { name: 'Apparel', bg: 'bg-purple-100', icon1: '👕', icon2: '👖' },
  { name: 'Home & Yard', bg: 'bg-yellow-100', icon1: '🏠', icon2: '🌴' },
];

const giftCards = [
  { name: 'Woolworths', bg: 'from-green-400/20 to-emerald-600/20', text: 'text-green-700' },
  { name: 'Uber', bg: 'from-gray-400/20 to-black/20', text: 'text-black' },
  { name: 'Bunnings', bg: 'from-green-500/20 to-red-500/20', text: 'text-green-800' },
  { name: 'Coles', bg: 'from-red-400/20 to-red-600/20', text: 'text-red-600' },
  { name: 'Myer', bg: 'from-gray-200 to-gray-300', text: 'text-gray-800' },
  { name: 'JB Hi-Fi', bg: 'from-yellow-300/30 to-yellow-500/30', text: 'text-yellow-700' },
];

const coupons = [
  { store: 'The Iconic', deal: '20% Off Winter Sale', code: 'WINTER20' },
  { store: 'Chemist Warehouse', deal: 'Free Shipping > $50', code: 'FREESHIP' },
  { store: 'DoorDash', deal: '$10 Off First 3', code: 'DASH10' },
];

export default function UserDashboard() {
  const [activeCharity, setActiveCharity] = useState('Salvation Army');

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* --- 1. LIVE TICKER --- */}
      <div className="w-full bg-[#1A2B48] border-b border-[#2ECC71]/20 text-[#2ECC71] py-1.5 text-xs font-bold flex justify-center items-center overflow-hidden relative">
        <span className="animate-pulse">⚡ LIVE: Sarah just earned $8.50 at Woolworths &nbsp; • &nbsp; We are $420 away from the Vinnies transport van! &nbsp; • &nbsp; Trent unlocked Diamond Status 💎</span>
      </div>

      {/* --- TOP NAV WITH HOVER SUB-MENU --- */}
      <div className="sticky top-0 z-50 group">
        <nav className="bg-[#1A2B48] text-white py-4 shadow-md relative z-20">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center gap-4">
            <div className="flex items-center gap-6 w-1/3">
              <h1 className="text-2xl font-bold tracking-tight cursor-pointer">Givebly</h1>
              <div className="relative hidden lg:block cursor-pointer">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 hover:text-white transition">
                  Categories <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex flex-1 justify-center">
              <div className="relative w-full max-w-lg">
                <input type="text" placeholder="Search stores, categories, charities..." className="w-full bg-white rounded-full py-2.5 pl-5 pr-12 text-sm text-[#1A2B48] focus:outline-none focus:ring-2 focus:ring-[#2ECC71] shadow-inner transition-all" />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#2ECC71] rounded-full cursor-pointer hover:bg-[#27AE60] transition shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1A2B48]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-1/3 justify-end">
              <a href="#" className="hidden md:flex items-center gap-1.5 text-[#2ECC71] hover:text-white transition font-bold text-sm">
                🎁 Rewards
              </a>
              <span className="text-white/20 hidden md:block">|</span>
              <span className="text-sm font-semibold hidden md:block text-gray-200">Welcome back, Trent</span>
              <div className="h-10 w-10 rounded-full bg-[#2ECC71] text-[#1A2B48] flex items-center justify-center font-extrabold shadow-md cursor-pointer border-2 border-[#1A2B48] relative">
                T
                <div className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full h-4 w-4 border-2 border-[#1A2B48] flex items-center justify-center shadow-lg animate-bounce"><span className="text-[8px] text-white font-bold">1</span></div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Hover Sub-Menu (Attached to bottom of Nav) */}
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-b border-gray-100 hidden group-hover:block transition-all z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center gap-8">
            {['Daily Double', 'Coupons', 'Referral GIFTS', 'Daily Bonus', 'Learn & Earn', 'Partner Charities'].map(link => (
              <a key={link} href="#" className="text-sm font-bold text-[#1A2B48] hover:text-[#2ECC71] transition">{link}</a>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT (Tighter Spacing: mb-6) --- */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* ROW 1: HERO BANNER & COMPRESSED METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Hero Banner Carousel (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl shadow-md p-8 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <span className="bg-[#2ECC71] text-[#1A2B48] text-xs font-bold px-3 py-1 rounded-full mb-4 w-max shadow-sm uppercase">Charity of the Month</span>
            <h2 className="text-4xl font-extrabold mb-2">Double Impact for RSPCA 🐾</h2>
            <p className="text-blue-100 font-medium mb-6 max-w-md">Every dollar you earn this week is matched 100% by our sponsors to help rescue animals.</p>
            <div className="flex gap-2 mt-auto">
              <div className="h-2 w-8 bg-white rounded-full"></div>
              <div className="h-2 w-2 bg-white/40 rounded-full"></div>
              <div className="h-2 w-2 bg-white/40 rounded-full"></div>
            </div>
          </div>

          {/* Squeezed Wallet & Charity Cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex flex-col relative overflow-hidden">
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1">Your Wallet</p>
              <h2 className="text-3xl font-black text-[#1A2B48] mb-1">$42.50</h2>
              <p className="text-[#2ECC71] font-bold text-xs mb-3">+ $4.20 pending</p>
              <button className="mt-auto bg-[#1A2B48] text-white font-bold py-2 rounded-xl text-sm w-full">Withdraw</button>
            </div>
            <div className="bg-[#1A2B48] rounded-2xl shadow-md p-5 border border-gray-800 flex flex-col text-white relative overflow-hidden">
              <p className="text-xs font-extrabold text-blue-300 uppercase tracking-widest mb-1">Charity Impact</p>
              <h2 className="text-3xl font-black mb-1">$42.50</h2>
              <p className="text-gray-300 font-medium text-xs mb-3 truncate">For <b>{activeCharity}</b></p>
              <button className="mt-auto bg-[#2ECC71] text-[#1A2B48] font-bold py-2 rounded-xl text-sm w-full">View Impact</button>
            </div>
          </div>
        </div>

        {/* ROW 2: DATA DASHBOARD (Graph, Ring, Community) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex flex-col justify-between">
            <h3 className="text-sm font-extrabold text-[#1A2B48] uppercase tracking-wide">6-Month Impact</h3>
            {/* Fake SVG Graph Line */}
            <svg className="w-full h-16 mt-4" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,30 Q20,25 40,20 T80,10 T100,5" fill="none" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round"/>
              <path d="M0,30 Q20,25 40,20 T80,10 T100,5 L100,30 L0,30 Z" fill="rgba(46, 204, 113, 0.1)" />
            </svg>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex items-center gap-4">
            {/* Fake Goal Ring */}
            <div className="relative h-16 w-16 flex items-center justify-center rounded-full border-4 border-gray-100">
              <div className="absolute inset-0 rounded-full border-4 border-[#2ECC71] border-r-transparent border-t-transparent rotate-45"></div>
              <span className="font-bold text-sm text-[#1A2B48]">65%</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1A2B48] uppercase">Christmas Fund</h3>
              <p className="text-xs text-gray-500">$325 / $500 Goal</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl shadow-md p-5 text-white flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase mb-2">Community Goal: Vinnies Van</h3>
            <div className="w-full bg-black/20 rounded-full h-3 mb-1">
              <div className="bg-white h-3 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs font-semibold text-teal-100 text-right">85% Funded</p>
          </div>
        </div>

        {/* ROW 3: TURBO BOOST */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3 flex items-center gap-2">🚀 Givebly Turbo Boost</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scroll-bar">
            {turboBoosts.map((boost) => (
              <div key={boost.name} className="min-w-[220px] bg-white rounded-xl shadow-md border-b-4 border-[#2ECC71] p-4 hover:-translate-y-1 transition cursor-pointer">
                <div className={`text-lg font-black ${boost.color} mb-3`}>[ {boost.name} ]</div>
                <div className="flex items-end gap-2">
                  <span className="text-gray-400 line-through text-xs font-semibold">{boost.old}</span>
                  <span className="text-[#2ECC71] text-2xl font-black leading-none">{boost.new}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 4: CATEGORY CAROUSEL (NEW RECTANGLE DESIGN) */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3 flex items-center gap-2">🛍️ Shop by Category</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scroll-bar">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center min-w-[140px] group cursor-pointer">
                {/* Colored Rectangle Container (66% height of Gift Cards) */}
                <div className={`h-16 w-full ${cat.bg} rounded-xl shadow-sm border border-black/5 flex items-center justify-center gap-3 group-hover:shadow-md group-hover:scale-105 transition`}>
                  <span className="text-2xl opacity-80">{cat.icon1}</span>
                  <span className="text-2xl opacity-80">{cat.icon2}</span>
                </div>
                {/* Text Underneath */}
                <span className="text-xs font-extrabold text-[#1A2B48] mt-2 group-hover:text-[#2ECC71] transition">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 5: TRENDING STORES */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3 flex items-center gap-2">🔥 Trending This Week</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scroll-bar">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="min-w-[160px] bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center hover:shadow-md transition cursor-pointer">
                <div className="h-10 w-10 bg-gray-100 rounded-full mb-2"></div>
                <span className="text-sm font-bold text-[#1A2B48]">Store {i}</span>
                <span className="text-xs font-bold text-[#2ECC71]">Up to 8%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 6: DAILY DOUBLE */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 p-5 flex items-center gap-5 cursor-pointer">
            <div className="h-16 w-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center font-bold text-gray-400 shadow-inner">Myer</div>
            <div>
              <h4 className="font-bold text-[#1A2B48] text-lg leading-none mb-1">Myer</h4>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">Was 3%</span>
                <span className="text-lg font-black text-[#2ECC71]">Now 6%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 p-5 flex items-center gap-5 cursor-pointer">
            <div className="h-16 w-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center font-bold text-gray-400 shadow-inner">Iconic</div>
            <div>
              <h4 className="font-bold text-[#1A2B48] text-lg leading-none mb-1">The Iconic</h4>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">Was 4%</span>
                <span className="text-lg font-black text-[#2ECC71]">Now 8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 7: DISCOUNTED GIFT CARDS */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3">Discounted Gift Cards</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {giftCards.map((card) => (
              <div key={card.name} className={`bg-gradient-to-br ${card.bg} rounded-xl h-24 p-2 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition cursor-pointer border border-white/50 relative group`}>
                <div className="bg-white rounded-lg shadow-sm w-10 h-10 flex items-center justify-center mb-1"><span className={`text-[8px] font-black ${card.text} uppercase text-center leading-tight`}>{card.name}</span></div>
                <span className="text-[#1A2B48] text-[10px] font-bold bg-white/80 px-2 rounded-full">3% Off</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 8: COUPONS & ACTION HUBS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Coupon */}
          <div className="bg-white rounded-xl shadow-md border-2 border-dashed border-gray-200 p-5 relative">
            <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#1A2B48] text-white rounded-full flex items-center justify-center shadow-md text-xs">✂️</div>
            <span className="text-xs font-bold text-gray-400 uppercase mb-1">The Iconic</span>
            <h4 className="text-md font-extrabold text-[#1A2B48] mb-3">20% Off Winter Sale</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3 flex justify-between items-center cursor-pointer hover:border-[#2ECC71]">
              <span className="font-mono font-bold text-gray-600 text-sm">WINTER20</span>
              <span className="text-[10px] font-bold uppercase">Copy</span>
            </div>
          </div>

          {/* Quick-Copy Referral Hub */}
          <div className="bg-[#1A2B48] rounded-xl shadow-md p-5 text-white flex flex-col justify-between">
            <div>
              <h4 className="text-md font-extrabold text-[#2ECC71] mb-1">Invite & Earn $10</h4>
              <p className="text-xs text-gray-300">Give $10 to a friend, get $10 for your wallet.</p>
            </div>
            <div className="bg-white/10 rounded-lg py-1.5 px-3 flex justify-between items-center cursor-pointer hover:bg-white/20">
              <span className="font-mono text-sm">givebly.com/ref/trent</span>
              <span className="text-[10px] font-bold uppercase">Copy</span>
            </div>
          </div>

          {/* Browser Extension Prompt */}
          <div className="bg-gradient-to-r from-[#2ECC71] to-emerald-600 rounded-xl shadow-md p-5 text-[#1A2B48] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20 text-4xl">💻</div>
            <div>
              <h4 className="text-md font-extrabold mb-1">Never Miss Cash</h4>
              <p className="text-xs font-medium mb-3">Get the Chrome Extension.</p>
            </div>
            <button className="bg-[#1A2B48] text-white text-xs font-bold py-2 rounded-lg w-full">Install Now</button>
          </div>
        </div>

        {/* ROW 9: BADGES & POLAROIDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gamification Badges */}
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h3 className="text-sm font-extrabold text-[#1A2B48] mb-4">Your Trophy Cabinet</h3>
            <div className="flex gap-4">
              <div className="flex flex-col items-center opacity-100"><div className="h-12 w-12 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center text-xl">💎</div><span className="text-[10px] font-bold mt-1">Diamond</span></div>
              <div className="flex flex-col items-center opacity-100"><div className="h-12 w-12 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center text-xl">🤝</div><span className="text-[10px] font-bold mt-1">First Give</span></div>
              <div className="flex flex-col items-center opacity-40 grayscale"><div className="h-12 w-12 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center text-xl">🛒</div><span className="text-[10px] font-bold mt-1">10 Trips</span></div>
            </div>
          </div>

          {/* See Your Impact Polaroids */}
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h3 className="text-sm font-extrabold text-[#1A2B48] mb-4">See Your Impact</h3>
            <div className="flex gap-4 overflow-hidden">
              <div className="bg-gray-50 p-2 pb-6 border border-gray-200 shadow-sm transform -rotate-2">
                <div className="h-20 w-24 bg-gray-300 flex items-center justify-center text-xs">Image</div>
                <p className="text-[8px] font-handwriting mt-2 text-center text-gray-600">You fed Buster! 🐶</p>
              </div>
              <div className="bg-gray-50 p-2 pb-6 border border-gray-200 shadow-sm transform rotate-3">
                <div className="h-20 w-24 bg-gray-300 flex items-center justify-center text-xs">Image</div>
                <p className="text-[8px] font-handwriting mt-2 text-center text-gray-600">Flood relief prep 💙</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}