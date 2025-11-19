import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  trending?: boolean;
}

interface NewsCardProps {
  article: Article;
  compact?: boolean;
}

export function NewsCard({ article, compact = false }: NewsCardProps) {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer group">
        <div className="p-6">
          <div className="text-4xl mb-3">{article.image}</div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs bg-amber-500 text-black px-2 py-1 rounded-full">
              {article.category}
            </span>
            {article.trending && (
              <TrendingUp className="w-4 h-4 text-amber-400" />
            )}
          </div>
          <h3 className="mb-2 line-clamp-2 text-white group-hover:text-amber-400 transition-colors">
            {article.title}
          </h3>
          <div className="text-xs text-purple-400">{article.date}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer group">
      <div className="p-6">
        <div className="text-5xl mb-4">{article.image}</div>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs bg-amber-500 text-black px-2 py-1 rounded-full">
            {article.category}
          </span>
          {article.trending && (
            <span className="text-xs bg-amber-900/50 border border-amber-600 text-amber-400 px-2 py-1 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </span>
          )}
        </div>
        <h3 className="text-xl mb-3 line-clamp-2 text-white group-hover:text-amber-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-purple-300 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-purple-400 pt-4 border-t border-purple-800">
          <div className="flex items-center space-x-3">
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
  );
}