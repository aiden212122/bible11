import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-bible-dark text-bible-cream py-6 px-4 shadow-lg border-b-4 border-bible-gold">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-bible-gold mb-2">
          Biblical Snapshot
        </h1>
        <p className="font-sans text-sm md:text-lg text-gray-300 max-w-2xl">
          Upload your selfie and let AI transport you to a moment with history's most revered figures.
        </p>
      </div>
    </header>
  );
};

export default Header;