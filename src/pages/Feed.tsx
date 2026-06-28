/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Newspaper, ImageIcon, PlusCircle } from 'lucide-react';
import { Post, User, Sport } from '../types';
import { Card, Button } from '../components/UIComponents';
import PostCard from '../components/PostCard';

interface FeedProps {
  currentUser: User;
  posts: Post[];
  athletes: User[];
  sports: Sport[];
  onAddPost: (content: string, image_url?: string) => void;
}

export default function Feed({
  currentUser,
  posts,
  athletes,
  sports,
  onAddPost
}: FeedProps) {
  const [activeTab, setActiveTab] = useState<'for-you' | 'following' | 'nearby' | 'trending'>('for-you');
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [showPublisher, setShowPublisher] = useState(false);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    
    // Fallback image if empty
    const imgUrl = newPostImage.trim() || undefined;
    onAddPost(newPostText, imgUrl);
    
    // Reset
    setNewPostText('');
    setNewPostImage('');
    setShowPublisher(false);
  };

  const tabs = [
    { id: 'for-you', label: 'For You' },
    { id: 'following', label: 'Following' },
    { id: 'nearby', label: 'Nearby (Bandung)' },
    { id: 'trending', label: 'Trending Runs' }
  ];

  // Filter posts based on tab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'nearby') {
      const author = athletes.find(a => a.id === post.user_id) || currentUser;
      return author.city === 'Bandung';
    }
    return true; // Simple logic for other tabs
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      
      {/* Feed Headline */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-deep-navy flex items-center">
            <Newspaper className="w-6 h-6 text-primary-blue mr-2.5" />
            Athletic Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">Share training sessions, matching summaries, and highlights</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowPublisher(!showPublisher)}
          className="text-xs font-bold"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" />
          Share Session
        </Button>
      </div>

      {/* PUBLISH POST BOX */}
      {showPublisher && (
        <Card hoverEffect={false} className="border border-slate-200 bg-white p-5 rounded-2xl shadow-md">
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Write Session Summary</label>
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What athletic milestone did you clear today? (e.g. Cleared 4 badminton sets in Bandung! Smash speed feels amazing...)"
                rows={3}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">Graphic Attachment URL (Optional)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1521537634199-673689440ade?q=80"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-1 font-semibold">
              <Button variant="ghost" size="sm" type="button" className="text-slate-500" onClick={() => setShowPublisher(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Publish Run
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* FILTER TABS */}
      <div className="flex border-b border-slate-100 pb-2 overflow-x-auto gap-2 scrollbar-none font-bold">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
              activeTab === tab.id
                ? 'bg-primary-blue/10 text-primary-blue border-primary-blue/20'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SOCIAL POSTS LIST */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 p-12 rounded-3xl text-center space-y-3 shadow-sm">
            <p className="text-sm text-slate-500 font-extrabold">No active athletic posts in this segment.</p>
            <Button variant="primary" size="sm" onClick={() => setShowPublisher(true)}>
              Be the first to share!
            </Button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const author = athletes.find(a => a.id === post.user_id) || currentUser;
            const sport = sports.find(s => s.id === post.sport_id) || sports[0];
            return (
              <PostCard
                key={post.id}
                post={post}
                author={author}
                sport={sport}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
