# SPORTMATCH 🏸🔥
> **"Find Your Rival. Improve Your Game."**

SportMatch is a premium, full-stack, next-generation sports social network built for athletes who crave high-intensity matches, local sparring lobbies, regional tournaments, and global ranking progression.

---

## 🎨 Design Tokens & Premium Aesthetic
We rejected cookie-cutter templates to establish an **Awwwards-style athletic energy** visual layout:
* **Primary Blue (#0B5FFF)**: Nike-energy athletic neon blue representing peak motivation.
* **Deep Navy (#07111F)**: Apple-grade midnight space backing representing pristine dark mode negative spacing.
* **Bronze Accent (#C58A4A)**: High-end championship gold reflections for rank badges and tournament prize headers.
* **Warm Brown (#8B5E3C)**: Premium material textures for casual and clay court division tags.
* **Aesthetic Pairings**: Headings pair bold, confident **Poppins** with technical **JetBrains Mono** data points to deliver clean, modern interfaces resembling Linear and Strava.

---

## 🚀 Key App Modules & Pages Included

The MVP includes **12 fully developed modular, interactive views** with seamless transitions:
1. **Landing Page (`/`)**: Awwwards-style hero section featuring drifting **FloatingPreviewCards**, metric trust banners, and functional feature grids.
2. **Auth Pages (`/login`, `/register`)**: Interactive registration form that captures main sports (Badminton, Basketball, Tennis, Futsal, Running) and skill brackets (Rookie up to Legend).
3. **Dashboard (`/dashboard`)**: Logged-in panel tracking Reputation Scores, active weekly cardio minutes, live **ProgressCharts**, and nearby rivals.
4. **Feed (`/feed`)**: Instagram-style social sharing board where athletes can publish workouts, toggle likes, and comment.
5. **Matchmaking (`/match`)**: Tinder-style player-swipe deck supporting gestures for passing or sending active court invites.
6. **Spaces (`/communities`)**: Discord-style category networks listing regional organizations in Bandung and Jakarta.
7. **Space Details (`/communities/[id]`)**: Immersive chat deck with dedicated text channels, event calendars, and chat submission feeds.
8. **Tournaments (`/tournaments`)**: Bracket visualizations, Grand Prize pools, slot progress, and registered slot configurations.
9. **Rankings (`/rankings`)**: Leaderboards displaying win/loss sheets, points tallies, and rank badges.
10. **Profiles (`/profile`)**: Cover details, biographies, verified athletic badges, and past sparring results.
11. **My Stats (`/progress`)**: Strava-style cardio loggers where players submit workout durations, intensity levels, and reviews.
12. **Settings (`/settings`)**: Preferences console to change profile details, select notifications alerts, and toggle privacy modes.

---

## 🗄️ Supabase Relational Schema Setup
The complete database model is documented and ready for migration inside `/supabase-schema.sql`. It defines:
* `users`
* `sports`
* `matches`
* `posts`
* `communities`
* `community_members`
* `tournaments`
* `rankings`
* `progress_entries`

---

## ⚙️ How to Run & Deploy

### 1. Synchronize Dependencies
Ensure that packages are installed. The environment handles automatic builds, but if needed, run:
```bash
npm install
```

### 2. Configure Environment Secrets
Make a copy of `.env.example` as `.env` and fill in your Supabase credentials:
```env
VITE_SUPABASE_URL="https://your-supabase-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key-here"
```

### 3. Launch Development Server
```bash
npm run dev
```
The dev server will boot and serve the app at: **http://localhost:3000**
