import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, Check, User, LogOut, Crown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';

type Page = 'home' | 'predictions' | 'bulletin' | 'live' | 'vip' | 'comments' | 'news';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

const languageOptions = [
  { 
    code: 'en' as const, 
    name: 'English', 
    nativeName: 'English',
    flag: '🇬🇧',
    shortCode: 'EN'
  },
  { 
    code: 'tr' as const, 
    name: 'Turkish', 
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    shortCode: 'TR'
  },
  { 
    code: 'ar' as const, 
    name: 'Arabic', 
    nativeName: 'العربية',
    flag: '🇸🇦',
    shortCode: 'AR',
    rtl: true
  },
];

export function Header({ currentPage, onNavigate, onOpenLogin, onOpenSignup }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const langMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (langMenuOpen || userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen, userMenuOpen]);

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: t('home') },
    { key: 'predictions', label: t('predictions') },
    { key: 'bulletin', label: t('bulletin') },
    { key: 'live', label: t('liveScores') },
    { key: 'vip', label: t('vip') },
    { key: 'comments', label: t('comments') },
    { key: 'news', label: t('news') },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: 'en' | 'tr' | 'ar') => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const currentLangOption = languageOptions.find(opt => opt.code === language) || languageOptions[0];

  return (
    <header className="bg-gradient-to-r from-black via-purple-900 to-black text-white shadow-lg sticky top-0 z-50 border-b-2 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2 L12 4 M12 20 L12 22 M2 12 L4 12 M20 12 L22 12"/>
                  <path d="M7 7 L9 9 M15 15 L17 17 M7 17 L9 15 M15 9 L17 7"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="tracking-tight bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  OptikGoal
                </div>
                <div className="text-xs text-purple-300">Premium Predictions</div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center px-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`px-3 py-2 rounded-md text-sm transition-all whitespace-nowrap ${
                  currentPage === item.key
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                    : 'text-white hover:bg-purple-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side - Auth & Language & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name || user.email}</span>
                    {user.isVIP && <Crown className="w-4 h-4 text-purple-900" />}
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500 rounded-xl shadow-2xl shadow-amber-500/20 overflow-hidden z-50 animate-in fade-in slide-in-from-top-5">
                      <div className="p-4 border-b border-purple-800 bg-gradient-to-r from-purple-900 to-black">
                        <p className="text-white">{user.name || 'User'}</p>
                        <p className="text-xs text-purple-300">{user.email}</p>
                        {user.isVIP && (
                          <div className="mt-2 flex items-center text-xs text-amber-400">
                            <Crown className="w-3 h-3 mr-1" />
                            <span>VIP Member</span>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            onNavigate('vip');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-purple-300 hover:bg-purple-900/50 hover:text-amber-400 rounded-lg transition-colors flex items-center"
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          {user.isVIP ? 'My VIP Account' : 'Upgrade to VIP'}
                        </button>
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={onOpenLogin}
                    className="px-4 py-2 rounded-lg border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={onOpenSignup}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-md"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-900/50 hover:bg-purple-800 transition-all border border-purple-700 hover:border-amber-500"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="text-sm hidden sm:inline">{currentLangOption.shortCode}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border-2 border-amber-500 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-2">
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => handleLanguageChange(option.code)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                          language === option.code
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                            : 'hover:bg-purple-900/50 text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{option.flag}</span>
                          <div className="text-left">
                            <div className="text-sm">{option.nativeName}</div>
                            <div className={`text-xs ${
                              language === option.code ? 'text-black/70' : 'text-purple-400'
                            }`}>
                              {option.name}
                            </div>
                          </div>
                        </div>
                        {language === option.code && (
                          <Check className="w-5 h-5 text-black" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-purple-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-black to-purple-900 border-t border-purple-800 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full text-left px-3 py-2 rounded-md transition-all ${
                  currentPage === item.key
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                    : 'text-white hover:bg-purple-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Auth Section */}
          {user ? (
            <div className="border-t border-purple-800 px-2 py-3">
              <div className="text-xs text-purple-400 mb-2 px-3">USER MENU</div>
              <div className="space-y-1">
                <div className="w-full flex items-center px-3 py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-black mb-2">
                  <User className="w-5 h-5 mr-2" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleNavClick('vip');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 rounded-md bg-purple-900/50 text-white hover:bg-purple-800"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  <span>VIP Membership</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 rounded-md bg-red-900/50 text-white hover:bg-red-800"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-purple-800 px-2 py-3">
              <div className="text-xs text-purple-400 mb-2 px-3">ACCOUNT</div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-md border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenSignup();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-black"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}