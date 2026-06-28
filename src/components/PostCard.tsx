/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Award, Flame, MapPin } from 'lucide-react';
import { Post, User, Sport } from '../types';
import { Card, Badge, RankBadge, Icon } from './UIComponents';

interface PostCardProps {
  post: Post;
  author: User;
  sport: Sport;
  onLikeToggle?: (postId: string) => void;
  onAddComment?: (postId: string, text: string) => void;
}

export default function PostCard({
  post,
  author,
  sport,
  onLikeToggle
}: PostCardProps) {
  const [liked, setLiked] = useState(post.has_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ id: string; name: string; text: string; time: string }[]>([
    { id: '1', name: 'Arya Wibowo', text: 'Insane session! That smash was lethal.', time: '10m ago' },
    { id: '2', name: 'Nadia Syafira', text: 'Let’s play doubles soon!', time: '2h ago' }
  ]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    if (onLikeToggle) {
      onLikeToggle(post.id);
    }
  };

  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        name: 'Kelvin Rudyanto',
        text: commentText,
        time: 'Just now'
      }
    ]);
    setCommentText('');
  };

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card hoverEffect={false} className="border border-slate-200/80 bg-white p-5 rounded-2xl overflow-hidden mb-6 shadow-sm">
      {/* Post Header: Profile details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={author.avatar_url}
            alt={author.name}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-extrabold text-sm text-deep-navy">{author.name}</h4>
              <RankBadge rank={author.rank_tier} className="scale-75 origin-left" />
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5 font-semibold">
              <span>@{author.username}</span>
              <span>•</span>
              <span className="flex items-center text-rose-500 font-bold">
                <MapPin className="w-2.5 h-2.5 mr-0.5" /> {author.city}
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Sport Icon Tag */}
        <Badge variant="blue" className="scale-90 flex items-center space-x-1 py-1 bg-primary-blue/10 text-primary-blue border border-primary-blue/15 font-bold">
          <Icon name={sport.icon} className="w-3.5 h-3.5 mr-1" />
          <span>{sport.name}</span>
        </Badge>
      </div>

      {/* Post Caption Body */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-wrap font-semibold">
        {post.content}
      </p>

      {/* Image Attachment */}
      {post.image_url && (
        <div className="relative rounded-xl overflow-hidden border border-slate-200/80 mb-4 group aspect-video">
          <img
            src={post.image_url}
            alt="Activity Attachment"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Glass Overlay with Stats like Strava / Instagram */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 flex items-center space-x-3 text-[10px] font-mono font-bold text-deep-navy shadow-md">
            <span className="flex items-center">
              <Award className="w-3.5 h-3.5 text-yellow-600 mr-1" /> Effort Score: 92%
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center">
              <Flame className="w-3.5 h-3.5 text-amber-500 mr-1 animate-pulse" /> Gold Tier Match
            </span>
          </div>
        </div>
      )}

      {/* Action panel (Likes, Comments) */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3 font-bold">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors cursor-pointer ${liked ? 'text-rose-600' : 'hover:text-rose-500'}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current text-rose-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 hover:text-primary-blue transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-primary-blue" />
            <span>{comments.length} Comments</span>
          </button>
        </div>

        <button className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer">
          <Share2 className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Comments Drawer / Box */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3 font-semibold">
          <div className="space-y-2.5">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/40 text-xs">
                <div className="flex justify-between items-center mb-1 font-bold">
                  <span className="text-deep-navy">{comment.name}</span>
                  <span className="text-[9px] text-slate-400">{comment.time}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddCommentSubmit} className="flex space-x-2 mt-2">
            <input
              type="text"
              placeholder="Add a comment on this session..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-deep-navy focus:outline-none focus:border-primary-blue font-semibold placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-primary-blue hover:bg-opacity-90 px-3.5 py-1.5 rounded-xl text-xs font-black text-white cursor-pointer transition-colors shadow-sm shadow-primary-blue/10"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </Card>
  );
}
