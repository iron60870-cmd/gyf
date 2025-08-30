import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, User, Palette, Calendar, DollarSign } from 'lucide-react';

const ManualQuestionnaire = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    bodyShape: '',
    bodyType: '',
    skinTone: '',
    occasion: '',
    style: '',
    budget: '',
    prompt: ''
  });

  const totalSteps = 5;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const preferences = {
      bodyShape: formData.bodyShape,
      bodyType: formData.bodyType,
      colorTone: formData.skinTone,
      occasion: formData.occasion,
      style: formData.style,
      budget: formData.budget
    };
    
    onComplete(null, preferences, formData.prompt);
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.bodyShape && formData.bodyType;
      case 2: return formData.skinTone;
      case 3: return formData.occasion;
      case 4: return formData.style;
      case 5: return formData.budget && formData.prompt.trim();
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <User className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Body Shape & Type</h3>
              <p className="text-gray-600">Help us understand your body to recommend the most flattering styles</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Body Shape</label>
                <div className="grid grid-cols-2 gap-3">
                  {['hourglass', 'pear', 'apple', 'rectangle', 'inverted-triangle'].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => handleInputChange('bodyShape', shape)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.bodyShape === shape
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="capitalize font-medium">{shape.replace('-', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Body Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['petite', 'regular', 'tall', 'plus-size'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('bodyType', type)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.bodyType === type
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="capitalize font-medium">{type.replace('-', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Palette className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Skin Tone</h3>
              <p className="text-gray-600">This helps us recommend colors that complement you best</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'warm', label: 'Warm', description: 'Golden, yellow, or peachy undertones' },
                  { value: 'cool', label: 'Cool', description: 'Pink, red, or blue undertones' },
                  { value: 'neutral', label: 'Neutral', description: 'Mix of warm and cool undertones' }
                ].map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => handleInputChange('skinTone', tone.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.skinTone === tone.value
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{tone.label}</div>
                    <div className="text-sm text-gray-600">{tone.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Calendar className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Occasion</h3>
              <p className="text-gray-600">What type of outfits are you looking for?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'work', label: 'Work & Professional', emoji: '💼' },
                { value: 'casual', label: 'Casual & Everyday', emoji: '👕' },
                { value: 'party', label: 'Party & Events', emoji: '🎉' },
                { value: 'date', label: 'Date Night', emoji: '💕' },
                { value: 'vacation', label: 'Vacation & Travel', emoji: '✈️' },
                { value: 'formal', label: 'Formal Events', emoji: '👗' }
              ].map((occasion) => (
                <button
                  key={occasion.value}
                  onClick={() => handleInputChange('occasion', occasion.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.occasion === occasion.value
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{occasion.emoji}</div>
                  <div className="font-medium text-sm">{occasion.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Sparkles className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Style Preference</h3>
              <p className="text-gray-600">What style resonates with you most?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'classic', label: 'Classic & Timeless', description: 'Clean lines, neutral colors' },
                { value: 'casual', label: 'Casual & Comfortable', description: 'Relaxed, everyday wear' },
                { value: 'formal', label: 'Formal & Elegant', description: 'Sophisticated, polished looks' },
                { value: 'boho', label: 'Boho & Free-spirited', description: 'Flowing, artistic pieces' },
                { value: 'edgy', label: 'Edgy & Modern', description: 'Bold, contemporary styles' },
                { value: 'romantic', label: 'Romantic & Feminine', description: 'Soft, delicate details' }
              ].map((style) => (
                <button
                  key={style.value}
                  onClick={() => handleInputChange('style', style.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.style === style.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900 mb-1">{style.label}</div>
                  <div className="text-xs text-gray-600">{style.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <DollarSign className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Budget & Preferences</h3>
              <p className="text-gray-600">Final step to get your perfect recommendations</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'under-50', label: 'Under $50' },
                    { value: '50-100', label: '$50 - $100' },
                    { value: '100-200', label: '$100 - $200' },
                    { value: 'above-200', label: '$200+' }
                  ].map((budget) => (
                    <button
                      key={budget.value}
                      onClick={() => handleInputChange('budget', budget.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.budget === budget.value
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium">{budget.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Preferences (Optional)
                </label>
                <textarea
                  value={formData.prompt}
                  onChange={(e) => handleInputChange('prompt', e.target.value)}
                  placeholder="Tell us more about your style preferences, favorite colors, or specific items you're looking for..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="absolute inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Style Questionnaire</h2>
                    <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="flex-1 max-w-xs mx-8">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                {currentStep === totalSteps ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className="flex items-center space-x-2 bg-red-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Get My Outfits</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManualQuestionnaire;