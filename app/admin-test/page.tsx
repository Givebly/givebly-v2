'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminSandbox() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Theme-specific Tailwind classes
  const t = {
    bg: theme === 'light' ? 'bg-[#F9FAFB]' : 'bg-[#0A0A0A]',
    sidebarBg: theme === 'light' ? 'bg-white border-r border-gray-200' : 'bg-[#111111] border-r border-white/10',
    sidebarTextActive: theme === 'light' ? 'bg-gray-100 text-gray-900 font-semibold' : 'bg-white/10 text-white font-semibold',
    sidebarText: theme === 'light' ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200',
    headerBg: theme === 'light' ? 'bg-white border-b border-gray-200' : 'bg-[#111111] border-b border-white/10',
    cardBg: theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-[#1A1A1A] border border-white/10',
    textPrimary: theme === 'light' ? 'text-gray-900' : 'text-gray-100',
    textSecondary: theme === 'light' ? 'text-gray-500' : 'text-gray-400',
    accent: theme === 'light' ? 'text-emerald-600' : 'text-emerald-400',
    accentBg: theme === 'light' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  };

  return (
    <div className={`min-h-screen flex font-sans ${t.bg}`}>
      
      {/* ULTRA-DENSE SIDEBAR */}
      <aside className={`w-56 shrink-0 flex flex-col h-screen relative z-20 ${t.sidebarBg}`}>
        <div className={`h-12 flex items-center px-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-white/10'} shrink-0`}>
          <div className="flex items-center gap-2">
            <div className={`h-6 w-6 rounded flex items-center justify-center font-bold text-xs ${theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>G</div>
            <span className={`text-sm font-semibold tracking-tight ${t.textPrimary}`}>Givebly Admin</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 text-[11px] no-scrollbar">
          <p className={`px-2 mb-2 font-medium uppercase tracking-wider text-[9px] ${t.textSecondary}`}>Overview</p>
          
          <button className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all ${t.sidebarTextActive}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </button>
          <button className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all ${t.sidebarText}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Customers & CRM
          </button>
          <button className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all ${t.sidebarText}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Financials & Payouts
          </button>

          <p className={`px-2 mt-4 mb-2 font-medium uppercase tracking-wider text-[9px] ${t.textSecondary}`}>Platform</p>
          <button className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all ${t.sidebarText}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            Store Catalog
          </button>
          <button className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all ${t.sidebarText}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            Gamification Engine
          </button>
        </div>

        <div className={`p-3 border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'} shrink-0`}>
          <div className="flex items-center gap-2">
            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${theme === 'light' ? 'bg-gray-200 text-gray-700' : 'bg-gray-800 text-gray-300'}`}>TW</div>
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-semibold truncate ${t.textPrimary}`}>Trent Wrightson</p>
              <p className={`text-[9px] truncate ${t.textSecondary}`}>Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN DATA CANVAS */}
      <main className="flex-1 h-screen overflow-y-auto relative no-scrollbar flex flex-col">
        
        {/* ULTRA-DENSE HEADER WITH THEME TOGGLE */}
        <header className={`h-12 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0 ${t.headerBg}`}>
          <div className="flex items-center gap-4">
            <h2 className={`text-xs font-semibold ${t.textPrimary}`}>Analytics Overview</h2>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${t.accentBg}`}>Live Environment</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`flex items-center rounded-md p-0.5 border ${theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-[#222] border-white/10'}`}>
              <button onClick={() => setTheme('light')} className={`px-2.5 py-1 text-[10px] font-semibold rounded-sm transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Light (FinTech)</button>
              <button onClick={() => setTheme('dark')} className={`px-2.5 py-1 text-[10px] font-semibold rounded-sm transition-all ${theme === 'dark' ? 'bg-[#333] shadow-sm text-white' : 'text-gray-500'}`}>Dark (Dev)</button>
            </div>
            <Link href="/dashboard" className={`text-[10px] font-medium border px-2 py-1 rounded transition ${theme === 'light' ? 'border-gray-200 hover:bg-gray-50 text-gray-600' : 'border-white/10 hover:bg-white/5 text-gray-300'}`}>Exit</Link>
          </div>
        </header>

        {/* HIGH DENSITY CONTENT */}
        <div className="p-6 flex-1 max-w-7xl mx-auto w-full">
          
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h1 className={`text-xl font-semibold tracking-tight mb-1 ${t.textPrimary}`}>Platform Operations</h1>
              <p className={`text-[11px] ${t.textSecondary}`}>Last updated: Just now</p>
            </div>
            <div className="flex gap-2">
              <button className={`text-[11px] font-medium px-3 py-1.5 rounded-md border transition ${theme === 'light' ? 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700' : 'bg-[#1A1A1A] border-white/10 hover:bg-white/5 text-gray-300'}`}>Export CSV</button>
              <button className={`text-[11px] font-medium px-3 py-1.5 rounded-md border transition ${theme === 'light' ? 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800' : 'bg-white border-white text-black hover:bg-gray-200'}`}>Generate Report</button>
            </div>
          </div>

          {/* COMPACT KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Volume', value: '$14,285.50', trend: '+12.5%', pos: true },
              { label: 'Active Users', value: '4,821', trend: '+8.2%', pos: true },
              { label: 'Points Circulating', value: '1.24M', trend: '-2.1%', pos: false },
              { label: 'Pending Payouts', value: '$840.00', trend: '4 Req', pos: null, alert: true }
            ].map((kpi, i) => (
              <div key={i} className={`rounded-lg p-4 ${t.cardBg}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${t.textSecondary}`}>{kpi.label}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-sm ${kpi.alert ? 'bg-red-500/10 text-red-500' : kpi.pos ? t.accentBg : 'bg-gray-500/10 text-gray-500'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <div className={`text-xl font-semibold tracking-tight ${t.textPrimary}`}>{kpi.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* DATA TABLE - HIGH DENSITY */}
            <div className={`lg:col-span-2 rounded-lg ${t.cardBg} overflow-hidden`}>
              <div className={`px-4 py-3 border-b flex justify-between items-center ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
                <h3 className={`text-[11px] font-semibold uppercase tracking-wider ${t.textPrimary}`}>Recent Transactions</h3>
                <button className={`text-[10px] ${t.textSecondary} hover:${t.textPrimary}`}>View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className={theme === 'light' ? 'bg-gray-50 text-gray-500' : 'bg-[#111] text-gray-400'}>
                    <tr>
                      <th className="px-4 py-2 font-medium">User</th>
                      <th className="px-4 py-2 font-medium">Action</th>
                      <th className="px-4 py-2 font-medium text-right">Amount</th>
                      <th className="px-4 py-2 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-100' : 'divide-white/5'}`}>
                    {[
                      { user: 'Sarah Jenkins', id: 'usr_8f72a', action: 'Store Purchase (The Iconic)', amount: '+$14.50', status: 'Cleared' },
                      { user: 'Michael Chen', id: 'usr_2b91c', action: 'Vault Redemption (Spotify)', amount: '-1500 PTS', status: 'Pending' },
                      { user: 'Emma Watson', id: 'usr_9x44f', action: 'Referral Escrow Unlock', amount: '+1000 PTS', status: 'Cleared' },
                      { user: 'David Lee', id: 'usr_1a88d', action: 'Store Purchase (Woolworths)', amount: '+$2.20', status: 'Processing' },
                    ].map((row, i) => (
                      <tr key={i} className={`transition-colors ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-white/5'}`}>
                        <td className="px-4 py-2.5">
                          <p className={`font-medium ${t.textPrimary}`}>{row.user}</p>
                          <p className={`text-[9px] ${t.textSecondary} font-mono mt-0.5`}>{row.id}</p>
                        </td>
                        <td className={`px-4 py-2.5 ${t.textSecondary}`}>{row.action}</td>
                        <td className={`px-4 py-2.5 text-right font-mono ${row.amount.includes('+') ? t.accent : t.textPrimary}`}>{row.amount}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-sm ${row.status === 'Cleared' ? t.accentBg : row.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUICK ACTIONS - LIST FORMAT */}
            <div className={`rounded-lg ${t.cardBg} p-4 flex flex-col`}>
              <h3 className={`text-[11px] font-semibold uppercase tracking-wider mb-4 ${t.textPrimary}`}>System Health</h3>
              
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className={t.textSecondary}>API Latency (Supabase)</span>
                    <span className={t.accent}>42ms</span>
                  </div>
                  <div className={`h-1 w-full rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-white/10'}`}>
                    <div className="h-full w-[15%] bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className={t.textSecondary}>Escrow Liability</span>
                    <span className={t.textPrimary}>84k / 100k Limit</span>
                  </div>
                  <div className={`h-1 w-full rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-white/10'}`}>
                    <div className="h-full w-[84%] bg-orange-400 rounded-full"></div>
                  </div>
                </div>

                <div className={`mt-6 pt-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
                   <p className={`text-[10px] font-semibold mb-2 ${t.textPrimary}`}>Require Attention</p>
                   <ul className={`text-[11px] space-y-2 ${t.textSecondary}`}>
                     <li className="flex items-center gap-2 cursor-pointer hover:underline"><span className="h-1.5 w-1.5 rounded-full bg-red-500"></span> 4 Payouts pending review</li>
                     <li className="flex items-center gap-2 cursor-pointer hover:underline"><span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> 12 Impact photos submitted</li>
                     <li className="flex items-center gap-2 cursor-pointer hover:underline"><span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span> 2 IP Address anomalies detected</li>
                   </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}