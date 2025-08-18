import React, { useState, useCallback } from 'react';
import { refactorCode } from '../services/geminiService';

const RefactorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
);


export const AiCodeRefactor: React.FC = () => {
    const [inputCode, setInputCode] = useState('');
    const [instruction, setInstruction] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleRefactor = useCallback(async () => {
        if (!inputCode.trim() || !instruction.trim()) {
            setError('Please provide both code and an instruction.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setOutputCode('');

        try {
            const result = await refactorCode(inputCode, instruction);
            setOutputCode(result);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to refactor code. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [inputCode, instruction]);

    return (
        <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-5xl flex flex-col items-center">
              <h1 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
                AI Code Refactor
              </h1>
              <p className="text-lg md:text-xl text-text-secondary text-center mb-8 max-w-3xl">
                Paste your code, describe how you want to change it, and let AI handle the optimization, translation, or documentation.
              </p>
              
              <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center gap-4 p-4 bg-light-bg border border-light-border rounded-lg mb-8">
                <input
                    type="text"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="e.g., 'Convert this to a React functional component with hooks'"
                    required
                    disabled={isLoading}
                    className="w-full flex-grow px-4 py-3 bg-dark-bg border border-light-border/70 rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all duration-300 disabled:opacity-50"
                />
                <button
                    onClick={handleRefactor}
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-dark-bg font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300 flex-shrink-0"
                >
                    {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Refactoring...
                    </>
                    ) : (
                    <>
                        <RefactorIcon />
                        Refactor Code
                    </>
                    )}
                </button>
              </div>

              {error && (
                <div className="mb-6 w-full max-w-4xl bg-red-900/50 border border-status-fail text-status-fail p-4 rounded-lg text-center animate-fade-in">
                  {error}
                </div>
              )}

              <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <div>
                      <label htmlFor="input-code" className="block text-sm font-medium text-text-primary mb-2">Your Code</label>
                      <textarea
                        id="input-code"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Paste your code snippet here..."
                        disabled={isLoading}
                        className="w-full h-96 font-mono text-sm p-4 bg-dark-bg border border-light-border rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:outline-none resize-y transition-all duration-300 disabled:opacity-50"
                        aria-label="Your Code Input"
                      />
                  </div>
                   <div>
                      <label htmlFor="output-code" className="block text-sm font-medium text-text-primary mb-2">Refactored Code</label>
                       <textarea
                        id="output-code"
                        value={outputCode}
                        readOnly
                        placeholder="AI-generated code will appear here..."
                        className="w-full h-96 font-mono text-sm p-4 bg-dark-bg border border-light-border rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:outline-none resize-y transition-all duration-300"
                        aria-label="Refactored Code Output"
                      />
                  </div>
              </div>
            </div>
        </div>
    );
};