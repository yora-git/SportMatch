/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';

// Core Types
import { User, Match, Post, Community, Tournament, ProgressEntry, Sport } from './types';

// Seed & Demo Datasets
import {
  CURRENT_USER,
  DEMO_USERS,
  DEMO_MATCHES,
  DEMO_POSTS,
  DEMO_COMMUNITIES,
  DEMO_TOURNAMENTS,
  DEMO_PROGRESS,
  SPORTS
} from './lib/demo-data';

// Shared UI Elements & Framework Utilities
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { AnimatedBackground } from './components/UIComponents';
import LiquidGlassNavbar from './components/LiquidGlassNavbar';

// App View Modules
import LandingPage from './pages/LandingPage';
import AuthPages from './pages/AuthPages';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import Matchmaking from './pages/Matchmaking';
import Communities from './pages/Communities';
import CommunityDetail from './pages/CommunityDetail';
import Tournaments from './pages/Tournaments';
import Rankings from './pages/Rankings';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

export default function App() {
  // Routing Engine State
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [sessionUser, setSessionUser] = useState<User>(CURRENT_USER);

  // Dynamic Data States (allows live interactions)
  const [athletes, setAthletes] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);

  // Interactive Sub-item Selection references
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>('comm_bba');
  const [profileViewAthlete, setProfileViewAthlete] = useState<User>(CURRENT_USER);
  const [joinedCommunityIds, setJoinedCommunityIds] = useState<string[]>(['comm_bba', 'comm_jbr']);
  const [registeredTourIds, setRegisteredTourIds] = useState<string[]>(['tour_1']);

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Firebase Authentication Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsDemo(false);
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userSnapshot = await getDoc(userDocRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data() as User;
            setSessionUser(userData);
            setProfileViewAthlete(userData);
            setIsLoggedIn(true);
            if (['landing', 'login', 'register'].includes(currentRoute)) {
              setCurrentRoute('dashboard');
            }
          } else {
            // Document doesn't exist yet, wait for AuthPages registration or set default
            const defaultUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'Athletic Contender',
              username: firebaseUser.email?.split('@')[0] || 'user_' + firebaseUser.uid.substring(0, 5),
              email: firebaseUser.email || '',
              avatar_url: firebaseUser.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${firebaseUser.uid}&backgroundColor=f1f5f9,e2e8f0,cbd5e1`,
              city: 'Bandung',
              bio: 'Dedicated practitioner looking for sparring partnerships.',
              main_sport: 'Badminton',
              skill_level: 'Gold',
              rank_tier: 'Gold',
              reputation_score: 100,
              privacy_mode: 'Open for Challenge',
              created_at: new Date().toISOString().split('T')[0]
            };
            await setDoc(userDocRef, defaultUser);
            setSessionUser(defaultUser);
            setProfileViewAthlete(defaultUser);
            setIsLoggedIn(true);
            if (['landing', 'login', 'register'].includes(currentRoute)) {
              setCurrentRoute('dashboard');
            }
          }
        } catch (error) {
          console.error('Error in auth state change profile query:', error);
        }
      } else {
        if (!isDemo) {
          setIsLoggedIn(false);
        }
      }
    });
    return () => unsubscribe();
  }, [currentRoute, isDemo]);

  // Seeding helper to pre-populate database for testing
  const seedDatabaseIfEmpty = async () => {
    try {
      const seeded = localStorage.getItem('sportmatch_seeded_db');
      if (seeded) return;

      const postsSnap = await getDocs(collection(db, 'posts'));
      if (postsSnap.empty) {
        console.log('Seeding Firestore database with default demo data...');
        for (const user of DEMO_USERS) {
          await setDoc(doc(db, 'users', user.id), user);
        }
        for (const post of DEMO_POSTS) {
          await setDoc(doc(db, 'posts', post.id), post);
        }
        for (const match of DEMO_MATCHES) {
          await setDoc(doc(db, 'matches', match.id), match);
        }
        for (const comm of DEMO_COMMUNITIES) {
          await setDoc(doc(db, 'communities', comm.id), comm);
        }
        for (const tour of DEMO_TOURNAMENTS) {
          await setDoc(doc(db, 'tournaments', tour.id), tour);
        }
        for (const prog of DEMO_PROGRESS) {
          await setDoc(doc(db, 'progressEntries', prog.id), prog);
        }
        localStorage.setItem('sportmatch_seeded_db', 'true');
        console.log('Database seeded successfully.');
      }
    } catch (e) {
      console.error('Database seeding failed:', e);
    }
  };

  // Firestore Real-time Synchronization listeners
  useEffect(() => {
    if (!isLoggedIn || isDemo) {
      // Fallback to static demo data when logged out or in demo mode so landing view looks good
      setAthletes(DEMO_USERS);
      setPosts(DEMO_POSTS);
      setMatches(DEMO_MATCHES);
      setCommunities(DEMO_COMMUNITIES);
      setTournaments(DEMO_TOURNAMENTS);
      setProgressEntries(DEMO_PROGRESS);
      return;
    }

    seedDatabaseIfEmpty();

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const list: User[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as User);
      });
      const merged = [...list];
      DEMO_USERS.forEach(demoUser => {
        if (!merged.some(u => u.id === demoUser.id)) {
          merged.push(demoUser);
        }
      });
      setAthletes(merged);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'users'));

    const unsubscribePosts = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const list: Post[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Post);
      });
      const merged = [...list];
      DEMO_POSTS.forEach(demoPost => {
        if (!merged.some(p => p.id === demoPost.id)) {
          merged.push(demoPost);
        }
      });
      merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setPosts(merged);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'posts'));

    const unsubscribeMatches = onSnapshot(collection(db, 'matches'), (snapshot) => {
      const list: Match[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Match);
      });
      const merged = [...list];
      DEMO_MATCHES.forEach(demoMatch => {
        if (!merged.some(m => m.id === demoMatch.id)) {
          merged.push(demoMatch);
        }
      });
      setMatches(merged);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'matches'));

    const unsubscribeCommunities = onSnapshot(collection(db, 'communities'), (snapshot) => {
      const list: Community[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Community);
      });
      const merged = [...list];
      DEMO_COMMUNITIES.forEach(demoComm => {
        if (!merged.some(c => c.id === demoComm.id)) {
          merged.push(demoComm);
        }
      });
      setCommunities(merged);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'communities'));

    const unsubscribeTournaments = onSnapshot(collection(db, 'tournaments'), (snapshot) => {
      const list: Tournament[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Tournament);
      });
      const merged = [...list];
      DEMO_TOURNAMENTS.forEach(demoTour => {
        if (!merged.some(t => t.id === demoTour.id)) {
          merged.push(demoTour);
        }
      });
      setTournaments(merged);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'tournaments'));

    const unsubscribeProgress = onSnapshot(collection(db, 'progressEntries'), (snapshot) => {
      const list: ProgressEntry[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as ProgressEntry);
      });
      const merged = [...list];
      DEMO_PROGRESS.forEach(demoProg => {
        if (!merged.some(p => p.id === demoProg.id)) {
          merged.push(demoProg);
        }
      });
      merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setProgressEntries(merged);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'progressEntries'));

    return () => {
      unsubscribeUsers();
      unsubscribePosts();
      unsubscribeMatches();
      unsubscribeCommunities();
      unsubscribeTournaments();
      unsubscribeProgress();
    };
  }, [isLoggedIn, isDemo]);

  // Auth Action handlers
  const handleLoginSuccess = (user: User, isDemoUser: boolean = false) => {
    setSessionUser(user);
    setProfileViewAthlete(user);
    setIsDemo(isDemoUser);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setIsDemo(false);
      setCurrentRoute('landing');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  // Profile update handler
  const handleUpdateSettings = async (updatedUser: User) => {
    if (isDemo) {
      setSessionUser(updatedUser);
      setProfileViewAthlete(updatedUser);
      setAthletes(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      return;
    }
    try {
      await setDoc(doc(db, 'users', updatedUser.id), updatedUser);
      setSessionUser(updatedUser);
      setProfileViewAthlete(updatedUser);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${updatedUser.id}`);
    }
  };

  // Social feed action handler
  const handleAddPost = async (content: string, imageUrl?: string) => {
    const newPostId = 'post_' + Date.now();
    const newPost: Post = {
      id: newPostId,
      user_id: sessionUser.id,
      content,
      sport_id: 'sport_badminton',
      image_url: imageUrl || '',
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString()
    };
    if (isDemo) {
      setPosts(prev => [newPost, ...prev]);
      return;
    }
    try {
      await setDoc(doc(db, 'posts', newPostId), newPost);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `posts/${newPostId}`);
    }
  };

  // Sparring Lobby creation handler
  const handleInitiateMatchChallenge = async (opponentId: string, location: string, scheduledTime: string) => {
    const newMatchId = 'match_' + Date.now();
    const newMatch: Match = {
      id: newMatchId,
      challenger_id: sessionUser.id,
      opponent_id: opponentId,
      sport_id: 'sport_badminton',
      status: 'Pending',
      location,
      scheduled_at: scheduledTime,
      created_at: new Date().toISOString().split('T')[0]
    };
    if (isDemo) {
      setMatches(prev => [...prev, newMatch]);
      return;
    }
    try {
      await setDoc(doc(db, 'matches', newMatchId), newMatch);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `matches/${newMatchId}`);
    }
  };

  // Match Status update handler (Accept, Decline, Complete scoring)
  const handleMatchStatusChange = async (matchId: string, newStatus: 'Accepted' | 'Declined' | 'Completed') => {
    if (isDemo) {
      setMatches(prev => prev.map(m => m.id === matchId ? {
        ...m,
        status: newStatus,
        result: newStatus === 'Completed' ? `${sessionUser.name} won (2 sets to 1)` : m.result
      } : m));
      return;
    }
    try {
      const matchRef = doc(db, 'matches', matchId);
      if (newStatus === 'Completed') {
        await updateDoc(matchRef, {
          status: 'Completed',
          result: `${sessionUser.name} won (2 sets to 1)`
        });
      } else {
        await updateDoc(matchRef, { status: newStatus });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `matches/${matchId}`);
    }
  };

  // Community join handler
  const handleCommunityJoinToggle = async (commId: string) => {
    const isJoined = joinedCommunityIds.includes(commId);
    const targetComm = communities.find(c => c.id === commId);
    const newMemberCount = isJoined 
      ? (targetComm ? Math.max(0, targetComm.member_count - 1) : 0) 
      : (targetComm ? targetComm.member_count + 1 : 1);
      
    if (isDemo) {
      if (isJoined) {
        setJoinedCommunityIds(joinedCommunityIds.filter(id => id !== commId));
      } else {
        setJoinedCommunityIds([...joinedCommunityIds, commId]);
      }
      setCommunities(prev => prev.map(c => c.id === commId ? { ...c, member_count: newMemberCount } : c));
      return;
    }
    try {
      const commRef = doc(db, 'communities', commId);
      await updateDoc(commRef, { member_count: newMemberCount });

      if (isJoined) {
        setJoinedCommunityIds(joinedCommunityIds.filter(id => id !== commId));
      } else {
        setJoinedCommunityIds([...joinedCommunityIds, commId]);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `communities/${commId}`);
    }
  };

  // Tournament registration handler
  const handleTournamentRegisterToggle = async (tourId: string) => {
    const isReg = registeredTourIds.includes(tourId);
    const targetTour = tournaments.find(t => t.id === tourId);
    const newParticipantsCount = isReg 
      ? (targetTour ? Math.max(0, targetTour.current_participants - 1) : 0) 
      : (targetTour ? targetTour.current_participants + 1 : 1);

    if (isDemo) {
      if (isReg) {
        setRegisteredTourIds(registeredTourIds.filter(id => id !== tourId));
      } else {
        setRegisteredTourIds([...registeredTourIds, tourId]);
      }
      setTournaments(prev => prev.map(t => t.id === tourId ? { ...t, current_participants: newParticipantsCount } : t));
      return;
    }
    try {
      const tourRef = doc(db, 'tournaments', tourId);
      await updateDoc(tourRef, { current_participants: newParticipantsCount });

      if (isReg) {
        setRegisteredTourIds(registeredTourIds.filter(id => id !== tourId));
      } else {
        setRegisteredTourIds([...registeredTourIds, tourId]);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `tournaments/${tourId}`);
    }
  };

  // Strava tracking session logger
  const handleAddProgressLog = async (sportId: string, activityType: string, duration: number, performance: number, notes: string) => {
    const newEntryId = 'prog_' + Date.now();
    const newEntry: ProgressEntry = {
      id: newEntryId,
      user_id: sessionUser.id,
      sport_id: sportId,
      activity_type: activityType,
      duration_minutes: duration,
      performance_score: performance,
      notes,
      created_at: new Date().toISOString().split('T')[0]
    };
    if (isDemo) {
      setProgressEntries(prev => [newEntry, ...prev]);
      return;
    }
    try {
      await setDoc(doc(db, 'progressEntries', newEntryId), newEntry);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `progressEntries/${newEntryId}`);
    }
  };


  // Determine active render page based on currentRoute
  const renderActivePage = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage setRoute={setCurrentRoute} isLoggedIn={isLoggedIn} />;
      
      case 'login':
        return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
      
      case 'register':
        return <AuthPages type="register" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;

      case 'dashboard':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Dashboard
            currentUser={sessionUser}
            athletes={athletes}
            matches={matches}
            communities={communities}
            tournaments={tournaments}
            sports={SPORTS}
            progress={progressEntries}
            setRoute={setCurrentRoute}
            setSelectedCommunityId={setSelectedCommunityId}
            onMatchStatusChange={handleMatchStatusChange}
          />
        );

      case 'feed':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Feed
            currentUser={sessionUser}
            posts={posts}
            athletes={athletes}
            sports={SPORTS}
            onAddPost={handleAddPost}
          />
        );

      case 'match':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Matchmaking
            currentUser={sessionUser}
            athletes={athletes}
            sports={SPORTS}
            setRoute={setCurrentRoute}
            onInitiateMatch={handleInitiateMatchChallenge}
          />
        );

      case 'communities':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Communities
            communities={communities}
            sports={SPORTS}
            setRoute={setCurrentRoute}
            setSelectedCommunityId={setSelectedCommunityId}
            onJoinToggle={handleCommunityJoinToggle}
            joinedCommunityIds={joinedCommunityIds}
          />
        );

      case 'community-detail':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        const activeComm = communities.find(c => c.id === selectedCommunityId) || communities[0];
        const activeCommSport = SPORTS.find(s => s.id === activeComm.sport_id) || SPORTS[0];
        return (
          <CommunityDetail
            community={activeComm}
            sport={activeCommSport}
            setRoute={setCurrentRoute}
            isJoined={joinedCommunityIds.includes(activeComm.id)}
            onJoinToggle={() => handleCommunityJoinToggle(activeComm.id)}
          />
        );

      case 'tournaments':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Tournaments
            tournaments={tournaments}
            sports={SPORTS}
            onRegisterToggle={handleTournamentRegisterToggle}
            registeredTourIds={registeredTourIds}
          />
        );

      case 'rankings':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Rankings
            currentUser={sessionUser}
            athletes={athletes}
            sports={SPORTS}
          />
        );

      case 'profile':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Profile
            currentUser={sessionUser}
            athlete={profileViewAthlete}
            posts={posts}
            matches={matches}
            sports={SPORTS}
            progress={progressEntries}
            setRoute={setCurrentRoute}
            onChallenge={() => {
              setCurrentRoute('match');
            }}
            onMessage={() => {
              setCurrentRoute('feed');
            }}
          />
        );

      case 'progress':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Progress
            currentUser={sessionUser}
            progress={progressEntries}
            sports={SPORTS}
            onAddProgress={handleAddProgressLog}
          />
        );

      case 'settings':
        if (!isLoggedIn) return <AuthPages type="login" setRoute={setCurrentRoute} onLoginSuccess={handleLoginSuccess} />;
        return (
          <Settings
            currentUser={sessionUser}
            onUpdateSettings={handleUpdateSettings}
          />
        );

      default:
        return <LandingPage setRoute={setCurrentRoute} isLoggedIn={isLoggedIn} />;
    }
  };

  // Check if side nav columns are needed on the layout
  const requiresSidebar = isLoggedIn && ![ 'landing', 'login', 'register', 'community-detail' ].includes(currentRoute);

  return (
    <div className="min-h-screen bg-brand-bg text-deep-navy flex flex-col justify-between relative selection:bg-primary-blue selection:text-white">
      
      {/* Visual background gradient meshes */}
      <AnimatedBackground />

      <div className="flex flex-col flex-1">
        
        {/* Top Navbar Header */}
        <Navbar
          currentRoute={currentRoute}
          setRoute={setCurrentRoute}
          isLoggedIn={isLoggedIn}
          currentUser={sessionUser}
          onLogout={handleLogout}
        />

        {/* Global Body Container */}
        <div className="flex flex-1 max-w-7xl w-full mx-auto relative">
          
          {/* Sidebar command rail column */}
          {requiresSidebar && (
            <Sidebar currentRoute={currentRoute} setRoute={setCurrentRoute} />
          )}

          {/* Core Page viewports */}
          <main className="flex-1 min-w-0 pt-2 pb-36">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoute}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {renderActivePage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Global Brand Footer */}
      <Footer setRoute={setCurrentRoute} />

      {/* Liquid Glass Bottom Navigation Bar */}
      <LiquidGlassNavbar
        currentRoute={currentRoute}
        setRoute={setCurrentRoute}
        currentUser={sessionUser}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
