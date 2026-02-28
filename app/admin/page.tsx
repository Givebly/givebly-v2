'use client';

import React from 'react';

export default function AdminAnalytics() {
  return (
    <div className="animate-fadeIn pb-10">
      
      {/* HEADER */}
      <div className="mb-4 flex justify-between items-end">
        <div>
          <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Platform Analytics</h1>
          <p className="text-[11px] text-gray-500">Live investor-facing data terminal.</p>
        </div>
        <div className="flex gap-2">
          <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm">Export Master CSV</button>
          <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-gray-900 border-gray-900 text-white hover:bg-gray-800 shadow-sm">Generate Investor Deck</button>
        </div>
      </div>

      {/* ROW 1: MICRO STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {[
          { label: 'Total Stores', val: '142' },
          { label: 'Active Coupons', val: '84' },
          { label: 'Academy Courses', val: '12' },
          { label: 'Avg Session Time', val: '4m 12s', color: 'text-emerald-600' },
          { label: 'Surveys Today', val: '842' },
          { label: 'Poll Votes Today', val: '1,204' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col justify-between">
            <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</span>
            <span className={`text-lg font-semibold tracking-tight ${stat.color || 'text-gray-900'}`}>{stat.val}</span>
          </div>
        ))}
      </div>

      {/* ROW 2: 7-DAY & 30-DAY PULSE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        
        {/* 7-Day Traffic (Line/Dot Chart) */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Daily Traffic (7D)</span>
            <span className="text-[10px] text-emerald-600 font-semibold">+14%</span>
          </div>
          <div className="flex-1 relative flex items-end justify-between px-1 h-24 mt-2">
            {/* Simple CSS Bar Graph representing traffic */}
            {[40, 55, 45, 70, 60, 85, 100].map((h, i) => (
              <div key={i} className="w-[10%] flex flex-col items-center gap-1 group cursor-pointer">
                <span className="text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 transition absolute -top-4">{h}k</span>
                <div className="w-full bg-emerald-100 rounded-t-sm relative" style={{ height: `${h}%` }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <span className="text-[8px] text-gray-400 mt-1">{'SMTWTFS'.charAt(i)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Signups (Line/Dot Chart) */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">New Signups (7D)</span>
            <span className="text-[10px] text-emerald-600 font-semibold">+8%</span>
          </div>
          <div className="flex-1 relative flex items-end justify-between px-1 h-24 mt-2">
            {[20, 30, 25, 40, 50, 45, 70].map((h, i) => (
              <div key={i} className="w-[10%] flex flex-col items-center gap-1 group cursor-pointer">
                <span className="text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 transition absolute -top-4">{h * 10}</span>
                <div className="w-full bg-blue-50 rounded-t-sm relative" style={{ height: `${h}%` }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 border-2 border-white rounded-full"></div>
                </div>
                <span className="text-[8px] text-gray-400 mt-1">{'SMTWTFS'.charAt(i)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Purchase Volume (Dense Bar Chart) */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Purchase Volume (30D)</span>
            <span className="text-[10px] text-gray-500 font-medium">$42.4k Total</span>
          </div>
          <div className="flex-1 flex items-end gap-0.5 h-24 mt-2 border-b border-gray-100">
            {Array.from({length: 30}).map((_, i) => {
              const h = Math.floor(Math.random() * 60) + 20; // Random heights for mockup
              return (
                <div key={i} className="flex-1 bg-gray-800 hover:bg-emerald-500 transition-colors rounded-t-sm" style={{ height: `${h}%` }} title={`Day ${i+1}`}></div>
              )
            })}
          </div>
          <div className="flex justify-between text-[8px] text-gray-400 mt-1">
            <span>1st</span>
            <span>15th</span>
            <span>30th</span>
          </div>
        </div>

      </div>

      {/* ROW 3: CONVERSION & SOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        
        {/* Click vs Purchase */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Conversion Funnel</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] mb-1"><span className="text-gray-500">Store Clicks</span><span className="font-semibold text-gray-900">142,500</span></div>
              <div className="w-full bg-gray-100 h-4 rounded-sm overflow-hidden"><div className="bg-gray-300 w-full h-full"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1"><span className="text-gray-500">Completed Purchases</span><span className="font-semibold text-emerald-600">12,825</span></div>
              <div className="w-full bg-gray-100 h-4 rounded-sm overflow-hidden"><div className="bg-emerald-500 w-[9%] h-full"></div></div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[10px] text-gray-500">Global Conversion Rate</span>
              <span className="text-sm font-bold text-gray-900">9.0%</span>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Traffic Matrix</h3>
          <div className="space-y-2.5">
            {[
              { name: 'Organic Search', val: 35, color: 'bg-emerald-500' },
              { name: 'Direct/App', val: 25, color: 'bg-blue-500' },
              { name: 'Refer-A-Friend', val: 15, color: 'bg-purple-500' },
              { name: 'Social Media', val: 12, color: 'bg-pink-500' },
              { name: 'Email Marketing', val: 8, color: 'bg-orange-500' },
              { name: 'Affiliate/Partner', val: 5, color: 'bg-gray-800' }
            ].map(source => (
              <div key={source.name} className="flex items-center gap-3">
                <span className="text-[9px] text-gray-500 w-24 truncate">{source.name}</span>
                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className={`${source.color} h-full rounded-full`} style={{ width: `${source.val}%` }}></div>
                </div>
                <span className="text-[9px] font-semibold text-gray-900 w-8 text-right">{source.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shrunk Cashflow Trajectory */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col">
          <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Cashflow (Rev vs Payout)</h3>
          <div className="flex-1 flex items-end justify-between gap-1 px-2 pb-1 border-b border-gray-100">
            {[40, 65, 45, 80, 55, 90, 100].map((val, i) => (
              <div key={i} className="flex gap-0.5 w-full items-end h-32">
                <div className="w-1/2 bg-emerald-400 rounded-t-sm" style={{ height: `${val}%` }}></div>
                <div className="w-1/2 bg-gray-800 rounded-t-sm" style={{ height: `${val * 0.6}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <span className="text-[8px] font-semibold text-gray-500 flex items-center gap-1"><div className="h-1.5 w-1.5 bg-emerald-400"></div> Revenue</span>
            <span className="text-[8px] font-semibold text-gray-500 flex items-center gap-1"><div className="h-1.5 w-1.5 bg-gray-800"></div> Payouts</span>
          </div>
        </div>

      </div>

      {/* ROW 4: 6-MONTH MACRO TRENDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Weekly Traffic (6 Months)</span>
          </div>
          <div className="flex items-end gap-1 h-20 border-b border-gray-100">
            {Array.from({length: 24}).map((_, i) => (
              <div key={i} className="flex-1 bg-gray-200 hover:bg-gray-400 transition-colors rounded-t-sm" style={{ height: `${Math.floor(Math.random() * 70) + 30}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-gray-400 mt-1 uppercase"><span>Sep</span><span>Dec</span><span>Feb</span></div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Weekly Signups (6 Months)</span>
          </div>
          <div className="flex items-end gap-1 h-20 border-b border-gray-100 relative">
             {/* Simulated Line graph using flex alignment */}
            {Array.from({length: 24}).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" style={{ marginBottom: `${Math.floor(Math.random() * 60) + 10}px` }}></div>
                <div className="w-[1px] h-full bg-blue-100 absolute bottom-0 -z-10" style={{ height: `${Math.floor(Math.random() * 60) + 10}px` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-gray-400 mt-1 uppercase"><span>Sep</span><span>Dec</span><span>Feb</span></div>
        </div>
      </div>

      {/* ROW 5: NETWORK & SOCIAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        
        {/* Referral Network */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Referral Network (All-Time)</h3>
              <p className="text-[10px] text-gray-500">Friends invited via platform links.</p>
            </div>
            <span className="text-lg font-bold text-gray-900">14,205</span>
          </div>
          
          <div className="flex h-6 rounded-md overflow-hidden mb-3">
            <div className="bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-white" style={{ width: '65%' }}>65% Complete</div>
            <div className="bg-orange-300 flex items-center justify-center text-[9px] font-bold text-white" style={{ width: '35%' }}>35% Pending</div>
          </div>
          
          <div className="pt-3 border-t border-gray-100">
            <span className="text-[9px] font-semibold text-gray-500 uppercase block mb-2">30-Day Referral Velocity</span>
            <div className="flex items-end gap-1 h-8">
              {Array.from({length: 30}).map((_, i) => (
                <div key={i} className="flex-1 bg-purple-200 rounded-t-sm" style={{ height: `${Math.floor(Math.random() * 80) + 20}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Blocks */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Social Ecosystem</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="border border-gray-100 bg-gray-50 p-3 rounded-lg text-center">
              <span className="text-[10px] text-gray-500 block mb-0.5">Instagram</span>
              <span className="text-sm font-semibold text-gray-900">12.4k</span>
            </div>
            <div className="border border-gray-100 bg-gray-50 p-3 rounded-lg text-center">
              <span className="text-[10px] text-gray-500 block mb-0.5">TikTok</span>
              <span className="text-sm font-semibold text-gray-900">8.2k</span>
            </div>
            <div className="border border-gray-100 bg-gray-50 p-3 rounded-lg text-center">
              <span className="text-[10px] text-gray-500 block mb-0.5">YouTube</span>
              <span className="text-sm font-semibold text-gray-900">4.1k</span>
            </div>
            <div className="border border-gray-100 bg-gray-50 p-3 rounded-lg text-center">
              <span className="text-[10px] text-gray-500 block mb-0.5">Facebook</span>
              <span className="text-sm font-semibold text-gray-900">9.8k</span>
            </div>
            <div className="border border-gray-100 bg-gray-50 p-3 rounded-lg text-center">
              <span className="text-[10px] text-gray-500 block mb-0.5">X / Twitter</span>
              <span className="text-sm font-semibold text-gray-900">2.2k</span>
            </div>
          </div>
        </div>

      </div>

      {/* ROW 6: TODAY'S LEADERBOARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Top Stores */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Top Stores (Today)</h3>
          </div>
          <div className="flex-1 p-0">
            <table className="w-full text-[10px] text-left">
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Woolworths', clicks: 1420 }, { name: 'The Iconic', clicks: 984 },
                  { name: 'Amazon AU', clicks: 842 }, { name: 'Chemist Warehouse', clicks: 650 },
                  { name: 'Coles', clicks: 512 }
                ].map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900 w-full">{i+1}. {s.name}</td>
                    <td className="px-4 py-2 text-emerald-600 font-mono text-right">{s.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Active Users */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Most Active Users</h3>
          </div>
          <div className="flex-1 p-0">
            <table className="w-full text-[10px] text-left">
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Sarah J.', metric: '14 Shops' }, { name: 'Michael C.', metric: '12 Shops' },
                  { name: 'Emma W.', metric: '8 Shops' }, { name: 'David L.', metric: '8 Shops' },
                  { name: 'Chloe T.', metric: '7 Shops' }
                ].map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900 w-full">{s.name}</td>
                    <td className="px-4 py-2 text-gray-500 text-right whitespace-nowrap">{s.metric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Top Referrers (Today)</h3>
          </div>
          <div className="flex-1 p-0">
            <table className="w-full text-[10px] text-left">
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'FinanceGuy99', metric: '42 Invites' }, { name: 'DealHunter', metric: '28 Invites' },
                  { name: 'Sarah J.', metric: '14 Invites' }, { name: 'Tom H.', metric: '9 Invites' },
                  { name: 'AusSaver', metric: '7 Invites' }
                ].map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900 w-full">{s.name}</td>
                    <td className="px-4 py-2 text-purple-600 font-mono text-right whitespace-nowrap">{s.metric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}