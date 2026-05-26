import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shirt, Sparkles, Upload, Download, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative text-center">
      {/* Glow indicators */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none animate-pulse-slow"></div>

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto space-y-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wide animate-bounce">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive Web Try-On Engine
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
          Step Into Your New <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
            Wardrobe, Virtually.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Select premium garments, upload your photo, and see them fit instantly on our canvas workspace. A styling experience built with zero friction.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to={user ? "/select" : "/login"}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Start Fitting Now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/admin"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Admin Panel
            <ShieldCheck className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Feature Highlight Row */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-24 lg:mt-32 w-full z-10">
        {/* Feature 1 */}
        <div className="glass-premium p-8 rounded-3xl text-left border border-slate-900 flex flex-col justify-between hover:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 group">
          <div>
            <span className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Shirt className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100 mb-2">1. Select Fashion Items</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Browse our curated selection of jackets, shirts, summer dresses, and premium accessories to style.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="glass-premium p-8 rounded-3xl text-left border border-slate-900 flex flex-col justify-between hover:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 group">
          <div>
            <span className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Upload className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100 mb-2">2. Upload Your Photo</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Drag-and-drop your snapshot, or choose from our diverse range of neutral demo models to begin styling.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="glass-premium p-8 rounded-3xl text-left border border-slate-900 flex flex-col justify-between hover:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 group">
          <div>
            <span className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Download className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100 mb-2">3. Style & Download</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Reposition, scale, and adjust garment opacity on the interactive canvas. Download the finished design instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
