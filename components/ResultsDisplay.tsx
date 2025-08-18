
import React, { useState } from 'react';
import type { QAResults, CheckResult } from '../types';
import { CheckItem } from './CheckItem';

interface ResultsDisplayProps {
  results: QAResults;
}

type Category = 'performance' | 'accessibility' | 'seo';

const categoryDetails: Record<Category, { title: string; icon: React.ReactNode }> = {
    performance: {
        title: "Performance",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
    },
    accessibility: {
        title: "Accessibility",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path><path d="M12 18h.01"></path><path d="M16 12a4 4 0 10-8 0"></path></svg>
    },
    seo: {
        title: "SEO",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    }
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<Category>('performance');

  const getCategoryScore = (checks: CheckResult[]): number => {
    if (checks.length === 0) return 0;
    const passedChecks = checks.filter(c => c.status === 'PASS').length;
    return Math.round((passedChecks / checks.length) * 100);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-status-pass';
    if (score >= 50) return 'text-status-warn';
    return 'text-status-fail';
  };

  const currentChecks = results[activeTab];

  return (
    <div className="w-full bg-light-bg border border-light-border rounded-lg shadow-2xl animate-slide-up">
      <div className="p-4 md:p-6 border-b border-light-border">
          <h2 className="text-2xl font-bold text-text-primary">Analysis Results</h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-light-border">
          <nav className="flex md:flex-col p-2 md:p-4">
            {(Object.keys(results) as Category[]).map((cat) => {
              const score = getCategoryScore(results[cat]);
              return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex justify-between items-center w-full text-left p-3 rounded-md transition-colors duration-200 ${
                  activeTab === cat ? 'bg-gray-900/50 text-brand-primary' : 'hover:bg-gray-700/50 text-text-secondary'
                }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                    {categoryDetails[cat].icon}
                    {categoryDetails[cat].title}
                </span>
                <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
              </button>
            )})}
          </nav>
        </aside>
        <div className="w-full md:w-3/4 p-4 md:p-6">
          <h3 className="text-xl font-bold mb-4 text-text-primary capitalize">{activeTab} Checks</h3>
          <div className="space-y-4">
            {currentChecks.map((check, index) => (
              <CheckItem key={index} check={check} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
