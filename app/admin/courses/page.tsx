'use client';

import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default function CourseBuilder() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [rewardPoints, setRewardPoints] = useState(''); 

  const [questions, setQuestions] = useState([
    { text: '', optionA: '', optionB: '', optionC: '', correct: 'A' },
    { text: '', optionA: '', optionB: '', optionC: '', correct: 'A' },
    { text: '', optionA: '', optionB: '', optionC: '', correct: 'A' },
  ]);

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .insert([
        { 
          title, 
          description, 
          video_url: videoUrl, 
          reward_points: parseInt(rewardPoints, 10) 
        }
      ])
      .select()
      .single();

    if (courseError || !courseData) {
      setStatus({ type: 'error', message: `Course Error: ${courseError?.message}` });
      setIsSubmitting(false);
      return;
    }

    const formattedQuestions = questions.map((q) => {
      const optionsArray = [q.optionA, q.optionB, q.optionC];
      let correctAnswerText = q.optionA;
      if (q.correct === 'B') correctAnswerText = q.optionB;
      if (q.correct === 'C') correctAnswerText = q.optionC;

      return {
        course_id: courseData.id,
        question_text: q.text,
        options: optionsArray,
        correct_answer: correctAnswerText
      };
    });

    const { error: questionsError } = await supabase
      .from('course_questions')
      .insert(formattedQuestions);

    if (questionsError) {
      setStatus({ type: 'error', message: `Quiz Error: ${questionsError.message}` });
    } else {
      setStatus({ type: 'success', message: `"${title}" and its quiz were successfully published!` });
      
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setRewardPoints('');
      setQuestions([
        { text: '', optionA: '', optionB: '', optionC: '', correct: 'A' },
        { text: '', optionA: '', optionB: '', optionC: '', correct: 'A' },
        { text: '', optionA: '', optionB: '', optionC: '', correct: 'A' },
      ]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-20">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 flex justify-between items-end border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#1A2B48] mb-2">Learn & Earn: Course Builder</h1>
            <p className="text-gray-500 font-medium">Publish educational modules and link them to rewards.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="text-gray-500 font-bold hover:text-[#1A2B48] px-4 py-2 transition">
              &larr; Store Admin
            </Link>
          </div>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-xl font-bold text-sm border ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-extrabold text-[#1A2B48] mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 h-8 w-8 rounded-full flex items-center justify-center text-sm">1</span>
              Course Video & Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Course Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Scams & Cyber Safety 101" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Learn how to spot a phishing email..." className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] min-h-[100px]" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Video URL (.mp4 or embed)</label>
                <input type="url" required value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://..." className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Reward Points</label>
                <input type="number" required value={rewardPoints} onChange={(e) => setRewardPoints(e.target.value)} placeholder="e.g. 500" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] font-bold text-[#1A2B48]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-extrabold text-[#1A2B48] mb-6 flex items-center gap-2">
              <span className="bg-[#2ECC71] text-[#1A2B48] h-8 w-8 rounded-full flex items-center justify-center text-sm">2</span>
              The 3-Question Quiz
            </h2>

            <div className="space-y-10">
              {questions.map((q, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                  <div className="absolute -top-3 -left-3 h-8 w-8 bg-[#1A2B48] text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                    Q{index + 1}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Question Text</label>
                    <input type="text" required value={q.text} onChange={(e) => handleQuestionChange(index, 'text', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B48]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Option A</label>
                      <input type="text" required value={q.optionA} onChange={(e) => handleQuestionChange(index, 'optionA', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B48]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Option B</label>
                      <input type="text" required value={q.optionB} onChange={(e) => handleQuestionChange(index, 'optionB', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B48]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Option C</label>
                      <input type="text" required value={q.optionC} onChange={(e) => handleQuestionChange(index, 'optionC', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2B48]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2ECC71] uppercase tracking-widest mb-2">Which one is correct?</label>
                    <select value={q.correct} onChange={(e) => handleQuestionChange(index, 'correct', e.target.value)} className="w-full md:w-1/3 border border-green-300 bg-green-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71] font-bold text-green-800">
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#1A2B48] text-white font-black text-lg py-4 rounded-xl hover:bg-gray-800 transition shadow-lg disabled:bg-gray-400">
            {isSubmitting ? 'Publishing Course...' : 'Publish Course to Givebly'}
          </button>

        </form>
      </div>
    </div>
  );
}