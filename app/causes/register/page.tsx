'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase'; 

export default function CauseRegistration() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    orgName: '', orgType: 'Community Sports Club', abn: '', website: '',
    repName: '', repRole: '', repEmail: '', repPhone: '',
    campaignTitle: '', goalAmount: '', tangibleMetric: '', description: '',
    bsb: '', account: '', agreedToTerms: false
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('causes').insert([
      {
        org_name: formData.orgName,
        org_type: formData.orgType,
        abn: formData.abn,
        rep_name: formData.repName,
        rep_role: formData.repRole,
        rep_email: formData.repEmail,
        campaign_title: formData.campaignTitle,
        goal_amount: Number(formData.goalAmount),
        tangible_metric: formData.tangibleMetric,
        bsb: formData.bsb,
        account_number: formData.account,
        status: 'pending' 
      }
    ]);

    setIsSubmitting(false);

    if (error) {
      alert(`Submission Error: ${error.message}`);
    } else {
      setSubmitSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/causes" className="text-xl font-black text-[#1A2B48] tracking-tight">
            Givebly<span className="text-[#2ECC71]">.</span>
          </Link>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Partner Onboarding</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center p-6">
        
        {submitSuccess ? (
          /* SUCCESS STATE */
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center animate-fadeIn">
            <div className="h-20 w-20 bg-[#2ECC71]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-black text-[#1A2B48] mb-4">Application Received!</h2>
            <p className="text-gray-600 font-medium mb-8 text-lg">
              Thank you for registering <span className="font-bold text-[#1A2B48]">{formData.orgName}</span>. 
              Our compliance team will review your ABN and campaign details. We will email <span className="font-bold text-[#1A2B48]">{formData.repEmail}</span> within 48 hours with your onboarding next steps!
            </p>
            <Link href="/causes" className="bg-[#1A2B48] text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">
              Return to Hub
            </Link>
          </div>
        ) : (
          /* FORM STATE */
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            
            {/* LEFT SIDE: PROGRESS & INFO */}
            <div className="w-full md:w-1/3 bg-[#1A2B48] text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black mb-2">Join the Impact Network</h2>
                <p className="text-sm text-gray-400 font-medium mb-10">Turn your community&apos;s everyday shopping into direct funding for your goals.</p>
                
                <div className="space-y-6">
                  <StepIndicator currentStep={step} stepNum={1} title="Organization Details" />
                  <StepIndicator currentStep={step} stepNum={2} title="Representative" />
                  <StepIndicator currentStep={step} stepNum={3} title="First Campaign" />
                  <StepIndicator currentStep={step} stepNum={4} title="Payouts & Verification" />
                </div>
              </div>

              <div className="mt-10 bg-white/10 p-4 rounded-xl border border-white/10">
                <p className="text-xs font-medium text-gray-300">
                  &quot;Givebly helped us fund our new equipment in 3 weeks just by having our parents shop online.&quot;
                </p>
                <p className="text-[10px] font-bold text-[#2ECC71] mt-2 uppercase tracking-wider">— Tigers U12s</p>
              </div>
            </div>

            {/* RIGHT SIDE: THE FORM */}
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col">
              
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                
                {/* STEP 1: ORGANIZATION */}
                {step === 1 && (
                  <div className="animate-fadeIn flex-1">
                    <h3 className="text-2xl font-black text-[#1A2B48] mb-1">Tell us about your cause.</h3>
                    <p className="text-sm text-gray-500 font-medium mb-8">We use this to verify your legal status and build trust with donors.</p>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Legal Organization Name</label>
                        <input type="text" required placeholder="e.g. Griffith Tigers Football Club" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={formData.orgName} onChange={e => setFormData({...formData, orgName: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Organization Type</label>
                          <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={formData.orgType} onChange={e => setFormData({...formData, orgType: e.target.value})}>
                            <option>Community Sports Club</option>
                            <option>School P&C</option>
                            <option>ACNC Registered Charity</option>
                            <option>Local Community Group</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">ABN / ACNC Number</label>
                          <input type="text" required placeholder="11 222 333 444" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71] font-mono" value={formData.abn} onChange={e => setFormData({...formData, abn: e.target.value})} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: REPRESENTATIVE */}
                {step === 2 && (
                  <div className="animate-fadeIn flex-1">
                    <h3 className="text-2xl font-black text-[#1A2B48] mb-1">Who is managing this?</h3>
                    <p className="text-sm text-gray-500 font-medium mb-8">We need an authorized person from the organization to manage funds.</p>
                    
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                          <input type="text" required placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={formData.repName} onChange={e => setFormData({...formData, repName: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Official Role</label>
                          <input type="text" required placeholder="e.g. Club Treasurer" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={formData.repRole} onChange={e => setFormData({...formData, repRole: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Contact Email</label>
                        <input type="email" required placeholder="treasurer@club.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={formData.repEmail} onChange={e => setFormData({...formData, repEmail: e.target.value})} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CAMPAIGN */}
                {step === 3 && (
                  <div className="animate-fadeIn flex-1">
                    <h3 className="text-2xl font-black text-[#1A2B48] mb-1">Set up your first goal.</h3>
                    <p className="text-sm text-gray-500 font-medium mb-8">What are you raising money for right now?</p>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Campaign Title</label>
                        <input type="text" required placeholder="e.g. New Jerseys for the U12s" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" value={formData.campaignTitle} onChange={e => setFormData({...formData, campaignTitle: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Target Amount ($)</label>
                          <input type="number" required placeholder="2500" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71] font-mono" value={formData.goalAmount} onChange={e => setFormData({...formData, goalAmount: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Tangible Metric</label>
                          <input type="text" required placeholder="e.g. $50 = 1 New Jersey" className="w-full bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71] text-emerald-800" value={formData.tangibleMetric} onChange={e => setFormData({...formData, tangibleMetric: e.target.value})} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: PAYOUTS & VERIFICATION */}
                {step === 4 && (
                  <div className="animate-fadeIn flex-1">
                    <h3 className="text-2xl font-black text-[#1A2B48] mb-1">Where do we send the funds?</h3>
                    <p className="text-sm text-gray-500 font-medium mb-8">Enter your organization&apos;s official bank details. We cannot pay into personal accounts.</p>
                    
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">BSB</label>
                          <input type="text" required placeholder="000-000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71] font-mono" value={formData.bsb} onChange={e => setFormData({...formData, bsb: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Account Number</label>
                          <input type="text" required placeholder="123456789" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2ECC71] font-mono" value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 mt-6">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center mt-0.5">
                            <input type="checkbox" required className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#2ECC71] checked:border-[#2ECC71] transition cursor-pointer" checked={formData.agreedToTerms} onChange={e => setFormData({...formData, agreedToTerms: e.target.checked})} />
                            <svg className="absolute w-3 h-3 text-[#1A2B48] opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-sm font-medium text-gray-600 leading-tight">
                            I confirm that I am authorized to register this organization, the provided ABN is correct, and I agree to the <a href="/terms" target="_blank" className="text-[#2ECC71] font-bold hover:underline">Givebly Partner Terms & Conditions</a>.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* NAVIGATION BUTTONS */}
                <div className="mt-auto pt-8 flex gap-3">
                  {step > 1 && (
                    <button type="button" onClick={handleBack} className="px-6 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition">
                      Back
                    </button>
                  )}
                  
                  {step < 4 ? (
                    <button type="button" onClick={handleNext} className="ml-auto px-8 py-3 rounded-xl font-bold text-[#1A2B48] bg-[#2ECC71] hover:bg-[#27AE60] transition shadow-md flex items-center gap-2">
                      Continue <span className="text-lg leading-none">&rarr;</span>
                    </button>
                  ) : (
                    <button type="submit" disabled={!formData.agreedToTerms || isSubmitting} className="ml-auto px-8 py-3 rounded-xl font-black text-white bg-[#1A2B48] hover:bg-gray-800 transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// --- HELPER COMPONENT FOR THE SIDEBAR ---
function StepIndicator({ currentStep, stepNum, title }: { currentStep: number, stepNum: number, title: string }) {
  const isActive = currentStep === stepNum;
  const isPast = currentStep > stepNum;

  return (
    <div className={`flex items-center gap-4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${isActive ? 'bg-[#2ECC71] text-[#1A2B48]' : isPast ? 'bg-[#2ECC71]/20 text-[#2ECC71]' : 'bg-gray-700 text-gray-400'}`}>
        {isPast ? '✓' : stepNum}
      </div>
      <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>{title}</span>
    </div>
  );
}