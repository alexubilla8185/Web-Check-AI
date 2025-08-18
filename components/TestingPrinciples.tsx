import React from 'react';

// Define icons for each principle
const LocatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path><path d="M12 12l-2-2.5 2-2.5 2 2.5-2 2.5z"></path><path d="M12 12l2.5 2 2.5-2-2.5-2z"></path><path d="M12 12l-2.5 2-2.5-2 2.5-2z"></path><path d="M12 12l2-2.5-2-2.5-2 2.5 2 2.5z"></path></svg>;
const WaitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const ReportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8a13 13 0 0 1 13 13M2 4a17 17 0 0 1 17 17"></path></svg>;
const ApproachesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11-4 4 4 4"/><path d="m17 11 4 4-4 4"/><path d="m14 4-4 16"/><path d="M5 8h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5z"/></svg>;
const DataDrivenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const ReusableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 2v4"/><path d="M12 12v4"/><path d="M12 22v-4"/><path d="M18 6l-2.5 2.5"/><path d="M6 18l2.5-2.5"/><path d="m6 6 2.5 2.5"/><path d="m18 18-2.5-2.5"/></svg>;
const EaseOfUseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 2.4 2.88 5.77 5.77 2.88-5.77 2.88-2.88 5.77-2.88-5.77-5.77-2.88 5.77-2.88z"/></svg>;


const principles = [
  {
    icon: <LocatorIcon />,
    title: "Flexible and Resilient Element Locators",
    description: "Smart locators identify elements by a combination of attributes, text, and position. AI-based \"self-healing\" can adapt to minor UI changes, preventing brittle tests.",
  },
  {
    icon: <WaitIcon />,
    title: "Smart Waiting and Synchronization",
    description: "Intelligently wait for elements to appear or for async operations to complete. This conditional waiting eliminates flaky tests caused by fixed delays.",
  },
  {
    icon: <ReportIcon />,
    title: "Reporting and Analytics",
    description: "Comprehensive reports with logs, screenshots, and videos at the point of failure are crucial for quick diagnosis. Dashboards help visualize trends over time.",
  },
  {
    icon: <ApproachesIcon />,
    title: "Support for Different Testing Approaches",
    description: "A great tool supports both Low-Code (record-and-playback) for speed and Scripted Automation (e.g., Python, JS) for complex logic and full coverage.",
  },
  {
    icon: <DataDrivenIcon />,
    title: "Data-Driven Testing",
    description: "Separate test data from test logic. This allows you to run the same test case with numerous inputs from a data source, increasing coverage efficiently.",
  },
  {
    icon: <ReusableIcon />,
    title: "Reusable Components",
    description: "Define common sequences (like login) once and reuse them across multiple tests. This drastically reduces maintenance effort when the UI changes.",
  },
  {
    icon: <EaseOfUseIcon />,
    title: "Ease of Use and Maintainability",
    description: "A shallow learning curve, readable syntax, and robust debugging capabilities are key to building a test suite that is easy to write, run, and maintain.",
  },
];

const PrincipleCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-light-bg p-6 rounded-lg border border-light-border transform hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center gap-4 mb-3">
            <div className="text-brand-secondary">{icon}</div>
            <h3 className="text-lg font-bold text-text-primary">{title}</h3>
        </div>
        <p className="text-text-secondary text-sm">{description}</p>
    </div>
);


export const TestingPrinciples: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mt-16 animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Core Principles of Robust Test Automation</h2>
                <p className="mt-2 text-text-secondary max-w-3xl mx-auto">These are the hallmarks of a modern, effective automated testing strategy. Our AI considers these principles when generating test plans.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {principles.map((p, i) => (
                    <PrincipleCard key={i} icon={p.icon} title={p.title} description={p.description} />
                ))}
            </div>
        </div>
    );
};