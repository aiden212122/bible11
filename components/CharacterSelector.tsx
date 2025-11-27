import React, { useState } from 'react';
import { CHARACTERS, BibleCharacter } from '../types';

interface CharacterSelectorProps {
  selectedCharacter: string;
  customCharacter: string;
  onSelectCharacter: (name: string) => void;
  onCustomCharacterChange: (name: string) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  selectedCharacter,
  customCharacter,
  onSelectCharacter,
  onCustomCharacterChange,
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomCharacterChange(e.target.value);
    if (!isCustomMode) setIsCustomMode(true);
    // If we are typing, we are implicitly selecting the custom value
    onSelectCharacter(e.target.value);
  };

  const handlePredefinedSelect = (char: BibleCharacter) => {
    // If clicking the already selected character, deselect it
    if (selectedCharacter === char.name && !isCustomMode) {
      onSelectCharacter('');
    } else {
      setIsCustomMode(false);
      onCustomCharacterChange(''); // Clear custom input
      onSelectCharacter(char.name);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <h2 className="font-serif text-2xl text-bible-dark mb-6 border-l-4 border-bible-gold pl-3">
        2. Choose a Companion (Optional)
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {CHARACTERS.map((char) => {
          const isSelected = !isCustomMode && selectedCharacter === char.name;
          return (
            <button
              key={char.id}
              onClick={() => handlePredefinedSelect(char)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 text-left flex flex-col h-full
                ${isSelected 
                  ? 'border-bible-gold bg-white shadow-lg scale-105 ring-2 ring-bible-gold/20' 
                  : 'border-transparent bg-white/60 hover:bg-white hover:border-gray-200 hover:shadow-md'
                }
              `}
            >
              <span className="text-3xl mb-2">{char.icon}</span>
              <h3 className={`font-serif font-bold ${isSelected ? 'text-bible-dark' : 'text-gray-700'}`}>
                {char.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {char.description}
              </p>
              {isSelected && (
                <div className="absolute top-2 right-2 text-bible-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-white/60 rounded-xl p-6 border border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Or specify another person/figure:
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            value={customCharacter}
            onChange={handleCustomInput}
            placeholder="e.g. Samson, Solomon, John the Baptist..."
            className={`
              flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-bible-gold/50 transition-all
              ${isCustomMode && customCharacter ? 'border-bible-gold bg-white' : 'border-gray-200 bg-gray-50'}
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterSelector;