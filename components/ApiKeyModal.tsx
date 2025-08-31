
import React, { useState } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

const KeyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>;

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
    const [apiKey, setApiKey] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if (apiKey.trim()) {
            onSave(apiKey.trim());
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-light-bg border border-light-border rounded-lg shadow-2xl w-full max-w-lg flex flex-col animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-light-border">
                    <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <KeyIcon />
                        Google Gemini API Key
                    </h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-text-secondary">
                        To use the AI-powered features of this application, you need to provide your own Google Gemini API key.
                        You can get a key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">Google AI Studio</a>.
                    </p>
                    <div className="bg-dark-bg p-3 border border-light-border rounded-md text-sm text-text-secondary">
                        <strong>Important:</strong> Your API key is stored <strong className="text-text-primary">only in your browser's local storage</strong>. It is never sent to our servers or seen by anyone else.
                    </div>
                     <div>
                        <label htmlFor="api-key-input" className="block text-sm font-medium text-text-primary mb-2">Your API Key</label>
                        <input
                            id="api-key-input"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your API key here"
                            className="w-full px-4 py-2.5 bg-dark-bg border border-light-border rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                            aria-label="API Key Input"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 p-4 border-t border-light-border">
                    <button onClick={onClose} className="px-6 py-2 text-text-secondary hover:text-text-primary transition-colors">
                        Continue without Key
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={!apiKey.trim()}
                        className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-dark-bg font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                        Save Key
                    </button>
                </div>
            </div>
        </div>
    );
};
