import { ArrowRight, TrendingUp, Zap, Crown, MessageSquare, Newspaper } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { LiveScoreCard } from './LiveScoreCard';
import { MatchCard } from './MatchCard';

type Page = 'home' | 'predictions' | 'bulletin' | 'live' | 'vip' | 'comments' | 'news';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  const upcomingMatches = [
    { id: 1, homeTeam: 'Manchester United', awayTeam: 'Liverpool', time: '20:00', sport: 'football', prediction: 'Over 2.5', odds: '1.85' },
    { id: 2, homeTeam: 'Lakers', awayTeam: 'Warriors', time: '22:30', sport: 'basketball', prediction: 'Lakers Win', odds: '2.10' },
    { id: 3, homeTeam: 'Novak Djokovic', awayTeam: 'Carlos Alcaraz', time: '15:00', sport: 'tennis', prediction: 'Over 3.5 Sets', odds: '1.95' },
  ];

  const liveMatches = [
    { id: 1, homeTeam: 'Barcelona', homeScore: 2, awayTeam: 'Real Madrid', awayScore: 1, minute: '67\'', sport: 'football' },
    { id: 2, homeTeam: 'Celtics', homeScore: 98, awayTeam: 'Nets', awayScore: 92, minute: 'Q3 8:45', sport: 'basketball' },
  ];

  const quickLinks = [
    { icon: TrendingUp, label: t('predictions'), color: 'emerald', page: 'predictions' as Page },
    { icon: Zap, label: t('bulletin'), color: 'blue', page: 'bulletin' as Page },
    { icon: Crown, label: t('vip'), color: 'amber', page: 'vip' as Page },
    { icon: MessageSquare, label: t('comments'), color: 'purple', page: 'comments' as Page },
    { icon: Newspaper, label: t('news'), color: 'cyan', page: 'news' as Page },
  ];

  const sports = [
    { 
      name: t('football'), 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 2v4m0 12v4M2 12h4m12 0h4M6.34 6.34l2.83 2.83m5.66 5.66l2.83 2.83M6.34 17.66l2.83-2.83m5.66-5.66l2.83-2.83"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      count: '156 Matches', 
      color: 'emerald' 
    },
    { 
      name: t('basketball'), 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 2 Q16 12 12 22 M12 2 Q8 12 12 22 M2 12 Q12 8 22 12 M2 12 Q12 16 22 12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      count: '84 Matches', 
      color: 'orange' 
    },
    { 
      name: t('tennis'), 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 3 Q16 8 12 12 Q8 16 12 21 M3 12 Q8 8 12 12 Q16 16 21 12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      count: '42 Matches', 
      color: 'blue' 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-black to-purple-900 text-white border-b-2 border-amber-500 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent animate-gradient">
              Professional Sports Predictions
            </h1>
            <p className="text-xl text-purple-300">
              Expert analysis, AI-powered insights, and real-time updates
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {quickLinks.map((link, index) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 backdrop-blur-sm rounded-xl p-6 hover:border-amber-500 transition-all duration-300 hover:scale-110 group hover:shadow-xl hover:shadow-amber-500/30 animate-in fade-in slide-in-from-bottom-10"
              >
                <link.icon className="w-8 h-8 mx-auto mb-3 text-amber-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                <div className="text-sm text-purple-200 group-hover:text-amber-300 transition-colors">{link.label}</div>
              </button>
            ))}
          </div>

          {/* Live Scores Preview */}
          {liveMatches.length > 0 && (
            <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                  {t('live')} {t('liveScores')}
                </h2>
                <button
                  onClick={() => onNavigate('live')}
                  className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>{t('viewAll')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveMatches.map((match) => (
                  <LiveScoreCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Matches Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl text-white">{t('upcomingMatches')}</h2>
          <button
            onClick={() => onNavigate('predictions')}
            className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      {/* Featured Sports Section */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-12 border-y-2 border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8 text-center text-white">{t('featuredSports')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sports.map((sport) => (
              <div
                key={sport.name}
                className="bg-gradient-to-br from-purple-900/50 to-black border-2 border-amber-500/30 rounded-xl p-8 hover:shadow-xl hover:shadow-amber-500/20 transition-all cursor-pointer group hover:scale-105 hover:border-amber-500"
              >
                <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform">
                  {sport.icon}
                </div>
                <h3 className="text-2xl text-center mb-2 text-amber-400">{sport.name}</h3>
                <p className="text-center text-purple-300">{sport.count}</p>
                <button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black py-2 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-colors shadow-md">
                  {t('viewAll')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-800 to-black text-white py-16 border-b-2 border-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-16 h-16 mx-auto mb-4 text-amber-400" />
          <h2 className="text-3xl md:text-4xl mb-4">Unlock VIP Predictions</h2>
          <p className="text-xl mb-8 text-purple-200">
            Get exclusive access to our premium predictions with 85%+ accuracy rate
          </p>
          <button
            onClick={() => onNavigate('vip')}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-colors inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Explore VIP Membership</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}