// Sports API Integration
// Multiple API providers for comprehensive sports data

interface ApiConfig {
  enabled: boolean;
  apiKey: string;
  baseUrl: string;
}

// API Configuration
const API_CONFIGS = {
  // API-Football: https://www.api-football.com/
  // Free tier: 100 requests/day
  football: {
    enabled: false, // Set to true when you have API key
    apiKey: 'YOUR_API_FOOTBALL_KEY_HERE',
    baseUrl: 'https://v3.football.api-sports.io'
  } as ApiConfig,

  // The Odds API: https://the-odds-api.com/
  // Free tier: 500 requests/month
  odds: {
    enabled: false,
    apiKey: 'YOUR_ODDS_API_KEY_HERE',
    baseUrl: 'https://api.the-odds-api.com/v4'
  } as ApiConfig,

  // SportsData.io: https://sportsdata.io/
  // Free trial available
  sportsData: {
    enabled: false,
    apiKey: 'YOUR_SPORTSDATA_KEY_HERE',
    baseUrl: 'https://api.sportsdata.io/v3'
  } as ApiConfig,
};

// Types
export interface Match {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'upcoming' | 'finished';
  time: string;
  date: string;
}

export interface LiveScore extends Match {
  minute?: number;
  events?: MatchEvent[];
}

export interface MatchEvent {
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  team: 'home' | 'away';
  player: string;
  minute: number;
}

export interface Odds {
  matchId: string;
  home: number;
  draw: number;
  away: number;
  over25: number;
  under25: number;
  btts: number;
}

export interface Prediction {
  matchId: string;
  match: string;
  prediction: string;
  odds: string;
  confidence: number;
  category: 'banker' | 'surprise' | 'coupon' | 'vip';
}

// Mock data (fallback when APIs are disabled)
const MOCK_LIVE_MATCHES: LiveScore[] = [
  {
    id: '1',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: 67,
    time: '20:00',
    date: '2025-01-19',
    events: [
      { type: 'goal', team: 'home', player: 'Haaland', minute: 23 },
      { type: 'goal', team: 'away', player: 'Saka', minute: 45 },
      { type: 'goal', team: 'home', player: 'De Bruyne', minute: 58 },
    ]
  },
  {
    id: '2',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    minute: 82,
    time: '21:00',
    date: '2025-01-19',
  },
  {
    id: '3',
    league: 'Serie A',
    homeTeam: 'Juventus',
    awayTeam: 'AC Milan',
    homeScore: 0,
    awayScore: 0,
    status: 'live',
    minute: 34,
    time: '19:45',
    date: '2025-01-19',
  },
];

const MOCK_UPCOMING_MATCHES: Match[] = [
  {
    id: '4',
    league: 'Premier League',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    status: 'upcoming',
    time: '17:30',
    date: '2025-01-20',
  },
  {
    id: '5',
    league: 'Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    status: 'upcoming',
    time: '18:30',
    date: '2025-01-20',
  },
  {
    id: '6',
    league: 'Ligue 1',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    status: 'upcoming',
    time: '20:45',
    date: '2025-01-20',
  },
];

const MOCK_PREDICTIONS: Prediction[] = [
  {
    matchId: '4',
    match: 'Liverpool vs Chelsea',
    prediction: 'Over 2.5 Goals',
    odds: '1.85',
    confidence: 85,
    category: 'banker',
  },
  {
    matchId: '5',
    match: 'Bayern Munich vs Borussia Dortmund',
    prediction: 'BTTS (Both Teams to Score)',
    odds: '1.70',
    confidence: 78,
    category: 'vip',
  },
  {
    matchId: '6',
    match: 'PSG vs Marseille',
    prediction: 'PSG Win',
    odds: '1.55',
    confidence: 92,
    category: 'banker',
  },
];

// API-Football Service
class FootballApiService {
  private config: ApiConfig;

  constructor() {
    this.config = API_CONFIGS.football;
  }

