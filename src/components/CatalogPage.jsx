import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, Star, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { generateOutfitRecommendations, mockOutfitItems } from '../utils/outfitGenerator';
import { useCart } from '../contexts/CartContext';

const CatalogPage = ({ preferences, prompt, analysisResult, onBack }) => {
  const [viewMode, setViewMode] = useState('outfits'); // 'outfits' or 'items'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const { addToCart } = useCart();

  const outfits = useMemo(() => {
    return generateOutfitRecommendations(preferences, prompt);
  }, [preferences, prompt]);

  const filteredItems = useMemo(() => {
    let items = mockOutfitItems;
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    if (priceRange !== 'all') {
      const ranges = {
        'under-25': [0, 25],
        '25-50': [25, 50],
        '50-100': [50, 100],
        'above-100': [100, Infinity]
      };
      const [min, max] = ranges[priceRange];
      items = items.filter(item => item.price >= min && item.price <= max);
    }

    // Sort items
    switch (sortBy) {
      case 'price-low':
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        items = [...items].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // relevance
        break;
    }

    return items;
  }, [selectedCategory, sortBy, priceRange]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (item) => {
    addToCart(item, item.sizes[0], item.colors[0]);
  };

  const handleAddOutfitToCart = (outfit) => {
    outfit.items.forEach(item => {
      addToCart(item, item.sizes[0], item.colors[0]);
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </motion.button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {analysisResult ? 'AI-Curated Collection' : 'Your Style Collection'}
                </h1>
                <p className="text-sm text-gray-600">
                  {preferences.bodyShape && `${preferences.bodyShape} • `}
                  {preferences.colorTone} tones • {preferences.budget.replace('-', ' to $').replace('under-', 'under $').replace('above-', 'above $')}
                </p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('outfits')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'outfits' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Complete Outfits
              </button>
              <button
                onClick={() => setViewMode('items')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'items' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Individual Items
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              {viewMode === 'items' && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Categories</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="dresses">Dresses</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="accessories">Accessories</option>
                  <option value="shoes">Shoes</option>
                </select>
              )}

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Prices</option>
                <option value="under-25">Under $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="above-100">$100+</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'outfits' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outfits.map((outfit, index) => (
              <motion.div
                key={outfit.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={outfit.imageUrl}
                    alt={outfit.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(outfit.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors ${
                        favorites.has(outfit.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {outfit.matchScore}% Match
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{outfit.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {outfit.items.length} pieces • Complete look
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {outfit.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-medium">${item.price}</span>
                      </div>
                    ))}
                    {outfit.items.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{outfit.items.length - 3} more items
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-gray-900">${outfit.totalPrice}</div>
                      <div className="text-sm text-gray-500">Complete outfit</div>
                    </div>
                    <button 
                      onClick={() => handleAddOutfitToCart(outfit)}
                      className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center space-x-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add All</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors ${
                        favorites.has(item.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 capitalize">{item.category}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">4.5</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {item.colors.length} colors
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center space-x-1"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {((viewMode === 'outfits' && outfits.length === 0) || (viewMode === 'items' && filteredItems.length === 0)) && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more options.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CatalogPage;