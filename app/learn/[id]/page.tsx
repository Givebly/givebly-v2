'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../../lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CoursePlayer() {
  const params = useParams();
  const router = useRouter();
  
  const [course, setCourse] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // --- ANTI-CHEAT STATES ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const [maxTimePlayed, setMaxTimePlayed] = useState(0);
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  // --- NEW PROGRESSIVE QUIZ STATES ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // --- UI STATES FOR VIDEO TABS ---
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'community'>('overview');

  useEffect(() => {
    async function fetchCourseData() {
      const courseId = params.id;
      if (!courseId) return;

      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError || !courseData) {
        setError('Course not found or has been removed.');
        setIsLoading(false);
        return;
      }
      setCourse(courseData);

      const { data: questionsData } = await supabase
        .from('course_questions')
        .select('*')
        .eq('course_id', courseData.id);

      if (questionsData) setQuestions(questionsData);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: pastProgress } = await supabase
          .from('user_course_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseData.id);
          
        if (pastProgress && pastProgress.length > 0) {
          setIsVideoFinished(true); 
        }
      }

      setIsLoading(false);
    }
    fetchCourseData();
  }, [params.id]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    
    if (currentTime > maxTimePlayed + 1) {
      videoRef.current.currentTime = maxTimePlayed;
    } else {
      setMaxTimePlayed(Math.max(maxTimePlayed, currentTime));
    }
  };

  const handleVideoEnded = () => setIsVideoFinished(true); 

  const handleAnswerSelect = (answerText: string) => {
    if (quizSubmitted) return; 
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answerText });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleQuizSubmit = async () => {
    setIsSaving(true);
    let calculatedScore = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct_answer) calculatedScore += 1;
    });

    setScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore === questions.length) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: existing } = await supabase.from('user_course_progress').select('*').eq('user_id', user.id).eq('course_id', course.id);
        if (!existing || existing.length === 0) {
          await supabase.from('user_course_progress').insert([{ user_id: user.id, course_id: course.id }]);
        }
      }
    }
    setIsSaving(false);
  };

  const handleRetake = () => {
    setQuizSubmitted(false);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0); // Send them back to Q1
    setScore(0);
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#F3F5F7] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#2ECC71]/30 border-t-[#2ECC71] rounded-full animate-spin mb-4"></div>
      <div className="font-bold text-[#1A2B48] tracking-widest uppercase text-sm">Loading Classroom...</div>
    </div>
  );

  if (error) return <div className="min-h-screen bg-[#F3F5F7] flex items-center justify-center font-bold text-red-500">{error}</div>;

  const currentQ = questions[currentQuestionIndex];
  const hasAnsweredCurrent = !!selectedAnswers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#F3F5F7] font-sans flex flex-col h-screen overflow-hidden">
      
      {/* PREMIUM TOP NAV */}
      <nav className="bg-[#1A2B48] text-white py-4 shadow-md shrink-0 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/learn" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold shadow-inner">&larr;</Link>
            <div className="hidden md:block h-8 w-px bg-white/20 mx-2"></div>
            <h1 className="text-lg font-bold tracking-tight truncate max-w-[200px] md:max-w-md">{course?.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-[#2ECC71] font-bold hidden md:inline-block">Module Reward</span>
            <div className="bg-[#2ECC71] text-[#1A2B48] text-sm font-black px-4 py-1.5 rounded-lg shadow-sm">
              +{course?.reward_points} Pts
            </div>
          </div>
        </div>
      </nav>

      {/* SPLIT SCREEN LAYOUT */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: THE VIDEO & DETAILS */}
        <div className="w-full lg:w-2/3 p-6 overflow-y-auto no-scrollbar pb-24">
          
          {/* SECURE VIDEO PLAYER */}
          <div className="bg-black rounded-2xl shadow-xl overflow-hidden mb-6 border border-gray-200 aspect-video relative group">
            {course?.video_url?.includes('youtube.com') ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white p-8 text-center flex-col">
                <span className="text-4xl mb-4">⚠️</span>
                <p className="font-bold mb-2">YouTube Links Detected</p>
                <p className="text-sm text-gray-400">Strict anti-cheat features require direct .mp4 video uploads.</p>
              </div>
            ) : (
              <video 
                ref={videoRef} controls onTimeUpdate={handleTimeUpdate} onEnded={handleVideoEnded}
                className="w-full h-full outline-none" controlsList="nodownload" poster={course?.image_url}
              >
                <source src={course?.video_url || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
              </video>
            )}
          </div>

          {/* COURSE META NAVIGATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto no-scrollbar">
              <button onClick={() => setActiveTab('overview')} className={`px-6 py-4 text-sm font-bold transition border-b-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-[#2ECC71] text-[#1A2B48] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Overview</button>
              <button onClick={() => setActiveTab('resources')} className={`px-6 py-4 text-sm font-bold transition border-b-2 whitespace-nowrap ${activeTab === 'resources' ? 'border-[#2ECC71] text-[#1A2B48] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Key Takeaways & Notes</button>
              <button onClick={() => setActiveTab('community')} className={`px-6 py-4 text-sm font-bold transition border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'community' ? 'border-[#2ECC71] text-[#1A2B48] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                Community Activity <span className="bg-[#1A2B48] text-white text-[9px] px-1.5 py-0.5 rounded-full">Live</span>
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'overview' && (
                <div className="animate-fadeIn">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2ECC71] mb-2 block">Sponsored by {course?.sponsor || 'Corporate Partner'}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#1A2B48] mb-4 leading-tight">{course?.title}</h2>
                  <p className="text-gray-600 font-medium leading-relaxed">{course?.description || "Watch this module entirely to unlock the knowledge check. You must score 100% to earn your Givebly Impact Points."}</p>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="animate-fadeIn space-y-4">
                  <h3 className="text-lg font-black text-[#1A2B48]">Module Resources</h3>
                  <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-black">PDF</div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Action Plan & Checklist</p>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-0.5">2.4 MB</p>
                      </div>
                    </div>
                    <span className="text-[#2ECC71] font-bold text-sm">Download</span>
                  </div>
                </div>
              )}

              {activeTab === 'community' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-[#1A2B48]">Recent Completions</h3>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">245 Learners</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah J.', time: '2 mins ago', org: 'Coastal Animal Rescue' },
                      { name: 'Michael C.', time: '14 mins ago', org: 'Griffith Tigers U12s' },
                      { name: 'David L.', time: '1 hour ago', org: 'Westside Community Radio' }
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                        <div className="h-10 w-10 bg-[#1A2B48] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                          {activity.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{activity.name} <span className="text-gray-500 font-medium">earned {course?.reward_points} Pts</span></p>
                          <p className="text-[11px] text-[#2ECC71] font-bold uppercase tracking-widest mt-0.5">Funded {activity.org}</p>
                        </div>
                        <span className="ml-auto text-xs text-gray-400 font-medium">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PROGRESSIVE QUIZ SIDEBAR */}
        <div className="w-full lg:w-1/3 bg-white border-l border-gray-200 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] flex flex-col h-full z-10">
          
          <div className="p-6 border-b border-gray-100 bg-gray-50 shrink-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-black text-[#1A2B48] tracking-tight">Knowledge Check</h3>
              {isVideoFinished && questions.length > 0 && !quizSubmitted && (
                <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-sm">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>
              )}
            </div>
            
            {/* Minimal Progress Bar */}
            {isVideoFinished && questions.length > 0 && !quizSubmitted && (
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-3">
                <div className="bg-[#2ECC71] h-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + (hasAnsweredCurrent ? 1 : 0)) / questions.length) * 100}%` }}></div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 no-scrollbar relative">
            
            {!isVideoFinished && (
              <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border border-gray-200 shadow-sm">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-black text-[#1A2B48] mb-2">Quiz Locked</h3>
                <p className="text-sm text-gray-500 font-medium">Watch the entire video to unlock these questions and earn your rewards.</p>
              </div>
            )}

            {/* PROGRESSIVE QUIZ UI */}
            <div className={`space-y-6 ${!isVideoFinished ? 'opacity-20 pointer-events-none blur-sm' : ''}`}>
              
              {!quizSubmitted ? (
                /* ONE QUESTION AT A TIME */
                currentQ ? (
                  <div className="animate-fadeIn">
                    <p className="font-bold text-[#1A2B48] text-base leading-snug mb-5">
                      {currentQ.question_text || "Sample Question Text?"}
                    </p>
                    <div className="space-y-3">
                      {currentQ.options?.map((option: string, i: number) => {
                        const isSelected = selectedAnswers[currentQuestionIndex] === option;
                        return (
                          <button 
                            key={i} 
                            onClick={() => handleAnswerSelect(option)} 
                            className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-3 ${isSelected ? 'bg-[#1A2B48] border-[#1A2B48] text-white shadow-md transform scale-[1.02]' : 'bg-white border-gray-200 text-gray-700 hover:border-[#1A2B48] hover:shadow-sm'}`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-white' : 'border-gray-300'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-[#2ECC71] rounded-full"></div>}
                            </div>
                            <span className="flex-1">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-10 font-medium text-sm">No questions available.</div>
                )
              ) : (
                /* FULL REVIEW STATE AFTER SUBMISSION */
                <div className="space-y-8 animate-fadeIn">
                  {questions.map((q, index) => (
                    <div key={q.id || index} className="space-y-3">
                      <p className="font-bold text-[#1A2B48] text-sm leading-snug">
                        <span className="text-gray-400 mr-2">{index + 1}.</span> {q.question_text}
                      </p>
                      <div className="p-4 rounded-xl border text-sm font-medium flex justify-between items-center ${selectedAnswers[index] === q.correct_answer ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-red-50 border-red-500 text-red-900'}">
                        <span>{selectedAnswers[index]}</span>
                        {selectedAnswers[index] === q.correct_answer ? (
                          <span className="text-emerald-500 font-bold">✓ Correct</span>
                        ) : (
                          <span className="text-red-500 font-bold">✗ Incorrect</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pb-10"></div>
          </div>

          {/* DYNAMIC ACTION BUTTON (Sticky Bottom) */}
          <div className="p-6 border-t border-gray-100 bg-white shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] relative z-30">
            {!quizSubmitted ? (
              currentQuestionIndex < questions.length - 1 ? (
                <button 
                  onClick={handleNextQuestion} 
                  disabled={!hasAnsweredCurrent || !isVideoFinished} 
                  className="w-full bg-[#1A2B48] text-white font-black py-3.5 rounded-xl shadow-md hover:bg-gray-800 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none flex justify-center items-center gap-2"
                >
                  Next Question &rarr;
                </button>
              ) : (
                <button 
                  onClick={handleQuizSubmit} 
                  disabled={isSaving || !hasAnsweredCurrent} 
                  className="w-full bg-[#2ECC71] text-[#1A2B48] font-black py-3.5 rounded-xl shadow-md hover:bg-[#27AE60] transition disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                >
                  {isSaving ? 'Grading...' : 'Submit Answers'}
                </button>
              )
            ) : (
              <div className="w-full text-center">
                {score === questions.length ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm animate-fadeIn">
                    <span className="text-3xl block mb-2">🏆</span>
                    <h4 className="font-black text-emerald-800 text-lg mb-1">Perfect Score!</h4>
                    <p className="text-emerald-600 text-xs font-bold mb-4">You earned {course?.reward_points} Points.</p>
                    <Link href="/learn" className="block w-full bg-[#1A2B48] text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition shadow-sm">Return to Academy</Link>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm animate-fadeIn">
                    <h4 className="font-black text-red-800 text-lg mb-1">Score: {score} / {questions.length}</h4>
                    <p className="text-red-600 text-xs font-bold mb-4">You need 100% to pass. Review your errors above.</p>
                    <button onClick={handleRetake} className="w-full bg-white text-red-600 border border-red-300 font-bold py-3 rounded-lg hover:bg-red-50 transition shadow-sm">
                      Wipe Slate & Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}