  private async request(endpoint: string): Promise<any> {
    if (!this.config.enabled || !this.config.apiKey || this.config.apiKey === 'YOUR_API_FOOTBALL_KEY_HERE') {
      throw new Error('API not configured');
    }

    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      headers: {
        'x-rapidapi-key': this.config.apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getLiveMatches(): Promise<LiveScore[]> {
    try {
      const data = await this.request('/fixtures?live=all');
      return this.transformFixtures(data.response);
    } catch (error) {
      console.log('Using mock data for live matches');
      return MOCK_LIVE_MATCHES;
    }
  }

  async getUpcomingMatches(date?: string): Promise<Match[]> {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      const data = await this.request(`/fixtures?date=${targetDate}`);
      return this.transformFixtures(data.response);
    } catch (error) {
      console.log('Using mock data for upcoming matches');
      return MOCK_UPCOMING_MATCHES;
    }
  }

  async getMatchDetails(matchId: string): Promise<LiveScore | null> {
    try {
      const data = await this.request(`/fixtures?id=${matchId}`);
      return this.transformFixture(data.response[0]);
    } catch (error) {
      console.log('Error fetching match details');
      return null;
    }
  }

  private transformFixtures(fixtures: any[]): LiveScore[] {
    return fixtures.map(fixture => this.transformFixture(fixture));
  }

  private transformFixture(fixture: any): LiveScore {
    return {
      id: fixture.fixture.id.toString(),
      league: fixture.league.name,
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      homeScore: fixture.goals.home,
      awayScore: fixture.goals.away,
      status: this.mapStatus(fixture.fixture.status.short),
      minute: fixture.fixture.status.elapsed,
      time: new Date(fixture.fixture.date).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      date: new Date(fixture.fixture.date).toISOString().split('T')[0],
    };
  }

  private mapStatus(status: string): 'live' | 'upcoming' | 'finished' {
    const liveStatuses = ['1H', '2H', 'HT', 'ET', 'P'];
    const finishedStatuses = ['FT', 'AET', 'PEN'];
    
    if (liveStatuses.includes(status)) return 'live';
    if (finishedStatuses.includes(status)) return 'finished';
    return 'upcoming';
  }
}

// The Odds API Service
class OddsApiService {
  private config: ApiConfig;

  constructor() {
    this.config = API_CONFIGS.odds;
  }

  private async request(endpoint: string): Promise<any> {
    if (!this.config.enabled || !this.config.apiKey || this.config.apiKey === 'YOUR_ODDS_API_KEY_HERE') {
      throw new Error('API not configured');
    }

    const response = await fetch(
      `${this.config.baseUrl}${endpoint}&apiKey=${this.config.apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getOdds(sport: string = 'soccer'): Promise<Odds[]> {
    try {
      const data = await this.request(
        `/sports/${sport}_epl/odds?regions=uk&markets=h2h,totals,btts`
      );
      return this.transformOdds(data);
    } catch (error) {
      console.log('Error fetching odds');
      return [];
    }
  }

  private transformOdds(data: any[]): Odds[] {
    return data.map(match => ({
      matchId: match.id,
      home: match.bookmakers[0]?.markets[0]?.outcomes[0]?.price || 2.0,
      draw: match.bookmakers[0]?.markets[0]?.outcomes[1]?.price || 3.5,
      away: match.bookmakers[0]?.markets[0]?.outcomes[2]?.price || 3.0,
      over25: match.bookmakers[0]?.markets[1]?.outcomes[0]?.price || 1.85,
      under25: match.bookmakers[0]?.markets[1]?.outcomes[1]?.price || 1.95,
      btts: match.bookmakers[0]?.markets[2]?.outcomes[0]?.price || 1.70,
    }));
  }
}

// Main Sports API Service
export class SportsApiService {
  private footballApi: FootballApiService;
  private oddsApi: OddsApiService;

  constructor() {
    this.footballApi = new FootballApiService();
    this.oddsApi = new OddsApiService();
  }

  // Get live matches
  async getLiveMatches(): Promise<LiveScore[]> {
    return this.footballApi.getLiveMatches();
  }

  // Get upcoming matches
  async getUpcomingMatches(date?: string): Promise<Match[]> {
    return this.footballApi.getUpcomingMatches(date);
  }

  // Get match details
  async getMatchDetails(matchId: string): Promise<LiveScore | null> {
    return this.footballApi.getMatchDetails(matchId);
  }

  // Get odds for matches
  async getOdds(sport?: string): Promise<Odds[]> {
    return this.oddsApi.getOdds(sport);
  }

  // Get predictions (using mock data for now)
  async getPredictions(): Promise<Prediction[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_PREDICTIONS), 500);
    });
  }

  // Get today's matches
  async getTodayMatches(): Promise<Match[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.getUpcomingMatches(today);
  }

  // Search matches by team
  async searchMatches(query: string): Promise<Match[]> {
    const allMatches = await this.getUpcomingMatches();
    return allMatches.filter(match => 
      match.homeTeam.toLowerCase().includes(query.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(query.toLowerCase())
    );
  }
}

// Export singleton instance
export const sportsApi = new SportsApiService();

// Export API configuration for settings page
export const getApiStatus = () => ({
  football: API_CONFIGS.football.enabled,
  odds: API_CONFIGS.odds.enabled,
  sportsData: API_CONFIGS.sportsData.enabled,
});

export const updateApiConfig = (service: 'football' | 'odds' | 'sportsData', apiKey: string) => {
  API_CONFIGS[service].apiKey = apiKey;
  API_CONFIGS[service].enabled = apiKey !== '' && !apiKey.includes('YOUR_');
};
