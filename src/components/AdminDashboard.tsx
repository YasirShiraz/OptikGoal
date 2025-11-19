import { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  Plus,
  Calendar,
  Crown,
  CheckCircle,
  XCircle,
  Send,
  Shield,
  Wifi,
  DollarSign,
  Activity,
  Target,
  Eye,
  BarChart3
} from 'lucide-react';
import { useAdmin } from './AdminContext';
import { ApiSettings } from './ApiSettings';

type AdminSection = 'dashboard' | 'predictions' | 'vip' | 'comments' | 'notifications' | 'settings' | 'api';

interface Prediction {
  id: string;
  match: string;
  prediction: string;
  odds: string;
  category: string;
  status: string;
}

interface VIPMember {
  id: string;
  name: string;
  email: string;
  plan: string;
  expiryDate: string;
  status: string;
}

interface Comment {
  id: string;
  user: string;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function AdminDashboard() {
  const { admin, adminLogout } = useAdmin();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  // Enhanced mock data with more stats
  const stats = {
    totalPredictions: 1456,
    activePredictions: 87,
    vipMembers: 342,
    freeUsers: 15847,
    pendingComments: 24,
    approvedComments: 1289,
    todayMatches: 45,
    liveMatches: 12,
    monthlyRevenue: 45820,
    winRate: 87.5,
    avgOdds: 2.15,
    totalViews: 234567,
  };

  // Recent 7 days stats for chart
  const weeklyStats = [
    { day: 'Mon', predictions: 12, revenue: 4200, users: 45 },
    { day: 'Tue', predictions: 15, revenue: 5100, users: 52 },
    { day: 'Wed', predictions: 10, revenue: 3800, users: 38 },
    { day: 'Thu', predictions: 18, revenue: 6200, users: 67 },
    { day: 'Fri', predictions: 22, revenue: 7800, users: 89 },
    { day: 'Sat', predictions: 28, revenue: 9500, users: 124 },
    { day: 'Sun', predictions: 25, revenue: 8200, users: 98 },
  ];

  const [predictions, setPredictions] = useState<Prediction[]>([
    { id: '1', match: 'Man City vs Arsenal', prediction: 'Over 2.5', odds: '1.85', category: 'Banker', status: 'active' },
    { id: '2', match: 'Real Madrid vs Barcelona', prediction: 'BTTS', odds: '1.75', category: 'VIP', status: 'active' },
    { id: '3', match: 'Lakers vs Warriors', prediction: 'Lakers Win', odds: '2.10', category: 'Surprise', status: 'active' },
    { id: '4', match: 'Liverpool vs Chelsea', prediction: 'Under 3.5', odds: '1.92', category: 'Coupon', status: 'active' },
  ]);

  const [vipMembers, setVipMembers] = useState<VIPMember[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', plan: 'Premium', expiryDate: '2025-12-31', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', plan: 'Gold', expiryDate: '2025-11-30', status: 'active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', plan: 'Silver', expiryDate: '2026-01-15', status: 'active' },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', plan: 'Premium', expiryDate: '2025-10-20', status: 'expiring' },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'User123', content: 'Great predictions! Won big today!', date: '2025-01-15', status: 'pending' },
    { id: '2', user: 'BettingPro', content: 'Keep up the good work', date: '2025-01-15', status: 'pending' },
    { id: '3', user: 'SportsFan88', content: 'VIP membership is totally worth it!', date: '2025-01-14', status: 'pending' },
  ]);

  // Forms state
  const [newPrediction, setNewPrediction] = useState({
    match: '',
    prediction: '',
    odds: '',
    category: 'banker',
    date: '',
    time: '',
  });

  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  const handleAddPrediction = (e: React.FormEvent) => {
    e.preventDefault();
    const prediction: Prediction = {
      id: Date.now().toString(),
      match: newPrediction.match,
      prediction: newPrediction.prediction,
      odds: newPrediction.odds,
      category: newPrediction.category,
      status: 'active',
    };
    setPredictions([prediction, ...predictions]);
    setNewPrediction({ match: '', prediction: '', odds: '', category: 'banker', date: '', time: '' });
    alert('Prediction added successfully!');
  };

  const handleApproveComment = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'approved' as const } : c));
  };

  const handleRejectComment = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'rejected' as const } : c));
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Notification sent to all users!\nTitle: ${notification.title}\nMessage: ${notification.message}`);
    setNotification({ title: '', message: '', type: 'info' });
  };

  const menuItems = [
    { key: 'dashboard' as AdminSection, icon: LayoutDashboard, label: 'Dashboard' },
    { key: 'predictions' as AdminSection, icon: TrendingUp, label: 'Add Predictions' },
    { key: 'vip' as AdminSection, icon: Crown, label: 'VIP Control' },
    { key: 'comments' as AdminSection, icon: MessageSquare, label: 'Comments' },
    { key: 'notifications' as AdminSection, icon: Bell, label: 'Notifications' },
    { key: 'settings' as AdminSection, icon: Settings, label: 'Settings' },
    { key: 'api' as AdminSection, icon: Wifi, label: 'API Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-black to-purple-900 border-r-2 border-amber-500 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-black" />
              </div>
              <div>
                <h2 className="text-amber-400">Admin Panel</h2>
                <p className="text-xs text-purple-300">{admin?.username}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.key
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg'
                      : 'text-purple-300 hover:bg-purple-900/50 hover:text-amber-400'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={adminLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 transition-all mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto max-h-screen">
          {/* Dashboard with Enhanced Stats */}
          {activeSection === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl mb-2 text-white">Dashboard Overview</h1>
                <p className="text-purple-300">Welcome back, {admin?.username}! Here's what's happening today.</p>
              </div>
              
              {/* Primary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
                  <TrendingUp className="w-8 h-8 text-black mb-2" />
                  <p className="text-black/70 text-sm">Total Predictions</p>
                  <p className="text-3xl text-black mb-1">{stats.totalPredictions}</p>
                  <p className="text-xs text-black/60">{stats.activePredictions} active today</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
                  <Crown className="w-8 h-8 text-amber-400 mb-2" />
                  <p className="text-purple-200 text-sm">VIP Members</p>
                  <p className="text-3xl text-white mb-1">{stats.vipMembers}</p>
                  <p className="text-xs text-purple-300">+{stats.freeUsers.toLocaleString()} free users</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
                  <DollarSign className="w-8 h-8 text-white mb-2" />
                  <p className="text-green-200 text-sm">Monthly Revenue</p>
                  <p className="text-3xl text-white mb-1">${(stats.monthlyRevenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-green-300">+12% from last month</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
                  <Target className="w-8 h-8 text-white mb-2" />
                  <p className="text-blue-200 text-sm">Win Rate</p>
                  <p className="text-3xl text-white mb-1">{stats.winRate}%</p>
                  <p className="text-xs text-blue-300">Avg odds: {stats.avgOdds}</p>
                </div>
              </div>

              {/* Secondary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300 text-sm">Pending Comments</p>
                      <p className="text-2xl text-amber-400">{stats.pendingComments}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300 text-sm">Today's Matches</p>
                      <p className="text-2xl text-amber-400">{stats.todayMatches}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300 text-sm">Live Matches</p>
                      <p className="text-2xl text-amber-400">{stats.liveMatches}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-500 animate-pulse" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300 text-sm">Total Views</p>
                      <p className="text-2xl text-amber-400">{(stats.totalViews / 1000).toFixed(0)}k</p>
                    </div>
                    <Eye className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Weekly Performance Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-white flex items-center">
                      <BarChart3 className="w-6 h-6 text-amber-400 mr-2" />
                      Weekly Predictions
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {weeklyStats.map((stat) => (
                      <div key={stat.day} className="flex items-center">
                        <div className="w-12 text-purple-300 text-sm">{stat.day}</div>
                        <div className="flex-1">
                          <div className="bg-purple-900/30 rounded-full h-8 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-amber-500 to-amber-600 h-full flex items-center justify-end pr-3 text-sm text-black transition-all duration-500"
                              style={{ width: `${(stat.predictions / 30) * 100}%` }}
                            >
                              {stat.predictions}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-white flex items-center">
                      <DollarSign className="w-6 h-6 text-green-400 mr-2" />
                      Weekly Revenue
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {weeklyStats.map((stat) => (
                      <div key={stat.day} className="flex items-center">
                        <div className="w-12 text-purple-300 text-sm">{stat.day}</div>
                        <div className="flex-1">
                          <div className="bg-purple-900/30 rounded-full h-8 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-full flex items-center justify-end pr-3 text-sm text-white transition-all duration-500"
                              style={{ width: `${(stat.revenue / 10000) * 100}%` }}
                            >
                              ${(stat.revenue / 1000).toFixed(1)}k
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                  <h2 className="text-xl mb-4 text-white">Recent Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-purple-300 hover:bg-purple-900/20 p-2 rounded transition-colors">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="flex-1">3 New VIP members registered</span>
                      <span className="text-xs text-purple-500">5 mins ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-purple-300 hover:bg-purple-900/20 p-2 rounded transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="flex-1">12 New comments awaiting approval</span>
                      <span className="text-xs text-purple-500">15 mins ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-purple-300 hover:bg-purple-900/20 p-2 rounded transition-colors">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="flex-1">Banker prediction won (Man City)</span>
                      <span className="text-xs text-purple-500">1 hour ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-purple-300 hover:bg-purple-900/20 p-2 rounded transition-colors">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="flex-1">System backup completed</span>
                      <span className="text-xs text-purple-500">2 hours ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900 to-black border-2 border-amber-500 rounded-xl p-6">
                  <h2 className="text-xl mb-4 text-white">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setActiveSection('predictions')}
                      className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black p-4 rounded-lg transition-all hover:scale-105 flex flex-col items-center"
                    >
                      <Plus className="w-6 h-6 mb-1" />
                      <span className="text-sm">Add Prediction</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('notifications')}
                      className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-4 rounded-lg transition-all hover:scale-105 flex flex-col items-center"
                    >
                      <Send className="w-6 h-6 mb-1" />
                      <span className="text-sm">Send Alert</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('comments')}
                      className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white p-4 rounded-lg transition-all hover:scale-105 flex flex-col items-center"
                    >
                      <MessageSquare className="w-6 h-6 mb-1" />
                      <span className="text-sm">Review Comments</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('vip')}
                      className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white p-4 rounded-lg transition-all hover:scale-105 flex flex-col items-center"
                    >
                      <Crown className="w-6 h-6 mb-1" />
                      <span className="text-sm">Manage VIP</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Predictions */}
          {activeSection === 'predictions' && (
            <div>
              <h1 className="text-3xl mb-8 text-white">Add New Prediction</h1>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6 mb-8">
                <form onSubmit={handleAddPrediction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">Match</label>
                      <input
                        type="text"
                        value={newPrediction.match}
                        onChange={(e) => setNewPrediction({...newPrediction, match: e.target.value})}
                        className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                        placeholder="e.g., Man City vs Arsenal"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">Prediction</label>
                      <input
                        type="text"
                        value={newPrediction.prediction}
                        onChange={(e) => setNewPrediction({...newPrediction, prediction: e.target.value})}
                        className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                        placeholder="e.g., Over 2.5 Goals"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">Odds</label>
                      <input
                        type="text"
                        value={newPrediction.odds}
                        onChange={(e) => setNewPrediction({...newPrediction, odds: e.target.value})}
                        className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                        placeholder="e.g., 1.85"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">Category</label>
                      <select
                        value={newPrediction.category}
                        onChange={(e) => setNewPrediction({...newPrediction, category: e.target.value})}
                        className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="banker">Banker</option>
                        <option value="surprise">Surprise</option>
                        <option value="coupon">Coupon</option>
                        <option value="vip">VIP</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">Date</label>
                      <input
                        type="date"
                        value={newPrediction.date}
                        onChange={(e) => setNewPrediction({...newPrediction, date: e.target.value})}
                        className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">Time</label>
                      <input
                        type="time"
                        value={newPrediction.time}
                        onChange={(e) => setNewPrediction({...newPrediction, time: e.target.value})}
                        className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Prediction</span>
                  </button>
                </form>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                <h2 className="text-xl mb-4 text-white">Recent Predictions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-800">
                        <th className="text-left py-3 px-4 text-purple-300">Match</th>
                        <th className="text-left py-3 px-4 text-purple-300">Prediction</th>
                        <th className="text-left py-3 px-4 text-purple-300">Odds</th>
                        <th className="text-left py-3 px-4 text-purple-300">Category</th>
                        <th className="text-left py-3 px-4 text-purple-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictions.map((pred) => (
                        <tr key={pred.id} className="border-b border-purple-900/50 hover:bg-purple-900/20">
                          <td className="py-3 px-4 text-white">{pred.match}</td>
                          <td className="py-3 px-4 text-amber-400">{pred.prediction}</td>
                          <td className="py-3 px-4 text-purple-300">{pred.odds}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-purple-900 text-amber-400 rounded text-xs">
                              {pred.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-900 text-green-400 rounded text-xs">
                              {pred.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIP Control */}
          {activeSection === 'vip' && (
            <div>
              <h1 className="text-3xl mb-8 text-white">VIP Membership Control</h1>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl text-white">VIP Members</h2>
                  <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4 py-2 rounded-lg flex items-center space-x-2 hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                    <span>Add VIP Member</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-800">
                        <th className="text-left py-3 px-4 text-purple-300">Name</th>
                        <th className="text-left py-3 px-4 text-purple-300">Email</th>
                        <th className="text-left py-3 px-4 text-purple-300">Plan</th>
                        <th className="text-left py-3 px-4 text-purple-300">Expiry Date</th>
                        <th className="text-left py-3 px-4 text-purple-300">Status</th>
                        <th className="text-left py-3 px-4 text-purple-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vipMembers.map((member) => (
                        <tr key={member.id} className="border-b border-purple-900/50 hover:bg-purple-900/20">
                          <td className="py-3 px-4 text-white">{member.name}</td>
                          <td className="py-3 px-4 text-purple-300">{member.email}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-amber-900 text-amber-400 rounded text-xs flex items-center w-fit">
                              <Crown className="w-3 h-3 mr-1" />
                              {member.plan}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-purple-300">{member.expiryDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              member.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-amber-400 hover:text-amber-300 text-sm mr-3">Edit</button>
                            <button className="text-red-400 hover:text-red-300 text-sm">Suspend</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Comment Management */}
          {activeSection === 'comments' && (
            <div>
              <h1 className="text-3xl mb-8 text-white">Comment Management</h1>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                <h2 className="text-xl mb-6 text-white">Pending Comments</h2>
                
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-purple-900/30 border border-purple-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-amber-400">{comment.user}</p>
                          <p className="text-xs text-purple-400">{comment.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          comment.status === 'pending' ? 'bg-yellow-900 text-yellow-400' :
                          comment.status === 'approved' ? 'bg-green-900 text-green-400' :
                          'bg-red-900 text-red-400'
                        }`}>
                          {comment.status}
                        </span>
                      </div>
                      <p className="text-white mb-4">{comment.content}</p>
                      
                      {comment.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveComment(comment.id)}
                            className="flex items-center space-x-2 bg-green-900 text-green-400 px-4 py-2 rounded-lg hover:bg-green-800 transition-all"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectComment(comment.id)}
                            className="flex items-center space-x-2 bg-red-900 text-red-400 px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Send Notifications */}
          {activeSection === 'notifications' && (
            <div>
              <h1 className="text-3xl mb-8 text-white">Send Notifications</h1>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                <form onSubmit={handleSendNotification} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-purple-200 text-sm">Notification Title</label>
                    <input
                      type="text"
                      value={notification.title}
                      onChange={(e) => setNotification({...notification, title: e.target.value})}
                      className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                      placeholder="e.g., New VIP Prediction Available!"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-purple-200 text-sm">Message</label>
                    <textarea
                      value={notification.message}
                      onChange={(e) => setNotification({...notification, message: e.target.value})}
                      className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none h-32"
                      placeholder="Enter your notification message..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-purple-200 text-sm">Notification Type</label>
                    <select
                      value={notification.type}
                      onChange={(e) => setNotification({...notification, type: e.target.value})}
                      className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send to All Users</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === 'settings' && (
            <div>
              <h1 className="text-3xl mb-8 text-white">Site Settings</h1>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6">
                  <h2 className="text-xl mb-4 text-white">General Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Maintenance Mode</p>
                        <p className="text-sm text-purple-400">Put site in maintenance mode</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Auto-approve Comments</p>
                        <p className="text-sm text-purple-400">Automatically approve all comments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Email Notifications</p>
                        <p className="text-sm text-purple-400">Send email notifications to users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Settings */}
          {activeSection === 'api' && <ApiSettings />}
        </main>
      </div>
    </div>
  );
}
