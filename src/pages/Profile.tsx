/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Shield, Award, MapPin, Zap, Flame, MessageSquare, Heart, 
  MessageCircle, Trophy, Activity, Calendar, Users, Star, Clock 
} from 'lucide-react';
import { User, Match, Post, Sport, TrackingActivity, ProgressEntry } from '../types';
import { Card, Button, RankBadge, Badge, Icon } from '../components/UIComponents';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { calculateAthletePerformance, getRankTierColors } from '../lib/avatar-utils';

// Import our Strava-inspired local seed data
import { MOCK_ACTIVITIES } from '../lib/activities';
import { MOCK_STATS } from '../lib/stats';
import { MOCK_CHALLENGES } from '../lib/challenges';
import { MOCK_ACHIEVEMENTS } from '../lib/achievements';
import { MOCK_CLUBS } from '../lib/clubs';

interface ProfileProps {
  currentUser: User;
  athlete: User; // Who we are viewing (can be the current user or someone else)
  posts: Post[];
  matches: Match[];
  sports: Sport[];
  setRoute: (route: string) => void;
  onChallenge?: () => void;
  onMessage?: () => void;
  progress?: ProgressEntry[];
}

export default function Profile({
  currentUser,
  athlete,
  posts,
  matches,
  sports,
  setRoute,
  onChallenge,
  onMessage,
  progress = []
}: ProfileProps) {
  const [activeSubTab, setActiveSubTab] = useState<'activities' | 'history' | 'posts' | 'badges'>('activities');

  const isOwnProfile = currentUser.id === athlete.id;

  // Calculate dynamic performance metrics based on user attributes & progress logs
  const performanceData = calculateAthletePerformance(athlete, progress);
  const athleteProgress = progress.filter(p => p.user_id === athlete.id);
  const avgPerformance = athleteProgress.length > 0
    ? Math.round(athleteProgress.reduce((sum, p) => sum + p.performance_score, 0) / athleteProgress.length)
    : Math.round(performanceData.reduce((sum, d) => sum + d.value, 0) / performanceData.length);
  const peakMetric = [...performanceData].sort((a, b) => b.value - a.value)[0];

  // Get dynamic colors based on the athlete's rank tier for consistent theme decoration
  const tierColors = getRankTierColors(athlete.rank_tier);
  let chartColor = '#0B5FFF';
  if (athlete.rank_tier.toLowerCase().includes('elite')) chartColor = '#9333EA';
  else if (athlete.rank_tier.toLowerCase().includes('diamond')) chartColor = '#06B6D4';
  else if (athlete.rank_tier.toLowerCase().includes('platinum')) chartColor = '#4F46E5';
  else if (athlete.rank_tier.toLowerCase().includes('gold')) chartColor = '#D97706';
  else if (athlete.rank_tier.toLowerCase().includes('silver')) chartColor = '#64748B';
  else if (athlete.rank_tier.toLowerCase().includes('bronze')) chartColor = '#8B5E3C';

  // Filter athlete's specific posts
  const athletePosts = posts.filter(p => p.user_id === athlete.id);

  // Filter athlete's specific matches
  const athleteMatches = matches.filter(m => m.challenger_id === athlete.id || m.opponent_id === athlete.id);

  // Filter athlete's tracking activities
  const athleteActivities = MOCK_ACTIVITIES.filter(act => act.user_id === athlete.id);

  const formattedDate = new Date(athlete.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  // Achievements selection
  const unlockedBadges = MOCK_ACHIEVEMENTS.filter(ach => ach.unlocked_at !== undefined);
  const lockedBadges = MOCK_ACHIEVEMENTS.filter(ach => ach.unlocked_at === undefined);

  // Weekly stats
  const weeklyStats = [
    { label: 'Total Activities', value: isOwnProfile ? MOCK_STATS.total_activities : 34 },
    { label: 'Total Distance', value: isOwnProfile ? `${MOCK_STATS.total_distance_km} km` : '124.2 km' },
    { label: 'Training Time', value: isOwnProfile ? `${MOCK_STATS.total_training_hours} hrs` : '42.5 hrs' },
    { label: 'Current Streak', value: isOwnProfile ? `${MOCK_STATS.current_streak_days} days` : '4 days' }
  ];

  // Personal Records
  const personalRecords = [
    { label: 'Fastest 5K Run', value: isOwnProfile ? MOCK_STATS.best_5k_pace : '4:45 /km', icon: 'Zap' },
    { label: 'Longest Activity', value: isOwnProfile ? MOCK_STATS.best_longest_duration : '01:45:00', icon: 'Clock' },
    { label: 'Most XP (Single)', value: '400 XP', icon: 'Trophy' },
    { label: 'Highest Win Streak', value: '8 Matches', icon: 'Flame' },
    { label: 'Most Calories Burned', value: '780 kcal', icon: 'Activity' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* 1. COVER BANNER SECTION */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-deep-navy via-deep-navy/95 to-slate-800 border border-slate-200/60 pb-6 shadow-md">
        <div className="h-40 bg-gradient-to-r from-primary-blue/30 via-black/10 to-transparent absolute inset-0"></div>
        
        {/* Profile Details Grid */}
        <div className="relative pt-24 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
            <img
              src={athlete.avatar_url}
              alt={athlete.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-900 shadow-2xl shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                  {athlete.name}
                </h2>
                <RankBadge rank={athlete.rank_tier} className="scale-90" />
              </div>
              <p className="text-xs text-white/70 font-bold font-mono">@{athlete.username} • Athlete since {formattedDate}</p>
              
              <p className="text-xs text-white/60 flex items-center justify-center sm:justify-start mt-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-rose-400 mr-1 shrink-0 animate-bounce" /> {athlete.city}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          {!isOwnProfile ? (
            <div className="flex space-x-2.5 w-full sm:w-auto">
              <Button variant="primary" size="md" className="flex-1 text-xs" onClick={onChallenge}>
                <Zap className="w-4 h-4 mr-1.5 text-yellow-300" />
                Challenge Sparring
              </Button>
              <Button variant="outline" size="md" className="text-xs bg-white text-deep-navy border-slate-300 hover:bg-slate-100" onClick={onMessage}>
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button variant="secondary" size="md" className="text-xs w-full sm:w-auto" onClick={() => setRoute('settings')}>
              Edit Profile Settings
            </Button>
          )}
        </div>
      </div>

      {/* 2. ATHLETE STATS DASHBOARD & BIO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Athlete Info Card */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Athlete Identity</h3>
          <div className="space-y-3.5 text-xs text-slate-600 font-semibold">
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Primary Sport</div>
              <div className="text-sm font-extrabold text-deep-navy mt-0.5">{athlete.main_sport}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Athlete Bio</div>
              <p className="italic text-slate-500 mt-1 leading-relaxed">"{athlete.bio}"</p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Reputation & Tier</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {athlete.reputation_score}% Fairplay Rep
                </span>
                <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  Level {athlete.skill_level}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly Stats overview */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Weekly Stats Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {weeklyStats.map((stat, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[9px] text-slate-400 uppercase font-mono">{stat.label}</span>
                <div className="text-sm font-black text-deep-navy">{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Goal Progress</span>
            <span className="text-emerald-500 font-bold">85% Complete</span>
          </div>
        </Card>

        {/* Personal Records Cards */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Personal Records (PRs)</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {personalRecords.map((rec, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100 last:border-0">
                <span className="text-slate-500 font-bold flex items-center">
                  <Icon name={rec.icon} className="w-3.5 h-3.5 mr-1 text-[#8B5E3C]" />
                  {rec.label}
                </span>
                <span className="text-deep-navy font-black font-mono">{rec.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* PERFORMANCE METRICS SECTION (RADAR CHART) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Radar Chart Card */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 md:col-span-2 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Performance Radar</h3>
              <h4 className="text-lg font-black text-deep-navy mt-1">Athletic Attributes Map</h4>
            </div>
            <Badge variant="blue" className="text-[10px] font-mono py-1">
              Based on {athleteProgress.length} Telemetry Logs
            </Badge>
          </div>
          
          <div className="flex-1 flex items-center justify-center py-2 relative">
            {performanceData && performanceData.length > 0 ? (
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#334155', fontSize: 10, fontWeight: '700' }} 
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{ fill: '#94a3b8', fontSize: 9 }}
                      axisLine={false}
                      tickCount={6}
                    />
                    <Radar
                      name="Attributes"
                      dataKey="value"
                      stroke={chartColor}
                      fill={chartColor}
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-400 italic py-10">
                Telemetry computation pending.
              </div>
            )}
          </div>
        </Card>

        {/* Evaluation & Diagnostics Card */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Diagnostics</h3>
              <h4 className="text-lg font-black text-deep-navy mt-1">Attribute Metrics</h4>
            </div>

            {/* Performance scores listing */}
            <div className="space-y-3">
              {performanceData.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">{metric.subject}</span>
                    <span className="text-deep-navy font-mono font-black">{metric.value}<span className="text-[10px] text-slate-400 font-normal">/100</span></span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${metric.value}%`,
                        backgroundColor: chartColor
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">Overall Rating:</span>
              <span className="text-sm font-black text-deep-navy font-mono">{avgPerformance} / 100</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 font-semibold leading-relaxed">
              <div className="text-[9px] font-black uppercase text-slate-400 font-mono mb-1">Peak Performance</div>
              <span>
                Peak capability identified in <strong className="text-deep-navy font-bold">{peakMetric.subject}</strong> with a score of <strong className="text-deep-navy font-bold">{peakMetric.value}</strong>.
                {athleteProgress.length > 0 
                  ? ' Dynamic performance curves calculated from your real-time workout durations and practice records.'
                  : ` Standard baseline calculated for ${athlete.main_sport} at ${athlete.rank_tier} tier.`}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. LOWER CONTENT TABS */}
      <div className="space-y-4">
        {/* Tabs Headers */}
        <div className="flex border-b border-slate-200 pb-2 gap-4 overflow-x-auto">
          {[
            { id: 'activities', label: 'Recent Activities' },
            { id: 'history', label: 'Sparring History' },
            { id: 'posts', label: 'Social Posts Grid' },
            { id: 'badges', label: 'Achievement Badges' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-primary-blue/10 text-primary-blue border-primary-blue/15 font-extrabold'
                  : 'border-transparent text-slate-400 hover:text-deep-navy hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Viewports */}
        <div>
          {/* Recent Activities */}
          {activeSubTab === 'activities' && (
            <div className="space-y-4">
              {athleteActivities.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 italic">
                  No tracking logs synchronized.
                </div>
              ) : (
                athleteActivities.map((act) => (
                  <Card key={act.id} hoverEffect={false} className="bg-white border border-slate-200/80 p-5 space-y-3.5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[#8B5E3C]">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-deep-navy">{act.title}</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{act.location} • {new Date(act.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge variant="blue">{act.sport_name}</Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-semibold">
                      {act.distance && (
                        <div>
                          <div className="text-[9px] text-slate-400 font-mono">Distance</div>
                          <div className="text-xs font-black text-deep-navy">{act.distance}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-[9px] text-slate-400 font-mono">Duration</div>
                        <div className="text-xs font-black text-deep-navy">{act.duration}</div>
                      </div>
                      {act.pace && (
                        <div>
                          <div className="text-[9px] text-slate-400 font-mono">Pace</div>
                          <div className="text-xs font-black text-deep-navy">{act.pace}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-[9px] text-slate-400 font-mono">Calories</div>
                        <div className="text-xs font-black text-deep-navy">{act.calories} kcal</div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Sparring Match & Tournament History */}
          {activeSubTab === 'history' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono mb-3">Sparring Lobby Engagements</h4>
                {athleteMatches.length === 0 ? (
                  <div className="text-center py-6 bg-white rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 italic">
                    No sparring matches recorded in the history log.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {athleteMatches.map((m) => {
                      const sp = sports.find(s => s.id === m.sport_id) || sports[0];
                      return (
                        <Card key={m.id} hoverEffect className="border border-slate-200 bg-white p-4.5 space-y-3 shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-slate-400 font-bold">{new Date(m.scheduled_at).toLocaleDateString()}</span>
                            <Badge variant={m.status === 'Completed' ? 'green' : 'blue'}>{m.status}</Badge>
                          </div>
                          <h5 className="text-xs font-black text-deep-navy flex items-center">
                            <Icon name={sp.icon} className="w-4 h-4 mr-1.5 text-primary-blue" />
                            {sp.name} sparring
                          </h5>
                          <p className="text-[11px] text-slate-500 font-semibold">{m.location}</p>
                          {m.result && (
                            <p className="text-xs text-yellow-600 font-bold border-t border-slate-100 pt-2 mt-2 flex items-center">
                              <Zap className="w-3.5 h-3.5 mr-1 text-yellow-500 animate-bounce" /> Result: {m.result}
                            </p>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Posts Grid */}
          {activeSubTab === 'posts' && (
            <div className="space-y-4">
              {athletePosts.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 italic">
                  No social feeds published.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {athletePosts.map((post) => {
                    const sport = sports.find(s => s.id === post.sport_id) || sports[0];
                    return (
                      <Card key={post.id} hoverEffect={false} className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] text-slate-400 font-mono font-bold">{new Date(post.created_at).toLocaleDateString()}</span>
                            <Badge variant="blue">{sport.name}</Badge>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-4">"{post.content}"</p>
                        </div>
                        {post.image_url && (
                          <img src={post.image_url} alt="Post content" className="rounded-xl w-full h-32 object-cover border border-slate-100 mb-3" />
                        )}
                        <div className="flex items-center space-x-4 text-slate-400 text-[10px] font-mono font-bold">
                          <span className="flex items-center"><Heart className="w-3.5 h-3.5 mr-1 text-rose-500 fill-current" /> {post.likes_count} Likes</span>
                          <span className="flex items-center"><MessageCircle className="w-3.5 h-3.5 mr-1 text-primary-blue" /> {post.comments_count} Comments</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Unlocked Badges */}
          {activeSubTab === 'badges' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono mb-4">Unlocked Achievement Badges</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {unlockedBadges.map((ach) => (
                    <Card key={ach.id} hoverEffect className="bg-white border border-slate-200/85 p-4 flex items-start space-x-3.5 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                        <Icon name={ach.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-deep-navy flex items-center">
                          {ach.name}
                          <span className="ml-2 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 uppercase tracking-wider">UNLOCKED</span>
                        </h5>
                        <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{ach.description}</p>
                        <p className="text-[9px] text-slate-400 font-mono mt-1.5">Claimed on {ach.unlocked_at} • Reward: +{ach.xp_value} XP</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono mb-4">Locked Achievements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-50">
                  {lockedBadges.map((ach) => (
                    <Card key={ach.id} hoverEffect={false} className="bg-slate-50 border border-slate-200 p-4 flex items-start space-x-3.5 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <Icon name="Lock" className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-500 flex items-center">
                          {ach.name}
                        </h5>
                        <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{ach.description}</p>
                        <p className="text-[9px] text-slate-400 font-mono mt-1.5">Locked • Completing unlocks: +{ach.xp_value} XP</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
