'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- STATIC DATA ARRAYS ---
const categories = [
  { name: 'Travel & Adv.', bg: 'bg-blue-100', icon1: '✈️', icon2: '⛱️' },
  { name: 'Tech & Audio', bg: 'bg-gray-200', icon1: '💻', icon2: '🎧' },
  { name: 'Beauty & Care', bg: 'bg-pink-100', icon1: '💄', icon2: '✨' },
  { name: 'Food & Drink', bg: 'bg-orange-100', icon1: '🍔', icon2: '🍷' },
  { name: 'Finance', bg: 'bg-green-100', icon1: '🐷', icon2: '💵' },
  { name: 'Apparel', bg: 'bg-purple-100', icon1: '👕', icon2: '👖' },
  { name: 'Home & Yard', bg: 'bg-yellow-100', icon1: '🏠', icon2: '🌴' },
];

const gcStyles = [
  { bg: 'from-green-400/20 to-emerald-600/20', text: 'text-green-700' },
  { bg: 'from-gray-400/20 to-black/20', text: 'text-black' },
  { bg: 'from-green-500/20 to-red-500/20', text: 'text-green-800' },
  { bg: 'from-red-400/20 to-red-600/20', text: 'text-red-600' },
  { bg: 'from-gray-200 to-gray-300', text: 'text-gray-800' },
  { bg: 'from-yellow-300/30 to-yellow-500/30', text: 'text-yellow-700' },
  { bg: 'from-orange-300/20 to-orange-500/20', text: 'text-orange-600' },
  { bg: 'from-blue-400/20 to-blue-600/20', text: 'text-blue-600' },
  { bg: 'from-blue-600/20 to-indigo-800/20', text: 'text-blue-800' },
  { bg: 'from-pink-400/20 to-rose-600/20', text: 'text-pink-600' },
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
  const router = useRouter(); 
  const [activeCharity, setActiveCharity] = useState('Salvation Army');
  const [liveStores, setLiveStores] = useState<any[]>([]);
  
  // SECURE USER STATES
  const [userName, setUserName] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    async function initializeDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const name = user.user_metadata?.full_name?.split(' ')[0] || 'User';
      setUserName(name);
      setWalletBalance(0);

      const { data: storeData } = await supabase.from('stores').select('*');
      if (storeData) setLiveStores(storeData);
      setIsLoading(false);
    }
    initializeDashboard();
  }, [router]);

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-bold text-[#1A2B48]">Loading dashboard...</div>;

  // FILTERS
  const turboStores = liveStores.filter(store => store.is_turbo);
  const trendingStores = liveStores.filter(store => store.is_trending);
  const everydayStores = liveStores.filter(store => store.is_everyday);
  const giftcardStores = liveStores.filter(store => store.has_giftcard);

  // SCROLL CONTROLLERS
  const scrollContainer = (id: string, amount: number) => {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* GLOBAL STYLES TO HIDE SCROLLBARS */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- MASTER STICKY HEADER BLOCK --- */}
      <div className="sticky top-0 z-50 shadow-lg">
        <div className="w-full bg-[#1A2B48] border-b border-[#2ECC71]/20 text-[#2ECC71] py-1.5 text-xs font-bold flex justify-center items-center overflow-hidden relative">
          <span className="animate-pulse">⚡ LIVE: Sarah just earned $8.50 at Woolworths &nbsp; • &nbsp; We are $420 away from the Vinnies transport van! &nbsp; • &nbsp; {userName} unlocked Diamond Status 💎</span>
        </div>

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
              <a href="#" className="hidden md:flex items-center gap-1.5 text-[#2ECC71] hover:text-white transition font-bold text-sm">🎁 Rewards</a>
              <span className="text-white/20 hidden md:block">|</span>
              <span className="text-sm font-semibold hidden md:block text-gray-200">Welcome back, {userName}</span>
              <div className="h-10 w-10 rounded-full bg-[#2ECC71] text-[#1A2B48] flex items-center justify-center font-extrabold shadow-md cursor-pointer border-2 border-[#1A2B48] relative">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
                <div className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full h-4 w-4 border-2 border-[#1A2B48] flex items-center justify-center shadow-lg animate-bounce"><span className="text-[8px] text-white font-bold">1</span></div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* SUB-NAVIGATION MENU - FULLY RESTORED */}
        <div className="w-full bg-white border-b border-gray-200 z-10 hidden md:block">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex justify-center items-center gap-6 text-xs font-bold text-[#1A2B48]">
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>⚡</span> Today's Double</a>
            <span className="text-gray-200">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>✂️</span> Coupons</a>
            <span className="text-gray-200">|</span>
            {/* THE MAGIC ACADEMY LINK */}
            <Link href="/learn" className="flex items-center gap-1.5 text-[#2ECC71] hover:text-green-700 transition">
              <span>🎓</span> Learn & Earn
            </Link>
            <span className="text-gray-200">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#2ECC71] transition"><span>🤝</span> Partner Charities</a>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* ROW 1: HERO BANNER & METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl shadow-lg p-8 flex flex-col justify-center text-white relative overflow-hidden">
            <span className="bg-[#2ECC71] text-[#1A2B48] text-xs font-bold px-3 py-1 rounded-full mb-4 w-max shadow-sm uppercase">Charity of the Month</span>
            <h2 className="text-4xl font-extrabold mb-2">Double Impact for RSPCA 🐾</h2>
            <p className="text-blue-100 font-medium max-w-md">Every dollar you earn this week is matched 100% by our sponsors to help rescue animals.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 flex flex-col">
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1">Your Wallet</p>
              <h2 className="text-3xl font-black text-[#1A2B48] mb-1">${walletBalance.toFixed(2)}</h2>
              
              <Link href="/trips" className="text-[#2ECC71] hover:text-green-700 font-bold text-xs mb-3 flex items-center gap-1 transition cursor-pointer w-max">
                View Shopping History &rarr;
              </Link>
              
              <button className="mt-auto bg-[#1A2B48] text-white font-bold py-2 rounded-xl text-sm w-full">Withdraw</button>
            </div>
            <div className="bg-[#1A2B48] rounded-2xl shadow-lg p-5 border border-gray-800 flex flex-col text-white relative overflow-hidden">
              <p className="text-xs font-extrabold text-blue-300 uppercase tracking-widest mb-1">Charity Impact</p>
              <h2 className="text-3xl font-black mb-1">${walletBalance.toFixed(2)}</h2>
              <p className="text-gray-300 font-medium text-xs mb-3 truncate">For <b>{activeCharity}</b></p>
              <Link href="/rewards" className="mt-auto bg-[#2ECC71] text-[#1A2B48] font-bold py-2 rounded-xl text-sm w-full text-center block">View Impact</Link>
            </div>
          </div>
        </div>

        {/* RESTORED: ROW 2: DATA DASHBOARD */}
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

        {/* --- NEW STYLING: TURBO BOOST (SPLIT SQUARES) --- */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-xl font-bold text-[#1A2B48] flex items-center gap-2">🚀 Givebly Turbo Boost</h3>
            <div className="flex gap-2">
              <button onClick={() => scrollContainer('turbo-scroll', -300)} className="h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold">&larr;</button>
              <button onClick={() => scrollContainer('turbo-scroll', 300)} className="h-8 w-8 rounded-full bg-[#1A2B48] shadow-sm flex items-center justify-center hover:bg-gray-800 text-white font-bold">&rarr;</button>
            </div>
          </div>
          
          <div id="turbo-scroll" className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
            {turboStores.length > 0 ? turboStores.map((store) => (
              <Link href={`/activate/${store.id}`} key={store.id} className="min-w-[180px] max-w-[180px] h-[220px] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden shrink-0 snap-start hover:-translate-y-1 transition-transform group">
                <div className="h-1/2 w-full bg-[#1A2B48] relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-purple-600/40 blur-xl scale-150 mix-blend-overlay"></div>
                  <div className="h-12 w-12 bg-white rounded-full p-2 shadow-xl z-10 flex items-center justify-center">
                    {store.logo_url ? <img src={store.logo_url} className="h-full w-full object-contain" /> : <span className="text-xs font-bold text-gray-400">LOGO</span>}
                  </div>
                </div>
                <div className="h-1/2 w-full flex flex-col bg-white">
                  <div className="flex-1 flex flex-col justify-center items-center border-b border-gray-100 px-2">
                    <span className="font-extrabold text-[#1A2B48] text-sm text-center truncate w-full">{store.name}</span>
                    <span className="text-xs text-gray-400 line-through font-semibold mt-0.5">{store.reward_text}</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-gray-50 group-hover:bg-[#2ECC71]/10 transition-colors">
                    <span className="text-xl font-black text-[#2ECC71] drop-shadow-sm">{store.reward_bonus || store.reward_text}</span>
                  </div>
                </div>
              </Link>
            )) : <p className="text-sm font-bold text-gray-400">Loading Turbo Boosts...</p>}
          </div>
        </div>

        {/* --- NEW STYLING: DISCOUNTED GIFT CARDS --- */}
        <div className="mb-10 relative">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-xl font-bold text-[#1A2B48]">Discounted Gift Cards</h3>
            <div className="flex gap-2">
              <button onClick={() => scrollContainer('gc-scroll', -400)} className="h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold">&larr;</button>
              <button onClick={() => scrollContainer('gc-scroll', 400)} className="h-8 w-8 rounded-full bg-[#1A2B48] shadow-sm flex items-center justify-center hover:bg-gray-800 text-white font-bold">&rarr;</button>
            </div>
          </div>

          <div id="gc-scroll" className="grid grid-rows-2 grid-flow-col auto-cols-[160px] gap-3 overflow-x-auto no-scrollbar pb-4 snap-x">
            {giftcardStores.length > 0 ? giftcardStores.map((store, index) => {
              const style = gcStyles[index % gcStyles.length];
              return (
                <Link href={`/activate/${store.id}`} key={store.id} className={`bg-gradient-to-br ${style.bg} rounded-xl h-[100px] p-2 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-white/50 relative group snap-start shrink-0`}>
                  <div className="h-12 w-16 flex items-center justify-center mb-1">
                    {store.logo_url ? (
                      <img src={store.logo_url} alt={store.name} className="h-full w-full object-contain mix-blend-multiply" />
                    ) : (
                      <span className={`text-xs font-black ${style.text} uppercase text-center`}>{store.name.substring(0,6)}</span>
                    )}
                  </div>
                  <div className="bg-white/90 px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 mt-1">
                    {store.reward_giftcard_bonus ? (
                      <>
                        <span className="text-gray-400 text-[9px] line-through font-bold">{store.reward_giftcard || store.reward_text}</span>
                        <span className="text-[#2ECC71] text-[11px] font-black">{store.reward_giftcard_bonus}</span>
                      </>
                    ) : (
                      <span className="text-[#1A2B48] text-[11px] font-bold">{store.reward_giftcard || store.reward_text}</span>
                    )}
                  </div>
                </Link>
              );
            }) : <p className="col-span-6 text-sm font-bold text-gray-400">Loading Gift Cards...</p>}
          </div>
        </div>

        {/* CATEGORY CAROUSEL */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3">🛍️ Shop by Category</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center min-w-[140px] group cursor-pointer">
                <div className={`h-16 w-full ${cat.bg} rounded-xl shadow-md flex items-center justify-center gap-3 hover:-translate-y-1 transition-all`}>
                  <span className="text-2xl">{cat.icon1}</span>
                  <span className="text-2xl">{cat.icon2}</span>
                </div>
                <span className="text-xs font-extrabold text-[#1A2B48] mt-2 group-hover:text-[#2ECC71] transition">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RESTORED: TRENDING THIS WEEK */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-3 flex items-center gap-2">🔥 Trending This Week</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {trendingStores.length > 0 ? trendingStores.map(store => (
              <Link href={`/activate/${store.id}`} key={store.id} className="min-w-[160px] bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="h-10 w-10 bg-white rounded-full mb-2 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden p-1">
                  {store.logo_url ? <img src={store.logo_url} className="h-full w-full object-contain" /> : <span className="text-[8px] text-gray-300">LOGO</span>}
                </div>
                <span className="text-sm font-bold text-[#1A2B48] truncate w-full text-center">{store.name}</span>
                <span className="text-xs font-bold text-[#2ECC71] mt-1">{store.reward_bonus || store.reward_text}</span>
              </Link>
            )) : <p className="text-sm font-bold text-gray-400">Loading Trending Stores...</p>}
          </div>
        </div>

        {/* RESTORED: MYER & ICONIC CARDS */}
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

        {/* RESTORED: ACTION HUBS */}
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

        {/* RESTORED: TROPHY CABINET & POLAROIDS */}
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

        {/* RESTORED: LIVE DATABASE FEED */}
        <div className="mb-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent opacity-50"></div>
          
          <h3 className="text-xl font-bold text-[#1A2B48] mb-4 flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#2ECC71]"></span>
            </span>
            Live Database Feed
          </h3>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {liveStores.length > 0 ? (
              liveStores.map((store: any) => (
                <Link href={`/activate/${store.id}`} key={store.id} className="min-w-[160px] bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 p-4 flex flex-col items-center transition-shadow cursor-pointer block">
                  {store.logo_url ? (
                    <div className="h-12 w-12 bg-white rounded-full mb-3 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden p-1">
                      <img src={store.logo_url} alt={store.name} className="h-full w-full object-contain" />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-gray-50 rounded-full mb-3 shadow-inner flex items-center justify-center border border-gray-100">
                      <span className="text-[8px] font-bold text-gray-300 uppercase">Logo</span>
                    </div>
                  )}

                  <span className="text-sm font-extrabold text-[#1A2B48] text-center mb-1">{store.name}</span>
                  <span className="text-xs font-bold text-[#2ECC71]">{store.reward_text}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded mt-3 uppercase tracking-wider">{store.category}</span>
                </Link>
              ))
            ) : (
              <div className="w-full text-center py-6 text-sm font-bold text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                Fetching live data from Supabase...
              </div>
            )}
          </div>
        </div>

        {/* EVERYDAY FAVORITES */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-4">Australia's Everyday Favorites</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {everydayStores.length > 0 ? everydayStores.map((store) => (
              <Link href={`/activate/${store.id}`} key={store.id} className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 p-3 flex items-center gap-3 transition cursor-pointer">
                <div className="h-8 w-8 bg-white rounded flex items-center justify-center overflow-hidden mix-blend-multiply">
                  {store.logo_url ? <img src={store.logo_url} className="h-full w-full object-contain" /> : <span className="text-[8px] font-bold text-gray-400">Logo</span>}
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold text-[#1A2B48] truncate">{store.name}</span>
                  <span className="text-xs font-bold text-[#2ECC71]">{store.reward_text}</span>
                </div>
              </Link>
            )) : <p className="text-sm font-bold text-gray-400">Loading Everyday Favorites...</p>}
          </div>
        </div>

        {/* RESTORED: TOP PROMO CODES */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
            Top Promo Codes
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
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

        {/* RESTORED: IMPACT BLOGS */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#1A2B48] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            Why We Give: Latest Impact
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {blogPosts.map((post, index) => (
              <div key={index} className="min-w-[300px] max-w-[320px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl shadow-inner border-b border-gray-100">
                  {post.img}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-extrabold text-[#2ECC71] uppercase tracking-wider mb-2">{post.category}</span>
                  <h4 className="text-[#1A2B48] font-bold leading-tight flex-1">{post.title}</h4>
                  <p className="text-xs text-blue-600 font-bold mt-4 cursor-pointer hover:underline">Read full story &rarr;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}