import React from 'react';
import type { TestSuite } from '../types';
import { TestStepItem } from './TestStepItem';

interface TestPlanDisplayProps {
  plan: TestSuite;
}

export const TestPlanDisplay: React.FC<TestPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="bg-light-bg border border-light-border rounded-lg shadow-2xl animate-slide-up">
      <div className="p-6 border-b border-light-border">
        <h2 className="text-2xl font-bold text-text-primary">{plan.title}</h2>
        <p className="text-text-secondary mt-1">
          Test plan for: <a href={plan.targetUrl} target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">{plan.targetUrl}</a>
        </p>
      </div>
      <div className="p-6">
        <ol className="relative border-l border-light-border space-y-8">
          {plan.steps.map((step, index) => (
            <TestStepItem key={index} step={step} index={index + 1} />
          ))}
        </ol>
      </div>
    </div>
  );
};
