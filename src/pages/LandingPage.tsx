/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Sparkles, Flame, Trophy, Zap, Users, BarChart3, 
  ChevronRight, Activity, MapPin, Calendar, MessageSquare, 
  ArrowRight, Check, Star, Play, Award, Volume2, Plus, 
  ThumbsUp, Compass, Target, CheckCircle2, Heart, RefreshCw
} from 'lucide-react';
import { Button, SectionHeading, Card, RankBadge } from '../components/UIComponents';
import FloatingPreviewCards from '../components/FloatingPreviewCards';

interface LandingPageProps {
  setRoute: (route: string) => void;
  isLoggedIn: boolean;
}

export default function LandingPage({ setRoute, isLoggedIn }: LandingPageProps) {
  // Interactive Matchmaking stack state
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const matchmakingPool = [
    {
      id: 'match_1',
      name: 'Jessica Pratama',
      sport: '🏸 Badminton',
      level: 'Elite (Gold III)',
      distance: '1.8 km',
      availability: 'Weekends & Evenings',
      compatibility: 98,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      tagline: 'Always looking for intense singles match play. Let\'s smash!'
    },
    {
      id: 'match_2',
      name: 'Ryan Hidayat',
      sport: '🏀 Basketball',
      level: 'Semi-Pro (Platinum I)',
      distance: '3.2 km',
      availability: 'Wed & Fri Mornings',
      compatibility: 92,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      tagline: 'Looking for 3v3 players or high intensity half-court sparring.'
    },
    {
      id: 'match_3',
      name: 'Amara Wijaya',
      sport: '🎾 Tennis',
      level: 'Intermediate (Silver II)',
      distance: '2.5 km',
      availability: 'Flexible Sessions',
      compatibility: 87,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      tagline: 'Let\'s practice baseline rallies and play friendly tiebreaker sets.'
    }
  ];

  // Community showcase state
  const [selectedCommunityIndex, setSelectedCommunityIndex] = useState(0);
  const communityChannels = [
    {
      name: 'Bandung Badminton Arena',
      id: 'comm_bba',
      category: 'Badminton',
      members: 1420,
      image: 'https://images.unsplash.com/photo-1521537634199-67368944024a?auto=format&fit=crop&q=80&w=400',
      activeUsers: 84,
      channels: ['#announcements', '#court-booking', '#singles-lobby', '#casual-chatter'],
      messages: [
        { sender: 'Coach Hermawan', text: '🏆 Mini Tourney scheduled for this Sunday is now live! Register at #announcements', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
        { sender: 'Gerry Santoso', text: 'Who wants to join a 2v2 doubles session at Gor Cempaka tomorrow 6pm? Need 1 player.', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=100' }
      ]
    },
    {
      name: 'Jakarta Basketball Runs',
      id: 'comm_jbr',
      category: 'Basketball',
      members: 2150,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400',
      activeUsers: 112,
      channels: ['#runs-schedule', '#highlights', '#find-a-team', '#court-reviews'],
      messages: [
        { sender: 'Niko Prasetya', text: '🏀 High-intensity 5v5 run starting at Kuningan Court in 1 hour. Tap in if you are nearby!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
        { sender: 'Sarah Malik', text: 'The court at Epicentrum got newly resurfaced. Hooks are clean!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' }
      ]
    }
  ];

  const handleNextMatch = () => {
    setActiveMatchIndex((prev) => (prev + 1) % matchmakingPool.length);
  };

  const currentMatch = matchmakingPool[activeMatchIndex];
  const activeCommunity = communityChannels[selectedCommunityIndex];

  return (
    <div className="relative overflow-hidden bg-[#F8F9FA]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-blue/8 px-4 py-1.5 rounded-full border border-primary-blue/15 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-bold text-primary-blue tracking-wide uppercase font-sans">
                Next-Gen Competitive Sports Network
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-deep-navy">
              Find Your Rival.<br />
              <span className="blue-gradient-text">Improve Your Game.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">
              SportMatch helps athletes find sparring partners, join sports communities, compete in tournaments, build reputation, and track progress — all in one premium sports network.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setRoute(isLoggedIn ? 'match' : 'register')}
                className="group shadow-lg shadow-primary-blue/20 px-8 py-4 text-sm"
              >
                Start Matching
                <ChevronRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setRoute('communities')}
                className="px-8 py-4 text-sm border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Explore Communities
              </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-deep-navy">12K+</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Verified Athletes</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-[#8B5E3C]">350+</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Active Spaces</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-primary-blue">1.8K+</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Tournaments</p>
              </div>
            </div>
          </div>

          {/* Hero Right Layered Preview */}
          <div className="relative">
            <FloatingPreviewCards />
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / STATS SECTION */}
      <section className="py-12 bg-white border-y border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-slate-100 text-center">
            <div className="px-4">
              <span className="text-4xl lg:text-5xl font-extrabold text-deep-navy tracking-tight">12K+</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Active Athletes</p>
            </div>
            <div className="px-4">
              <span className="text-4xl lg:text-5xl font-extrabold text-primary-blue tracking-tight">350+</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Local Communities</p>
            </div>
            <div className="px-4">
              <span className="text-4xl lg:text-5xl font-extrabold text-[#8B5E3C] tracking-tight">1.8K+</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Tournaments Played</p>
            </div>
            <div className="px-4">
              <span className="text-4xl lg:text-5xl font-extrabold text-emerald-600 tracking-tight">92%</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Match Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE BENTO GRID */}
      <section id="features-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          align="center"
          tag="Engine Features"
          title="Designed for True Contenders"
          subtitle="A powerful bento experience uniting athletic connectivity, social feeds, match logistics, and physical improvement."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          
          {/* Card 1: Find Sparring Partners (Large 2-column on md) */}
          <div className="md:col-span-2 bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-primary-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden bento-card-glow">
            <div className="absolute right-0 bottom-0 w-64 h-48 bg-primary-blue/5 rounded-tl-full pointer-events-none transition-all group-hover:scale-105" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary-blue/8 text-primary-blue flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-deep-navy mb-3">Find Sparring Partners</h3>
              <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                Connect instantly with players nearby. Filter by verified skill, availability, and competitive rating. Coordinate court sessions in seconds.
              </p>
            </div>
            
            {/* Mini UI Preview */}
            <div className="mt-8 bg-white border border-slate-200 shadow-lg rounded-2xl p-4 max-w-sm flex items-center space-x-3.5 transform group-hover:translate-y-[-4px] transition-transform">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80" alt="avatar" className="w-10 h-10 rounded-full object-cover border border-slate-100" />
              <div className="flex-1">
                <div className="font-extrabold text-xs text-deep-navy">Amara Wijaya</div>
                <div className="text-[10px] text-slate-400">Tennis | Intermediate II</div>
              </div>
              <span className="text-[10px] bg-emerald-500/8 text-emerald-600 border border-emerald-500/15 px-2 py-0.5 rounded-full font-bold">95% Match</span>
            </div>
          </div>

          {/* Card 2: Join Sports Communities */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-primary-blue/30 transition-all duration-300 flex flex-col justify-between group bento-card-glow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/8 text-[#8B5E3C] flex items-center justify-center mb-6 border border-amber-500/15">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-deep-navy mb-3">Join Sports Communities</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter Discord-style Spaces dedicated to local sports. Join specific group schedules, coordinate court bookings, and engage in casual banter.
              </p>
            </div>
            
            {/* Mini Community Pill list */}
            <div className="mt-6 space-y-2">
              <div className="bg-white border border-slate-150 p-2 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700">
                <span>🏸 Bandung Badminton Arena</span>
                <span className="text-[10px] text-primary-blue font-semibold">1.4K joined</span>
              </div>
              <div className="bg-white border border-slate-150 p-2 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700">
                <span>🏀 Jakarta Basketball Runs</span>
                <span className="text-[10px] text-primary-blue font-semibold">2.1K joined</span>
              </div>
            </div>
          </div>

          {/* Card 3: Compete in Tournaments */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-primary-blue/30 transition-all duration-300 flex flex-col justify-between group bento-card-glow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/8 text-[#8B5E3C] flex items-center justify-center mb-6 border border-amber-500/15">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-deep-navy mb-3">Compete in Tournaments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Register for single-elimination and round-robin tournament events. Win gear prizes, cash pools, and elite leaderboard ratings.
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center text-xs bg-white border border-slate-150 p-3.5 rounded-2xl">
              <div>
                <div className="font-extrabold text-deep-navy">Smash Championship</div>
                <div className="text-[10px] text-slate-400 mt-0.5">July 10 | Gor Cempaka</div>
              </div>
              <span className="px-2.5 py-1 text-[10px] bg-amber-500/10 text-amber-700 font-extrabold rounded-lg">Rp 5.0M Pool</span>
            </div>
          </div>

          {/* Card 4: Build Athlete Reputation (Large 2-column) */}
          <div className="md:col-span-2 bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-primary-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden bento-card-glow">
            <div className="absolute left-0 top-0 w-48 h-48 bg-[#8B5E3C]/3 rounded-br-full pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/8 text-emerald-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-deep-navy mb-3">Build Athlete Reputation</h3>
              <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
                Climb rank tiers from Rookie to Legend. Earn positive sportsmanship scores from sparring partners. Showcase certified achievements and statistics on your athlete profile.
              </p>
            </div>
            
            {/* Mini Badges Display */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <RankBadge rank="Platinum" />
              <span className="bg-emerald-500/8 text-emerald-600 border border-emerald-500/20 rounded-lg px-3 py-1 text-xs font-bold flex items-center">
                <Flame className="w-3.5 h-3.5 text-amber-500 mr-1" /> 99% Sportsmanship
              </span>
              <span className="bg-amber-500/8 text-amber-700 border border-amber-500/20 rounded-lg px-3 py-1 text-xs font-bold flex items-center">
                🏆 Tournament Champion
              </span>
            </div>
          </div>

          {/* Card 5: Track Progress */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-primary-blue/30 transition-all duration-300 flex flex-col justify-between group bento-card-glow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary-blue/8 text-primary-blue flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-deep-navy mb-3">Track Progress</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strava-style tracking dashboards. Log active sets, performance ratings, cardio load, and map workouts for comprehensive athletic evaluation.
              </p>
            </div>
            
            {/* Mini chart visual */}
            <div className="mt-6 bg-white border border-slate-150 p-3 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase mb-2">
                <span>Cardio Duration</span>
                <span className="text-emerald-600">+12%</span>
              </div>
              <div className="flex items-end justify-between h-10 px-1 gap-1.5">
                {[20, 35, 25, 45, 60, 40, 55].map((val, i) => (
                  <div key={i} className="bg-primary-blue rounded-t-md w-full" style={{ height: `${val}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 6: Share Sports Moments (Large on md) */}
          <div className="md:col-span-2 bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-primary-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden bento-card-glow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/8 text-indigo-600 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-deep-navy mb-3">Share Sports Moments</h3>
              <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
                Connect on the dynamic timeline. Post play-by-play updates, upload court images, document matches, and follow elite regional athletes in your feed.
              </p>
            </div>
            
            {/* Mini feed post mockup */}
            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 max-w-md shadow-sm transform group-hover:translate-x-1 transition-transform">
              <div className="flex items-center space-x-2.5 mb-2">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=60" alt="avatar" className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold text-deep-navy">Jessica Pratama</div>
                  <div className="text-[9px] text-slate-400">Smacked 15 aces in singles today! 🏸</div>
                </div>
              </div>
              <div className="h-20 rounded-xl overflow-hidden bg-slate-100">
                <img src="https://images.unsplash.com/photo-1521537634199-67368944024a?auto=format&fit=crop&q=80&w=400" alt="badminton court" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. MATCHMAKING SECTION */}
      <section className="py-20 bg-white border-y border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#8B5E3C] bg-[#8B5E3C]/8 px-3.5 py-1.5 rounded-full border border-[#8B5E3C]/15">
                SMART MATCH ENGINE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-deep-navy tracking-tight leading-tight">
                Tinder-Style <br />
                Rival Matchmaking
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
                Discover local sparring partners tuned precisely to your game. Adjust filters dynamically for sport types, locations, and schedules. Swipe, request matches, and chat seamlessly.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { text: 'Skill brackets matches are locked to verified ratings to keep matches highly balanced.' },
                  { text: 'Proximity matching targets facilities within 5km for simple court scheduling.' },
                  { text: 'Sportsmanship ratings provide 100% guarantee of clean playing behavior.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button variant="primary" size="lg" onClick={() => setRoute('match')}>
                  Start Swiping Now
                </Button>
              </div>
            </div>

            {/* Right: Interactive Tinder Card Preview */}
            <div className="flex flex-col items-center justify-center relative py-6">
              <div className="relative w-full max-w-sm h-[440px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMatch.id}
                    initial={{ scale: 0.94, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.94, opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-full h-full bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Badge header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black tracking-widest text-primary-blue bg-primary-blue/8 border border-primary-blue/15 px-3 py-1 rounded-full uppercase">
                        ⚡ {currentMatch.compatibility}% COMPATIBLE
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{currentMatch.distance}</span>
                    </div>

                    {/* Main photo & Name block */}
                    <div className="flex-1 flex flex-col items-center text-center justify-center space-y-3 pt-2">
                      <img
                        src={currentMatch.avatar}
                        alt={currentMatch.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-md"
                      />
                      <div>
                        <h3 className="text-lg font-black text-deep-navy">{currentMatch.name}</h3>
                        <p className="text-xs text-[#8B5E3C] font-extrabold mt-0.5">{currentMatch.sport}</p>
                      </div>
                      
                      <div className="flex justify-center space-x-1.5">
                        <RankBadge rank={currentMatch.level.split(' ')[0]} />
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold border border-slate-200 bg-slate-50 text-slate-500">
                          {currentMatch.level.includes('(') ? currentMatch.level.split('(')[1].replace(')', '') : 'Level'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-500 italic max-w-xs leading-relaxed px-2">
                        "{currentMatch.tagline}"
                      </p>
                    </div>

                    {/* Extra details row */}
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex justify-between text-center mt-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">Availability</span>
                        <span className="text-[11px] font-extrabold text-deep-navy">{currentMatch.availability}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">Active Zone</span>
                        <span className="text-[11px] font-extrabold text-deep-navy">Bandung, ID</span>
                      </div>
                    </div>

                    {/* Action buttons footer */}
                    <div className="flex space-x-3.5 mt-4">
                      <button 
                        onClick={handleNextMatch}
                        className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                      >
                        Pass
                      </button>
                      <button 
                        onClick={() => {
                          alert(`Match request sent to ${currentMatch.name}!`);
                          handleNextMatch();
                        }}
                        className="flex-1 py-2.5 bg-primary-blue hover:bg-opacity-95 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary-blue/15 transition-all cursor-pointer text-center"
                      >
                        Invite Spar
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stack cycle stats */}
              <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-slate-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Interact with card. {activeMatchIndex + 1} of {matchmakingPool.length} active prospects.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. COMMUNITY SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          align="center"
          tag="COMMUNITIES & spaces"
          title="Discord-Style Court Hubs"
          subtitle="Coordinate with dozens of active local players. Organize runs, discuss tactics, and book facilities securely."
        />

        {/* Custom Mock Discord layout */}
        <div className="mt-12 bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-4 max-w-5xl mx-auto h-[480px]">
          
          {/* Mock Sidebar lists */}
          <div className="bg-slate-900 text-slate-300 p-4 flex flex-col justify-between border-r border-slate-800">
            <div>
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-800 mb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[11px] font-black font-mono uppercase tracking-wider text-slate-400">SportMatch Channels</span>
              </div>

              <div className="space-y-1.5">
                {communityChannels.map((comm, idx) => (
                  <button
                    key={comm.id}
                    onClick={() => setSelectedCommunityIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${selectedCommunityIndex === idx ? 'bg-primary-blue text-white font-extrabold' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    <span>{comm.name.split(' ')[0]} Hub</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/10 font-mono">
                      {comm.members}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-400 leading-relaxed">
              💡 Click on any server channel hub to see live sparring logs.
            </div>
          </div>

          {/* Discord Text Channels List */}
          <div className="bg-slate-50 border-r border-slate-200/80 p-4 flex flex-col justify-between hidden sm:flex">
            <div>
              <div className="font-extrabold text-xs text-deep-navy mb-4 truncate uppercase tracking-widest">
                # CHANNELS: {activeCommunity.name.split(' ')[0]}
              </div>
              <div className="space-y-1">
                {activeCommunity.channels.map((chan, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${i === 2 ? 'bg-slate-200/80 text-deep-navy font-extrabold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                  >
                    {chan}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-1 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>{activeCommunity.activeUsers} Players Online</span>
            </div>
          </div>

          {/* Main Channel Preview Chat Area */}
          <div className="lg:col-span-2 p-5 flex flex-col justify-between bg-white h-full">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-black text-sm text-deep-navy">{activeCommunity.name}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">{activeCommunity.category} Club | Bandung</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setRoute('communities')} className="text-[10px] py-1 border-slate-200">
                  Join Space
                </Button>
              </div>

              {/* Messages Stack */}
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                {activeCommunity.messages.map((msg, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <img src={msg.avatar} alt="sender" className="w-8 h-8 rounded-full object-cover border border-slate-150" />
                    <div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-xs font-extrabold text-deep-navy">{msg.sender}</span>
                        <span className="text-[9px] text-slate-400 font-mono">Today at 1:15 PM</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input bar mockup */}
            <div className="mt-4 bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-2 flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Message {activeCommunity.channels[2]}...</span>
              <Button variant="primary" size="sm" className="px-3.5 py-1.5 text-[10px] h-auto rounded-lg">
                Send
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TOURNAMENT SECTION */}
      <section className="py-20 bg-white border-y border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            tag="TOURNAMENTS & LOBBIES"
            title="Elite Competition. Real Stakes."
            subtitle="Coordinate in high-profile events with full single-elimination bracket tracking. Rise as local esports-style champion."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 items-center">
            
            {/* Tournament Details Card */}
            <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/10 rounded-full filter blur-xl pointer-events-none"></div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C58A4A] bg-[#C58A4A]/10 border border-[#C58A4A]/20 px-3 py-1 rounded-full mb-6 inline-block">
                  Featured Event
                </span>
                <h3 className="text-2xl font-black text-white leading-tight mb-2">
                  Bandung Smash Championship v4
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Elite singles bracket containing 32 ranked competitors. Watch schedules, match logs, and tournament trees live.
                </p>

                <div className="space-y-3.5 mb-8">
                  <div className="flex justify-between text-xs border-b border-slate-800 pb-2.5">
                    <span className="text-slate-400">Total Prize Pool</span>
                    <span className="font-extrabold text-[#C58A4A]">Rp 5.000.000</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-800 pb-2.5">
                    <span className="text-slate-400">Current Participants</span>
                    <span className="font-extrabold text-white">28 / 32 Slots Locked</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-800 pb-2.5">
                    <span className="text-slate-400">XP Points Reward</span>
                    <span className="font-extrabold text-primary-blue">+150 XP Group Log</span>
                  </div>
                </div>
              </div>

              <Button variant="bronze" size="md" onClick={() => setRoute('tournaments')}>
                Register For Bracket
              </Button>
            </div>

            {/* Bracket visual system */}
            <div className="lg:col-span-2 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 relative">
              <div className="font-black text-xs text-deep-navy mb-6 uppercase tracking-wider">
                🏸 Live Tournament Bracket (Bandung Group A)
              </div>
              
              {/* Bracket Tree mockup */}
              <div className="grid grid-cols-3 gap-4 items-center relative overflow-x-auto min-w-[400px]">
                {/* Quarter Finals */}
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-[11px] space-y-1">
                    <div className="flex justify-between font-extrabold text-deep-navy border-b border-slate-100 pb-1">
                      <span>Kelvin R.</span>
                      <span className="text-primary-blue">21</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Arya W.</span>
                      <span>14</span>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-[11px] space-y-1">
                    <div className="flex justify-between font-extrabold text-deep-navy border-b border-slate-100 pb-1">
                      <span>Jessica P.</span>
                      <span className="text-primary-blue">21</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Ryan H.</span>
                      <span>18</span>
                    </div>
                  </div>
                </div>

                {/* Semi Finals */}
                <div className="space-y-12 pl-4 border-l-2 border-slate-200 relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-1 bg-slate-200 pointer-events-none"></div>
                  <div className="bg-white border-2 border-primary-blue p-2.5 rounded-xl text-[11px] space-y-1 shadow-md">
                    <div className="flex justify-between font-extrabold text-primary-blue border-b border-slate-100 pb-1">
                      <span>Kelvin R.</span>
                      <span className="text-primary-blue">19</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-deep-navy">
                      <span>Jessica P.</span>
                      <span>21</span>
                    </div>
                  </div>
                </div>

                {/* Champion */}
                <div className="flex flex-col items-center justify-center pl-6 border-l-2 border-slate-200 relative py-8">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-1 bg-slate-200 pointer-events-none"></div>
                  <Trophy className="w-10 h-10 text-yellow-500 mb-2 animate-bounce" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Champion</span>
                  <span className="text-sm font-extrabold text-deep-navy text-center mt-1">Jessica P.</span>
                  <RankBadge rank="Elite" className="scale-90 mt-1" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. RANKING / REPUTATION SECTION */}
      <section className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
        {/* Glow bubbles */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-blue/10 rounded-full filter blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-500/5 rounded-full filter blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column (Explaining the ranks) */}
            <div className="space-y-6 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#C58A4A] bg-[#C58A4A]/10 border border-[#C58A4A]/20 px-3.5 py-1.5 rounded-full">
                ATHLETE REPUTATION ENGINE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Competitive Ranks & <br />
                Certified Reputations
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
                Every match played impacts your rating. Rise sequentially through 6 certified tiers. Maintain high sportsmanship ratings to get priority matchmaking.
              </p>

              {/* Rank Tiers Horizontal List */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { name: 'Bronze', color: 'text-amber-500 bg-amber-500/10' },
                  { name: 'Silver', color: 'text-zinc-400 bg-zinc-400/10' },
                  { name: 'Gold', color: 'text-yellow-400 bg-yellow-400/10 border border-yellow-500/20' },
                  { name: 'Platinum', color: 'text-teal-400 bg-teal-400/10' },
                  { name: 'Elite', color: 'text-indigo-400 bg-indigo-500/10' },
                  { name: 'Legend', color: 'text-rose-400 bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20' }
                ].map((tier, i) => (
                  <div key={i} className={`p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center ${tier.color}`}>
                    <Shield className="w-5 h-5 mb-1.5" />
                    <span className="text-[11px] font-black uppercase tracking-wider">{tier.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Leaderboard preview card */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
                <div>
                  <h3 className="font-black text-base text-white">Elite Leaderboard</h3>
                  <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5">West Java Regional Division</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setRoute('rankings')} className="text-xs text-slate-300 hover:text-white">
                  Full Board
                </Button>
              </div>

              {/* Top 3 List with details */}
              <div className="space-y-3.5">
                {[
                  { pos: '01', name: 'Jessica Pratama', rep: 99, win: '88%', rank: 'Elite' },
                  { pos: '02', name: 'Kelvin Rudyanto', rep: 98, win: '82%', rank: 'Gold' },
                  { pos: '03', name: 'Arya Wibowo', rep: 95, win: '76%', rank: 'Gold' }
                ].map((ath, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-blue/30 transition-all">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-slate-400">{ath.pos}</span>
                      <div className="font-extrabold text-xs text-white">{ath.name}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 uppercase block">Win Rate</span>
                        <span className="text-[11px] font-bold text-emerald-400">{ath.win}</span>
                      </div>
                      <RankBadge rank={ath.rank} className="scale-90" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PROGRESS TRACKING SECTION */}
      <section className="py-20 bg-white border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column (Progress Dashboard Mockup) */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="font-black text-sm text-deep-navy uppercase">Athlete Analytics</h3>
                  <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5">Strava-Inspired Integration</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/8 text-emerald-600 border border-emerald-500/15 text-[10px] font-black rounded-full font-mono uppercase">
                  Streak: 5 Days
                </span>
              </div>

              {/* Row Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-white border border-slate-150 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">This Week</span>
                  <span className="text-lg font-black text-deep-navy mt-1 block">320m</span>
                </div>
                <div className="bg-white border border-slate-150 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Performance</span>
                  <span className="text-lg font-black text-primary-blue mt-1 block">94.5%</span>
                </div>
                <div className="bg-white border border-slate-150 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Goals</span>
                  <span className="text-lg font-black text-[#8B5E3C] mt-1 block">85% Done</span>
                </div>
              </div>

              {/* Sparkline Graphic */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-black mb-3">
                  <span>Weekly Activity load</span>
                  <span>Active cardio</span>
                </div>
                {/* SVG Graph placeholder */}
                <div className="h-24 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0B5FFF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0B5FFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon points="0,100 15,75 30,85 45,50 60,65 75,30 90,45 100,10 100,100" fill="url(#chartGradient)" />
                    <polyline fill="none" stroke="#0B5FFF" strokeWidth="4" points="0,75 15,75 30,85 45,50 60,65 75,30 90,45 100,10" />
                    <circle cx="100" cy="10" r="4" fill="#0B5FFF" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Text content */}
            <div className="space-y-6 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-primary-blue bg-primary-blue/8 px-3.5 py-1.5 rounded-full border border-primary-blue/15">
                ATHLETIC PROGRESS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-deep-navy tracking-tight leading-tight">
                Strava-Inspired <br />
                Progress Analytics
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
                Gain clear evaluation of your athletic progression. Trace active durations, cardio load logs, session intensities, and win records seamlessly in one centralized system.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/8 text-emerald-600 flex items-center justify-center font-bold">
                    1
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-semibold">Weekly training goals synchronize automatically with session schedules.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary-blue/8 text-primary-blue flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-semibold">Daily streak counters track active cardio development consecutively.</span>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary" size="lg" onClick={() => setRoute('progress')}>
                  View Stats Console
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-primary-blue via-blue-800 to-slate-900 rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden border border-primary-blue/20 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-400/5 rounded-full filter blur-3xl pointer-events-none"></div>
          
          <div className="relative space-y-6 max-w-2xl mx-auto">
            <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-[10px] text-white font-black border border-white/10 tracking-widest uppercase">
              🏆 ARE YOU READY TO SPAR?
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              “Your next rival is already waiting.”
            </h2>
            
            <p className="text-sm text-white/80 leading-relaxed">
              Join SportMatch and turn every match, training session, and community into progress. Establish your reputation score, rise through leaderboard categories, and conquer local brackets.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button
                variant="bronze"
                size="lg"
                onClick={() => setRoute(isLoggedIn ? 'match' : 'register')}
                className="shadow-xl hover:shadow-2xl font-bold tracking-wider uppercase px-8"
              >
                Create Account
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setRoute('communities')}
                className="px-8 border-white/20 text-white hover:bg-white/10"
              >
                View Demo Spaces
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
