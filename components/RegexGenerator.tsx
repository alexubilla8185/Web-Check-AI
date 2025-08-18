
import React, { useState, useCallback } from 'react';
import { generateRegex } from '../services/geminiService';

const RegexIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5v14M5 12h14M5 5l2 2-2 2M19 19l-2-2 2-2"/></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;

export const RegexGenerator: React.FC = () => {
    const [description, setDescription] = useState('');
    const [regex, setRegex] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!description.trim()) {
            setError('Please provide a description for the regex.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setRegex('');
        setExplanation('');

        try {
            const result = await generateRegex(description);
            setRegex(result.regex);
            setExplanation(result.explanation);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to generate regex. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [description]);
    
    return (
        <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-5xl flex flex-col items-center">
              <h1 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
                AI Regex Generator
              </h1>
              <p className="text-lg md:text-xl text-text-secondary text-center mb-8 max-w-3xl">
                Describe the text pattern you need to match, and let AI generate the regular expression and an explanation for you.
              </p>
              
              <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center gap-4 p-4 bg-light-bg border border-light-border rounded-lg mb-8">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., 'A valid email address' or 'a hex color code'"
                    required
                    disabled={isLoading}
                    className="w-full flex-grow px-4 py-3 bg-dark-bg border border-light-border/70 rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all duration-300 disabled:opacity-50"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-dark-bg font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300 flex-shrink-0"
                >
                    {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                    ) : (
                    <>
                        <RegexIcon />
                        Generate Regex
                    </>
                    )}
                </button>
              </div>

              {error && (
                <div className="mb-6 w-full max-w-4xl bg-red-900/50 border border-status-fail text-status-fail p-4 rounded-lg text-center animate-fade-in">
                  {error}
                </div>
              )}

              {(regex || explanation) && (
                <div className="w-full max-w-4xl mt-4 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Generated Regex</label>
                       <div className="relative">
                          <input
                            type="text"
                            value={regex}
                            readOnly
                            className="w-full font-mono text-md p-4 bg-dark-bg border border-light-border rounded-lg text-brand-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                            aria-label="Generated Regex"
                          />
                          <button onClick={() => navigator.clipboard.writeText(regex)} className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded-md text-text-secondary hover:bg-light-bg hover:text-text-primary"><CopyIcon /></button>
                       </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Explanation</label>
                         <div
                          className="prose prose-invert prose-sm max-w-none p-4 bg-dark-bg border border-light-border rounded-lg text-text-secondary space-y-2"
                          dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }}
                          aria-label="Regex Explanation"
                        />
                    </div>
                </div>
              )}
            </div>
        </div>
    );
};
