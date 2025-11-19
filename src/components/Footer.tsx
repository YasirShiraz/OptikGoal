import { Shield, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
  onNavigate?: (page: string) => void;
}

export function Footer({ onAdminClick, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-black via-purple-950 to-black text-gray-300 mt-auto border-t-2 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <div>
                <div className="text-xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  OptikGoal
                </div>
                <div className="text-xs text-purple-400">Premium Predictions</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Professional sports predictions and live scores platform. Expert analysis powered by AI for football, basketball, and tennis.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-purple-900 to-black rounded-lg flex items-center justify-center hover:from-amber-500 hover:to-amber-600 transition-all border border-amber-500/30 hover:border-amber-500 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-amber-400 group-hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-purple-900 to-black rounded-lg flex items-center justify-center hover:from-amber-500 hover:to-amber-600 transition-all border border-amber-500/30 hover:border-amber-500 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-amber-400 group-hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-purple-900 to-black rounded-lg flex items-center justify-center hover:from-amber-500 hover:to-amber-600 transition-all border border-amber-500/30 hover:border-amber-500 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-amber-400 group-hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-purple-900 to-black rounded-lg flex items-center justify-center hover:from-amber-500 hover:to-amber-600 transition-all border border-amber-500/30 hover:border-amber-500 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-amber-400 group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-amber-400 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('vip')}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  VIP Membership
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  Contact Us
                </button>
              </li>
              {onAdminClick && (
                <li>
                  <button 
                    onClick={onAdminClick}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center group"
                  >
                    <Shield className="w-4 h-4 mr-2 text-purple-600 group-hover:text-amber-400 transition-colors" />
                    Admin Panel
                  </button>
                </li>
              )}
            </ul>
          </div>
          
          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-amber-400 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('terms')}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('privacy')}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  Responsible Gaming
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-amber-400 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:info@optikgoal.com" className="text-sm text-white hover:text-amber-400 transition-colors">
                    info@optikgoal.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+1234567890" className="text-sm text-white hover:text-amber-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-sm text-white">Istanbul, Turkey</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-purple-900/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 text-center md:text-left">
              &copy; {currentYear} OptikGoal. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Powered by Advanced AI Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}