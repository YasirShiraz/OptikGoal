import { useState } from 'react';
import { X, Shield, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface UnifiedLoginProps {
  onClose: () => void;
  onAdminLogin: (username: string, password: string) => void;
  onUserLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

export function UnifiedLogin({ onClose, onAdminLogin, onUserLogin, onSwitchToSignup }: UnifiedLoginProps) {
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (loginType === 'admin') {
      // Admin credentials check
      if (formData.username === 'admin' && formData.password === 'admin123') {
        onAdminLogin(formData.username, formData.password);
        onClose();
      } else {
        setError('Invalid admin credentials. Use: admin / admin123');
      }
    } else {
      // User login
      if (formData.email && formData.password) {
        onUserLogin(formData.email, formData.password);
        onClose();
      } else {
        setError('Please enter valid credentials');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500 rounded-2xl w-full max-w-md shadow-2xl shadow-amber-500/20 animate-in fade-in zoom-in">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-900 to-black p-6 border-b-2 border-amber-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-300 hover:text-amber-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl text-center bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Welcome to OptikGoal
          </h2>
          <p className="text-center text-purple-300 mt-2 text-sm">
            {loginType === 'admin' ? 'Admin Access Panel' : 'Professional Sports Predictions Platform'}
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="p-6 pb-4">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setLoginType('user')}
              className={`flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
                loginType === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg'
                  : 'bg-purple-900/30 text-purple-300 border border-purple-700 hover:border-amber-500'
              }`}
            >
              <User className="w-5 h-5" />
              <span>User Login</span>
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
                loginType === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg'
                  : 'bg-purple-900/30 text-purple-300 border border-purple-700 hover:border-amber-500'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>Admin Login</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginType === 'admin' ? (
              <div>
                <label className="block text-purple-200 mb-2 text-sm">Admin Username</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter admin username"
                    required
                  />
                </div>
                <p className="text-xs text-purple-400 mt-1">Default: admin</p>
              </div>
            ) : (
              <div>
                <label className="block text-purple-200 mb-2 text-sm">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-purple-200 mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-11 pr-12 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-amber-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {loginType === 'admin' && (
                <p className="text-xs text-purple-400 mt-1">Default: admin123</p>
              )}
            </div>

            {loginType === 'user' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-purple-300">
                  <input type="checkbox" className="mr-2 rounded border-purple-700 bg-black/50" />
                  Remember me
                </label>
                <button type="button" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black transition-all shadow-lg hover:shadow-amber-500/50 flex items-center justify-center space-x-2"
            >
              {loginType === 'admin' ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
              <span>{loginType === 'admin' ? 'Access Admin Panel' : 'Sign In'}</span>
            </button>
          </form>

          {/* Social Login - Only for Users */}
          {loginType === 'user' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-gray-900 to-black text-purple-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button className="py-3 bg-purple-900/30 border border-purple-700 rounded-lg hover:border-amber-500 hover:bg-purple-900/50 transition-all">
                  <span className="text-white">G</span>
                </button>
                <button className="py-3 bg-purple-900/30 border border-purple-700 rounded-lg hover:border-amber-500 hover:bg-purple-900/50 transition-all">
                  <span className="text-white">F</span>
                </button>
                <button className="py-3 bg-purple-900/30 border border-purple-700 rounded-lg hover:border-amber-500 hover:bg-purple-900/50 transition-all">
                  <span className="text-white">T</span>
                </button>
              </div>
            </>
          )}

          {/* Sign Up Link - Only for Users */}
          {loginType === 'user' && (
            <p className="text-center text-purple-300 mt-6 text-sm">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Sign up
              </button>
            </p>
          )}

          {/* Admin Info */}
          {loginType === 'admin' && (
            <div className="mt-6 p-3 bg-purple-900/20 border border-purple-700 rounded-lg">
              <p className="text-xs text-purple-300 text-center">
                🔒 Admin access is restricted. Only authorized personnel can access the admin panel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}