import { Crown, Check, Bell, TrendingUp, Star, Zap, CreditCard, Shield, Lock } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const paymentMethods = [
  { 
    name: 'Visa', 
    icon: <CreditCard className="w-5 h-5" />, 
    color: 'blue' 
  },
  { 
    name: 'Mastercard', 
    icon: <CreditCard className="w-5 h-5" />, 
    color: 'red' 
  },
  { 
    name: 'PayPal', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.653h8.53c2.347 0 4.206.522 5.393 1.512 1.113.928 1.609 2.246 1.396 3.71-.566 3.894-2.964 5.89-7.13 5.89H10.91a.77.77 0 0 0-.76.654l-.81 5.126a.641.641 0 0 1-.633.74h-.631z"/>
      </svg>
    ),
    color: 'blue' 
  },
  { 
    name: 'Apple Pay', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
    color: 'black' 
  },
  { 
    name: 'Google Pay', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    color: 'green' 
  },
  { 
    name: 'Stripe', 
    icon: <CreditCard className="w-5 h-5" />, 
    color: 'purple' 
  },
  { 
    name: 'Bitcoin', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
      </svg>
    ),
    color: 'orange' 
  },
  { 
    name: 'Bank Transfer', 
    icon: <Shield className="w-5 h-5" />, 
    color: 'gray' 
  },
];

