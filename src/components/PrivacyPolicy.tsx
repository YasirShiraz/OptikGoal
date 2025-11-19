import { Lock, Eye, Database, UserCheck, Shield, AlertCircle } from 'lucide-react';

export function PrivacyPolicy() {
  const sections = [
    {
      title: '1. Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, including:
      
• Personal Information: Name, email address, phone number when you register
• Payment Information: Credit card details processed securely through our payment partners
• Usage Data: Information about how you use our service, including predictions viewed and interactions
• Technical Data: IP address, browser type, device information, and cookies`,
    },
    {
      title: '2. How We Use Your Information',
      icon: UserCheck,
      content: `We use the information we collect to:
      
• Provide and maintain our services
• Process your transactions and send notifications
• Send you predictions, updates, and promotional communications
• Improve and personalize your experience
• Detect and prevent fraud or abuse
• Comply with legal obligations`,
    },
    {
      title: '3. Information Sharing',
      icon: Shield,
      content: `We do not sell your personal information. We may share your information with:
      
• Service Providers: Payment processors, email services, and analytics providers
• Legal Requirements: When required by law or to protect our rights
• Business Transfers: In case of merger, acquisition, or sale of assets
• With Your Consent: When you explicitly authorize us to share information`,
    },
    {
      title: '4. Data Security',
      icon: Lock,
      content: `We implement appropriate security measures to protect your personal information:
      
• 256-bit SSL encryption for all data transmission
• Secure servers with regular security audits
• Limited access to personal information by authorized personnel only
• Regular backups and disaster recovery procedures
• PCI DSS compliance for payment processing`,
    },
    {
      title: '5. Your Rights',
      icon: Eye,
      content: `You have the right to:
      
• Access your personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Object to processing of your data
• Data portability
• Withdraw consent at any time
• Lodge a complaint with supervisory authorities`,
    },
    {
      title: '6. Cookies and Tracking',
      icon: AlertCircle,
      content: `We use cookies and similar technologies to:
      
• Remember your preferences and settings
• Analyze site traffic and user behavior
• Provide personalized content
• Enable social media features
      
You can control cookies through your browser settings. Note that disabling cookies may affect site functionality.`,
    },
  ];

  const principles = [
    {
      title: 'Transparency',
      description: 'We are clear about what data we collect and how we use it',
    },
    {
      title: 'Security',
      description: 'Your data is protected with industry-leading security measures',
    },
    {
      title: 'Control',
      description: 'You have full control over your personal information',
    },
    {
      title: 'No Sale',
      description: 'We never sell your personal data to third parties',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lock className="w-16 h-16 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-purple-300">Last updated: November 19, 2025</p>
          <p className="text-purple-400 mt-2">Your privacy is important to us</p>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-gradient-to-br from-purple-900 to-black border-2 border-amber-500 rounded-xl p-6 animate-in fade-in zoom-in"
            >
              <h3 className="text-xl mb-2 text-amber-400">{principle.title}</h3>
              <p className="text-sm text-purple-300">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <div
              key={section.title}
              style={{ animationDelay: `${index * 50}ms` }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 hover:border-amber-500 rounded-xl p-8 transition-all animate-in fade-in slide-in-from-bottom-10"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl mb-4 text-amber-400">{section.title}</h2>
                  <div className="text-purple-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl mb-6 text-amber-400">Data Retention</h2>
          <p className="text-purple-300 leading-relaxed mb-4">
            We retain your personal information for as long as necessary to provide our services and 
            comply with legal obligations. When you close your account, we will delete or anonymize 
            your personal information within 90 days, except where we are required to retain it for 
            legal or regulatory purposes.
          </p>
          <h3 className="text-xl mb-4 text-amber-400">International Data Transfers</h3>
          <p className="text-purple-300 leading-relaxed mb-4">
            Your information may be transferred to and processed in countries other than your country 
            of residence. We ensure appropriate safeguards are in place to protect your information 
            in compliance with applicable data protection laws.
          </p>
          <h3 className="text-xl mb-4 text-amber-400">Children's Privacy</h3>
          <p className="text-purple-300 leading-relaxed">
            Our service is not intended for users under 18 years of age. We do not knowingly collect 
            personal information from children. If you are a parent or guardian and believe your child 
            has provided us with personal information, please contact us.
          </p>
        </div>

        {/* GDPR Compliance */}
        <div className="bg-gradient-to-r from-purple-900 via-black to-purple-900 border-2 border-amber-500 rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-10 h-10 text-amber-400 mr-4" />
            <h2 className="text-2xl text-white">GDPR Compliance</h2>
          </div>
          <p className="text-purple-300 leading-relaxed mb-4">
            We are committed to complying with the General Data Protection Regulation (GDPR) and 
            other applicable data protection laws. As a data subject, you have specific rights regarding 
            your personal data:
          </p>
          <ul className="space-y-2 text-purple-300">
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span>Right to be informed about data collection and usage</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span>Right of access to your personal data</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span>Right to rectification of inaccurate data</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span>Right to erasure (right to be forgotten)</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span>Right to restrict processing</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span>Right to data portability</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              <span>Right to object to processing</span>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-amber-900/30 to-purple-900/30 border-2 border-amber-500 rounded-xl p-6">
          <h3 className="text-xl mb-4 text-amber-400">Contact Us About Privacy</h3>
          <p className="text-purple-300 mb-4">
            If you have questions or concerns about our privacy practices or wish to exercise your 
            data rights, please contact our Data Protection Officer:
          </p>
          <div className="space-y-2 text-purple-300">
            <p>Email: privacy@optikgoal.com</p>
            <p>Phone: +1 (234) 567-890</p>
            <p>Address: Istanbul, Turkey</p>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="text-center mt-8 text-purple-300">
          <p className="text-sm">
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  );
}
