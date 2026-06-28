/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Club } from '../types';

export const MOCK_CLUBS: Club[] = [
  {
    id: 'club_1',
    name: 'Bandung Badminton Elite',
    sport_name: 'Badminton',
    sport_icon: 'Sparkles',
    location: 'GOR C-Tra Arena, Bandung',
    member_count: 340,
    weekly_activities_count: 52,
    club_rank: 1,
    is_joined: true,
    latest_activity_preview: {
      athlete_name: 'Kelvin Rudyanto',
      activity_title: 'Logged 85 mins of Singles Sparring',
      time_ago: '2 hours ago'
    }
  },
  {
    id: 'club_2',
    name: 'Dago Running Collective',
    sport_name: 'Running',
    sport_icon: 'Zap',
    location: 'Gasibu Loop, Bandung',
    member_count: 512,
    weekly_activities_count: 124,
    club_rank: 2,
    is_joined: true,
    latest_activity_preview: {
      athlete_name: 'Arya Wibowo',
      activity_title: 'Tempo run of 8.4 km Jatinangor Ring',
      time_ago: '4 hours ago'
    }
  },
  {
    id: 'club_3',
    name: 'Sudirman Futsal Society',
    sport_name: 'Futsal',
    sport_icon: 'Activity',
    location: 'Sudirman Futsal Hub, Jakarta',
    member_count: 420,
    weekly_activities_count: 38,
    club_rank: 3,
    is_joined: false,
    latest_activity_preview: {
      athlete_name: 'Farhan Maulana',
      activity_title: 'Championship Match 5-3 Futsal Town',
      time_ago: '1 day ago'
    }
  },
  {
    id: 'club_4',
    name: 'Kemang Tennis Syndicate',
    sport_name: 'Tennis',
    sport_icon: 'Target',
    location: 'Elite Tennis Club, South Jakarta',
    member_count: 180,
    weekly_activities_count: 18,
    club_rank: 5,
    is_joined: false,
    latest_activity_preview: {
      athlete_name: 'Nadia Syafira',
      activity_title: 'Clay court tennis drilling 120 mins',
      time_ago: '1 day ago'
    }
  },
  {
    id: 'club_5',
    name: 'Menteng Street Ballers',
    sport_name: 'Basketball',
    sport_icon: 'Dribbble',
    location: 'Taman Menteng Court, Jakarta',
    member_count: 290,
    weekly_activities_count: 29,
    club_rank: 4,
    is_joined: false,
    latest_activity_preview: {
      athlete_name: 'Budi Santoso',
      activity_title: 'Played 5 games halfcourt pickup',
      time_ago: '2 days ago'
    }
  }
];
