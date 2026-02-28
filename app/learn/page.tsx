'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function LearnAndEarnHub() {
  const [courses, setCourses] = useState<any[]>([]);
  const [completedCourseIds, setCompletedCourseIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  // UI States for premium filtering
  const [activeFilter, setActiveFilter] = useState('All Topics');
  const categories = ['All Topics', 'Cybersecurity', 'Financial Literacy', 'Digital Wellbeing', 'Scam Awareness'];

  useEffect(() => {
    async function fetchAcademyData() {
      const { data: { user } } = await supabase.auth.getUser();
      let currentUserId = null;

      if (user) {
        currentUserId = user.id;
        const name = user.user_metadata?.full_name?.split(' ')[0] || 'User';
        setUserName(name);
      }

      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (courseData) {
        setCourses(courseData);
      }

      if (currentUserId) {
        const { data: progressData } = await supabase
          .from('user_course_progress')
          .select('course_id')
          .eq('user_id', currentUserId);

        if (progressData) {
          const completedIds = new Set(progressData.map(p => p.course_id));
          setCompletedCourseIds(completedIds);
        }
      }
      setIsLoading(false);
    }
    fetchAcademyData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F5F7] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#2ECC71]/30 border-t-[#2ECC71] rounded-full animate-spin mb-4"></div>
        <div className="font-bold text-[#1A2B48] tracking-widest uppercase text-sm">Loading Academy...</div>
      </div>
    );
  }

  // Filter logic
  const filteredCourses = courses.filter(course => {
    if (activeFilter === 'All Topics') return true;
    return course.category === activeFilter || (!course.category && activeFilter === 'All Topics');
  });

  return (
    <div className="min-h-screen bg-[#F3F5F7] font-sans pb-24">
      
      {/* PREMIUM NAVIGATION */}
      <nav className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="h-10 w-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition cursor-pointer font-bold shadow-inner">
              &larr;
            </Link>
            <div>
              <h1 className="text-2xl font-black text-[#1A2B48] tracking-tight leading-none">Givebly Academy</h1>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Powered by Corporate Partners</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Vault</span>
              <span className="text-lg font-black text-[#2ECC71]">1,450 Pts</span>
            </div>
            <div className="h-10 w-10 bg-[#1A2B48] rounded-full border-2 border-[#2ECC71] flex items-center justify-center text-white font-bold text-sm shadow-md">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* LINKEDIN-STYLE HERO DASHBOARD */}
        <div className="bg-[#1A2B48] rounded-3xl shadow-xl p-8 md:p-12 mb-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-[80px] -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
          
          <div className="relative z-10 w-full md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              Welcome back, {userName || 'Learner'}.<br/>
              <span className="text-[#2ECC71]">Turn screen time into impact.</span>
            </h2>
            <p className="text-blue-100/80 font-medium text-lg mb-8 max-w-xl">
              Complete industry-certified short courses. Earn Givebly Impact Points. Fund the community causes you care about.
            </p>
            
            <div className="flex gap-4">
              <button className="bg-[#2ECC71] text-[#1A2B48] px-6 py-3 rounded-xl font-black shadow-lg hover:bg-[#27AE60] transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                Continue Learning
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition backdrop-blur-sm">
                View My Certificates
              </button>
            </div>
          </div>

          <div className="hidden md:flex relative z-10 w-1/3 justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-64 shadow-2xl">
              <h4 className="text-[10px] uppercase tracking-widest text-blue-200 font-bold mb-4">Your Learning Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-sm font-medium text-white">Modules Completed</span>
                  <span className="text-2xl font-black text-white leading-none">{completedCourseIds.size}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-sm font-medium text-white">Total Value Earned</span>
                  <span className="text-2xl font-black text-[#2ECC71] leading-none">${(completedCourseIds.size * 5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="mb-8 flex overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm border ${
                  activeFilter === cat 
                    ? 'bg-[#1A2B48] text-white border-[#1A2B48]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* COURSE GRID */}
        <div className="mb-6 flex justify-between items-end">
          <h3 className="text-xl font-black text-[#1A2B48] tracking-tight">
            {activeFilter === 'All Topics' ? 'Trending Modules' : `${activeFilter} Courses`}
          </h3>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              const isCompleted = completedCourseIds.has(course.id);
              
              // Smart fallbacks with random-looking metrics for the mockup
              const duration = course.duration || '15 Min';
              const sponsor = course.sponsor || 'Corporate Partner';
              const reward = course.reward_points || 500;
              const imageUrl = course.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';
              const rating = course.rating || 4.8;
              const completions = course.completions || Math.floor(Math.random() * 800) + 200;

              return (
                <div key={course.id} className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group ${isCompleted ? 'bg-gray-50/80 border-gray-200 opacity-80 shadow-none' : 'bg-white shadow-sm border-gray-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer'}`}>
                  
                  {/* 16:9 VIDEO THUMBNAIL */}
                  <div className={`aspect-video bg-gray-900 relative overflow-hidden ${isCompleted ? 'grayscale opacity-70' : 'group'}`}>
                    <img src={imageUrl} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Status / Points Badge */}
                    <div className="absolute top-3 left-3 flex gap-2 z-20">
                      {isCompleted ? (
                        <span className="bg-white/90 backdrop-blur text-gray-600 font-black text-[10px] px-2.5 py-1 rounded shadow-sm border border-gray-200">Earned</span>
                      ) : (
                        <span className="bg-[#2ECC71] text-[#1A2B48] font-black text-[10px] px-2.5 py-1 rounded shadow-md border border-[#27AE60]">+{reward} Pts</span>
                      )}
                    </div>

                    {/* Time Indicator */}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2 py-1 rounded shadow-md z-20">
                      {duration}
                    </div>

                    {/* COMPLETED OVERLAY - THE GIVEBLY COIN */}
                    {isCompleted && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/40 backdrop-blur-[1px]">
                        <div className="h-16 w-16 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full border-4 border-white flex items-center justify-center shadow-[0_0_20px_rgba(253,224,71,0.5)] transform -rotate-12 mb-2">
                          <span className="text-white font-black text-2xl drop-shadow-md">G</span>
                        </div>
                        <span className="bg-[#1A2B48] text-white font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow-lg border border-gray-600">Module Complete</span>
                      </div>
                    )}

                    {/* Hover Play Button (Only if NOT completed) */}
                    {!isCompleted && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="h-12 w-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/50">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* COURSE META DATA */}
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2ECC71] mb-1.5 block">
                      Sponsored by {sponsor}
                    </span>
                    
                    <h4 className={`text-lg font-black mb-1.5 leading-tight line-clamp-2 ${isCompleted ? 'text-gray-500' : 'text-[#1A2B48]'}`}>
                      {course.title}
                    </h4>

                    {/* SOCIAL PROOF ROW (Stars & Completions) */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400 text-xs">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700">{rating}</span>
                      <span className="text-[10px] font-medium text-gray-400 border-l border-gray-200 pl-2 ml-1">
                        {completions.toLocaleString()} completed
                      </span>
                    </div>
                    
                    <p className={`text-xs font-medium mb-5 flex-1 line-clamp-2 ${isCompleted ? 'text-gray-400' : 'text-gray-500'}`}>
                      {course.description || "Master the foundations of digital safety and earn rewards to fund your local community."}
                    </p>
                    
                    <Link href={`/learn/${course.id}`} className={`block w-full text-center py-2.5 rounded-xl text-xs font-black shadow-sm transition border ${isCompleted ? 'bg-transparent border-gray-300 text-gray-400 hover:bg-gray-100' : 'border-gray-200 group-hover:border-[#1A2B48] group-hover:bg-[#1A2B48] group-hover:text-white text-gray-700 bg-gray-50'}`}>
                      {isCompleted ? 'Review Material' : 'Start Module'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-16 text-center max-w-2xl mx-auto mt-10">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl opacity-50">🎓</span>
            </div>
            <h3 className="text-2xl font-black text-[#1A2B48] mb-2">Modules loading...</h3>
            <p className="text-gray-500 font-medium mb-6">We are currently syncing the latest corporate-sponsored courses to the Academy.</p>
            <button onClick={() => window.location.reload()} className="bg-[#1A2B48] text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">
              Refresh Academy
            </button>
          </div>
        )}

      </main>
    </div>
  );
}