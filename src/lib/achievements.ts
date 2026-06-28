/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Achievement } from '../types';

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_early_grinder',
    name: 'Early Grinder',
    description: 'Log an athletic training session before 7:00 AM local time.',
    icon: 'Sun',
    unlocked_at: '2026-06-27',
    xp_value: 150,
    category: 'Streaks'
  },
  {
    id: 'ach_7day_streak',
    name: '7-Day Streak',
    description: 'Log consecutive active sports workouts for 7 days in a row.',
    icon: 'Flame',
    unlocked_at: '2026-06-25',
    xp_value: 300,
    category: 'Streaks'
  },
  {
    id: 'ach_match_winner',
    name: 'Match Winner',
    description: 'Log your first official sparring victory under verified rules.',
    icon: 'Trophy',
    unlocked_at: '2026-06-25',
    xp_value: 200,
    category: 'Performance'
  },
  {
    id: 'ach_tournament_rookie',
    name: 'Tournament Rookie',
    description: 'Register and play in your first local competitive tournament cup.',
    icon: 'Award',
    unlocked_at: '2026-06-20',
    xp_value: 250,
    category: 'Performance'
  },
  {
    id: 'ach_gold_athlete',
    name: 'Gold Athlete',
    description: 'Climb the competitive regional ladder to Gold Division Tier.',
    icon: 'Shield',
    unlocked_at: '2026-05-12',
    xp_value: 500,
    category: 'Ranks'
  },
  {
    id: 'ach_community_captain',
    name: 'Community Captain',
    description: 'Join or manage a local sports community club with over 500 members.',
    icon: 'Users',
    unlocked_at: '2026-04-18',
    xp_value: 400,
    category: 'Community'
  },
  {
    id: 'ach_pace_breaker',
    name: 'Pace Breaker',
    description: 'Achieve a new personal record for average pace or speed.',
    icon: 'Zap',
    unlocked_at: '2026-06-24',
    xp_value: 350,
    category: 'Performance'
  },
  {
    id: 'ach_consistent_trainer',
    name: 'Consistent Trainer',
    description: 'Meet your weekly active minutes goal 4 weeks in a row.',
    icon: 'Activity',
    unlocked_at: '2026-06-27',
    xp_value: 300,
    category: 'Streaks'
  },
  {
    id: 'ach_rival_hunter',
    name: 'Rival Hunter',
    description: 'Win a sparring rematch against a contender who previously defeated you.',
    icon: 'Target',
    unlocked_at: undefined, // Locked
    xp_value: 450,
    category: 'Performance'
  },
  {
    id: 'ach_legend_climber',
    name: 'Legend Climber',
    description: 'Reach the elite Legend Tier by securing 2500+ XP points globally.',
    icon: 'Crown',
    unlocked_at: undefined, // Locked
    xp_value: 1000,
    category: 'Ranks'
  }
];
