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
  { name: 'Amazon', bg: 'from-orange-300/20 to-orange-500/20', text: 'text-orange-600' },
  { name: 'Kmart', bg: 'from-blue-400/20 to-blue-600/20', text: 'text-blue-600' },
  { name: 'PlayStation', bg: 'from-blue-600/20 to-indigo-800/20', text: 'text-blue-800' },
  { name: 'Airbnb', bg: 'from-pink-400/20 to-rose-600/20', text: 'text-pink-600' },
  { name: 'Netflix', bg: 'from-red-500/20 to-red-800/20', text: 'text-red-600' },
  { name: 'Sephora', bg: 'from-black/10 to-gray-400/20', text: 'text-black' },
];

const trophyRow1 = [
  { name: 'Sign Up', icon: '📝', unlocked: true },
  { name: 'First Give', icon: '💚', unlocked: true },
  { name: '1st Referral', icon: '🗣️', unlocked: false },
  { name: '7-Day Streak', icon: '🔥', unlocked: false },
  { name: 'Social Share', icon: '📱', unlocked: false },
  { name: 'Learn & Earn', icon: '🎓', unlocked: false },
  { name: 'Contributor', icon: '🏗️', unlocked: false },
  { name: 'Givebly OG', icon: '⭐', unlocked: false },
];

const trophyRow2 = [
  { name: '2 Gives', icon: '✌️', unlocked: false },
  { name: '3 Gives', icon: '🤟', unlocked: false },
  { name: '5 Gives', icon: '🖐️', unlocked: false },
  { name: 'Bronze', icon: '🥉', unlocked: false },
  { name: 'Silver', icon: '🥈', unlocked: false },
  { name: 'Gold', icon: '🥇', unlocked: false },
  { name: 'Platinum', icon: '💿', unlocked: false },
  { name: 'Diamond', icon: '💎', unlocked: false },
];

// --- NEW DATA ARRAYS ---
const popularStores = [
  { name: 'Woolworths', rate: 'Up to 4%' }, { name: 'Coles', rate: 'Up to 3%' }, 
  { name: 'Kmart', rate: 'Up to 5%' }, { name: 'Target', rate: 'Up to 4%' },
  { name: 'Bunnings', rate: 'Up to 2%' }, { name: 'Big W', rate: 'Up to 3.5%' }, 
  { name: 'Myer', rate: 'Up to 6%' }, { name: 'David Jones', rate: 'Up to 5%' },
  { name: 'JB Hi-Fi', rate: 'Up to 3%' }, { name: 'The Good Guys', rate: 'Up to 3%' }, 
  { name: 'Catch', rate: 'Up to 4%' }, { name: 'Amazon AU', rate: 'Up to 5%' },
  { name: 'Chemist Whouse', rate: 'Up to 5%' }, { name: 'Priceline', rate: 'Up to 4%' }, 
  { name: 'eBay', rate: 'Up to 2%' }, { name: 'The Iconic', rate: 'Up to 8%' },
  { name: 'Rebel Sport', rate: 'Up to 5%' }, { name: 'BCF', rate: 'Up to 4%' }, 
  { name: 'Officeworks', rate: 'Up to 3%' }, { name: 'Dan Murphy\'s', rate: 'Up to 2%' }
];

const scrollCoupons = [
  { store: 'The Iconic', deal: '20% Off Winter Sale', code: 'WINTER20' },
  { store: 'Chemist Warehouse', deal: 'Free Shipping > $50', code: 'FREESHIP' },
  { store: 'DoorDash', deal: '$10 Off First 3', code: 'DASH10' },
  { store: 'Myer', deal: '15% Off Fragrances', code: 'SCENT15' },
  { store: 'Catch', deal: '$20 Off Tech Orders', code: 'TECHCATCH20' },
];

const blogPosts = [
  { category: 'Impact Story', title: 'How your groceries bought a transport van for Vinnies.', img: '🚐' },
  { category: 'Upcoming Event', title: 'Join the National Givebly Walk for Mental Health this October.', img: '👟' },
  { category: 'Platform News', title: 'We just crossed $100,000 donated to Aussie charities!', img: '🎉' },
  { category: 'Charity Spotlight', title: 'Meet the volunteers rescuing wildlife in QLD.', img: '🐨' },
  { category: 'Learn & Earn', title: 'How to maximize your Double Impact shopping trips.', img: '📈' },
];

