'use client';

import React, { useState } from 'react';

// --- EXPANDED MOCK DATA ---
const mockUsers = [
  { 
    id: 'usr_8f72a', name: 'Sarah Jenkins', email: 'sarah.j@example.com', initials: 'SJ', status: 'active', 
    points: { lifetime: 14500, available: 3200, redeemed: 11300 },
    cashback: { lifetime: 450.50, pending: 45.00, available: 120.00, redeemed: 285.50 },
    referrals: { total: 12, pending: 4, approved: 8 },
    activity: { clicks: 142, transactions: 38, joined: '10 Feb 2026', lastActive: '2 hrs ago' },
    security: { regIp: '192.168.1.1', lastIp: '192.168.1.1', device: 'iPhone 15 Pro', fraudScore: 12 }
  },
  { 
    id: 'usr_2b91c', name: 'Michael Chen', email: 'mike.chen@example.com', initials: 'MC', status: 'active', 
    points: { lifetime: 8200, available: 8200, redeemed: 0 },
    cashback: { lifetime: 120.00, pending: 120.00, available: 0, redeemed: 0 },
    referrals: { total: 2, pending: 2, approved: 0 },
    activity: { clicks: 45, transactions: 12, joined: '12 Feb 2026', lastActive: '1 day ago' },
    security: { regIp: '10.0.0.5', lastIp: '10.0.0.5', device: 'MacBook Air M2', fraudScore: 5 }
  },
  { 
    id: 'usr_9x44f', name: 'Alex BotFarm', email: 'dealhunter99@tempmail.com', initials: 'AB', status: 'suspended', 
    points: { lifetime: 500, available: 500, redeemed: 0 },
    cashback: { lifetime: 0, pending: 0, available: 0, redeemed: 0 },
    referrals: { total: 45, pending: 45, approved: 0 },
    activity: { clicks: 0, transactions: 0, joined: '28 Feb 2026', lastActive: '5 mins ago' },
    security: { regIp: '45.22.11.9 (VPN)', lastIp: '45.22.11.9 (VPN)', device: 'Linux Desktop', fraudScore: 98 }
  },
];

