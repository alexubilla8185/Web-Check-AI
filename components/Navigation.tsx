
import React from 'react';

type View = 'home' | 'auditor' | 'testing' | 'refactor' | 'regex' | 'componentGenerator' | 'tools';

interface NavigationProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
      isActive
        ? 'bg-brand-primary text-dark-bg'
        : 'text-text-secondary hover:bg-light-bg hover:text-text-primary'
    }`}
  >
    {icon}
    {label}
  </button>
);

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const AuditorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const TestingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>;
const ToolsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
const RefactorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>;
const RegexIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5v14M5 12h14M5 5l2 2-2 2M19 19l-2-2 2-2"/></svg>;
const ComponentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 5.52a10 10 0 1 1 0 13.96h.01"/><path d="M18.48 18.48a10 10 0 0 1 0-13.96h-.01"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>;


export const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="w-full flex justify-center mb-8">
      <div className="flex flex-wrap justify-center p-1 space-x-1 bg-light-bg/50 border border-light-border rounded-lg">
        <NavButton
          label="Home"
          icon={<HomeIcon />}
          isActive={currentView === 'home'}
          onClick={() => setCurrentView('home')}
        />
        <NavButton
          label="Site Auditor"
          icon={<AuditorIcon />}
          isActive={currentView === 'auditor'}
          onClick={() => setCurrentView('auditor')}
        />
        <NavButton
          label="Automated Testing"
          icon={<TestingIcon />}
          isActive={currentView === 'testing'}
          onClick={() => setCurrentView('testing')}
        />
        <NavButton
          label="AI Refactor"
          icon={<RefactorIcon />}
          isActive={currentView === 'refactor'}
          onClick={() => setCurrentView('refactor')}
        />
        <NavButton
          label="Regex Gen"
          icon={<RegexIcon />}
          isActive={currentView === 'regex'}
          onClick={() => setCurrentView('regex')}
        />
        <NavButton
          label="UI Gen"
          icon={<ComponentIcon />}
          isActive={currentView === 'componentGenerator'}
          onClick={() => setCurrentView('componentGenerator')}
        />
        <NavButton
          label="Dev Tools"
          icon={<ToolsIcon />}
          isActive={currentView === 'tools'}
          onClick={() => setCurrentView('tools')}
        />
      </div>
    </div>
  );
};
