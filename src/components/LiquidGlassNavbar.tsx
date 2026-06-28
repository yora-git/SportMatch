/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Home, LayoutDashboard, Zap, Trophy, Award, LineChart, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface LiquidGlassNavbarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
  currentUser: User | null;
  isLoggedIn: boolean;
}

export default function LiquidGlassNavbar({
  currentRoute,
  setRoute,
  currentUser,
  isLoggedIn
}: LiquidGlassNavbarProps) {
  // Hide the floating dock when not logged in or on auth screens
  if (!isLoggedIn) return null;
  const hideOnRoutes = ['login', 'register'];
  if (hideOnRoutes.includes(currentRoute)) return null;

  // Streamlined to exactly 5 core items: Dashboard, Match, Tournaments, Progress, Profile
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'match', label: 'Match', icon: Zap },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'progress', label: 'Progress', icon: LineChart },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-3 w-full max-w-[440px] sm:max-w-xl md:max-w-2xl select-none">
      {/* Outer Glow container with dynamic active-route styling */}
      <div className="relative">
        
        {/* Dynamic breathing glowing background aura underneath the dock combining SportMatch Blue & Bronze/Brown accents */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-blue/15 via-slate-300/5 to-[#8B5E3C]/15 rounded-full blur-2xl opacity-80 pointer-events-none" />

        {/* Premium Liquid Glass Dock with precise backdrop-blur and multi-layered glassmorphism borders */}
        <div 
          className="relative flex items-center justify-around px-3 sm:px-6 py-2 rounded-full border-t border-white/45 border-x border-white/15 border-b border-white/5 bg-white/12 backdrop-blur-2xl shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]"
          style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          
          {/* Subtle top edge glossy reflection glare highlight with gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isProfile = item.id === 'profile';
            
            // Highlight the correct tab based on route
            const isActive = currentRoute === item.id || 
                             (item.id === 'profile' && currentRoute === 'settings') ||
                             (item.id === 'dashboard' && currentRoute === 'landing');

            return (
              <button
                key={item.id}
                onClick={() => setRoute(item.id)}
                className="relative flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full transition-all duration-300 focus:outline-none cursor-pointer group/item"
                title={item.label}
              >
                {/* Active 3D Liquid Glass Sphere Bubble */}
                {isActive && (
                  <motion.div
                    layoutId="liquidActiveDockCapsule"
                    className="absolute inset-[-2px] sm:inset-1 rounded-full bg-gradient-to-b from-white/70 via-white/45 to-white/10 shadow-[inset_0_4px_12px_rgba(255,255,255,0.85),inset_0_-4px_8px_rgba(0,0,0,0.06),0_6px_16px_-2px_rgba(15,23,42,0.12)] border border-white/80"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  >
                    {/* Top glare curved highlight to achieve 3D glass sphere depth */}
                    <div className="absolute top-0.5 sm:top-1 left-1.5 right-1.5 h-2 sm:h-3 bg-gradient-to-b from-white/95 to-transparent rounded-full pointer-events-none" />
                    
                    {/* Inner base glow */}
                    <div className="absolute inset-1.5 sm:inset-2 bg-gradient-to-tr from-primary-blue/5 to-white/30 rounded-full opacity-60 pointer-events-none" />
                  </motion.div>
                )}

                {/* Animated content container with high-end spring motion */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative z-10 flex flex-col items-center justify-center"
                >
                  {/* Premium Floating Tooltip above the dock */}
                  <div className="absolute bottom-full mb-3 bg-deep-navy/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover/item:opacity-100 transition-all duration-200 whitespace-nowrap shadow-[0_8px_20px_rgba(15,23,42,0.15)] border border-white/10 scale-95 group-hover/item:scale-100">
                    {item.label}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-deep-navy/95" />
                  </div>

                  <div className="relative flex flex-col items-center transition-all duration-300">
                    {isProfile && isLoggedIn && currentUser ? (
                      <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center bg-slate-100">
                        <img
                          src={currentUser.avatar_url}
                          alt="Profile Avatar"
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            isActive ? 'scale-105 ring-1 ring-primary-blue/30' : 'opacity-95 hover:opacity-100'
                          }`}
                        />
                      </div>
                    ) : (
                      <IconComponent 
                        className={`liquid-nav-item-icon w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ease-out ${
                          isActive 
                            ? 'text-primary-blue drop-shadow-[0_2px_10px_rgba(11,95,255,0.55)] opacity-100' 
                            : 'text-slate-600 hover:text-deep-navy hover:opacity-80 opacity-90'
                        }`}
                        size={24}
                        strokeWidth={2.5}
                      />
                    )}
                    
                    {/* Active State neon glow micro bar beneath the active icon, inside the glass sphere */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlowDot"
                        className="w-2.5 sm:w-3.5 h-[3px] rounded-full bg-primary-blue shadow-[0_1px_4px_rgba(11,95,255,0.7)] mt-1"
                        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                      />
                    )}
                  </div>
                </motion.div>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}
