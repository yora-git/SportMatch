/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Activity, Award, PlayCircle, BarChart3, TrendingUp, Calendar, 
  MapPin, Flame, Trophy, Shield, Star, Sparkles, CheckCircle2, ChevronRight, Zap, Target, Clock, Heart 
} from 'lucide-react';
import { User, Sport, TrackingActivity, Goal, LocalChallenge } from '../types';
import { Card, Button, Badge, RankBadge, Icon } from '../components/UIComponents';

// Import our rich tracking database
import { MOCK_ACTIVITIES } from '../lib/activities';
import { MOCK_STATS } from '../lib/stats';
import { MOCK_GOALS } from '../lib/goals';
import { MOCK_ACHIEVEMENTS } from '../lib/achievements';
import { MOCK_CLUBS } from '../lib/clubs';

interface ProgressProps {
  currentUser: User;
  progress: any[];
  sports: Sport[];
  onAddProgress: (sportId: string, activityType: string, duration: number, performance: number, notes: string) => void;
}

export default function Progress({
  currentUser,
  progress,
  sports,
  onAddProgress
}: ProgressProps) {
  // Local state for user's logged sessions
  const [loggedActivities, setLoggedActivities] = useState<TrackingActivity[]>(MOCK_ACTIVITIES);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [showAddLog, setShowAddLog] = useState(false);

  // Form states
  const [sportId, setSportId] = useState(sports[0]?.id || 'sport_badminton');
  const [activityTitle, setActivityTitle] = useState('Morning Cardio Session');
  const [durationMins, setDurationMins] = useState(45);
  const [distanceKm, setDistanceKm] = useState('5.0 km');
  const [calories, setCalories] = useState(380);
  const [heartRate, setHeartRate] = useState(150);
  const [intensity, setIntensity] = useState<'Low' | 'Moderate' | 'Tempo' | 'High-intensity' | 'Extreme'>('Tempo');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('Bandung Sports Center');

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const sportObj = sports.find(s => s.id === sportId) || sports[0];
    
    const newActivity: TrackingActivity = {
      id: 'act_' + Date.now(),
      user_id: currentUser.id,
      athlete_name: currentUser.name,
      athlete_avatar: currentUser.avatar_url,
      sport_id: sportId,
      sport_name: sportObj.name,
      sport_icon: sportObj.icon,
      title: activityTitle,
      distance: distanceKm ? `${distanceKm}` : undefined,
      duration: `${Math.floor(durationMins / 60).toString().padStart(2, '0')}:${(durationMins % 60).toString().padStart(2, '0')}:00`,
      duration_minutes: durationMins,
      calories: calories,
      pace: distanceKm ? `${(durationMins / parseFloat(distanceKm)).toFixed(2)} /km` : undefined,
      heart_rate: heartRate,
      intensity: intensity,
      is_personal_record: Math.random() > 0.7,
      xp_earned: durationMins * 3,
      reputation_gained: 10,
      location: location,
      date: new Date().toISOString(),
      respect_count: 0,
      comment_count: 0,
      has_respected: false,
      has_saved: false,
      notes: notes
    };

    setLoggedActivities([newActivity, ...loggedActivities]);
    
    // Call parent prop to sync global progressEntries
    if (typeof onAddProgress === 'function') {
      onAddProgress(sportId, activityTitle, durationMins, 85, notes);
    }
    
    // Simulate updating goals
    setGoals(prev => prev.map(g => {
      if (g.type === 'weekly_time') {
        const numericCurrent = parseInt(g.current) + durationMins;
        const targetVal = parseInt(g.target);
        const percent = Math.min(100, Math.round((numericCurrent / targetVal) * 100));
        return {
          ...g,
          current: `${numericCurrent} Mins`,
          progress_percent: percent,
          remaining: percent >= 100 ? '0 Mins (Achieved)' : `${targetVal - numericCurrent} Mins`,
          is_completed: percent >= 100
        };
      }
      return g;
    }));

    // Reset Form
    setShowAddLog(false);
    setNotes('');
    setActivityTitle('Morning Cardio Session');
    alert("Athletic activity synchronized successfully with SportMatch servers!");
  };

  // Metrics calculators
  const totalMins = loggedActivities.reduce((acc, curr) => acc + curr.duration_minutes, 0);
  const totalDistance = loggedActivities.reduce((acc, curr) => {
    if (!curr.distance) return acc;
    return acc + parseFloat(curr.distance);
  }, 0);
  const totalCalories = loggedActivities.reduce((acc, curr) => acc + curr.calories, 0);

  // Weekly summary array
  const weeklySummary = [
    { label: 'Weekly Distance', value: `${totalDistance.toFixed(1)} km`, sub: 'Target: 40 km' },
    { label: 'Active Duration', value: `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`, sub: 'Target: 5 hours' },
    { label: 'Energy Burned', value: `${totalCalories.toLocaleString()} kcal`, sub: 'Target: 2,500 kcal' },
    { label: 'Logged Sessions', value: `${loggedActivities.length} Workouts`, sub: 'Target: 5 workouts' }
  ];

  // Insights messages
  const insights = [
    { type: 'strength', text: 'Your jump smash cardio efficiency increased by 14% this week. Keep hitting Gasibu Run loops to build leg endurance!' },
    { type: 'milestone', text: 'Congratulations! You unlocked the Pace Breaker achievement badge on your Gasibu 5km tempo run.' },
    { type: 'pacing', text: 'Your average flat pace is 4:33/km. Try aiming for 4:25/km on your next segment at Jatinangor.' }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      
      {/* HEADER TITLE SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
        <div>
          <div className="flex items-center space-x-2 text-primary-blue mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Performance Analytics Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
            Athletic <span className="blue-gradient-text">Progression Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Strava-inspired telemetry logs, performance metrics, training streaks, and regional challenges.
          </p>
        </div>
        
        <Button variant="primary" size="sm" onClick={() => setShowAddLog(!showAddLog)} className="shadow-md">
          <PlayCircle className="w-4 h-4 mr-1.5" />
          Add Activity Log
        </Button>
      </div>

      {/* MODAL / DROPDOWN: ADD ACTIVITY LOG */}
      {showAddLog && (
        <Card hoverEffect={false} className="border border-slate-200 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center space-x-2 text-deep-navy mb-4 border-b border-slate-100 pb-2">
            <PlayCircle className="w-5 h-5 text-primary-blue" />
            <h3 className="text-base font-black">Sync New Athlete Session</h3>
          </div>
          
          <form onSubmit={handleAddWorkout} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Select Sport</label>
                <select
                  value={sportId}
                  onChange={(e) => setSportId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-600 focus:outline-none focus:border-primary-blue cursor-pointer font-semibold"
                >
                  {sports.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Activity Title</label>
                <input
                  type="text"
                  required
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Location Hub</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Duration (Mins)</label>
                <input
                  type="number"
                  required
                  min={5}
                  value={durationMins}
                  onChange={(e) => setDurationMins(parseInt(e.target.value) || 30)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Distance (e.g. 5.0 km)</label>
                <input
                  type="text"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                  placeholder="0.0 km (or empty)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Heart Rate (Avg BPM)</label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(parseInt(e.target.value) || 140)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Est. Calories</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(parseInt(e.target.value) || 350)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Intensity Threshold</label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-600 focus:outline-none focus:border-primary-blue cursor-pointer font-semibold"
                >
                  <option value="Low">Low - Warmup</option>
                  <option value="Moderate">Moderate - Recovery</option>
                  <option value="Tempo">Tempo - Aerobic</option>
                  <option value="High-intensity">High-Intensity - Anaerobic</option>
                  <option value="Extreme">Extreme - Redline</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Workout Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Feet felt highly responsive. Smash timing is improving."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2.5 pt-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowAddLog(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">Complete Log</Button>
            </div>
          </form>
        </Card>
      )}

      {/* 1. WEEKLY & MONTHLY SUMMARIES */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {weeklySummary.map((item, idx) => (
          <Card key={idx} hoverEffect className="bg-white border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-black font-mono tracking-wider text-slate-400 uppercase">{item.label}</span>
            <div className="mt-3">
              <h3 className="text-xl font-black text-deep-navy">{item.value}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{item.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* 2. PROGRESS CHARTS GRID (Tailwind Rendered) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Weekly Activity Volume Chart */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <span className="text-[10px] font-black font-mono tracking-wider text-slate-400 uppercase">Weekly Active Volume</span>
            <Calendar className="w-4 h-4 text-[#8B5E3C]" />
          </div>
          
          {/* Interactive CSS-rendered bar chart */}
          <div className="space-y-2 py-2">
            {[
              { day: 'Monday', value: '45 mins', pct: '45%' },
              { day: 'Tuesday', value: '90 mins', pct: '90%' },
              { day: 'Wednesday', value: '0 mins', pct: '0%' },
              { day: 'Thursday', value: '120 mins', pct: '100%' },
              { day: 'Friday', value: '60 mins', pct: '60%' },
              { day: 'Saturday', value: '85 mins', pct: '85%' },
              { day: 'Sunday', value: '0 mins', pct: '0%' }
            ].map((d, i) => (
              <div key={i} className="flex items-center text-xs justify-between">
                <span className="w-16 font-bold text-slate-500">{d.day}</span>
                <div className="flex-1 h-3 bg-slate-50 border border-slate-200/50 rounded-full overflow-hidden mx-3">
                  <div className="h-full bg-primary-blue rounded-full" style={{ width: d.pct }}></div>
                </div>
                <span className="w-16 text-right text-deep-navy font-mono font-black">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Sport Distribution Chart */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <span className="text-[10px] font-black font-mono tracking-wider text-slate-400 uppercase">Sport Distribution</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          
          <div className="space-y-3.5 py-2.5">
            {[
              { sport: 'Badminton', percentage: '45%', color: 'bg-primary-blue' },
              { sport: 'Running', percentage: '30%', color: 'bg-[#8B5E3C]' },
              { sport: 'Futsal', percentage: '15%', color: 'bg-emerald-500' },
              { sport: 'Tennis', percentage: '10%', color: 'bg-rose-500' }
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>{s.sport}</span>
                  <span className="font-mono">{s.percentage}</span>
                </div>
                <div className="w-full h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: s.percentage }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* XP Growth Chart */}
        <Card hoverEffect={false} className="bg-white border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <span className="text-[10px] font-black font-mono tracking-wider text-slate-400 uppercase">XP Growth & Reputation</span>
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>
          
          <div className="space-y-2 py-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 font-bold">Total Season XP</span>
              <span className="text-primary-blue font-black font-mono">4,250 XP</span>
            </div>
            
            {/* Visual step levels to simulate leveling progression */}
            <div className="flex space-x-1.5 h-16 items-end justify-between px-2 bg-slate-50/50 border border-slate-100 rounded-xl p-2">
              {[
                { label: 'W1', xp: '1,200', h: '30%' },
                { label: 'W2', xp: '2,100', h: '50%' },
                { label: 'W3', xp: '3,050', h: '75%' },
                { label: 'W4', xp: '4,250', h: '100%' }
              ].map((w, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <span className="text-[8px] text-slate-400 font-mono mb-1">{w.xp}</span>
                  <div className="w-full bg-primary-blue/30 rounded-t-md hover:bg-primary-blue transition-all" style={{ height: w.h }}></div>
                  <span className="text-[9px] text-slate-500 font-bold mt-1">{w.label}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 italic text-center mt-2.5">
              Avg XP/session: 220 XP • Reputation score: 98%
            </p>
          </div>
        </Card>
      </div>

      {/* 3. DUAL COLUMN PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: TRAINING GOALS & RECORDS (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Training Goals list */}
          <div>
            <h3 className="text-lg font-black text-deep-navy mb-4 flex items-center">
              <Target className="w-5 h-5 text-rose-500 mr-2" />
              Active Training Goals
            </h3>
            
            <div className="space-y-4">
              {goals.map((goal) => (
                <Card key={goal.id} hoverEffect className="bg-white border border-slate-200/80 p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-2.5">
                    <div>
                      <h4 className="font-extrabold text-sm text-deep-navy">{goal.name}</h4>
                      <p className="text-[10px] text-slate-400">Target: {goal.target} • Remaining: <span className="text-[#8B5E3C] font-semibold">{goal.remaining}</span></p>
                    </div>
                    {goal.is_completed ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> COMPLETED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full">
                        {goal.current}
                      </span>
                    )}
                  </div>

                  {/* Goal Progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-primary-blue rounded-full transition-all duration-500" style={{ width: `${goal.progress_percent}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
                    <span>{goal.progress_percent}% completed</span>
                    <span className="font-bold flex items-center text-amber-700">
                      <Award className="w-3 h-3 mr-0.5" /> Unlock {goal.badge_name}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Personal Records detailed layout */}
          <div>
            <h3 className="text-lg font-black text-deep-navy mb-4 flex items-center">
              <Trophy className="w-5 h-5 text-amber-500 mr-2" />
              Athlete Personal Records (PRs)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Fastest 5K Run', value: MOCK_STATS.best_5k_pace, detail: 'Gasibu Loop Loop A', sport: 'Running' },
                { title: 'Longest Active Run', value: '02:15:00', detail: 'South Jakarta Clay courts', sport: 'Tennis' },
                { title: 'Max XP Single Session', value: '400 XP', detail: 'League Futsal Finals', sport: 'Futsal' },
                { title: 'Peak Heart Rate', value: '172 bpm', detail: 'High-intensity Badminton Spar', sport: 'Badminton' }
              ].map((r, i) => (
                <div key={i} className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">{r.sport} PR</span>
                    <h4 className="font-extrabold text-sm text-deep-navy mt-0.5">{r.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{r.detail}</p>
                  </div>
                  <div className="text-right text-base font-black text-primary-blue mt-3.5">
                    {r.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: CHRONOLOGICAL ACTIVITIES & RECENT COGNITIVE INSIGHTS (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Streak Indicator */}
          <div className="bg-gradient-to-r from-[#8B5E3C] to-amber-600 text-white rounded-2xl p-5 shadow-md border border-[#8B5E3C]/20 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-mono tracking-widest text-amber-200 uppercase">Athletic Streak</span>
              <h4 className="text-xl font-black">{MOCK_STATS.current_streak_days}-Day Training Streak</h4>
              <p className="text-[10px] text-amber-100">Keep logging active matches to maintain your multiplier!</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Flame className="w-7 h-7 text-yellow-300 fill-yellow-300 animate-pulse" />
            </div>
          </div>

          {/* Improvement Insights */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-deep-navy flex items-center">
              <Sparkles className="w-4.5 h-4.5 text-primary-blue mr-2" />
              Athlete Insights
            </h3>
            
            <div className="space-y-3">
              {insights.map((ins, i) => (
                <div key={i} className="bg-slate-50/75 border border-slate-200/50 rounded-xl p-3.5 text-xs flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5E3C]" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-semibold leading-relaxed">{ins.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Chronological Workout List */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-deep-navy flex items-center">
              <BarChart3 className="w-4.5 h-4.5 text-primary-blue mr-2" />
              Telemetry Logs
            </h3>

            <div className="space-y-3.5">
              {loggedActivities.slice(0, 4).map((act) => (
                <div 
                  key={act.id} 
                  className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:border-primary-blue/20 transition-all flex justify-between gap-4 text-xs"
                >
                  <div className="flex items-start space-x-3 truncate">
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-primary-blue shrink-0">
                      <Icon name={act.sport_icon || 'Zap'} className="w-4 h-4 text-[#8B5E3C]" />
                    </div>
                    <div className="truncate">
                      <div className="font-extrabold text-deep-navy truncate">{act.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{act.location} • {new Date(act.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-black text-deep-navy">{act.duration}</div>
                    <div className="text-[10px] text-emerald-600 font-mono font-bold">+{act.xp_earned} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
