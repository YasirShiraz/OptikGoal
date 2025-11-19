import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, X, Loader2, Check } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SignupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onClose, onSwitchToLogin }: SignupProps) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const passwordStrength = (pwd: string) => {
    if (pwd.length < 6) return { text: 'Weak', color: 'text-red-400', width: '33%' };
    if (pwd.length < 10) return { text: 'Medium', color: 'text-amber-400', width: '66%' };
    return { text: 'Strong', color: 'text-green-400', width: '100%' };
  };

  const strength = password ? passwordStrength(password) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const success = await signup(name, email, password);
      if (success) {
        onClose();
      } else {
        setError('Failed to create account');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 border-2 border-amber-500 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in slide-in-from-bottom-10 duration-500 my-8">
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
            Join OptikGoal
          </h2>
          <p className="text-purple-300">Create your account and start winning</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm animate-in slide-in-from-top-5">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

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
            {strength && (
              <div className="space-y-1">
                <div className="w-full bg-purple-900/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
                    style={{ width: strength.width }}
                  />
                </div>
                <p className={`text-xs ${strength.color}`}>Password strength: {strength.text}</p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/50 border-2 border-purple-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-amber-400 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {confirmPassword && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                  {password === confirmPassword ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <X className="w-5 h-5 text-red-400" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start space-x-3 text-sm text-purple-300 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-purple-700 bg-black/50 text-amber-500 focus:ring-2 focus:ring-amber-500/50"
            />
            <span>
              I agree to the{' '}
              <button type="button" className="text-amber-400 hover:text-amber-300">
                Terms & Conditions
              </button>{' '}
              and{' '}
              <button type="button" className="text-amber-400 hover:text-amber-300">
                Privacy Policy
              </button>
            </span>
          </label>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Social Signup */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-r from-gray-900 via-black to-purple-900 text-purple-400">
                Or sign up with
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

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-purple-300">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
