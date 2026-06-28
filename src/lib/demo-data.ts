/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Sport, Match, Post, Community, Tournament, Ranking, ProgressEntry } from '../types';
import { getPremiumCartoonAvatar } from './avatar-utils';

export const CURRENT_USER: User = {
  id: 'user_kelvin',
  name: 'Kelvin Rudyanto',
  username: 'kelvin_r',
  email: 'kelvinrudyanto2007@gmail.com',
  avatar_url: getPremiumCartoonAvatar('Kelvin Rudyanto', 'male'),
  city: 'Bandung',
  bio: 'Competitive badminton & futsal player looking for high-intensity matches. Always improving my smash.',
  main_sport: 'Badminton',
  skill_level: 'Gold',
  rank_tier: 'Gold',
  reputation_score: 98,
  privacy_mode: 'Open for Challenge',
  created_at: '2026-01-15'
};

export const SPORTS: Sport[] = [
  { id: 'sport_badminton', name: 'Badminton', icon: 'Sparkles', category: 'Racquet' },
  { id: 'sport_basketball', name: 'Basketball', icon: 'Dribbble', category: 'Team' },
  { id: 'sport_futsal', name: 'Futsal', icon: 'Activity', category: 'Team' },
  { id: 'sport_tennis', name: 'Tennis', icon: 'Target', category: 'Racquet' },
  { id: 'sport_running', name: 'Running', icon: 'Zap', category: 'Athletics' }
];

export const DEMO_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'user_arya',
    name: 'Arya Wibowo',
    username: 'arya_badminton',
    email: 'arya@sportmatch.app',
    avatar_url: getPremiumCartoonAvatar('Arya Wibowo', 'male'),
    city: 'Bandung',
    bio: 'Badminton enthusiast. Gold rank player. Fast footwork and defensive specialist. Let’s play!',
    main_sport: 'Badminton',
    skill_level: 'Gold',
    rank_tier: 'Gold',
    reputation_score: 95,
    privacy_mode: 'Open for Challenge',
    created_at: '2026-02-10'
  },
  {
    id: 'user_nadia',
    name: 'Nadia Syafira',
    username: 'nadia_f',
    email: 'nadia@sportmatch.app',
    avatar_url: getPremiumCartoonAvatar('Nadia Syafira', 'female'),
    city: 'Jakarta',
    bio: 'Tennis is life. Looking for tournament sparring partners in South Jakarta. Fast serves.',
    main_sport: 'Tennis',
    skill_level: 'Platinum',
    rank_tier: 'Platinum',
    reputation_score: 99,
    privacy_mode: 'Open for Challenge',
    created_at: '2026-01-20'
  },
  {
    id: 'user_budi',
    name: 'Budi Santoso',
    username: 'budi_runs',
    email: 'budi@sportmatch.app',
    avatar_url: getPremiumCartoonAvatar('Budi Santoso', 'male'),
    city: 'Jakarta',
    bio: 'Street basketball absolute fanatic. Point guard. Open to pickup runs, halfcourt, or fullcourt.',
    main_sport: 'Basketball',
    skill_level: 'Silver',
    rank_tier: 'Silver',
    reputation_score: 92,
    privacy_mode: 'Open for Challenge',
    created_at: '2026-03-01'
  },
  {
    id: 'user_farhan',
    name: 'Farhan Maulana',
    username: 'farhan_futsal',
    email: 'farhan@sportmatch.app',
    avatar_url: getPremiumCartoonAvatar('Farhan Maulana', 'male'),
    city: 'Bandung',
    bio: 'Futsal striker. Fast counterattacks. Looking for weekend competitive mini-tournaments.',
    main_sport: 'Futsal',
    skill_level: 'Platinum',
    rank_tier: 'Platinum',
    reputation_score: 96,
    privacy_mode: 'Open for Challenge',
    created_at: '2026-02-28'
  },
  {
    id: 'user_jessica',
    name: 'Jessica Putri',
    username: 'jess_smash',
    email: 'jessica@sportmatch.app',
    avatar_url: getPremiumCartoonAvatar('Jessica Putri', 'female'),
    city: 'Bandung',
    bio: 'Badminton player looking for doubles or singles. Elite tier background. Very aggressive style.',
    main_sport: 'Badminton',
    skill_level: 'Elite',
    rank_tier: 'Elite',
    reputation_score: 100,
    privacy_mode: 'Open for Challenge',
    created_at: '2025-11-12'
  }
];

