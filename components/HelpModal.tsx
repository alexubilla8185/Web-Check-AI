
import React, { useState } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'howItWorks' | 'usersGuide';

const HowItWorksContent: React.FC = () => (
    <div className="space-y-4 text-text-secondary">
        <p>Web Check AI is a modern QA tool built with React, Tailwind CSS, and powered by Google's Gemini API to provide intelligent website analysis and test generation.</p>
        
        <div>
            <h4 className="font-bold text-text-primary mb-2">Site Auditor</h4>
            <ul className="list-disc list-inside space-y-2">
                <li>Takes a URL and sends a structured prompt to the Gemini API (<code className="bg-dark-bg text-brand-secondary px-1 rounded-sm">gemini-2.5-flash</code>).</li>
                <li>The AI <strong className="text-text-primary">simulates</strong> a website audit based on common issues for that type of site. It does <strong className="text-text-primary">not</strong> actually crawl the URL.</li>
                <li>For failed or warning checks, the AI also generates an actionable <strong className="text-text-primary">code snippet</strong> to help you fix the issue quickly.</li>
                <li>It returns a JSON object with performance, accessibility, and SEO checks, which the app then displays in a categorized report.</li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-text-primary mb-2">Automated Testing</h4>
             <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-text-primary">AI Step Generation:</strong> You provide a high-level goal (e.g., "test the login flow") and the AI generates a complete list of test steps for you.</li>
                <li>You can also build a test case manually, step-by-step, in the Test Editor.</li>
                <li>This user-defined test plan is sent to the Gemini API for simulation.</li>
                <li>The AI simulates the execution of each step, determining a <code className="bg-dark-bg text-status-pass px-1 rounded-sm">PASS</code>/<code className="bg-dark-bg text-status-fail px-1 rounded-sm">FAIL</code> status and providing a reason.</li>
                <li>For failed steps, it generates a descriptive prompt for an image, which is then used with the <code className="bg-dark-bg text-brand-secondary px-1 rounded-sm">imagen-4.0-generate-001</code> model to create a visual representation of the failure.</li>
            </ul>
        </div>
        
        <div>
            <h4 className="font-bold text-text-primary mb-2">AI Code Refactor</h4>
             <ul className="list-disc list-inside space-y-2">
                <li>Allows you to input a code snippet and a natural language instruction (e.g., "add comments").</li>
                <li>The AI refactors the code based on your instruction and returns the raw code, which is then displayed.</li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-text-primary mb-2">Regex Generator</h4>
             <ul className="list-disc list-inside space-y-2">
                <li>You provide a plain-English description of a text pattern you want to match (e.g., "a valid email address").</li>
                <li>The Gemini API generates both the regular expression and a detailed, step-by-step explanation of how it works.</li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-text-primary mb-2">UI Component Generator</h4>
             <ul className="list-disc list-inside space-y-2">
                <li>Describe a UI component you need (e.g., "a responsive product card with an image, title, and price").</li>
                <li>The Gemini API generates a complete, self-contained React and Tailwind CSS component that you can copy and use in your projects.</li>
            </ul>
        </div>
    </div>
);

const UsersGuideContent: React.FC = () => (
    <div className="space-y-6 text-text-secondary">
        <div>
            <h4 className="font-bold text-text-primary mb-2">Using the Site Auditor</h4>
            <ol className="list-decimal list-inside space-y-2">
                <li>Select the "Site Auditor" tab on the main screen.</li>
                <li>Enter a website URL and click "Analyze".</li>
                <li>In the results, look for "Suggested Fix" sections, which provide copyable code snippets to resolve issues.</li>
            </ol>
        </div>

        <div>
            <h4 className="font-bold text-text-primary mb-2">Using the Automated Testing Center</h4>
             <ol className="list-decimal list-inside space-y-2">
                <li>Select the "Automated Testing" tab.</li>
                <li>Click the "Create New Test" button.</li>
                <li>Provide a test name and a starting URL.</li>
                <li><strong className="text-text-primary">Use AI-Assist:</strong> In the "AI-Assist" panel, type an instruction like "Test adding a product to the cart and proceeding to checkout." Click "Generate Steps" to have the AI populate the test case for you.</li>
                <li><strong className="text-text-primary">Add Steps Manually:</strong> Use the form at the bottom to add or modify steps as needed.</li>
                <li>Click "Save & Run Test" to get a simulated report with AI-generated failure screenshots.</li>
            </ol>
        </div>
        
        <div>
            <h4 className="font-bold text-text-primary mb-2">Using the AI Code Refactor</h4>
             <ol className="list-decimal list-inside space-y-2">
                <li>Select the "AI Refactor" tab.</li>
                <li>Paste your code into the left text area.</li>
                <li>Type an instruction (e.g., "convert to TypeScript") in the top input field and click "Refactor Code".</li>
                <li>The updated code will appear on the right.</li>
            </ol>
        </div>

        <div>
            <h4 className="font-bold text-text-primary mb-2">Using the Regex Generator</h4>
             <ol className="list-decimal list-inside space-y-2">
                <li>Select the "Regex Gen" tab.</li>
                <li>In the input field, describe the text pattern you need to match.</li>
                <li>Click "Generate Regex".</li>
                <li>The generated regular expression and a detailed explanation will appear below.</li>
            </ol>
        </div>

        <div>
            <h4 className="font-bold text-text-primary mb-2">Using the UI Component Generator</h4>
             <ol className="list-decimal list-inside space-y-2">
                <li>Select the "UI Gen" tab.</li>
                <li>Describe the component you want to build in the input field. Be descriptive!</li>
                <li>Click "Generate Component".</li>
                <li>A preview of the AI-generated component and its code will appear below.</li>
            </ol>
        </div>
    </div>
);


export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<Tab>('howItWorks');

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-light-bg border border-light-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-light-border flex-shrink-0">
                    <h3 className="text-xl font-bold text-text-primary">Help & User Guide</h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="p-4 border-b border-light-border flex-shrink-0">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('howItWorks')}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'howItWorks' ? 'bg-brand-primary text-dark-bg' : 'text-text-secondary hover:bg-dark-bg'}`}
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => setActiveTab('usersGuide')}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'usersGuide' ? 'bg-brand-primary text-dark-bg' : 'text-text-secondary hover:bg-dark-bg'}`}
                        >
                            User's Guide
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto">
                    {activeTab === 'howItWorks' && <HowItWorksContent />}
                    {activeTab === 'usersGuide' && <UsersGuideContent />}
                </div>
            </div>
        </div>
    );
};
