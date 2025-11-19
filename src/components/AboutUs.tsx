import { Target, Users, TrendingUp, Award, Shield, Zap } from 'lucide-react';

export function AboutUs() {
  const team = [
    {
      name: 'Michael Anderson',
      role: 'Chief Sports Analyst',
      experience: '15+ years',
      specialty: 'Football & Basketball',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Sarah Martinez',
      role: 'Data Scientist',
      experience: '10+ years',
      specialty: 'AI & Predictive Analytics',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'David Chen',
      role: 'Senior Betting Strategist',
      experience: '12+ years',
      specialty: 'Tennis & Risk Management',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
      name: 'Emma Johnson',
      role: 'Head of Research',
      experience: '8+ years',
      specialty: 'Statistical Analysis',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Accuracy',
      description: 'We maintain 92% prediction accuracy through rigorous data analysis and expert insights.',
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'All predictions are tracked and verified. We share both wins and losses openly.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a community of informed bettors who make smart, data-driven decisions.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Cutting-edge AI technology combined with decades of sports betting expertise.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '92%', label: 'Win Rate' },
    { number: '15+', label: 'Years Experience' },
    { number: '1M+', label: 'Predictions Made' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            About OptikGoal
          </h1>
          <p className="text-xl text-purple-300 max-w-3xl mx-auto leading-relaxed">
            We're a team of passionate sports analysts, data scientists, and betting experts 
            dedicated to providing the most accurate predictions in the industry.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-gradient-to-br from-purple-900 to-black border-2 border-amber-500 rounded-xl p-6 text-center animate-in fade-in zoom-in"
            >
              <div className="text-4xl md:text-5xl mb-2 text-amber-400">{stat.number}</div>
              <div className="text-sm text-purple-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-8 md:p-12 mb-16">
          <div className="flex items-center justify-center mb-6">
            <Target className="w-12 h-12 text-amber-400" />
          </div>
          <h2 className="text-3xl text-center mb-6 text-white">Our Mission</h2>
          <p className="text-lg text-purple-300 text-center max-w-4xl mx-auto leading-relaxed">
            At OptikGoal, our mission is to revolutionize sports betting through data-driven insights 
            and expert analysis. We believe that informed betting is responsible betting, and we're 
            committed to providing our users with the tools and knowledge they need to make smart decisions.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12 text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 hover:border-amber-500 rounded-xl p-6 transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-10"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl mb-3 text-amber-400">{value.title}</h3>
                <p className="text-sm text-purple-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12 text-white">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 hover:border-amber-500 rounded-xl overflow-hidden transition-all hover:scale-105 animate-in fade-in zoom-in"
              >
                <div className="aspect-square overflow-hidden bg-purple-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2 text-white">{member.name}</h3>
                  <div className="text-amber-400 mb-2">{member.role}</div>
                  <div className="text-sm text-purple-400 mb-2">{member.experience}</div>
                  <div className="text-sm text-purple-300">{member.specialty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-r from-purple-900 via-black to-purple-900 border-2 border-amber-500 rounded-xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <Award className="w-12 h-12 text-amber-400" />
          </div>
          <h2 className="text-3xl text-center mb-6 text-white">Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl mb-3 text-amber-400">AI-Powered Predictions</h3>
              <p className="text-purple-300 leading-relaxed">
                Our proprietary AI algorithms analyze thousands of data points including team 
                performance, player statistics, weather conditions, and historical trends to 
                generate highly accurate predictions.
              </p>
            </div>
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl mb-3 text-amber-400">Real-Time Data</h3>
              <p className="text-purple-300 leading-relaxed">
                We integrate with multiple sports data APIs to provide live scores, odds updates, 
                and match statistics in real-time, ensuring you always have the latest information.
              </p>
            </div>
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl mb-3 text-amber-400">Expert Analysis</h3>
              <p className="text-purple-300 leading-relaxed">
                Every prediction is reviewed by our team of sports analysts who bring decades of 
                combined experience in sports betting and professional analysis.
              </p>
            </div>
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl mb-3 text-amber-400">Transparent Tracking</h3>
              <p className="text-purple-300 leading-relaxed">
                All our predictions are tracked and results are publicly available. We believe in 
                complete transparency and accountability for every tip we provide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