export const DEMO_MATCHES: Match[] = [
  {
    id: 'match_1',
    challenger_id: 'user_arya',
    opponent_id: 'user_kelvin',
    sport_id: 'sport_badminton',
    status: 'Completed',
    scheduled_at: '2026-06-25T19:00:00',
    location: 'Bandung Badminton Arena (BBA) Court 3',
    result: 'Kelvin won (21-18, 21-19)',
    created_at: '2026-06-22'
  },
  {
    id: 'match_2',
    challenger_id: 'user_kelvin',
    opponent_id: 'user_jessica',
    sport_id: 'sport_badminton',
    status: 'Pending',
    scheduled_at: '2026-06-30T20:00:00',
    location: 'Gor C-Tra Arena Bandung',
    created_at: '2026-06-27'
  },
  {
    id: 'match_3',
    challenger_id: 'user_farhan',
    opponent_id: 'user_kelvin',
    sport_id: 'sport_futsal',
    status: 'Accepted',
    scheduled_at: '2026-07-02T18:00:00',
    location: 'Futsal Town Bandung Court A',
    created_at: '2026-06-26'
  }
];

export const DEMO_POSTS: Post[] = [
  {
    id: 'post_1',
    user_id: 'user_kelvin',
    content: 'Completed 3 intense badminton sessions this week! Footwork is feeling incredibly crisp. Ready for any challengers this weekend. Who is up for a match in Bandung? 🏸🔥',
    sport_id: 'sport_badminton',
    image_url: 'https://images.unsplash.com/photo-1521537634199-673689440ade?auto=format&fit=crop&q=80&w=800',
    likes_count: 42,
    comments_count: 12,
    has_liked: true,
    created_at: '2026-06-26T15:30:00'
  },
  {
    id: 'post_2',
    user_id: 'user_nadia',
    content: 'Early morning tennis serves practice. Hit a personal record of 175 km/h on flat first serve today. Hard work pays off! 🎾💪 #TennisProgress #SportMatch',
    sport_id: 'sport_tennis',
    image_url: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800',
    likes_count: 56,
    comments_count: 8,
    has_liked: false,
    created_at: '2026-06-27T08:15:00'
  },
  {
    id: 'post_3',
    user_id: 'user_budi',
    content: 'Jakarta street basketball is undefeated. Absolute wars at the court tonight! Joined Jakarta Basketball Runs community match. Thanks for the tough runs guys!',
    sport_id: 'sport_basketball',
    image_url: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=800',
    likes_count: 31,
    comments_count: 4,
    has_liked: false,
    created_at: '2026-06-25T21:45:00'
  }
];

export const DEMO_COMMUNITIES: Community[] = [
  {
    id: 'comm_bba',
    name: 'Bandung Badminton Arena',
    description: 'The absolute premier hub for recreational and competitive badminton in Bandung. We run weekly mini-tournaments, ranking matchmaking, and active court booking shares.',
    sport_id: 'sport_badminton',
    city: 'Bandung',
    member_count: 1240,
    image_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800',
    created_at: '2025-05-10'
  },
  {
    id: 'comm_jbr',
    name: 'Jakarta Basketball Runs',
    description: 'Your go-to community for premium high-intensity basketball pickup matches, 3x3 tournaments, and standard full-court competitive runs across Jakarta arenas.',
    sport_id: 'sport_basketball',
    city: 'Jakarta',
    member_count: 1850,
    image_url: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800',
    created_at: '2025-06-15'
  },
  {
    id: 'comm_ufn',
    name: 'Unpad Futsal Network',
    description: 'Bringing together active university students and alumni for weekly evening futsal sessions, leagues, and casual dynamic games in Bandung.',
    sport_id: 'sport_futsal',
    city: 'Bandung',
    member_count: 620,
    image_url: 'https://images.unsplash.com/photo-1575361204480-aadea2d10739?auto=format&fit=crop&q=80&w=800',
    created_at: '2025-08-20'
  },
  {
    id: 'comm_wtc',
    name: 'Weekend Tennis Club',
    description: 'Casual and competitive clay & hardcourt tennis matching in Jakarta. All skill levels welcome, but we host a Platinum league for advanced hitters.',
    sport_id: 'sport_tennis',
    city: 'Jakarta',
    member_count: 890,
    image_url: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&q=80&w=800',
    created_at: '2025-02-01'
  }
];

