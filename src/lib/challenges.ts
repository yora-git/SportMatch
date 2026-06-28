/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocalChallenge } from '../types';

export const MOCK_CHALLENGES: LocalChallenge[] = [
  {
    id: 'ch_1',
    name: 'Bandung 5K Pace Challenge',
    sport: 'Running',
    location: 'Gasibu Loop, Bandung',
    participants_count: 342,
    time_remaining: '4 Days left',
    reward_xp: 300,
    leaderboard_preview: [
      { rank: 1, name: 'Reza Siregar', score: '18:42 (3:44/km)' },
      { rank: 2, name: 'Adit Pratama', score: '19:15 (3:51/km)' },
      { rank: 3, name: 'Kelvin Rudyanto', score: '22:45 (4:33/km)' }
    ],
    is_joined: true
  },
  {
    id: 'ch_2',
    name: 'Jatinangor Badminton Streak',
    sport: 'Badminton',
    location: 'GBA Arena, Sumedang',
    participants_count: 89,
    time_remaining: '8 Days left',
    reward_xp: 450,
    leaderboard_preview: [
      { rank: 1, name: 'Jessica Putri', score: '14 Match Wins' },
      { rank: 2, name: 'Kelvin Rudyanto', score: '8 Match Wins' },
      { rank: 3, name: 'Arya Wibowo', score: '6 Match Wins' }
    ],
    is_joined: true
  },
  {
    id: 'ch_3',
    name: 'Jakarta Futsal Weekend League',
    sport: 'Futsal',
    location: 'Sudirman Futsal Hub, Jakarta',
    participants_count: 156,
    time_remaining: '1 Day left',
    reward_xp: 500,
    leaderboard_preview: [
      { rank: 1, name: 'Farhan Maulana', score: '12 Goals' },
      { rank: 2, name: 'Budi Santoso', score: '9 Goals' },
      { rank: 3, name: 'Doni Haryono', score: '8 Goals' }
    ],
    is_joined: false
  },
  {
    id: 'ch_4',
    name: 'Bali Morning Run Challenge',
    sport: 'Running',
    location: 'Kuta Beach Trail, Bali',
    participants_count: 512,
    time_remaining: '12 Days left',
    reward_xp: 250,
    leaderboard_preview: [
      { rank: 1, name: 'Wayan S.', score: '42.5 km Total' },
      { rank: 2, name: 'Made G.', score: '38.0 km Total' },
      { rank: 3, name: 'Sarah J.', score: '35.4 km Total' }
    ],
    is_joined: false
  },
  {
    id: 'ch_5',
    name: 'Surabaya Basketball Shooting Challenge',
    sport: 'Basketball',
    location: 'DBL Arena, Surabaya',
    participants_count: 120,
    time_remaining: '15 Days left',
    reward_xp: 400,
    leaderboard_preview: [
      { rank: 1, name: 'Andi Wijaya', score: '45/50 Three-Pointers' },
      { rank: 2, name: 'Daniel S.', score: '42/50 Three-Pointers' },
      { rank: 3, name: 'Tommy L.', score: '39/50 Three-Pointers' }
    ],
    is_joined: false
  }
];
