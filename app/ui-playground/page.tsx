'use client';

import React from 'react';
import Link from 'next/link';

export default function UIPlayground() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 pb-32">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-gray-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#1A2B48] mb-2">Givebly UI Playground</h1>
            <p className="text-gray-500 font-medium">Batch 1: 10 creative aesthetics for your data rows.</p>
          </div>
          <Link href="/dashboard" className="bg-[#1A2B48] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* STYLE 01: NEUMORPHISM */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 01: The Neumorphic Float (Soft 3D)</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar p-4 bg-[#F8F9FA]">
            {[1,2,3,4].map(i => (
              <div key={i} className="min-w-[280px] h-[140px] bg-[#F8F9FA] rounded-[2rem] shadow-[10px_10px_20px_#d1d5db,-10px_-10px_20px_#ffffff] p-6 flex items-center justify-between cursor-pointer hover:shadow-[inset_5px_5px_10px_#d1d5db,inset_-5px_-5px_10px_#ffffff] transition-all">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">JB Hi-Fi</span>
                  <span className="text-3xl font-black text-[#1A2B48]">4% <span className="text-sm text-[#2ECC71]">Cashback</span></span>
                </div>
                <div className="h-16 w-16 bg-white rounded-full shadow-inner flex items-center justify-center border-2 border-gray-50">
                  <span className="font-bold text-gray-300 text-xs">LOGO</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 02: GLASSMORPHISM */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 02: Glassmorphism Promo (Vibrant blur)</h2>
          <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
            {[1,2,3].map(i => (
              <div key={i} className="min-w-[320px] h-[180px] rounded-3xl relative overflow-hidden group cursor-pointer shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-tr ${i%2===0 ? 'from-orange-400 via-pink-500 to-purple-500' : 'from-blue-400 via-teal-500 to-emerald-500'} group-hover:scale-110 transition-transform duration-700`}></div>
                
                <div className="absolute inset-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/30 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">Ending Soon</span>
                    <div className="h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[10px] font-bold">Iconic</div>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-2xl drop-shadow-md">The Iconic Sale</h3>
                    <p className="text-white/90 font-bold text-sm drop-shadow-sm">Boosted to 15% Cash Back</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 03: EDITORIAL MINIMALISM */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 03: Editorial Magazine Grid (Strict, Clean)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-gray-200 border border-gray-200 overflow-hidden rounded-2xl">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white aspect-square p-6 flex flex-col items-center justify-center hover:bg-[#1A2B48] hover:text-white transition-colors cursor-pointer group">
                <div className="h-14 w-14 bg-gray-50 border border-gray-100 rounded-full mb-4 group-hover:bg-white/10 group-hover:border-white/20 transition-colors flex items-center justify-center text-xs text-gray-400">Logos</div>
                <span className="font-black tracking-tight text-lg mb-1">Myer</span>
                <span className="text-[#2ECC71] font-bold text-sm">Up to 6%</span>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 04: DARK MODE NEON */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 04: Dark Mode Neon (Gaming/Tech Vibe)</h2>
          <div className="flex gap-5 overflow-x-auto pb-8 no-scrollbar bg-gray-900 p-8 rounded-3xl">
            {[1,2,3,4].map(i => (
              <div key={i} className="min-w-[200px] h-[240px] bg-gray-800 border border-gray-700 rounded-2xl p-5 flex flex-col relative overflow-hidden group cursor-pointer hover:border-[#2ECC71] transition-colors shadow-2xl">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2ECC71] blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="h-14 w-14 bg-gray-700 rounded-xl mb-auto flex items-center justify-center border border-gray-600 shadow-inner">
                  <span className="text-white text-xs font-bold">LOGO</span>
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Electronics</span>
                <span className="text-white font-black text-xl mb-1">JB Hi-Fi</span>
                <span className="text-[#2ECC71] font-bold text-2xl drop-shadow-[0_0_8px_rgba(46,204,113,0.5)]">4.5%</span>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 05: THE MICRO-TICKET */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 05: The Micro-Ticket (Great for dense lists)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-xl border-l-4 border-dashed border-[#1A2B48] p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative">
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-4 bg-[#F8F9FA] rounded-r-full border-r border-[#1A2B48]"></div>
                <div className="flex items-center gap-4 ml-2">
                  <div className="h-10 w-10 bg-blue-50 text-blue-600 font-black rounded-lg flex items-center justify-center text-lg shadow-inner">W</div>
                  <div>
                    <h4 className="font-bold text-[#1A2B48] leading-tight">Woolworths</h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Groceries</span>
                  </div>
                </div>
                <span className="bg-green-50 text-green-700 font-black text-sm px-3 py-1 rounded-full border border-green-100">3%</span>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 06: APPLE-STYLE BENTO BOX */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 06: Apple Bento Box (Soft, large radius, minimal)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-[32px] p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border border-gray-50">
                <div className="h-16 w-16 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center text-xs font-bold text-gray-300 shadow-inner">Logo</div>
                <span className="font-extrabold text-[#1A2B48] text-center w-full truncate">Amazon AU</span>
                <span className="text-[#2ECC71] font-bold text-sm bg-green-50 px-3 py-1 rounded-full mt-2">Up to 5%</span>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 07: THE PILL BADGE */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 07: The Pill Badge (Ultra-compact, flowing)</h2>
          <div className="flex flex-wrap gap-3">
            {[1,2,3,4,5,6,7,8,9].map(i => (
              <div key={i} className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-3 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer border border-gray-200">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-[8px] font-bold text-gray-400">Logo</div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#1A2B48] leading-none">Bunnings</span>
                  <span className="text-[10px] font-bold text-[#2ECC71]">2% Cash Back</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 08: THE FLOATING RIBBON */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 08: The Floating Ribbon (Overlapping 3D effect)</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar">
            {[1,2,3,4].map(i => (
              <div key={i} className="min-w-[240px] bg-white rounded-xl p-5 shadow-md border border-gray-100 relative mt-4 cursor-pointer hover:-translate-y-2 transition-transform">
                {/* The Ribbon */}
                <div className="absolute -top-4 -left-2 bg-[#2ECC71] text-[#1A2B48] text-[10px] font-black uppercase px-4 py-1.5 shadow-lg rounded-r-full rounded-tl-full border-b-2 border-green-600">
                  Featured Partner
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="h-12 w-12 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-bold">Logo</div>
                  <span className="text-2xl font-black text-[#1A2B48]">8%</span>
                </div>
                <h4 className="font-extrabold text-[#1A2B48] text-lg mt-4 border-t border-gray-100 pt-3">The Good Guys</h4>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 09: THE BRUTALIST BLOCK */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 09: Brutalist Block (Thick borders, heavy fonts)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-yellow-300 border-4 border-black p-4 flex flex-col hover:bg-[#2ECC71] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0px_#000] transition-all cursor-pointer shadow-[-4px_4px_0px_#000]">
                <div className="h-12 w-12 bg-white border-2 border-black flex items-center justify-center font-black mb-4">DJ</div>
                <span className="font-black text-black text-xl uppercase leading-tight">David Jones</span>
                <div className="mt-auto pt-4 flex justify-between items-end">
                  <span className="text-xs font-bold text-black uppercase">Earn</span>
                  <span className="text-3xl font-black text-black">5%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STYLE 10: E-COMMERCE HOLOGRAM */}
        <section className="mb-16">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase">Style 10: E-Commerce Hologram (Clean with glowing hovers)</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bg-white rounded-lg p-4 border border-gray-100 flex flex-col items-center cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                {/* Holographic sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="h-16 w-16 mb-3 relative z-10 flex items-center justify-center">
                  <div className="h-full w-full bg-gray-50 rounded-full border border-gray-100 shadow-inner flex items-center justify-center text-[10px] text-gray-400 font-bold">Logo</div>
                </div>
                <span className="text-sm font-bold text-gray-800 relative z-10">Priceline</span>
                <span className="text-xs text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded mt-1 relative z-10">Up to 4%</span>
              </div>
            ))}
          </div>
        </section>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}} />

      </div>
    </div>
  );
}