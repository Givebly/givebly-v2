'use client';

import React, { useState } from 'react';

// --- MOCK DATA ---
const mockBanners = [
  { id: 'ban_9x1a', name: 'Woolies Weekend Double Points', zone: 'Dashboard Hero', url: 'https://woolworths.com.au', status: 'live', starts: '27 Feb 2026', ends: '02 Mar 2026', clicks: 1240, impressions: 8400 },
  { id: 'ban_4c2b', name: 'The Iconic Autumn Sale', zone: 'Sidebar Square', url: 'https://theiconic.com.au', status: 'scheduled', starts: '05 Mar 2026', ends: '12 Mar 2026', clicks: 0, impressions: 0 },
  { id: 'ban_7f3c', name: 'New Feature: Vault Drop', zone: 'Vault Promo Strip', url: '/earn', status: 'live', starts: '15 Feb 2026', ends: 'Permanent', clicks: 3402, impressions: 21000 },
  { id: 'ban_1d9e', name: 'Valentine\'s Day Specials', zone: 'Dashboard Hero', url: '/category/valentines', status: 'ended', starts: '07 Feb 2026', ends: '15 Feb 2026', clicks: 4120, impressions: 18500 },
];

const ZONES = ['All Zones', 'Dashboard Hero', 'Sidebar Square', 'Vault Promo Strip', 'Checkout Interstitial'];

