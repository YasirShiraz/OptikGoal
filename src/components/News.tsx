import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { NewsCard } from './NewsCard';

export function News() {
  const { t } = useLanguage();

  const newsArticles = [
    {
      id: 1,
      title: 'Champions League Quarter-Finals: Top Predictions for This Week',
      excerpt: 'Expert analysis and predictions for the upcoming Champions League matches. Manchester City faces Bayern Munich in what promises to be the match of the week.',
      image: '🏆',
      category: 'Football',
      date: 'Nov 19, 2025',
      readTime: '5 min read',
      trending: true,
    },
    {
      id: 2,
      title: 'NBA Finals Preview: Lakers vs Celtics - A Historic Rivalry Renewed',
      excerpt: 'The two most storied franchises in NBA history meet again. Our analysts break down the key matchups and betting opportunities.',
      image: '🏀',
      category: 'Basketball',
      date: 'Nov 19, 2025',
      readTime: '8 min read',
      trending: true,
    },
    {
      id: 3,
      title: 'ATP Finals: Djokovic Eyes Record-Breaking 7th Title',
      excerpt: 'Novak Djokovic enters the ATP Finals as the favorite. We analyze his path to a potential historic seventh championship.',
      image: '🎾',
      category: 'Tennis',
      date: 'Nov 18, 2025',
      readTime: '6 min read',
      trending: false,
    },
    {
      id: 4,
      title: 'AI-Powered Betting: How Machine Learning is Changing Sports Predictions',
      excerpt: 'Discover how artificial intelligence and advanced analytics are revolutionizing the way we predict sports outcomes.',
      image: '🤖',
      category: 'Technology',
      date: 'Nov 18, 2025',
      readTime: '10 min read',
      trending: true,
    },
    {
      id: 5,
      title: 'Premier League Weekend Preview: Top 5 Matches to Watch',
      excerpt: 'From Manchester United vs Liverpool to Chelsea vs Arsenal, this weekend is packed with crucial matches. Here\'s what to expect.',
      image: '⚽',
      category: 'Football',
      date: 'Nov 17, 2025',
      readTime: '7 min read',
      trending: false,
    },
    {
      id: 6,
      title: 'Betting Strategies: Managing Your Bankroll Like a Professional',
      excerpt: 'Learn essential money management techniques that separate successful bettors from the rest. Expert tips from industry professionals.',
      image: '💰',
      category: 'Strategy',
      date: 'Nov 17, 2025',
      readTime: '12 min read',
      trending: false,
    },
    {
      id: 7,
      title: 'EuroLeague Basketball: CSKA Moscow vs Real Madrid Analysis',
      excerpt: 'Two European giants clash in a pivotal EuroLeague matchup. Our breakdown of tactics, key players, and betting angles.',
      image: '🏀',
      category: 'Basketball',
      date: 'Nov 16, 2025',
      readTime: '5 min read',
      trending: false,
    },
    {
      id: 8,
      title: 'Grand Slam Preview: Australian Open Favorites and Dark Horses',
      excerpt: 'With the Australian Open approaching, we identify the favorites and potential surprise packages for the first major of the season.',
      image: '🎾',
      category: 'Tennis',
      date: 'Nov 16, 2025',
      readTime: '9 min read',
      trending: false,
    },
    {
      id: 9,
      title: 'VIP Success Stories: How Our Members Won Big This Month',
      excerpt: 'Real testimonials from VIP members who followed our predictions to significant profits. See how our expert analysis pays off.',
      image: '👑',
      category: 'VIP',
      date: 'Nov 15, 2025',
      readTime: '6 min read',
      trending: true,
    },
  ];

  const featuredNews = newsArticles.slice(0, 2);
  const trendingNews = newsArticles.filter(n => n.trending);
  const regularNews = newsArticles.slice(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-white">{t('latestNews')}</h1>
          <p className="text-purple-300">Stay updated with the latest sports news, analysis, and insights</p>
        </div>

        {/* Featured News */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredNews.map((article) => (
            <div
              key={article.id}
              className="bg-gradient-to-br from-purple-600 via-purple-800 to-black border-2 border-amber-500 rounded-xl shadow-2xl overflow-hidden text-white group cursor-pointer hover:scale-105 transition-all"
            >
              <div className="p-8">
                <div className="text-6xl mb-4">{article.image}</div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm">
                    {article.category}
                  </span>
                  {article.trending && (
                    <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-sm flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </span>
                  )}
                </div>
                <h2 className="text-2xl mb-3 group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-purple-200 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <span className="flex items-center text-amber-400 group-hover:translate-x-1 transition-transform">
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Section */}
        {trendingNews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 mr-2 text-amber-400" />
              <h2 className="text-3xl text-white">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingNews.map((article) => (
                <NewsCard key={article.id} article={article} compact />
              ))}
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        <div className="mb-8">
          <h2 className="text-3xl mb-6 text-white">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md p-6">
          <h3 className="text-xl mb-4 text-white">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {['Football', 'Basketball', 'Tennis', 'Technology', 'Strategy', 'VIP'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-purple-900/50 hover:bg-purple-800 hover:border-amber-500 text-purple-200 hover:text-amber-400 rounded-lg transition-all border border-purple-700"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}