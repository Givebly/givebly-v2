'use client';

import React, { useState } from 'react';

// --- MOCK DATA ---
const mockCampaigns = [
  { id: 'cmp_1a', title: 'Weekly Charity Allocation', type: 'Poll', bounty: 50, participants: 3420, status: 'active', ends: '05 Mar 2026' },
  { id: 'cmp_2b', title: 'Grocery Habits (Zero-Party Data)', type: 'Survey', bounty: 100, participants: 1845, status: 'active', ends: '10 Mar 2026' },
  { id: 'cmp_3c', title: 'Favorite Tech Retailer', type: 'Poll', bounty: 50, participants: 4102, status: 'concluded', ends: '25 Feb 2026' },
  { id: 'cmp_4d', title: 'New Feature Request', type: 'Poll', bounty: 50, participants: 290, status: 'draft', ends: '-' },
];

const mockQuests = [
  { id: 'q_1', name: 'Daily Check-In', base: 20, multiplier: 1, isBoosted: false, desc: 'Core retention loop.' },
  { id: 'q_2', name: 'Social Connects (Per Channel)', base: 100, multiplier: 2, isBoosted: true, desc: 'Boosted for the weekend to drive viral loop.' },
  { id: 'q_3', name: 'The Vault Drop (Easter Egg)', base: 200, multiplier: 1, isBoosted: false, desc: 'Hidden token on random store pages.' },
  { id: 'q_4', name: 'First Shop Bonus', base: 500, multiplier: 1, isBoosted: false, desc: 'Bounty for breaking the zero-purchase friction.' },
];

const mockAvatars = [
  { id: 'av_1', name: 'Buster Koala', icon: '🐨', active: true, claims: 1420 },
  { id: 'av_2', name: 'Sly Fox', icon: '🦊', active: true, claims: 890 },
  { id: 'av_3', name: 'Golden Lion', icon: '🦁', active: true, claims: 2105 },
  { id: 'av_4', name: 'Diamond Unicorn', icon: '🦄', active: false, claims: 0 },
];

