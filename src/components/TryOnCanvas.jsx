import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  RotateCcw,
  ZoomIn,
  RefreshCw,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const TryOnCanvas = ({ userImage, product, onDownloadComplete }) => {
  const containerRef = useRef(null);
  const productRef = useRef(null);

  // Transform States
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [blendMode, setBlendMode] = useState("multiply"); // 'normal' or 'multiply' (filters white background)

  // Dragging State variables
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Apply product defaults when product changes
  useEffect(() => {
    if (product) {
      setScale(product.defaultScale || 0.6);
      // Center the garment horizontally, slightly offset vertically based on product config
      const verticalOffset = product.defaultOffset?.y || 50;
      setPosition({ x: product.defaultOffset?.x || 0, y: verticalOffset });
      setRotation(0);
      setOpacity(1);

      // Auto-set blend mode based on category
      // Accessories and hats benefit from normal blend if transparent,
      // but white background items like flat-lays look best with multiply.
      // Since our Unsplash products are on white/light grey, 'multiply' blends them perfectly onto clothes!
      if (product.category === "Accessories" || product.category === "Hats") {
        setBlendMode("multiply");
      } else {
        setBlendMode("multiply"); // multiply is safest to blend white folds
      }
    }
  }, [product]);

  // Reset transforms
  const handleReset = () => {
    if (product) {
      setScale(product.defaultScale || 0.6);
      setPosition({
        x: product.defaultOffset?.x || 0,
        y: product.defaultOffset?.y || 50,
      });
      setRotation(0);
      setOpacity(1);
      setBlendMode("multiply");
    }
  };

  // Mouse Down / Touch Start Handler
  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  // Mouse Move / Touch Move Handler
  const handleMove = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    setPosition({
      x: clientX - dragStart.current.x,
      y: clientY - dragStart.current.y,
    });
  };

  // Mouse Up / Touch End Handler
  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (isDragging) {
        handleMove(e);
      }
    };

    const handleGlobalEnd = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("mouseup", handleGlobalEnd);
    window.addEventListener("touchmove", handleGlobalMove, { passive: false });
    window.addEventListener("touchend", handleGlobalEnd);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalEnd);
    };
  }, [isDragging, position]);

  // Merge images on temporary canvas and trigger download
  const handleDownload = () => {
    if (!containerRef.current || !productRef.current) return;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = userImage;

    bgImg.onload = () => {
      const prodImg = new Image();
      prodImg.crossOrigin = "anonymous";
      prodImg.src = product.image;

      prodImg.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Target canvas resolution matches user image natural resolution
        const naturalWidth = bgImg.naturalWidth;
        const naturalHeight = bgImg.naturalHeight;
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;

        // Draw User Background Photo
        ctx.drawImage(bgImg, 0, 0, naturalWidth, naturalHeight);

        // Get workspace viewport bounds
        const viewportWidth = containerRef.current.clientWidth;
        const viewportHeight = containerRef.current.clientHeight;

        // Calculate scaling ratios between physical viewport and natural resolution
        const scaleX = naturalWidth / viewportWidth;
        const scaleY = naturalHeight / viewportHeight;

        // Product physical dimensions in workspace
        const productWidth = productRef.current.clientWidth;
        const productHeight = productRef.current.clientHeight;

        // Target coordinate calculations
        // Translate to the center of the garment
        const px = position.x + viewportWidth / 2;
        const py = position.y + viewportHeight / 2;
        const cxCanvas = px * scaleX;
        const cyCanvas = py * scaleY;

        // Target size calculations
        const wCanvas = productWidth * scaleX * scale;
        const hCanvas = productHeight * scaleY * scale;

        // Apply Opacity
        ctx.globalAlpha = opacity;

        // Apply Blend Mode (e.g. multiply to eliminate whites)
        if (blendMode === "multiply") {
          ctx.globalCompositeOperation = "multiply";
        } else {
          ctx.globalCompositeOperation = "source-over";
        }

        ctx.save();
        ctx.translate(cxCanvas, cyCanvas);
        ctx.rotate((rotation * Math.PI) / 180);

        // Draw the product centered at translation coordinates
        ctx.drawImage(prodImg, -wCanvas / 2, -hCanvas / 2, wCanvas, hCanvas);
        ctx.restore();

        // Reset blend/alpha states
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1.0;

        // Trigger Download Anchor
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `growify-tryon-${product.id}.png`;
        link.href = dataUrl;
        link.click();

        if (onDownloadComplete) {
          onDownloadComplete();
        }
      };
    };
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      {/* Left Column: Interactive Screen Canvas viewport */}
      <div className="w-full lg:w-3/5 flex flex-col items-center">
        <div
          ref={containerRef}
          className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-slate-900 shadow-2xl flex items-center justify-center select-none"
        >
          {/* User Background Image */}
          <img
            src={userImage}
            alt="User Background"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Draggable Clothing overlay */}
          <div
            ref={productRef}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
              opacity: opacity,
              mixBlendMode: blendMode === "multiply" ? "multiply" : "normal",
              width: "55%",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            className="absolute z-30 flex items-center justify-center transition-shadow select-none"
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain pointer-events-none rounded-lg select-none"
            />
            {/* Visual sizing border on active hover */}
            <div className="absolute -inset-2 border-2 border-dashed border-purple-500/0 hover:border-purple-500/40 rounded-xl pointer-events-none transition-all duration-300"></div>
          </div>

          {/* Draggable Help Indicator Tooltip */}
          <div className="absolute top-4 left-4 py-1.5 px-3 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-semibold tracking-wide flex items-center gap-1">
            <HelpCircle className="h-3 w-3 text-purple-400" />
            Drag style inside photo to reposition
          </div>
        </div>
      </div>

      {/* Right Column: Custom sliders and actions panel */}
      <div className="w-full lg:w-2/5 glass-premium p-6 rounded-3xl border border-slate-900 text-left space-y-6">
        <div className="border-b border-slate-900 pb-4">
          <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
            ACTIVE GARMENT
          </span>
          <h3 className="text-xl font-bold text-white leading-tight mt-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{product.description}</p>
        </div>

        {/* Slider Controls */}
        <div className="space-y-4">
          {/* Scale Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1">
                <ZoomIn className="h-3.5 w-3.5" /> Garment Scale
              </span>
              <span className="text-purple-400 font-bold">
                {Math.round(scale * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.5"
              step="0.01"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Rotation Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1">
                <RotateCcw className="h-3.5 w-3.5" /> Rotation
              </span>
              <span className="text-purple-400 font-bold">{rotation}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Transparency Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span>Fabric Opacity</span>
              <span className="text-purple-400 font-bold">
                {Math.round(opacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Background Blend Filter Mode (premium white-removal control) */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">
              Background Blending
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setBlendMode("multiply")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  blendMode === "multiply"
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Auto Blend (Clean)
              </button>
              <button
                onClick={() => setBlendMode("normal")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  blendMode === "normal"
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                No Blending (Solid)
              </button>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="grid grid-cols-1 gap-3.5 pt-4">
          <button
            onClick={handleDownload}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download Outfit PNG
          </button>

          <button
            onClick={handleReset}
            className="w-full py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 font-semibold text-slate-300 hover:text-white active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4.5 w-4.5" />
            Reset Garment Layout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOnCanvas;
