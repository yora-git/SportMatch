/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Flame, Trophy, Zap, Calendar, ArrowRight, Activity, Users, 
  Target, Award, Shield, Heart, Clock, MapPin, ThumbsUp, 
  MessageSquare, Share2, Bookmark, Star, Crown, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { User, Match, Community, Tournament, Sport, TrackingActivity, LocalChallenge, Club } from '../types';
import { Card, Button, RankBadge, StatCard, ProgressChart, Badge } from '../components/UIComponents';
import MatchCard from '../components/MatchCard';
import TournamentCard from '../components/TournamentCard';

// Import our Strava-inspired local tracking data
import { MOCK_ACTIVITIES } from '../lib/activities';
import { MOCK_STATS } from '../lib/stats';
import { MOCK_CHALLENGES } from '../lib/challenges';
import { MOCK_ACHIEVEMENTS } from '../lib/achievements';
import { MOCK_CLUBS } from '../lib/clubs';
import { MOCK_GOALS } from '../lib/goals';

interface DashboardProps {
  currentUser: User;
  athletes: User[];
  matches: Match[];
  communities: Community[];
  tournaments: Tournament[];
  sports: Sport[];
  progress?: any[];
  setRoute: (route: string) => void;
  setSelectedCommunityId: (id: string) => void;
  onMatchStatusChange: (matchId: string, status: 'Accepted' | 'Declined' | 'Completed') => void;
}

