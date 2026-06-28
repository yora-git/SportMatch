/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, MapPin, Zap, MessageSquare, Check, X } from 'lucide-react';
import { Match, User, Sport } from '../types';
import { Card, Badge, Button, Icon } from './UIComponents';

interface MatchCardProps {
  match: Match;
  challenger: User;
  opponent: User;
  sport: Sport;
  isCurrentUserChallenger: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onLogResult?: () => void;
  onMessage?: () => void;
}

export default function MatchCard({
  match,
  challenger,
  opponent,
  sport,
  isCurrentUserChallenger,
  onAccept,
  onDecline,
  onLogResult,
  onMessage
}: MatchCardProps) {
  
  const statusStyles = {
    Pending: { badge: 'blue' as const, bg: 'bg-blue-50/60 border-blue-200' },
    Accepted: { badge: 'green' as const, bg: 'bg-emerald-50/60 border-emerald-200' },
    Declined: { badge: 'red' as const, bg: 'bg-rose-50/60 border-rose-200' },
    Completed: { badge: 'bronze' as const, bg: 'bg-amber-50/60 border-amber-200' },
    Cancelled: { badge: 'gray' as const, bg: 'bg-slate-50 border-slate-200' }
  };

  const currentStyle = statusStyles[match.status] || statusStyles.Pending;

  const displayUser = isCurrentUserChallenger ? opponent : challenger;

  const formattedDate = new Date(match.scheduled_at).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card hoverEffect className={`border ${currentStyle.bg} p-5 flex flex-col justify-between bg-white`}>
      <div>
        {/* Match Header with Sport and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-primary-blue">
              <Icon name={sport.icon} className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-deep-navy uppercase tracking-wider">{sport.name} Sparring</span>
          </div>
          <Badge variant={currentStyle.badge}>{match.status}</Badge>
        </div>

        {/* Rival/Player info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={displayUser.avatar_url}
            alt={displayUser.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div>
            <h5 className="font-bold text-xs text-slate-500">
              {isCurrentUserChallenger ? 'Vs' : 'Challenged by'} <span className="text-deep-navy text-sm font-extrabold">{displayUser.name}</span>
            </h5>
            <p className="text-[11px] text-slate-400 font-mono">@{displayUser.username} • {displayUser.rank_tier} Rank</p>
          </div>
        </div>

        {/* Schedule & court location */}
        <div className="space-y-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-xs text-slate-600">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 text-primary-blue mr-2 shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-3.5 h-3.5 text-rose-500 mr-2 shrink-0" />
            <span className="truncate">{match.location}</span>
          </div>
          {match.result && (
            <div className="flex items-center text-amber-600 font-extrabold border-t border-slate-200/80 pt-2 mt-2">
              <Zap className="w-3.5 h-3.5 text-amber-500 mr-2 shrink-0 animate-pulse" />
              <span>Result: {match.result}</span>
            </div>
          )}
        </div>
      </div>

      {/* Conditional Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {match.status === 'Pending' && !isCurrentUserChallenger && (
          <div className="flex space-x-2">
            <Button variant="primary" size="sm" onClick={onAccept} className="flex-1 text-xs py-2.5">
              <Check className="w-3.5 h-3.5 mr-1" /> Accept
            </Button>
            <Button variant="outline" size="sm" onClick={onDecline} className="text-xs border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-600 py-2.5">
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}

        {match.status === 'Pending' && isCurrentUserChallenger && (
          <div className="flex items-center justify-between text-xs text-slate-400 py-1 font-mono">
            <span>Awaiting response...</span>
            <Button variant="outline" size="sm" onClick={onDecline} className="text-[10px] border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-600 py-1 px-2.5 rounded-lg">
              Cancel
            </Button>
          </div>
        )}

        {match.status === 'Accepted' && (
          <div className="flex space-x-2">
            <Button variant="bronze" size="sm" onClick={onLogResult} className="flex-1 text-xs py-2.5">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" /> Log Match Score
            </Button>
            <Button variant="outline" size="sm" onClick={onMessage} className="text-xs border-slate-200 text-slate-500 py-2.5">
              <MessageSquare className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}

        {match.status === 'Completed' && (
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[10px]">Match recorded successfully</span>
            <Button variant="outline" size="sm" onClick={onMessage} className="text-xs border-slate-200 text-slate-600 py-1.5 px-3">
              <MessageSquare className="w-3.5 h-3.5 mr-1" /> Chat
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
