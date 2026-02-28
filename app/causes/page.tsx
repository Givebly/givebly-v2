'use client';

import React, { useState } from 'react';

// --- MOCK DATA: NATIONAL PARTNERS (Always On) ---
const mockNational = [
  { id: 'nat_1', name: 'Lifeline Australia', logo: '📞', desc: '24/7 crisis support and suicide prevention services.', lifetime: 14250 },
  { id: 'nat_2', name: 'RSPCA', logo: '🐾', desc: 'Preventing animal cruelty and caring for rescued pets.', lifetime: 9840 },
  { id: 'nat_3', name: 'The Smith Family', logo: '📚', desc: 'Helping disadvantaged Australian children get the most out of their education.', lifetime: 21500 },
];

// --- MOCK DATA: LOCAL CAUSES (Category Based) ---
const mockCauses = [
  { 
    id: 'cause_1', name: 'Griffith Tigers Under 12s', category: 'Sports', 
    image: 'https://images.unsplash.com/photo-1518605368461-1e1e11475196?auto=format&fit=crop&w=800&q=80',
    goal: 'New Training Equipment & Jerseys', 
    targetAmount: 2500, currentAmount: 850, verified: 'ABN Verified',
    tangible: '$50 = 1 New Match Football'
  },
  { 
    id: 'cause_2', name: 'Coastal Animal Rescue', category: 'Animals', 
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    goal: 'Emergency Vet Surgery Fund', 
    targetAmount: 5000, currentAmount: 4120, verified: 'ACNC Registered',
    tangible: '$20 = 1 Week of Puppy Food'
  },
  { 
    id: 'cause_3', name: 'Westside Community Radio', category: 'Community', 
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    goal: 'Replace Broken Studio Transmitter', 
    targetAmount: 3000, currentAmount: 1100, verified: 'Assoc. Verified',
    tangible: '$100 = 1 Hour of Broadcast'
  },
  { 
    id: 'cause_4', name: 'Regional TAFE Support', category: 'Education', 
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    goal: 'Laptops for Disadvantaged Youth', 
    targetAmount: 10000, currentAmount: 2100, verified: 'ACNC Registered',
    tangible: '$400 = 1 Refurbished Laptop'
  },
  { 
    id: 'cause_5', name: 'Harbor Beach Clean-Up', category: 'Environment', 
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbea5?auto=format&fit=crop&w=800&q=80',
    goal: 'Recycling Bins & Safety Gear', 
    targetAmount: 1500, currentAmount: 1500, verified: 'ACNC Registered',
    tangible: '$15 = 1 Pair of Safety Gloves'
  },
];

const CATEGORIES = ['All Causes', 'Sports', 'Education', 'Community', 'Animals', 'Environment'];

export default function CausesHub() {
  const [activeCategory, setActiveCategory] = useState('All Causes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCauses = mockCauses.filter(cause => {
    const matchesCategory = activeCategory === 'All Causes' || cause.category === activeCategory;
    const matchesSearch = cause.name.toLowerCase().includes(searchQuery.toLowerCase()) || cause.goal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-20">
      
      {/* HERO SECTION */}
      <div className="bg-[#1A2B48] text-white pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2ECC71] rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="text-[#2ECC71] font-black tracking-widest uppercase text-xs mb-4 block">Givebly Impact Hub</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Fund real community goals,<br/>just by doing your grocery shop.</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 font-medium">
            Allocate your cashback instantly. Watch the progress bars fill up. We handle the 90-day retailer clearing process so you can see your impact today.
          </p>

          {/* Search Bar - FIXED BACKGROUND COLOR */}
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for a club, school, or rescue..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-32 py-4 rounded-full bg-white text-[#1A2B48] font-bold focus:outline-none focus:ring-4 focus:ring-[#2ECC71]/30 shadow-xl placeholder-gray-400"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-[#2ECC71] text-[#1A2B48] px-6 rounded-full font-black hover:bg-[#27AE60] transition shadow-md">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* NATIONAL PARTNERS TIER */}
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-black text-[#1A2B48] uppercase tracking-tight">National Trust Partners</h2>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNational.map(partner => (
            <div key={partner.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                {partner.logo}
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1A2B48] leading-tight mb-1">{partner.name}</h3>
                <p className="text-xs text-gray-500 font-medium mb-3">{partner.desc}</p>
                <div className="inline-block bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Givebly Lifetime Impact</span>
                  <span className="text-sm font-black text-emerald-600">${partner.lifetime.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY NAVIGATION BAR */}
      <div className="bg-white border-y border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 py-3">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${activeCategory === cat ? 'bg-[#1A2B48] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LOCAL CAUSES GRID - UPDATED TO 4 COLUMNS ON DESKTOP */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#1A2B48]">
              {activeCategory === 'All Causes' ? 'Grassroots Community Goals' : `${activeCategory} Initiatives`}
            </h2>
            <p className="text-gray-500 font-medium mt-1">Allocate your Pending or Cleared points immediately.</p>
          </div>
          <button className="hidden md:block text-sm font-bold text-[#2ECC71] hover:text-[#27AE60] transition">
            Register your Club/Charity &rarr;
          </button>
        </div>

        {/* 1 col on mobile, 2 on tablet, 3 on large laptop, 4 on extra large desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCauses.map((cause) => {
            const percentFunded = Math.min(Math.round((cause.currentAmount / cause.targetAmount) * 100), 100);
            const isFullyFunded = percentFunded === 100;

            return (
              <div key={cause.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                
                {/* Image Header */}
                <div className="h-40 relative overflow-hidden bg-gray-200">
                  <img src={cause.image} alt={cause.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#1A2B48]/90 backdrop-blur text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-sm">
                      {cause.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  
                  {/* Verified Badge */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg className="w-3.5 h-3.5 text-[#2ECC71]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{cause.verified}</span>
                  </div>

                  <h3 className="text-lg font-black text-[#1A2B48] leading-tight mb-1.5">{cause.name}</h3>
                  <p className="text-gray-600 font-medium text-xs mb-5">{cause.goal}</p>

                  <div className="mt-auto">
                    {/* Tangible Metric Box */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 mb-4 text-center">
                      <span className="text-[11px] font-bold text-emerald-700">{cause.tangible}</span>
                    </div>

                    {/* Progress Bar Area */}
                    <div className="mb-2 flex justify-between items-end">
                      <div className="flex flex-col">
                         <span className="text-xl font-black text-[#1A2B48] leading-none">${cause.currentAmount.toLocaleString()}</span>
                         <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Incl. Pending</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 mb-0.5">of ${cause.targetAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full transition-all duration-1000 ${isFullyFunded ? 'bg-[#2ECC71]' : 'bg-[#1A2B48]'}`} style={{ width: `${percentFunded}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      <span>{percentFunded}% Funded</span>
                      {isFullyFunded && <span className="text-[#2ECC71]">Goal Reached!</span>}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <button className={`w-full py-2.5 rounded-xl font-black text-xs shadow-sm transition ${isFullyFunded ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#1A2B48] text-white hover:bg-gray-800'}`}>
                    {isFullyFunded ? 'Campaign Closed' : 'Allocate Points'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
        
        {filteredCauses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
            <h3 className="text-xl font-black text-[#1A2B48] mb-2">No causes found in this category yet.</h3>
            <p className="text-gray-500 mb-6 text-sm">Know a local club or organization that needs funding?</p>
            <button className="bg-[#1A2B48] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-gray-800 transition text-sm">
              Invite them to Register
            </button>
          </div>
        )}

      </div>
    </div>
  );
}