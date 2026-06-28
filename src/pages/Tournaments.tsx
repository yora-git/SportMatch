/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Trophy, PlusCircle, ShieldAlert } from 'lucide-react';
import { Tournament, Sport } from '../types';
import { Card, Button } from '../components/UIComponents';
import TournamentCard from '../components/TournamentCard';

interface TournamentsProps {
  tournaments: Tournament[];
  sports: Sport[];
  onRegisterToggle: (tourId: string) => void;
  registeredTourIds: string[];
}

export default function Tournaments({
  tournaments,
  sports,
  onRegisterToggle,
  registeredTourIds
}: TournamentsProps) {
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedTournamentForBracket, setSelectedTournamentForBracket] = useState<Tournament | null>(tournaments[0]);

  const filteredTournaments = tournaments.filter(tour => {
    // Sport filter
    if (selectedSport !== 'All') {
      const sportObj = sports.find(s => s.name === selectedSport);
      if (!sportObj || tour.sport_id !== sportObj.id) return false;
    }

    // City filter
    if (selectedCity !== 'All' && tour.city !== selectedCity) return false;

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-deep-navy flex items-center">
            <Trophy className="w-6 h-6 text-[#8B5E3C] mr-2.5 animate-bounce" />
            Competitive Tournaments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Join or create official local single-elimination bracket cups</p>
        </div>

        <Button
          variant="bronze"
          size="sm"
          onClick={() => {
            alert("Create Tournament utility is currently restricted to Verified Venue Partners.");
          }}
          className="text-xs font-bold"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" />
          Establish Tournament
        </Button>
      </div>

      {/* FILTER BUTTONS & SELECTION */}
      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 pb-4.5">
        <div className="flex flex-wrap gap-2">
          {/* Sports filters */}
          {['All', 'Badminton', 'Basketball', 'Tennis', 'Futsal'].map(sport => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedSport === sport
                  ? 'bg-primary-blue text-white border-primary-blue shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-deep-navy hover:bg-slate-100/60'
              }`}
            >
              {sport}
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
        {/* LEFT COLUMN: ACTIVE TOURNAMENTS LIST (8 cols) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTournaments.length === 0 ? (
              <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm text-slate-400 font-extrabold">No tournaments scheduled in this section.</p>
                <p className="text-xs text-slate-400 mt-1 font-semibold">Try resetting filters to explore broader regional runs.</p>
              </div>
            ) : (
              filteredTournaments.map((tour) => {
                const sp = sports.find(s => s.id === tour.sport_id) || sports[0];
                const isReg = registeredTourIds.includes(tour.id);
                return (
                  <div
                    key={tour.id}
                    onClick={() => setSelectedTournamentForBracket(tour)}
                    className={`cursor-pointer transition-all ${selectedTournamentForBracket?.id === tour.id ? 'ring-2 ring-primary-blue rounded-3xl shadow-md' : ''}`}
                  >
                    <TournamentCard
                      tournament={tour}
                      sport={sp}
                      isRegistered={isReg}
                      onRegisterToggle={() => onRegisterToggle(tour.id)}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SINGLE-ELIMINATION BRACKET PREVIEW (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card hoverEffect={false} className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2 text-deep-navy font-extrabold text-sm mb-4">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Championship Brackets</span>
            </div>

            {selectedTournamentForBracket ? (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="font-extrabold text-xs text-deep-navy leading-tight">
                    {selectedTournamentForBracket.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Round 1 Matchups • {selectedTournamentForBracket.city}</p>
                </div>

                {selectedTournamentForBracket.bracket_preview && selectedTournamentForBracket.bracket_preview.length > 0 ? (
                  <div className="space-y-3">
                    {selectedTournamentForBracket.bracket_preview.map((matchup, idx) => {
                      const parts = matchup.split(' vs ');
                      return (
                        <div key={idx} className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 font-semibold">
                          <div className="flex items-center justify-between text-[11px] text-slate-600">
                            <span className="truncate font-bold">{parts[0]}</span>
                            <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-500/8 px-1.5 py-0.5 rounded border border-emerald-500/15">Active</span>
                          </div>
                          <div className="h-[1px] bg-slate-200/60 my-1"></div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="truncate">{parts[1]}</span>
                            <span className="text-[9px] font-mono text-slate-400 font-bold">Slot</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-slate-400 italic font-semibold">
                    Bracket draws generate automatically when registration period finishes.
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-400 font-semibold">
                Select a tournament card on the left to review match tree configurations.
              </div>
            )}
          </Card>

          <Card hoverEffect={false} className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-[11px] text-slate-500 leading-relaxed font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-500 mb-1.5" />
            "Participation guidelines: Tournament slots operate on a strict first-come-first-served basis. Cancellations under 48 hours incur a Reputation Index fee."
          </Card>
        </div>
      </div>
    </div>
  );
}
