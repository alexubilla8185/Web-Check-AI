import React from 'react';

interface HeaderProps {
  onHelpClick: () => void;
  onApiKeyClick: () => void;
}

const LogoIcon: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-brand-primary"
  >
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HelpIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const KeyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
);


export const Header: React.FC<HeaderProps> = ({ onHelpClick, onApiKeyClick }) => {
  return (
    <header className="bg-light-bg/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 border-b border-light-border">
          <div className="flex items-center space-x-2">
            <LogoIcon />
            <span className="font-bold text-xl text-text-primary">Web Check AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onApiKeyClick}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300"
              aria-label="Set API Key"
              title="Set API Key"
            >
              <KeyIcon />
            </button>
            <button
              onClick={onHelpClick}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300"
              aria-label="Open help modal"
              title="Help & User Guide"
            >
              <HelpIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
