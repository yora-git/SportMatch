/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, MapPin, Trophy, Users, Award, ChevronRight } from 'lucide-react';
import { Tournament, Sport } from '../types';
import { Card, Badge, Button, Icon } from './UIComponents';

interface TournamentCardProps {
  tournament: Tournament;
  sport: Sport;
  isRegistered?: boolean;
  onRegisterToggle?: () => void;
}

export default function TournamentCard({
  tournament,
  sport,
  isRegistered = false,
  onRegisterToggle
}: TournamentCardProps) {
  
  const statusColors = {
    Registration: { badge: 'blue' as const, bg: 'border-blue-200 bg-blue-50/50' },
    Ongoing: { badge: 'green' as const, bg: 'border-emerald-200 bg-emerald-50/50' },
    Completed: { badge: 'bronze' as const, bg: 'border-amber-200 bg-amber-50/50' }
  };

  const currentStyle = statusColors[tournament.status] || statusColors.Registration;

  const formattedDate = new Date(tournament.start_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }) + ' - ' + new Date(tournament.end_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const slotsLeft = tournament.max_participants - tournament.current_participants;
  const isFull = slotsLeft <= 0;

  return (
    <Card hoverEffect className={`border ${currentStyle.bg} p-6 flex flex-col justify-between h-full bg-white`}>
      <div>
        {/* Header Block */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="bronze" className="flex items-center">
            <Icon name={sport.icon} className="w-3.5 h-3.5 mr-1" />
            {sport.name}
          </Badge>
          <Badge variant={currentStyle.badge}>{tournament.status}</Badge>
        </div>

        {/* Title */}
        <h4 className="font-black text-base sm:text-lg text-deep-navy mb-2 leading-snug tracking-tight">
          {tournament.name}
        </h4>

        {/* Date and Location */}
        <div className="space-y-2 mb-4 text-xs text-slate-500 font-semibold">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2.5 text-primary-blue shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2.5 text-rose-500 shrink-0" />
            <span>{tournament.city} Major Center</span>
          </div>
        </div>

        {/* Prize Pool Box */}
        <div className="bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-600 border border-yellow-500/15">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">Grand Prize Pool</div>
            <div className="text-sm font-extrabold text-deep-navy">{tournament.prize}</div>
          </div>
        </div>

        {/* Slot Progress and Brackets */}
        <div className="space-y-3 mb-5">
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
              <span className="text-slate-400 flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-primary-blue" /> Slots Registered
              </span>
              <span className="font-mono text-deep-navy">
                {tournament.current_participants} / {tournament.max_participants}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-blue to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${(tournament.current_participants / tournament.max_participants) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Bracket Preview */}
          {tournament.bracket_preview && tournament.bracket_preview.length > 0 && (
            <div className="border-t border-slate-100 pt-3 mt-3">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                <Award className="w-3.5 h-3.5 text-yellow-500 mr-1 animate-pulse" /> Opening Match Bracket
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {tournament.bracket_preview.slice(0, 2).map((matchup, idx) => (
                  <div key={idx} className="bg-slate-50 px-2.5 py-1.5 rounded-lg text-[10px] font-mono truncate text-slate-500 border border-slate-200/60 font-semibold">
                    {matchup}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Register Action CTA */}
      <div className="pt-3 border-t border-slate-100">
        <Button
          variant={isRegistered ? 'secondary' : 'primary'}
          size="md"
          fullWidth
          disabled={isFull && !isRegistered && tournament.status === 'Registration'}
          onClick={onRegisterToggle}
          className="text-xs"
        >
          {isRegistered ? (
            'Cancel Registration'
          ) : isFull && tournament.status === 'Registration' ? (
            'Slots Filled'
          ) : tournament.status === 'Ongoing' ? (
            'View Live Bracket Matches'
          ) : tournament.status === 'Completed' ? (
            'View Tournament Results'
          ) : (
            'Register For Tournament'
          )}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
}
