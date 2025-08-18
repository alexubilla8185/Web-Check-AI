
import React, { useState, useCallback } from 'react';
import type { TestStep, TestSuite } from '../types';
import { TestAction } from '../types';
import { generateTestSteps } from '../services/geminiService';


interface TestEditorProps {
    onSaveAndRun: (newTestSuite: Omit<TestSuite, 'id'>) => void;
    onCancel: () => void;
}

const ActionIcon: React.FC<{ action: TestAction }> = ({ action }) => {
    const icons: Record<TestAction, React.ReactNode> = {
        [TestAction.NAVIGATE]: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
        [TestAction.CLICK]: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        [TestAction.TYPE]: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A6 6 0 104.75 20h12.5a6 6 0 100-12z"></path></svg>,
        [TestAction.VERIFY_TEXT]: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
        [TestAction.VERIFY_VISIBLE]: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
        [TestAction.VERIFY_URL]: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>,
        [TestAction.API_REQUEST]: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
    };
    return <span className="text-brand-secondary">{icons[action]}</span>;
};

const AiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>;

export const TestEditor: React.FC<TestEditorProps> = ({ onSaveAndRun, onCancel }) => {
    const [title, setTitle] = useState('');
    const [targetUrl, setTargetUrl] = useState('');
    const [steps, setSteps] = useState<TestStep[]>([]);
    const [newStep, setNewStep] = useState<TestStep>({ action: TestAction.CLICK, description: '' });
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddStep = () => {
        if (!newStep.description.trim()) {
            setError('Please provide a description for the step.');
            return;
        }
        setSteps(prev => [...prev, newStep]);
        setNewStep({ action: TestAction.CLICK, description: '' });
        setError(null);
    };
    
    const handleGenerateSteps = async () => {
        if (!aiPrompt.trim() || !targetUrl.trim()) {
            setError('Please provide a starting URL and an AI instruction first.');
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            const generatedSteps = await generateTestSteps(aiPrompt, targetUrl);
            setSteps(prev => [...prev, ...generatedSteps]);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to generate steps. ${errorMessage}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = () => {
        if (!title.trim() || !targetUrl.trim()) {
            setError('Please provide both a test name and a URL.');
            return;
        }
        if (steps.length === 0) {
            setError('Please add at least one test step before saving.');
            return;
        }

        let processedUrl = targetUrl.trim();
        if (!/^https?:\/\//i.test(processedUrl)) {
            processedUrl = `https://${processedUrl}`;
        }

        try {
            new URL(processedUrl); // Validate URL format
            onSaveAndRun({ title, targetUrl: processedUrl, steps });
        } catch (e) {
            setError('The URL provided is not in a valid format.');
        }
    };
    
    return (
        <div className="w-full bg-light-bg border border-light-border rounded-lg p-6 sm:p-8 animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-text-primary">Create New Test Suite</h2>
                <button onClick={onCancel} className="text-sm text-text-secondary hover:text-text-primary transition-colors">Cancel</button>
            </div>
            
            {/* Test Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="test-name" className="block text-sm font-medium text-text-primary mb-2">Test Case Name</label>
                    <input
                        id="test-name"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Successful User Login"
                        className="w-full px-4 py-2.5 bg-dark-bg border border-light-border rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="test-url" className="block text-sm font-medium text-text-primary mb-2">Starting URL</label>
                    <input
                        id="test-url"
                        type="text"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        placeholder="example.com/login"
                        className="w-full px-4 py-2.5 bg-dark-bg border border-light-border rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                </div>
            </div>

            {/* AI Step Generation */}
            <div className="bg-dark-bg border border-light-border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-text-primary">AI-Assist: Generate Steps</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-grow w-full">
                         <label htmlFor="ai-prompt" className="block text-sm font-medium text-text-primary mb-2">Instruction</label>
                         <input
                            id="ai-prompt"
                            type="text"
                            value={aiPrompt}
                            onChange={e => setAiPrompt(e.target.value)}
                            placeholder="e.g., Test the user login flow with a valid email and password"
                            className="w-full px-4 py-2.5 bg-light-bg border border-light-border rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                            disabled={isGenerating}
                        />
                    </div>
                    <button onClick={handleGenerateSteps} disabled={isGenerating} className="w-full sm:w-auto px-6 py-2.5 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-dark-bg transition-colors flex-shrink-0 flex items-center justify-center gap-2 disabled:opacity-50">
                        {isGenerating ? 'Generating...' : <><AiIcon/> Generate Steps</>}
                    </button>
                </div>
            </div>

            {/* Step List */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg text-text-primary">Test Steps</h3>
                {steps.length === 0 ? (
                    <p className="text-text-secondary text-center py-6 border-2 border-dashed border-light-border rounded-lg">Add your first step manually or use the AI-Assist above.</p>
                ) : (
                    <ul className="space-y-3">
                        {steps.map((step, index) => (
                            <li key={index} className="flex items-center gap-4 bg-dark-bg p-3 rounded-lg border border-light-border">
                                <ActionIcon action={step.action} />
                                <span className="font-mono text-brand-primary/80 text-sm w-28">{step.action}</span>
                                <span className="text-text-primary flex-grow">{step.description}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Add Step Form */}
            <div className="bg-dark-bg border border-light-border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-text-primary">Add a step manually</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="w-full sm:w-1/3">
                        <label htmlFor="step-action" className="block text-sm font-medium text-text-primary mb-2">Action</label>
                        <select
                            id="step-action"
                            value={newStep.action}
                            onChange={e => setNewStep(s => ({...s, action: e.target.value as TestAction}))}
                            className="w-full px-4 py-2.5 bg-light-bg border border-light-border rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                        >
                            {Object.values(TestAction).map(action => <option key={action} value={action}>{action}</option>)}
                        </select>
                    </div>
                    <div className="flex-grow w-full">
                         <label htmlFor="step-description" className="block text-sm font-medium text-text-primary mb-2">Description / Target</label>
                         <input
                            id="step-description"
                            type="text"
                            value={newStep.description}
                            onChange={e => setNewStep(s => ({...s, description: e.target.value}))}
                            placeholder="e.g., Click the 'Login' button"
                            className="w-full px-4 py-2.5 bg-light-bg border border-light-border rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                        />
                    </div>
                    <button onClick={handleAddStep} className="w-full sm:w-auto px-6 py-2.5 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-dark-bg transition-colors flex-shrink-0">Add Step</button>
                </div>
            </div>
            
            {error && <div className="w-full bg-red-900/50 border border-status-fail text-status-fail p-3 rounded-lg text-center">{error}</div>}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-light-border">
                <button onClick={onCancel} className="px-8 py-3 text-text-secondary hover:text-text-primary transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={steps.length === 0} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-dark-bg font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300">
                   Save & Run Test
                </button>
            </div>
        </div>
    );
};
