/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar_url: string;
  city: string;
  bio: string;
  main_sport: string;
  skill_level: 'Rookie' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Elite' | 'Legend';
  rank_tier: 'Rookie' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Elite' | 'Legend';
  reputation_score: number;
  privacy_mode: 'Public' | 'Private' | 'Open for Challenge';
  created_at: string;
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface Match {
  id: string;
  challenger_id: string;
  opponent_id: string;
  sport_id: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Completed' | 'Cancelled';
  scheduled_at: string;
  location: string;
  result?: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  sport_id: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  has_liked?: boolean;
  created_at: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  sport_id: string;
  city: string;
  member_count: number;
  image_url: string;
  created_at: string;
}

export interface CommunityMember {
  id: string;
  community_id: string;
  user_id: string;
  role: 'Member' | 'Moderator' | 'Admin';
  joined_at: string;
}

export interface Tournament {
  id: string;
  name: string;
  sport_id: string;
  city: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  current_participants: number;
  status: 'Registration' | 'Ongoing' | 'Completed';
  prize: string;
  bracket_preview?: string[]; // list of round 1 matchups
  created_at: string;
}

export interface Ranking {
  id: string;
  user_id: string;
  sport_id: string;
  points: number;
  wins: number;
  losses: number;
  win_rate: number;
  rank_tier: 'Rookie' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Elite' | 'Legend';
  updated_at: string;
}

export interface ProgressEntry {
  id: string;
  user_id: string;
  sport_id: string;
  activity_type: string;
  duration_minutes: number;
  performance_score: number; // 0-100
  notes: string;
  created_at: string;
}

export interface TrackingActivity {
  id: string;
  user_id: string;
  athlete_name: string;
  athlete_avatar: string;
  sport_id: string;
  sport_name: string;
  sport_icon: string;
  title: string;
  distance?: string; // e.g. "5.2 km", "0.0 km" if court
  duration: string; // e.g. "45:30"
  duration_minutes: number; // numeric for stats calculation
  calories: number;
  pace?: string; // e.g. "4:55 /km", "N/A"
  elevation_gain?: string; // "120 m"
  heart_rate: number; // e.g. 145 bpm
  intensity: 'Low' | 'Moderate' | 'Tempo' | 'High-intensity' | 'Extreme';
  is_personal_record: boolean;
  xp_earned: number;
  reputation_gained: number;
  location: string;
  date: string;
  achievement_badge?: string; // name of achievement if any
  respect_count: number;
  comment_count: number;
  has_respected: boolean;
  has_saved: boolean;
  notes?: string;
}

export interface AthleteStats {
  total_activities: number;
  total_distance_km: number;
  total_training_hours: number;
  current_streak_days: number;
  weekly_goal_progress_percent: number;
  monthly_progress_percent: number;
  best_5k_pace?: string;
  best_longest_duration?: string;
  most_played_sport: string;
  win_rate: number;
  match_count: number;
  tournament_count: number;
  xp_earned: number;
}

export interface Goal {
  id: string;
  name: string;
  type: 'weekly_time' | 'monthly_distance' | 'match_count' | 'tournament_count' | 'rank_tier';
  target: string;
  current: string;
  progress_percent: number;
  remaining: string;
  badge_name: string;
  is_completed: boolean;
}

export interface LocalChallenge {
  id: string;
  name: string;
  sport: string;
  location: string;
  participants_count: number;
  time_remaining: string;
  reward_xp: number;
  leaderboard_preview: { rank: number; name: string; score: string }[];
  is_joined: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  unlocked_at?: string; // date unlocked or undefined
  xp_value: number;
  category: 'Streaks' | 'Performance' | 'Community' | 'Ranks';
}

export interface Club {
  id: string;
  name: string;
  sport_name: string;
  sport_icon: string;
  location: string;
  member_count: number;
  weekly_activities_count: number;
  club_rank: number;
  is_joined: boolean;
  latest_activity_preview: {
    athlete_name: string;
    activity_title: string;
    time_ago: string;
  };
}

