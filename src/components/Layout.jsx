import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-950">
      {/* Glow background circles for rich visual finish */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }}></div>

      <Header />
      <main className="flex-grow flex flex-col z-10 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
