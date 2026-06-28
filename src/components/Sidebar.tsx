/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutDashboard, Users, Trophy, Zap, Newspaper, BarChart3, Settings, Heart } from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
}

export default function Sidebar({ currentRoute, setRoute }: SidebarProps) {
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, route: 'dashboard' },
    { label: 'Matchmaking', icon: Zap, route: 'match' },
    { label: 'Social Feed', icon: Newspaper, route: 'feed' },
    { label: 'Sports Spaces', icon: Users, route: 'communities' },
    { label: 'Tournaments', icon: Trophy, route: 'tournaments' },
    { label: 'Leaderboard', icon: BarChart3, route: 'rankings' },
    { label: 'My Progress', icon: Heart, route: 'progress' },
    { label: 'Settings', icon: Settings, route: 'settings' }
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-white/40 border-r border-slate-200/80 min-h-[calc(100vh-80px)] p-6 space-y-6">
      <div className="space-y-2.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3.5 block">
          Athletic Command
        </span>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => setRoute(item.route)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary-blue text-white shadow-md shadow-primary-blue/15'
                    : 'text-slate-500 hover:text-deep-navy hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary-blue'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Premium Venture Showcase card at the bottom */}
      <div className="bg-slate-50 border border-slate-200/80 p-4.5 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full filter blur-xl pointer-events-none"></div>
        <div className="flex items-center space-x-2 text-amber-600 mb-2">
          <Trophy className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono">SportMatch Pro</span>
        </div>
        <h5 className="font-extrabold text-xs text-deep-navy leading-snug">
          Venture Challenge Cup
        </h5>
        <p className="text-[10px] text-slate-400 leading-relaxed mt-1.5">
          Submit official match results to gain certified Bronze-to-Gold rank credentials.
        </p>
        <button
          onClick={() => setRoute('tournaments')}
          className="mt-3.5 w-full bg-deep-navy text-white text-[10px] font-extrabold py-2 rounded-xl cursor-pointer hover:bg-opacity-95 transition-all text-center uppercase tracking-wider"
        >
          Explore Cups
        </button>
      </div>
    </aside>
  );
}
