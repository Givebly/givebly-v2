'use client';

import React, { useState } from 'react';

// --- MOCK DATA FOR THE ADMIN PANEL ---
const mockApplications = [
  { id: 'app_1', orgName: 'Griffith Tigers Under 12s', repName: 'Michael Chen', abn: '83 123 456 789', campaign: 'New Jerseys', amount: 2500, status: 'pending', date: '28 Feb 2026' },
  { id: 'app_2', orgName: 'Coastal Animal Rescue', repName: 'Sarah Jenkins', abn: '11 987 654 321', campaign: 'Emergency Vet Fund', amount: 5000, status: 'pending', date: '27 Feb 2026' },
  { id: 'app_3', orgName: 'Westside Community Radio', repName: 'David Lee', abn: '44 555 666 777', campaign: 'Studio Transmitter', amount: 3000, status: 'active', date: '15 Feb 2026' },
];

export default function CausesAdminHQ() {
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const filteredApps = mockApplications.filter(app => app.status === activeTab);

  return (
    <div className="animate-fadeIn pb-10 flex relative h-full overflow-hidden">
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 transition-all duration-300 ${selectedApp ? 'pr-[450px]' : ''}`}>
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Partner & Cause Approvals</h1>
            <p className="text-[11px] text-gray-500">Verify ABNs, review campaign goals, and manage community partners.</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg w-max mb-6 border border-gray-200">
          <button onClick={() => { setActiveTab('pending'); setSelectedApp(null); }} className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition flex items-center gap-2 ${activeTab === 'pending' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>
            Pending Review
            <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">2</span>
          </button>
          <button onClick={() => { setActiveTab('active'); setSelectedApp(null); }} className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition ${activeTab === 'active' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>
            Live Partners
          </button>
        </div>

        {/* THE TABLE */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] text-[11px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Organization</th>
                <th className="px-4 py-3 font-semibold">ABN / Rep</th>
                <th className="px-4 py-3 font-semibold">First Campaign</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className={`transition-colors ${app.status === 'pending' ? 'bg-orange-50/10 hover:bg-orange-50/30' : 'hover:bg-gray-50'}`}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{app.orgName}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">Applied: {app.date}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-mono font-medium text-gray-700">{app.abn}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">{app.repName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{app.campaign}</p>
                    <p className="text-[9px] text-emerald-600 font-bold mt-0.5">${app.amount}</p>
                  </td>
                  <td className="px-4 py-3">
                    {app.status === 'pending' && <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Awaiting Review</span>}
                    {app.status === 'active' && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Live on Platform</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setSelectedApp(app)} className="bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition">
                      Review File
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-medium">No records found in this queue.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* --- SLIDE-OUT DRAWER: APPLICATION REVIEW --- */}
      {selectedApp && (
        <div className="fixed top-0 right-0 w-[450px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Application Review</h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{selectedApp.id}</p>
            </div>
            <button onClick={() => setSelectedApp(null)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white no-scrollbar">
            
            {/* ABN Verification Box */}
            <div className={`p-4 rounded-lg border ${selectedApp.status === 'pending' ? 'bg-orange-50 border-orange-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedApp.status === 'pending' ? 'text-orange-700' : 'text-emerald-700'}`}>ABN / Legal Verification</span>
                {selectedApp.status === 'pending' && <a href={`https://abr.business.gov.au/ABN/View?abn=${selectedApp.abn.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="text-[9px] font-bold text-blue-600 hover:underline">Lookup ABN &rarr;</a>}
              </div>
              <p className="font-mono text-lg font-black text-gray-900">{selectedApp.abn}</p>
              <p className="text-[11px] font-semibold text-gray-700 mt-1">{selectedApp.orgName}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Rep: {selectedApp.repName}</p>
            </div>

            {/* Campaign Details */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Proposed Campaign</h3>
              <div className="space-y-3">
                <div>
                  <span className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Campaign Title</span>
                  <span className="text-[12px] font-medium text-gray-900">{selectedApp.campaign}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Target Goal</span>
                    <span className="text-[14px] font-black text-[#1A2B48]">${selectedApp.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-emerald-600 uppercase mb-1">Tangible Metric</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Example: $50 = 1 Jersey</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              {selectedApp.status === 'pending' ? (
                <>
                  <button className="w-full bg-[#2ECC71] text-[#1A2B48] text-[11px] font-black py-3 rounded-xl shadow-md hover:bg-[#27AE60] transition">
                    Approve & Set Live
                  </button>
                  <button className="w-full bg-white border border-gray-300 text-gray-700 text-[11px] font-bold py-3 rounded-xl shadow-sm hover:bg-gray-50 transition">
                    Request More Information (Email)
                  </button>
                  <button className="w-full bg-white border border-red-200 text-red-600 text-[11px] font-bold py-3 rounded-xl shadow-sm hover:bg-red-50 transition">
                    Deny Application
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full bg-gray-900 text-white text-[11px] font-black py-3 rounded-xl shadow-md hover:bg-gray-800 transition">
                    View Live Campaign
                  </button>
                  <button className="w-full bg-white border border-red-200 text-red-600 text-[11px] font-bold py-3 rounded-xl shadow-sm hover:bg-red-50 transition">
                    Suspend Organization
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}