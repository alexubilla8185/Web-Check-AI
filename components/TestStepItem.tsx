import React, { useState } from 'react';
import type { TestStep } from '../types';
import { TestAction, Status } from '../types';

interface TestStepItemProps {
  step: TestStep;
  index: number;
}

const getActionIcon = (action: TestAction) => {
    switch (action) {
        case TestAction.NAVIGATE:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
        case TestAction.CLICK:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
        case TestAction.TYPE:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A6 6 0 104.75 20h12.5a6 6 0 100-12z"></path></svg>;
        case TestAction.VERIFY_TEXT:
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
        case TestAction.VERIFY_VISIBLE:
             return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
        case TestAction.API_REQUEST:
             return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
        default:
             return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
    }
}

const statusConfig = {
  [Status.PASS]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
    color: 'text-status-pass',
  },
  [Status.FAIL]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
    color: 'text-status-fail',
  }
};

const ScreenshotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;


export const TestStepItem: React.FC<TestStepItemProps> = ({ step, index }) => {
    const [showScreenshot, setShowScreenshot] = useState(false);
    const config = step.status ? statusConfig[step.status] : null;

    return (
        <li className="ml-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full -left-4 ring-4 ring-light-bg text-brand-primary">
                {getActionIcon(step.action)}
            </span>
            <div className="p-4 bg-dark-bg rounded-lg border border-light-border/70 space-y-3">
                <div>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-text-primary">
                        Step {index}: <span className="text-brand-secondary ml-2">{step.action}</span>
                    </h3>
                    <p className="mb-2 text-base font-normal text-text-secondary">{step.description}</p>
                </div>
                
                {step.result && config && (
                    <div className={`flex items-start gap-2 text-sm p-3 rounded ${config.color === 'text-status-fail' ? 'bg-status-fail/10' : 'bg-status-pass/10'}`}>
                        <div className={`mt-0.5 ${config.color}`}>{config.icon}</div>
                        <div>
                            <span className={`font-semibold ${config.color}`}>Result:</span>
                            <span className="ml-1 text-text-secondary">{step.result}</span>
                        </div>
                    </div>
                )}

                {step.status === Status.FAIL && step.screenshotUrl && (
                    <div className="mt-2">
                        <button 
                            onClick={() => setShowScreenshot(!showScreenshot)} 
                            className="flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-primary font-semibold py-1 px-2 rounded-md hover:bg-light-bg/50 transition-colors"
                        >
                            <ScreenshotIcon />
                            {showScreenshot ? 'Hide Screenshot' : 'Show Screenshot'}
                        </button>
                        {showScreenshot && (
                            <div className="mt-2 border border-light-border rounded-lg p-2 bg-dark-bg">
                                <img src={step.screenshotUrl} alt={`Failure screenshot for Step ${index}`} className="w-full h-auto rounded-md animate-fade-in"/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </li>
    );
};
