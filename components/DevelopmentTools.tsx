
import React from 'react';
import { toolCategories } from '../services/toolsData';
import type { Tool } from '../services/toolsData';

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => (
    <a 
        href={tool.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block bg-light-bg border border-light-border rounded-lg p-6 h-full transition-colors duration-300 hover:border-brand-primary"
    >
        <h3 className="text-lg font-bold text-text-primary mb-2">{tool.name}</h3>
        <p className="text-text-secondary text-sm">{tool.description}</p>
    </a>
);


export const DevelopmentTools: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-4xl flex flex-col items-center text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
                    Development Utilities
                </h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl">
                    A collection of simple, free, and useful online tools for everyday development tasks.
                </p>
            </div>
            <div className="w-full max-w-6xl space-y-12">
                {toolCategories.map((categoryGroup) => (
                    <section key={categoryGroup.category}>
                        <h2 className="text-2xl font-bold text-text-primary mb-6 border-b border-light-border pb-3">{categoryGroup.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryGroup.tools.map(tool => (
                                <ToolCard key={tool.name} tool={tool} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
