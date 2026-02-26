'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function UserProfile() {
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('U');
  
  const [lifetimePoints, setLifetimePoints] = useState(0);
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);
  const [hasDonated, setHasDonated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const name = user.user_metadata?.full_name?.split(' ')[0] || 'User';
      setUserName(name);
      setUserInitial(name.charAt(0).toUpperCase());

      // 1. Fetch Completed Courses & Lifetime Points
      const { data: progressData } = await supabase
        .from('user_course_progress')
        .select('course_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (progressData && progressData.length > 0) {
        const completedCourseIds = progressData.map(p => p.course_id);
        
        const { data: courseData } = await supabase
          .from('courses')
          .select('*')
          .in('id', completedCourseIds);

        if (courseData) {
          // Calculate ALL points ever earned (Lifetime Points)
          const totalEarned = courseData.reduce((sum, course) => sum + (course.reward_points || 0), 0);
          setLifetimePoints(totalEarned);

          // Merge the course info with the completion date for the History list
          const history = progressData.map(progress => {
            const courseDetails = courseData.find(c => c.id === progress.course_id);
            return {
              ...courseDetails,
              completed_at: progress.created_at
            };
          }).filter(c => c.title); // Filter out any deleted courses

          setCompletedCourses(history);
        }
      }

      // 2. Check if they have ever made a Charity Donation (for the Philanthropist Badge)
      // Since our charity rewards in the previous step started with 'c' (c1, c2, c3), we can check for that!
      const { data: redemptionData } = await supabase
        .from('redemptions')
        .select('reward_id')
        .eq('user_id', user.id);

      if (redemptionData) {
        const madeDonation = redemptionData.some(r => r.reward_id && r.reward_id.startsWith('c'));
        setHasDonated(madeDonation);
      }

      setIsLoading(false);
    }

    fetchProfileData();
  }, []);

  // --- GAMIFICATION LOGIC ---
  // Every 500 points equals 1 Level
  const currentLevel = Math.floor(lifetimePoints / 500) + 1;
  const pointsToNextLevel = 500 - (lifetimePoints % 500);
  const levelProgressPercentage = ((lifetimePoints % 500) / 500) * 100;

  // Dynamic Badges array! These unlock automatically based on the user's data.
  const badges = [
    { id: 1, title: 'First Steps', description: 'Completed your first Academy course.', icon: '🌱', unlocked: completedCourses.length >= 1 },
    { id: 2, title: 'Knowledge Seeker', description: 'Completed 3 different courses.', icon: '🧠', unlocked: completedCourses.length >= 3 },
    { id: 3, title: 'Philanthropist', description: 'Redeemed points to fund a charity.', icon: '💖', unlocked: hasDonated },
    { id: 4, title: 'High Roller', description: 'Earned over 1,000 lifetime points.', icon: '🚀', unlocked: lifetimePoints >= 1000 },
    { id: 5, title: 'Scholar', description: 'Completed 10 different courses.', icon: '🎓', unlocked: completedCourses.length >= 10 },
    { id: 6, title: 'Givebly Legend', description: 'Reached Level 10.', icon: '👑', unlocked: currentLevel >= 10 },
  ];

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-bold text-[#1A2B48]">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* HEADER */}
      <nav className="bg-[#1A2B48] text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold">
              &larr;
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Your Profile</h1>
          </div>
          <Link href="/rewards" className="bg-[#2ECC71] text-[#1A2B48] text-xs font-black px-3 py-1.5 rounded-lg shadow-sm hover:bg-green-400 transition">
            Vault
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* HERO: LEVEL & PROGRESS */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="absolute top-0 left-0 w-full h-3 bg-gray-100">
            <div className="h-full bg-gradient-to-r from-[#2ECC71] to-blue-500 transition-all duration-1000" style={{ width: `${levelProgressPercentage}%` }}></div>
          </div>
          
          <div className="h-28 w-28 shrink-0 bg-gradient-to-br from-[#1A2B48] to-indigo-800 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-inner border-4 border-white relative">
            {userInitial}
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 h-10 w-10 rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-md">
              L{currentLevel}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-[#1A2B48] mb-2">{userName}'s Impact Journey</h2>
            <p className="text-gray-500 font-medium mb-4">You have earned <strong className="text-[#2ECC71]">{lifetimePoints} Lifetime Points</strong> making a difference.</p>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 inline-block w-full md:w-auto">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                <span>Level {currentLevel}</span>
                <span>Level {currentLevel + 1}</span>
              </div>
              <p className="text-sm font-bold text-[#1A2B48]">Earn {pointsToNextLevel} more points to level up!</p>
            </div>
          </div>
        </div>

        {/* SECTION 1: THE TROPHY CABINET */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-[#1A2B48] flex items-center gap-2">
              🏆 Trophy Cabinet
            </h3>
            <span className="text-sm font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
              {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div key={badge.id} className={`rounded-2xl border-2 p-5 flex flex-col items-center text-center transition-all ${badge.unlocked ? 'bg-white border-yellow-400 shadow-md hover:-translate-y-1' : 'bg-gray-50 border-gray-200 grayscale opacity-60'}`}>
                <div className={`h-16 w-16 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner ${badge.unlocked ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                  {badge.icon}
                </div>
                <h4 className={`font-black text-sm mb-1 ${badge.unlocked ? 'text-[#1A2B48]' : 'text-gray-500'}`}>{badge.title}</h4>
                <p className="text-xs font-medium text-gray-500">{badge.description}</p>
                
                {badge.unlocked ? (
                  <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Unlocked</span>
                ) : (
                  <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-200 px-2 py-1 rounded">Locked</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: LEARNING HISTORY */}
        <div>
          <h3 className="text-2xl font-black text-[#1A2B48] mb-6 flex items-center gap-2">
            📚 Course History
          </h3>
          
          {completedCourses.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {completedCourses.map((course, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 p-5 flex items-center justify-between hover:bg-gray-50 transition">
                  <div>
                    <h4 className="font-bold text-[#1A2B48] mb-1">{course.title}</h4>
                    <p className="text-xs text-gray-400 font-medium">Completed on {new Date(course.completed_at).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-green-50 text-green-700 font-black text-xs px-3 py-1.5 rounded-lg border border-green-200">
                    +{course.reward_points} pts
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
              <span className="text-3xl mb-3 block opacity-50">🧭</span>
              <h4 className="font-bold text-[#1A2B48] mb-1">Your journey hasn't started yet.</h4>
              <p className="text-sm text-gray-500 mb-4">Complete your first course to start earning points and unlocking badges.</p>
              <Link href="/learn" className="inline-block bg-[#1A2B48] text-white font-bold py-2 px-6 rounded-xl text-sm">
                Explore Academy
              </Link>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}