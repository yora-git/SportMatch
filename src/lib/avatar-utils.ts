/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, ProgressEntry } from '../types';

// Premium, high-fidelity sports-themed 3D cartoon avatars (using reliable Dicebear Adventurer vectors)
export const MALE_CARTOON_AVATARS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Leo&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
];

export const FEMALE_CARTOON_AVATARS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Chloe&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Lily&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe&backgroundColor=f1f5f9,e2e8f0,cbd5e1',
];

/**
 * Deterministically generates a premium cartoon avatar based on a seed (like user name/ID)
 * and an optional gender preference or automatic detection.
 */
export function getPremiumCartoonAvatar(
  seed: string,
  gender?: 'male' | 'female' | 'auto'
): string {
  const cleanSeed = seed.trim();
  
  // Deterministic index hash from seed
  let hash = 0;
  for (let i = 0; i < cleanSeed.length; i++) {
    hash = cleanSeed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash);

  // Auto-detect gender from common female names in our app or seed indicators
  let detectedGender: 'male' | 'female' = 'male';
  if (gender === 'female' || gender === 'male') {
    detectedGender = gender;
  } else {
    const femaleNames = ['nadia', 'jessica', 'jess_smash', 'nadia_f', 'vivian', 'sarah', 'putri', 'syafira'];
    const isFemaleName = femaleNames.some((name) => cleanSeed.toLowerCase().includes(name));
    detectedGender = isFemaleName ? 'female' : 'male';
  }

  const pool = detectedGender === 'female' ? FEMALE_CARTOON_AVATARS : MALE_CARTOON_AVATARS;
  // Use a custom dynamic query param to make each user's avatar unique, but fallback to the list if requested
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(cleanSeed)}&backgroundColor=f1f5f9,e2e8f0,cbd5e1`;
}

/**
 * Maps a rank tier (Bronze, Silver, Gold, Platinum, Diamond, Elite) to dynamic, 
 * high-fidelity brand accent colors for styling user cards, borders, or rings.
 */
export function getRankTierColors(rankTier: string) {
  const tier = rankTier.toLowerCase().trim();
  
  switch (tier) {
    case 'elite':
      return {
        text: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        ring: 'ring-purple-400',
        gradient: 'from-purple-500 to-indigo-600',
        glow: 'shadow-purple-500/20',
        label: 'Elite Champion'
      };
    case 'diamond':
      return {
        text: 'text-cyan-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-200',
        ring: 'ring-cyan-400',
        gradient: 'from-cyan-400 to-blue-500',
        glow: 'shadow-cyan-500/20',
        label: 'Diamond Elite'
      };
    case 'platinum':
      return {
        text: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        ring: 'ring-indigo-400',
        gradient: 'from-indigo-400 to-indigo-600',
        glow: 'shadow-indigo-500/20',
        label: 'Platinum Sparrer'
      };
    case 'gold':
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        ring: 'ring-amber-400',
        gradient: 'from-amber-400 to-yellow-500',
        glow: 'shadow-amber-500/20',
        label: 'Gold Challenger'
      };
    case 'silver':
      return {
        text: 'text-slate-500',
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        ring: 'ring-slate-300',
        gradient: 'from-slate-400 to-slate-500',
        glow: 'shadow-slate-400/20',
        label: 'Silver Contender'
      };
    case 'bronze':
    default:
      return {
        text: 'text-[#8B5E3C]',
        bg: 'bg-[#8B5E3C]/5',
        border: 'border-[#8B5E3C]/20',
        ring: 'ring-[#8B5E3C]/30',
        gradient: 'from-[#8B5E3C] to-[#A0704C]',
        glow: 'shadow-[#8B5E3C]/20',
        label: 'Bronze Aspirant'
      };
  }
}

export interface PerformanceMetric {
  subject: string;
  value: number;
  fullMark: number;
}

/**
 * Calculates a standard set of athletic metrics (Speed, Agility, Endurance, Power, Precision, Tactics)
 * based on user attributes (rank, primary sport) and their ProgressEntry history.
 */
export function calculateAthletePerformance(
  athlete: User,
  progressEntries: ProgressEntry[]
): PerformanceMetric[] {
  // 1. Establish baselines based on Rank/Skill Level
  let baseValue = 50;
  const tier = (athlete.rank_tier || 'bronze').toLowerCase();
  if (tier.includes('legend')) baseValue = 92;
  else if (tier.includes('elite')) baseValue = 88;
  else if (tier.includes('platinum')) baseValue = 78;
  else if (tier.includes('gold')) baseValue = 68;
  else if (tier.includes('silver')) baseValue = 58;
  else if (tier.includes('bronze')) baseValue = 48;
  else baseValue = 38;

  // Add a tiny bit of variation based on reputation score
  const repBonus = Math.max(0, (athlete.reputation_score - 80) / 4); // up to +5 points

  // Define 6 core metrics
  let speed = baseValue + repBonus + (Math.sin(athlete.name.length) * 4);
  let agility = baseValue + repBonus + (Math.cos(athlete.name.length) * 4);
  let endurance = baseValue + repBonus + (Math.sin(athlete.name.length + 1) * 4);
  let power = baseValue + repBonus + (Math.cos(athlete.name.length + 1) * 4);
  let precision = baseValue + repBonus + (Math.sin(athlete.name.length + 2) * 4);
  let tactics = baseValue + repBonus + (Math.cos(athlete.name.length + 2) * 4);

  // Apply main sport bias
  const mainSport = (athlete.main_sport || '').toLowerCase();
  if (mainSport.includes('badminton')) {
    agility += 8;
    precision += 6;
    power += 4;
    speed -= 2;
  } else if (mainSport.includes('futsal') || mainSport.includes('soccer')) {
    speed += 8;
    endurance += 6;
    agility += 4;
  } else if (mainSport.includes('basketball')) {
    power += 8;
    tactics += 6;
    speed += 4;
  } else if (mainSport.includes('tennis')) {
    precision += 8;
    endurance += 6;
    agility += 4;
  } else if (mainSport.includes('run')) {
    endurance += 12;
    speed += 6;
    power -= 4;
    precision -= 4;
  }

  // 2. Adjust dynamically based on actual progress entries
  const entries = progressEntries.filter(entry => entry.user_id === athlete.id);
  
  if (entries.length > 0) {
    let speedSum = 0, speedCount = 0;
    let agilitySum = 0, agilityCount = 0;
    let enduranceSum = 0, enduranceCount = 0;
    let powerSum = 0, powerCount = 0;
    let precisionSum = 0, precisionCount = 0;
    let tacticsSum = 0, tacticsCount = 0;

    entries.forEach(entry => {
      const score = entry.performance_score;
      const duration = entry.duration_minutes;
      const text = `${entry.activity_type} ${entry.notes}`.toLowerCase();

      // Check keywords and accumulate weights
      let matched = false;

      if (text.includes('speed') || text.includes('sprint') || text.includes('fast') || text.includes('pace') || text.includes('quick')) {
        speedSum += score;
        speedCount++;
        matched = true;
      }
      if (text.includes('agility') || text.includes('footwork') || text.includes('recovery') || text.includes('net') || text.includes('court')) {
        agilitySum += score;
        agilityCount++;
        matched = true;
      }
      if (text.includes('endurance') || text.includes('cardio') || text.includes('stamina') || text.includes('tempo') || text.includes('duration') || duration > 60) {
        enduranceSum += score;
        enduranceCount++;
        matched = true;
      }
      if (text.includes('power') || text.includes('smash') || text.includes('jump') || text.includes('hard') || text.includes('shot') || text.includes('strike')) {
        powerSum += score;
        powerCount++;
        matched = true;
      }
      if (text.includes('precision') || text.includes('control') || text.includes('accuracy') || text.includes('lob') || text.includes('drop') || text.includes('technique')) {
        precisionSum += score;
        precisionCount++;
        matched = true;
      }
      if (text.includes('tactics') || text.includes('drill') || text.includes('defense') || text.includes('transition') || text.includes('playbook') || text.includes('practice')) {
        tacticsSum += score;
        tacticsCount++;
        matched = true;
      }

      // If no specific keyword matches, distribute general score to all
      if (!matched) {
        speedSum += score * 0.5; speedCount += 0.5;
        agilitySum += score * 0.5; agilityCount += 0.5;
        enduranceSum += score * 0.5; enduranceCount += 0.5;
        powerSum += score * 0.5; powerCount += 0.5;
        precisionSum += score * 0.5; precisionCount += 0.5;
        tacticsSum += score * 0.5; tacticsCount += 0.5;
      }
    });

    // Apply entry weights to base values
    const weight = Math.min(0.7, entries.length * 0.15); // up to 70% influence from entry history
    const baseInfluence = 1 - weight;

    if (speedCount > 0) speed = (speed * baseInfluence) + ((speedSum / speedCount) * weight);
    if (agilityCount > 0) agility = (agility * baseInfluence) + ((agilitySum / agilityCount) * weight);
    if (enduranceCount > 0) endurance = (endurance * baseInfluence) + ((enduranceSum / enduranceCount) * weight);
    if (powerCount > 0) power = (power * baseInfluence) + ((powerSum / powerCount) * weight);
    if (precisionCount > 0) precision = (precision * baseInfluence) + ((precisionSum / precisionCount) * weight);
    if (tacticsCount > 0) tactics = (tactics * baseInfluence) + ((tacticsSum / tacticsCount) * weight);
  }

  // Constrain all values between 30 and 100 for visual appeal on the Radar Chart
  const sanitize = (val: number) => Math.max(30, Math.min(100, Math.round(val)));

  return [
    { subject: 'Speed ⚡', value: sanitize(speed), fullMark: 100 },
    { subject: 'Agility 👟', value: sanitize(agility), fullMark: 100 },
    { subject: 'Endurance 🫁', value: sanitize(endurance), fullMark: 100 },
    { subject: 'Power 💪', value: sanitize(power), fullMark: 100 },
    { subject: 'Precision 🎯', value: sanitize(precision), fullMark: 100 },
    { subject: 'Tactics 🧠', value: sanitize(tactics), fullMark: 100 },
  ];
}