export default function MarketingHQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All Zones');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<any | null>(null);

  // Form States
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [zone, setZone] = useState('Dashboard Hero');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleOpenNew = () => {
    setSelectedBanner(null);
    setName(''); setUrl(''); setZone('Dashboard Hero'); setStartDate(''); setEndDate('');
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (banner: any) => {
    setSelectedBanner(banner);
    setName(banner.name); setUrl(banner.url); setZone(banner.zone);
    // In a real app, you'd parse actual ISO dates here
    setStartDate('2026-02-27'); setEndDate('2026-03-02'); 
    setIsDrawerOpen(true);
  };

  const filteredBanners = mockBanners.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = zoneFilter === 'All Zones' || b.zone === zoneFilter;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="animate-fadeIn pb-10 flex relative h-full overflow-hidden">
      
      {/* --- MAIN TABLE AREA --- */}
      <div className={`flex-1 transition-all duration-300 ${isDrawerOpen ? 'pr-[450px]' : ''}`}>
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Marketing & Placements</h1>
            <p className="text-[11px] text-gray-500">Manage promotional inventory, schedule ad campaigns, and track CTR.</p>
          </div>
          <div className="flex gap-2">
            <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-white border-gray-200 hover:bg-gray-50 text-gray-700">Export Metrics</button>
            <button 
              onClick={handleOpenNew} 
              className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-gray-900 border-gray-900 text-white hover:bg-gray-800 flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              New Campaign
            </button>
          </div>
        </div>

        {/* COMPACT KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Active Banners</span>
            <span className="text-sm font-semibold text-gray-900">2 Live</span>
          </div>
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Scheduled</span>
            <span className="text-sm font-semibold text-orange-600">1 Upcoming</span>
          </div>
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Total Impressions (30d)</span>
            <span className="text-sm font-semibold text-gray-900">47.9k</span>
          </div>
          <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-100 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Avg Global CTR</span>
            <span className="text-sm font-semibold text-emerald-700">14.2%</span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white border border-gray-200 rounded-t-lg shadow-sm p-3 flex flex-col sm:flex-row gap-4 justify-between items-center border-b-0">
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[11px] font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
          
          <div className="flex bg-gray-100 p-0.5 rounded-md w-full sm:w-auto border border-gray-200 overflow-x-auto no-scrollbar">
            {ZONES.map(z => (
              <button 
                key={z} 
                onClick={() => setZoneFilter(z)} 
                className={`px-3 py-1 text-[10px] font-semibold rounded-sm transition whitespace-nowrap ${zoneFilter === z ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Master Table */}
        <div className="bg-white rounded-b-lg border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] text-[11px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold w-16">Preview</th>
                <th className="px-4 py-3 font-semibold">Campaign Details</th>
                <th className="px-4 py-3 font-semibold">Schedule & Status</th>
                <th className="px-4 py-3 font-semibold">Performance</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBanners.map((banner) => (
                <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
                  
                  <td className="px-4 py-3">
                    <div className="h-9 w-16 bg-gray-200 border border-gray-300 rounded flex items-center justify-center shadow-inner overflow-hidden">
                       <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <p className={`font-semibold ${banner.status === 'ended' ? 'text-gray-500' : 'text-gray-900'}`}>{banner.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[8px] bg-blue-50 text-blue-700 border border-blue-200 px-1 py-0.5 rounded uppercase tracking-wider font-bold">{banner.zone}</span>
                      <span className="text-[9px] text-gray-400 font-mono truncate max-w-[150px]" title={banner.url}>{banner.url}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      {banner.status === 'live' && <span className="text-emerald-600 font-semibold text-[9px] uppercase tracking-wider flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Live</span>}
                      {banner.status === 'scheduled' && <span className="text-orange-600 font-semibold text-[9px] uppercase tracking-wider flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>Scheduled</span>}
                      {banner.status === 'ended' && <span className="text-gray-500 font-semibold text-[9px] uppercase tracking-wider flex items-center gap-1.5">Ended</span>}
                    </div>
                    <span className="text-[9px] text-gray-500">{banner.starts} — {banner.ends}</span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-gray-900 font-mono"><span className="text-gray-400">Views:</span> {banner.impressions.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-900 font-mono"><span className="text-gray-400">Clicks:</span> {banner.clicks.toLocaleString()}</span>
                      {banner.impressions > 0 && (
                        <span className="text-[9px] font-bold text-emerald-600 mt-0.5">CTR: {((banner.clicks / banner.impressions) * 100).toFixed(1)}%</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => handleOpenEdit(banner)}
                      className="bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition"
                    >
                      Configure
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SLIDE-OUT DRAWER: BANNER CONFIGURATOR --- */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 w-[450px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-hidden">
          
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">{selectedBanner ? 'Configure Campaign' : 'New Ad Campaign'}</h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{selectedBanner ? selectedBanner.id : 'Inventory Generation'}</p>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white no-scrollbar">
            
            {/* Asset Upload */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Creative Asset</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer group">
                <svg className="w-8 h-8 text-gray-400 mb-2 group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-[11px] font-semibold text-gray-900">Upload Banner Image</span>
                <span className="text-[9px] text-gray-500 mt-1">PNG, JPG, WEBP (Max 5MB)</span>
              </div>
            </div>

            {/* Config */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Campaign Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Campaign Name (Internal)</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Easter Promo" className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-medium text-gray-900" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Destination URL</label>
                  <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-mono text-gray-600" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Placement Zone</label>
                  <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full text-[11px] px-2 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 text-gray-700 bg-white font-semibold">
                    <option value="Dashboard Hero">Dashboard Hero (1200x400)</option>
                    <option value="Sidebar Square">Sidebar Square (300x250)</option>
                    <option value="Vault Promo Strip">Vault Promo Strip (1000x150)</option>
                    <option value="Checkout Interstitial">Checkout Interstitial (600x600)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Flight Schedule */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Flight Schedule</h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full text-[11px] px-2.5 py-1.5 rounded border border-gray-200 outline-none focus:border-emerald-500 text-gray-700 font-mono" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">End Date (Optional)</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full text-[11px] px-2.5 py-1.5 rounded border border-gray-200 outline-none focus:border-emerald-500 text-gray-700 font-mono" />
                </div>
              </div>
              <p className="text-[9px] text-gray-400 mt-2 italic">Leave End Date blank for campaigns that run indefinitely.</p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button className="w-full bg-gray-900 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-gray-800 transition">
                {selectedBanner ? 'Save Campaign Config' : 'Schedule Campaign'}
              </button>
              
              {selectedBanner && (
                <button className="w-full bg-white border border-red-200 text-red-600 text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-red-50 transition">
                  Terminate Campaign
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}