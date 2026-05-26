import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TryOnCanvas from '../components/TryOnCanvas';
import { ArrowLeft, Sparkles, Check, CheckCircle2, ChevronRight, Upload } from 'lucide-react';

const TryOn = () => {
  const navigate = useNavigate();
  const { 
    selectedProducts, 
    userImage, 
    activeTryOnProduct, 
    setActiveTryOnProduct,
    incrementTryOnStat
  } = useApp();

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Enforce pre-requisites
  useEffect(() => {
    if (selectedProducts.length === 0) {
      navigate('/select');
    } else if (!userImage) {
      navigate('/upload');
    }
  }, [selectedProducts, userImage, navigate]);

  // Loading animation simulation for AI Scan
  useEffect(() => {
    if (selectedProducts.length > 0 && userImage) {
      const interval = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + 5;
        });
      }, 70);

      return () => clearInterval(interval);
    }
  }, [selectedProducts, userImage]);

  const handleDownloadSuccess = () => {
    // Record analytics
    if (activeTryOnProduct) {
      incrementTryOnStat(activeTryOnProduct.id);
    }

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4">
        <div className="max-w-md w-full glass p-8 rounded-3xl border border-slate-900 text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/10 border-t-purple-500 border-l-purple-500 animate-spin"></div>
            <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Calibrating Fit</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Aligning fabric textures and executing client-side background removal algorithms...
            </p>
          </div>

          {/* Progress bar container */}
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-100 ease-out"
                style={{ width: `${loadProgress}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold text-purple-400">{loadProgress}% Complete</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative flex flex-col gap-6">
      
      {/* Download Completion Banner Toast */}
      {downloadSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 py-3 px-5 rounded-2xl glass-premium border border-green-500/30 shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="h-5 w-5 text-green-400 animate-bounce" />
          <div className="text-left">
            <p className="text-xs font-bold text-white leading-none">Outfit Saved Successfully</p>
            <p className="text-[10px] text-slate-400 mt-0.5">High-res fitting composition exported to downloads.</p>
          </div>
        </div>
      )}

      {/* Breadcrumb Workspace Navigation bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-5 gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigate('/select')} className="hover:text-white transition-colors">Catalog Selection</button>
          <ChevronRight className="h-3.5 w-3.5" />
          <button onClick={() => navigate('/upload')} className="hover:text-white transition-colors">Photo Upload</button>
          <ChevronRight className="h-3.5 w-3.5 text-purple-500" />
          <span className="text-purple-400">Interactive Try-On Room</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/select')}
            className="py-2 px-4 rounded-xl border border-slate-900 bg-slate-950 hover:bg-slate-900 text-xs font-bold text-slate-300 hover:text-white active:scale-95 transition-all"
          >
            Change Clothes Selection
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="py-2 px-4 rounded-xl border border-slate-900 bg-slate-950 hover:bg-slate-900 text-xs font-bold text-slate-300 hover:text-white active:scale-95 transition-all flex items-center gap-1"
          >
            <Upload className="h-3.5 w-3.5" /> Change Photo
          </button>
        </div>
      </div>

      {/* Main Interactive Studio Canvas */}
      {activeTryOnProduct && (
        <TryOnCanvas 
          userImage={userImage} 
          product={activeTryOnProduct} 
          onDownloadComplete={handleDownloadSuccess}
        />
      )}

      {/* Bottom Tray for Swapping Outfits (Screen 5 Requirement) */}
      <div className="glass rounded-3xl p-5 border border-slate-900 text-left space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Outfit Tray (Select style to swap)</h4>
        
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-thin">
          {selectedProducts.map((product) => {
            const isActive = activeTryOnProduct?.id === product.id;
            return (
              <button
                key={product.id}
                onClick={() => setActiveTryOnProduct(product)}
                className={`flex items-center gap-3 p-2 pr-4 rounded-2xl border transition-all shrink-0 ${
                  isActive
                    ? 'bg-purple-500/10 border-purple-500 shadow-md text-white'
                    : 'bg-slate-900/60 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                }`}
              >
                <div className="h-10 w-10 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold">{product.name}</p>
                  <p className="text-[9px] text-slate-500 font-medium capitalize">{product.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default TryOn;
