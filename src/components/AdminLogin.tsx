import { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAdmin } from './AdminContext';

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const { adminLogin } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await adminLogin(username, password);
      if (success) {
        onSuccess();
      } else {
        setError('Invalid admin credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 border-2 border-amber-500 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in slide-in-from-bottom-10 duration-500">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-glow">
            <Shield className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-3xl mb-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-purple-300">OptikGoal Administration</p>
          <div className="mt-4 bg-purple-900/50 border border-purple-700 rounded-lg p-3">
            <p className="text-xs text-purple-300">Demo Credentials:</p>
            <p className="text-xs text-amber-400">Username: <span className="text-white">admin</span></p>
            <p className="text-xs text-amber-400">Password: <span className="text-white">admin123</span></p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm animate-in slide-in-from-top-5">
              {error}
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm">Admin Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="admin"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-amber-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Access Admin Panel</span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 bg-purple-900/30 border border-purple-800 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-purple-300">
              This is a secure admin area. All actions are logged and monitored for security purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
