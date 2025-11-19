import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { useState } from 'react';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@optikgoal.com',
      link: 'mailto:info@optikgoal.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (234) 567-890',
      link: 'tel:+1234567890',
      description: 'Mon-Fri from 8am to 6pm',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'Istanbul, Turkey',
      link: '#',
      description: 'Visit our office',
    },
  ];

  const faqs = [
    {
      question: 'How accurate are your predictions?',
      answer: 'Our VIP predictions maintain a 92% accuracy rate based on tracked historical data.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. No questions asked.',
    },
    {
      question: 'Do you offer a money-back guarantee?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all VIP memberships.',
    },
    {
      question: 'How do I receive predictions?',
      answer: 'Predictions are available on our platform and sent via email and push notifications.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-purple-300 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to our team anytime.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={info.title}
              href={info.link}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 hover:border-amber-500 rounded-xl p-6 transition-all hover:scale-105 animate-in fade-in zoom-in group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <info.icon className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-xl mb-2 text-amber-400">{info.title}</h3>
              <p className="text-white mb-2">{info.value}</p>
              <p className="text-sm text-purple-300">{info.description}</p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-8 h-8 text-amber-400 mr-3" />
              <h2 className="text-2xl text-white">Send us a Message</h2>
            </div>

            {submitted ? (
              <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-2 text-green-400">Message Sent!</h3>
                <p className="text-purple-300">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-purple-200 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Subject</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="vip">VIP Membership</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black transition-all shadow-lg hover:shadow-amber-500/50 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900 to-black border-2 border-amber-500 rounded-xl p-8">
              <h2 className="text-2xl mb-6 text-white flex items-center">
                <Clock className="w-8 h-8 text-amber-400 mr-3" />
                Office Hours
              </h2>
              <div className="space-y-4 text-purple-300">
                <div className="flex justify-between items-center pb-3 border-b border-purple-800">
                  <span>Monday - Friday</span>
                  <span className="text-amber-400">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-purple-800">
                  <span>Saturday</span>
                  <span className="text-amber-400">9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sunday</span>
                  <span className="text-purple-500">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700 rounded-xl p-8">
              <h2 className="text-2xl mb-6 text-white">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-purple-900/30 border border-purple-700 rounded-lg p-4 hover:border-amber-500 transition-colors"
                  >
                    <h3 className="text-amber-400 mb-2">{faq.question}</h3>
                    <p className="text-sm text-purple-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-gradient-to-r from-purple-900 via-black to-purple-900 border-2 border-amber-500 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-8 h-8 text-amber-400 mr-3" />
            <h2 className="text-2xl text-white">Follow Us on Social Media</h2>
          </div>
          <p className="text-purple-300 mb-6">Stay updated with the latest predictions and sports news</p>
          <div className="flex justify-center space-x-4">
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-12 h-12 bg-gradient-to-br from-purple-900 to-black border-2 border-purple-700 hover:border-amber-500 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <span className="text-amber-400">{platform[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
