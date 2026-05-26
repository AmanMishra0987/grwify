import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../services/mockData';
import { Check, ArrowRight, Sparkles, Filter } from 'lucide-react';

const ProductSelect = () => {
  const navigate = useNavigate();
  const { selectedProducts, toggleProductSelection } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Outerwear', 'Tops', 'Dresses', 'Hats', 'Accessories'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleProceed = () => {
    if (selectedProducts.length > 0) {
      navigate('/upload');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative">
      {/* Title */}
      <div className="text-left space-y-3 mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
          Select Your Styles
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          Choose the apparel and accessories you want to try on. You can select multiple items to layer or swap during fitting.
        </p>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-none">
        <span className="text-slate-500 text-sm font-medium mr-2 flex items-center gap-1 shrink-0">
          <Filter className="h-4 w-4" /> Filter:
        </span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 shrink-0 ${
              activeCategory === category
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/10'
                : 'bg-slate-900/60 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
        {filteredProducts.map((product) => {
          const isSelected = selectedProducts.some(p => p.id === product.id);
          return (
            <div
              key={product.id}
              onClick={() => toggleProductSelection(product)}
              className={`glass rounded-3xl overflow-hidden border cursor-pointer group transition-all duration-500 relative flex flex-col justify-between ${
                isSelected
                  ? 'border-purple-500 shadow-xl shadow-purple-500/5 ring-1 ring-purple-500/30 -translate-y-1'
                  : 'border-slate-900 hover:border-slate-800 hover:-translate-y-1'
              }`}
            >
              {/* Checkmark Badge */}
              <div
                className={`absolute top-4 right-4 z-20 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-purple-500 scale-100 rotate-0'
                    : 'bg-slate-900/80 scale-75 rotate-45 opacity-0 group-hover:opacity-100'
                }`}
              >
                <Check className={`h-3.5 w-3.5 text-white ${isSelected ? 'stroke-[3px]' : ''}`} />
              </div>

              {/* Product Image Panel */}
              <div className="relative aspect-square bg-slate-900/40 p-6 overflow-hidden flex items-center justify-center border-b border-slate-900/35">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mix-blend-normal group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-sm"
                />
                <span className="absolute bottom-3 left-4 text-[10px] uppercase font-bold tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/10">
                  {product.category}
                </span>
              </div>

              {/* Description Body */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5 text-left">
                  <h3 className="font-bold text-slate-100 group-hover:text-purple-400 transition-colors duration-300 truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-white">{product.price}</span>
                  <span className="text-[10px] text-slate-500 font-medium">Popularity: {product.popularity}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Sticky Actions Bar (Screen 3 requirement) */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-40 max-w-3xl mx-auto glass rounded-2xl border border-slate-800 p-4 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="text-left">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Garments Selected</p>
            <p className="text-sm font-black text-white">
              {selectedProducts.length} {selectedProducts.length === 1 ? 'Item' : 'Items'} Ready
            </p>
          </div>

          <button
            onClick={handleProceed}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-sm text-white shadow-lg shadow-purple-600/10 hover:shadow-purple-600/20 active:scale-95 transition-all duration-300 flex items-center gap-1.5 group"
          >
            Proceed to Upload
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSelect;
