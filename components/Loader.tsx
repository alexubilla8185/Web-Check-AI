
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="relative flex justify-center items-center">
            <div className="absolute w-24 h-24 rounded-full border-4 border-light-border"></div>
            <div className="absolute w-24 h-24 rounded-full border-t-4 border-brand-primary animate-spin"></div>
        </div>
        <p className="mt-8 text-lg text-text-secondary">AI is analyzing the website...</p>
    </div>
  );
};
