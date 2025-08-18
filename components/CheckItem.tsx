
import React, { useState } from 'react';
import type { CheckResult } from '../types';
import { Status } from '../types';

interface CheckItemProps {
  check: CheckResult;
}

const statusConfig = {
  [Status.PASS]: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-status-pass',
    bgColor: 'bg-status-pass/10',
  },
  [Status.WARN]: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.636-1.223 2.85-1.223 3.486 0l5.58 10.76c.63 1.213-.284 2.641-1.743 2.641H4.42c-1.46 0-2.372-1.428-1.743-2.64L8.257 3.1zM9 12a1 1 0 112 0 1 1 0 01-2 0zm1-4a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-status-warn',
    bgColor: 'bg-status-warn/10',
  },
  [Status.FAIL]: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-status-fail',
    bgColor: 'bg-status-fail/10',
  },
};

const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;


export const CheckItem: React.FC<CheckItemProps> = ({ check }) => {
  const [copied, setCopied] = useState(false);
  const config = statusConfig[check.status] || statusConfig[Status.WARN];

  const handleCopy = () => {
    if (check.codeSnippet) {
      navigator.clipboard.writeText(check.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`p-4 rounded-lg border border-light-border/50 ${config.bgColor}`}>
        <div className="flex items-center gap-3">
            <span className={config.color}>{config.icon}</span>
            <h4 className="font-bold text-md text-text-primary">{check.name}</h4>
        </div>
        <div className="pl-8 mt-2 space-y-1 text-sm">
            <p className="text-text-secondary">{check.description}</p>
            {check.status !== Status.PASS && (
                <p className="text-text-secondary"><strong className="text-text-primary">Recommendation:</strong> {check.recommendation}</p>
            )}
            {check.codeSnippet && (
                <div className="mt-3">
                    <p className="text-text-primary font-semibold mb-1">Suggested Fix:</p>
                    <div className="relative bg-dark-bg p-3 rounded-md border border-light-border/70 font-mono text-sm text-brand-secondary/90">
                        <code>{check.codeSnippet}</code>
                        <button 
                            onClick={handleCopy} 
                            className="absolute top-2 right-2 p-1.5 rounded-md text-text-secondary hover:bg-light-bg hover:text-text-primary transition-colors"
                            aria-label="Copy code snippet"
                        >
                            {copied ? <CheckIcon /> : <CopyIcon />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
