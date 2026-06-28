/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Flame, MapPin, Sparkles, Trophy, Zap, Shield, MessageSquare, ChevronRight } from 'lucide-react';
import { Badge, RankBadge } from './UIComponents';

export default function FloatingPreviewCards() {
  return (
    <div className="relative w-full h-[580px] lg:h-[660px] flex items-center justify-center select-none overflow-visible">
      
      {/* CARD 1: ATHLETE BRIEF PROFILE (Top Left - overlapping) */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [-1, 0.5, -1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.03, zIndex: 30 }}
        className="absolute top-4 left-4 md:left-6 w-60 sm:w-64 bg-white border border-slate-200/90 p-5 rounded-2xl shadow-xl z-10"
      >
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
            alt="Profile Preview"
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover border-2 border-primary-blue"
          />
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-deep-navy flex items-center">
              Kelvin Rudyanto
              <Sparkles className="w-3.5 h-3.5 text-amber-500 ml-1" />
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">@kelvin_r</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
          Competitive badminton player based in Bandung. Looking for high-intensity matches.
        </p>
        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
          <RankBadge rank="Gold" />
          <span className="text-[10px] text-emerald-600 font-mono bg-emerald-500/8 px-2 py-0.5 rounded-full flex items-center border border-emerald-500/15">
            <Flame className="w-3.5 h-3.5 mr-0.5 text-amber-500" /> 98% Rep
          </span>
        </div>
      </motion.div>

      {/* CARD 2: MATCH COMPATIBILITY CARD (Top Right - overlapping) */}
      <motion.div
        animate={{
          y: [0, 6, 0],
          rotate: [1, -0.5, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        whileHover={{ scale: 1.03, zIndex: 30 }}
        className="absolute top-10 right-4 md:right-8 w-68 sm:w-72 bg-gradient-to-br from-primary-blue to-blue-700 text-white p-5 rounded-2xl shadow-xl z-20"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold text-yellow-300 tracking-wider uppercase bg-white/15 px-2.5 py-1 rounded-full">
            ⚡ 94% COMPATIBILITY
          </span>
          <span className="text-[10px] text-white/60 font-mono">Match Idea</span>
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
            alt="Arya"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-white/20"
          />
          <div>
            <h5 className="font-extrabold text-xs text-white">Arya Wibowo</h5>
            <div className="flex items-center text-[10px] text-white/80 mt-0.5">
              <MapPin className="w-3 h-3 mr-0.5 text-rose-300" /> Bandung (2.4 km away)
            </div>
          </div>
        </div>
        <div className="text-xs text-white bg-white/10 p-2.5 rounded-xl mb-4 border border-white/5">
          <div className="font-bold mb-1 flex items-center">
            🏸 Singles Sparring Session
          </div>
          <div className="text-[10px] text-white/80">Saturday, 7:00 PM | Court B</div>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 bg-white text-primary-blue font-extrabold text-xs py-2 rounded-xl hover:bg-slate-50 transition-all text-center cursor-pointer shadow-sm">
            Accept Challenge
          </button>
          <button className="flex-1 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs py-2 rounded-xl transition-all text-center cursor-pointer">
            Decline
          </button>
        </div>
      </motion.div>

      {/* CARD 3: RANKING BADGE CARD (Center - behind others) */}
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.03, zIndex: 30 }}
        className="absolute top-[220px] left-1/2 -translate-x-1/2 w-72 bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-2xl z-0"
      >
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 flex items-center">
            <Trophy className="w-4 h-4 text-yellow-500 mr-2" /> Top Bandung Rivals
          </h4>
          <span className="text-[10px] font-mono text-slate-500">Tier Rankings</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-yellow-400">01</span>
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="Jessica" className="w-6 h-6 rounded-full object-cover" />
              <span className="text-xs font-bold text-white">Jessica P.</span>
            </div>
            <RankBadge rank="Elite" className="scale-90" />
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-slate-400">02</span>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Kelvin" className="w-6 h-6 rounded-full object-cover" />
              <span className="text-xs font-bold text-white">Kelvin R.</span>
            </div>
            <RankBadge rank="Gold" className="scale-90" />
          </div>
        </div>
      </motion.div>

      {/* CARD 4: WEEKLY PROGRESS CARD (Bottom Left) */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [-1.5, 0.5, -1.5]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
        whileHover={{ scale: 1.03, zIndex: 30 }}
        className="absolute bottom-4 left-4 md:left-8 w-60 sm:w-64 bg-white border border-slate-200 p-5 rounded-2xl shadow-xl z-15"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-xl bg-emerald-500/8 text-emerald-600 border border-emerald-500/15">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-extrabold text-deep-navy">Cardio Stats</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-mono bg-emerald-500/8 px-2 py-0.5 rounded-full border border-emerald-500/15">
            +18% Effort
          </span>
        </div>
        <div className="text-xl font-black text-deep-navy">
          320 <span className="text-xs text-slate-400 font-normal">mins active</span>
        </div>
        
        {/* Custom Mini Static Sparkline SVG */}
        <div className="h-16 mt-3 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="0,100 20,80 40,90 60,40 80,60 100,20 100,100" fill="url(#glow)" />
            <polyline fill="none" stroke="#10b981" strokeWidth="3.5" points="0,80 20,80 40,90 60,40 80,60 100,20" />
            <circle cx="100" cy="20" r="4" fill="#10b981" />
          </svg>
        </div>
      </motion.div>

      {/* CARD 5: COMMUNITY CHAT PREVIEW (Bottom Right) */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [1, -0.5, 1]
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
        whileHover={{ scale: 1.03, zIndex: 30 }}
        className="absolute bottom-2 right-4 md:right-8 w-68 sm:w-72 bg-white border border-slate-200 p-5 rounded-2xl shadow-xl z-25"
      >
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
          <span className="text-xs font-extrabold text-deep-navy flex items-center">
            <MessageSquare className="w-4 h-4 text-[#8B5E3C] mr-2" /> Spaces Channel
          </span>
          <span className="text-[10px] text-primary-blue font-bold font-mono uppercase bg-primary-blue/8 px-2 py-0.5 rounded-full">
            #badminton-group
          </span>
        </div>
        
        {/* Mock Discord-like Messages */}
        <div className="space-y-3 mb-2">
          <div className="flex items-start space-x-2">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60" alt="Arya" className="w-6.5 h-6.5 rounded-full object-cover border border-slate-100 mt-0.5" />
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-[10px] font-extrabold text-deep-navy">Arya W.</span>
                <span className="text-[8px] text-slate-400 font-mono">10:42 AM</span>
              </div>
              <p className="text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-r-xl rounded-bl-xl mt-0.5">
                Anyone up for singles sparring tomorrow at 7 PM? Booked Court B!
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60" alt="Kelvin" className="w-6.5 h-6.5 rounded-full object-cover border border-slate-100 mt-0.5" />
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-[10px] font-extrabold text-deep-navy">Kelvin R.</span>
                <span className="text-[8px] text-slate-400 font-mono">10:44 AM</span>
              </div>
              <p className="text-[11px] text-slate-600 bg-primary-blue/5 px-2.5 py-1.5 rounded-r-xl rounded-bl-xl mt-0.5">
                I'm down! Count me in. Let's make it competitive. 🏸
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
