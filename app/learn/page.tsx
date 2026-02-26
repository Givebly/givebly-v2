'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function LearnAndEarnHub() {
  const [courses, setCourses] = useState<any[]>([]);
  const [completedCourseIds, setCompletedCourseIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchAcademyData() {
      // 1. Get the user
      const { data: { user } } = await supabase.auth.getUser();
      let currentUserId = null;

      if (user) {
        currentUserId = user.id;
        const name = user.user_metadata?.full_name?.split(' ')[0] || 'User';
        setUserName(name);
      }

      // 2. Fetch all published courses
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (courseData) {
        setCourses(courseData);
      }

      // 3. Check which courses this specific user has completed
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

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-bold text-[#1A2B48]">Loading Academy...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      <nav className="bg-[#1A2B48] text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold">
              &larr;
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Givebly Academy</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold hidden md:block text-[#2ECC71]">Learn & Earn</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="bg-gradient-to-r from-[#1A2B48] to-indigo-900 rounded-3xl shadow-xl p-8 md:p-12 mb-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ECC71]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <span className="bg-[#2ECC71] text-[#1A2B48] text-xs font-black px-3 py-1 rounded-full mb-6 w-max uppercase tracking-widest shadow-sm inline-block">Upskill & Impact</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Knowledge is power.<br/>Now it pays.</h2>
          <p className="text-blue-200 font-medium max-w-xl text-lg mb-8">
            Complete short courses on digital safety, financial literacy, and more. {userName ? `${userName}, earn` : 'Earn'} points for your vault and generate real-world impact just by learning.
          </p>
          
          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-[#2ECC71]">100%</span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Free to learn</span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-[#2ECC71]">{courses.length}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Active Courses</span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-yellow-400">{completedCourseIds.size}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Completed</span>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-end">
          <h3 className="text-2xl font-black text-[#1A2B48]">Available Modules</h3>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isCompleted = completedCourseIds.has(course.id);

              return (
                <div key={course.id} className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 group ${isCompleted ? 'opacity-75 bg-gray-50' : 'hover:shadow-xl hover:-translate-y-1'}`}>
                  
                  <div className="h-48 bg-gray-900 relative overflow-hidden border-b border-gray-100 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    
                    {isCompleted ? (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center">
                         <span className="text-5xl mb-2 drop-shadow-md">🏆</span>
                         <span className="bg-[#1A2B48] text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Completed</span>
                      </div>
                    ) : (
                      <div className="absolute z-20 h-14 w-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-white/30">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                      </div>
                    )}

                    <div className={`absolute top-4 right-4 z-30 font-black text-sm px-3 py-1.5 rounded-lg shadow-md ${isCompleted ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-[#2ECC71] text-[#1A2B48]'}`}>
                      {isCompleted ? '✓ Earned' : `${course.reward_points} Points`}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className={`text-xl font-black mb-2 leading-tight ${isCompleted ? 'text-gray-600' : 'text-[#1A2B48]'}`}>{course.title}</h4>
                    <p className="text-sm text-gray-500 font-medium mb-6 flex-1 line-clamp-3">{course.description}</p>
                    
                    <Link href={`/learn/${course.id}`} className={`w-full font-bold py-3 rounded-xl text-center transition shadow-md block ${isCompleted ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-[#1A2B48] text-white hover:bg-gray-800'}`}>
                      {isCompleted ? 'Review Course' : 'Start Course →'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
            <span className="text-4xl mb-4 block opacity-50">🎓</span>
            <h3 className="text-lg font-bold text-[#1A2B48] mb-1">No courses available yet</h3>
            <p className="text-gray-500 text-sm">Check back soon for new educational content.</p>
          </div>
        )}

      </main>
    </div>
  );
}