export default function UserDashboard() {
  const [activeCharity, setActiveCharity] = useState('Salvation Army');

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* --- MASTER STICKY HEADER BLOCK --- */}
      <div className="sticky top-0 z-50 shadow-lg">
        
        {/* 1. LIVE TICKER */}
        <div className="w-full bg-[#1A2B48] border-b border-[#2ECC71]/20 text-[#2ECC71] py-1.5 text-xs font-bold flex justify-center items-center overflow-hidden relative">
          <span className="animate-pulse">⚡ LIVE: Sarah just earned $8.50 at Woolworths &nbsp; • &nbsp; We are $420 away from the Vinnies transport van! &nbsp; • &nbsp; Trent unlocked Diamond Status 💎</span>
        </div>

        {/* 2. MAIN NAV */}
        <nav className="bg-[#1A2B48] text-white py-4 relative z-20">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center gap-4">
            <div className="flex items-center gap-6 w-1/3">
              <h1 className="text-2xl font-bold tracking-tight cursor-pointer">Givebly</h1>
              <div className="relative hidden lg:block cursor-pointer">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-[#2ECC71] hover:text-white transition bg-white/10 px-3 py-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                  <span className="text-gray-100">Categories</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
        
        {/* 3. PERMANENT SUB-MENU */}
        <div className="w-full bg-white border-b border-gray-200 z-10">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex justify-center items-center gap-4 text-xs font-bold text-[#1A2B48]">
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>⚡</span> Today's Double</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>✂️</span> Coupons</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>🛍️</span> Referral Gifts</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>🎯</span> Daily Bonus</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>🎓</span> Learn & Earn</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="flex items-center gap-1.5 text-[#2ECC71] hover:text-[#27AE60] transition"><span>🤝</span> Partner Charities</a>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* ROW 1: HERO BANNER & COMPRESSED METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col justify-center text-white relative overflow-hidden">
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

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100 flex flex-col relative overflow-hidden">
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1">Your Wallet</p>
              <h2 className="text-3xl font-black text-[#1A2B48] mb-1">$42.50</h2>
              <p className="text-[#2ECC71] font-bold text-xs mb-3">+ $4.20 pending</p>
              <button className="mt-auto bg-[#1A2B48] text-white font-bold py-2 rounded-xl text-sm w-full">Withdraw</button>
            </div>
            <div className="bg-[#1A2B48] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-800 flex flex-col text-white relative overflow-hidden">
              <p className="text-xs font-extrabold text-blue-300 uppercase tracking-widest mb-1">Charity Impact</p>
              <h2 className="text-3xl font-black mb-1">$42.50</h2>
              <p className="text-gray-300 font-medium text-xs mb-3 truncate">For <b>{activeCharity}</b></p>
              <button className="mt-auto bg-[#2ECC71] text-[#1A2B48] font-bold py-2 rounded-xl text-sm w-full">View Impact</button>
            </div>
          </div>
        </div>

        {/* ROW 2: DATA DASHBOARD (Graph, Ring, Community) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 flex flex-col justify-between">
            <h3 className="text-sm font-extrabold text-[#1A2B48] uppercase tracking-wide">6-Month Impact</h3>
            <svg className="w-full h-16 mt-4" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,30 Q20,25 40,20 T80,10 T100,5" fill="none" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round"/>
              <path d="M0,30 Q20,25 40,20 T80,10 T100,5 L100,30 L0,30 Z" fill="rgba(46, 204, 113, 0.1)" />
            </svg>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 flex items-center gap-4">
            <div className="relative h-16 w-16 flex items-center justify-center rounded-full border-4 border-gray-100 shadow-sm">
              <div className="absolute inset-0 rounded-full border-4 border-[#2ECC71] border-r-transparent border-t-transparent rotate-45"></div>
              <span className="font-bold text-sm text-[#1A2B48]">65%</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1A2B48] uppercase">Christmas Fund</h3>
              <p className="text-xs text-gray-500">$325 / $500 Goal</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl shadow-lg p-5 text-white flex flex-col justify-center border border-teal-700">
            <h3 className="text-sm font-bold uppercase mb-2">Community Goal: Vinnies Van</h3>
            <div className="w-full bg-black/20 rounded-full h-3 mb-1 shadow-inner">
              <div className="bg-white h-3 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs font-semibold text-teal-100 text-right">85% Funded</p>
          </div>
        </div>

        {/* ROW 3: TURBO BOOST */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3 flex items-center gap-2">🚀 Givebly Turbo Boost</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scroll-bar">
            {turboBoosts.map((boost) => (
              <div key={boost.name} className="min-w-[220px] bg-white rounded-xl shadow-lg border-b-4 border-[#2ECC71] p-4 hover:-translate-y-2 transition-all cursor-pointer">
                <div className={`text-lg font-black ${boost.color} mb-3`}>[ {boost.name} ]</div>
                <div className="flex items-end gap-2">
                  <span className="text-gray-400 line-through text-xs font-semibold">{boost.old}</span>
                  <span className="text-[#2ECC71] text-2xl font-black leading-none drop-shadow-sm">{boost.new}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 4: CATEGORY CAROUSEL */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3 flex items-center gap-2">🛍️ Shop by Category</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scroll-bar">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center min-w-[140px] group cursor-pointer">
                <div className={`h-16 w-full ${cat.bg} rounded-xl shadow-md border border-black/5 flex items-center justify-center gap-3 group-hover:shadow-xl group-hover:-translate-y-1 transition-all`}>
                  <span className="text-2xl opacity-80">{cat.icon1}</span>
                  <span className="text-2xl opacity-80">{cat.icon2}</span>
                </div>
                <span className="text-xs font-extrabold text-[#1A2B48] mt-2 group-hover:text-[#2ECC71] transition">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 5: TRENDING STORES */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3 flex items-center gap-2">🔥 Trending This Week</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scroll-bar">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="min-w-[160px] bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="h-10 w-10 bg-gray-100 rounded-full mb-2 shadow-inner"></div>
                <span className="text-sm font-bold text-[#1A2B48]">Store {i}</span>
                <span className="text-xs font-bold text-[#2ECC71]">Up to 8%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 6: DAILY DOUBLE */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-5 flex items-center gap-5 cursor-pointer">
            <div className="h-16 w-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center font-bold text-gray-400 shadow-inner">Myer</div>
            <div>
              <h4 className="font-bold text-[#1A2B48] text-lg leading-none mb-1">Myer</h4>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Was 3%</span>
                <span className="text-lg font-black text-[#2ECC71] drop-shadow-sm">Now 6%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-5 flex items-center gap-5 cursor-pointer">
            <div className="h-16 w-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center font-bold text-gray-400 shadow-inner">Iconic</div>
            <div>
              <h4 className="font-bold text-[#1A2B48] text-lg leading-none mb-1">The Iconic</h4>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Was 4%</span>
                <span className="text-lg font-black text-[#2ECC71] drop-shadow-sm">Now 8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 7: DISCOUNTED GIFT CARDS (DOUBLED TO 2 ROWS) */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3">Discounted Gift Cards</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {giftCards.map((card, index) => (
              <div key={index} className={`bg-gradient-to-br ${card.bg} rounded-xl h-24 p-2 flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-white/50 relative group`}>
                <div className="bg-white rounded-lg shadow-sm w-10 h-10 flex items-center justify-center mb-1"><span className={`text-[8px] font-black ${card.text} uppercase text-center leading-tight`}>{card.name}</span></div>
                <span className="text-[#1A2B48] text-[10px] font-bold bg-white/80 px-2 rounded-full shadow-sm">3% Off</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 8: COUPONS & ACTION HUBS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-200 p-5 relative hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#1A2B48] text-white rounded-full flex items-center justify-center shadow-md text-xs">✂️</div>
            <span className="text-xs font-bold text-gray-400 uppercase mb-1">The Iconic</span>
            <h4 className="text-md font-extrabold text-[#1A2B48] mb-3">20% Off Winter Sale</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3 flex justify-between items-center cursor-pointer hover:border-[#2ECC71] shadow-inner">
              <span className="font-mono font-bold text-gray-600 text-sm">WINTER20</span>
              <span className="text-[10px] font-bold uppercase">Copy</span>
            </div>
          </div>

          <div className="bg-[#1A2B48] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 text-white flex flex-col justify-between">
            <div>
              <h4 className="text-md font-extrabold text-[#2ECC71] mb-1">Invite & Earn $10</h4>
              <p className="text-xs text-gray-300">Give $10 to a friend, get $10 for your wallet.</p>
            </div>
            <div className="bg-white/10 rounded-lg py-1.5 px-3 flex justify-between items-center cursor-pointer hover:bg-white/20 shadow-inner">
              <span className="font-mono text-sm">givebly.com/ref/trent</span>
              <span className="text-[10px] font-bold uppercase">Copy</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#2ECC71] to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 text-[#1A2B48] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20 text-4xl drop-shadow-md">💻</div>
            <div>
              <h4 className="text-md font-extrabold mb-1 drop-shadow-sm">Never Miss Cash</h4>
              <p className="text-xs font-medium mb-3">Get the Chrome Extension.</p>
            </div>
            <button className="bg-[#1A2B48] text-white text-xs font-bold py-2 rounded-lg w-full shadow-md hover:bg-gray-800 transition">Install Now</button>
          </div>
        </div>

        {/* ROW 9: BADGES & POLAROIDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-[#2ECC71] hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-sm font-extrabold text-[#1A2B48] mb-4">Your Trophy Cabinet</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {trophyRow1.concat(trophyRow2).map((trophy, i) => (
                <div key={i} className={`relative bg-gray-50 border border-gray-200 rounded-lg aspect-square flex flex-col items-center justify-center p-1 group shadow-sm ${trophy.unlocked ? '' : 'opacity-40 grayscale'}`}>
                  <span className="text-lg mb-1 drop-shadow-sm">{trophy.icon}</span>
                  <span className="text-[6px] font-bold text-center leading-tight text-[#1A2B48]">{trophy.name}</span>
                  
                  {trophy.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center -rotate-12 pointer-events-none">
                      <span className="text-red-500 border border-red-500 bg-white/90 font-black text-[5px] px-1 tracking-widest uppercase shadow-sm">Stamped</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100 relative overflow-hidden flex flex-col justify-between">
            <h3 className="text-sm font-extrabold text-[#1A2B48] mb-4 z-20">See Your Impact</h3>
            
            <div className="flex gap-4 overflow-visible z-20 w-1/2">
              <div className="bg-gray-50 p-2 pb-6 border border-gray-200 shadow-md transform -rotate-2 hover:scale-110 transition cursor-pointer bg-white">
                <div className="h-20 w-24 bg-orange-100 flex items-center justify-center text-3xl shadow-inner">🐶</div>
                <p className="text-[8px] font-handwriting mt-2 text-center text-gray-600">You fed Buster!</p>
              </div>
              <div className="bg-gray-50 p-2 pb-6 border border-gray-200 shadow-md transform rotate-3 hover:scale-110 transition cursor-pointer bg-white">
                <div className="h-20 w-24 bg-blue-100 flex items-center justify-center text-3xl shadow-inner">💙</div>
                <p className="text-[8px] font-handwriting mt-2 text-center text-gray-600">Flood relief prep</p>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
              <div className="absolute top-8 right-6 w-16 h-20 bg-white border border-gray-200 shadow-sm transform rotate-12 opacity-50 blur-[1px]"></div>
              <div className="absolute top-2 right-16 w-16 h-20 bg-white border border-gray-200 shadow-sm transform -rotate-12 opacity-40 blur-[1.5px] scale-90"></div>
              <div className="absolute top-14 right-24 w-16 h-20 bg-white border border-gray-200 shadow-sm transform rotate-6 opacity-30 blur-[2px] scale-75"></div>
              <div className="absolute -bottom-2 right-10 w-16 h-20 bg-white border border-gray-200 shadow-sm transform -rotate-6 opacity-25 blur-[2px] scale-90"></div>
              <div className="absolute top-4 right-32 w-16 h-20 bg-white border border-gray-200 shadow-sm transform rotate-45 opacity-20 blur-[3px] scale-50"></div>
              <div className="absolute bottom-6 right-28 w-16 h-20 bg-white border border-gray-200 shadow-sm transform -rotate-45 opacity-15 blur-[3px] scale-50"></div>
            </div>
          </div>
        </div>

        {/* --- ROW 10: CONDENSED POPULAR STORES --- */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-4">Australia's Everyday Favorites</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularStores.map((store, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 p-3 flex items-center gap-3 transition cursor-pointer">
                <div className="h-8 w-8 bg-gray-50 rounded border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-inner shrink-0">Logo</div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold text-[#1A2B48] leading-none truncate">{store.name}</span>
                  <span className="text-xs font-bold text-[#2ECC71] mt-0.5">{store.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- ROW 11: SCROLLING PROMO CODES --- */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
            Top Promo Codes
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scroll-bar">
            {scrollCoupons.map((coupon, index) => (
              <div key={index} className="min-w-[260px] max-w-[280px] bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-200 p-5 relative hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#1A2B48] text-white rounded-full flex items-center justify-center shadow-md text-xs">✂️</div>
                <span className="text-xs font-bold text-gray-400 uppercase mb-1">{coupon.store}</span>
                <h4 className="text-md font-extrabold text-[#1A2B48] mb-4 flex-1">{coupon.deal}</h4>
                <div className="mt-auto bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3 flex justify-between items-center cursor-pointer hover:border-[#2ECC71] shadow-inner">
                  <span className="font-mono font-bold text-gray-600 text-sm tracking-wide">{coupon.code}</span>
                  <span className="text-[10px] font-bold uppercase">Copy</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- ROW 12: IMPACT & MISSION BLOGS --- */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            Why We Give: Latest Impact
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scroll-bar">
            {blogPosts.map((post, index) => (
              <div key={index} className="min-w-[300px] max-w-[320px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Blog Image Placeholder */}
                <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl shadow-inner border-b border-gray-100">
                  {post.img}
                </div>
                {/* Blog Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-extrabold text-[#2ECC71] uppercase tracking-wider mb-2">{post.category}</span>
                  <h4 className="text-[#1A2B48] font-bold leading-tight flex-1">{post.title}</h4>
                  <p className="text-xs text-blue-600 font-bold mt-4 cursor-pointer hover:underline">Read full story &rarr;</p>
                </div>
                {/* Social Share Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-3 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Share Impact</span>
                  <div className="flex gap-2">
                    <button className="h-7 w-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </button>
                    <button className="h-7 w-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-black/5 hover:text-black hover:border-black/20 transition text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </button>
                    <button className="h-7 w-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}