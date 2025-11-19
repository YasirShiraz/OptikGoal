import { useState } from 'react';
import { Filter, Plus, Trash2, FileText } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  time: string;
  date: string;
  sport: 'football' | 'basketball' | 'tennis';
  odds: {
    home: string;
    draw?: string;
    away: string;
  };
}

export function MatchBulletin() {
  const { t } = useLanguage();
  const [selectedSport, setSelectedSport] = useState<'all' | 'football' | 'basketball' | 'tennis'>('all');
  const [selectedMatches, setSelectedMatches] = useState<number[]>([]);

  const matches: Match[] = [
    {
      id: 1,
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      time: '17:30',
      date: 'Nov 20',
      sport: 'football',
      odds: { home: '2.10', draw: '3.40', away: '3.20' }
    },
    {
      id: 2,
      homeTeam: 'Juventus',
      awayTeam: 'Inter Milan',
      time: '20:45',
      date: 'Nov 20',
      sport: 'football',
      odds: { home: '2.45', draw: '3.30', away: '2.80' }
    },
    {
      id: 3,
      homeTeam: 'Barcelona',
      awayTeam: 'Atletico Madrid',
      time: '21:00',
      date: 'Nov 20',
      sport: 'football',
      odds: { home: '1.85', draw: '3.60', away: '4.20' }
    },
    {
      id: 4,
      homeTeam: 'Warriors',
      awayTeam: 'Suns',
      time: '02:00',
      date: 'Nov 21',
      sport: 'basketball',
      odds: { home: '1.75', away: '2.05' }
    },
    {
      id: 5,
      homeTeam: 'Mavericks',
      awayTeam: 'Clippers',
      time: '03:30',
      date: 'Nov 21',
      sport: 'basketball',
      odds: { home: '2.20', away: '1.65' }
    },
    {
      id: 6,
      homeTeam: 'Nadal',
      awayTeam: 'Tsitsipas',
      time: '15:00',
      date: 'Nov 20',
      sport: 'tennis',
      odds: { home: '1.55', away: '2.40' }
    },
  ];

  const filteredMatches = selectedSport === 'all' 
    ? matches 
    : matches.filter(m => m.sport === selectedSport);

  const toggleMatchSelection = (matchId: number) => {
    setSelectedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  const clearCoupon = () => {
    setSelectedMatches([]);
  };

  const sportIcons: { [key: string]: string } = {
    football: '⚽',
    basketball: '🏀',
    tennis: '🎾',
  };

  const sports = [
    { key: 'all' as const, label: 'All Sports', icon: '🏆' },
    { key: 'football' as const, label: t('football'), icon: '⚽' },
    { key: 'basketball' as const, label: t('basketball'), icon: '🏀' },
    { key: 'tennis' as const, label: t('tennis'), icon: '🎾' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-white">{t('bulletin')}</h1>
          <p className="text-purple-300">Browse daily matches and create your own coupons</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Matches List */}
          <div className="lg:col-span-2">
            {/* Sport Filter */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-4 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Filter className="w-5 h-5 text-amber-400" />
                <span className="text-white">Filter by Sport</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sports.map((sport) => (
                  <button
                    key={sport.key}
                    onClick={() => setSelectedSport(sport.key)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                      selectedSport === sport.key
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                        : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800 border border-purple-700'
                    }`}
                  >
                    <span>{sport.icon}</span>
                    <span>{sport.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Matches */}
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  className={`bg-gradient-to-br from-gray-900 to-black border rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:shadow-amber-500/20 ${
                    selectedMatches.includes(match.id) ? 'border-amber-500 border-2' : 'border-amber-500/30'
                  }`}
                >
                  <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between border-b border-amber-500/30">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{sportIcons[match.sport]}</span>
                      <span className="text-sm text-purple-300">{match.date} • {match.time}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                      <div className="text-center">
                        <div className="mb-2 text-white">{match.homeTeam}</div>
                      </div>
                      <div className="text-center text-amber-400">vs</div>
                      <div className="text-center">
                        <div className="mb-2 text-white">{match.awayTeam}</div>
                      </div>
                    </div>

                    <div className="border-t border-purple-800 pt-4">
                      <div className="text-sm text-purple-300 mb-2">{t('odds')}</div>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="bg-purple-900/50 hover:bg-purple-800 border border-purple-600 text-purple-200 py-2 rounded-lg transition-colors">
                          <div className="text-xs mb-1">Home</div>
                          <div className="text-amber-400">{match.odds.home}</div>
                        </button>
                        {match.odds.draw && (
                          <button className="bg-purple-900/50 hover:bg-purple-800 border border-purple-600 text-purple-200 py-2 rounded-lg transition-colors">
                            <div className="text-xs mb-1">Draw</div>
                            <div className="text-amber-400">{match.odds.draw}</div>
                          </button>
                        )}
                        <button className="bg-purple-900/50 hover:bg-purple-800 border border-purple-600 text-purple-200 py-2 rounded-lg transition-colors">
                          <div className="text-xs mb-1">Away</div>
                          <div className="text-amber-400">{match.odds.away}</div>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleMatchSelection(match.id)}
                      className={`w-full mt-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                        selectedMatches.includes(match.id)
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500'
                          : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800 border border-purple-600'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>{selectedMatches.includes(match.id) ? 'Added to Coupon' : 'Add to Coupon'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coupon Creator */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl shadow-lg p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl text-white">My Coupon</h3>
                </div>
                {selectedMatches.length > 0 && (
                  <button
                    onClick={clearCoupon}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              {selectedMatches.length === 0 ? (
                <div className="text-center py-8 text-purple-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No matches selected</p>
                  <p className="text-sm mt-1">Add matches to create your coupon</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-2 mb-4">
                    {selectedMatches.map((matchId) => {
                      const match = matches.find(m => m.id === matchId);
                      if (!match) return null;
                      return (
                        <div key={matchId} className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-purple-400">{match.sport}</span>
                            <button
                              onClick={() => toggleMatchSelection(matchId)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-white">{match.homeTeam} vs {match.awayTeam}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-purple-800 pt-4 mb-4">
                    <div className="flex justify-between mb-2 text-purple-200">
                      <span>Total Matches:</span>
                      <span className="text-amber-400">{selectedMatches.length}</span>
                    </div>
                    <div className="flex justify-between text-purple-200">
                      <span>Combined Odds:</span>
                      <span className="text-amber-400">~{(2.5 * selectedMatches.length).toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-colors shadow-md">
                    {t('createCoupon')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}