export const COMMUNITY_CHANNELS: { [key: string]: { id: string; name: string }[] } = {
  comm_bba: [
    { id: 'chan_ann', name: '📢-announcements' },
    { id: 'chan_match', name: '🏸-find-sparring' },
    { id: 'chan_chat', name: '💬-general-chat' },
    { id: 'chan_media', name: '📸-clips-and-highlights' }
  ],
  comm_jbr: [
    { id: 'chan_ann', name: '📢-announcements' },
    { id: 'chan_match', name: '🏀-court-locations' },
    { id: 'chan_chat', name: '💬-general-chat' },
    { id: 'chan_media', name: '🎥-dunk-tapes' }
  ]
};

export const COMMUNITY_DISCUSSIONS: { [key: string]: { id: string; user_name: string; user_avatar: string; user_rank: string; text: string; time: string }[] } = {
  comm_bba: [
    {
      id: 'd1',
      user_name: 'Arya Wibowo',
      user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      user_rank: 'Gold',
      text: 'Anyone down for a Singles sparring match at Gor C-Tra Arena tomorrow at 7 PM? Looking for a Gold or Platinum player.',
      time: '2 hours ago'
    },
    {
      id: 'd2',
      user_name: 'Jessica Putri',
      user_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      user_rank: 'Elite',
      text: 'Doubles mini-bracket starts on Saturday! Make sure to register your pairs in the Tournaments tab.',
      time: '5 hours ago'
    },
    {
      id: 'd3',
      user_name: 'Kelvin Rudyanto',
      user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      user_rank: 'Gold',
      text: 'I can join if someone needs a partner. Solid at defensive setups.',
      time: '4 hours ago'
    }
  ]
};

export const DEMO_TOURNAMENTS: Tournament[] = [
  {
    id: 'tour_1',
    name: 'Bandung Smash Championship v4',
    sport_id: 'sport_badminton',
    city: 'Bandung',
    start_date: '2026-07-10',
    end_date: '2026-07-12',
    max_participants: 32,
    current_participants: 28,
    status: 'Registration',
    prize: 'Rp 5.000.000 + 500 Rep Points',
    bracket_preview: [
      'Kelvin R. vs Arya W.',
      'Jessica P. vs Farhan M.',
      'Nadia S. vs Budi S.',
      'Rian A. vs Hendra S.'
    ],
    created_at: '2026-06-20'
  },
  {
    id: 'tour_2',
    name: 'Jakarta 3x3 Street Showdown',
    sport_id: 'sport_basketball',
    city: 'Jakarta',
    start_date: '2026-07-18',
    end_date: '2026-07-19',
    max_participants: 16,
    current_participants: 16,
    status: 'Ongoing',
    prize: 'Rp 10.000.000 + Custom Nike Gear',
    bracket_preview: [
      'Ancol Warriors vs Sudirman Ballers',
      'Kemang Kings vs Menteng Monstars',
      'Kelapa Gading Giants vs PIK Sharks',
      'Pluit Predators vs Blok M Ballers'
    ],
    created_at: '2026-06-15'
  },
  {
    id: 'tour_3',
    name: 'Priangan Clay Court Open',
    sport_id: 'sport_tennis',
    city: 'Bandung',
    start_date: '2026-08-05',
    end_date: '2026-08-08',
    max_participants: 16,
    current_participants: 8,
    status: 'Registration',
    prize: 'Rp 7.500.000 + Wilson Sponsorship',
    bracket_preview: [],
    created_at: '2026-06-25'
  }
];

export const DEMO_RANKINGS: { [key: string]: Ranking[] } = {
  sport_badminton: [
    { id: 'r1', user_id: 'user_jessica', sport_id: 'sport_badminton', points: 2850, wins: 45, losses: 5, win_rate: 90, rank_tier: 'Elite', updated_at: '2026-06-27' },
    { id: 'r2', user_id: 'user_kelvin', sport_id: 'sport_badminton', points: 2150, wins: 32, losses: 12, win_rate: 72.7, rank_tier: 'Gold', updated_at: '2026-06-27' },
    { id: 'r3', user_id: 'user_arya', sport_id: 'sport_badminton', points: 1980, wins: 28, losses: 15, win_rate: 65.1, rank_tier: 'Gold', updated_at: '2026-06-27' },
    { id: 'r4', user_id: 'user_farhan', sport_id: 'sport_badminton', points: 1540, wins: 18, losses: 10, win_rate: 64.2, rank_tier: 'Silver', updated_at: '2026-06-27' }
  ],
  sport_basketball: [
    { id: 'r5', user_id: 'user_budi', sport_id: 'sport_basketball', points: 1620, wins: 22, losses: 14, win_rate: 61.1, rank_tier: 'Silver', updated_at: '2026-06-27' },
    { id: 'r6', user_id: 'user_arya', sport_id: 'sport_basketball', points: 1210, wins: 12, losses: 9, win_rate: 57.1, rank_tier: 'Bronze', updated_at: '2026-06-27' }
  ]
};

