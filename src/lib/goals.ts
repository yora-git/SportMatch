/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Goal } from '../types';

export const MOCK_GOALS: Goal[] = [
  {
    id: 'goal_1',
    name: 'Weekly Active Training',
    type: 'weekly_time',
    target: '300 Mins',
    current: '235 Mins',
    progress_percent: 78,
    remaining: '65 Mins',
    badge_name: 'Consistent Trainer',
    is_completed: false
  },
  {
    id: 'goal_2',
    name: 'Monthly Distance Objective',
    type: 'monthly_distance',
    target: '40 km',
    current: '45.2 km',
    progress_percent: 100,
    remaining: '0 km (Achieved)',
    badge_name: 'Pace Breaker',
    is_completed: true
  },
  {
    id: 'goal_3',
    name: 'Monthly Sparring Matches',
    type: 'match_count',
    target: '8 Matches',
    current: '6 Matches',
    progress_percent: 75,
    remaining: '2 Matches',
    badge_name: 'Match Winner',
    is_completed: false
  },
  {
    id: 'goal_4',
    name: 'Championship Bracket Entrance',
    type: 'tournament_count',
    target: '2 Cups',
    current: '2 Cups',
    progress_percent: 100,
    remaining: '0 Cups (Achieved)',
    badge_name: 'Tournament Rookie',
    is_completed: true
  },
  {
    id: 'goal_5',
    name: 'Rank Ladder Target',
    type: 'rank_tier',
    target: 'Platinum Level',
    current: 'Gold (2,150 XP)',
    progress_percent: 86,
    remaining: '350 XP',
    badge_name: 'Legend Climber',
    is_completed: false
  }
];
