'use client';

import React, { useEffect, useState, useRef } from 'react'; // NEW: Imported useRef
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function ActivationScreen() {
  const params = useParams();
  const [store, setStore] = useState<any>(null);
  const [error, setError] = useState('');
  
  // NEW: The Developer Lock
  const hasLoggedTrip = useRef(false);

  useEffect(() => {
    async function activateCashback() {
      const storeId = params.id;
      if (!storeId) return;

      // 1. Get the securely logged-in user
      const { data: { user } } = await supabase.auth.getUser();

      // 2. Fetch the store they clicked
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .single();
      
      if (storeError || !storeData) {
        setError("We couldn't find this store. It may have been removed.");
        return;
      }

      setStore(storeData);

      // 3. THE LEDGER: Check the lock before inserting!
      if (user && storeData && !hasLoggedTrip.current) {
        hasLoggedTrip.current = true; // Lock the door behind us
        
        const { error: tripError } = await supabase
          .from('shopping_trips')
          .insert([
            { 
              user_id: user.id, 
              store_name: storeData.name,
              status: 'Pending'
            }
          ]);
          
        if (tripError) {
          console.error("Failed to log shopping trip:", tripError);
        }
      }

      // 4. The Redirect
      if (storeData.store_url) {
        setTimeout(() => {
          window.location.href = storeData.store_url;
        }, 2500); 
      } else {
        setError('This store is currently undergoing maintenance. No destination URL found.');
      }
    }

    activateCashback();
  }, [params.id]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-red-100">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-[#1A2B48] mb-2">Oops! Something went wrong.</h2>
          <p className="text-gray-500 text-sm">{error}</p>
          <button onClick={() => window.history.back()} className="mt-6 bg-[#1A2B48] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-gray-800 transition">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A2B48] to-indigo-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2ECC71]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center max-w-sm w-full">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
          <div className="h-28 w-28 bg-white rounded-full p-2 shadow-2xl relative z-10 flex items-center justify-center border-4 border-[#2ECC71]/30 overflow-hidden">
            {store?.logo_url ? (
              <img src={store.logo_url} alt={store?.name} className="h-full w-full object-contain" />
            ) : (
              <span className="text-4xl font-black text-gray-300">?</span>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-black text-white mb-2 text-center">Activating {store?.name}...</h1>
        <p className="text-[#2ECC71] font-bold text-lg mb-8 tracking-wide">
          Securing your {store?.reward_bonus || store?.reward_text} Cash Back
        </p>

        <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden shadow-inner">
          <div className="bg-[#2ECC71] h-2 rounded-full animate-[loading_2.5s_ease-in-out_forwards]"></div>
        </div>
        <p className="text-blue-200 text-xs font-medium uppercase tracking-widest animate-pulse">Routing to secure partner site</p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}