export default function GamificationHQ() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'quests' | 'avatars'>('campaigns');
  
  // Drawer States
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<any | null>(null);

  // --- CREATOR FUNCTIONS ---
  const handleNewCampaign = () => {
    setSelectedCampaign({
      isNew: true, // Flag to tell the UI this is a creation state
      id: 'DRAFT_NEW',
      title: '',
      type: 'Poll',
      bounty: 50,
      participants: 0,
      status: 'draft',
      ends: 'TBD'
    });
  };

  const handleNewAvatar = () => {
    setSelectedAvatar({
      isNew: true, // Flag to tell the UI this is a creation state
      id: 'NEW_ASSET',
      name: '',
      icon: '',
      active: true,
      claims: 0
    });
  };

  return (
    <div className="animate-fadeIn pb-10 flex relative h-full overflow-hidden">
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 transition-all duration-300 ${(selectedCampaign || selectedAvatar) ? 'pr-[400px]' : ''}`}>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Gamification Engine</h1>
            <p className="text-[11px] text-gray-500">Deploy surveys, manage quest multipliers, and control the dopamine loop.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleNewCampaign}
              className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-gray-900 border-gray-900 text-white hover:bg-gray-800 flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              New Campaign
            </button>
          </div>
        </div>

        {/* COMPACT KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1">Active Campaigns</span>
            <span className="text-lg font-semibold text-gray-900">2 Live</span>
          </div>
          <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-100 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 block mb-1">Quest Multipliers</span>
            <span className="text-lg font-semibold text-emerald-700">1 Boost Active</span>
          </div>
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1">Zero-Party Data</span>
            <span className="text-lg font-semibold text-gray-900">1,845 Profiles</span>
          </div>
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1">Points Minted (30d)</span>
            <span className="text-lg font-semibold text-gray-900">425k PTS</span>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg w-max mb-4 border border-gray-200">
          <button onClick={() => { setActiveTab('campaigns'); setSelectedAvatar(null); }} className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition ${activeTab === 'campaigns' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>Polls & Surveys</button>
          <button onClick={() => { setActiveTab('quests'); setSelectedCampaign(null); setSelectedAvatar(null); }} className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition ${activeTab === 'quests' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>Quest Multipliers</button>
          <button onClick={() => { setActiveTab('avatars'); setSelectedCampaign(null); }} className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition ${activeTab === 'avatars' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>Premium Avatars</button>
        </div>

        {activeTab === 'campaigns' && (
          /* THE CAMPAIGNS TABLE */
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] text-[11px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Campaign Name</th>
                  <th className="px-4 py-3 font-semibold">Type & Bounty</th>
                  <th className="px-4 py-3 font-semibold">Engagement</th>
                  <th className="px-4 py-3 font-semibold">Status / Ends</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{camp.title}</p>
                      <p className="text-[9px] text-gray-400 font-mono mt-0.5">{camp.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${camp.type === 'Poll' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>{camp.type}</span>
                        <span className="text-[10px] font-mono font-semibold text-gray-600">{camp.bounty} PTS</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono font-medium text-gray-900">
                      {camp.participants.toLocaleString()} Users
                    </td>
                    <td className="px-4 py-3">
                      {camp.status === 'active' && <span className="text-emerald-600 font-semibold text-[10px] flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Live</span>}
                      {camp.status === 'concluded' && <span className="text-gray-500 font-semibold text-[10px] flex items-center gap-1.5">Concluded</span>}
                      {camp.status === 'draft' && <span className="text-orange-500 font-semibold text-[10px] flex items-center gap-1.5">Draft</span>}
                      <p className="text-[9px] text-gray-400 mt-0.5">{camp.ends}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => setSelectedCampaign(camp)}
                        className="text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm transition border bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      >
                        {camp.status === 'active' ? 'Manage' : 'View Results'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'quests' && (
          /* THE QUEST MULTIPLIERS */
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900">Global Point Multipliers</h3>
              <p className="text-[11px] text-gray-500">Temporarily boost rewards to drive immediate user behavior.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {mockQuests.map(quest => (
                <div key={quest.id} className={`border rounded-lg p-4 flex justify-between items-center transition-all ${quest.isBoosted ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-gray-200'}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-[12px] font-semibold ${quest.isBoosted ? 'text-emerald-900' : 'text-gray-900'}`}>{quest.name}</h4>
                      {quest.isBoosted && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span> Flash Boost</span>}
                    </div>
                    <p className="text-[10px] text-gray-500 mb-1.5">{quest.desc}</p>
                    <div className="flex items-center gap-4 text-[10px] font-mono">
                      <span className="text-gray-500">Base: <span className="font-bold text-gray-900">{quest.base} PTS</span></span>
                      {quest.isBoosted ? (
                         <span className="text-emerald-600 font-bold border-b border-emerald-300">Current Payout: {quest.base * quest.multiplier} PTS ({quest.multiplier}x)</span>
                      ) : (
                         <span className="text-gray-400">Current Payout: {quest.base} PTS (1x)</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                     <select className={`text-[10px] font-semibold border rounded px-2 py-1 outline-none ${quest.isBoosted ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`} defaultValue={quest.multiplier}>
                       <option value={1}>1x (Standard)</option>
                       <option value={1.5}>1.5x Boost</option>
                       <option value={2}>2.0x Boost</option>
                       <option value={5}>5.0x Mega Event</option>
                     </select>
                     {quest.isBoosted ? (
                       <button className="text-[9px] font-bold text-gray-500 hover:text-gray-900 transition">Remove Boost</button>
                     ) : (
                       <button className="text-[9px] font-bold text-emerald-600 hover:text-emerald-700 transition">Apply Multiplier</button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'avatars' && (
          /* THE AVATAR ROSTER */
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Premium Avatar Roster</h3>
                <p className="text-[11px] text-gray-500">Manage the 3D companions users can unlock for their profile.</p>
              </div>
              <button 
                onClick={handleNewAvatar}
                className="text-[11px] font-semibold bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Upload Asset
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockAvatars.map(avatar => (
                <div key={avatar.id} className={`border rounded-xl p-4 flex flex-col items-center text-center transition ${avatar.active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200 opacity-60 grayscale'}`}>
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center text-3xl shadow-sm border border-gray-100 mb-3 ${avatar.active ? 'bg-emerald-50' : 'bg-gray-200'}`}>
                    {avatar.icon}
                  </div>
                  <h4 className="text-[11px] font-semibold text-gray-900 mb-0.5">{avatar.name}</h4>
                  <p className="text-[9px] text-gray-400 font-mono mb-3">{avatar.claims} Claims</p>
                  
                  {/* CSS Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={avatar.active} />
                    <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* --- SLIDE-OUT DRAWER: CAMPAIGN ARCHITECT --- */}
      {selectedCampaign && (
        <div className="fixed top-0 right-0 w-[400px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-y-auto">
          
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 sticky top-0 z-20 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
                {selectedCampaign.isNew ? 'Create New Campaign' : 'Campaign Architect'}
              </h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{selectedCampaign.id}</p>
            </div>
            <button onClick={() => setSelectedCampaign(null)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* Status Check - Hidden if creating new */}
            {!selectedCampaign.isNew && (
              <div className={`p-4 rounded-lg border flex items-center justify-between ${selectedCampaign.status === 'active' ? 'bg-emerald-50 border-emerald-200' : selectedCampaign.status === 'concluded' ? 'bg-gray-50 border-gray-200' : 'bg-orange-50 border-orange-200'}`}>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedCampaign.status === 'active' ? 'text-emerald-700' : 'text-gray-500'}`}>Current Status</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{selectedCampaign.participants.toLocaleString()} Participants</p>
                </div>
                <div className={`text-sm font-black uppercase tracking-widest ${selectedCampaign.status === 'active' ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {selectedCampaign.status}
                </div>
              </div>
            )}

            {/* Campaign Config */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Configuration</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Campaign Title (Internal)</label>
                  <input type="text" defaultValue={selectedCampaign.title} placeholder="e.g. Q3 Feedback Poll" className="w-full text-[11px] px-3 py-2 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500 font-semibold text-gray-900" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Type</label>
                    <select className="w-full text-[11px] px-2 py-2 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500 text-gray-700 font-medium" defaultValue={selectedCampaign.type}>
                      <option>Poll</option>
                      <option>Survey</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Bounty (PTS)</label>
                    <input type="number" defaultValue={selectedCampaign.bounty} className="w-full text-[11px] px-3 py-2 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500 font-mono text-gray-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">User-Facing Question</label>
                  <textarea rows={2} defaultValue={selectedCampaign.isNew ? '' : "Where should this week's $500 bonus pool go?"} placeholder="What do you want to ask your users?" className="w-full text-[11px] px-3 py-2 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500 text-gray-900 resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Voting Options */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Voting Options</h3>
              </div>
              <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-gray-400">Opt 1</span>
                  <input type="text" defaultValue={selectedCampaign.isNew ? '' : "Clean Oceans Org"} placeholder="Option A" className="flex-1 text-[11px] px-2.5 py-1.5 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-gray-400">Opt 2</span>
                  <input type="text" defaultValue={selectedCampaign.isNew ? '' : "Wildlife Rescue NSW"} placeholder="Option B" className="flex-1 text-[11px] px-2.5 py-1.5 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500" />
                </div>
                <button className="text-[9px] font-bold text-emerald-600 mt-1 hover:underline">+ Add Option</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {selectedCampaign.isNew ? (
                <button className="w-full bg-emerald-600 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-emerald-700 transition">
                  Launch Campaign
                </button>
              ) : selectedCampaign.status === 'active' ? (
                <>
                  <button className="w-full bg-gray-900 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-gray-800 transition">
                    Save Changes
                  </button>
                  <button className="w-full bg-white border border-orange-200 text-orange-600 text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-orange-50 transition">
                    Force Close Campaign
                  </button>
                </>
              ) : (
                <button className="w-full bg-white border border-emerald-200 text-emerald-700 text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-emerald-50 transition">
                  Re-Activate Campaign
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- SLIDE-OUT DRAWER: ASSET UPLOAD (AVATARS) --- */}
      {selectedAvatar && (
        <div className="fixed top-0 right-0 w-[400px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-y-auto">
          
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 sticky top-0 z-20 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Asset Manager</h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">Upload 3D Avatar Asset</p>
            </div>
            <button onClick={() => setSelectedAvatar(null)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* Image Uploader Placeholder */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Asset File</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <span className="text-[11px] font-semibold text-gray-900">Click to upload 3D Asset</span>
                <span className="text-[9px] text-gray-500 mt-1">PNG, JPG, or GIF up to 2MB</span>
              </div>
            </div>

            {/* Asset Metadata */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Asset Metadata</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Display Name</label>
                  <input type="text" placeholder="e.g. Diamond Unicorn" className="w-full text-[11px] px-3 py-2 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500 font-semibold text-gray-900" />
                </div>
                
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div>
                    <span className="text-[11px] font-semibold text-gray-900 block">Available in Vault</span>
                    <span className="text-[9px] text-gray-500">Allow users to select this avatar now.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                    <div className="w-8 h-4.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-gray-900 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-gray-800 transition">
                Upload & Save Asset
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}