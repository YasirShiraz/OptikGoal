import { Clock } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../utils/translations';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  sport: string;
}

interface LiveMatchCardProps {
  match: Match;
  language: Language;
}

export function LiveMatchCard({ match, language }: LiveMatchCardProps) {
  const t = translations[language];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500 uppercase">{match.sport}</span>
        {match.status === 'live' && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            {t.home.liveNow}
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-800">{match.homeTeam}</span>
          {match.homeScore !== undefined && (
            <span className="text-xl">{match.homeScore}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-800">{match.awayTeam}</span>
          {match.awayScore !== undefined && (
            <span className="text-xl">{match.awayScore}</span>
          )}
        </div>
      </div>

      {/* Time */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center space-x-2 text-gray-600">
        <Clock className="w-4 h-4" />
        <span>
          {match.status === 'live' ? `${match.time}'` : match.time}
        </span>
      </div>
    </div>
  );
}
