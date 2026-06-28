/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, Hash, Users, MapPin, Send, Volume2, Calendar } from 'lucide-react';
import { Community, Sport } from '../types';
import { Card, Button, Badge, RankBadge } from '../components/UIComponents';
import { COMMUNITY_CHANNELS, COMMUNITY_DISCUSSIONS } from '../lib/demo-data';

interface CommunityDetailProps {
  community: Community;
  sport: Sport;
  setRoute: (route: string) => void;
  isJoined: boolean;
  onJoinToggle: () => void;
}

export default function CommunityDetail({
  community,
  sport,
  setRoute,
  isJoined,
  onJoinToggle
}: CommunityDetailProps) {
  // Get channels and discussions
  const channels = COMMUNITY_CHANNELS[community.id] || [
    { id: 'chan_gen', name: '💬-general-chat' },
    { id: 'chan_ann', name: '📢-announcements' }
  ];

  const [activeChannelId, setActiveChannelId] = useState(channels[0].id);
  const [chatInputText, setChatInputText] = useState('');
  
  // Local discussion state to make typing interactive!
  const [discussions, setDiscussions] = useState<{ id: string; user_name: string; user_avatar: string; user_rank: string; text: string; time: string }[]>(
    COMMUNITY_DISCUSSIONS[community.id] || [
      { id: '1', user_name: 'Arya Wibowo', user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80', user_rank: 'Gold', text: 'Welcome to our space!', time: '1h ago' }
    ]
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;

    setDiscussions([
      ...discussions,
      {
        id: Date.now().toString(),
        user_name: 'Kelvin Rudyanto',
        user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        user_rank: 'Gold',
        text: chatInputText,
        time: 'Just now'
      }
    ]);
    setChatInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* 1. HEADER: BANNER & QUICK CONTROLS */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 aspect-[3/1] sm:aspect-[4/1] lg:aspect-[5/1] shadow-md bg-white">
        <img
          src={community.image_url}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/40 to-transparent" />
        
        {/* Back navigation */}
        <button
          onClick={() => setRoute('communities')}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/95 backdrop-blur-md text-deep-navy shadow-md hover:scale-105 transition-all cursor-pointer border border-slate-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Community details overlay */}
        <div className="absolute bottom-4 inset-x-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-white bg-primary-blue/30 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                {sport.name} Division
              </span>
              <span className="text-[10px] font-mono text-white/85 flex items-center font-bold">
                <MapPin className="w-3.5 h-3.5 mr-0.5 text-rose-400" /> {community.city}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-none tracking-tight drop-shadow-md">
              {community.name} Space
            </h2>
            <p className="text-xs text-white/80 font-semibold line-clamp-1 drop-shadow-sm">{community.description}</p>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            <span className="text-xs text-white font-bold flex items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
              <Users className="w-4 h-4 mr-1.5 text-primary-blue" />
              {community.member_count.toLocaleString()} Athletes
            </span>

            <Button
              variant={isJoined ? 'secondary' : 'primary'}
              size="sm"
              onClick={onJoinToggle}
              className="text-xs font-bold"
            >
              {isJoined ? 'Leave Space' : 'Join Space'}
            </Button>
          </div>
        </div>
      </div>

      {/* 2. THREE-PANEL COMPOSITION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        
        {/* LEFT COMPARTMENT: CHANNELS (3 cols) */}
        <Card hoverEffect={false} className="lg:col-span-3 border border-slate-200/80 bg-white p-4 rounded-2xl flex flex-col justify-between h-full shadow-sm">
          <div className="space-y-4">
            <div className="px-1 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TEXT CHANNELS</span>
              <Hash className="w-4 h-4 text-slate-400" />
            </div>

            <nav className="space-y-1">
              {channels.map(channel => {
                const isActive = activeChannelId === channel.id;
                return (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannelId(channel.id)}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left border ${
                      isActive
                        ? 'bg-primary-blue/10 text-primary-blue border-primary-blue/20 font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-deep-navy hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-slate-400">#</span>
                    <span>{channel.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Voice channels mock info */}
          <div className="border-t border-slate-100 pt-4 mt-4 space-y-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">ACTIVE VOICE LOBBY</span>
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <div className="flex items-center space-x-2 text-xs">
                <Volume2 className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="font-extrabold text-slate-600">Court 2 Voice</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-500/8 px-2 py-0.5 rounded-full border border-emerald-500/15">3 in</span>
            </div>
          </div>
        </Card>

        {/* CENTER COMPARTMENT: DISCUSSIONS CHAT (6 cols) */}
        <Card hoverEffect={false} className="lg:col-span-6 border border-slate-200/80 bg-white p-5 rounded-2xl flex flex-col justify-between h-[500px] shadow-sm">
          {/* Channel Header */}
          <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="w-4.5 h-4.5 text-primary-blue" />
              <span className="text-sm font-black text-deep-navy">
                {channels.find(c => c.id === activeChannelId)?.name || 'chat'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono font-bold">Sync latency: 2ms</span>
          </div>

          {/* Chat feed body */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 scrollbar-thin">
            {discussions.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3 text-xs">
                <img
                  src={msg.user_avatar}
                  alt={msg.user_name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-deep-navy">{msg.user_name}</span>
                    <RankBadge rank={msg.user_rank} className="scale-75 origin-left" />
                    <span className="text-[9px] text-slate-400 font-mono font-semibold">{msg.time}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/50 font-semibold">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat input box */}
          <form onSubmit={handleSendMessage} className="flex space-x-2 mt-4 pt-3 border-t border-slate-100">
            <input
              type="text"
              disabled={!isJoined}
              placeholder={isJoined ? "Send message threads inside channel..." : "Join community space to contribute"}
              value={chatInputText}
              onChange={(e) => setChatInputText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!isJoined}
              className="bg-primary-blue hover:bg-opacity-95 text-white p-3 rounded-xl disabled:opacity-40 cursor-pointer flex items-center justify-center shadow-md shadow-primary-blue/10"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </Card>

        {/* RIGHT COMPARTMENT: EVENTS & GROUP LADDER (3 cols) */}
        <Card hoverEffect={false} className="lg:col-span-3 border border-slate-200/80 bg-white p-4 rounded-2xl space-y-6 shadow-sm">
          {/* Upcoming events inside space */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Upcoming Events</span>
            
            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1">
                <div className="font-extrabold text-deep-navy flex items-center justify-between">
                  <span>Saturday Runs Slot</span>
                  <Badge variant="blue" className="scale-75 origin-right">Court 3</Badge>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold flex items-center mt-1">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary-blue" />
                  Tomorrow, 7:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Group local leaderboard */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1 font-mono">Leaderboard Leaders</span>
            
            <div className="space-y-2 text-xs">
              {[
                { rank: 1, name: 'Jessica P.', points: 2850, tier: 'Elite' },
                { rank: 2, name: 'Kelvin R.', points: 2150, tier: 'Gold' },
                { rank: 3, name: 'Arya W.', points: 1980, tier: 'Gold' }
              ].map((ldr) => (
                <div key={ldr.rank} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60 font-semibold text-slate-600">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="font-mono font-extrabold text-primary-blue">{ldr.rank}</span>
                    <span className="font-extrabold text-deep-navy truncate">{ldr.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-600 font-bold">{ldr.points}p</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
