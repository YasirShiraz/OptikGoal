import { TrendingUp, Star, FileText, Crown, BarChart3, Sparkles } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../utils/translations';

interface MatchPredictionsPageProps {
  language: Language;
}

export function MatchPredictionsPage({ language }: MatchPredictionsPageProps) {
  const t = translations[language];

  const predictions = [
    {
      id: 1,
      category: 'banker',
      homeTeam: 'Manchester City',
      awayTeam: 'Sheffield United',
      prediction: '1',
      odds: 1.25,
      confidence: 95,
      aiPowered: true,
      icon: Star,
      color: 'border-yellow-400 bg-yellow-50',
      badgeColor: 'bg-yellow-500',
    },
    {
      id: 2,
      category: 'surprise',
      homeTeam: 'Nottingham Forest',
      awayTeam: 'Chelsea',
      prediction: '1',
      odds: 4.20,
      confidence: 72,
      aiPowered: true,
      icon: Sparkles,
      color: 'border-purple-400 bg-purple-50',
      badgeColor: 'bg-purple-500',
    },
    {
      id: 3,
      category: 'coupon',
      homeTeam: 'Arsenal',
      awayTeam: 'Brighton',
      prediction: 'Over 2.5',
      odds: 1.85,
      confidence: 78,
      aiPowered: false,
      icon: FileText,
      color: 'border-blue-400 bg-blue-50',
      badgeColor: 'bg-blue-500',
    },
    {
      id: 4,
      category: 'vip',
      homeTeam: 'Liverpool',
      awayTeam: 'Tottenham',
      prediction: '1 & Over 2.5',
      odds: 2.40,
      confidence: 88,
      aiPowered: true,
      icon: Crown,
      color: 'border-green-400 bg-green-50',
      badgeColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    },
  ];

  const stats = [
    { label: 'Total Predictions', value: '2,847', change: '+12%' },
    { label: 'Success Rate', value: '76.4%', change: '+3.2%' },
    { label: 'Avg. Odds', value: '2.15', change: '+0.15' },
    { label: 'Active Users', value: '15.2K', change: '+8%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">{t.predictions.title}</h1>
          <p className="text-gray-600">{t.predictions.subtitle}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-green-600 text-sm">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              All
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors inline-flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>{t.predictions.banker}</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors inline-flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.predictions.surprise}</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors inline-flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>{t.predictions.coupon}</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 transition-colors inline-flex items-center space-x-2">
              <Crown className="w-4 h-4" />
              <span>{t.predictions.vipOnly}</span>
            </button>
          </div>
        </div>

        {/* Predictions List */}
        <div className="grid md:grid-cols-2 gap-6">
          {predictions.map((pred) => {
            const Icon = pred.icon;
            return (
              <div
                key={pred.id}
                className={`bg-white rounded-xl border-2 ${pred.color} p-6 hover:shadow-lg transition-all`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`${pred.badgeColor} text-white px-3 py-1 rounded-full text-sm inline-flex items-center space-x-2`}>
                    <Icon className="w-4 h-4" />
                    <span>{t.predictions[pred.category as keyof typeof t.predictions]}</span>
                  </div>
                  {pred.aiPowered && (
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs inline-flex items-center space-x-1">
                      <BarChart3 className="w-3 h-3" />
                      <span>{t.predictions.aiPowered}</span>
                    </div>
                  )}
                </div>

                {/* Match */}
                <div className="mb-4">
                  <div className="text-lg mb-1">{pred.homeTeam}</div>
                  <div className="text-gray-500 text-sm mb-1">vs</div>
                  <div className="text-lg">{pred.awayTeam}</div>
                </div>

                {/* Prediction */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Prediction</div>
                  <div className="text-xl">{pred.prediction}</div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-600">{t.predictions.confidence}</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${pred.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm">{pred.confidence}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{t.predictions.odds}</div>
                    <div className="text-xl text-green-600">{pred.odds.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Historical Statistics Section */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl">{t.predictions.statistics}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">453</div>
              <div className="text-gray-600">Total Wins</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">76.4%</div>
              <div className="text-gray-600">Win Rate</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">+142%</div>
              <div className="text-gray-600">ROI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
