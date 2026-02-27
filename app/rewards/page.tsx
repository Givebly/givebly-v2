'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function DigitalVault() {
  const [availablePoints, setAvailablePoints] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVaultData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email || 'Unknown');
      const name = user.user_metadata?.full_name?.split(' ')[0] || 'User';
      setUserName(name);

      // --- CALCULATE POINTS MASTER FORMULA ---
      let earnedCoursePoints = 0;
      let earnedBonusPoints = 0;
      let spentPoints = 0;

      // 1. Course Points
      const { data: progressData } = await supabase.from('user_course_progress').select('course_id').eq('user_id', user.id);
      if (progressData && progressData.length > 0) {
        const completedCourseIds = progressData.map(p => p.course_id);
        const { data: courseData } = await supabase.from('courses').select('reward_points').in('id', completedCourseIds);
        if (courseData) earnedCoursePoints = courseData.reduce((sum, course) => sum + (course.reward_points || 0), 0);
      }

      // 2. Gamification Bonus Points (NEW!)
      const { data: transactionData } = await supabase.from('point_transactions').select('points_awarded').eq('user_id', user.id);
      if (transactionData) {
        earnedBonusPoints = transactionData.reduce((sum, tx) => sum + (tx.points_awarded || 0), 0);
      }

      // 3. Spent Points
      const { data: redemptionData } = await supabase.from('redemptions').select('points_cost').eq('user_id', user.id);
      if (redemptionData) spentPoints = redemptionData.reduce((sum, item) => sum + (item.points_cost || 0), 0);

      // 4. The Final Calculation
      setAvailablePoints((earnedCoursePoints + earnedBonusPoints) - spentPoints);

      // --- FETCH INVENTORY ---
      const { data: inventoryData } = await supabase
        .from('rewards_inventory')
        .select('*')
        .eq('is_active', true)
        .order('points_cost', { ascending: true });
        
      if (inventoryData) setInventory(inventoryData);
      
      setIsLoading(false);
    }

    fetchVaultData();
  }, []);

  const handleRedeem = async (item: any) => {
    if (!userId) return alert("You must be logged in to redeem rewards.");
    
    if (availablePoints < item.points_cost) {
      alert(`You need ${item.points_cost - availablePoints} more points. Keep learning & earning!`);
      return;
    }

    if (!window.confirm(`Spend ${item.points_cost} points to claim: ${item.title}?`)) return;

    setIsRedeeming(item.id);

    const { error } = await supabase.from('redemptions').insert([{
      user_id: userId,
      user_email: userEmail,
      reward_id: item.id,
      reward_title: item.title,
      points_cost: item.points_cost,
      status: 'pending'
    }]);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      setAvailablePoints(prev => prev - item.points_cost);
      alert(`Success! "${item.title}" has been claimed. Check your email shortly.`);
    }
    
    setIsRedeeming(null);
  };

  // --- DYNAMIC TIER GROUPING LOGIC ---
  const tier1 = inventory.filter(item => item.points_cost < 1000); // Starter
  const tier2 = inventory.filter(item => item.points_cost >= 1000 && item.points_cost < 2000); // Premium
  const tier3 = inventory.filter(item => item.points_cost >= 2000); // Elite

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-bold text-[#1A2B48]">Loading the Vault...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <nav className="bg-[#1A2B48] text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold">&larr;</Link>
            <h1 className="text-xl font-bold tracking-tight">Givebly Rewards</h1>
          </div>
          <div className="bg-white text-[#1A2B48] text-sm font-black px-4 py-1.5 rounded-full shadow-inner flex items-center gap-2">
            <span className="text-yellow-500 text-lg leading-none">⚡</span>
            {availablePoints}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl shadow-xl p-8 mb-10 text-white relative border border-purple-800">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full mb-4 w-max uppercase tracking-widest shadow-sm inline-block">Daily Streak: 🔥 3 Days</span>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Unlock your impact.</h2>
              <p className="text-purple-200 font-medium text-sm">Earn points by learning, shopping, and sharing Givebly.</p>
            </div>
            <div className="bg-black/30 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center min-w-[200px]">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Available Balance</span>
              <span className="text-5xl font-black text-yellow-400 drop-shadow-md">{availablePoints}</span>
            </div>
          </div>
        </div>

        {tier1.length > 0 && (
          <div className="mb-12 relative">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2">🌱 Starter Tier</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Up to 999 Points</p>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
              {tier1.map(item => <RewardCard key={item.id} item={item} availablePoints={availablePoints} handleRedeem={handleRedeem} isRedeeming={isRedeeming} />)}
            </div>
          </div>
        )}

        {tier2.length > 0 && (
          <div className="mb-12 relative">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2">⭐ Premium Tier</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">1,000 - 1,999 Points</p>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
              {tier2.map(item => <RewardCard key={item.id} item={item} availablePoints={availablePoints} handleRedeem={handleRedeem} isRedeeming={isRedeeming} />)}
            </div>
          </div>
        )}

        {tier3.length > 0 && (
          <div className="mb-12 relative">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2">💎 Elite Tier</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">2,000+ Points</p>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
              {tier3.map(item => <RewardCard key={item.id} item={item} availablePoints={availablePoints} handleRedeem={handleRedeem} isRedeeming={isRedeeming} />)}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

function RewardCard({ item, availablePoints, handleRedeem, isRedeeming }: any) {
  const isLocked = availablePoints < item.points_cost;
  
  return (
    <div className={`min-w-[280px] max-w-[280px] rounded-2xl shadow-md border ${isLocked ? 'border-gray-200 bg-white' : 'border-gray-200 bg-white hover:-translate-y-1 hover:shadow-xl'} p-5 flex flex-col transition-all snap-start shrink-0 relative overflow-hidden group`}>
      
      {isLocked && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
          <div className="h-full bg-yellow-400" style={{ width: `${Math.min((availablePoints / item.points_cost) * 100, 100)}%` }}></div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4 mt-2">
        <span className={`text-4xl drop-shadow-sm ${isLocked ? 'grayscale opacity-50' : 'group-hover:scale-110 transition-transform'}`}>{item.icon}</span>
        <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${isLocked ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
          {item.points_cost} PTS
        </span>
      </div>
      
      <h4 className={`text-lg font-black mb-1 leading-tight ${isLocked ? 'text-gray-500' : 'text-[#1A2B48]'}`}>{item.title}</h4>
      <p className="text-xs font-medium text-gray-400 mb-6 flex-1 line-clamp-2">{item.description}</p>
      
      <button 
        onClick={() => handleRedeem(item)}
        disabled={isLocked || isRedeeming !== null}
        className={`w-full font-bold py-2.5 rounded-xl text-sm transition shadow-sm ${isLocked ? 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100' : 'bg-[#1A2B48] text-white hover:bg-gray-800'}`}
      >
        {isRedeeming === item.id ? 'Processing...' : isLocked ? `${item.points_cost - availablePoints} pts away` : 'Claim Reward'}
      </button>
    </div>
  );
}