export default function UsersCRM() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [creditType, setCreditType] = useState('cashback');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fadeIn pb-10 flex relative h-full">
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 transition-all duration-300 ${selectedUser ? 'pr-[500px]' : ''}`}>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Customers & CRM</h1>
            <p className="text-[11px] text-gray-500">Manage accounts, process missing credits, and monitor fraud.</p>
          </div>
          <div className="flex gap-2">
            <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-white border-gray-200 hover:bg-gray-50 text-gray-700">Export CSV</button>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white border border-gray-200 rounded-t-lg shadow-sm p-3 flex flex-col sm:flex-row gap-4 justify-between items-center border-b-0">
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[11px] font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
          
          <div className="flex bg-gray-100 p-0.5 rounded-md w-full sm:w-auto border border-gray-200">
            <button onClick={() => setStatusFilter('all')} className={`flex-1 sm:px-3 py-1 text-[10px] font-semibold rounded-sm transition ${statusFilter === 'all' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
            <button onClick={() => setStatusFilter('active')} className={`flex-1 sm:px-3 py-1 text-[10px] font-semibold rounded-sm transition ${statusFilter === 'active' ? 'bg-white shadow-sm text-emerald-700 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>Active</button>
            <button onClick={() => setStatusFilter('suspended')} className={`flex-1 sm:px-3 py-1 text-[10px] font-semibold rounded-sm transition ${statusFilter === 'suspended' ? 'bg-white shadow-sm text-orange-600 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>Suspended</button>
            <button onClick={() => setStatusFilter('banned')} className={`flex-1 sm:px-3 py-1 text-[10px] font-semibold rounded-sm transition ${statusFilter === 'banned' ? 'bg-white shadow-sm text-red-600 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>Banned</button>
          </div>
        </div>

        {/* COMPACT MASTER TABLE */}
        <div className="bg-white rounded-b-lg border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] text-[11px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">User Details</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Joined / Activity</th>
                <th className="px-4 py-3 font-semibold">Risk Score</th>
                <th className="px-4 py-3 font-semibold text-right">Lifetime Balances</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm border ${user.security.fraudScore > 80 ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                        {user.initials}
                      </div>
                      <div>
                        <p className={`font-semibold ${user.status === 'banned' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{user.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[9px] text-gray-500">{user.email}</p>
                          {user.security.regIp.includes('VPN') && <span className="text-[8px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold uppercase">VPN</span>}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {user.status === 'active' && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Active</span>}
                    {user.status === 'suspended' && <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Suspended</span>}
                    {user.status === 'banned' && <span className="bg-red-50 text-red-700 border border-red-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Banned</span>}
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-gray-900 font-medium">{user.activity.joined}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">{user.activity.transactions} Shops • {user.activity.clicks} Clicks</p>
                  </td>

                  {/* NEW FRAUD SCORE COLUMN */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-black border shadow-sm ${
                        user.security.fraudScore > 79 ? 'bg-red-50 text-red-700 border-red-200' : 
                        user.security.fraudScore > 20 ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {user.security.fraudScore}
                      </div>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${
                          user.security.fraudScore > 79 ? 'bg-red-500' : 
                          user.security.fraudScore > 20 ? 'bg-orange-400' : 
                          'bg-emerald-500'
                        }`} style={{ width: `${user.security.fraudScore}%` }}></div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <p className="text-gray-900 font-mono font-medium">${user.cashback.lifetime.toFixed(2)}</p>
                    <p className="text-[9px] text-gray-500 font-mono mt-0.5">{user.points.lifetime.toLocaleString()} PTS</p>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => { setSelectedUser(user); setShowCreditForm(false); }}
                      className="bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition"
                    >
                      Dossier &rarr;
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- THE FULL-HEIGHT DOSSIER DRAWER --- */}
      {selectedUser && (
        <div className="fixed top-0 right-0 w-[500px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-y-auto">
          
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 sticky top-0 z-20 flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shadow-sm border ${selectedUser.security.fraudScore > 80 ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-800'}`}>
                {selectedUser.initials}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">{selectedUser.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[11px] text-gray-500 font-medium">{selectedUser.email}</p>
                  <span className="text-[9px] text-gray-400 font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200">{selectedUser.id}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedUser(null)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 space-y-8 flex-1">
            
            <div className={`p-4 rounded-lg border flex items-center justify-between ${selectedUser.security.fraudScore > 80 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedUser.security.fraudScore > 80 ? 'text-red-700' : 'text-emerald-700'}`}>System Fraud Score</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">Reg IP</span>
                    <span className={`text-[11px] font-mono font-medium ${selectedUser.security.regIp.includes('VPN') ? 'text-red-600' : 'text-gray-700'}`}>{selectedUser.security.regIp}</span>
                  </div>
                  <div className="flex flex-col border-l border-gray-300 pl-4">
                    <span className="text-[9px] text-gray-500 uppercase">Device</span>
                    <span className="text-[11px] font-mono font-medium text-gray-700">{selectedUser.security.device}</span>
                  </div>
                </div>
              </div>
              <div className={`text-3xl font-black ${selectedUser.security.fraudScore > 80 ? 'text-red-600' : 'text-emerald-600'}`}>
                {selectedUser.security.fraudScore}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Financial Ledger</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Cashback</span>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between"><span className="text-[10px] text-gray-500">Available</span><span className="text-[11px] font-mono font-semibold text-emerald-600">${selectedUser.cashback.available.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-[10px] text-gray-500">Pending</span><span className="text-[11px] font-mono font-medium text-orange-500">${selectedUser.cashback.pending.toFixed(2)}</span></div>
                    <div className="flex justify-between pt-1 border-t border-gray-200 mt-1"><span className="text-[10px] text-gray-500">Lifetime</span><span className="text-[11px] font-mono font-bold text-gray-900">${selectedUser.cashback.lifetime.toFixed(2)}</span></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Points</span>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between"><span className="text-[10px] text-gray-500">Available</span><span className="text-[11px] font-mono font-semibold text-yellow-600">{selectedUser.points.available}</span></div>
                    <div className="flex justify-between"><span className="text-[10px] text-gray-500">Redeemed</span><span className="text-[11px] font-mono font-medium text-gray-500">{selectedUser.points.redeemed}</span></div>
                    <div className="flex justify-between pt-1 border-t border-gray-200 mt-1"><span className="text-[10px] text-gray-500">Lifetime</span><span className="text-[11px] font-mono font-bold text-gray-900">{selectedUser.points.lifetime}</span></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Network</span>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between"><span className="text-[10px] text-gray-500">Approved</span><span className="text-[11px] font-mono font-semibold text-emerald-600">{selectedUser.referrals.approved}</span></div>
                    <div className="flex justify-between"><span className="text-[10px] text-gray-500">Pending</span><span className="text-[11px] font-mono font-medium text-orange-500">{selectedUser.referrals.pending}</span></div>
                    <div className="flex justify-between pt-1 border-t border-gray-200 mt-1"><span className="text-[10px] text-gray-500">Total</span><span className="text-[11px] font-mono font-bold text-gray-900">{selectedUser.referrals.total}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Manual Ledger Adjustment</h3>
              </div>
              
              {!showCreditForm ? (
                <button 
                  onClick={() => setShowCreditForm(true)}
                  className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-emerald-500 hover:text-emerald-600 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Process Missing Cashback / Points
                </button>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-fadeIn">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Credit Details</h4>
                    <button onClick={() => setShowCreditForm(false)} className="text-[10px] text-gray-400 hover:text-gray-900">Cancel</button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex bg-white rounded-md border border-gray-200 p-0.5">
                      <button onClick={() => setCreditType('cashback')} className={`flex-1 py-1 text-[10px] font-bold rounded-sm ${creditType === 'cashback' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm' : 'text-gray-500'}`}>Cashback</button>
                      <button onClick={() => setCreditType('points')} className={`flex-1 py-1 text-[10px] font-bold rounded-sm ${creditType === 'points' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100 shadow-sm' : 'text-gray-500'}`}>Impact Points</button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Transaction ID</label>
                        <input type="text" placeholder="CJ-19283..." className="w-full text-[11px] px-2.5 py-1.5 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Store / Source</label>
                        <input type="text" placeholder="e.g. Woolworths" className="w-full text-[11px] px-2.5 py-1.5 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Amount ({creditType === 'cashback' ? '$' : 'PTS'})</label>
                        <input type="number" placeholder="0.00" className="w-full text-[11px] px-2.5 py-1.5 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Status</label>
                        <select className="w-full text-[11px] px-2.5 py-1.5 rounded bg-white border border-gray-200 outline-none focus:border-emerald-500">
                          <option>Available</option>
                          <option>Pending</option>
                        </select>
                      </div>
                    </div>

                    <button className="w-full mt-2 bg-gray-900 text-white text-[11px] font-bold py-2 rounded shadow-sm hover:bg-gray-800 transition">
                      Process Credit to Ledger
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
               <h3 className="text-[11px] font-semibold text-red-600 uppercase tracking-wider mb-3">Security Interventions</h3>
               <div className="flex gap-2">
                 {selectedUser.status === 'suspended' ? (
                   <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-[10px] font-bold py-2 rounded shadow-sm hover:bg-gray-50 transition">Remove Suspension</button>
                 ) : (
                   <button className="flex-1 bg-white border border-orange-200 text-orange-600 text-[10px] font-bold py-2 rounded shadow-sm hover:bg-orange-50 transition">Suspend User</button>
                 )}
                 <button className="flex-1 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold py-2 rounded shadow-sm hover:bg-red-100 transition">Permanent Ban</button>
               </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}