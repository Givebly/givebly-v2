'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

// --- MOCK DATA FOR THE UI ---
const weeklyLeaderboard = [
  { rank: 1, name: 'Sarah J.', points: 2450, badge: '🔥', avatar: 'S' },
  { rank: 2, name: 'Michael C.', points: 2100, badge: '⚡', avatar: 'M' },
  { rank: 3, name: 'Emma W.', points: 1800, badge: '⭐', avatar: 'E' },
  { rank: 4, name: 'David L.', points: 1450, badge: '', avatar: 'D' },
  { rank: 5, name: 'Chloe T.', points: 1200, badge: '', avatar: 'C' },
];

const monthlyLeaderboard = [
  { rank: 1, name: 'Tom H.', points: 12450, badge: '👑', avatar: 'T' },
  { rank: 2, name: 'Sarah J.', points: 11200, badge: '💎', avatar: 'S' },
  { rank: 3, name: 'Jess K.', points: 9800, badge: '🥇', avatar: 'J' },
  { rank: 4, name: 'Michael C.', points: 8450, badge: '🥈', avatar: 'M' },
  { rank: 5, name: 'Liam P.', points: 7900, badge: '🥉', avatar: 'L' },
];

const hallOfFame = {
  top3: [
    { rank: 2, name: 'Mia R.', points: '89k', avatar: 'M', color: 'bg-gray-300', height: 'h-24' },
    { rank: 1, name: 'James D.', points: '142k', avatar: 'J', color: 'bg-yellow-400', height: 'h-32' },
    { rank: 3, name: 'Noah B.', points: '76k', avatar: 'N', color: 'bg-orange-300', height: 'h-20' },
  ],
  monthlyChamps: [
    { month: 'August', name: 'Sophia L.', sponsor: 'Woolworths' },
    { month: 'July', name: 'Oliver T.', sponsor: 'The Iconic' },
  ]
};

// PRE-MADE AVATAR ROSTER
const avatarOptions = [
  { id: 'av1', icon: '🦊', bg: 'bg-orange-100' },
  { id: 'av2', icon: '🐨', bg: 'bg-gray-200' },
  { id: 'av3', icon: '🐼', bg: 'bg-gray-100' },
  { id: 'av4', icon: '🦘', bg: 'bg-amber-100' },
  { id: 'av5', icon: '🦁', bg: 'bg-yellow-100' },
  { id: 'av6', icon: '🐯', bg: 'bg-orange-200' },
  { id: 'av7', icon: '🦄', bg: 'bg-pink-100' },
  { id: 'av8', icon: '🦉', bg: 'bg-blue-100' },
  { id: 'av9', icon: '🐙', bg: 'bg-purple-100' },
  { id: 'av10', icon: '🐢', bg: 'bg-green-100' },
  { id: 'av11', icon: '🐧', bg: 'bg-blue-200' },
  { id: 'av12', icon: '🦖', bg: 'bg-green-200' },
];

