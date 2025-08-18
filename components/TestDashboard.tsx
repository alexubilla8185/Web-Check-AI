import React from 'react';
import type { TestSuite } from '../types';

interface TestDashboardProps {
    testSuites: TestSuite[];
    onRunTest: (testSuite: TestSuite) => void;
    onCreateNew: () => void;
}

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;

export const TestDashboard: React.FC<TestDashboardProps> = ({ testSuites, onRunTest, onCreateNew }) => {
    return (
        <div className="w-full bg-light-bg border border-light-border rounded-lg p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Test Suites</h2>
                <button
                    onClick={onCreateNew}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-dark-bg font-bold rounded-lg hover:opacity-90 transition-opacity duration-300"
                >
                    <PlusIcon />
                    Create New Test
                </button>
            </div>

            <div className="space-y-4">
                {testSuites.length > 0 ? (
                    testSuites.map(suite => (
                        <div key={suite.id} className="bg-dark-bg p-4 rounded-lg border border-light-border flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-text-primary">{suite.title}</h3>
                                <p className="text-sm text-text-secondary">{suite.targetUrl}</p>
                            </div>
                            <button 
                                onClick={() => onRunTest(suite)}
                                className="flex items-center gap-2 px-4 py-2 text-sm border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-dark-bg transition-colors"
                            >
                                <PlayIcon />
                                Run Test
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-light-border rounded-lg">
                        <h3 className="text-xl font-semibold text-text-primary">No test suites found</h3>
                        <p className="mt-2 text-text-secondary">Click "Create New Test" to build your first automated test case.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
