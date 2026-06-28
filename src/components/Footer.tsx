/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Twitter, Instagram, Send } from 'lucide-react';

interface FooterProps {
  setRoute: (route: string) => void;
}

export default function Footer({ setRoute }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-36 px-4 sm:px-6 lg:px-8 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div 
            onClick={() => setRoute('landing')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-blue flex items-center justify-center font-black text-lg italic text-white group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">SPORTMATCH</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The premium athletic sparring network designed for serious contenders. Match, compete, and level up your game with proper local rivals.
          </p>
          <div className="flex space-x-3.5 pt-2">
            <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Explore Hubs Column */}
        <div>
          <h5 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4 font-sans text-amber-500">Network Hubs</h5>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <button onClick={() => setRoute('match')} className="hover:text-white transition-colors cursor-pointer text-left">
                Matchmaking Deck
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('communities')} className="hover:text-white transition-colors cursor-pointer text-left">
                Regional Spaces
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('tournaments')} className="hover:text-white transition-colors cursor-pointer text-left">
                Championship Tournaments
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('rankings')} className="hover:text-white transition-colors cursor-pointer text-left">
                Leaderboards & Tiers
              </button>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h5 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4 font-sans text-amber-500">Rival Mechanics</h5>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <button onClick={() => setRoute('landing')} className="hover:text-white transition-colors cursor-pointer text-left">
                Reputation Guidelines
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('progress')} className="hover:text-white transition-colors cursor-pointer text-left">
                Performance Analytics
              </button>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Anti-Cheat & Fairness
              </a>
            </li>
            <li>
              <button onClick={() => setRoute('settings')} className="hover:text-white transition-colors cursor-pointer text-left">
                Privacy Policies
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h5 className="text-white font-extrabold text-xs uppercase tracking-wider font-sans text-amber-500">Get Match Alerts</h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to receive local tournament reminders and ranking milestones directly in your inbox.
          </p>
          <div className="flex space-x-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <input
              type="email"
              placeholder="Enter athletic email..."
              className="bg-transparent text-xs text-white focus:outline-none px-2.5 py-2 flex-1 placeholder:text-slate-500"
            />
            <button className="bg-primary-blue hover:bg-opacity-95 text-white p-2 rounded-lg cursor-pointer transition-all flex items-center justify-center">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-semibold">
        <div>
          © 2026 SportMatch Inc. All rights reserved. Built for athletic excellence.
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
        </div>
      </div>
    </footer>
  );
}
