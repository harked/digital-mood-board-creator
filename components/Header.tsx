import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-surface/50 backdrop-blur-sm border-b border-border-color sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <LogoIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold text-text-main">Mood Board Creator</span>
        </div>
      </div>
    </header>
  );
};

export default Header;