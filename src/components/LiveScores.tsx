import { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { sportsApi, LiveScore } from '../services/sportsApi';

interface LiveMatch {
  id: string;
  homeTeam: string;
  homeScore?: number;
  awayTeam: string;
  awayScore?: number;
  minute?: number;
  league: string;
  status: 'live' | 'upcoming' | 'finished';
  time: string;
  events?: Array<{
    type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
    team: 'home' | 'away';
    minute: number;
    player?: string;
  }>;
}

export function LiveScores() {
  const { t } = useLanguage();
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const matches = await sportsApi.getLiveMatches();
      setLiveMatches(matches.map(match => ({
        id: match.id,
        homeTeam: match.homeTeam,
        homeScore: match.homeScore,
        awayTeam: match.awayTeam,
        awayScore: match.awayScore,
        minute: match.minute,
        league: match.league,
        status: match.status,
        time: match.time,
        events: match.events,
      })));
      setLastUpdate(new Date());
      setIsConnected(true);
    } catch (err) {
      setError('Failed to fetch live scores');
      setIsConnected(false);
      console.error('Error fetching live matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchLiveMatches();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredMatches = liveMatches.filter(m => m.status === 'live');

  const sportIcons: { [key: string]: string } = {
    football: '⚽',
    basketball: '🏀',
    tennis: '🎾',
  };

  const sports = [
    { key: 'all' as const, label: 'All Sports' },
    { key: 'football' as const, label: t('football') },
    { key: 'basketball' as const, label: t('basketball') },
    { key: 'tennis' as const, label: t('tennis') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl text-white">{t('liveScores')}</h1>
              <span className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-purple-300">Real-time scores and match statistics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-purple-400">
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                autoRefresh 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black' 
                  : 'bg-purple-900/50 text-purple-300 border border-purple-700'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto-refresh</span>
            </button>
          </div>
        </div>

        {/* Sport Filter */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => (
              <button
                key={sport.key}
                onClick={() => setSelectedSport(sport.key)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedSport === sport.key
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                    : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800 border border-purple-700'
                }`}
              >
                {sport.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Matches */}
        <div className="space-y-6">
          {filteredMatches.map((match) => (
            <div key={match.id} className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl shadow-lg overflow-hidden">
              {/* Match Header */}
              <div className="bg-gradient-to-r from-purple-600 via-purple-800 to-black text-white px-6 py-3 flex items-center justify-between border-b border-amber-500">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{sportIcons[match.sport]}</span>
                  <span className="px-3 py-1 bg-amber-500 text-black rounded-full text-sm animate-pulse">
                    {t('live')}
                  </span>
                  <span>{match.minute}</span>
                </div>
              </div>

              {/* Scoreboard */}
              <div className="p-6">
                <div className="grid grid-cols-5 gap-4 items-center mb-6">
                  <div className="col-span-2 text-right">
                    <div className="text-2xl mb-1 text-white">{match.homeTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-4xl text-amber-400">{match.homeScore}</span>
                      <span className="text-2xl text-purple-400">-</span>
                      <span className="text-4xl text-amber-400">{match.awayScore}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-2xl mb-1 text-white">{match.awayTeam}</div>
                  </div>
                </div>

                {/* Statistics */}
                {match.stats && (
                  <div className="border-t border-purple-800 pt-4 mb-4">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="text-sm text-purple-300">Match Statistics</span>
                    </div>
                    <div className="space-y-3">
                      {match.stats.possession && (
                        <div>
                          <div className="flex justify-between text-sm mb-1 text-purple-200">
                            <span>Possession</span>
                            <span className="text-purple-400">{match.stats.possession.home}% - {match.stats.possession.away}%</span>
                          </div>
                          <div className="flex h-2 bg-purple-900/50 rounded-full overflow-hidden">
                            <div 
                              className="bg-amber-500" 
                              style={{ width: `${match.stats.possession.home}%` }}
                            ></div>
                            <div 
                              className="bg-purple-500" 
                              style={{ width: `${match.stats.possession.away}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {match.stats.shots && (
                        <div className="flex justify-between text-sm text-purple-200">
                          <span className="text-amber-400">{match.stats.shots.home}</span>
                          <span className="text-purple-300">Shots</span>
                          <span className="text-purple-400">{match.stats.shots.away}</span>
                        </div>
                      )}
                      {match.stats.corners && (
                        <div className="flex justify-between text-sm text-purple-200">
                          <span className="text-amber-400">{match.stats.corners.home}</span>
                          <span className="text-purple-300">Corners</span>
                          <span className="text-purple-400">{match.stats.corners.away}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Events Timeline */}
                {match.events && match.events.length > 0 && (
                  <div className="border-t border-purple-800 pt-4">
                    <div className="flex items-center mb-3">
                      <AlertCircle className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="text-sm text-purple-300">Recent Events</span>
                    </div>
                    <div className="space-y-2">
                      {match.events.slice().reverse().map((event, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 text-sm p-2 rounded-lg ${
                            event.team === 'home' ? 'bg-amber-900/20 border border-amber-700/30' : 'bg-purple-900/20 border border-purple-700/30'
                          }`}
                        >
                          <span className="text-xs text-purple-400 w-12">{event.minute}</span>
                          <span className="text-lg">
                            {event.type === 'goal' ? '⚽' : event.type === 'card' ? '🟨' : '🔄'}
                          </span>
                          <span className="flex-1 text-white">
                            {event.player} ({event.team === 'home' ? match.homeTeam : match.awayTeam})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-xl text-purple-300">No live matches at the moment</p>
            <p className="text-purple-400 mt-2">Check back soon for live scores</p>
          </div>
        )}
      </div>
    </div>
  );
}