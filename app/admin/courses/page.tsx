'use client';

import React, { useState } from 'react';

// Types for our new Modular structure
type ModuleType = 'video' | 'quiz';

interface CourseModule {
  id: string;
  type: ModuleType;
  title: string;
  url?: string; 
  questions?: any[]; 
}

export default function CourseArchitectHQ() {
  const [isSaving, setIsSaving] = useState(false);

  // --- DYNAMIC CATEGORIES STATE ---
  const [categories, setCategories] = useState(['Cybersecurity', 'Financial Literacy', 'Digital Wellbeing', 'Scam Awareness']);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // --- COURSE META STATE ---
  const [courseMeta, setCourseMeta] = useState({
    title: '',
    sponsor: '',
    sponsorLogo: '', 
    points: 500,
    duration: '15 Mins', // <-- NEW DURATION FIELD
    category: 'Cybersecurity',
    description: '',
  });

  // --- CURRICULUM STATE ---
  const [modules, setModules] = useState<CourseModule[]>([
    { id: 'mod_1', type: 'video', title: 'Part 1: Introduction' },
    { id: 'mod_2', type: 'quiz', title: 'Knowledge Check 1', questions: [] }
  ]);

  // --- RESOURCES STATE ---
  const [resources, setResources] = useState<{name: string, url: string}[]>([]);

  // --- HANDLERS ---
  const addModule = (type: ModuleType) => {
    const newModule: CourseModule = {
      id: `mod_${Date.now()}`,
      type,
      title: type === 'video' ? 'New Video Lesson' : 'New Knowledge Check',
      ...(type === 'quiz' ? { questions: [] } : { url: '' })
    };
    setModules([...modules, newModule]);
  };

  const removeModule = (id: string) => setModules(modules.filter(m => m.id !== id));

  const moveModule = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === modules.length - 1) return;
    const newModules = [...modules];
    const temp = newModules[index];
    newModules[index] = newModules[direction === 'up' ? index - 1 : index + 1];
    newModules[direction === 'up' ? index - 1 : index + 1] = temp;
    setModules(newModules);
  };

  const addResource = () => setResources([...resources, { name: '', url: '' }]);

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setCourseMeta({ ...courseMeta, category: newCategoryName.trim() });
      setNewCategoryName('');
    }
  };

  const handleRemoveCategory = (catToRemove: string) => {
    setCategories(categories.filter(c => c !== catToRemove));
    if (courseMeta.category === catToRemove) {
      setCourseMeta({ ...courseMeta, category: categories[0] || '' });
    }
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log('Modular Course Saved Successfully!', { courseMeta, modules, resources });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] font-sans pb-24">
      
      {/* ADMIN TOP NAV */}
      <nav className="bg-white border-b border-gray-200 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-[#1A2B48] tracking-tight">Course Architect</h1>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Modular Curriculum Builder</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Save Draft</button>
            <button onClick={handleSaveCourse} disabled={isSaving} className="px-5 py-2 text-sm font-black text-white bg-[#2ECC71] hover:bg-[#27AE60] rounded-lg shadow-md transition disabled:bg-gray-400 flex items-center gap-2">
              {isSaving ? 'Publishing...' : 'Publish Course'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: COURSE SETTINGS & RESOURCES */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-sm font-black text-[#1A2B48] uppercase tracking-wider mb-5 pb-3 border-b border-gray-100">Course Metadata</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Course Title</label>
                <input type="text" placeholder="e.g. Cybersecurity Foundations" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={courseMeta.title} onChange={e => setCourseMeta({...courseMeta, title: e.target.value})} />
              </div>
              
              {/* SPONSOR ROW WITH LOGO UPLOAD */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Sponsor Name</label>
                  <input type="text" placeholder="e.g. Telstra" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={courseMeta.sponsor} onChange={e => setCourseMeta({...courseMeta, sponsor: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Sponsor Logo</label>
                  <div className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl h-[42px] flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100 transition cursor-pointer">
                    + Upload PNG
                  </div>
                </div>
              </div>

              {/* POINTS, DURATION, AND CATEGORY ROW (3 Columns) */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1.5">Points</label>
                  <input type="number" className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-3 py-2.5 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={courseMeta.points} onChange={e => setCourseMeta({...courseMeta, points: parseInt(e.target.value) || 0})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Est. Time</label>
                  <input type="text" placeholder="e.g. 15 Mins" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={courseMeta.duration} onChange={e => setCourseMeta({...courseMeta, duration: e.target.value})} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Category</label>
                  </div>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2.5 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={courseMeta.category} onChange={e => setCourseMeta({...courseMeta, category: e.target.value})}>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DYNAMIC CATEGORY MANAGER PANEL (Toggled via a small link) */}
              <div>
                <button onClick={() => setIsManagingCategories(!isManagingCategories)} className="text-[10px] text-blue-600 font-bold hover:underline mb-2 block">
                  {isManagingCategories ? 'Close Category Manager' : '+ Manage Categories'}
                </button>
                {isManagingCategories && (
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 animate-fadeIn mb-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-800 mb-3">Edit Categories</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto mb-3 no-scrollbar">
                      {categories.map(cat => (
                        <div key={cat} className="flex justify-between items-center bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                          <span className="text-xs font-bold text-gray-700">{cat}</span>
                          <button onClick={() => handleRemoveCategory(cat)} className="text-red-500 hover:text-red-700 font-bold text-xs">Remove</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="New category..." value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-blue-400" />
                      <button onClick={handleAddCategory} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition">Add</button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Short Description</label>
                <textarea rows={3} placeholder="What will the user learn?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71] resize-none" value={courseMeta.description} onChange={e => setCourseMeta({...courseMeta, description: e.target.value})}></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Cover Image (16:9)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                  <span className="text-xl mb-2">📸</span>
                  <span className="text-xs font-bold text-[#1A2B48]">Upload Thumbnail</span>
                </div>
              </div>
            </div>
          </div>

          {/* RESOURCES BUILDER */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h2 className="text-sm font-black text-[#1A2B48] uppercase tracking-wider">Downloadable Resources</h2>
              <button onClick={addResource} className="text-[#2ECC71] hover:text-[#27AE60] text-xl font-black leading-none pb-1">+</button>
            </div>
            
            <div className="space-y-3">
              {resources.length === 0 ? (
                <p className="text-xs text-gray-400 font-medium italic text-center py-2">No resources added. Click + to add PDFs or links.</p>
              ) : (
                resources.map((res, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 relative group">
                    <button onClick={() => setResources(resources.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 bg-red-100 text-red-600 h-5 w-5 rounded-full text-[10px] font-black opacity-0 group-hover:opacity-100 transition">✕</button>
                    <input type="text" placeholder="Resource Name (e.g. PDF Checklist)" className="w-full bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-bold mb-2 focus:outline-none focus:border-[#2ECC71]" />
                    <input type="text" placeholder="File URL or Link" className="w-full bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#2ECC71]" />
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: THE MODULAR CURRICULUM BUILDER */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 min-h-[600px] flex flex-col">
            
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-xl font-black text-[#1A2B48]">Course Curriculum</h2>
                <p className="text-xs text-gray-500 font-medium mt-1">Drag or move blocks to structure your course journey.</p>
              </div>
            </div>

            {/* THE BLOCKS */}
            <div className="space-y-4 flex-1">
              {modules.map((mod, index) => (
                <div key={mod.id} className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm group hover:border-gray-200 transition">
                  
                  {/* Block Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm shadow-inner ${mod.type === 'video' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                        {mod.type === 'video' ? '▶' : '📝'}
                      </div>
                      <input 
                        type="text" 
                        value={mod.title}
                        onChange={(e) => {
                          const newMods = [...modules];
                          newMods[index].title = e.target.value;
                          setModules(newMods);
                        }}
                        className="bg-transparent font-bold text-gray-900 focus:outline-none focus:border-b border-[#2ECC71] w-full max-w-[250px]"
                      />
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition">
                      <button onClick={() => moveModule(index, 'up')} disabled={index === 0} className="p-1.5 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30">↑</button>
                      <button onClick={() => moveModule(index, 'down')} disabled={index === modules.length - 1} className="p-1.5 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30">↓</button>
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <button onClick={() => removeModule(mod.id)} className="p-1.5 hover:bg-red-100 text-red-500 rounded">✕</button>
                    </div>
                  </div>

                  {/* Block Content Payload */}
                  <div className="p-5">
                    {mod.type === 'video' ? (
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">MP4 Video Source URL</label>
                        <input type="text" placeholder="https://your-storage.com/video.mp4" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50">
                        <span className="text-2xl mb-2 block opacity-50">❓</span>
                        <h4 className="text-sm font-bold text-gray-700 mb-1">Quiz Section</h4>
                        <p className="text-xs text-gray-500 mb-4">Users must pass this checkpoint to continue.</p>
                        <button className="bg-white border border-gray-300 text-[#1A2B48] px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition shadow-sm">
                          + Add Question
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>

            {/* ADD NEW BLOCKS BAR */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Add Module:</span>
              <button onClick={() => addModule('video')} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition flex items-center gap-2">
                <span>▶</span> Video Lesson
              </button>
              <button onClick={() => addModule('quiz')} className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition flex items-center gap-2">
                <span>📝</span> Quiz Checkpoint
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}