'use client';

import React, { useState } from 'react';

// --- MOCK DATA ---
const mockPayouts = [
  { id: 'pay_9x81f', userId: 'usr_8f72a', name: 'Sarah Jenkins', amount: 120.00, method: 'PayID', details: 'sarah.j@example.com', status: 'pending', date: '28 Feb 2026', riskScore: 12 },
  { id: 'pay_3a29c', userId: 'usr_9x44f', name: 'Alex BotFarm', amount: 450.00, method: 'PayPal', details: 'dealhunter99@tempmail.com', status: 'pending', date: '28 Feb 2026', riskScore: 98 },
  { id: 'pay_1c77d', userId: 'usr_2b91c', name: 'Michael Chen', amount: 50.00, method: 'Bank Transfer', details: 'BSB: 062-123 ACC: 12345678', status: 'cleared', date: '25 Feb 2026', riskScore: 5 },
  { id: 'pay_8b22e', userId: 'usr_1a88d', name: 'Emma Watson', amount: 25.00, method: 'Charity Donation', details: 'Wildlife Rescue NSW', status: 'cleared', date: '24 Feb 2026', riskScore: 8 },
  { id: 'pay_5f99a', userId: 'usr_7c33e', name: 'Scammer Dan', amount: 100.00, method: 'Gift Card', details: 'Woolworths $100', status: 'rejected', date: '20 Feb 2026', riskScore: 100 },
];

const mockMethods = [
  { id: 'm_1', name: 'Bank Transfer (BSB/ACC)', type: 'fiat', fee: '$0.00', active: true, desc: 'Direct deposit to Australian bank accounts.' },
  { id: 'm_2', name: 'PayID', type: 'fiat', fee: '$0.00', active: true, desc: 'Instant transfer via email or mobile number.' },
  { id: 'm_3', name: 'PayPal', type: 'fiat', fee: '2.9%', active: false, desc: 'Global digital wallet transfer.' },
  { id: 'm_4', name: 'Digital Gift Card', type: 'voucher', fee: '$0.00', active: true, desc: 'Instant automated gift card generation.' },
  { id: 'm_5', name: 'Charity Match Donation', type: 'charity', fee: '$0.00', active: true, desc: 'User donates balance, Givebly executes transfer.' },
];

