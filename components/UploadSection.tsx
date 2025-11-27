import React, { useRef } from 'react';
import { fileToDataUrl } from '../utils';

interface UploadSectionProps {
  selectedFile: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File, previewUrl: string) => void;
  onClear: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ selectedFile, previewUrl, onFileSelect, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await fileToDataUrl(file);
        onFileSelect(file, url);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <h2 className="font-serif text-2xl text-bible-dark mb-4 border-l-4 border-bible-gold pl-3">
        1. Upload Your Photo
      </h2>
      
      {!previewUrl ? (
        <div 
          onClick={triggerFileInput}
          className="border-2 border-dashed border-bible-gold/50 bg-white rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-bible-cream transition-colors duration-300 min-h-[300px]"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-bible-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-sans text-gray-500 font-medium">Click to upload a selfie</p>
          <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG</p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden shadow-xl border-2 border-bible-gold/30 group">
          <img 
            src={previewUrl} 
            alt="User Preview" 
            className="w-full h-auto max-h-[500px] object-contain bg-black/5" 
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
             <button 
              onClick={triggerFileInput}
              className="px-4 py-2 bg-white text-bible-dark rounded-full font-bold hover:bg-gray-100 transform hover:scale-105 transition-all"
            >
              Change
            </button>
             <button 
              onClick={onClear}
              className="px-4 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transform hover:scale-105 transition-all"
            >
              Remove
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}
    </div>
  );
};

export default UploadSection;