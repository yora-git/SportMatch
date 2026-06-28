-- SPORTMATCH Supabase PostgreSQL Schema Configuration
-- Production-Ready relational schema matching types.ts models.

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY DEFAULT 'user_' || uuid_generate_v4()::text,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80',
    city TEXT NOT NULL DEFAULT 'Bandung',
    bio TEXT,
    main_sport TEXT NOT NULL DEFAULT 'Badminton',
    skill_level TEXT NOT NULL CHECK (skill_level IN ('Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite', 'Legend')),
    rank_tier TEXT NOT NULL CHECK (rank_tier IN ('Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite', 'Legend')),
    reputation_score INT NOT NULL DEFAULT 100 CHECK (reputation_score BETWEEN 0 AND 100),
    privacy_mode TEXT NOT NULL DEFAULT 'Open for Challenge' CHECK (privacy_mode IN ('Public', 'Private', 'Open for Challenge')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SPORTS TABLE
CREATE TABLE IF NOT EXISTS public.sports (
    id TEXT PRIMARY KEY DEFAULT 'sport_' || uuid_generate_v4()::text,
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL DEFAULT 'Sparkles',
    category TEXT NOT NULL CHECK (category IN ('Racquet', 'Team', 'Athletics'))
);

-- 3. MATCHES TABLE
CREATE TABLE IF NOT EXISTS public.matches (
    id TEXT PRIMARY KEY DEFAULT 'match_' || uuid_generate_v4()::text,
    challenger_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    opponent_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sport_id TEXT REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Declined', 'Completed', 'Cancelled')),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    result TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
    id TEXT PRIMARY KEY DEFAULT 'post_' || uuid_generate_v4()::text,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    sport_id TEXT REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT,
    likes_count INT NOT NULL DEFAULT 0,
    comments_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. COMMUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.communities (
    id TEXT PRIMARY KEY DEFAULT 'comm_' || uuid_generate_v4()::text,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    sport_id TEXT REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    city TEXT NOT NULL DEFAULT 'Bandung',
    member_count INT NOT NULL DEFAULT 1,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. COMMUNITY MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.community_members (
    id TEXT PRIMARY KEY DEFAULT 'cmem_' || uuid_generate_v4()::text,
    community_id TEXT REFERENCES public.communities(id) ON DELETE CASCADE NOT NULL,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL DEFAULT 'Member' CHECK (role IN ('Member', 'Moderator', 'Admin')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (community_id, user_id)
);

-- 7. TOURNAMENTS TABLE
CREATE TABLE IF NOT EXISTS public.tournaments (
    id TEXT PRIMARY KEY DEFAULT 'tour_' || uuid_generate_v4()::text,
    name TEXT NOT NULL UNIQUE,
    sport_id TEXT REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    city TEXT NOT NULL DEFAULT 'Bandung',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    max_participants INT NOT NULL DEFAULT 16,
    current_participants INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Registration' CHECK (status IN ('Registration', 'Ongoing', 'Completed')),
    prize TEXT NOT NULL,
    bracket_preview TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. RANKINGS TABLE
CREATE TABLE IF NOT EXISTS public.rankings (
    id TEXT PRIMARY KEY DEFAULT 'rank_' || uuid_generate_v4()::text,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sport_id TEXT REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    points INT NOT NULL DEFAULT 0,
    wins INT NOT NULL DEFAULT 0,
    losses INT NOT NULL DEFAULT 0,
    win_rate NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    rank_tier TEXT NOT NULL DEFAULT 'Rookie' CHECK (rank_tier IN ('Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite', 'Legend')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, sport_id)
);

-- 9. PROGRESS ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.progress_entries (
    id TEXT PRIMARY KEY DEFAULT 'prog_' || uuid_generate_v4()::text,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    sport_id TEXT REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    performance_score INT NOT NULL CHECK (performance_score BETWEEN 0 AND 100),
    notes TEXT,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ROW LEVEL SECURITY (RLS) POLICIES EXAMPLES FOR SECURE SETUP:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read access to users" ON public.users FOR SELECT USING (true);
-- CREATE POLICY "Allow authenticated users to update own profile" ON public.users FOR UPDATE USING (auth.uid()::text = id);
