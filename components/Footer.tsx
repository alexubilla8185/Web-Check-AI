import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-16 py-6 border-t border-light-border">
        <div className="container mx-auto px-4 text-center text-text-secondary">
            <p>&copy; {new Date().getFullYear()} Web Check AI. All Rights Reserved.</p>
            <p className="text-sm mt-1">Powered by React, Tailwind CSS, and Gemini API.</p>
        </div>
    </footer>
  );
};