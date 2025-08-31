
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { SiteAuditor } from './components/SiteAuditor';
import { AutomatedTesting } from './components/AutomatedTesting';
import { HelpModal } from './components/HelpModal';
import { DevelopmentTools } from './components/DevelopmentTools';
import { AiCodeRefactor } from './components/AiCodeRefactor';
import { RegexGenerator } from './components/RegexGenerator';
import { UIComponentGenerator } from './components/UIComponentGenerator';
import { Home } from './components/Home';
import { ApiKeyModal } from './components/ApiKeyModal';
import { getApiKey, saveApiKey } from './services/geminiService';


type View = 'home' | 'auditor' | 'testing' | 'refactor' | 'regex' | 'componentGenerator' | 'tools';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  
  useEffect(() => {
    // On initial load, check if an API key exists. If not, open the modal.
    const key = getApiKey();
    if (!key) {
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    saveApiKey(key);
    setIsApiKeyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary flex flex-col font-sans">
      <Header 
        onHelpClick={() => setIsHelpModalOpen(true)} 
        onApiKeyClick={() => setIsApiKeyModalOpen(true)}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'auditor' && <SiteAuditor />}
        {currentView === 'testing' && <AutomatedTesting />}
        {currentView === 'tools' && <DevelopmentTools />}
        {currentView === 'refactor' && <AiCodeRefactor />}
        {currentView === 'regex' && <RegexGenerator />}
        {currentView === 'componentGenerator' && <UIComponentGenerator />}
      </main>
      <Footer />
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)} 
        onSave={handleSaveApiKey} 
      />
    </div>
  );
};

export default App;
