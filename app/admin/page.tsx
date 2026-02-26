'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  // Form States
  const [name, setName] = useState('');
  const [rewardText, setRewardText] = useState('');
  const [rewardBonus, setRewardBonus] = useState(''); 
  const [rewardGiftcard, setRewardGiftcard] = useState(''); 
  const [category, setCategory] = useState('Retail');
  const [logoUrl, setLogoUrl] = useState('');
  const [storeUrl, setStoreUrl] = useState(''); // NEW: Destination URL
  
  // Placement States
  const [isTurbo, setIsTurbo] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isEveryday, setIsEveryday] = useState(false);
  const [hasGiftcard, setHasGiftcard] = useState(false);
  
  // App States
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stores, setStores] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setStores(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const storeData = { 
      name, 
      reward_text: rewardText, 
      reward_bonus: rewardBonus,
      reward_giftcard: rewardGiftcard,
      category, 
      logo_url: logoUrl,
      store_url: storeUrl, // NEW: Sending the URL to the database
      is_turbo: isTurbo,
      is_trending: isTrending,
      is_everyday: isEveryday,
      has_giftcard: hasGiftcard
    };

    if (editingId) {
      const { error } = await supabase.from('stores').update(storeData).eq('id', editingId);
      if (error) setStatus({ type: 'error', message: error.message });
      else {
        setStatus({ type: 'success', message: `${name} updated successfully!` });
        resetForm();
        fetchStores();
      }
    } else {
      const { error } = await supabase.from('stores').insert([storeData]);
      if (error) setStatus({ type: 'error', message: error.message });
      else {
        setStatus({ type: 'success', message: `${name} added to the live database!` });
        resetForm();
        fetchStores();
      }
    }
    setIsSubmitting(false);
  };

  const handleEditClick = (store: any) => {
    setEditingId(store.id);
    setName(store.name);
    setRewardText(store.reward_text || '');
    setRewardBonus(store.reward_bonus || '');
    setRewardGiftcard(store.reward_giftcard || '');
    setCategory(store.category || 'Retail');
    setLogoUrl(store.logo_url || '');
    setStoreUrl(store.store_url || ''); // NEW: Pulling the URL for editing
    setIsTurbo(store.is_turbo || false);
    setIsTrending(store.is_trending || false);
    setIsEveryday(store.is_everyday || false);
    setHasGiftcard(store.has_giftcard || false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id: string, storeName: string) => {
    if (window.confirm(`Are you sure you want to delete ${storeName}?`)) {
      const { error } = await supabase.from('stores').delete().eq('id', id);
      if (!error) fetchStores();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setRewardText('');
    setRewardBonus('');
    setRewardGiftcard('');
    setCategory('Retail');
    setLogoUrl('');
    setStoreUrl(''); // NEW: Clearing the URL box
    setIsTurbo(false);
    setIsTrending(false);
    setIsEveryday(false);
    setHasGiftcard(false);
  };

  // Filter stores based on search query
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-[#1A2B48] mb-2">Givebly Command Center</h1>
            <p className="text-gray-500 font-medium">Internal tools for platform management.</p>
          </div>
          <a href="/dashboard" target="_blank" className="bg-[#2ECC71] text-[#1A2B48] font-bold px-4 py-2 rounded-lg hover:bg-[#27AE60] transition shadow-sm">
            View Live Site &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE: THE FORM */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-8">
            <h2 className="text-lg font-bold text-[#1A2B48] mb-4 flex items-center gap-2">
              {editingId ? '✏️ Edit Store' : '🏪 Add New Store'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Store Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Regular Reward</label>
                  <input type="text" required value={rewardText} onChange={(e) => setRewardText(e.target.value)} placeholder="e.g. 2%" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2ECC71] mb-1">Bonus Reward (Promo)</label>
                  <input type="text" value={rewardBonus} onChange={(e) => setRewardBonus(e.target.value)} placeholder="e.g. 80%" className="w-full border border-[#2ECC71]/50 bg-green-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-600 mb-1">Gift Card Reward (Optional)</label>
                <input type="text" value={rewardGiftcard} onChange={(e) => setRewardGiftcard(e.target.value)} placeholder="e.g. 5% Off" className="w-full border border-purple-200 bg-purple-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Shopping Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71] bg-white">
                  <option value="Retail">Retail</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Health">Health</option>
                  <option value="Tech">Tech</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Logo URL</label>
                <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
              </div>

              {/* NEW FIELD: DESTINATION URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Destination URL (Where do they go?)</label>
                <input type="text" value={storeUrl} onChange={(e) => setStoreUrl(e.target.value)} placeholder="https://www.woolworths.com.au" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2">
                <label className="block text-xs font-extrabold text-[#1A2B48] uppercase tracking-wider mb-3">Dashboard Placements</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isTurbo} onChange={(e) => setIsTurbo(e.target.checked)} className="h-4 w-4 text-[#2ECC71] rounded focus:ring-[#2ECC71]" />
                    <span className="text-xs font-bold text-gray-700">Turbo Boost</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isTrending} onChange={(e) => setIsTrending(e.target.checked)} className="h-4 w-4 text-[#2ECC71] rounded focus:ring-[#2ECC71]" />
                    <span className="text-xs font-bold text-gray-700">Trending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isEveryday} onChange={(e) => setIsEveryday(e.target.checked)} className="h-4 w-4 text-[#2ECC71] rounded focus:ring-[#2ECC71]" />
                    <span className="text-xs font-bold text-gray-700">Everyday Favs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={hasGiftcard} onChange={(e) => setHasGiftcard(e.target.checked)} className="h-4 w-4 text-[#2ECC71] rounded focus:ring-[#2ECC71]" />
                    <span className="text-xs font-bold text-gray-700">Gift Cards</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#1A2B48] text-white font-bold py-2.5 rounded-lg hover:bg-gray-800 transition shadow-md disabled:bg-gray-400 text-sm">
                  {isSubmitting ? 'Saving...' : editingId ? 'Update Store' : 'Add Store'}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-300 transition shadow-sm text-sm">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT SIDE: LIVE STORE DIRECTORY */}
          <div className="lg:col-span-2">
            
            <div className="mb-4 relative">
              <input 
                type="text" 
                placeholder="🔍 Search your 30+ stores..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#1A2B48]">Active Database Directory</h2>
                <span className="bg-[#1A2B48] text-white text-xs font-bold px-3 py-1 rounded-full shadow-inner">{filteredStores.length} Stores</span>
              </div>
              
              <div className="p-0 overflow-x-auto max-h-[800px] overflow-y-auto">
                <table className="w-full text-left border-collapse relative">
                  <thead className="sticky top-0 bg-white shadow-sm z-10">
                    <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                      <th className="p-4 font-bold">Logo</th>
                      <th className="p-4 font-bold">Store Info</th>
                      <th className="p-4 font-bold">Rates</th>
                      <th className="p-4 font-bold">Placements</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStores.map((store) => (
                      <tr key={store.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="p-4">
                          {store.logo_url ? (
                            <div className="h-10 w-10 bg-white rounded-lg border border-gray-200 shadow-sm p-1 flex items-center justify-center">
                                <img src={store.logo_url} alt={store.name} className="h-full w-full object-contain" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-[8px] font-bold text-gray-400 border border-gray-200 shadow-inner">N/A</div>
                          )}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-[#1A2B48] text-sm">{store.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{store.category}</p>
                        </td>
                        <td className="p-4">
                           <div className="flex flex-col gap-1">
                             <span className="text-xs text-gray-600 font-bold">
                               Shop: <span className={store.reward_bonus ? "line-through text-gray-400 mr-1" : ""}>{store.reward_text}</span> 
                               {store.reward_bonus && <span className="text-[#2ECC71]">{store.reward_bonus}</span>}
                             </span>
                             {store.has_giftcard && (
                               <span className="text-[10px] text-purple-600 font-bold bg-purple-100 px-1.5 py-0.5 rounded w-max">GC: {store.reward_giftcard || store.reward_text}</span>
                             )}
                           </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1 max-w-[120px]">
                            {store.is_turbo && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded font-bold uppercase">Turbo</span>}
                            {store.is_trending && <span className="text-[9px] bg-red-100 text-red-700 px-1 py-0.5 rounded font-bold uppercase">Trend</span>}
                            {store.is_everyday && <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded font-bold uppercase">Daily</span>}
                            {store.has_giftcard && <span className="text-[9px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded font-bold uppercase">Card</span>}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleEditClick(store)} className="text-blue-500 hover:text-blue-700 font-bold text-xs mr-3 transition">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}