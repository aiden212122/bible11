import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import CharacterSelector from './components/CharacterSelector';
import ResultDisplay from './components/ResultDisplay';
import { generateCompositeImage } from './services/geminiService';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Character state
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [customCharacter, setCustomCharacter] = useState<string>('');
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFileSelect = (file: File, url: string) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    // Reset result if user changes file
    setGeneratedImage(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setGeneratedImage(null);
  };

  const handleGenerate = async () => {
    if (!selectedFile || !selectedCharacter) {
      return;
    }

    setIsGenerating(true);
    setError(null);
    setShowResult(true);

    try {
      const result = await generateCompositeImage(selectedFile, selectedCharacter);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong during the divine process.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    // If successful, we might want to keep generatedImage in state but hide modal, 
    // or clear it. Let's keep it but hide modal allows user to tweak and regen.
  };

  const isReadyToGenerate = !!selectedFile && !!selectedCharacter;

  return (
    <div className="min-h-screen bg-bible-cream text-bible-dark pb-20 font-sans">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-10">
        
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-serif text-gray-600 italic">
            "Faith is the assurance of things hoped for, the conviction of things not seen."
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <UploadSection 
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClear={handleClearFile}
          />

          <CharacterSelector 
            selectedCharacter={selectedCharacter}
            customCharacter={customCharacter}
            onSelectCharacter={setSelectedCharacter}
            onCustomCharacterChange={setCustomCharacter}
          />

          {/* Action Area */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-40 md:relative md:bg-transparent md:border-none md:shadow-none md:p-0 md:mt-8 md:mb-20">
            <div className="max-w-5xl mx-auto flex justify-center">
               <button
                onClick={handleGenerate}
                disabled={!isReadyToGenerate || isGenerating}
                className={`
                  w-full md:w-auto px-10 py-4 rounded-full font-serif font-bold text-lg md:text-xl shadow-xl transition-all
                  ${isReadyToGenerate 
                    ? 'bg-bible-gold text-white hover:bg-yellow-600 hover:scale-105 cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isGenerating ? 'Generating...' : 'Generate Photo'}
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Result Modal */}
      {showResult && (
        <ResultDisplay 
          isLoading={isGenerating}
          generatedImage={generatedImage}
          error={error}
          onReset={handleCloseResult}
        />
      )}
      
      {/* Disclaimer */}
      <footer className="w-full text-center py-6 text-gray-400 text-xs px-4">
        <p>AI Generated images may contain artifacts. Built with Gemini 2.5 Flash Image (Nano Banana).</p>
      </footer>
    </div>
  );
};

export default App;