'use client';

import React, { useState } from 'react';

// --- MOCK DATA ---
const mockInventory = [
  { id: 'vlt_1a', name: 'Spotify Premium (3 Months)', type: 'Digital Code', basePrice: 1500, salePrice: 1200, stock: 45, status: 'active', isSale: true },
  { id: 'vlt_2b', name: 'UberEats $20 Gift Card', type: 'Digital Code', basePrice: 2000, salePrice: null, stock: 12, status: 'active', isSale: false },
  { id: 'vlt_3c', name: 'Givebly Exclusive Hoodie', type: 'Physical Merch', basePrice: 5000, salePrice: null, stock: 0, status: 'out_of_stock', isSale: false },
  { id: 'vlt_4d', name: '$50 Charity Donation (Matched)', type: 'Impact', basePrice: 5000, salePrice: null, stock: 999, status: 'active', isSale: false },
  { id: 'vlt_5e', name: 'Netflix (1 Month)', type: 'Digital Code', basePrice: 800, salePrice: null, stock: 100, status: 'hidden', isSale: false },
];

const mockOrders = [
  { id: 'ord_99x1', user: 'Sarah Jenkins', item: 'Spotify Premium (3 Months)', cost: 1200, status: 'pending', date: '28 Feb 2026' },
  { id: 'ord_88y2', user: 'Michael Chen', item: 'UberEats $20 Gift Card', cost: 2000, status: 'pending', date: '28 Feb 2026' },
  { id: 'ord_77z3', user: 'Emma Watson', item: '$50 Charity Donation (Matched)', cost: 5000, status: 'fulfilled', date: '25 Feb 2026' },
];

