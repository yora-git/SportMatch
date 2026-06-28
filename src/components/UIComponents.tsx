/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';

// Dynamic Icon rendering helper using Lucide
export function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) {
    return <LucideIcons.HelpCircle className={className} />;
  }
  return <IconComponent className={className} />;
}

// PREMIUM BUTTON COMPONENT
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'bronze';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  id,
  type = 'button',
  disabled = false,
  ...props
 }: ButtonProps) {
  const baseStyle = "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none cursor-pointer overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed select-none";
  
  const variants = {
    primary: "bg-primary-blue text-white hover:bg-opacity-95 shadow-lg shadow-primary-blue/20 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-deep-navy text-white hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-deep-navy/10",
    outline: "border border-slate-200 bg-white text-deep-navy hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]",
    ghost: "text-slate-600 hover:text-deep-navy hover:bg-slate-100",
    bronze: "bg-gradient-to-r from-warm-brown to-bronze-accent text-white hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-warm-brown/20"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base font-bold tracking-wide"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// PREMIUM CARD
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  id?: string;
  key?: string | number;
}

export function Card({ children, className = '', onClick, hoverEffect = true, id }: CardProps) {
  return (
    <motion.div
      id={id}
      whileHover={hoverEffect ? { y: -4, boxShadow: "0 12px 30px -10px rgba(11, 95, 255, 0.08)" } : undefined}
      onClick={onClick}
      className={`bg-white border border-slate-200/80 rounded-2xl p-6 relative transition-shadow duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// BADGE
export function Badge({ children, className = '', variant = 'blue' }: { children: React.ReactNode; className?: string; variant?: 'blue' | 'bronze' | 'green' | 'red' | 'gray' }) {
  const styles = {
    blue: "bg-primary-blue/8 text-primary-blue border border-primary-blue/20",
    bronze: "bg-bronze-accent/8 text-bronze-accent border border-bronze-accent/20",
    green: "bg-emerald-500/8 text-emerald-600 border border-emerald-500/20",
    red: "bg-rose-500/8 text-rose-600 border border-rose-500/20",
    gray: "bg-slate-100 text-slate-600 border border-slate-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}

// RANK BADGE
export function RankBadge({ rank, className = '' }: { rank: string; className?: string }) {
  const tiers: { [key: string]: { bg: string; text: string; border: string; glow: string } } = {
    Rookie: { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', glow: '' },
    Bronze: { bg: 'bg-[#8B5E3C]/8', text: 'text-[#8B5E3C]', border: 'border-[#8B5E3C]/20', glow: '' },
    Silver: { bg: 'bg-zinc-100', text: 'text-zinc-600', border: 'border-zinc-300', glow: '' },
    Gold: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', glow: 'shadow-amber-500/5' },
    Platinum: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', glow: 'shadow-teal-500/5' },
    Elite: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', glow: 'shadow-indigo-500/10' },
    Legend: { bg: 'bg-gradient-to-r from-rose-500/5 to-amber-500/5', text: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 font-extrabold', border: 'border-rose-300', glow: 'shadow-rose-500/10 animate-pulse' }
  };

  const current = tiers[rank] || tiers.Rookie;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border tracking-wider ${current.bg} ${current.text} ${current.border} ${current.glow} ${className}`}>
      <LucideIcons.Shield className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
      {rank}
    </span>
  );
}

// STAT CARD
export function StatCard({ label, value, description, icon, trend, trendType = 'up' }: { label: string; value: string | number; description?: string; icon?: string; trend?: string; trendType?: 'up' | 'down' }) {
  return (
    <Card hoverEffect className="flex flex-col justify-between bg-white border border-slate-200/80">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
        {icon && (
          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-primary-blue">
            <Icon name={icon} className="w-4 h-4" />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-deep-navy tracking-tight mb-1">{value}</h3>
        {description && <p className="text-xs text-slate-400 leading-relaxed">{description}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs font-semibold flex items-center ${trendType === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
              <Icon name={trendType === 'up' ? 'ArrowUpRight' : 'ArrowDownRight'} className="w-3.5 h-3.5 mr-0.5" />
              {trend}
            </span>
            <span className="text-xs text-slate-400 ml-2">vs last week</span>
          </div>
        )}
      </div>
    </Card>
  );
}

// PROGRESS CHART
export function ProgressChart({ data = [20, 45, 28, 80, 50, 95] }: { data?: number[] }) {
  const points = data.map((val, index) => `${(index / (data.length - 1)) * 100},${100 - val}`).join(' ');

  return (
    <div className="relative w-full h-40 mt-4 rounded-2xl overflow-hidden bg-slate-50 p-4 border border-slate-100">
      <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-20">
        <div className="border-b border-slate-300 w-full h-0"></div>
        <div className="border-b border-slate-300 w-full h-0"></div>
        <div className="border-b border-slate-300 w-full h-0"></div>
      </div>
      
      {/* SVG Custom Line Chart with gradients */}
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B5FFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B5FFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Filled area under the line */}
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
          points={`0,100 ${points} 100,100`}
          fill="url(#chartGlow)"
        />

        {/* The active path */}
        <motion.polyline
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="3"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      {/* Mini interactive nodes */}
      <div className="absolute inset-x-4 bottom-1 flex justify-between text-[9px] font-bold font-mono text-slate-400">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
    </div>
  );
}

// SECTION HEADING
export function SectionHeading({
  title,
  subtitle,
  tag,
  align = 'left'
}: {
  title: string;
  subtitle?: string;
  tag?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''}`}>
      {tag && (
        <span className="text-xs font-bold uppercase tracking-widest text-primary-blue bg-primary-blue/8 px-3.5 py-1 rounded-full border border-primary-blue/20 inline-block mb-3.5">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-deep-navy tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ANIMATED FLOATING BACKGROUND BLOBS WITH SPORTS-TECH ROUTE AND COURT MARKINGS
export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 w-full select-none">
      
      {/* 1. SOFT GRADIENT GLOWS */}
      {/* Top Right Blue Glow (near hero preview area) */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-[-80px] right-[-60px] w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] bg-primary-blue/5 rounded-full filter blur-[100px] sm:blur-[130px]"
      />
      
      {/* Mid/Lower Left Warm Brown/Clay Glow */}
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-[350px] left-[-150px] w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] bg-bronze-accent/4 rounded-full filter blur-[110px] sm:blur-[140px]"
      />

      {/* Subtle Bottom Right Greenish glow */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-emerald-500/3 rounded-full filter blur-[120px]"
      />

      {/* 2. SUBTLE ROUTE LINE PATTERN (GPS Track Line Style) */}
      {/* Renders only on medium screens and larger to avoid mobile clutter */}
      <div className="absolute top-10 right-[5%] w-[650px] h-[550px] opacity-[0.06] hidden md:block">
        <svg className="w-full h-full text-primary-blue" viewBox="0 0 650 550" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Curved activity tracking GPS path */}
          <motion.path
            d="M50,480 C120,440 180,470 240,360 C300,250 220,180 340,140 C460,100 500,220 580,80"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          {/* Start Point Dot */}
          <circle cx="50" cy="480" r="5" fill="#0B5FFF" />
          <circle cx="50" cy="480" r="12" stroke="#0B5FFF" strokeWidth="1" strokeOpacity="0.4" className="animate-ping" style={{ animationDuration: '3s' }} />
          
          {/* Intermediate Checkpoint Dots */}
          <circle cx="240" cy="360" r="4" fill="#8B5E3C" />
          <circle cx="340" cy="140" r="4" fill="#0B5FFF" />
          
          {/* Location Pin Style End Point */}
          <g transform="translate(580, 80)">
            <circle cx="0" cy="0" r="6" fill="#0B5FFF" />
            <circle cx="0" cy="0" r="14" stroke="#0B5FFF" strokeWidth="1.5" strokeOpacity="0.5" className="animate-ping" style={{ animationDuration: '2s' }} />
            {/* Tiny Location Pin Flag */}
            <path d="M-4,-18 L4,-18 L0,-10 Z" fill="#0B5FFF" />
          </g>
        </svg>
      </div>

      {/* 3. COURT LINE PATTERN (Faint Athletic Markings) */}
      {/* Sports markings that appear in the background of the hero/preview area */}
      <div className="absolute top-[20%] right-0 w-[550px] h-[400px] opacity-[0.04] hidden lg:block text-slate-400">
        <svg className="w-full h-full" viewBox="0 0 550 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Badminton/Futsal court boundary box */}
          <rect x="20" y="20" width="510" height="360" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Center line */}
          <line x1="275" y1="20" x2="275" y2="380" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Center Circle */}
          <circle cx="275" cy="200" r="60" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="275" cy="200" r="4" fill="currentColor" />
          
          {/* Left Goal/Service Line Box */}
          <rect x="20" y="80" width="90" height="240" stroke="currentColor" strokeWidth="1.2" />
          <line x1="110" y1="80" x2="110" y2="320" stroke="currentColor" strokeWidth="1.2" />
          
          {/* Right Goal/Service Line Box */}
          <rect x="440" y="80" width="90" height="240" stroke="currentColor" strokeWidth="1.2" />
          <line x1="440" y1="80" x2="440" y2="320" stroke="currentColor" strokeWidth="1.2" />

          {/* Diagonal Corner Accents */}
          <path d="M20,40 L40,20" stroke="currentColor" strokeWidth="1" />
          <path d="M530,40 L510,20" stroke="currentColor" strokeWidth="1" />
          <path d="M20,360 L40,380" stroke="currentColor" strokeWidth="1" />
          <path d="M530,360 L510,380" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* 4. FLOATING SPORT DETAILS (Micro Widgets around hero area) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        
        {/* Floating XP Badge */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [2, -2, 2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[18%] right-[8%] lg:right-[12%] bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_24px_rgba(15,23,42,0.06)] px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-[10px] font-bold text-primary-blue z-10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">+24 XP Awarded</span>
        </motion.div>

        {/* Floating 7-Day Streak Chip */}
        <motion.div
          animate={{
            y: [0, 8, 0],
            rotate: [-1, 2, -1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-[55%] left-[6%] lg:left-[10%] bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_24px_rgba(15,23,42,0.06)] px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-[10px] font-bold text-[#8B5E3C] z-10"
        >
          <span>🔥</span>
          <span className="tracking-wide">7-Day Streak</span>
        </motion.div>

        {/* Floating Active Lobby Pulse Dot */}
        <motion.div
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[35%] right-[6%] lg:right-[10%] bg-white/85 backdrop-blur-md border border-[#0B5FFF]/15 shadow-[0_8px_24px_rgba(11,95,255,0.06)] px-3 py-1.5 rounded-full flex items-center space-x-2 text-[10px] font-bold text-deep-navy z-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-blue"></span>
          </span>
          <span className="font-mono text-slate-500 tracking-tight">Active Sparring Lobby</span>
        </motion.div>

        {/* Floating Gold III Rank Badge */}
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [2, -2, 2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute top-[72%] left-[4%] lg:left-[8%] bg-slate-900 border border-slate-800 text-white shadow-xl px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 text-[9px] font-black uppercase tracking-wider z-10"
        >
          <span className="text-yellow-400">🏆</span>
          <span>Rank: Gold III</span>
        </motion.div>

        {/* Small transparent floating badminton shuttlecock emoji */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[14%] left-[45%] text-2xl opacity-[0.12] pointer-events-none hidden lg:block"
        >
          🏸
        </motion.div>

        {/* Small transparent floating basketball emoji */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[22%] left-[32%] text-2xl opacity-[0.12] pointer-events-none hidden lg:block"
        >
          🏀
        </motion.div>
      </div>
    </div>
  );
}
