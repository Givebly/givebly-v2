'use client';

import React, { useState } from 'react';

// --- MOCK PARTNER DATA ---
const partnerData = {
  orgName: 'Griffith Tigers Under 12s',
  campaign: 'New Training Equipment & Jerseys',
  target: 2500,
  clearedFunds: 500,
  pendingFunds: 350,
  donors: 42,
  daysActive: 14,
};

const recentDonations = [
  { id: 'd_1', name: 'Sarah J.', amount: 15.50, status: 'cleared', date: '28 Feb 2026' },
  { id: 'd_2', name: 'Anonymous Parent', amount: 50.00, status: 'pending', date: '28 Feb 2026' },
  { id: 'd_3', name: 'Michael C.', amount: 8.25, status: 'cleared', date: '27 Feb 2026' },
  { id: 'd_4', name: 'Emma W.', amount: 22.00, status: 'pending', date: '26 Feb 2026' },
  { id: 'd_5', name: 'David L.', amount: 10.00, status: 'cleared', date: '25 Feb 2026' },
];

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'broadcast' | 'withdraw'>('overview');
  
  // Form states
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const totalRaised = partnerData.clearedFunds + partnerData.pendingFunds;
  const progressPercent = Math.min(Math.round((totalRaised / partnerData.target) * 100), 100);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setShowSuccessBanner(false);
    
    // Simulate a network request to send the broadcast
    setTimeout(() => {
      setIsUploading(false);
      setShowSuccessBanner(true);
      
      // Auto-hide the success banner after 5 seconds
      setTimeout(() => setShowSuccessBanner(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* PARTNER HEADER */}
      <header className="bg-[#1A2B48] border-b border-[#1A2B48] py-4 px-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center font-black text-[#1A2B48] text-xl shadow-inner">
              GT
            </div>
            <div>
              <h1 className="text-white font-black leading-tight tracking-tight">{partnerData.orgName}</h1>
              <p className="text-[#2ECC71] text-[10px] font-bold uppercase tracking-widest">Partner Portal</p>
            </div>
          </div>
          <button className="text-sm font-bold text-gray-300 hover:text-white transition">Sign Out</button>
        </div>
      </header>

      {/* DASHBOARD NAVIGATION */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex space-x-6">
          <button onClick={() => setActiveTab('overview')} className={`py-4 text-sm font-bold transition border-b-2 ${activeTab === 'overview' ? 'border-[#2ECC71] text-[#1A2B48]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Campaign Overview</button>
          <button onClick={() => setActiveTab('broadcast')} className={`py-4 text-sm font-bold transition border-b-2 ${activeTab === 'broadcast' ? 'border-[#2ECC71] text-[#1A2B48]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Broadcast to Supporters</button>
          <button onClick={() => setActiveTab('withdraw')} className={`py-4 text-sm font-bold transition border-b-2 ${activeTab === 'withdraw' ? 'border-[#2ECC71] text-[#1A2B48]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Withdraw Funds</button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto mt-8 px-6">
        
        {activeTab === 'overview' && (
          <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COL: PROGRESS & KPIS */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Progress Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Current Goal</span>
                    <h2 className="text-2xl font-black text-[#1A2B48] leading-tight">{partnerData.campaign}</h2>
                  </div>
                  <span className="bg-[#1A2B48] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">Day {partnerData.daysActive} of 90</span>
                </div>

                <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-[#1A2B48] leading-none">${totalRaised.toLocaleString()}</span>
                    <span className="text-xs font-bold text-[#2ECC71] mt-1 uppercase tracking-widest">{progressPercent}% Funded</span>
                  </div>
                  <span className="text-sm font-bold text-gray-500 mb-1">Target: ${partnerData.target.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden mb-6 flex">
                  <div className="h-full bg-[#2ECC71] transition-all duration-1000" style={{ width: `${(partnerData.clearedFunds / partnerData.target) * 100}%` }} title="Cleared Funds"></div>
                  <div className="h-full bg-orange-300 transition-all duration-1000" style={{ width: `${(partnerData.pendingFunds / partnerData.target) * 100}%` }} title="Pending Retailer Clearance"></div>
                </div>

                {/* Financial Breakdown */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Cleared Funds</span>
                    <span className="text-2xl font-black text-[#1A2B48]">${partnerData.clearedFunds.toLocaleString()}</span>
                    <p className="text-[9px] text-emerald-600 mt-1 font-medium leading-tight">Available to withdraw now.</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block mb-1">Pending Clearance</span>
                    <span className="text-2xl font-black text-[#1A2B48]">${partnerData.pendingFunds.toLocaleString()}</span>
                    <p className="text-[9px] text-orange-600 mt-1 font-medium leading-tight">Waiting on retailer return policies (30-90 days).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COL: RECENT DONORS */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                  <h3 className="text-sm font-black text-[#1A2B48] uppercase tracking-wider">Community Support</h3>
                  <span className="text-xs font-bold text-gray-500">{partnerData.donors} Supporters</span>
                </div>
                
                <div className="p-0 flex-1 overflow-y-auto max-h-[400px]">
                  <ul className="divide-y divide-gray-100">
                    {recentDonations.map(donation => (
                      <li key={donation.id} className="p-4 hover:bg-gray-50 transition flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{donation.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{donation.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-[#1A2B48]">${donation.amount.toFixed(2)}</p>
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${donation.status === 'cleared' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                            {donation.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl text-center">
                  <button className="text-xs font-bold text-[#2ECC71] hover:text-[#27AE60] transition">View All Activity &rarr;</button>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'broadcast' && (
          <div className="animate-fadeIn max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-[#1A2B48] mb-2">Broadcast an Update</h2>
              <p className="text-sm text-gray-500 font-medium mb-6">
                Keep your {partnerData.donors} supporters in the loop. This message and photo will be sent directly to their Givebly inbox. 
                <strong className="text-gray-900 block mt-1">Bonus: Include a video shouting out Givebly and we&apos;ll credit your next campaign with a $100 starting bonus!</strong>
              </p>

              {/* Dynamic Success Banner */}
              {showSuccessBanner && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-6 flex items-center gap-3 animate-fadeIn">
                  <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Broadcast Sent Successfully!</p>
                    <p className="text-xs font-medium opacity-80">This update has been pushed to the inbox of your {partnerData.donors} supporters.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Media Upload</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer group">
                    <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <svg className="w-6 h-6 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <span className="text-sm font-bold text-[#1A2B48]">Drag &amp; Drop photos or videos here</span>
                    <span className="text-[10px] text-gray-500 mt-1 font-medium">JPEG, PNG, MP4 up to 50MB</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Message to your Supporters</label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="e.g. A huge thank you to everyone who shopped through Givebly! The kids absolutely love the new jerseys..." 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71] resize-none"
                  ></textarea>
                </div>

                <button disabled={isUploading} type="submit" className="w-full bg-[#1A2B48] text-white py-4 rounded-xl font-black shadow-md hover:bg-gray-800 transition disabled:bg-gray-400 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  {isUploading ? 'Blasting to Inboxes...' : `Send to ${partnerData.donors} Supporters`}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="animate-fadeIn max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              
              <h2 className="text-2xl font-black text-[#1A2B48] mb-2">Withdraw Cleared Funds</h2>
              <p className="text-sm text-gray-500 font-medium mb-6">Funds will be deposited into your registered BSB/Account ending in <strong className="text-gray-900">...4567</strong></p>

              <div className="bg-emerald-50 border border-emerald-200 w-full rounded-xl p-6 mb-8">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Available to Withdraw</span>
                <span className="text-5xl font-black text-[#1A2B48]">${partnerData.clearedFunds.toFixed(2)}</span>
              </div>

              {partnerData.clearedFunds >= 50 ? (
                <button className="w-full bg-[#2ECC71] text-[#1A2B48] py-4 rounded-xl font-black shadow-md hover:bg-[#27AE60] transition text-lg">
                  Request Transfer
                </button>
              ) : (
                <div className="w-full bg-gray-100 text-gray-400 py-4 rounded-xl font-black shadow-inner cursor-not-allowed">
                  Minimum $50 required to withdraw
                </div>
              )}
              
              <p className="text-xs text-gray-400 font-medium mt-4">Transfers are processed on Tuesdays and Thursdays and take 1-2 business days to clear in your account.</p>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}