
import React, { useState, useCallback } from 'react';
import { UrlInputForm } from './UrlInputForm';
import { Loader } from './Loader';
import { ResultsDisplay } from './ResultsDisplay';
import type { QAResults } from '../types';
import { analyzeWebsite } from '../services/geminiService';
import { mockQAResults } from '../services/mockData';

export const SiteAuditor: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [results, setResults] = useState<QAResults | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleAnalyze = useCallback(async () => {
      if (!url.trim()) {
        setError('Please enter a URL.');
        return;
      }
  
      setIsLoading(true);
      setResults(null);
      setError(null);
  
      let processedUrl = url.trim();
      if (!/^https?:\/\//i.test(processedUrl)) {
        processedUrl = `https://${processedUrl}`;
      }
  
      try {
        new URL(processedUrl);
        const analysisResults = await analyzeWebsite(processedUrl);
        setResults(analysisResults);
      } catch (e) {
        console.error(e);
        if (e instanceof TypeError) {
          setError('The URL provided is not in a valid format. Please check and try again.');
        } else {
          const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
          setError(`Failed to analyze the website. ${errorMessage}`);
        }
      } finally {
        setIsLoading(false);
      }
    }, [url]);

    const handleLoadSample = () => {
      setResults(mockQAResults);
      setError(null);
    };

    return (
        <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-3xl flex flex-col items-center">
              <h1 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
                AI-Powered Site Auditor
              </h1>
              <p className="text-lg md:text-xl text-text-secondary text-center mb-8 max-w-2xl">
                Enter a URL to get an instant, AI-driven analysis of its performance, accessibility, and SEO health.
              </p>
              <UrlInputForm
                url={url}
                setUrl={setUrl}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
              {error && (
                <div className="mt-6 w-full bg-red-900/50 border border-status-fail text-status-fail p-4 rounded-lg text-center animate-fade-in">
                  {error}
                </div>
              )}
            </div>
            <div className="w-full max-w-4xl mt-12">
              {isLoading && <Loader />}
              {!isLoading && !results && !error && (
                <div className="w-full text-center p-8 bg-light-bg border border-light-border rounded-lg">
                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Get Started</h2>
                  <p className="text-text-secondary mb-6">Enter a URL above to begin your analysis, or load a sample report to see how it works.</p>
                  <button
                    onClick={handleLoadSample}
                    className="px-8 py-3.5 bg-dark-bg border border-light-border text-text-primary font-bold rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors"
                  >
                    Load Sample Report
                  </button>
                </div>
              )}
              {results && !isLoading && <ResultsDisplay results={results} />}
            </div>
        </div>
    );
};
