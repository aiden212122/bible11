import React from 'react';

interface EditInstructionsProps {
  value: string;
  onChange: (value: string) => void;
}

const SUGGESTIONS = [
  "Add a retro filter",
  "Remove the person in the background",
  "Make it look like a oil painting",
  "Cinematic lighting",
  "Black and white photography",
  "Cyberpunk style",
  "Sketch style"
];

const EditInstructions: React.FC<EditInstructionsProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <h2 className="font-serif text-2xl text-bible-dark mb-4 border-l-4 border-bible-gold pl-3">
        3. Custom Edits & Style (Optional)
      </h2>
      <div className="bg-white/80 rounded-xl p-6 border border-gray-200 shadow-sm">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Describe any specific changes, styles, or filters:
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 'Add a retro filter', 'Remove the person in the background', 'Make it look like a renaissance painting'..."
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-bible-gold/50 transition-all min-h-[100px] resize-y font-sans mb-4"
        />
        
        <div className="mb-2">
          <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wider">Quick Prompts:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onChange(s)}
                className="text-xs px-3 py-1.5 bg-white hover:bg-bible-gold hover:text-white text-gray-600 rounded-full transition-all border border-gray-200 shadow-sm"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-2 text-right">
          Powered by Gemini 2.5 Flash Image
        </p>
      </div>
    </div>
  );
};

export default EditInstructions;