export default function VaultRedemptionsHQ() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'queue'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Drawer States
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const handleNewItem = () => {
    setSelectedItem({
      isNew: true, id: 'NEW_VAULT_ITEM', name: '', type: 'Digital Code', basePrice: 1000, salePrice: '', stock: 100, status: 'active', isSale: false
    });
  };

  const filteredInventory = mockInventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredOrders = mockOrders.filter(order => order.user.toLowerCase().includes(searchQuery.toLowerCase()) || order.item.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="animate-fadeIn pb-10 flex relative h-full overflow-hidden">
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 transition-all duration-300 ${(selectedItem || selectedOrder) ? 'pr-[450px]' : ''}`}>
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Vault Inventory & Fulfillment</h1>
            <p className="text-[11px] text-gray-500">Manage reward catalogs, set flash sales, and fulfill digital orders.</p>
          </div>
          <div className="flex gap-2">
            <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm">Export Logs</button>
            {activeTab === 'inventory' && (
              <button onClick={handleNewItem} className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-gray-900 border-gray-900 text-white hover:bg-gray-800 flex items-center gap-1.5 shadow-sm">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Vault Item
              </button>
            )}
          </div>
        </div>

        {/* COMPACT KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg p-3 bg-white border border-gray-200 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Active Inventory</span>
            <span className="text-sm font-semibold text-gray-900">4 Items</span>
          </div>
          <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-100 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Points Burned (30d)</span>
            <span className="text-sm font-semibold text-emerald-700">142k PTS</span>
          </div>
          <div className="rounded-lg p-3 bg-orange-50 border border-orange-100 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-600">Pending Fulfillment</span>
            <span className="text-sm font-semibold text-orange-700">2 Orders</span>
          </div>
          <div className="rounded-lg p-3 bg-red-50 border border-red-100 shadow-sm flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-red-500">Low Stock Alerts</span>
            <span className="text-sm font-semibold text-red-600">1 Item</span>
          </div>
        </div>

        {/* TABS & SEARCH */}
        <div className="bg-white border border-gray-200 rounded-t-lg shadow-sm p-3 flex flex-col sm:flex-row gap-4 justify-between items-center border-b-0">
          <div className="flex bg-gray-100 p-0.5 rounded-md w-full sm:w-auto border border-gray-200">
            <button onClick={() => { setActiveTab('inventory'); setSelectedOrder(null); }} className={`px-4 py-1.5 text-[11px] font-semibold rounded-sm transition ${activeTab === 'inventory' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>Inventory Manager</button>
            <button onClick={() => { setActiveTab('queue'); setSelectedItem(null); }} className={`px-4 py-1.5 text-[11px] font-semibold rounded-sm transition ${activeTab === 'queue' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50 flex items-center gap-2' : 'text-gray-500 hover:text-gray-700 flex items-center gap-2'}`}>
              Fulfillment Queue 
              <span className="bg-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">2</span>
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder={`Search ${activeTab === 'inventory' ? 'inventory...' : 'orders...'}`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[11px] font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {activeTab === 'inventory' ? (
          /* THE INVENTORY TABLE */
          <div className="bg-white rounded-b-lg border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] text-[11px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Vault Item</th>
                  <th className="px-4 py-3 font-semibold">Cost (PTS)</th>
                  <th className="px-4 py-3 font-semibold">Stock Level</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">{item.type}</p>
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {item.isSale ? (
                        <div className="flex flex-col">
                          <span className="text-gray-400 line-through text-[9px]">{item.basePrice}</span>
                          <span className="text-emerald-600 font-bold">{item.salePrice} <span className="text-[8px] bg-emerald-100 px-1 py-0.5 rounded text-emerald-800 ml-1 uppercase">Sale</span></span>
                        </div>
                      ) : (
                        <span className="text-gray-900 font-medium">{item.basePrice}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-mono font-medium ${item.stock === 0 ? 'text-red-600' : item.stock < 20 ? 'text-orange-500' : 'text-gray-900'}`}>{item.stock}</span>
                      <span className="text-[9px] text-gray-500 ml-1">Units</span>
                    </td>
                    <td className="px-4 py-3">
                      {item.status === 'active' && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Live</span>}
                      {item.status === 'hidden' && <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Hidden</span>}
                      {item.status === 'out_of_stock' && <span className="bg-red-50 text-red-700 border border-red-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Empty</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setSelectedItem(item)} className="bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition">
                        Configure
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* THE FULFILLMENT QUEUE TABLE */
          <div className="bg-white rounded-b-lg border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] text-[11px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Order Details</th>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Cost</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className={`transition-colors ${order.status === 'pending' ? 'bg-orange-50/20 hover:bg-orange-50/50' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{order.item}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] text-gray-400 font-mono">{order.id}</span>
                        <span className="text-[9px] text-gray-400">• {order.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{order.user}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-600 font-medium">
                      -{order.cost} PTS
                    </td>
                    <td className="px-4 py-3">
                      {order.status === 'pending' && <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Requires Code</span>}
                      {order.status === 'fulfilled' && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">Fulfilled</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setSelectedOrder(order)} className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm transition border ${order.status === 'pending' ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                        {order.status === 'pending' ? 'Fulfill Order' : 'View Receipt'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* --- SLIDE-OUT DRAWER: INVENTORY EDITOR --- */}
      {selectedItem && (
        <div className="fixed top-0 right-0 w-[450px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">{selectedItem.isNew ? 'New Vault Item' : 'Edit Vault Item'}</h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{selectedItem.id}</p>
            </div>
            <button onClick={() => setSelectedItem(null)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white no-scrollbar">
            
            {/* Core Info */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Item Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Item Name</label>
                  <input type="text" defaultValue={selectedItem.name} className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-medium text-gray-900" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Item Type</label>
                    <select defaultValue={selectedItem.type} className="w-full text-[11px] px-2 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 text-gray-700 bg-white">
                      <option>Digital Code</option><option>Physical Merch</option><option>Impact</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Stock Level</label>
                    <input type="number" defaultValue={selectedItem.stock} className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-mono text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Sales */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Pricing & Flash Sales</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Base Cost (PTS)</label>
                  <input type="number" defaultValue={selectedItem.basePrice} className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-mono text-gray-900" />
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                  <label className="block text-[9px] font-bold text-emerald-700 uppercase mb-1">Sale Cost (Optional)</label>
                  <input type="number" defaultValue={selectedItem.salePrice} placeholder="Leave blank for no sale" className="w-full text-[11px] px-3 py-2 rounded border border-emerald-200 outline-none focus:border-emerald-500 font-mono text-emerald-900 bg-white" />
                  <p className="text-[9px] text-emerald-600 mt-1">If populated, frontend will cross out Base Cost automatically.</p>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Visibility</h3>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <span className="text-[11px] font-semibold text-gray-900 block">Live in Vault</span>
                  <span className="text-[9px] text-gray-500">Allow users to see and redeem this item.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={selectedItem.status === 'active'} />
                  <div className="w-8 h-4.5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-gray-900 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-gray-800 transition">
                {selectedItem.isNew ? 'Publish to Vault' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SLIDE-OUT DRAWER: FULFILLMENT MANAGER --- */}
      {selectedOrder && (
        <div className="fixed top-0 right-0 w-[450px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Order Fulfillment</h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{selectedOrder.id}</p>
            </div>
            <button onClick={() => setSelectedOrder(null)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white no-scrollbar">
            
            <div className="bg-gray-900 rounded-lg p-5 flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 relative z-10">Points Deducted</span>
              <span className="text-3xl font-mono font-medium text-white relative z-10">{selectedOrder.cost.toLocaleString()}</span>
              <p className="text-[10px] text-gray-400 mt-2">from <span className="text-white font-semibold">{selectedOrder.user}</span></p>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Requested Item</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900">{selectedOrder.item}</p>
                <p className="text-[10px] text-gray-500 mt-1">Date: {selectedOrder.date}</p>
              </div>
            </div>

            {selectedOrder.status === 'pending' ? (
              <div>
                <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Fulfillment Input</h3>
                <p className="text-[10px] text-gray-500 mb-3">Paste the digital gift card code or redemption link below. This will be securely emailed to the user.</p>
                <textarea 
                  rows={3} 
                  placeholder="e.g. XXXX-YYYY-ZZZZ" 
                  className="w-full text-[11px] px-3 py-2 rounded border border-gray-300 outline-none focus:border-emerald-500 font-mono text-gray-900 resize-none mb-3"
                ></textarea>
                
                <button className="w-full bg-emerald-600 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-emerald-700 transition flex justify-center items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  Send Code & Close Order
                </button>
                <button className="w-full mt-3 bg-white border border-red-200 text-red-600 text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-red-50 transition">
                  Reject Order & Refund Points
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Order Complete</p>
                <p className="text-[10px] text-emerald-600">Digital payload was dispatched successfully.</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}