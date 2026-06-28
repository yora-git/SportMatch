/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, MapPin, Hash, Trophy, Sparkles, Check } from 'lucide-react';
import { Community, Sport } from '../types';
import { Card, Badge, Button } from './UIComponents';

// Simulated mock club mapping to make each community feel like a structured sports club
const CLUB_TELEMETRY: { [key: string]: { weekly_activities: number; rank: number; preview: string; author: string } } = {
  comm_bba: {
    weekly_activities: 52,
    rank: 1,
    author: 'Kelvin Rudyanto',
    preview: 'Logged 85 mins Singles Sparring'
  },
  comm_jbr: {
    weekly_activities: 29,
    rank: 4,
    author: 'Budi Santoso',
    preview: 'Played 5 games halfcourt pickup'
  },
  comm_ufn: {
    weekly_activities: 38,
    rank: 3,
    author: 'Farhan Maulana',
    preview: 'Championship Match 5-3 Futsal Town'
  },
  comm_wtc: {
    weekly_activities: 18,
    rank: 5,
    author: 'Nadia Syafira',
    preview: 'Clay court tennis drilling 120 mins'
  }
};

interface CommunityCardProps {
  community: Community;
  sport: Sport;
  isJoined?: boolean;
  onJoinToggle?: () => void;
  onViewDetails?: () => void;
}

export default function CommunityCard({
  community,
  sport,
  isJoined = false,
  onJoinToggle,
  onViewDetails
}: CommunityCardProps) {
  // Extract telemetry based on community id
  const telemetry = CLUB_TELEMETRY[community.id] || {
    weekly_activities: 15,
    rank: 8,
    author: 'Regional Athlete',
    preview: 'Logged training session workout'
  };

  return (
    <Card hoverEffect className="overflow-hidden border border-slate-200/80 bg-white flex flex-col justify-between min-h-[460px] p-5">
      <div>
        {/* Banner Image */}
        <div className="relative h-32 rounded-xl overflow-hidden mb-4 border border-slate-200/60">
          <img
            src={community.image_url}
            alt={community.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
          
          {/* Rank Badge overlay */}
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center text-[9px] font-black font-mono bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-2.5 py-1 rounded-full border border-yellow-400/20 shadow-sm">
              <Trophy className="w-3 h-3 mr-1" />
              RANK #{telemetry.rank}
            </span>
          </div>
          
          {/* Member count overlay */}
          <div className="absolute top-2.5 right-2.5">
            <span className="inline-flex items-center text-[10px] font-mono bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-600 border border-slate-200/80 shadow-sm font-bold">
              <Users className="w-3.5 h-3.5 mr-1 text-primary-blue" />
              {community.member_count.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Club Info */}
        <div className="px-1 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-black text-sm text-deep-navy tracking-tight truncate flex-1" title={community.name}>
              {community.name}
            </h4>
            <span className="text-[10px] text-slate-400 font-mono font-bold flex items-center shrink-0">
              <MapPin className="w-3.5 h-3.5 mr-0.5 text-rose-500" /> {community.city}
            </span>
          </div>
          
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
            {community.description}
          </p>

          {/* Activity Preview & Telemetry Grid */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 space-y-2 text-xs">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono border-b border-slate-100 pb-1.5">
              <span>Weekly Logs: <strong className="text-deep-navy">{telemetry.weekly_activities}</strong></span>
              <span>Sport: <strong className="text-primary-blue">{sport.name}</strong></span>
            </div>
            
            {/* Latest Club Activity preview */}
            <div className="space-y-0.5">
              <div className="text-[8px] text-slate-400 uppercase tracking-wider font-mono">Latest Club Activity</div>
              <div className="font-extrabold text-deep-navy text-[11px] truncate">{telemetry.author}</div>
              <div className="text-slate-500 text-[10px] truncate flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-amber-500 shrink-0" />
                {telemetry.preview}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Block */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="text-xs border-slate-200 text-slate-600"
        >
          <Hash className="w-3.5 h-3.5 mr-1 text-primary-blue" />
          Enter Space
        </Button>

        <Button
          variant={isJoined ? 'outline' : 'primary'}
          size="sm"
          onClick={onJoinToggle}
          className={`text-xs ${isJoined ? 'border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : ''}`}
        >
          {isJoined ? (
            <span className="flex items-center justify-center">
              <Check className="w-3.5 h-3.5 mr-1" /> Joined✓
            </span>
          ) : 'Join Club'}
        </Button>
      </div>
    </Card>
  );
}
