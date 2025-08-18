import React, { useState, useCallback } from 'react';
import { Loader } from './Loader';
import { TestDashboard } from './TestDashboard';
import { TestEditor } from './TestEditor';
import { TestResultDisplay } from './TestResultDisplay';
import { simulateTestRun, generateFailureImage } from '../services/geminiService';
import { mockTestSuites, mockTestRunResults } from '../services/mockData';
import type { TestSuite, TestRunResult, TestStep } from '../types';
import { Status } from '../types';

type ViewState = 'dashboard' | 'editor' | 'running' | 'results';

export const AutomatedTesting: React.FC = () => {
    const [view, setView] = useState<ViewState>('dashboard');
    const [testSuites, setTestSuites] = useState<TestSuite[]>(mockTestSuites);
    const [activeRunResult, setActiveRunResult] = useState<TestRunResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('AI is simulating the test run...');

    const handleCreateNew = () => {
        setError(null);
        setView('editor');
    };

    const handleBackToDashboard = () => {
        setActiveRunResult(null);
        setError(null);
        setView('dashboard');
    }

    const runTest = useCallback(async (testSuite: TestSuite) => {
        setView('running');
        setError(null);
        setActiveRunResult(null);

        // Check for mock data
        if (testSuite.id.startsWith('mock-')) {
            const mockResult = mockTestRunResults[testSuite.id];
            if (mockResult) {
                setLoadingMessage('Loading sample report...');
                // Simulate a short delay for better UX
                setTimeout(() => {
                    setActiveRunResult(mockResult);
                    setView('results');
                }, 1000);
                return;
            }
        }

        try {
            // Step 1: Simulate the test run to get results and prompts
            setLoadingMessage('AI is simulating the test run...');
            const simulationResult = await simulateTestRun(testSuite);
            
            const runResult: TestRunResult = {
                ...simulationResult,
                id: `run-${Date.now()}`,
                testSuiteId: testSuite.id,
                completedAt: new Date().toISOString(),
            };

            // Step 2: Generate images for failed steps that have a prompt
            const stepsWithImagePromises = runResult.steps.map(async (step) => {
                if (step.status === Status.FAIL && step.screenshotPrompt) {
                     setLoadingMessage(`Generating failure screenshot for: "${step.description}"`);
                     try {
                        const imageUrl = await generateFailureImage(step.screenshotPrompt);
                        return { ...step, screenshotUrl: imageUrl };
                     } catch (imgError) {
                        console.error(`Failed to generate image for step: ${step.description}`, imgError);
                        return step; // Return original step if image generation fails
                     }
                }
                return step;
            });

            // Settle all image generation promises
            runResult.steps = await Promise.all(stepsWithImagePromises);

            setActiveRunResult(runResult);
            setView('results');

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to run test. ${errorMessage}`);
            setView('dashboard'); // Go back to dashboard on critical error
        }
    }, []);

    const handleSaveAndRun = useCallback(async (newTestSuite: Omit<TestSuite, 'id'>) => {
        const fullTestSuite: TestSuite = {
            ...newTestSuite,
            id: `suite-${Date.now()}`
        };
        setTestSuites(prev => [...prev, fullTestSuite]);
        await runTest(fullTestSuite);
    }, [runTest]);

    const renderContent = () => {
        switch (view) {
            case 'dashboard':
                return <TestDashboard testSuites={testSuites} onRunTest={runTest} onCreateNew={handleCreateNew} />;
            case 'editor':
                return <TestEditor onSaveAndRun={handleSaveAndRun} onCancel={handleBackToDashboard} />;
            case 'running':
                return (
                    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                        <Loader />
                        <p className="mt-4 text-text-secondary text-center">{loadingMessage}</p>
                    </div>
                );
            case 'results':
                return activeRunResult ? <TestResultDisplay result={activeRunResult} onBack={handleBackToDashboard} /> : <div className="text-center text-text-secondary">No results to display.</div>;
            default:
                return null;
        }
    };

    return (
        <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-4xl flex flex-col items-center text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
                    Automated Test Center
                </h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl">
                    Manage, create, and run simulated end-to-end tests with AI-powered reporting.
                </p>
            </div>
            {error && (
                <div className="mb-6 w-full max-w-4xl bg-red-900/50 border border-status-fail text-status-fail p-4 rounded-lg text-center animate-fade-in">
                  {error}
                </div>
            )}
            <div className="w-full max-w-5xl">
                {renderContent()}
            </div>
        </div>
    );
};