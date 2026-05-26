import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { sampleModels } from '../services/mockData';
import { Upload as UploadIcon, User, Sparkles, ArrowRight, ArrowLeft, Image as ImageIcon, X } from 'lucide-react';

const Upload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const { 
    selectedProducts,
    userImage, 
    setUserImage, 
    userImageType, 
    setUserImageType,
    selectedModelId,
    setSelectedModelId,
    setActiveTryOnProduct
  } = useApp();

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  // Enforce selecting products first before upload, redirect if empty
  React.useEffect(() => {
    if (selectedProducts.length === 0) {
      navigate('/select');
    }
  }, [selectedProducts, navigate]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    setError('');
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid JPG or PNG image.');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB. Please choose a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUserImage(e.target.result);
      setUserImageType('custom');
      setSelectedModelId(null);
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSelectModel = (model) => {
    setError('');
    setUserImage(model.image);
    setUserImageType('model');
    setSelectedModelId(model.id);
  };

  const handleClearImage = () => {
    setUserImage(null);
    setUserImageType(null);
    setSelectedModelId(null);
  };

  const handleProceed = () => {
    if (userImage) {
      // Set the first selected product as the active try-on item
      if (selectedProducts.length > 0) {
        setActiveTryOnProduct(selectedProducts[0]);
      }
      navigate('/tryon');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      {/* Back Arrow */}
      <button
        onClick={() => navigate('/select')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-6 group transition-colors"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Product Selection
      </button>

      <div className="text-left space-y-3 mb-8">
        <h2 className="text-3xl font-black text-white tracking-tight">Upload Your Fitting Photo</h2>
        <p className="text-sm text-slate-400">
          Upload a clear portrait/photo of yourself facing forward, or select one of our pre-shot demo models to style instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Drop Area & Models Selection */}
        <div className="space-y-6">
          {!userImage ? (
            /* Drag and Drop Zone */
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[260px] ${
                dragActive
                  ? 'border-purple-500 bg-purple-500/5'
                  : 'border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/35'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
              <span className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <UploadIcon className="h-6 w-6" />
              </span>
              <p className="text-sm font-semibold text-slate-200 mb-1">Drag and drop your photo here</p>
              <p className="text-xs text-slate-400 mb-4">or click to browse local files</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">PNG, JPG or JPEG (Max 5MB)</p>
            </div>
          ) : (
            /* Upload Success & Details */
            <div className="glass rounded-3xl p-5 border border-slate-900 text-left space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center text-green-400">
                    <ImageIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Image Loaded</h4>
                    <p className="text-xs text-slate-400">
                      {userImageType === 'model' ? 'Sample Model Preset' : 'Custom Image File'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClearImage}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Clear image"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          )}

          {/* Model Gallery presets */}
          <div className="space-y-3.5 text-left">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-bold text-slate-200">Or use a sample model:</h3>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {sampleModels.map((model) => {
                const isSelected = selectedModelId === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => handleSelectModel(model)}
                    className={`relative aspect-[3/4] rounded-2xl overflow-hidden border transition-all duration-300 group ${
                      isSelected
                        ? 'border-purple-500 ring-1 ring-purple-500/30 scale-95 shadow-lg shadow-purple-500/10'
                        : 'border-slate-900 hover:border-slate-800'
                    }`}
                  >
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-2.5">
                      <p className="text-[10px] font-bold text-white truncate leading-none mb-0.5">{model.name.split(' ')[0]}</p>
                      <p className="text-[8px] text-slate-400 font-semibold">{model.gender}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Preview Pane */}
        <div className="glass rounded-3xl border border-slate-900 overflow-hidden relative flex flex-col justify-between aspect-[3/4] max-w-[340px] mx-auto w-full">
          {userImage ? (
            <div className="relative w-full h-full">
              <img
                src={userImage}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              {/* Scanline Fitting Laser Overlay (premium touch) */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-xs animate-scan"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass border border-slate-800/70 text-left flex items-center justify-between">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  Scanner Ready
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Ready for overlay</span>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-slate-500 space-y-3">
              <span className="h-12 w-12 rounded-full border border-slate-800/80 flex items-center justify-center bg-slate-900/10">
                <ImageIcon className="h-5 w-5 text-slate-600" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">No Image Selected</p>
              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                Add your own photo or tap a model to activate the workspace preview.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Proceed Actions Drawer */}
      {userImage && (
        <div className="fixed bottom-6 left-4 right-4 z-40 max-w-3xl mx-auto glass rounded-2xl border border-slate-800 p-4 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="text-left">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Workspace Ready</p>
            <p className="text-sm font-black text-white">Fitting Room Unlocked</p>
          </div>

          <button
            onClick={handleProceed}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-sm text-white shadow-lg shadow-purple-600/10 hover:shadow-purple-600/20 active:scale-95 transition-all duration-300 flex items-center gap-1.5 group"
          >
            Enter Fitting Room
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-semibold max-w-md mx-auto">
          {error}
        </div>
      )}
    </div>
  );
};

export default Upload;
