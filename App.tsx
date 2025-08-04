import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptForm from './components/PromptForm';
import MoodBoardGrid from './components/MoodBoardGrid';
import Modal from './components/Modal';
import { generateMoodBoardImages } from './services/geminiService';
import { AppState } from './types';
import { WelcomeIcon } from './components/Icons';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    prompt: '',
    images: [],
    isLoading: false,
    error: null,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGenerate = useCallback(async (promptText: string) => {
    if (!promptText.trim()) return;

    setState({
      prompt: promptText,
      images: [],
      isLoading: true,
      error: null,
    });

    try {
      const generatedImages = await generateMoodBoardImages(promptText);
      setState(prevState => ({
        ...prevState,
        images: generatedImages,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Error generating images:', errorMessage);
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: `Failed to generate mood board. ${errorMessage}`,
      }));
    }
  }, []);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-text-main">
      <Header />
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Digital Mood Board Creator</h1>
          <p className="mt-3 text-lg md:text-xl text-text-secondary max-w-3xl">
            Describe a theme, style, or feeling, and let AI craft a visual mood board for you.
          </p>
        </div>
        
        <div className="mb-8">
          <PromptForm onGenerate={handleGenerate} isLoading={state.isLoading} />
        </div>
        
        {state.error && (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
            <p>{state.error}</p>
          </div>
        )}
        
        {state.images.length === 0 && !state.isLoading && !state.error ? (
          <div className="text-center text-text-secondary py-16">
            <WelcomeIcon className="mx-auto h-24 w-24 text-gray-600" />
            <h3 className="mt-4 text-xl font-semibold">Your Mood Board Awaits</h3>
            <p className="mt-2 text-base">Enter a prompt above to get started.</p>
          </div>
        ) : (
          <MoodBoardGrid 
            images={state.images}
            isLoading={state.isLoading}
            onImageClick={openModal}
          />
        )}
      </main>
      
      {selectedImage && (
        <Modal imageUrl={selectedImage} onClose={closeModal} />
      )}
      
      <Footer />
    </div>
  );
};

export default App;