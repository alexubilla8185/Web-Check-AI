
import React from 'react';

type View = 'auditor' | 'testing' | 'refactor' | 'regex' | 'componentGenerator' | 'tools' | 'home';

interface HomeProps {
    setCurrentView: (view: View) => void;
}

const AuditorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const TestingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>;
const ToolsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;


const FeatureCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string;
    ctaText: string;
    onClick: () => void;
}> = ({ icon, title, description, ctaText, onClick }) => (
    <div className="bg-light-bg p-6 rounded-lg border border-light-border flex flex-col">
        <div className="flex items-center gap-4 mb-3">
            <div className="bg-gray-800 p-3 rounded-md text-brand-primary">{icon}</div>
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
        </div>
        <p className="text-text-secondary flex-grow mb-6">{description}</p>
        <button
            onClick={onClick}
            className="w-full mt-auto px-6 py-2.5 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-dark-bg transition-colors"
        >
           {ctaText}
        </button>
    </div>
);


export const Home: React.FC<HomeProps> = ({ setCurrentView }) => {
    return (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
            <div className="w-full max-w-4xl flex flex-col items-center">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
                Your AI-Powered QA & Dev Toolkit
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-3xl">
                Streamline your workflow with a suite of intelligent tools designed for modern web developers and QA engineers. From automated audits to code generation, Web Check AI has you covered.
              </p>
            </div>
            
            <div className="w-full max-w-5xl grid md:grid-cols-3 gap-6 text-left">
                <FeatureCard 
                    icon={<AuditorIcon />}
                    title="Site Auditor"
                    description="Get an instant, AI-driven analysis of any website's performance, accessibility, and SEO health, complete with actionable code snippets for fixes."
                    ctaText="Start Auditing"
                    onClick={() => setCurrentView('auditor')}
                />
                <FeatureCard 
                    icon={<TestingIcon />}
                    title="Automated Testing"
                    description="Generate and simulate end-to-end tests from natural language. Get detailed reports with AI-generated screenshots for failed steps."
                    ctaText="Go to Test Center"
                    onClick={() => setCurrentView('testing')}
                />
                <FeatureCard 
                    icon={<ToolsIcon />}
                    title="Developer Utilities"
                    description="A collection of AI-powered tools, including a code refactorer, regex generator, and a UI component builder to accelerate your development."
                    ctaText="Explore Tools"
                    onClick={() => setCurrentView('refactor')}
                />
            </div>
        </div>
    );
};
