/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Users, Search, MapPin, PlusCircle } from 'lucide-react';
import { Community, Sport } from '../types';
import { Button, Card } from '../components/UIComponents';
import CommunityCard from '../components/CommunityCard';

interface CommunitiesProps {
  communities: Community[];
  sports: Sport[];
  setRoute: (route: string) => void;
  setSelectedCommunityId: (id: string) => void;
  onJoinToggle: (commId: string) => void;
  joinedCommunityIds: string[];
}

export default function Communities({
  communities,
  sports,
  setRoute,
  setSelectedCommunityId,
  onJoinToggle,
  joinedCommunityIds
}: CommunitiesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  // Filter categories from sports
  const categories = ['All', 'Team', 'Racquet', 'Athletics'];

  const filteredCommunities = communities.filter(comm => {
    // Search filter
    if (searchTerm && !comm.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    // City filter
    if (selectedCity !== 'All' && comm.city !== selectedCity) return false;

    // Category filter
    if (selectedCategory !== 'All') {
      const sportObj = sports.find(s => s.id === comm.sport_id);
      if (!sportObj || sportObj.category !== selectedCategory) return false;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-deep-navy flex items-center">
            <Users className="w-6 h-6 text-primary-blue mr-2.5" />
            Sports Spaces
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Coordinate evening courts and leagues inside Discord-style communities</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            alert("Create space utility requires certified admin credentials. Contact SportMatch Support.");
          }}
          className="text-xs font-bold"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" />
          Establish Space
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR: SEARCH & CATEGORIES (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search spaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue placeholder:text-slate-400 font-semibold"
            />
          </div>

          {/* City filter selection */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Region Filters</span>
            <div className="space-y-1">
              {['All', 'Bandung', 'Jakarta'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedCity === city
                      ? 'bg-primary-blue/10 border-primary-blue/20 text-primary-blue'
                      : 'border-transparent text-slate-500 hover:text-deep-navy hover:bg-slate-100/60'
                  }`}
                >
                  <span>{city === 'All' ? 'All Indonesia' : city}</span>
                  {city !== 'All' && <MapPin className="w-3.5 h-3.5 text-rose-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Categories Sidebar */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Sport Divisions</span>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-primary-blue/10 border-primary-blue/20 text-primary-blue'
                      : 'border-transparent text-slate-500 hover:text-deep-navy hover:bg-slate-100/60'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : `${cat} Sports`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SPACES GRID (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Featured community banner */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md relative overflow-hidden flex items-center justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-blue/5 rounded-full filter blur-xl pointer-events-none"></div>
            <div className="space-y-2.5 max-w-md">
              <span className="text-[9px] font-bold text-yellow-600 uppercase bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/15 tracking-wider font-mono">
                COMMUNITY HIGHLIGHT
              </span>
              <h3 className="font-black text-base text-deep-navy">Bandung Badminton Arena (BBA)</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Join Bandung's largest badminton matchmaking network. Weekly challenge ladders are active. Enter space to claim court privileges.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-xs mt-2 border-slate-200 text-slate-600"
                onClick={() => {
                  setSelectedCommunityId('comm_bba');
                  setRoute('community-detail');
                }}
              >
                Enter BBA Lobby
              </Button>
            </div>
            
            <Users className="w-24 h-24 text-primary-blue/10 absolute -right-4 -bottom-4 lg:relative lg:right-0 lg:bottom-0" />
          </div>

          {/* Communities main list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCommunities.length === 0 ? (
              <div className="col-span-2 text-center p-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm text-slate-400 font-extrabold">No sports communities found.</p>
                <p className="text-xs text-slate-400 mt-1">Refine your category filters or start typing a different name.</p>
              </div>
            ) : (
              filteredCommunities.map((comm) => {
                const sp = sports.find(s => s.id === comm.sport_id) || sports[0];
                return (
                  <CommunityCard
                    key={comm.id}
                    community={comm}
                    sport={sp}
                    isJoined={joinedCommunityIds.includes(comm.id)}
                    onJoinToggle={() => onJoinToggle(comm.id)}
                    onViewDetails={() => {
                      setSelectedCommunityId(comm.id);
                      setRoute('community-detail');
                    }}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