export function VIPMembership() {
  const { t } = useLanguage();

  const packages = [
    {
      name: t('monthly'),
      price: '$29.99',
      duration: '/month',
      features: [
        'Daily VIP predictions',
        'AI-powered analysis',
        'Priority support',
        'Mobile notifications',
        'Historical statistics',
      ],
      popular: false,
      color: 'amber',
    },
    {
      name: t('quarterly'),
      price: '$69.99',
      duration: '/3 months',
      savings: 'Save 22%',
      features: [
        'All Monthly features',
        'Exclusive betting strategies',
        'Weekly performance reports',
        'Direct analyst consultation',
        'Early access to predictions',
        'Coupon builder tools',
      ],
      popular: true,
      color: 'purple',
    },
    {
      name: t('annual'),
      price: '$199.99',
      duration: '/year',
      savings: 'Save 44%',
      features: [
        'All Quarterly features',
        'VIP-only community access',
        'Personalized betting plans',
        'Live match insights',
        'Dedicated account manager',
        'Premium research reports',
        'Money-back guarantee',
      ],
      popular: false,
      color: 'amber',
    },
  ];

  const vipPredictions = [
    {
      id: 1,
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      prediction: 'Bayern Win & Over 2.5',
      odds: '2.10',
      confidence: 92,
      analysis: 'Bayern dominant at home with 85% win rate vs Dortmund in last 10 matches',
    },
    {
      id: 2,
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      prediction: 'Over 225.5 Points',
      odds: '1.95',
      confidence: 88,
      analysis: 'Both teams averaging 115+ points in recent matchups',
    },
    {
      id: 3,
      homeTeam: 'Djokovic',
      awayTeam: 'Medvedev',
      prediction: 'Djokovic 2-0',
      odds: '2.20',
      confidence: 85,
      analysis: 'Djokovic undefeated on this surface this season',
    },
  ];

  const notifications = [
    { text: 'New VIP prediction available: PSG vs Monaco', time: '5 min ago', unread: true },
    { text: 'Your VIP bet won! +$245.00', time: '1 hour ago', unread: true },
    { text: 'Weekly performance report ready', time: '3 hours ago', unread: false },
  ];

  const stats = [
    { label: 'VIP Win Rate', value: '92%', icon: TrendingUp },
    { label: 'Average Odds', value: '2.15', icon: Star },
    { label: 'Monthly Profit', value: '+$1,240', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="w-16 h-16 text-amber-400" />
          </div>
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            VIP Membership
          </h1>
          <p className="text-xl text-purple-300">
            Join elite bettors with access to premium predictions and exclusive insights
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500 rounded-xl shadow-lg p-6 text-center">
              <stat.icon className="w-10 h-10 mx-auto mb-3 text-amber-400" />
              <div className="text-3xl mb-1 text-amber-400">{stat.value}</div>
              <div className="text-purple-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* VIP Predictions Preview */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-800 to-black border-2 border-amber-500 rounded-xl shadow-2xl p-8 mb-12 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl flex items-center">
              <Crown className="w-8 h-8 mr-3 text-amber-400" />
              {t('exclusiveVIP')}
            </h2>
            <div className="bg-amber-500 text-black px-4 py-2 rounded-lg">
              <span className="text-sm">Members Only</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vipPredictions.map((prediction) => (
              <div key={prediction.id} className="bg-black/40 border border-amber-500/30 backdrop-blur-sm rounded-xl p-6 hover:border-amber-500 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-amber-400 text-black px-3 py-1 rounded-full">
                    VIP
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-amber-400">{prediction.confidence}%</span>
                  </div>
                </div>
                <div className="text-lg mb-2">{prediction.homeTeam}</div>
                <div className="text-sm text-purple-300 mb-3">vs {prediction.awayTeam}</div>
                <div className="bg-purple-900/50 border border-purple-700 rounded-lg p-3 mb-3">
                  <div className="text-sm text-purple-300 mb-1">Prediction</div>
                  <div>{prediction.prediction}</div>
                  <div className="text-amber-400 mt-1">Odds: {prediction.odds}</div>
                </div>
                <p className="text-sm text-purple-200">{prediction.analysis}</p>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Notifications */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-lg p-6 mb-12">
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 mr-2 text-amber-400" />
            <h3 className="text-2xl text-white">{t('vipNotifications')}</h3>
            <span className="ml-3 bg-amber-500 text-black text-xs px-2 py-1 rounded-full">2 New</span>
          </div>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.unread 
                    ? 'bg-amber-900/20 border-amber-500' 
                    : 'bg-purple-900/20 border-purple-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={notification.unread ? 'text-white' : 'text-purple-300'}>{notification.text}</p>
                  <span className="text-sm text-purple-400">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Packages */}
        <div className="mb-12">
          <h2 className="text-3xl text-center mb-8 text-white">{t('membershipPackages')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-xl shadow-xl overflow-hidden transition-all hover:scale-105 ${
                  pkg.popular 
                    ? 'ring-4 ring-amber-500 relative' 
                    : 'bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-black text-center py-2 text-sm">
                    ⭐ Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${pkg.popular ? 'bg-gradient-to-br from-purple-900 to-black' : ''}`}>
                  <h3 className="text-2xl mb-2 text-white">{pkg.name}</h3>
                  {pkg.savings && (
                    <div className="bg-amber-500 text-black text-sm inline-block px-3 py-1 rounded-full mb-4">
                      {pkg.savings}
                    </div>
                  )}
                  <div className="mb-6">
                    <span className="text-4xl text-amber-400">{pkg.price}</span>
                    <span className="text-purple-300">{pkg.duration}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-purple-200">
                        <Check className="w-5 h-5 mr-2 flex-shrink-0 text-amber-400" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-lg'
                        : 'bg-purple-900 text-white hover:bg-purple-800 border border-purple-700'
                    }`}
                  >
                    {t('subscribe')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl mb-6 text-center text-white">Why Choose VIP?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <div>
                <h4 className="mb-2 text-amber-400">Proven Track Record</h4>
                <p className="text-sm text-purple-300">
                  Our VIP predictions have maintained a 92% win rate over the past 12 months
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="mb-2 text-purple-400">AI-Powered Analysis</h4>
                <p className="text-sm text-purple-300">
                  Advanced algorithms analyze thousands of data points for each prediction
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h4 className="mb-2 text-amber-400">Expert Team</h4>
                <p className="text-sm text-purple-300">
                  Professional sports analysts with 15+ years of experience
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="mb-2 text-purple-400">Instant Alerts</h4>
                <p className="text-sm text-purple-300">
                  Get notified immediately when new VIP predictions are available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="bg-gradient-to-br from-purple-900 to-black border-2 border-amber-500 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CreditCard className="w-8 h-8 text-amber-400" />
              <h3 className="text-3xl text-white">Secure Payment Options</h3>
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-purple-300">We accept all major payment methods for your convenience</p>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {paymentMethods.map((method, index) => (
              <div
                key={method.name}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 hover:border-amber-500 rounded-xl p-4 text-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30 cursor-pointer animate-in fade-in zoom-in"
              >
                <div className="text-4xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                  {method.icon}
                </div>
                <div className="text-xs text-purple-300 group-hover:text-amber-400 transition-colors">
                  {method.name}
                </div>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-purple-800">
            <div className="flex items-center justify-center space-x-2 text-purple-300">
              <Lock className="w-5 h-5 text-amber-400" />
              <span className="text-sm">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-300">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-sm">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-300">
              <Check className="w-5 h-5 text-amber-400" />
              <span className="text-sm">100% Secure Payments</span>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-8 bg-gradient-to-r from-amber-500/20 to-purple-900/20 border border-amber-500/50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              <h4 className="text-xl text-white">30-Day Money-Back Guarantee</h4>
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-purple-200">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}