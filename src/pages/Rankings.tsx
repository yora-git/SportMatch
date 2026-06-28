/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BarChart3, Trophy, Info, MapPin } from 'lucide-react';
import { User, Sport } from '../types';
import { Card, RankBadge } from '../components/UIComponents';
import { DEMO_RANKINGS } from '../lib/demo-data';

interface RankingsProps {
  currentUser: User;
  athletes: User[];
  sports: Sport[];
}

export default function Rankings({
  currentUser,
  athletes,
  sports
}: RankingsProps) {
  const [selectedSportId, setSelectedSportId] = useState('sport_badminton');
  const [selectedCity, setSelectedCity] = useState('All');

  // Get rankings list for selected sport
  const activeRankings = DEMO_RANKINGS[selectedSportId] || [];

  // Tiers layout reference
  const tiersList = [
    { name: 'Legend', points: '2500+ XP', desc: 'Top 1% elite competitive players globally' },
    { name: 'Elite', points: '2200 - 2499 XP', desc: 'Advanced masters with verified credentials' },
    { name: 'Platinum', points: '1800 - 2199 XP', desc: 'Consistent top contenders in city events' },
    { name: 'Gold', points: '1400 - 1799 XP', desc: 'Intermediate high-intensity sparring partners' },
    { name: 'Silver', points: '1000 - 1399 XP', desc: 'Recreational club players and runners' },
    { name: 'Bronze', points: '600 - 999 XP', desc: 'Beginners establishing core matches' },
    { name: 'Rookie', points: '0 - 599 XP', desc: 'Initial entry stage for new athletes' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-deep-navy flex items-center">
            <BarChart3 className="w-6 h-6 text-primary-blue mr-2.5" />
            Competitive Leaderboards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Climb local ranks by logging verified match receipts and winning cups</p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 pb-4.5">
        <div className="flex items-center space-x-2">
          {sports.slice(0, 3).map(sp => (
            <button
              key={sp.id}
              onClick={() => setSelectedSportId(sp.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedSportId === sp.id
                  ? 'bg-primary-blue text-white border-primary-blue shadow-sm'
                  : 'text-slate-500 border-transparent hover:text-deep-navy hover:bg-slate-100/60'
              }`}
            >
              {sp.name} Ladder
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 bg-slate-50 p-1 rounded-xl border border-slate-200 shrink-0">
          {['All', 'Bandung', 'Jakarta'].map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-primary-blue/10 text-primary-blue'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: THE RANKED LEBOARD (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card hoverEffect={false} className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Contenders Standings</span>
              <span className="text-[10px] text-emerald-600 font-mono font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/15">
                ACTIVE SEASON 2
              </span>
            </div>

            {activeRankings.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400 italic font-semibold">
                Leaderboard points generate when match receipts post inside regional spaces.
              </div>
            ) : (
              <div className="space-y-3">
                {activeRankings
                  .filter(rank => {
                    if (selectedCity === 'All') return true;
                    const ath = athletes.find(a => a.id === rank.user_id) || currentUser;
                    return ath.city === selectedCity;
                  })
                  .map((rank, index) => {
                    const ath = athletes.find(a => a.id === rank.user_id) || currentUser;
                    const isSelf = ath.id === currentUser.id;
                    return (
                      <div
                        key={rank.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          isSelf
                            ? 'bg-primary-blue/5 border-primary-blue/30 shadow-sm'
                            : 'bg-slate-50/80 border-slate-200/60 hover:bg-slate-50'
                        }`}
                      >
                        {/* Player name, avatar, placement */}
                        <div className="flex items-center space-x-3.5 min-w-0">
                          <span className="font-mono font-black text-sm text-primary-blue w-5 text-center">
                            {index + 1}
                          </span>
                          <img
                            src={ath.avatar_url}
                            alt={ath.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="truncate">
                            <h4 className="font-extrabold text-xs text-deep-navy truncate flex items-center">
                              {ath.name}
                              {isSelf && (
                                <span className="text-[8px] bg-primary-blue text-white px-1.5 py-0.5 rounded-md ml-1.5 font-bold uppercase tracking-widest">YOU</span>
                              )}
                            </h4>
                            <p className="text-[10px] text-slate-400 flex items-center mt-0.5 font-semibold font-mono">
                              <MapPin className="w-3 h-3 text-rose-500 mr-0.5" />
                              {ath.city} • {rank.wins}W - {rank.losses}L
                            </p>
                          </div>
                        </div>

                        {/* Rank Badge and Score */}
                        <div className="flex items-center space-x-4 shrink-0 font-semibold">
                          <RankBadge rank={rank.rank_tier} className="scale-90" />
                          <div className="text-right">
                            <div className="text-xs font-black text-deep-navy font-mono">{rank.points}p</div>
                            <div className="text-[9px] text-slate-400 font-mono">WR: {rank.win_rate}%</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN: REVENUE TIERS DETAILS (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card hoverEffect={false} className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2 text-deep-navy font-extrabold text-sm mb-4 border-b border-slate-100 pb-3">
              <Trophy className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Rank Division Tree</span>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {tiersList.map((tier) => (
                <div key={tier.name} className="flex items-start space-x-3 text-xs border-b border-slate-100 pb-3">
                  <div className="shrink-0 mt-0.5">
                    <RankBadge rank={tier.name} className="scale-75 origin-left" />
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0 font-semibold">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-deep-navy">{tier.name} Level</span>
                      <span className="text-[9px] text-primary-blue font-mono font-bold">{tier.points}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card hoverEffect={false} className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-[11px] text-slate-500 leading-relaxed flex items-start space-x-2 font-semibold">
            <Info className="w-4.5 h-4.5 text-primary-blue shrink-0 mt-0.5" />
            <span>"Fairplay matching matches: Tiers update dynamically every Sunday at 12:00 AM UTC. Make sure all match scorecard results are submitted."</span>
          </Card>
        </div>
      </div>
    </div>
  );
}
