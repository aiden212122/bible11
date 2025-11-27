import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error, onReset }) => {
  if (!isLoading && !generatedImage && !error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-fadeIn">
        
        {/* Close Button */}
        {!isLoading && (
          <button 
            onClick={onReset}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          
          {isLoading && (
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-bible-gold border-t-transparent rounded-full animate-spin mb-6"></div>
              <h3 className="font-serif text-2xl text-bible-dark font-bold mb-2">Creating Masterpiece...</h3>
              <p className="text-gray-500 animate-pulse">Consulting the archives of history...</p>
            </div>
          )}

          {error && (
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-red-600 font-bold mb-2">Miracle Failed</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={onReset}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-bold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {generatedImage && !isLoading && (
            <div className="w-full flex flex-col items-center">
              <h3 className="font-serif text-2xl text-bible-gold font-bold mb-6">Your Divine Encounter</h3>
              
              <div className="relative w-full rounded-lg overflow-hidden shadow-xl border-4 border-bible-gold/20 mb-8 bg-black/5">
                <img 
                  src={generatedImage} 
                  alt="Generated Composite" 
                  className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                />
              </div>

              <div className="flex gap-4">
                <a 
                  href={generatedImage} 
                  download="biblical-selfie.png"
                  className="flex items-center gap-2 px-8 py-3 bg-bible-gold text-white rounded-full font-bold hover:bg-yellow-600 transform hover:scale-105 transition-all shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Photo
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;