export default function FinancialsHQ() {
  const [activeTab, setActiveTab] = useState<'queue' | 'methods'>('queue');
  const [selectedPayout, setSelectedPayout] = useState<any | null>(null);

  return (
    <div className="animate-fadeIn pb-10 flex relative h-full">
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 transition-all duration-300 ${selectedPayout ? 'pr-[400px]' : ''}`}>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Financials & Payouts</h1>
            <p className="text-[11px] text-gray-500">Process withdrawals, manage gateways, and audit cashflow.</p>
          </div>
          <div className="flex gap-2">
            <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-white border-gray-200 hover:bg-gray-50 text-gray-700">Export Ledger</button>
          </div>
        </div>

        {/* COMPACT KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1">Total Disbursed</span>
            <span className="text-lg font-semibold text-gray-900">$12,450.00</span>
          </div>
          <div className="rounded-lg p-3 bg-orange-50 border border-orange-100 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 block mb-1">Pending Liability</span>
            <span className="text-lg font-semibold text-orange-700">$570.00</span>
          </div>
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1">Pending Requests</span>
            <span className="text-lg font-semibold text-gray-900">2</span>
          </div>
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1">Avg Processing Time</span>
            <span className="text-lg font-semibold text-emerald-600">1.2 Days</span>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg w-max mb-4 border border-gray-200">
          <button 
            onClick={() => setActiveTab('queue')} 
            className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition ${activeTab === 'queue' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Payout Queue
          </button>
          <button 
            onClick={() => setActiveTab('methods')} 
            className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition ${activeTab === 'methods' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Payment Gateways
          </button>
        </div>

        {activeTab === 'queue' ? (
          /* THE PAYOUT QUEUE TABLE */
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] text-[11px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Date / ID</th>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold text-right">Amount</th>
                  <th className="px-4 py-3 font-semibold">Method / Dest</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPayouts.map((pay) => (
                  <tr key={pay.id} className={`transition-colors ${pay.status === 'pending' ? 'bg-orange-50/10 hover:bg-orange-50/30' : 'hover:bg-gray-50'}`}>
                    
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{pay.date}</p>
                      <p className="text-[9px] text-gray-400 font-mono mt-0.5">{pay.id}</p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {pay.riskScore > 80 && <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" title="High Fraud Risk"></span>}
                        <div>
                          <p className={`font-semibold ${pay.riskScore > 80 ? 'text-red-600' : 'text-gray-900'}`}>{pay.name}</p>
                          <p className="text-[9px] text-gray-500 font-mono">{pay.userId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <p className="font-mono font-semibold text-gray-900">${pay.amount.toFixed(2)}</p>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{pay.method}</span>
                      <p className="font-mono text-[10px] text-gray-700 mt-0.5 truncate max-w-[150px]" title={pay.details}>{pay.details}</p>
                    </td>

                    <td className="px-4 py-3">
                      {pay.status === 'pending' && <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Pending</span>}
                      {pay.status === 'cleared' && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Cleared</span>}
                      {pay.status === 'rejected' && <span className="bg-red-50 text-red-700 border border-red-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Rejected</span>}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => setSelectedPayout(pay)}
                        className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm transition border ${pay.status === 'pending' ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                      >
                        {pay.status === 'pending' ? 'Process' : 'View'}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* THE PAYMENT METHODS MANAGER */
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Supported Gateways</h3>
                <p className="text-[11px] text-gray-500">Toggle payout methods available to users.</p>
              </div>
              <button className="text-[11px] font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition shadow-sm">+ Add Gateway</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockMethods.map(method => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[12px] font-semibold text-gray-900">{method.name}</h4>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${method.type === 'fiat' ? 'bg-blue-50 text-blue-600 border border-blue-100' : method.type === 'voucher' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                        {method.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-3">{method.desc}</p>
                    <p className="text-[9px] font-mono text-gray-400 uppercase">Gateway Fee: {method.fee}</p>
                  </div>
                  
                  {/* CSS Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={method.active} />
                    <div className="w-8 h-4.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* --- SLIDE-OUT DRAWER FOR PROCESSING PAYOUTS --- */}
      {selectedPayout && (
        <div className="fixed top-0 right-0 w-[400px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-y-auto">
          
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 sticky top-0 z-20 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Payout Request</h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{selectedPayout.id}</p>
            </div>
            <button onClick={() => setSelectedPayout(null)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* Amount Box */}
            <div className="bg-gray-900 rounded-lg p-5 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 relative z-10">Requested Amount</span>
              <span className="text-3xl font-mono font-medium text-white relative z-10">${selectedPayout.amount.toFixed(2)}</span>
              {selectedPayout.status === 'pending' ? (
                 <span className="mt-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider relative z-10">Awaiting Transfer</span>
              ) : (
                 <span className={`mt-2 border text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider relative z-10 ${selectedPayout.status === 'cleared' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>{selectedPayout.status}</span>
              )}
            </div>

            {/* Risk Check */}
            <div className={`p-4 rounded-lg border flex items-center justify-between ${selectedPayout.riskScore > 80 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedPayout.riskScore > 80 ? 'text-red-700' : 'text-emerald-700'}`}>Pre-Flight Fraud Check</p>
                <p className="text-[10px] text-gray-600 mt-1">{selectedPayout.name} ({selectedPayout.userId})</p>
              </div>
              <div className={`text-2xl font-black ${selectedPayout.riskScore > 80 ? 'text-red-600' : 'text-emerald-600'}`}>
                {selectedPayout.riskScore}
              </div>
            </div>

            {/* Transfer Instructions */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Transfer Instructions</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Method</span>
                  <span className="text-[11px] font-semibold text-gray-900">{selectedPayout.method}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Destination</span>
                  <div className="bg-white border border-gray-200 rounded p-2 flex justify-between items-center group cursor-pointer hover:border-emerald-500 transition">
                    <span className="font-mono text-[11px] text-gray-800">{selectedPayout.details}</span>
                    <span className="text-[9px] text-emerald-600 opacity-0 group-hover:opacity-100 transition font-bold uppercase">Copy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {selectedPayout.status === 'pending' && (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button className="w-full bg-emerald-600 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Mark as Funds Sent
                </button>
                <button className="w-full bg-white border border-red-200 text-red-600 text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-red-50 transition">
                  Reject & Refund Points
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}