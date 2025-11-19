import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { MatchPredictions } from './components/MatchPredictions';
import { MatchBulletin } from './components/MatchBulletin';
import { LiveScores } from './components/LiveScores';
import { VIPMembership } from './components/VIPMembership';
import { Comments } from './components/Comments';
import { News } from './components/News';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { TermsOfService } from './components/TermsOfService';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { LanguageProvider } from './components/LanguageContext';
import { AuthProvider, useAuth } from './components/AuthContext';
import { AdminProvider, useAdmin } from './components/AdminContext';
import { ModernLogin } from './components/ModernLogin';
import { ModernSignup } from './components/ModernSignup';
import { AdminDashboard } from './components/AdminDashboard';

type Page = 'home' | 'predictions' | 'bulletin' | 'live' | 'vip' | 'comments' | 'news' | 'admin' | 'about' | 'contact' | 'terms' | 'privacy';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { isAdminAuthenticated, adminLogin } = useAdmin();
  const { login, isAuthenticated } = useAuth();

  // Show login on initial load
  useEffect(() => {
    if (isInitialLoad && !isAuthenticated && !isAdminAuthenticated) {
      setShowLogin(true);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, isAuthenticated, isAdminAuthenticated]);

  const handleAdminLogin = (username: string, password: string) => {
    adminLogin(username, password);
    setCurrentPage('admin');
  };

  const handleUserLogin = (email: string, password: string) => {
    login(email, password);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (currentPage === 'admin') {
      if (!isAdminAuthenticated) {
        setCurrentPage('home');
        setShowLogin(true);
        return <HomePage onNavigate={setCurrentPage} />;
      }
      return <AdminDashboard />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'predictions':
        return <MatchPredictions />;
      case 'bulletin':
        return <MatchBulletin />;
      case 'live':
        return <LiveScores />;
      case 'vip':
        return <VIPMembership />;
      case 'comments':
        return <Comments />;
      case 'news':
        return <News />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'terms':
        return <TermsOfService />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/4 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 bg-amber-500 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-purple-500 rounded-full opacity-70 animate-float" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-amber-300 rounded-full opacity-50 animate-float" style={{ animationDelay: '1.5s', animationDuration: '5.5s' }}></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {currentPage !== 'admin' && (
          <Header 
            currentPage={currentPage} 
            onNavigate={setCurrentPage}
            onOpenLogin={() => setShowLogin(true)}
            onOpenSignup={() => setShowSignup(true)}
          />
        )}
        <main className="flex-1">
          {renderPage()}
        </main>
        {currentPage !== 'admin' && <Footer onAdminClick={() => setCurrentPage('admin')} onNavigate={setCurrentPage} />}
      </div>
      
      {/* Auth Modals */}
      {showLogin && (
        <ModernLogin
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onAdminLogin={handleAdminLogin}
          onUserLogin={handleUserLogin}
        />
      )}
      
      {showSignup && (
        <ModernSignup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AuthProvider>
        <LanguageProvider>
          <MainApp />
        </LanguageProvider>
      </AuthProvider>
    </AdminProvider>
  );
}
