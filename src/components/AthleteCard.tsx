/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MapPin, Flame, MessageSquare, Zap, X } from 'lucide-react';
import { User } from '../types';
import { Card, RankBadge, Button, Badge } from './UIComponents';

interface AthleteCardProps {
  athlete: User;
  onPass?: () => void;
  onChallenge?: () => void;
  onMessage?: () => void;
  variant?: 'tinder' | 'list';
}

export default function AthleteCard({
  athlete,
  onPass,
  onChallenge,
  onMessage,
  variant = 'list'
}: AthleteCardProps) {
  if (variant === 'tinder') {
    return (
      <div className="relative w-full max-w-sm h-[480px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col justify-between">
        {/* Profile Image & Information Overlay */}
        <div className="relative w-full h-[320px]">
          <img
            src={athlete.avatar_url}
            alt={athlete.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
          
          {/* Quick Stats Overlay (Top-left & Top-right) */}
          <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
            <RankBadge rank={athlete.rank_tier} />
            <Badge variant="blue">{athlete.main_sport}</Badge>
          </div>

          <div className="absolute top-4 right-4">
            <span className="flex items-center text-[10px] font-mono font-bold text-emerald-600 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
              <Flame className="w-3.5 h-3.5 mr-1 text-amber-500 animate-pulse" />
              {athlete.reputation_score}% Rep
            </span>
          </div>

          {/* User Name & Bio */}
          <div className="absolute bottom-4 inset-x-4">
            <h3 className="text-xl font-black text-deep-navy tracking-tight flex items-center mb-1 drop-shadow-sm">
              {athlete.name}
              <span className="text-xs font-normal text-slate-500 ml-2">@{athlete.username}</span>
            </h3>
            <p className="text-xs text-slate-600 font-bold flex items-center mb-1">
              <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500" /> {athlete.city}
            </p>
          </div>
        </div>

        {/* Detailed Description and CTAs */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">
            "{athlete.bio}"
          </p>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between space-x-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPass}
              className="w-11 h-11 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center cursor-pointer transition-colors"
              title="Pass"
            >
              <X className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onChallenge}
              className="flex-1 h-11 rounded-full bg-primary-blue hover:bg-opacity-95 text-white font-extrabold text-xs tracking-wider flex items-center justify-center cursor-pointer shadow-lg shadow-primary-blue/15"
              title="Challenge to Sparring"
            >
              <Zap className="w-4 h-4 mr-1.5 text-yellow-300 animate-bounce" />
              CHALLENGE
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMessage}
              className="w-11 h-11 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              title="Message"
            >
              <MessageSquare className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Standard list / grid variant card
  return (
    <Card hoverEffect className="overflow-hidden border border-slate-200/80 bg-white">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={athlete.avatar_url}
            alt={athlete.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center" title="Open for Sparring" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-deep-navy truncate flex items-center">
              {athlete.name}
            </h4>
            <RankBadge rank={athlete.rank_tier} className="scale-90" />
          </div>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center font-semibold">
            <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500" /> {athlete.city}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant="blue" className="scale-90">{athlete.main_sport}</Badge>
            <Badge variant="gray" className="scale-90">Rep: {athlete.reputation_score}%</Badge>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 mt-3 leading-relaxed italic line-clamp-2">
        "{athlete.bio}"
      </p>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
        <Button variant="outline" size="sm" onClick={onMessage} className="text-xs border-slate-200 text-slate-600">
          <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-primary-blue" />
          Message
        </Button>
        <Button variant="bronze" size="sm" onClick={onChallenge} className="text-xs">
          <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
          Challenge
        </Button>
      </div>
    </Card>
  );
}
