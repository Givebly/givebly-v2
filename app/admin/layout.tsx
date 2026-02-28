'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminName, setAdminName] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    async function checkAdminStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }
      
      const isAuthorized = true; // CHANGE TO: user.email === 'trent@givebly.com'
      if (!isAuthorized) { window.location.href = '/dashboard'; return; }

      setIsAdmin(true);
      setAdminName(user.user_metadata?.full_name?.split(' ')[0] || 'Admin');
      setIsLoading(false);
    }
    checkAdminStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-sans">
        <div className="h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500">Authenticating...</h2>
      </div>
    );
  }

  const NavItem = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all text-[11px] ${isActive ? 'bg-gray-100 text-gray-900 font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F9FAFB]">
      
      {/* FINTECH SIDEBAR */}
      <aside className="w-56 shrink-0 flex flex-col h-screen relative z-20 bg-white border-r border-gray-200">
        <div className="h-12 flex items-center px-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded flex items-center justify-center font-bold text-xs bg-gray-900 text-white shadow-sm">G</div>
            <span className="text-sm font-semibold tracking-tight text-gray-900">Givebly Admin</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 no-scrollbar">
          <p className="px-2 mb-2 font-medium uppercase tracking-wider text-[9px] text-gray-500 mt-2">Core Systems</p>
          
          <NavItem href="/admin" label="Dashboard" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
          <NavItem href="/admin/users" label="Customers & CRM" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} />
          <NavItem href="/admin/financials" label="Financials & Payouts" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />

          <p className="px-2 mt-6 mb-2 font-medium uppercase tracking-wider text-[9px] text-gray-500">Platform Control</p>
          <NavItem href="/admin/gamification" label="Gamification Engine" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <NavItem href="/admin/stores" label="Store Catalog" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>} />
          <NavItem href="/admin/marketing" label="Marketing Banners" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>} />

          <p className="px-2 mt-6 mb-2 font-medium uppercase tracking-wider text-[9px] text-gray-500">Legacy Modules</p>
          <NavItem href="/admin/courses" label="Academy Courses" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>} />
          <NavItem href="/admin/redemptions" label="Vault Redemptions" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} />
        </div>

        <div className="p-3 border-t border-gray-200 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-gray-200 text-gray-700">{adminName.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold truncate text-gray-900">{adminName}</p>
              <p className="text-[9px] truncate text-emerald-600 font-medium flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN DATA CANVAS */}
      <main className="flex-1 h-screen overflow-y-auto relative no-scrollbar flex flex-col">
        
        {/* COMPACT HEADER */}
        <header className="h-12 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-semibold text-gray-900 capitalize">
              {pathname === '/admin' ? 'Platform Operations' : pathname.replace('/admin/', '').replace('-', ' ')}
            </h2>
            <span className="text-[9px] px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold">Live Production</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 cursor-pointer hover:bg-red-100 transition">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span> 4 Alerts
            </div>
            <Link href="/dashboard" className="text-[10px] font-medium border border-gray-200 px-2 py-1 rounded transition hover:bg-gray-50 text-gray-600">Exit Console</Link>
          </div>
        </header>

        {/* INJECTED PAGE CONTENT */}
        <div className="p-6 flex-1 max-w-7xl mx-auto w-full">
          {children}
        </div>
        
      </main>
    </div>
  );
}