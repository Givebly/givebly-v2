import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* MASTER ADMIN NAVIGATION MENU */}
      <nav className="bg-[#1A2B48] text-white shadow-md sticky top-0 z-50 border-b border-[#2ECC71]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex items-center gap-8">
              <span className="text-xl font-black text-[#2ECC71] tracking-tight">Givebly Admin</span>
              
              {/* THE LINKS */}
              <div className="hidden md:flex space-x-2">
                <Link href="/admin" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2">
                  <span>🏪</span> Stores
                </Link>
                <Link href="/admin/courses" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2">
                  <span>🎓</span> Courses
                </Link>
                <Link href="/admin/redemptions" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2">
                  <span>🎁</span> Vault & Redemptions
                </Link>
              </div>
            </div>

            <div>
              <Link href="/dashboard" className="text-xs font-bold text-gray-400 hover:text-white transition flex items-center gap-2 border border-gray-600 rounded-lg px-3 py-1.5 hover:border-gray-400">
                Exit to User App &rarr;
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* THIS IS WHERE YOUR INDIVIDUAL ADMIN PAGES WILL RENDER */}
      <main className="flex-1">
        {children}
      </main>
      
    </div>
  );
}