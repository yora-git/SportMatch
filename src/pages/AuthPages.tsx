/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { Button, Card } from '../components/UIComponents';
import { CURRENT_USER } from '../lib/demo-data';
import { User } from '../types';
import { getPremiumCartoonAvatar } from '../lib/avatar-utils';

interface AuthPagesProps {
  type: 'login' | 'register';
  setRoute: (route: string) => void;
  onLoginSuccess: (user: User, isDemo?: boolean) => void;
}

export default function AuthPages({ type, setRoute, onLoginSuccess }: AuthPagesProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('Bandung');
  const [selectedSport, setSelectedSport] = useState('Badminton');
  const [selectedSkill, setSelectedSkill] = useState<'Rookie' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Elite' | 'Legend'>('Gold');
  const [step, setStep] = useState(1); // For multi-step registration (sport and skill selection)
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        onLoginSuccess(userDoc.data() as User);
        setRoute('dashboard');
      } else {
        const defaultUser: User = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || 'Athletic Contender',
          username: userCredential.user.email?.split('@')[0] || 'user_' + userCredential.user.uid.substring(0, 5),
          email: userCredential.user.email || email,
          avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${userCredential.user.uid}&backgroundColor=f1f5f9,e2e8f0,cbd5e1`,
          city: 'Bandung',
          bio: 'Dedicated practitioner looking for sparring partnerships.',
          main_sport: 'Badminton',
          skill_level: 'Gold',
          rank_tier: 'Gold',
          reputation_score: 100,
          privacy_mode: 'Open for Challenge',
          created_at: new Date().toISOString().split('T')[0]
        };
        await setDoc(doc(db, 'users', userCredential.user.uid), defaultUser);
        onLoginSuccess(defaultUser);
        setRoute('dashboard');
      }
    } catch (e: any) {
      console.error(e);
      let errMsg = 'Failed to authenticate user.';
      if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email or password.';
      } else if (e.code === 'auth/invalid-email') {
        errMsg = 'Invalid email address format.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser: User = {
        id: userCredential.user.uid,
        name: name || 'Athletic Contender',
        username: username || 'contender_' + userCredential.user.uid.substring(0, 4),
        email: email,
        avatar_url: getPremiumCartoonAvatar(name || 'Contender', 'auto'),
        city: city,
        bio: `Dedicated ${selectedSport} practitioner looking for sparring partnerships.`,
        main_sport: selectedSport,
        skill_level: selectedSkill,
        rank_tier: selectedSkill,
        reputation_score: 100,
        privacy_mode: 'Open for Challenge',
        created_at: new Date().toISOString().split('T')[0]
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      onLoginSuccess(newUser);
      setRoute('dashboard');
    } catch (e: any) {
      console.error(e);
      let errMsg = 'Failed to register athlete.';
      if (e.code === 'auth/email-already-in-use') {
        errMsg = 'This email address is already registered.';
      } else if (e.code === 'auth/weak-password') {
        errMsg = 'Password must be at least 6 characters.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userSnapshot = await getDoc(userDocRef);
      let loggedInUser: User;
      if (userSnapshot.exists()) {
        loggedInUser = userSnapshot.data() as User;
      } else {
        loggedInUser = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || 'Athletic Contender',
          username: userCredential.user.email?.split('@')[0] || 'user_' + userCredential.user.uid.substring(0, 5),
          email: userCredential.user.email || '',
          avatar_url: userCredential.user.photoURL || getPremiumCartoonAvatar(userCredential.user.displayName || 'Contender', 'auto'),
          city: 'Bandung',
          bio: 'Dedicated practitioner looking for sparring partnerships.',
          main_sport: 'Badminton',
          skill_level: 'Gold',
          rank_tier: 'Gold',
          reputation_score: 100,
          privacy_mode: 'Open for Challenge',
          created_at: new Date().toISOString().split('T')[0]
        };
        await setDoc(userDocRef, loggedInUser);
      }
      onLoginSuccess(loggedInUser);
      setRoute('dashboard');
    } catch (e: any) {
      console.error(e);
      if (e.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled yet in your Firebase Project. Please enable "Google" under Firebase Console -> Authentication -> Sign-in method, or use Email & Password above!');
      } else if (e.code === 'auth/popup-blocked') {
        setError('The Google sign-in popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (e.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in popup was closed before completing. Please try again.');
      } else {
        setError(e.message || 'Google sign-in was interrupted or failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sportsOptions = ['Badminton', 'Basketball', 'Futsal', 'Tennis', 'Running'];
  const skillOptions = ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite', 'Legend'];

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      {type === 'login' ? (
        /* LOGIN CARD */
        <Card hoverEffect={false} className="p-8 border border-slate-200 bg-white shadow-xl rounded-3xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-blue flex items-center justify-center font-black text-2xl italic text-white shadow-lg shadow-primary-blue/30 mx-auto mb-3">
              S
            </div>
            <h2 className="text-2xl font-black text-deep-navy">Welcome Back, Athlete</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Enter credentials to synchronize sparring lobbies</p>
          </div>

          {error && (
            <div className="p-3.5 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold font-mono">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="kelvinrudyanto2007@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold font-mono">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={isLoading} className="py-3 mt-2 text-xs font-black shadow-md shadow-primary-blue/10">
              {isLoading ? 'Authenticating...' : 'Synchronize Session'}
            </Button>
          </form>

          {/* Secure Connections */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-2.5 h-[1px] bg-slate-100"></span>
            <span className="relative bg-white px-3.5 text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
              Secure Cloud Access
            </span>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-55 text-white text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-blue-600/10"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.65 4.5 1.8l2.4-2.4C17.3 1.7 14.9 1 12.24 1a10 10 0 0 0-10 10 10 10 0 0 0 10 10c5.3 0 9.24-3.73 9.24-9.24 0-.57-.05-1.12-.15-1.63H12.24z"/>
              </svg>
              <span>{isLoading ? 'Connecting Google...' : 'Sign in with Google'}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  const stravaUser: User = {
                    ...CURRENT_USER,
                    id: 'strava-demo-id',
                    name: 'Kelvin Rudyanto (Strava Demo)',
                    username: 'strava_demo',
                    email: 'strava-demo@sportmatch.app',
                  };
                  onLoginSuccess(stravaUser, true);
                  setRoute('dashboard');
                }}
                className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/25 text-orange-600 text-xs font-extrabold cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                <span>Strava Demo</span>
              </button>
              <button
                onClick={() => {
                  const appleUser: User = {
                    ...CURRENT_USER,
                    id: 'apple-demo-id',
                    name: 'Kelvin Rudyanto (Apple Demo)',
                    username: 'apple_demo',
                    email: 'apple-demo@sportmatch.app',
                  };
                  onLoginSuccess(appleUser, true);
                  setRoute('dashboard');
                }}
                className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-extrabold cursor-pointer transition-all"
              >
                <span>Apple Demo</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-8 font-bold">
            Don't have a profile yet?{' '}
            <button onClick={() => setRoute('register')} className="text-primary-blue font-extrabold hover:underline cursor-pointer">
              Register Here
            </button>
          </p>
        </Card>
      ) : (
        /* REGISTER CARD (Multi-step) */
        <Card hoverEffect={false} className="p-8 border border-slate-200 bg-white shadow-xl rounded-3xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-blue flex items-center justify-center font-black text-2xl italic text-white shadow-lg shadow-primary-blue/30 mx-auto mb-3">
              S
            </div>
            <h2 className="text-2xl font-black text-deep-navy">Create Athlete Card</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-semibold">Step {step} of 2: {step === 1 ? 'Credential Setup' : 'Sports Preference'}</p>
          </div>

          {error && (
            <div className="p-3.5 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold font-mono">Full Athlete Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kelvin Rudyanto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold font-mono">Athletic Handle (@username)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-mono font-black">@</span>
                  <input
                    type="text"
                    required
                    placeholder="kelvin_r"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold font-mono">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="kelvinrudyanto2007@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold font-mono">Account Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold font-mono">Home City</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-rose-500" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue appearance-none cursor-pointer font-semibold"
                  >
                    <option value="Bandung">Bandung, West Java</option>
                    <option value="Jakarta">Jakarta, Capital Area</option>
                  </select>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                className="py-3 mt-2 text-xs font-black shadow-md shadow-primary-blue/10"
                onClick={() => {
                  if (!name || !username || !email || !password) {
                    setError('Please complete all credential fields to proceed.');
                  } else if (password.length < 6) {
                    setError('Password must be at least 6 characters.');
                  } else {
                    setError(null);
                    setStep(2);
                  }
                }}
              >
                Continue Setup
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              <div className="relative my-4 text-center">
                <span className="absolute inset-x-0 top-2.5 h-[1px] bg-slate-100"></span>
                <span className="relative bg-white px-3.5 text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                  Quick Signup
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-55 text-white text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-blue-600/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.65 4.5 1.8l2.4-2.4C17.3 1.7 14.9 1 12.24 1a10 10 0 0 0-10 10 10 10 0 0 0 10 10c5.3 0 9.24-3.73 9.24-9.24 0-.57-.05-1.12-.15-1.63H12.24z"/>
                </svg>
                <span>Register with Google</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Select Main Sport */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-2.5 font-bold font-mono">Choose Your Primary Sport</label>
                <div className="grid grid-cols-2 gap-2">
                  {sportsOptions.map((sport) => (
                    <div
                      key={sport}
                      onClick={() => setSelectedSport(sport)}
                      className={`px-4 py-3 rounded-xl border text-xs font-extrabold text-center cursor-pointer transition-all ${
                        selectedSport === sport
                          ? 'bg-primary-blue/10 border-primary-blue text-primary-blue shadow-sm'
                          : 'bg-slate-50 border-slate-200/60 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {sport}
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Skill Level */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-2.5 font-bold font-mono">Select Skill/Competitive Level</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {skillOptions.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => setSelectedSkill(skill as any)}
                      className={`px-2 py-2 rounded-lg border text-[10px] font-extrabold text-center cursor-pointer transition-all ${
                        selectedSkill === skill
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600'
                          : 'bg-slate-50 border-slate-200/60 text-slate-400 hover:bg-slate-100/50'
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-slate-400 italic mt-2.5 text-center leading-relaxed font-semibold">
                  "Gold and higher requires submission of logged match receipts to enter ranked bracket cups."
                </div>
              </div>

              <div className="flex space-x-3 pt-2 font-bold">
                <Button variant="secondary" onClick={() => setStep(1)} className="text-xs">
                  Back
                </Button>
                <Button type="submit" variant="primary" fullWidth disabled={isLoading} className="text-xs font-black shadow-md shadow-primary-blue/10">
                  {isLoading ? 'Creating Athlete...' : 'Generate Athlete Profile'}
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-xs text-slate-400 mt-8 font-bold">
            Already registered?{' '}
            <button onClick={() => setRoute('login')} className="text-primary-blue font-extrabold hover:underline cursor-pointer">
              Log In Instead
            </button>
          </p>
        </Card>
      )}
    </div>
  );
}
