import { useState } from 'react';
import { Send, ThumbsUp, Flag, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  status: 'approved' | 'pending' | 'blocked';
  isVIP: boolean;
}

export function Comments() {
  const { t } = useLanguage();
  const [commentText, setCommentText] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('approved');

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: 'John Smith',
      avatar: '👤',
      text: 'Great predictions today! Won big on the Barcelona match.',
      timestamp: '2 hours ago',
      likes: 24,
      status: 'approved',
      isVIP: true,
    },
    {
      id: 2,
      user: 'Maria Garcia',
      avatar: '👩',
      text: 'The AI predictions are incredibly accurate. Keep up the good work!',
      timestamp: '5 hours ago',
      likes: 18,
      status: 'approved',
      isVIP: false,
    },
    {
      id: 3,
      user: 'Ahmed Hassan',
      avatar: '🧑',
      text: 'Waiting for approval of my prediction analysis...',
      timestamp: '1 hour ago',
      likes: 0,
      status: 'pending',
      isVIP: false,
    },
    {
      id: 4,
      user: 'David Lee',
      avatar: '👨',
      text: 'VIP membership is totally worth it. Best investment for serious bettors.',
      timestamp: '1 day ago',
      likes: 42,
      status: 'approved',
      isVIP: true,
    },
    {
      id: 5,
      user: 'Sarah Johnson',
      avatar: '👩',
      text: 'The live scores feature is amazing! Never miss a moment.',
      timestamp: '3 hours ago',
      likes: 15,
      status: 'approved',
      isVIP: false,
    },
  ]);

  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(c => c.status === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      user: 'You',
      avatar: '😊',
      text: commentText,
      timestamp: 'Just now',
      likes: 0,
      status: 'pending',
      isVIP: false,
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleLike = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id && comment.status === 'approved'
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-white">{t('comments')}</h1>
          <p className="text-purple-300">Share your thoughts and engage with the community</p>
        </div>

        {/* Admin Info */}
        <div className="bg-purple-900/30 border-l-4 border-purple-500 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
            <div>
              <div className="text-purple-200 mb-1">Community Guidelines</div>
              <p className="text-sm text-purple-300">
                All comments are moderated to ensure quality discussions. Spam and inappropriate content will be blocked.
              </p>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={t('yourComment')}
                className="w-full px-4 py-3 bg-black/50 border border-purple-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-white placeholder-purple-400"
                rows={4}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-purple-400">
                Your comment will be reviewed by our moderators
              </p>
              <button
                type="submit"
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!commentText.trim()}
              >
                <Send className="w-4 h-4" />
                <span>{t('submitComment')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Filter Tabs */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'approved'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                  : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800 border border-purple-700'
              }`}
            >
              <span className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Approved</span>
              </span>
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'pending'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                  : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800 border border-purple-700'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Pending Review</span>
              </span>
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                  : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800 border border-purple-700'
              }`}
            >
              All Comments
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`bg-gradient-to-br from-gray-900 to-black border rounded-xl shadow-md p-6 transition-all ${
                comment.status === 'pending' ? 'border-amber-500' : 'border-purple-700'
              } ${
                comment.status === 'blocked' ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{comment.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white">{comment.user}</span>
                      {comment.isVIP && (
                        <span className="bg-amber-500 text-black text-xs px-2 py-1 rounded-full flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          VIP
                        </span>
                      )}
                      {comment.status === 'pending' && (
                        <span className="bg-amber-900/50 border border-amber-600 text-amber-400 text-xs px-2 py-1 rounded-full">
                          Pending Review
                        </span>
                      )}
                      {comment.status === 'blocked' && (
                        <span className="bg-red-900/50 border border-red-600 text-red-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <XCircle className="w-3 h-3 mr-1" />
                          Blocked
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-purple-400">{comment.timestamp}</span>
                  </div>
                  <p className="text-purple-100 mb-4">{comment.text}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(comment.id)}
                      disabled={comment.status !== 'approved'}
                      className={`flex items-center space-x-1 text-sm transition-colors ${
                        comment.status === 'approved'
                          ? 'text-purple-300 hover:text-amber-400'
                          : 'text-purple-600 cursor-not-allowed'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    {comment.status === 'approved' && (
                      <button className="flex items-center space-x-1 text-sm text-purple-300 hover:text-red-400 transition-colors">
                        <Flag className="w-4 h-4" />
                        <span>Report</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredComments.length === 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-12 text-center">
            <p className="text-xl text-purple-300">No comments to display</p>
            <p className="text-purple-400 mt-2">Be the first to share your thoughts!</p>
          </div>
        )}

        {/* Moderation Info */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl p-6">
          <h3 className="mb-4 flex items-center text-white">
            <Shield className="w-5 h-5 mr-2 text-amber-400" />
            Comment Moderation System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
              <CheckCircle className="w-6 h-6 text-amber-400 mb-2" />
              <div className="mb-1 text-amber-400">Approved Comments</div>
              <p className="text-xs text-purple-300">
                Comments reviewed and approved by moderators are visible to all users
              </p>
            </div>
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
              <Shield className="w-6 h-6 text-purple-400 mb-2" />
              <div className="mb-1 text-purple-400">Pending Review</div>
              <p className="text-xs text-purple-300">
                New comments await moderator approval before being published
              </p>
            </div>
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
              <XCircle className="w-6 h-6 text-red-400 mb-2" />
              <div className="mb-1 text-red-400">Spam Protection</div>
              <p className="text-xs text-purple-300">
                Automated filters and user reports help keep discussions clean
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}