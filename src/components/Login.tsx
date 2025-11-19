import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, X, Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

interface LoginProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export function Login({ onClose, onSwitchToSignup }: LoginProps) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 border-2 border-amber-500 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in slide-in-from-bottom-10 duration-500">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-amber-400 transition-colors p-2 hover:bg-purple-900/50 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-glow">
            <span className="text-4xl animate-float">⚽</span>
          </div>
          <h2 className="text-3xl mb-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-purple-300">Login to access premium predictions</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm animate-in slide-in-from-top-5">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="your@email.com"
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

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-purple-300 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-purple-700 bg-black/50 text-amber-500 focus:ring-2 focus:ring-amber-500/50"
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-amber-400 hover:text-amber-300 transition-colors">
              Forgot password?
            </button>
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
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-r from-gray-900 via-black to-purple-900 text-purple-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <button className="bg-black/50 border-2 border-purple-700 hover:border-amber-500 rounded-lg py-2 transition-all transform hover:scale-105">
              <span className="text-2xl">🔵</span>
            </button>
            <button className="bg-black/50 border-2 border-purple-700 hover:border-amber-500 rounded-lg py-2 transition-all transform hover:scale-105">
              <span className="text-2xl">G</span>
            </button>
            <button className="bg-black/50 border-2 border-purple-700 hover:border-amber-500 rounded-lg py-2 transition-all transform hover:scale-105">
              <span className="text-2xl">🍎</span>
            </button>
          </div>
        </div>

        {/* Signup Link */}
        <div className="mt-6 text-center text-sm text-purple-300">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