export default function EarnHub() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [availablePoints, setAvailablePoints] = useState(0);
  const [lifetimePoints, setLifetimePoints] = useState(0);
  const [pendingPoints, setPendingPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI States
  const [claimedDaily, setClaimedDaily] = useState(false);
  const [pollVoted, setPollVoted] = useState(false);
  const [leaderboardTab, setLeaderboardTab] = useState<'week' | 'month' | 'hall'>('week');
  const [socialsConnected, setSocialsConnected] = useState(1);
  
  // MODAL & AVATAR STATES
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [currentAvatarName, setCurrentAvatarName] = useState<string>('My Avatar');
  
  // Temp states for the modal
  const [tempSelectedAvatar, setTempSelectedAvatar] = useState<string | null>(null);
  const [tempAvatarName, setTempAvatarName] = useState<string>('');
  const [avatarClaimed, setAvatarClaimed] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);
    const name = user.user_metadata?.full_name?.split(' ')[0] || 'User';
    setUserName(name);
    
    if (user.user_metadata?.avatar_id) {
      setCurrentAvatar(user.user_metadata.avatar_id);
      setCurrentAvatarName(user.user_metadata.avatar_name || 'My Avatar');
      setAvatarClaimed(true);
    }

    let earnedPoints = 0;
    let spentPoints = 0;

    const { data: txData } = await supabase.from('point_transactions').select('action_type, points_awarded').eq('user_id', user.id);
    if (txData) {
      earnedPoints += txData.reduce((sum, tx) => sum + (tx.points_awarded || 0), 0);
      if (txData.some(tx => tx.action_type === 'set_avatar')) {
        setAvatarClaimed(true);
      }
    }
    
    const { data: redemptions } = await supabase.from('redemptions').select('points_cost').eq('user_id', user.id);
    if (redemptions) spentPoints += redemptions.reduce((sum, r) => sum + (r.points_cost || 0), 0);

    setLifetimePoints(earnedPoints);
    setAvailablePoints(earnedPoints - spentPoints);

    const { data: pendingRefs } = await supabase.from('referrals').select('*').eq('referrer_username', name.toLowerCase()).eq('status', 'pending');
    if (pendingRefs) setPendingPoints(pendingRefs.length * 1000);

    setIsLoading(false);
  }

  const handleDailyCheckIn = async () => { setClaimedDaily(true); };
  const handlePollVote = async () => { setPollVoted(true); };

  // --- AVATAR SELECTION LOGIC ---
  const saveAvatar = async () => {
    if (!tempSelectedAvatar || !userId) return;
    
    await supabase.auth.updateUser({
      data: { avatar_id: tempSelectedAvatar, avatar_name: tempAvatarName || 'My Avatar' }
    });

    setCurrentAvatar(tempSelectedAvatar);
    setCurrentAvatarName(tempAvatarName || 'My Avatar');
    setIsAvatarModalOpen(false);

    if (!avatarClaimed) {
      const { error } = await supabase.from('point_transactions').insert([
        { user_id: userId, action_type: 'set_avatar', points_awarded: 100, description: 'Profile Completion: Avatar Set' }
      ]);
      
      if (!error) {
        setAvailablePoints(prev => prev + 100);
        setLifetimePoints(prev => prev + 100);
        setAvatarClaimed(true);
        alert("✨ 100 Points unlocked for setting your Avatar!");
      }
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-bold text-[#1A2B48]">Loading Quests...</div>;

  const currentLeaderboard = leaderboardTab === 'week' ? weeklyLeaderboard : monthlyLeaderboard;
  
  const renderHeaderAvatar = () => {
    if (currentAvatar) {
      const found = avatarOptions.find(a => a.id === currentAvatar);
      if (found) return <span className="text-xl">{found.icon}</span>;
    }
    return userName ? userName.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 overflow-x-hidden font-sans">
      <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />

      {/* HEADER */}
      <nav className="bg-[#1A2B48] text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-1/3">
            <Link href="/dashboard" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold text-lg">&larr;</Link>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">Givebly</h1>
          </div>
          
          <div className="flex items-center gap-4 w-auto md:w-1/3 justify-end">
            <div className="hidden md:flex flex-col items-end justify-center">
              <Link href="/rewards" className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 px-3 py-1.5 rounded-full transition font-black text-sm border border-yellow-400/30 shadow-sm whitespace-nowrap">
                <span className="text-lg leading-none drop-shadow-md">🪙</span> {availablePoints} PTS
              </Link>
              {pendingPoints > 0 && (
                <div className="flex items-center gap-1 text-gray-400 mt-1 px-2 font-bold text-xs cursor-help whitespace-nowrap">⏳ {pendingPoints} Pending</div>
              )}
            </div>
            <span className="text-white/20 hidden md:block">|</span>
            <div 
              onClick={() => {
                setTempSelectedAvatar(currentAvatar);
                setTempAvatarName(currentAvatarName);
                setIsAvatarModalOpen(true);
              }}
              className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-extrabold shadow-md border-2 border-white/20 cursor-pointer hover:scale-105 transition-transform ${currentAvatar ? avatarOptions.find(a => a.id === currentAvatar)?.bg + ' text-[#1A2B48]' : 'bg-[#2ECC71] text-[#1A2B48]'}`}
            >
               {renderHeaderAvatar()}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* STATS HERO BANNER WITH AVATAR DISPLAY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2 bg-gradient-to-br from-[#1A2B48] to-indigo-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden border border-indigo-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex-1">
                <span className="bg-yellow-500 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full mb-4 w-max uppercase tracking-widest shadow-sm inline-block">Impact Playground</span>
                <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Farm Impact Points.</h2>
                <p className="text-indigo-200 font-medium text-sm max-w-sm">Complete micro-actions, connect your world, and level up your mastery to unlock the Digital Vault.</p>
              </div>
              
              {/* COMPANION AVATAR IN HERO */}
              <div 
                onClick={() => {
                  setTempSelectedAvatar(currentAvatar);
                  setTempAvatarName(currentAvatarName);
                  setIsAvatarModalOpen(true);
                }}
                className="hidden sm:flex flex-col items-center justify-center bg-white/10 rounded-2xl p-4 border border-white/20 shadow-inner cursor-pointer hover:bg-white/20 transition group min-w-[140px]"
              >
                 <div className={`h-20 w-20 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white/10 group-hover:scale-105 transition ${currentAvatar ? avatarOptions.find(a => a.id === currentAvatar)?.bg : 'bg-gray-500'}`}>
                   {currentAvatar ? avatarOptions.find(a => a.id === currentAvatar)?.icon : '👤'}
                 </div>
                 <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-yellow-400">{currentAvatarName}</span>
              </div>
            </div>
          </div>
          
          {/* LIFETIME STATS & VAULT HISTORY */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 flex flex-col justify-center">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Your Givebly Journey</h3>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-[#1A2B48]">Lifetime Earned</span>
              <span className="font-black text-[#2ECC71]">{lifetimePoints.toLocaleString()} 🪙</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <span className="text-sm font-bold text-[#1A2B48]">Current Balance</span>
              <span className="font-black text-yellow-500">{availablePoints.toLocaleString()} 🪙</span>
            </div>
            <button className="text-xs font-bold text-blue-600 bg-blue-50 py-2 rounded-lg hover:bg-blue-100 transition">View Vault Redemption History &rarr;</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* COLUMN 1 & 2: QUESTS & MASTERY */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* --- DAILY & VAULT DROP --- */}
            <div>
              <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2 mb-4"><span className="text-2xl">⚡</span> Quick Quests</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl shadow border border-[#2ECC71] bg-white p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl">🔥</span>
                    <span className="bg-green-100 text-green-800 text-[10px] font-black px-2 py-1 rounded">+ 20 🪙</span>
                  </div>
                  <h4 className="font-black text-[#1A2B48]">Daily Check-In</h4>
                  <button onClick={handleDailyCheckIn} disabled={claimedDaily} className={`mt-auto w-full py-2 rounded-lg text-sm font-black transition ${claimedDaily ? 'bg-gray-100 text-gray-400' : 'bg-[#1A2B48] text-white hover:bg-gray-800'}`}>{claimedDaily ? 'Claimed' : 'Claim Now'}</button>
                </div>

                <div className="rounded-xl shadow border-2 border-dashed border-purple-400 bg-purple-50 p-4 flex flex-col group cursor-pointer hover:bg-purple-100 transition">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl group-hover:scale-110 transition animate-pulse">🎁</span>
                    <span className="bg-purple-200 text-purple-900 text-[10px] font-black px-2 py-1 rounded">+ 200 🪙</span>
                  </div>
                  <h4 className="font-black text-purple-900">The Vault Drop</h4>
                  <p className="text-[10px] font-bold text-purple-700 mt-1 leading-tight">A Golden Token is hidden on a random store page right now. Find it!</p>
                </div>
              </div>
            </div>

            {/* --- TRIPLE POLLS --- */}
            <div>
              <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2 mb-4"><span className="text-2xl">🗳️</span> Have Your Say (+50 PTS)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col text-center hover:border-blue-400 transition cursor-pointer">
                  <span className="text-2xl mb-2">🌊</span>
                  <h4 className="text-xs font-black text-[#1A2B48] mb-1">Charity Allocation</h4>
                  <p className="text-[9px] text-gray-500 font-bold mb-3">Where should the $500 pool go?</p>
                  <button className="mt-auto bg-gray-100 text-[#1A2B48] text-[10px] font-black py-1.5 rounded w-full hover:bg-blue-100">Vote Now</button>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col text-center hover:border-orange-400 transition cursor-pointer">
                  <span className="text-2xl mb-2">🛒</span>
                  <h4 className="text-xs font-black text-[#1A2B48] mb-1">Favorite Grocer</h4>
                  <p className="text-[9px] text-gray-500 font-bold mb-3">Coles, Woolies, or Aldi?</p>
                  <button className="mt-auto bg-gray-100 text-[#1A2B48] text-[10px] font-black py-1.5 rounded w-full hover:bg-orange-100">Vote Now</button>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col text-center hover:border-pink-400 transition cursor-pointer">
                  <span className="text-2xl mb-2">✨</span>
                  <h4 className="text-xs font-black text-[#1A2B48] mb-1">Next Feature</h4>
                  <p className="text-[9px] text-gray-500 font-bold mb-3">What should we build next?</p>
                  <button className="mt-auto bg-gray-100 text-[#1A2B48] text-[10px] font-black py-1.5 rounded w-full hover:bg-pink-100">Vote Now</button>
                </div>
              </div>
            </div>

            {/* --- PROFILE & DATA --- */}
            <div>
              <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2 mb-4"><span className="text-2xl">👤</span> Profile Bounties</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div 
                  onClick={() => {
                    setTempSelectedAvatar(currentAvatar);
                    setTempAvatarName(currentAvatarName);
                    setIsAvatarModalOpen(true);
                  }} 
                  className={`bg-white rounded-xl shadow-md border ${avatarClaimed ? 'border-gray-100' : 'border-gray-200 hover:border-[#2ECC71] cursor-pointer'} p-4 flex flex-col group transition`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl">📸</span>
                    {avatarClaimed ? (
                      <span className="text-[9px] font-black bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">Claimed</span>
                    ) : (
                      <span className="text-[9px] font-black bg-green-100 text-green-800 px-1.5 py-0.5 rounded">+ 100 🪙</span>
                    )}
                  </div>
                  <h4 className={`font-black text-[#1A2B48] text-xs ${avatarClaimed ? 'text-gray-400 line-through' : ''}`}>Set Your Avatar</h4>
                  <p className="text-[9px] text-gray-500 font-bold mt-1">Pick and name your companion.</p>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col group cursor-pointer hover:border-blue-400 transition">
                  <div className="flex justify-between items-start mb-2"><span className="text-2xl">📋</span><span className="text-[9px] font-black bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">+ 100 🪙</span></div>
                  <h4 className="font-black text-[#1A2B48] text-xs">1-Min Market Survey</h4>
                  <p className="text-[9px] text-gray-500 font-bold mt-1">Answer 3 questions about shopping habits.</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col group cursor-pointer hover:border-pink-400 transition">
                  <div className="flex justify-between items-start mb-2"><span className="text-2xl">🎂</span><span className="text-[9px] font-black bg-pink-100 text-pink-800 px-1.5 py-0.5 rounded">+ 50 🪙</span></div>
                  <h4 className="font-black text-[#1A2B48] text-xs">Add Your Birthday</h4>
                  <p className="text-[9px] text-gray-500 font-bold mt-1">Earn 50 now, get a massive gift on your day!</p>
                </div>
              </div>
            </div>

            {/* --- SOCIAL MASTER CHALLENGE --- */}
            <div className="bg-[#1A2B48] rounded-2xl shadow-xl p-6 relative overflow-hidden text-white">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
               <div className="flex justify-between items-center mb-4 relative z-10">
                 <div>
                   <h3 className="text-lg font-black flex items-center gap-2">📱 The Social Master Challenge</h3>
                   <p className="text-xs text-gray-300 font-medium">+100 PTS per channel. Connect all 5 for a <span className="text-yellow-400 font-bold">300 PTS Bonus!</span></p>
                 </div>
                 <div className="text-right">
                   <span className="text-2xl font-black text-yellow-400">{socialsConnected}/5</span>
                 </div>
               </div>
               
               <div className="w-full bg-white/10 h-2 rounded-full mb-6 overflow-hidden relative z-10">
                 <div className="bg-yellow-400 h-full transition-all duration-500" style={{ width: `${(socialsConnected/5)*100}%` }}></div>
               </div>

               <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar relative z-10">
                 {[
                   { name: 'Instagram', icon: '📸', connected: true },
                   { name: 'Facebook', icon: 'f', connected: false },
                   { name: 'YouTube', icon: '▶️', connected: false },
                   { name: 'TikTok', icon: '🎵', connected: false },
                   { name: 'X / Twitter', icon: '𝕏', connected: false }
                 ].map(social => (
                   <button key={social.name} className={`min-w-[110px] rounded-xl p-3 flex flex-col items-center gap-2 transition ${social.connected ? 'bg-[#2ECC71]/20 border border-[#2ECC71]/50 text-[#2ECC71]' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'}`}>
                     <span className="text-2xl">{social.icon}</span>
                     <span className="text-[10px] font-bold">{social.name}</span>
                     {social.connected ? <span className="text-[8px] uppercase tracking-widest font-black">Linked</span> : <span className="text-[8px] bg-yellow-500 text-black px-1.5 py-0.5 rounded font-black">+ 100</span>}
                   </button>
                 ))}
               </div>
            </div>

          </div>

          {/* COLUMN 3: THE NATIONAL LEADERBOARD & HALL OF FAME */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col relative overflow-hidden h-max">
            <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2 mb-4">🏆 National Ranking</h3>

            {/* THE TABS */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button onClick={() => setLeaderboardTab('week')} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition ${leaderboardTab === 'week' ? 'bg-white shadow-sm text-[#1A2B48]' : 'text-gray-500 hover:text-gray-700'}`}>This Week</button>
              <button onClick={() => setLeaderboardTab('month')} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition ${leaderboardTab === 'month' ? 'bg-white shadow-sm text-[#1A2B48]' : 'text-gray-500 hover:text-gray-700'}`}>This Month</button>
              <button onClick={() => setLeaderboardTab('hall')} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition ${leaderboardTab === 'hall' ? 'bg-[#1A2B48] shadow-sm text-yellow-400' : 'text-gray-500 hover:text-gray-700'}`}>Hall of Fame</button>
            </div>

            {leaderboardTab === 'hall' ? (
              <div className="flex-1 flex flex-col animate-fadeIn">
                <h4 className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-6">All-Time Top Earners</h4>
                
                {/* 3D PODIUM */}
                <div className="flex items-end justify-center gap-2 mb-8 h-40">
                  {hallOfFame.top3.map((podium) => (
                    <div key={podium.rank} className="flex flex-col items-center w-1/3">
                      <div className={`h-10 w-10 ${podium.color} rounded-full text-white flex items-center justify-center font-black mb-2 shadow-lg border-2 border-white relative`}>
                        {podium.avatar}
                        {podium.rank === 1 && <span className="absolute -top-3 text-xl">👑</span>}
                      </div>
                      <span className="text-[10px] font-bold text-[#1A2B48] truncate w-full text-center">{podium.name}</span>
                      <span className="text-[9px] font-black text-gray-500 mb-1">{podium.points}</span>
                      <div className={`w-full ${podium.height} ${podium.color} rounded-t-lg shadow-inner flex items-start justify-center pt-2`}>
                        <span className="font-black text-black/30 text-xl">{podium.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-t border-gray-100 pt-6">Monthly Champions</h4>
                <div className="space-y-3">
                  {hallOfFame.monthlyChamps.map((champ, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-[#2ECC71] uppercase">{champ.month}</span>
                        <h5 className="font-black text-sm text-[#1A2B48]">{champ.name}</h5>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-bold text-gray-400 uppercase block mb-0.5">Sponsored By</span>
                        <span className="bg-white border border-gray-200 text-[#1A2B48] text-[9px] font-black px-2 py-0.5 rounded shadow-sm">{champ.sponsor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 flex-1 animate-fadeIn">
                {currentLeaderboard.map((user, index) => (
                  <div key={user.rank} className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 shadow-sm' : 'bg-gray-50 hover:bg-gray-100'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black w-4 text-center ${index < 3 ? 'text-[#1A2B48]' : 'text-gray-400'}`}>{user.rank}</span>
                      <div className="h-8 w-8 bg-[#1A2B48] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                        {user.avatar}
                      </div>
                      <span className="font-bold text-[#1A2B48] text-sm">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-gray-600 text-sm">{user.points.toLocaleString()}</span>
                      <span className="text-sm drop-shadow-sm w-4 text-center">{user.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between bg-blue-50/50 -mx-6 -mb-6 p-5">
              <div className="flex items-center gap-2">
                 <div className="h-6 w-6 rounded-full bg-[#2ECC71] text-[#1A2B48] flex items-center justify-center text-[10px] font-black border border-[#1A2B48]">
                   {userName ? userName.charAt(0).toUpperCase() : 'U'}
                 </div>
                 <span className="font-bold text-[#1A2B48] text-xs">Your Rank: #1,402</span>
              </div>
              <span className="text-[#2ECC71] text-[10px] font-black uppercase tracking-widest hover:underline cursor-pointer">Top 15%</span>
            </div>
          </div>

        </div>

        {/* --- COMPACT BATTLE PASS MASTERY TRACKS --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 relative overflow-hidden mb-10">
          
          <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-3 relative z-10">
            <div>
              <h3 className="text-xl font-black text-[#1A2B48] flex items-center gap-2">🛡️ Mastery Tracks</h3>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            
            {/* Track 1: Daily Logins */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <h4 className="font-black text-[#1A2B48] text-[10px] uppercase tracking-widest">Daily Login Mastery</h4>
                <span className="text-[10px] font-bold text-[#2ECC71]">Day 4 / 30</span>
              </div>
              <div className="relative pt-2 pb-6">
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 rounded-full z-0"></div>
                <div className="absolute top-4 left-0 w-[15%] h-1 bg-[#2ECC71] rounded-full z-0 shadow-[0_0_8px_rgba(46,204,113,0.5)]"></div>
                
                <div className="flex justify-between relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#2ECC71] border-2 border-white shadow-sm flex items-center justify-center text-white text-[10px]">✓</div>
                    <span className="text-[9px] font-bold text-[#1A2B48] mt-1">3 Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-[10px]">🔒</div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1">7 Days</span>
                    <span className="text-[8px] font-black text-yellow-500 uppercase">+100</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-[10px]">🔒</div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1">14 Days</span>
                    <span className="text-[8px] font-black text-yellow-500 uppercase">+250</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-[10px]">🔒</div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1">30 Days</span>
                    <span className="text-[8px] font-black text-yellow-500 uppercase">+1000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Track 2: Referrals */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <h4 className="font-black text-[#1A2B48] text-[10px] uppercase tracking-widest">Referral Mastery</h4>
                <span className="text-[10px] font-bold text-[#2ECC71]">1 / 10 Friends</span>
              </div>
              <div className="relative pt-2 pb-6">
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 rounded-full z-0"></div>
                <div className="absolute top-4 left-0 w-[10%] h-1 bg-[#2ECC71] rounded-full z-0 shadow-[0_0_8px_rgba(46,204,113,0.5)]"></div>
                <div className="flex justify-between relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#2ECC71] border-2 border-white shadow-sm flex items-center justify-center text-white text-[10px]">✓</div>
                    <span className="text-[9px] font-bold text-[#1A2B48] mt-1">1 Friend</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-[10px]">🔒</div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1">3 Friends</span>
                    <span className="text-[8px] font-black text-yellow-500 uppercase">+500</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-[10px]">🔒</div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1">5 Friends</span>
                    <span className="text-[8px] font-black text-yellow-500 uppercase">+1000</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center text-[10px]">🔒</div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1">10 Friends</span>
                    <span className="text-[8px] font-black text-yellow-500 uppercase">+2500</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* --- THE FIXED, SCROLLABLE AVATAR MODAL --- */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A2B48]/80 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn">
          
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col relative overflow-hidden border border-gray-200">
            
            {/* FIXED HEADER ZONE */}
            <div className="shrink-0 relative bg-gradient-to-br from-[#1A2B48] to-indigo-900 pt-8 pb-6 px-6 flex flex-col items-center border-b-4 border-[#2ECC71]">
              <button 
                onClick={() => setIsAvatarModalOpen(false)} 
                className="absolute top-4 right-4 z-20 h-8 w-8 bg-white/20 rounded-full text-white flex items-center justify-center hover:bg-white/40 transition font-bold"
              >✕</button>

              <div className={`h-20 w-20 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-4xl mb-3 transition-all duration-300 ${tempSelectedAvatar ? avatarOptions.find(a => a.id === tempSelectedAvatar)?.bg : 'bg-gray-100'}`}>
                {tempSelectedAvatar ? avatarOptions.find(a => a.id === tempSelectedAvatar)?.icon : '👤'}
              </div>
              <h2 className="text-xl font-black text-white">Choose Your Companion</h2>
            </div>

            {/* SCROLLABLE MIDDLE ZONE */}
            <div className="overflow-y-auto p-6 bg-gray-50 flex-1">
              
              {/* Custom Naming Input */}
              <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label className="block text-xs font-bold text-[#1A2B48] uppercase tracking-wider mb-2">Name Your Avatar</label>
                <input 
                  type="text" 
                  value={tempAvatarName}
                  onChange={(e) => setTempAvatarName(e.target.value)}
                  maxLength={15}
                  placeholder="e.g. Buster"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-[#1A2B48] focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition"
                />
                <p className="text-[10px] text-gray-400 font-bold mt-1">This name will appear on your impact dashboard.</p>
              </div>

              {/* Avatar Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {avatarOptions.map((avatar) => (
                  <div 
                    key={avatar.id}
                    onClick={() => setTempSelectedAvatar(avatar.id)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-3xl cursor-pointer transition-all duration-300 ${avatar.bg} ${tempSelectedAvatar === avatar.id ? 'ring-4 ring-[#2ECC71] scale-105 shadow-md' : 'hover:scale-105 opacity-60 hover:opacity-100 shadow-sm border border-black/5'}`}
                  >
                    <span className="drop-shadow-sm">{avatar.icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FIXED FOOTER ZONE */}
            <div className="shrink-0 p-5 bg-white border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => setIsAvatarModalOpen(false)}
                className="w-1/3 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={saveAvatar}
                disabled={!tempSelectedAvatar}
                className={`w-2/3 py-3 rounded-xl font-black transition-all shadow-md text-sm ${tempSelectedAvatar ? 'bg-[#2ECC71] text-[#1A2B48] hover:bg-green-400' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {avatarClaimed ? 'Save Companion' : 'Save & Claim 100 PTS'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}