import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import CatalogPage from './components/CatalogPage';
import FloatingClothes from './components/FloatingClothes';
import CameraCapture from './components/CameraCapture';
import ManualQuestionnaire from './components/ManualQuestionnaire';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleStartAIStyling = () => {
    setIsCameraOpen(true);
  };

  const handleStartManualQuestionnaire = () => {
    setIsQuestionnaireOpen(true);
  };

  const handleAnalysisComplete = (analysis, preferences, prompt) => {
    setAnalysisResult(analysis);
    setUserPreferences(preferences);
    setUserPrompt(prompt);
    setIsCameraOpen(false);
    setIsQuestionnaireOpen(false);
    setCurrentView('catalog');
  };

  const handleBackHome = () => {
    setCurrentView('home');
    setAnalysisResult(null);
    setUserPreferences(null);
    setUserPrompt('');
  };

  const handleCategorySelect = (category) => {
    // Category selection is handled in the CategoryModal
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <FloatingClothes />
        
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Header 
            onLogoClick={handleBackHome} 
            onCategorySelect={handleCategorySelect}
          />
          
          {currentView === 'home' && (
            <Hero 
              onStartAIStyling={handleStartAIStyling}
              onStartManualQuestionnaire={handleStartManualQuestionnaire}
            />
          )}
          
          {currentView === 'catalog' && userPreferences && (
            <CatalogPage 
              preferences={userPreferences}
              prompt={userPrompt}
              analysisResult={analysisResult}
              onBack={handleBackHome}
            />
          )}

          <CameraCapture
            isOpen={isCameraOpen}
            onClose={() => setIsCameraOpen(false)}
            onAnalysisComplete={handleAnalysisComplete}
          />

          <ManualQuestionnaire
            isOpen={isQuestionnaireOpen}
            onClose={() => setIsQuestionnaireOpen(false)}
            onComplete={handleAnalysisComplete}
          />
        </motion.div>
      </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;   