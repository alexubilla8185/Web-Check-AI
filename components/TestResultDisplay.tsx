import React from 'react';
import type { TestRunResult } from '../types';
import { Status } from '../types';
import { TestStepItem } from './TestStepItem';

interface TestResultDisplayProps {
  result: TestRunResult;
  onBack: () => void;
}

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

export const TestResultDisplay: React.FC<TestResultDisplayProps> = ({ result, onBack }) => {
  const isFail = result.status === Status.FAIL;
  const statusColor = isFail ? 'text-status-fail' : 'text-status-pass';
  const statusBgColor = isFail ? 'bg-status-fail/10' : 'bg-status-pass/10';
  const statusBorderColor = isFail ? 'border-status-fail/50' : 'border-status-pass/50';

  return (
    <div className="bg-light-bg border border-light-border rounded-lg shadow-2xl animate-slide-up">
      <div className="p-6 border-b border-light-border flex justify-between items-start">
        <div>
            <h2 className="text-2xl font-bold text-text-primary">{result.title}</h2>
            <p className="text-text-secondary mt-1">
                Test for: <a href={result.targetUrl} target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">{result.targetUrl}</a>
            </p>
            <p className="text-xs text-text-secondary/70 mt-1">
                Completed at: {new Date(result.completedAt).toLocaleString()}
            </p>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <BackIcon />
            Back to Dashboard
        </button>
      </div>

      <div className={`p-6 border-b ${statusBorderColor} ${statusBgColor}`}>
          <h3 className={`font-bold text-lg ${statusColor} mb-2`}>Overall Result: {result.status}</h3>
          <p className="text-text-secondary">{result.summary}</p>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-6">Execution Steps</h3>
        <ol className="relative border-l border-light-border space-y-8">
          {result.steps.map((step, index) => (
            <TestStepItem key={index} step={step} index={index + 1} />
          ))}
        </ol>
      </div>
    </div>
  );
};
