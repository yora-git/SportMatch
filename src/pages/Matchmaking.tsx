/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Zap, HelpCircle, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { User, Sport } from '../types';
import { Card, Button, RankBadge } from '../components/UIComponents';
import AthleteCard from '../components/AthleteCard';

interface MatchmakingProps {
  currentUser: User;
  athletes: User[];
  sports: Sport[];
  setRoute: (route: string) => void;
  onInitiateMatch: (opponentId: string, location: string, scheduledTime: string) => void;
}

export default function Matchmaking({
  currentUser,
  athletes,
  sports,
  setRoute,
  onInitiateMatch
}: MatchmakingProps) {
  // Filters state
  const [filterSport, setFilterSport] = useState('All');
  const [filterSkill, setFilterSkill] = useState('All');
  const [filterCity, setFilterCity] = useState('All');
  const [matchingMode, setMatchingMode] = useState<'competitive' | 'casual'>('competitive');

  // Deck active index
  const [activeIndex, setActiveIndex] = useState(0);
  const [matchRequestModal, setMatchRequestModal] = useState<User | null>(null);
  const [courtLocation, setCourtLocation] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  // Get matching pool
  const matchesPool = athletes.filter(athlete => {
    if (athlete.id === currentUser.id) return false;
    
    // Filter sport
    if (filterSport !== 'All' && athlete.main_sport !== filterSport) return false;
    
    // Filter skill
    if (filterSkill !== 'All' && athlete.skill_level !== filterSkill) return false;

    // Filter City
    if (filterCity !== 'All' && athlete.city !== filterCity) return false;

    return true;
  });

  const activeAthlete = matchesPool[activeIndex];

  const handlePass = () => {
    if (activeIndex < matchesPool.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // Loop back or trigger end state
    }
  };

  const handleOpenChallenge = (athlete: User) => {
    // Open modal to specify court booking
    setMatchRequestModal(athlete);
    setCourtLocation(athlete.city === 'Bandung' ? 'Bandung Badminton Arena Court 3' : 'Jakarta Sudirman Arena Court A');
    setMeetingTime('2026-07-01T19:00');
  };

  const handleSendChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchRequestModal) return;

    onInitiateMatch(matchRequestModal.id, courtLocation, meetingTime);
    setMatchRequestModal(null);
    alert(`Challenge request successfully issued to ${matchRequestModal.name}! Syncing with coordinating feeds.`);
    handlePass();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-deep-navy flex items-center">
            <Zap className="w-6 h-6 text-primary-blue mr-2.5 animate-bounce" />
            Sparring Matchmaker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Match with players based on sport, skill level, and competitive style</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FILTERS & INFO (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. MATCH FILTER CRITERIA */}
          <Card hoverEffect={false} className="border border-slate-200/80 bg-white p-5 rounded-2xl">
            <div className="flex items-center space-x-2 text-deep-navy font-extrabold text-sm mb-4">
              <SlidersHorizontal className="w-4 h-4 text-primary-blue" />
              <span>Matching Filter Controls</span>
            </div>

            <div className="space-y-4">
              {/* Match Mode Selector */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Rival Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMatchingMode('competitive')}
                    className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all ${
                      matchingMode === 'competitive'
                        ? 'bg-primary-blue/10 border-primary-blue text-primary-blue'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    🏆 Competitive
                  </button>
                  <button
                    type="button"
                    onClick={() => setMatchingMode('casual')}
                    className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all ${
                      matchingMode === 'casual'
                        ? 'bg-amber-500/10 border-amber-500/20 text-[#8B5E3C]'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    🌱 Casual Run
                  </button>
                </div>
              </div>

              {/* Sport Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Sport Category</label>
                <select
                  value={filterSport}
                  onChange={(e) => { setFilterSport(e.target.value); setActiveIndex(0); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-600 focus:outline-none focus:border-primary-blue cursor-pointer"
                >
                  <option value="All">All Sports</option>
                  {sports.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Skill Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Target Rank Tier</label>
                <select
                  value={filterSkill}
                  onChange={(e) => { setFilterSkill(e.target.value); setActiveIndex(0); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-600 focus:outline-none focus:border-primary-blue cursor-pointer"
                >
                  <option value="All">All Ranks</option>
                  <option value="Bronze">Bronze Tier</option>
                  <option value="Silver">Silver Tier</option>
                  <option value="Gold">Gold Tier</option>
                  <option value="Platinum">Platinum Tier</option>
                  <option value="Elite">Elite Tier</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Arena Region</label>
                <select
                  value={filterCity}
                  onChange={(e) => { setFilterCity(e.target.value); setActiveIndex(0); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-600 focus:outline-none focus:border-primary-blue cursor-pointer"
                >
                  <option value="All">All Cities</option>
                  <option value="Bandung">Bandung (West Java)</option>
                  <option value="Jakarta">Jakarta (Capital)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* 2. ALGORITHM INFO CARD */}
          <Card hoverEffect={false} className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl">
            <div className="flex items-center space-x-2 text-deep-navy font-extrabold text-sm mb-3">
              <HelpCircle className="w-4 h-4 text-primary-blue" />
              <span>Fairplay Matching System</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Our matchmaking deck pairs contenders based on verified Reputation Indexes (minimum 90% recommended for ranked cups) and geographical proximity limits. Ensure your location permissions are synced.
            </p>
          </Card>
        </div>

        {/* RIGHT COLUMN: SWIPE CARD STAGE (8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[500px]">
          {activeAthlete ? (
            <div className="space-y-4">
              <AthleteCard
                athlete={activeAthlete}
                variant="tinder"
                onPass={handlePass}
                onChallenge={() => handleOpenChallenge(activeAthlete)}
                onMessage={() => setRoute('feed')}
              />
              <div className="flex justify-between items-center text-xs text-slate-400 max-w-sm mx-auto px-4 font-bold">
                <span>Contender {activeIndex + 1} of {matchesPool.length}</span>
                <span className="flex items-center text-primary-blue">
                  Press challenge to book <ChevronRight className="w-4 h-4 ml-0.5" />
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 bg-white border border-dashed border-slate-200 p-10 rounded-2xl max-w-md">
              <p className="text-sm text-slate-500 font-extrabold">All matching contenders cleared.</p>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">Adjust your rank settings, sport preferences, or location radius to broaden the matchmaking pool.</p>
              <Button variant="outline" size="sm" className="border-slate-200 text-slate-600" onClick={() => { setFilterSport('All'); setFilterSkill('All'); setFilterCity('All'); setActiveIndex(0); }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* CHALLENGE BOOKING MODAL */}
      {matchRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <Card hoverEffect={false} className="w-full max-w-md border border-slate-200 bg-white p-6 rounded-2xl space-y-6 shadow-2xl">
            <div className="text-center">
              <h3 className="text-lg font-black text-deep-navy">Book Sparring Session</h3>
              <p className="text-xs text-slate-500 mt-1">Coordinate court and timeline with <span className="text-primary-blue font-bold">{matchRequestModal.name}</span></p>
            </div>

            <form onSubmit={handleSendChallengeSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Court Location</label>
                <input
                  type="text"
                  required
                  value={courtLocation}
                  onChange={(e) => setCourtLocation(e.target.value)}
                  placeholder="e.g. Bandung Badminton Arena Court 3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Scheduled Time</label>
                <input
                  type="datetime-local"
                  required
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" size="sm" type="button" className="border-slate-200 text-slate-600" onClick={() => setMatchRequestModal(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Transmit Challenge
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