export const DEMO_PROGRESS: ProgressEntry[] = [
  {
    id: 'prog_1',
    user_id: 'user_kelvin',
    sport_id: 'sport_badminton',
    activity_type: 'High-intensity Training',
    duration_minutes: 120,
    performance_score: 88,
    notes: 'Focused on explosive rear court jump smashes and quick backhand recovery drops. Cardio was excellent.',
    created_at: '2026-06-26'
  },
  {
    id: 'prog_2',
    user_id: 'user_kelvin',
    sport_id: 'sport_badminton',
    activity_type: 'Singles Sparring vs Arya',
    duration_minutes: 90,
    performance_score: 92,
    notes: 'Won both sets. Excellent net play and deep lobs. Footwork response was under 0.2s.',
    created_at: '2026-06-25'
  },
  {
    id: 'prog_3',
    user_id: 'user_kelvin',
    sport_id: 'sport_futsal',
    activity_type: 'Team Practice Run',
    duration_minutes: 100,
    performance_score: 80,
    notes: 'Solid offensive drills. Assisted three goals. Need to focus on tactical defense transitions.',
    created_at: '2026-06-23'
  },
  {
    id: 'prog_4',
    user_id: 'user_kelvin',
    sport_id: 'sport_running',
    activity_type: 'Tempo Cardio Run',
    duration_minutes: 45,
    performance_score: 85,
    notes: '5km city run. Maintained steady 4:55/km pace. Leg strength feeling fully recovered.',
    created_at: '2026-06-20'
  },
  {
    id: 'prog_5',
    user_id: 'user_arya',
    sport_id: 'sport_badminton',
    activity_type: 'Footwork & Agility Drill',
    duration_minutes: 80,
    performance_score: 86,
    notes: 'Intense cross-court multi-shuttle feeding drills. Improved court transition speed and net recoveries.',
    created_at: '2026-06-26'
  },
  {
    id: 'prog_6',
    user_id: 'user_arya',
    sport_id: 'sport_badminton',
    activity_type: 'Tactical Sparring',
    duration_minutes: 110,
    performance_score: 84,
    notes: 'Close sets. Worked on tactical smash placement and defensive lobs. Speed and recovery stamina felt high.',
    created_at: '2026-06-24'
  },
  {
    id: 'prog_7',
    user_id: 'user_nadia',
    sport_id: 'sport_futsal',
    activity_type: 'Endurance & Cardio Sprints',
    duration_minutes: 75,
    performance_score: 90,
    notes: 'High intensity interval training. Logged 15 sets of 100m shuttle sprints. Excellent lung capacity and aerobic recovery.',
    created_at: '2026-06-26'
  },
  {
    id: 'prog_8',
    user_id: 'user_nadia',
    sport_id: 'sport_futsal',
    activity_type: 'Defense Transition Playbook',
    duration_minutes: 90,
    performance_score: 88,
    notes: 'Focused on counterattacks and spacing. Intercepted 6 key plays. High tactical score today.',
    created_at: '2026-06-23'
  },
  {
    id: 'prog_9',
    user_id: 'user_budi',
    sport_id: 'sport_basketball',
    activity_type: 'Jump Shot Precision Practice',
    duration_minutes: 95,
    performance_score: 85,
    notes: 'Practiced 3-pointers and mid-range jumpers from 5 spots on the court. Excellent ball control and precision release.',
    created_at: '2026-06-26'
  },
  {
    id: 'prog_10',
    user_id: 'user_budi',
    sport_id: 'sport_basketball',
    activity_type: 'Full-court scrimmage',
    duration_minutes: 120,
    performance_score: 82,
    notes: 'Great match flow. Dominated the rebounds. Endurance and jump power were top notch.',
    created_at: '2026-06-22'
  }
];
