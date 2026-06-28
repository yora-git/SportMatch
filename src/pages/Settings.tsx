/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Award, Check } from 'lucide-react';
import { User } from '../types';
import { Card, Button } from '../components/UIComponents';

interface SettingsProps {
  currentUser: User;
  onUpdateSettings: (updatedUser: User) => void;
}

export default function Settings({
  currentUser,
  onUpdateSettings
}: SettingsProps) {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [privacy, setPrivacy] = useState<'Public' | 'Private' | 'Open for Challenge'>(currentUser.privacy_mode);
  
  // notification toggle mock states
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [tournamentInvites, setTournamentInvites] = useState(true);
  const [feedLikes, setFeedLikes] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...currentUser,
      name,
      bio,
      privacy_mode: privacy
    });
    alert("Settings updated successfully! Changes broadcasted globally.");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-deep-navy flex items-center">
          <SettingsIcon className="w-6 h-6 text-primary-blue mr-2.5 animate-spin" style={{ animationDuration: '6s' }} />
          Athlete Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Configure matching conditions, privacy models, and notifications alerts</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card Settings */}
        <Card hoverEffect={false} className="border border-slate-200 bg-white p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="text-sm font-black text-deep-navy flex items-center border-b border-slate-100 pb-2">
            <Award className="w-4 h-4 text-primary-blue mr-2 shrink-0" /> Profile Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Athlete Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Location Region (Locked)</label>
              <input
                type="text"
                disabled
                value={`${currentUser.city}, West Java`}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-400 font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Athlete Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold"
            />
          </div>
        </Card>

        {/* Privacy & Lobby state Options */}
        <Card hoverEffect={false} className="border border-slate-200 bg-white p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="text-sm font-black text-deep-navy flex items-center border-b border-slate-100 pb-2">
            <Shield className="w-4 h-4 text-rose-500 mr-2 shrink-0" /> Matchmaking Privacy Models
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'Open for Challenge' as const, label: 'Open for Match', desc: 'Spars list you nearby' },
              { id: 'Public' as const, label: 'Public Only', desc: 'Observe stats, deck off' },
              { id: 'Private' as const, label: 'Private Mode', desc: 'Roster offline state' }
            ].map(opt => {
              const active = privacy === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setPrivacy(opt.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-xs text-left transition-all font-semibold ${
                    active
                      ? 'bg-primary-blue/5 border-primary-blue text-primary-blue shadow-sm'
                      : 'bg-slate-50 border-slate-200/80 text-slate-400 hover:bg-slate-100 hover:text-deep-navy'
                  }`}
                >
                  <div className="font-extrabold flex justify-between items-center">
                    <span>{opt.label}</span>
                    {active && <Check className="w-3.5 h-3.5 text-primary-blue shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Notification preferences */}
        <Card hoverEffect={false} className="border border-slate-200 bg-white p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="text-sm font-black text-deep-navy flex items-center border-b border-slate-100 pb-2">
            <Bell className="w-4 h-4 text-yellow-600 mr-2 shrink-0" /> Transmission Channels
          </h3>

          <div className="space-y-3.5 text-xs text-slate-600 font-semibold">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Lobby match alerts & court invites</span>
              <input
                type="checkbox"
                checked={matchAlerts}
                onChange={(e) => setMatchAlerts(e.target.checked)}
                className="w-4 h-4 border border-slate-200 rounded text-primary-blue focus:ring-primary-blue cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3">
              <span>Weekly local bracket cup reminders</span>
              <input
                type="checkbox"
                checked={tournamentInvites}
                onChange={(e) => setTournamentInvites(e.target.checked)}
                className="w-4 h-4 border border-slate-200 rounded text-primary-blue focus:ring-primary-blue cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3">
              <span>Social feed comments & running notifications</span>
              <input
                type="checkbox"
                checked={feedLikes}
                onChange={(e) => setFeedLikes(e.target.checked)}
                className="w-4 h-4 border border-slate-200 rounded text-primary-blue focus:ring-primary-blue cursor-pointer"
              />
            </label>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
