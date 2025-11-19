import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    tr: string;
    ar: string;
  };
}

const translations: Translations = {
  home: { en: 'Home', tr: 'Ana Sayfa', ar: 'الصفحة الرئيسية' },
  predictions: { en: 'Match Predictions', tr: 'Maç Tahminleri', ar: 'توقعات المباريات' },
  bulletin: { en: 'Match Bulletin', tr: 'Maç Bülteni', ar: 'نشرة المباريات' },
  liveScores: { en: 'Live Scores', tr: 'Canlı Skorlar', ar: 'النتائج المباشرة' },
  vip: { en: 'VIP Membership', tr: 'VIP Üyelik', ar: 'عضوية VIP' },
  comments: { en: 'Comments', tr: 'Yorumlar', ar: 'التعليقات' },
  news: { en: 'News', tr: 'Haberler', ar: 'الأخبار' },
  upcomingMatches: { en: 'Upcoming Matches', tr: 'Yaklaşan Maçlar', ar: 'المباريات القادمة' },
  featuredSports: { en: 'Featured Sports', tr: 'Öne Çıkan Sporlar', ar: 'الرياضات المميزة' },
  football: { en: 'Football', tr: 'Futbol', ar: 'كرة القدم' },
  basketball: { en: 'Basketball', tr: 'Basketbol', ar: 'كرة السلة' },
  tennis: { en: 'Tennis', tr: 'Tenis', ar: 'التنس' },
  banker: { en: 'Banker', tr: 'Banker', ar: 'مضمون' },
  surprise: { en: 'Surprise', tr: 'Sürpriz', ar: 'مفاجأة' },
  coupon: { en: 'Coupon', tr: 'Kupon', ar: 'قسيمة' },
  viewAll: { en: 'View All', tr: 'Tümünü Gör', ar: 'عرض الكل' },
  live: { en: 'LIVE', tr: 'CANLI', ar: 'مباشر' },
  today: { en: 'Today', tr: 'Bugün', ar: 'اليوم' },
  viewDetails: { en: 'View Details', tr: 'Detayları Gör', ar: 'عرض التفاصيل' },
  membershipPackages: { en: 'Membership Packages', tr: 'Üyelik Paketleri', ar: 'باقات العضوية' },
  monthly: { en: 'Monthly', tr: 'Aylık', ar: 'شهري' },
  quarterly: { en: 'Quarterly', tr: '3 Aylık', ar: 'ربع سنوي' },
  annual: { en: 'Annual', tr: 'Yıllık', ar: 'سنوي' },
  subscribe: { en: 'Subscribe', tr: 'Abone Ol', ar: 'اشترك' },
  readMore: { en: 'Read More', tr: 'Devamını Oku', ar: 'اقرأ المزيد' },
  submitComment: { en: 'Submit Comment', tr: 'Yorum Gönder', ar: 'إرسال تعليق' },
  yourComment: { en: 'Your comment...', tr: 'Yorumunuz...', ar: 'تعليقك...' },
  dailyPredictions: { en: 'Daily Predictions', tr: 'Günlük Tahminler', ar: 'التوقعات اليومية' },
  aiPowered: { en: 'AI-Powered', tr: 'Yapay Zeka Destekli', ar: 'مدعوم بالذكاء الاصطناعي' },
  historicalStats: { en: 'Historical Statistics', tr: 'Geçmiş İstatistikler', ar: 'إحصائيات تاريخية' },
  odds: { en: 'Odds', tr: 'Oranlar', ar: 'الاحتمالات' },
  createCoupon: { en: 'Create Coupon', tr: 'Kupon Oluştur', ar: 'إنشاء قسيمة' },
  exclusiveVIP: { en: 'Exclusive VIP Predictions', tr: 'Özel VIP Tahminleri', ar: 'توقعات VIP الحصرية' },
  vipNotifications: { en: 'VIP Notifications', tr: 'VIP Bildirimler', ar: 'إشعارات VIP' },
  latestNews: { en: 'Latest Sports News', tr: 'Son Spor Haberleri', ar: 'آخر أخبار الرياضة' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