export default function Dashboard({
  currentUser,
  athletes,
  matches,
  communities,
  tournaments,
  sports,
  progress,
  setRoute,
  setSelectedCommunityId,
  onMatchStatusChange
}: DashboardProps) {
  // Activity Feed States
  const [activities, setActivities] = useState<TrackingActivity[]>(MOCK_ACTIVITIES);
  const [challenges, setChallenges] = useState<LocalChallenge[]>(MOCK_CHALLENGES);
  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);
  
  // Interactive comments simulation
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [commentsByPost, setCommentsByPost] = useState<{ [postId: string]: { author: string; text: string }[] }>({
    act_1: [
      { author: 'Arya Wibowo', text: 'Incredible speed man! Your smash is getting dangerous.' },
      { author: 'Jessica Putri', text: 'Let’s sparring doubles this weekend!' }
    ]
  });

  const handleRespectToggle = (id: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id !== id) return act;
      return {
        ...act,
        has_respected: !act.has_respected,
        respect_count: act.has_respected ? act.respect_count - 1 : act.respect_count + 1
      };
    }));
  };

  const handleSaveToggle = (id: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id !== id) return act;
      return {
        ...act,
        has_saved: !act.has_saved
      };
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const newComment = {
      author: currentUser.name,
      text: commentInput.trim()
    };
    setCommentsByPost(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));
    setActivities(prev => prev.map(act => {
      if (act.id !== postId) return act;
      return {
        ...act,
        comment_count: act.comment_count + 1
      };
    }));
    setCommentInput('');
  };

  const handleJoinChallengeToggle = (challengeId: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id !== challengeId) return ch;
      return {
        ...ch,
        is_joined: !ch.is_joined,
        participants_count: ch.is_joined ? ch.participants_count - 1 : ch.participants_count + 1
      };
    }));
  };

  const handleJoinClubToggle = (clubId: string) => {
    setClubs(prev => prev.map(cl => {
      if (cl.id !== clubId) return cl;
      return {
        ...cl,
        is_joined: !cl.is_joined,
        member_count: cl.is_joined ? cl.member_count - 1 : cl.member_count + 1
      };
    }));
  };

  // Get upcoming and pending matches for user
  const activeMatches = matches.filter(m => m.status === 'Accepted' || m.status === 'Pending');

  // Personal Records highlight
  const personalRecords = [
    { label: 'Fastest 5K Run', value: MOCK_STATS.best_5k_pace, detail: 'Gasibu Loop, Bandung', icon: 'Zap', color: 'text-amber-500 bg-amber-500/8' },
    { label: 'Longest Activity', value: MOCK_STATS.best_longest_duration, detail: 'Tennis Drilling Session', icon: 'Clock', color: 'text-primary-blue bg-primary-blue/8' },
    { label: 'Highest Win Streak', value: '8 Matches', detail: 'Badminton Division', icon: 'Flame', color: 'text-rose-500 bg-rose-500/8' },
    { label: 'Best Tournament Result', value: 'Runner-up v3', detail: 'Bandung Smash Championship', icon: 'Trophy', color: 'text-emerald-500 bg-emerald-500/8' }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
        <div>
          <div className="flex items-center space-x-2 text-primary-blue mb-1">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Session Synced • Jatim/Bandung GPS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
            Rise Up, <span className="blue-gradient-text">{currentUser.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Championship Ladder: <span className="text-primary-blue font-bold">{currentUser.rank_tier} Tier</span> • Win rate {MOCK_STATS.win_rate}% • You earned {MOCK_STATS.xp_earned} XP this season.
          </p>
        </div>
        
        <div className="flex space-x-2.5">
          <Button variant="bronze" size="sm" onClick={() => setRoute('match')} className="shadow-sm">
            <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400 animate-bounce" />
            Lobby Sparring
          </Button>
          <Button variant="outline" size="sm" onClick={() => setRoute('progress')} className="border-slate-200 text-slate-600">
            <Activity className="w-3.5 h-3.5 mr-1.5 text-primary-blue" />
            My Analytics
          </Button>
        </div>
      </div>

      {/* 2. TODAY'S SUMMARY & RANK TRACKING */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Today's Stats */}
        <div className="bg-gradient-to-br from-deep-navy to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden md:col-span-2 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/10 rounded-full filter blur-xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Today's Summary</span>
              <span className="text-[10px] bg-primary-blue/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">ON TRACK</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 my-2">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Distance</div>
                <div className="text-xl font-black text-brand-white">13.4 km</div>
                <div className="text-[9px] text-emerald-400 font-mono">+5% vs avg</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Time Active</div>
                <div className="text-xl font-black text-brand-white">108 mins</div>
                <div className="text-[9px] text-slate-500 font-mono">Avg: 90 mins</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Calories</div>
                <div className="text-xl font-black text-brand-white">1,010 kcal</div>
                <div className="text-[9px] text-amber-400 font-mono">Streak: {MOCK_STATS.current_streak_days}d</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-[#8B5E3C]" /> Bandung Area Sync</span>
            <span className="font-mono text-emerald-400 font-semibold flex items-center">Active Streak <Flame className="w-3.5 h-3.5 ml-1 text-amber-500" /></span>
          </div>
        </div>

        {/* Weekly Activity Progress with miniature chart */}
        <Card hoverEffect className="flex flex-col justify-between bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Weekly Training volume</span>
            <span className="text-[10px] bg-emerald-500/8 text-emerald-600 border border-emerald-500/15 px-2 py-0.5 rounded-full font-mono font-bold">
              ACTIVE
            </span>
          </div>
          <div>
            <h3 className="text-xl font-black text-deep-navy">{MOCK_STATS.total_training_hours} <span className="text-xs text-slate-400 font-normal">hours completed</span></h3>
            <p className="text-[10px] text-slate-400 italic">Weekly target: 5 hours (85% reached)</p>
            <div className="mt-2.5">
              <ProgressChart data={[30, 45, 25, 80, 50, 95]} />
            </div>
          </div>
        </Card>

        {/* Rank Progress bar */}
        <Card hoverEffect className="flex flex-col justify-between bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Championship Rank</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <RankBadge rank={currentUser.rank_tier} className="scale-100" />
            </div>
            <div className="text-sm font-extrabold text-deep-navy">2,150 Match Points</div>
            <p className="text-[10px] text-slate-400 mt-1">Win Rate: {MOCK_STATS.win_rate}% • Next level: Platinum Tier</p>
            
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-[#8B5E3C] rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
              <span>68% completed</span>
              <span>350 pts to Platinum</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. MAIN DASHBOARD SPLIT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: ACTIVITY FEED & PERSONAL RECORDS (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SECTION: ATHLETE ACTIVITY FEED */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-black text-deep-navy flex items-center">
                  <Activity className="w-5 h-5 text-primary-blue mr-2" />
                  Athlete Activity Feed
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Real athletic logging from Jatim & West Java communities</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setRoute('progress')} className="text-xs">
                Log New Workout
              </Button>
            </div>

            <div className="space-y-6">
              {activities.map((act) => {
                const isUser = act.user_id === currentUser.id;
                const isCommentOpen = activeCommentPostId === act.id;
                const postComments = commentsByPost[act.id] || [];

                return (
                  <Card key={act.id} className="bg-white border border-slate-200/80 shadow-sm p-6 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <img
                          src={act.athlete_avatar}
                          alt={act.athlete_name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-extrabold text-xs text-deep-navy hover:text-primary-blue cursor-pointer" onClick={() => setRoute('profile')}>
                              {act.athlete_name}
                            </h4>
                            {isUser && <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-mono">YOU</span>}
                          </div>
                          <p className="text-[10px] text-slate-400 flex items-center space-x-1 font-mono">
                            <span>{act.location}</span>
                            <span>•</span>
                            <span>{new Date(act.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                          </p>
                        </div>
                      </div>
                      
                      {/* Sport Badge & Icon */}
                      <Badge variant={act.sport_name === 'Badminton' ? 'blue' : act.sport_name === 'Running' ? 'bronze' : 'green'}>
                        <Zap className="w-3 h-3 mr-1" />
                        {act.sport_name}
                      </Badge>
                    </div>

                    {/* Post Content & Title */}
                    <div>
                      <h3 className="font-extrabold text-sm text-deep-navy hover:text-primary-blue transition-colors cursor-pointer">
                        {act.title}
                      </h3>
                      {act.notes && <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{act.notes}</p>}
                    </div>

                    {/* Premium Data Rich Metrics Widget */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 bg-slate-50/70 border border-slate-100 rounded-xl p-4.5">
                      {act.distance && (
                        <div>
                          <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Distance</div>
                          <div className="text-sm font-black text-deep-navy">{act.distance}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Duration</div>
                        <div className="text-sm font-black text-deep-navy">{act.duration}</div>
                      </div>
                      {act.pace && (
                        <div>
                          <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Avg Pace</div>
                          <div className="text-sm font-black text-deep-navy">{act.pace}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Est. Calories</div>
                        <div className="text-sm font-black text-deep-navy">{act.calories} kcal</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Heart Rate</div>
                        <div className="text-sm font-black text-deep-navy text-rose-500 flex items-center font-mono">
                          <Heart className="w-3.5 h-3.5 mr-1 text-rose-500 fill-rose-500 animate-pulse" />
                          {act.heart_rate} bpm
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Intensity</div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${act.intensity === 'High-intensity' || act.intensity === 'Extreme' ? 'text-rose-600 bg-rose-50 border border-rose-100' : 'text-slate-600 bg-slate-100'}`}>
                          {act.intensity}
                        </span>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Rewards</div>
                        <div className="text-xs font-bold text-amber-600 flex items-center">
                          <Trophy className="w-3 h-3 mr-0.5 text-amber-500" />
                          +{act.xp_earned} XP
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider font-mono">Records</div>
                        {act.is_personal_record ? (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 flex items-center w-max font-mono">
                            <Star className="w-3 h-3 mr-0.5 fill-emerald-500 text-emerald-500" /> PR INDICATOR
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono">Standard Match</span>
                        )}
                      </div>
                    </div>

                    {/* Route Location Preview UI */}
                    <div className="relative h-20 rounded-xl overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-200 flex items-center px-4">
                      {/* Graphic path simulation */}
                      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,50 Q25,10 50,80 T100,20" fill="none" stroke="#0B5FFF" strokeWidth="4" />
                      </svg>
                      <div className="z-10 flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary-blue shadow-sm border border-slate-100">
                            <MapPin className="w-4 h-4 text-primary-blue" />
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400 uppercase font-mono">Route Preview</div>
                            <div className="text-xs font-bold text-deep-navy">{act.location}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-white/80 border border-slate-200/50 px-2 py-1 rounded-md text-slate-600">
                          Verified GPS Trace
                        </span>
                      </div>
                    </div>

                    {/* Badges and Social Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-100 gap-3">
                      <div className="flex items-center space-x-2">
                        {act.achievement_badge && (
                          <div className="flex items-center space-x-1.5 bg-amber-500/8 border border-amber-500/15 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase">
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>{act.achievement_badge}</span>
                          </div>
                        )}
                      </div>

                      {/* Social Interactions */}
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleRespectToggle(act.id)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${act.has_respected ? 'bg-primary-blue text-white shadow-sm shadow-primary-blue/25' : 'bg-slate-50 border border-slate-200/80 text-slate-500 hover:text-deep-navy hover:bg-slate-100'}`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${act.has_respected ? 'fill-white' : ''}`} />
                          <span>Respect ({act.respect_count})</span>
                        </button>

                        <button 
                          onClick={() => setActiveCommentPostId(isCommentOpen ? null : act.id)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${isCommentOpen ? 'bg-deep-navy text-white' : 'bg-slate-50 border border-slate-200/80 text-slate-500 hover:text-deep-navy hover:bg-slate-100'}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Comments ({act.comment_count})</span>
                        </button>

                        <button 
                          onClick={() => handleSaveToggle(act.id)}
                          className={`p-2 rounded-full cursor-pointer transition-all ${act.has_saved ? 'text-amber-500 bg-amber-50' : 'bg-slate-50 border border-slate-200/80 text-slate-400 hover:text-deep-navy'}`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${act.has_saved ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Comments drawer */}
                    {isCommentOpen && (
                      <div className="border-t border-slate-100 pt-4 space-y-3 bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                        {postComments.length > 0 && (
                          <div className="space-y-2.5">
                            {postComments.map((comment, i) => (
                              <div key={i} className="bg-white p-3 rounded-xl border border-slate-200/60 text-xs">
                                <div className="font-extrabold text-deep-navy">{comment.author}</div>
                                <div className="text-slate-600 mt-1">{comment.text}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add athlete response..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(act.id)}
                            className="flex-1 text-xs bg-white border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-blue text-deep-navy"
                          />
                          <Button size="sm" onClick={() => handleAddComment(act.id)} className="px-4">
                            Send
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* SECTION: ATHLETE PERSONAL RECORDS */}
          <div>
            <h3 className="text-lg font-black text-deep-navy mb-4 flex items-center">
              <Trophy className="w-5 h-5 text-amber-500 mr-2" />
              Athlete Personal Records
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalRecords.map((rec, idx) => (
                <Card key={idx} hoverEffect className="bg-white border border-slate-200/80 p-5 flex items-start space-x-4 shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${rec.color}`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">{rec.label}</div>
                    <div className="text-base font-black text-deep-navy mt-0.5">{rec.value}</div>
                    <p className="text-[10px] text-slate-400">{rec.detail}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LOCAL CHALLENGES, RECOMMENDED MATCHES & TOURNAMENTS (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* SECTION: LOCAL CHALLENGES */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-deep-navy flex items-center">
                <Compass className="w-4.5 h-4.5 text-primary-blue mr-2" />
                Local Challenges
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono bg-slate-100 px-2.5 py-0.5 rounded-full">GEOTRACKED</span>
            </div>

            <div className="space-y-4">
              {challenges.map((ch) => (
                <div 
                  key={ch.id} 
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary-blue/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <div>
                      <h4 className="font-extrabold text-xs text-deep-navy group-hover:text-primary-blue transition-colors">
                        {ch.name}
                      </h4>
                      <div className="text-[10px] text-slate-400 flex items-center space-x-1 mt-0.5 font-mono">
                        <MapPin className="w-3 h-3 text-slate-300" />
                        <span>{ch.location}</span>
                      </div>
                    </div>
                    <Badge variant={ch.sport === 'Running' ? 'bronze' : 'blue'}>
                      {ch.sport}
                    </Badge>
                  </div>

                  {/* Leaderboard preview */}
                  <div className="bg-slate-50/70 rounded-xl p-2.5 my-2 text-[10px] border border-slate-100">
                    <div className="font-mono text-slate-400 uppercase tracking-widest text-[8px] mb-1">Challenge Top Leaders</div>
                    {ch.leaderboard_preview.map((l, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-slate-100/50 last:border-0">
                        <span className="text-slate-500 font-bold font-mono">{l.rank}. {l.name}</span>
                        <span className="text-deep-navy font-semibold">{l.score}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400 my-1">
                    <span>{ch.participants_count.toLocaleString()} registered</span>
                    <span className="text-rose-500 font-mono font-bold">{ch.time_remaining}</span>
                  </div>

                  <button
                    onClick={() => handleJoinChallengeToggle(ch.id)}
                    className={`mt-2.5 w-full text-xs font-bold py-2 rounded-xl transition-all cursor-pointer text-center border ${ch.is_joined ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-deep-navy'}`}
                  >
                    {ch.is_joined ? 'Joined Challenge ✓' : 'Join Challenge'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: CLUBS & SPORTS CLUBS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-deep-navy flex items-center">
                <Users className="w-4.5 h-4.5 text-primary-blue mr-2" />
                Regional Sports Clubs
              </h3>
            </div>

            <div className="space-y-4">
              {clubs.map((club) => (
                <div 
                  key={club.id} 
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary-blue/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-extrabold text-xs text-deep-navy">
                        {club.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono flex items-center mt-0.5">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-300" />
                        {club.location}
                      </p>
                    </div>
                    <Badge variant="blue">
                      Rank #{club.club_rank}
                    </Badge>
                  </div>

                  {/* Club Latest Activity Spark */}
                  <div className="bg-slate-50 rounded-xl p-2.5 my-2.5 border border-slate-100 text-[10px]">
                    <div className="font-mono text-slate-400 uppercase tracking-widest text-[8px] mb-1">Latest Club Log</div>
                    <div className="font-extrabold text-deep-navy truncate">{club.latest_activity_preview.athlete_name}</div>
                    <div className="text-slate-500 truncate mt-0.5">{club.latest_activity_preview.activity_title}</div>
                    <div className="text-slate-400 font-mono text-[9px] mt-1 text-right">{club.latest_activity_preview.time_ago}</div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pb-2 border-b border-slate-100">
                    <span>{club.member_count.toLocaleString()} members</span>
                    <span>{club.weekly_activities_count} weekly activities</span>
                  </div>

                  <button
                    onClick={() => handleJoinClubToggle(club.id)}
                    className={`mt-2.5 w-full text-xs font-bold py-2 rounded-xl transition-all cursor-pointer text-center border ${club.is_joined ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-primary-blue border-primary-blue text-white hover:bg-opacity-95'}`}
                  >
                    {club.is_joined ? 'Joined Club ✓' : 'Join Club'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: ACTIVE MATCHING & SPAR SCHEDULE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-deep-navy flex items-center">
                <Calendar className="w-4.5 h-4.5 text-primary-blue mr-2" />
                Sparring Schedule
              </h3>
              <button onClick={() => setRoute('match')} className="text-xs text-primary-blue hover:underline font-bold">
                See all
              </button>
            </div>

            {activeMatches.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 p-6 rounded-2xl text-center space-y-2">
                <p className="text-xs text-slate-400">No matching slots booked.</p>
                <Button variant="outline" size="sm" onClick={() => setRoute('match')} className="text-xs">
                  Request Spar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeMatches.slice(0, 1).map((match) => {
                  const ch = athletes.find(a => a.id === match.challenger_id) || currentUser;
                  const op = athletes.find(a => a.id === match.opponent_id) || currentUser;
                  const sp = sports.find(s => s.id === match.sport_id) || sports[0];
                  return (
                    <MatchCard
                      key={match.id}
                      match={match}
                      challenger={ch}
                      opponent={op}
                      sport={sp}
                      isCurrentUserChallenger={match.challenger_id === currentUser.id}
                      onAccept={() => onMatchStatusChange(match.id, 'Accepted')}
                      onDecline={() => onMatchStatusChange(match.id, 'Declined')}
                      onLogResult={() => onMatchStatusChange(match.id, 'Completed')}
                      onMessage={() => setRoute('feed')}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION: TOURNAMENT CUPS */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-deep-navy flex items-center">
              <Trophy className="w-4.5 h-4.5 text-amber-600 mr-2" />
              Tournament Cups
            </h3>
            <div className="space-y-4">
              {tournaments.slice(0, 1).map((tour) => {
                const sp = sports.find(s => s.id === tour.sport_id) || sports[0];
                return (
                  <TournamentCard
                    key={tour.id}
                    tournament={tour}
                    sport={sp}
                    onRegisterToggle={() => alert(`Registration details updated for ${tour.name}.`)}
                  />
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

// Inline Geo Compass helper icon
function Compass({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
  );
}
