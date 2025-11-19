import { FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export function TermsOfService() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using OptikGoal's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms of Service, please do not use this service.`,
    },
    {
      title: '2. Use of Service',
      content: `OptikGoal provides sports prediction and analysis services. Our service is intended for users who are 18 years of age or older. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.`,
    },
    {
      title: '3. Predictions and Disclaimers',
      content: `All predictions and tips provided are for informational purposes only. Past performance is not indicative of future results. OptikGoal does not guarantee the accuracy of predictions or that following our recommendations will result in profit. Sports betting involves risk, and you should only bet what you can afford to lose.`,
    },
    {
      title: '4. Subscription and Payment',
      content: `VIP memberships are subscription-based and will automatically renew unless cancelled. All payments are processed securely through our payment partners. Refunds are available within 30 days of initial purchase as per our money-back guarantee policy.`,
    },
    {
      title: '5. Intellectual Property',
      content: `All content, predictions, analysis, and materials provided on OptikGoal are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.`,
    },
    {
      title: '6. User Conduct',
      content: `You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service. You may not attempt to gain unauthorized access to any portion of the service or any systems or networks connected to the service.`,
    },
    {
      title: '7. Limitation of Liability',
      content: `OptikGoal shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.`,
    },
    {
      title: '8. Changes to Terms',
      content: `We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Your continued use of the service after such modifications constitutes acceptance of the updated terms.`,
    },
    {
      title: '9. Termination',
      content: `We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.`,
    },
    {
      title: '10. Governing Law',
      content: `These Terms of Service shall be governed by and construed in accordance with the laws of Turkey, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of Istanbul, Turkey.`,
    },
  ];

  const highlights = [
    {
      icon: Shield,
      title: 'Your Privacy',
      description: 'We protect your personal information and never share it with third parties.',
    },
    {
      icon: CheckCircle,
      title: 'Fair Use',
      description: 'Clear guidelines ensure fair and responsible use of our platform.',
    },
    {
      icon: AlertTriangle,
      title: 'Responsible Betting',
      description: 'We promote responsible gambling and provide tools to help you stay in control.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="w-16 h-16 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-purple-300">Last updated: November 19, 2025</p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 rounded-xl p-6 text-center animate-in fade-in zoom-in"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg mb-2 text-amber-400">{item.title}</h3>
              <p className="text-sm text-purple-300">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Terms Content */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-8 mb-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-10"
              >
                <h2 className="text-2xl mb-4 text-amber-400">{section.title}</h2>
                <p className="text-purple-300 leading-relaxed">{section.content}</p>
                {index < sections.length - 1 && (
                  <div className="mt-6 border-b border-purple-900"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-amber-900/30 to-purple-900/30 border-2 border-amber-500 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl mb-2 text-amber-400">Important Notice</h3>
              <p className="text-purple-300 leading-relaxed">
                Gambling can be addictive. Please play responsibly. If you or someone you know has a 
                gambling problem, please seek help from organizations such as GamCare, Gambling Therapy, 
                or your local support services. OptikGoal is not a gambling operator but a sports analysis 
                and prediction service.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-8 text-purple-300">
          <p>Questions about our Terms of Service?</p>
          <a href="#contact" className="text-amber-400 hover:text-amber-300 underline">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
