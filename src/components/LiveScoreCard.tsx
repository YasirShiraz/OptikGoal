interface LiveMatch {
  homeTeam: string;
  homeScore: number;
  awayTeam: string;
  awayScore: number;
  minute: string;
  sport: string;
}

interface LiveScoreCardProps {
  match: LiveMatch;
}

export function LiveScoreCard({ match }: LiveScoreCardProps) {
  const sportIcons: { [key: string]: string } = {
    football: '⚽',
    basketball: '🏀',
    tennis: '🎾',
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-lg p-4 hover:border-amber-500 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{sportIcons[match.sport] || '⚽'}</span>
          <span className="text-xs px-2 py-1 bg-amber-500 text-black rounded-full animate-pulse">
            LIVE
          </span>
        </div>
        <span className="text-sm text-purple-300">{match.minute}</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="truncate flex-1 text-white">{match.homeTeam}</span>
          <span className="text-2xl ml-4 text-amber-400">{match.homeScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="truncate flex-1 text-white">{match.awayTeam}</span>
          <span className="text-2xl ml-4 text-amber-400">{match.awayScore}</span>
        </div>
      </div>
    </div>
  );
}