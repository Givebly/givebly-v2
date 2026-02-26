'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default function AdminRedemptions() {
  const [activeTab, setActiveTab] = useState<'queue' | 'inventory'>('queue');
  const [queue, setQueue] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Reward State
  const [newReward, setNewReward] = useState({ title: '', description: '', points_cost: '', icon: '🎁', category: 'digital', theme_style: 'bg-gray-900 text-white' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    // Fetch Pending Orders
    const { data: qData } = await supabase.from('redemptions').select('*').order('created_at', { ascending: false });
    if (qData) setQueue(qData);

    // Fetch Inventory
    const { data: iData } = await supabase.from('rewards_inventory').select('*').order('points_cost', { ascending: true });
    if (iData) setInventory(iData);
    
    setIsLoading(false);
  }

  // --- QUEUE ACTIONS ---
  const markFulfilled = async (id: string) => {
    const { error } = await supabase.from('redemptions').update({ status: 'fulfilled' }).eq('id', id);
    if (!error) fetchData();
  };

  // --- INVENTORY ACTIONS ---
  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('rewards_inventory').update({ is_active: !currentStatus }).eq('id', id);
    if (!error) fetchData();
  };

  const deleteReward = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this reward?")) {
      await supabase.from('rewards_inventory').delete().eq('id', id);
      fetchData();
    }
  };

  const handleAddReward = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    const { error } = await supabase.from('rewards_inventory').insert([{
      ...newReward,
      points_cost: parseInt(newReward.points_cost, 10),
      is_active: true
    }]);
    
    if (!error) {
      setNewReward({ title: '', description: '', points_cost: '', icon: '🎁', category: 'digital', theme_style: 'bg-gray-900 text-white' });
      fetchData();
    } else {
      alert("Error adding reward: " + error.message);
    }
    setIsAdding(false);
  };

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold">Loading Command Center...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-end border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#1A2B48] mb-2">Vault Command Center</h1>
            <p className="text-gray-500 font-medium">Manage user redemptions and live digital inventory.</p>
          </div>
          <Link href="/admin" className="text-gray-500 font-bold hover:text-[#1A2B48] px-4 py-2 transition">
            &larr; Main Admin
          </Link>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('queue')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'queue' ? 'bg-[#1A2B48] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
            Fulfillment Queue ({queue.filter(q => q.status === 'pending').length})
          </button>
          <button onClick={() => setActiveTab('inventory')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'inventory' ? 'bg-[#1A2B48] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
            Manage Inventory
          </button>
        </div>

        {/* TAB 1: FULFILLMENT QUEUE */}
        {activeTab === 'queue' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-widest">
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">User Email</th>
                  <th className="p-4 font-bold">Reward Requested</th>
                  <th className="p-4 font-bold">Cost</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {queue.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4 font-bold text-[#1A2B48]">{order.user_email || 'Missing Email'}</td>
                    <td className="p-4 font-bold text-[#2ECC71]">{order.reward_title}</td>
                    <td className="p-4 font-bold text-gray-500">{order.points_cost} pts</td>
                    <td className="p-4 text-right">
                      {order.status === 'pending' ? (
                        <button onClick={() => markFulfilled(order.id)} className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition">Mark Fulfilled</button>
                      ) : (
                        <span className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 inline-flex">✓ Sent</span>
                      )}
                    </td>
                  </tr>
                ))}
                {queue.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-bold">No redemptions yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* INVENTORY LIST */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-[#1A2B48] mb-4">Live Rewards</h2>
              {inventory.map(item => (
                <div key={item.id} className={`bg-white rounded-2xl shadow-sm border p-5 flex items-center justify-between transition ${item.is_active ? 'border-green-200' : 'border-gray-200 opacity-60'}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-[#1A2B48] flex items-center gap-2">
                        {item.title} 
                        <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">{item.category}</span>
                      </h4>
                      <p className="text-sm text-gray-500">{item.points_cost} pts • {item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleVisibility(item.id, item.is_active)} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${item.is_active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                      {item.is_active ? 'Hide' : 'Unhide'}
                    </button>
                    <button onClick={() => deleteReward(item.id)} className="text-gray-400 hover:text-red-500 transition">🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD NEW REWARD FORM */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-max sticky top-6">
              <h2 className="text-xl font-black text-[#1A2B48] mb-4">Add New Reward</h2>
              <form onSubmit={handleAddReward} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                  <input type="text" required value={newReward.title} onChange={e => setNewReward({...newReward, title: e.target.value})} placeholder="e.g. 1 Month Netflix" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                  <textarea required value={newReward.description} onChange={e => setNewReward({...newReward, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Points Cost</label>
                    <input type="number" required value={newReward.points_cost} onChange={e => setNewReward({...newReward, points_cost: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Emoji Icon</label>
                    <input type="text" required value={newReward.icon} onChange={e => setNewReward({...newReward, icon: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                  <select value={newReward.category} onChange={e => setNewReward({...newReward, category: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]">
                    <option value="digital">Digital Upgrade</option>
                    <option value="charity">Charity Donation</option>
                  </select>
                </div>
                <button type="submit" disabled={isAdding} className="w-full bg-[#2ECC71] text-[#1A2B48] font-black py-3 rounded-xl hover:bg-green-400 transition shadow-sm mt-4">
                  {isAdding ? 'Adding...' : 'Add to Vault'}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}