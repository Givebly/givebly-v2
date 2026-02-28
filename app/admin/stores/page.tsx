'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase'; 

// Mock state for categories
const initialCategories = [
  { id: 'c1', name: 'Retail', active: true },
  { id: 'c2', name: 'Groceries', active: true },
  { id: 'c3', name: 'Fashion', active: true },
  { id: 'c4', name: 'Health', active: true },
  { id: 'c5', name: 'Tech', active: true },
  { id: 'c6', name: 'Travel', active: true },
  { id: 'c7', name: 'Mother\'s Day Promo', active: false },
];

export default function StoreCatalogHQ() {
  // DB States
  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isStoreDrawerOpen, setIsStoreDrawerOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Drag and Drop State
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  // Form States (Store)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [rewardText, setRewardText] = useState('');
  const [rewardBonus, setRewardBonus] = useState(''); 
  const [rewardGiftcard, setRewardGiftcard] = useState(''); 
  const [category, setCategory] = useState('Retail');
  const [logoUrl, setLogoUrl] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [isTurbo, setIsTurbo] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isEveryday, setIsEveryday] = useState(false);
  const [hasGiftcard, setHasGiftcard] = useState(false);

  // Form States (Category)
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('stores').select('*').order('created_at', { ascending: false });
    if (data) setStores(data);
    setIsLoading(false);
  };

  // --- STORE HANDLERS ---
  const handleOpenNewStore = () => {
    setEditingId(null);
    setName(''); setRewardText(''); setRewardBonus(''); setRewardGiftcard('');
    setCategory(categories.find(c => c.active)?.name || 'Retail'); setLogoUrl(''); setStoreUrl('');
    setIsTurbo(false); setIsTrending(false); setIsEveryday(false); setHasGiftcard(false);
    setStatusMsg({ type: '', text: '' });
    setIsStoreDrawerOpen(true);
  };

  const handleOpenEditStore = (store: any) => {
    setEditingId(store.id);
    setName(store.name); setRewardText(store.reward_text || ''); setRewardBonus(store.reward_bonus || '');
    setRewardGiftcard(store.reward_giftcard || ''); setCategory(store.category || 'Retail');
    setLogoUrl(store.logo_url || ''); setStoreUrl(store.store_url || '');
    setIsTurbo(store.is_turbo || false); setIsTrending(store.is_trending || false);
    setIsEveryday(store.is_everyday || false); setHasGiftcard(store.has_giftcard || false);
    setStatusMsg({ type: '', text: '' });
    setIsStoreDrawerOpen(true);
  };

  const handleStoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg({ type: '', text: '' });

    const storeData = { 
      name, reward_text: rewardText, reward_bonus: rewardBonus, reward_giftcard: rewardGiftcard,
      category, logo_url: logoUrl, store_url: storeUrl,
      is_turbo: isTurbo, is_trending: isTrending, is_everyday: isEveryday, has_giftcard: hasGiftcard
    };

    if (editingId) {
      const { error } = await supabase.from('stores').update(storeData).eq('id', editingId);
      if (error) setStatusMsg({ type: 'error', text: error.message });
      else { await fetchStores(); setIsStoreDrawerOpen(false); }
    } else {
      const { error } = await supabase.from('stores').insert([storeData]);
      if (error) setStatusMsg({ type: 'error', text: error.message });
      else { await fetchStores(); setIsStoreDrawerOpen(false); }
    }
    setIsSubmitting(false);
  };

  const handleStoreDelete = async () => {
    if (!editingId) return;
    if (window.confirm(`WARNING: Are you sure you want to permanently delete ${name}?`)) {
      const { error } = await supabase.from('stores').delete().eq('id', editingId);
      if (!error) { await fetchStores(); setIsStoreDrawerOpen(false); } 
      else { setStatusMsg({ type: 'error', text: error.message }); }
    }
  };

  // --- CATEGORY HANDLERS ---
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCat = { id: `c_${Date.now()}`, name: newCategoryName.trim(), active: true };
    setCategories([...categories, newCat]);
    setNewCategoryName('');
  };

  const toggleCategoryVisibility = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteCategory = (id: string) => {
    if (window.confirm('Remove this category from the list?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  // --- DRAG AND DROP HANDLERS ---
  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const onDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;

    const newCategories = [...categories];
    const draggedItem = newCategories[draggedIdx];
    
    // Remove the item from its original position
    newCategories.splice(draggedIdx, 1);
    // Insert it into the new position
    newCategories.splice(index, 0, draggedItem);
    
    setCategories(newCategories);
    setDraggedIdx(null);
  };

  // Filtering Logic
  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || store.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeCategories = categories.filter(c => c.active);

  return (
    <div className="animate-fadeIn pb-10 flex relative h-full overflow-hidden">
      
      {/* --- MAIN TABLE AREA --- */}
      <div className={`flex-1 transition-all duration-300 ${(isStoreDrawerOpen || isCategoryDrawerOpen) ? 'pr-[450px]' : ''}`}>
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-1 text-gray-900">Store Catalog</h1>
            <p className="text-[11px] text-gray-500">Manage merchant links, categories, and directory placements.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { setIsStoreDrawerOpen(false); setIsCategoryDrawerOpen(true); }}
              className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-white border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              Manage Categories
            </button>
            <button 
              onClick={() => { setIsCategoryDrawerOpen(false); handleOpenNewStore(); }} 
              className="text-[11px] font-medium px-3 py-1.5 rounded-md border transition bg-gray-900 border-gray-900 text-white hover:bg-gray-800 flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Merchant
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white border border-gray-200 rounded-t-lg shadow-sm p-3 flex flex-col sm:flex-row gap-4 justify-between items-center border-b-0">
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search merchant name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[11px] font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
          
          <div className="flex bg-gray-100 p-0.5 rounded-md w-full sm:w-auto border border-gray-200 overflow-x-auto no-scrollbar">
            {['All', ...activeCategories.map(c => c.name)].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoryFilter(cat)} 
                className={`px-3 py-1 text-[10px] font-semibold rounded-sm transition whitespace-nowrap ${categoryFilter === cat ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Master Table */}
        <div className="bg-white rounded-b-lg border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] text-[11px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-[9px] text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold w-12">Logo</th>
                <th className="px-4 py-3 font-semibold">Merchant Details</th>
                <th className="px-4 py-3 font-semibold">Cashback Rates</th>
                <th className="px-4 py-3 font-semibold">Active Placements</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading catalog...</td></tr>
              ) : filteredStores.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No merchants found.</td></tr>
              ) : (
                filteredStores.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="h-8 w-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1 shadow-sm overflow-hidden">
                        {store.logo_url ? <img src={store.logo_url} alt={store.name} className="h-full w-full object-contain" /> : <span className="text-[8px] text-gray-400 font-bold">N/A</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{store.name}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">{store.category}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-medium text-gray-700">
                          Base: <span className={store.reward_bonus ? "line-through text-gray-400 mr-1" : "font-semibold"}>{store.reward_text}</span> 
                          {store.reward_bonus && <span className="text-emerald-600 font-bold">{store.reward_bonus}</span>}
                        </span>
                        {store.has_giftcard && (
                          <span className="text-[9px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded w-max font-semibold">GC: {store.reward_giftcard || store.reward_text}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {store.is_turbo && <span className="text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Turbo</span>}
                        {store.is_trending && <span className="text-[8px] bg-orange-50 text-orange-700 border border-orange-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Trend</span>}
                        {store.is_everyday && <span className="text-[8px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Daily</span>}
                        {!store.is_turbo && !store.is_trending && !store.is_everyday && <span className="text-[8px] text-gray-400 font-medium">Standard Listing</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setIsCategoryDrawerOpen(false); handleOpenEditStore(store); }} className="bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold px-2.5 py-1.5 rounded-md shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition">
                        Edit Store
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SLIDE-OUT DRAWER: CATEGORY MANAGER (WITH DRAG & DROP) --- */}
      {isCategoryDrawerOpen && (
        <div className="fixed top-0 right-0 w-[450px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Category Manager</h2>
              <p className="text-[10px] text-gray-500 mt-0.5">Drag to reorder. Toggle to hide globally.</p>
            </div>
            <button onClick={() => setIsCategoryDrawerOpen(false)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 bg-white no-scrollbar">
            <form onSubmit={handleAddCategory} className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-2">Create New Category</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)} 
                  placeholder="e.g. Valentine's Day Promos" 
                  className="flex-1 text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-medium text-gray-900" 
                />
                <button type="submit" disabled={!newCategoryName.trim()} className="bg-gray-900 text-white text-[11px] font-bold px-4 rounded shadow-sm hover:bg-gray-800 transition disabled:bg-gray-300">Add</button>
              </div>
            </form>

            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-3">Directory Architecture</h3>
            <div className="space-y-2">
              {categories.map((cat, index) => (
                <div 
                  key={cat.id} 
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={(e) => onDragOver(e, index)}
                  onDrop={(e) => onDrop(e, index)}
                  className={`border rounded-lg p-3 flex justify-between items-center transition-all cursor-move ${draggedIdx === index ? 'opacity-40 border-dashed border-gray-400' : ''} ${cat.active ? 'bg-white border-gray-200 shadow-sm hover:border-emerald-500' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    {/* The Drag Grip Icon */}
                    <svg className="w-4 h-4 text-gray-400 hover:text-gray-600 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM20 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM20 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
                    
                    <div>
                      <span className={`text-[11px] font-semibold block ${cat.active ? 'text-gray-900' : 'text-gray-500'}`}>{cat.name}</span>
                      <span className="text-[9px] font-mono text-gray-400 mt-0.5">{cat.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Active/Hidden Toggle */}
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold uppercase ${cat.active ? 'text-emerald-600' : 'text-gray-400'}`}>{cat.active ? 'Live' : 'Hidden'}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={cat.active} onChange={() => toggleCategoryVisibility(cat.id)} />
                        <div className="w-7 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    {/* Delete Button */}
                    <button onClick={() => deleteCategory(cat.id)} className="text-gray-300 hover:text-red-500 transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-400 mt-4 text-center italic">Tip: Click and drag the grip icon (⋮⋮) to reorder.</p>
          </div>
        </div>
      )}

      {/* --- SLIDE-OUT DRAWER: STORE EDITOR --- */}
      {isStoreDrawerOpen && (
        <div className="fixed top-0 right-0 w-[450px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-200 z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight overflow-hidden">
          
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shrink-0 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 tracking-tight">{editingId ? 'Edit Merchant Profile' : 'Add New Merchant'}</h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{editingId ? editingId : 'New Database Entry'}</p>
            </div>
            <button onClick={() => setIsStoreDrawerOpen(false)} className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm transition">✕</button>
          </div>

          <form onSubmit={handleStoreSubmit} className="p-6 overflow-y-auto flex-1 space-y-6 bg-white no-scrollbar">
            
            {statusMsg.text && (
              <div className={`p-3 rounded-lg text-[10px] font-semibold border ${statusMsg.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                {statusMsg.text}
              </div>
            )}

            {/* Core Info */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Core Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Store Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-medium text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full text-[11px] px-2 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 text-gray-700 bg-white">
                      {/* Dynamically loads active categories in their specific dragged order */}
                      {activeCategories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Affiliate Destination URL</label>
                  <input type="text" value={storeUrl} onChange={(e) => setStoreUrl(e.target.value)} placeholder="https://..." className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-mono text-gray-600" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Logo Asset URL</label>
                  <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-mono text-gray-600" />
                </div>
              </div>
            </div>

            {/* Financials / Rates */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Reward Rates</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Base Rate</label>
                    <input type="text" required value={rewardText} onChange={(e) => setRewardText(e.target.value)} placeholder="e.g. 2%" className="w-full text-[11px] px-3 py-2 rounded border border-gray-200 outline-none focus:border-emerald-500 font-medium text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-emerald-600 uppercase mb-1">Promo Boost</label>
                    <input type="text" value={rewardBonus} onChange={(e) => setRewardBonus(e.target.value)} placeholder="e.g. 8%" className="w-full text-[11px] px-3 py-2 rounded border border-emerald-200 bg-emerald-50 outline-none focus:border-emerald-500 font-medium text-emerald-800" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-purple-600 uppercase mb-1">Gift Card Rate</label>
                  <input type="text" value={rewardGiftcard} onChange={(e) => setRewardGiftcard(e.target.value)} placeholder="e.g. 5% Off" className="w-full text-[11px] px-3 py-2 rounded border border-purple-200 bg-purple-50 outline-none focus:border-purple-400 font-medium text-purple-800" />
                </div>
              </div>
            </div>

            {/* Placements */}
            <div>
              <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">Directory Placements</h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-semibold text-gray-700">Turbo Boost</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isTurbo} onChange={(e) => setIsTurbo(e.target.checked)} />
                    <div className="w-7 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-semibold text-gray-700">Trending</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isTrending} onChange={(e) => setIsTrending(e.target.checked)} />
                    <div className="w-7 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-semibold text-gray-700">Everyday Favs</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isEveryday} onChange={(e) => setIsEveryday(e.target.checked)} />
                    <div className="w-7 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-semibold text-purple-700">Gift Card Sec</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={hasGiftcard} onChange={(e) => setHasGiftcard(e.target.checked)} />
                    <div className="w-7 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button disabled={isSubmitting} type="submit" className="w-full bg-gray-900 text-white text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-gray-800 transition disabled:bg-gray-400">
                {isSubmitting ? 'Saving to Database...' : editingId ? 'Update Merchant Profile' : 'Publish New Merchant'}
              </button>
              
              {editingId && (
                <button type="button" onClick={handleStoreDelete} className="w-full bg-white border border-red-200 text-red-600 text-[11px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-red-50 transition">
                  Permanently Delete Store
                </button>
              )}
            </div>

          </form>
        </div>
      )}

    </div>
  );
}