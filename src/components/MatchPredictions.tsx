import { useState, useEffect } from 'react';
import { Bot, TrendingUp, BarChart3, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { MatchCard } from './MatchCard';
import { sportsApi, Prediction } from '../services/sportsApi';

export function MatchPredictions() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'banker' | 'surprise' | 'coupon' | 'vip'>('all');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        const data = await sportsApi.getPredictions();
        setPredictions(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  const filteredPredictions = selectedCategory === 'all' 
    ? predictions 
    : predictions.filter(p => p.category === selectedCategory);

  const categories = [
    { key: 'all' as const, label: 'All Predictions', color: 'gray' },
    { key: 'banker' as const, label: t('banker'), color: 'emerald' },
    { key: 'surprise' as const, label: t('surprise'), color: 'purple' },
    { key: 'coupon' as const, label: t('coupon'), color: 'blue' },
    { key: 'vip' as const, label: 'VIP', color: 'amber' },
  ];

  const stats = [
    { label: 'Win Rate', value: '87%', icon: TrendingUp, color: 'emerald' },
    { label: 'Total Predictions', value: '1,248', icon: BarChart3, color: 'blue' },
    { label: 'AI Accuracy', value: '91%', icon: Bot, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl text-white">{t('dailyPredictions')}</h1>
            <div className="flex items-center space-x-2 bg-purple-900/50 border border-purple-500 text-purple-300 px-4 py-2 rounded-lg">
              <Bot className="w-5 h-5" />
              <span className="text-sm">{t('aiPowered')}</span>
            </div>
          </div>
          <p className="text-purple-300">
            Expert predictions powered by advanced analytics and AI algorithms
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6 shadow-md hover:border-amber-500 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300 mb-1">{stat.label}</p>
                  <p className="text-3xl text-amber-400">{stat.value}</p>
                </div>
                <stat.icon className="w-12 h-12 text-purple-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.key
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                    : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800 border border-purple-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Historical Stats Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-800 to-black text-white rounded-xl p-6 mb-8 shadow-lg border border-amber-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl mb-2">{t('historicalStats')}</h3>
              <p className="text-purple-200">
                Our predictions have achieved an 87% win rate over the past 12 months
              </p>
            </div>
            <BarChart3 className="w-16 h-16 text-amber-400" />
          </div>
        </div>

        {/* Predictions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
              <p className="text-purple-300 text-xl">Loading predictions...</p>
            </div>
          ) : (
            filteredPredictions.map((prediction) => (
              <MatchCard key={prediction.id} match={prediction} showPrediction={true} />
            ))
          )}
        </div>

        {filteredPredictions.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-purple-300 text-xl">No predictions available in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}