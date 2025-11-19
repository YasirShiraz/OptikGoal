import { Clock, TrendingUp } from 'lucide-react';

interface Match {
  homeTeam: string;
  awayTeam: string;
  time: string;
  sport: string;
  prediction?: string;
  odds?: string;
  category?: 'banker' | 'surprise' | 'vip' | 'coupon';
}

interface MatchCardProps {
  match: Match;
  showPrediction?: boolean;
}

export function MatchCard({ match, showPrediction = true }: MatchCardProps) {
  const sportIcons: { [key: string]: string } = {
    football: '⚽',
    basketball: '🏀',
    tennis: '🎾',
  };

  const categoryColors: { [key: string]: { bg: string; text: string; border: string } } = {
    banker: { bg: 'bg-purple-900/50', text: 'text-amber-400', border: 'border-amber-500' },
    surprise: { bg: 'bg-purple-900/50', text: 'text-purple-400', border: 'border-purple-500' },
    vip: { bg: 'bg-purple-900/50', text: 'text-amber-400', border: 'border-amber-500' },
    coupon: { bg: 'bg-purple-900/50', text: 'text-blue-400', border: 'border-blue-500' },
  };

  const category = match.category || 'banker';
  const colors = categoryColors[category];

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-md hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 border-2 ${colors.border} overflow-hidden group hover:scale-105 transform`}>
      <div className={`${colors.bg} px-4 py-2 flex items-center justify-between border-b ${colors.border}`}>
        <div className="flex items-center space-x-2">
          <span className="text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{sportIcons[match.sport] || '⚽'}</span>
          <span className={`text-xs uppercase tracking-wide ${colors.text}`}>
            {category}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-purple-300 text-sm">
          <Clock className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>{match.time}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="truncate text-white">{match.homeTeam}</span>
          </div>
          <div className="text-center text-amber-400">vs</div>
          <div className="flex items-center justify-between">
            <span className="truncate text-white">{match.awayTeam}</span>
          </div>
        </div>
        
        {showPrediction && match.prediction && (
          <div className="mt-4 pt-4 border-t border-purple-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-purple-300">Prediction:</span>
              </div>
              <span className={colors.text}>{match.prediction}</span>
            </div>
            {match.odds && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-purple-300">Odds:</span>
                <span className="text-amber-400">{match.odds}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}