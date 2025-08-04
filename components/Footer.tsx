import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-12 border-t border-border-color">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-text-secondary text-sm">
          Powered by Gemini API. Created for demonstration purposes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;