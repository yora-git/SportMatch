/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Menu, X, Bell, User as UserIcon, Shield, LogOut, ChevronDown, Trophy, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { User } from '../types';
import { Button } from './UIComponents';

interface NavbarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
  onLogout: () => void;
}

export default function Navbar({
  currentRoute,
  setRoute,
  isLoggedIn,
  currentUser,
  onLogout
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const mainNavs: { label: string; route: string; isAnchor?: boolean }[] = [
    { label: 'Home', route: 'landing', isAnchor: false },
    { label: 'Dashboard', route: 'dashboard', isAnchor: false },
    { label: 'Match', route: 'match', isAnchor: false },
    { label: 'Tournaments', route: 'tournaments', isAnchor: false },
    { label: 'Leaderboard', route: 'rankings', isAnchor: false },
    { label: 'Progress', route: 'progress', isAnchor: false },
    { label: 'Profile', route: 'profile', isAnchor: false },
  ];

  const handleNavClick = (route: string, isAnchor?: boolean) => {
    setMobileOpen(false);
    if (isAnchor) {
      setRoute('landing');
      setTimeout(() => {
        const featSection = document.getElementById('features-section');
        if (featSection) {
          featSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setRoute(route);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-md border-b border-slate-200/60 py-3.5 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO AREA */}
        <div 
          onClick={() => setRoute('landing')} 
          className="flex items-center space-x-2 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-primary-blue flex items-center justify-center font-black text-lg italic text-brand-white shadow-lg shadow-primary-blue/30 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-deep-navy leading-none">SPORTMATCH</span>
            <span className="text-[8px] font-black font-mono tracking-widest text-[#8B5E3C] mt-0.5">SPORTS NETWORK</span>
          </div>
        </div>

        {/* NAVIGATION LINKS IN CENTER */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-slate-100/75 border border-slate-200/50 rounded-full px-1.5 py-1">
          {isLoggedIn ? (
            mainNavs.map((nav) => {
              const isActive = currentRoute === nav.route && !nav.isAnchor;
              return (
                <button
                  key={nav.label}
                  onClick={() => handleNavClick(nav.route, nav.isAnchor)}
                  className={`px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary-blue text-white shadow-md shadow-primary-blue/15'
                      : 'text-slate-600 hover:text-deep-navy hover:bg-slate-200/50'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })
          ) : (
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer bg-primary-blue text-white shadow-md shadow-primary-blue/15`}
            >
              SportMatch Home
            </button>
          )}
        </div>

        {/* RIGHT ACTIONS / PROFILE PANEL */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => setRoute('login')} 
                className="text-sm font-semibold text-slate-600 hover:text-deep-navy transition-colors cursor-pointer px-3"
              >
                Features
              </button>
              <button 
                onClick={() => setRoute('login')} 
                className="text-sm font-semibold text-slate-600 hover:text-deep-navy transition-colors cursor-pointer px-3"
              >
                Login
              </button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setRoute('register')}
                className="shadow-md shadow-primary-blue/20"
              >
                Start Matching
              </Button>
            </>
          ) : (
            currentUser && (
              <div className="flex items-center space-x-3">
                {/* Reputation stats highlight */}
                <div className="flex items-center space-x-1 bg-emerald-500/8 px-2.5 py-1 rounded-full border border-emerald-500/15 text-xs text-emerald-600 font-mono">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold">{currentUser.reputation_score}% Rep</span>
                </div>

                {/* Notifications badge */}
                <button className="relative p-2 rounded-full bg-slate-50 border border-slate-200/80 hover:bg-slate-100 text-slate-600 hover:text-deep-navy transition-colors cursor-pointer">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-blue rounded-full"></span>
                </button>

                {/* User mini menu */}
                <div className="relative">
                  <div
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/80 cursor-pointer select-none transition-all"
                  >
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      className="w-6.5 h-6.5 rounded-full object-cover border border-slate-200"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-52 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xl z-50">
                      <div className="px-3.5 py-2.5 border-b border-slate-100 mb-1.5">
                        <div className="font-bold text-xs text-deep-navy truncate">{currentUser.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">@{currentUser.username}</div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setRoute('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-deep-navy hover:bg-slate-50 transition-colors flex items-center"
                      >
                        <UserIcon className="w-3.5 h-3.5 mr-2.5 text-primary-blue" />
                        My Profile
                      </button>

                      <button
                        onClick={() => {
                          setRoute('settings');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-deep-navy hover:bg-slate-50 transition-colors flex items-center"
                      >
                        <Shield className="w-3.5 h-3.5 mr-2.5 text-bronze-accent" />
                        Settings
                      </button>

                      <div className="border-t border-slate-100 my-1.5"></div>

                      <button
                        onClick={() => {
                          onLogout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors flex items-center"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-2.5" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden flex items-center space-x-2.5">
          {isLoggedIn && currentUser && (
            <img
              onClick={() => setRoute('profile')}
              src={currentUser.avatar_url}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-7.5 h-7.5 rounded-full object-cover border border-slate-200 cursor-pointer"
            />
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-deep-navy cursor-pointer hover:bg-slate-100"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 mt-3 pt-3 space-y-1.5 flex flex-col px-1 pb-2">
          {isLoggedIn ? (
            mainNavs.map((nav) => {
              const isActive = currentRoute === nav.route && !nav.isAnchor;
              return (
                <button
                  key={nav.label}
                  onClick={() => handleNavClick(nav.route, nav.isAnchor)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${isActive ? 'bg-primary-blue text-white' : 'text-slate-600 hover:text-deep-navy hover:bg-slate-100'}`}
                >
                  {nav.label}
                </button>
              );
            })
          ) : (
            <button
              onClick={() => handleNavClick('landing')}
              className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary-blue text-white`}
            >
              SportMatch Home
            </button>
          )}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  onLogout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-600"
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={() => {
                  setRoute('login');
                  setMobileOpen(false);
                }}
                className="w-full text-center bg-slate-50 border border-slate-200 text-deep-navy font-bold text-xs py-2.5 rounded-full"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setRoute('register');
                  setMobileOpen(false);
                }}
                className="w-full text-center bg-primary-blue text-white font-bold text-xs py-2.5 rounded-full"
              >
                Start Matching
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
