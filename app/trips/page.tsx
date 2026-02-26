'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ShoppingTrips() {
  const router = useRouter();
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMyTrips() {
      // 1. Verify who is looking at the page
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // 2. Fetch ONLY this user's trips, newest first
      const { data, error } = await supabase
        .from('shopping_trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setTrips(data);
      }
      setIsLoading(false);
    }

    fetchMyTrips();
  }, [router]);

  // A quick helper function to make the database timestamps look pretty
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-AU', options);
  };

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-bold text-[#1A2B48]">Loading your history...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* HEADER */}
      <nav className="bg-[#1A2B48] text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
              &larr;
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Givebly</h1>
          </div>
          <span className="text-sm font-semibold text-[#2ECC71]">Shopping Ledger</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#1A2B48] mb-2">Your Shopping Trips</h2>
          <p className="text-gray-500 font-medium">Every click is tracked. Cash back will confirm once the retailer processes your purchase (usually 24-72 hours).</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {trips.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="p-5 font-bold">Date & Time</th>
                    <th className="p-5 font-bold">Retailer</th>
                    <th className="p-5 font-bold">Expected Cash Back</th>
                    <th className="p-5 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="p-5 text-sm text-gray-600 font-medium">
                        {formatDate(trip.created_at)}
                      </td>
                      <td className="p-5">
                        <span className="font-bold text-[#1A2B48] text-sm">{trip.store_name}</span>
                      </td>
                      <td className="p-5">
                        <span className="text-xs text-gray-400 italic">Pending store confirmation</span>
                      </td>
                      <td className="p-5 text-right">
                        {trip.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 shadow-sm">
                            <span className="h-1.5 w-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                            Tracked
                          </span>
                        )}
                        {trip.status === 'Approved' && (
                          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 shadow-sm">
                            ✓ Confirmed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="text-6xl mb-4 opacity-50">🛒</div>
              <h3 className="text-xl font-bold text-[#1A2B48] mb-2">No trips yet!</h3>
              <p className="text-gray-500 text-sm mb-6">When you click a store from the dashboard, it will show up here immediately.</p>
              <Link href="/dashboard" className="bg-[#2ECC71] text-[#1A2B48] font-bold py-2.5 px-6 rounded-xl hover:bg-[#27AE60] transition shadow-md">
                Start Shopping
              </Link>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}