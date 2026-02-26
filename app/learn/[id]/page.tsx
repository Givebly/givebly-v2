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

  // Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

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
      
      // Check if they ALREADY completed this course in the past
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: pastProgress } = await supabase
          .from('user_course_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseData.id);
          
        if (pastProgress && pastProgress.length > 0) {
          setIsVideoFinished(true); // If already completed, unlock quiz automatically for review
        }
      }

      setIsLoading(false);
    }
    fetchCourseData();
  }, [params.id]);

  // --- THE VIDEO SNAP-BACK LOGIC ---
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    
    // If they try to skip forward more than 1 second past their max watched time
    if (currentTime > maxTimePlayed + 1) {
      videoRef.current.currentTime = maxTimePlayed; // Snap them back!
    } else {
      // Otherwise, update their new max watched time
      setMaxTimePlayed(Math.max(maxTimePlayed, currentTime));
    }
  };

  const handleVideoEnded = () => {
    setIsVideoFinished(true); // Unlocks the quiz!
  };

  const handleAnswerSelect = (questionIndex: number, answerText: string) => {
    if (quizSubmitted) return; 
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answerText });
  };

  const handleQuizSubmit = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      return alert("Please answer all questions before submitting.");
    }

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
        // Prevent duplicate entries if they retake it
        const { data: existing } = await supabase.from('user_course_progress').select('*').eq('user_id', user.id).eq('course_id', course.id);
        if (!existing || existing.length === 0) {
          await supabase.from('user_course_progress').insert([{ user_id: user.id, course_id: course.id }]);
        }
      }
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-bold text-[#1A2B48]">Loading Classroom...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center font-bold text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      <nav className="bg-[#1A2B48] text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/learn" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold">&larr;</Link>
            <h1 className="text-xl font-bold tracking-tight truncate max-w-[200px] md:max-w-md">{course?.title}</h1>
          </div>
          <div className="bg-[#2ECC71] text-[#1A2B48] text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
            {course?.reward_points} Points
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* SECURE VIDEO PLAYER */}
        <div className="bg-black rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200 aspect-video relative group">
          {course?.video_url?.includes('youtube.com') ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white p-8 text-center flex-col">
              <span className="text-4xl mb-4">⚠️</span>
              <p className="font-bold mb-2">YouTube Links Detected</p>
              <p className="text-sm text-gray-400">Strict anti-cheat features require direct .mp4 video uploads. YouTube embeds bypass player security.</p>
            </div>
          ) : (
            <video 
              ref={videoRef}
              controls 
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              className="w-full h-full outline-none" 
              controlsList="nodownload"
            >
              <source src={course?.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-black text-[#1A2B48] mb-3">{course?.title}</h2>
          <p className="text-gray-600 font-medium leading-relaxed">{course?.description}</p>
        </div>

        {/* CONDITIONAL QUIZ RENDER */}
        {!isVideoFinished ? (
          <div className="bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center flex flex-col items-center justify-center">
            <span className="text-4xl mb-4 opacity-50">🔒</span>
            <h3 className="text-lg font-black text-gray-600 mb-2">Quiz Locked</h3>
            <p className="text-sm text-gray-500 max-w-sm">You must watch the entire video from start to finish to unlock the knowledge check and earn your Impact Points.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#2ECC71]/30 p-6 md:p-8 animate-fade-in-up">
            <h3 className="text-xl font-black text-[#1A2B48] mb-6 flex items-center gap-2">
              <span className="bg-[#2ECC71] text-[#1A2B48] h-8 w-8 rounded-full flex items-center justify-center text-sm">📝</span>
              Knowledge Check Unlocked!
            </h3>

            <div className="space-y-8">
              {questions.map((q, index) => (
                <div key={q.id} className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <p className="font-bold text-[#1A2B48] mb-4">
                    <span className="text-gray-400 mr-2">{index + 1}.</span> {q.question_text}
                  </p>
                  <div className="space-y-3">
                    {q.options.map((option: string, i: number) => {
                      let buttonClass = "w-full text-left px-4 py-3 rounded-xl border font-medium text-sm transition ";
                      if (quizSubmitted) {
                        if (option === q.correct_answer) buttonClass += "bg-green-100 border-green-500 text-green-800"; 
                        else if (selectedAnswers[index] === option && option !== q.correct_answer) buttonClass += "bg-red-100 border-red-500 text-red-800"; 
                        else buttonClass += "bg-white border-gray-200 text-gray-400"; 
                      } else {
                        if (selectedAnswers[index] === option) buttonClass += "bg-[#1A2B48] border-[#1A2B48] text-white"; 
                        else buttonClass += "bg-white border-gray-300 text-gray-700 hover:border-[#1A2B48]"; 
                      }
                      return (
                        <button key={i} onClick={() => handleAnswerSelect(index, option)} disabled={quizSubmitted} className={buttonClass}>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              {!quizSubmitted ? (
                <button onClick={handleQuizSubmit} disabled={isSaving} className="w-full md:w-auto bg-[#2ECC71] text-[#1A2B48] font-black text-lg py-3 px-8 rounded-xl shadow-md hover:bg-green-400 transition">
                  {isSaving ? 'Grading...' : 'Submit Answers'}
                </button>
              ) : (
                <div className={`p-6 rounded-2xl border-2 ${score === questions.length ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} text-center`}>
                  <span className="text-4xl block mb-2">{score === questions.length ? '🏆' : '🔄'}</span>
                  <h4 className={`text-xl font-black mb-2 ${score === questions.length ? 'text-green-800' : 'text-red-800'}`}>You scored {score} out of {questions.length}</h4>
                  {score === questions.length ? (
                    <>
                      <p className="text-green-700 font-bold mb-4">Brilliant! You've earned {course?.reward_points} Impact Points.</p>
                      <Link href="/learn" className="inline-block bg-[#1A2B48] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-gray-800 transition shadow-sm">Return to Academy</Link>
                    </>
                  ) : (
                    <>
                      <p className="text-red-700 font-bold mb-4">You need a perfect score to earn the points. Review the video and try again!</p>
                      <button onClick={() => { setQuizSubmitted(false); setSelectedAnswers({}); }} className="inline-block bg-white text-red-600 border border-red-200 font-bold py-2.5 px-6 rounded-xl hover:bg-red-50 transition shadow-sm">Retake Quiz</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}